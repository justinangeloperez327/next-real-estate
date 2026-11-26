-- Row-level security for the `properties` table.
-- Anyone can read listings; only admins can create, update or delete them.
-- An admin is a user whose app_metadata.role = 'admin'. Grant it with:
--   update auth.users
--   set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
--   where email = 'you@example.com';
-- (The user must sign in again to pick up the new role.)

-- Fresh databases have no legacy properties table.
do $$
begin
  if to_regclass('public.properties') is null then
    return;
  end if;

  alter table public.properties enable row level security;

  drop policy if exists "Properties are viewable by everyone" on public.properties;
  create policy "Properties are viewable by everyone"
    on public.properties for select
    using (true);

  drop policy if exists "Admins can insert properties" on public.properties;
  create policy "Admins can insert properties"
    on public.properties for insert
    to authenticated
    with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  drop policy if exists "Admins can update properties" on public.properties;
  create policy "Admins can update properties"
    on public.properties for update
    to authenticated
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin')
    with check ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');

  drop policy if exists "Admins can delete properties" on public.properties;
  create policy "Admins can delete properties"
    on public.properties for delete
    to authenticated
    using ((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin');
end;
$$;
