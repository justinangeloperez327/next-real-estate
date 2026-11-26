create table public.property_listings (
  id text primary key check (id ~ '^[0-9]{4,20}$'),
  category text not null check (category in ('sale', 'rent')),
  position integer not null check (position >= 0),
  summary jsonb not null check (jsonb_typeof(summary) = 'object'),
  detail jsonb not null check (jsonb_typeof(detail) = 'object'),
  neighborhood text,
  is_current boolean not null default true,
  imported_at timestamptz not null default now()
);

create index property_listings_current_category
  on public.property_listings (category, position, id) where is_current;

create table public.property_import_runs (
  month date primary key,
  run_id uuid not null,
  started_at timestamptz not null default now(),
  completed_at timestamptz
);

alter table public.property_listings enable row level security;
alter table public.property_import_runs enable row level security;

revoke all on public.property_listings, public.property_import_runs
  from public, anon, authenticated;
grant select on public.property_listings to anon, authenticated;
grant select, insert, update, delete on public.property_listings, public.property_import_runs
  to service_role;

create policy "Anyone can read the current listings"
  on public.property_listings for select to anon, authenticated
  using (is_current);

-- Claim a month before spending any provider credits. A terminated job can
-- retry after the lease expires, and a completed month cannot be claimed again.
create function public.claim_property_import(import_id uuid)
returns date
language sql
set search_path = ''
as $$
  insert into public.property_import_runs (month, run_id)
  values (date_trunc('month', now() at time zone 'UTC')::date, import_id)
  on conflict (month) do update
    set run_id = excluded.run_id, started_at = now()
    where property_import_runs.completed_at is null
      and property_import_runs.started_at < now() - interval '30 minutes'
  returning month;
$$;

-- Publish the entire snapshot in one transaction after all API calls succeed.
create function public.publish_property_snapshot(
  import_month date, import_id uuid, listings jsonb
)
returns void
language plpgsql
set search_path = ''
as $$
begin
  perform pg_advisory_xact_lock(16787, 1);

  if exists (
    select 1 from public.property_import_runs
    where month > import_month and completed_at is not null
  ) then
    raise exception 'A newer property snapshot has already been published';
  end if;

  if not exists (
    select 1 from public.property_import_runs
    where month = import_month and run_id = import_id and completed_at is null
    for update
  ) then
    raise exception 'Property import claim is no longer current';
  end if;

  if listings is null or jsonb_typeof(listings) <> 'array' then
    raise exception 'A property snapshot must be an array';
  end if;
  if jsonb_array_length(listings) not between 1 and 48 then
    raise exception 'A property snapshot must contain 1 to 48 listings';
  end if;

  insert into public.property_listings (id, category, position, summary, detail, neighborhood)
  select id, category, position, summary, detail, neighborhood
  from jsonb_to_recordset(listings) as row(
    id text, category text, position integer, summary jsonb, detail jsonb, neighborhood text
  )
  on conflict (id) do update set
    category = excluded.category,
    position = excluded.position,
    summary = excluded.summary,
    detail = excluded.detail,
    neighborhood = excluded.neighborhood,
    is_current = true,
    imported_at = now();

  update public.property_listings
    set is_current = false
    where is_current and not exists (
      select 1 from jsonb_array_elements(listings) as incoming(item)
      where incoming.item ->> 'id' = property_listings.id
    );

  update public.property_import_runs
    set completed_at = now()
    where month = import_month and run_id = import_id;
end;
$$;

revoke all on function public.claim_property_import(uuid),
  public.publish_property_snapshot(date, uuid, jsonb) from public, anon, authenticated;
grant execute on function public.claim_property_import(uuid),
  public.publish_property_snapshot(date, uuid, jsonb) to service_role;
