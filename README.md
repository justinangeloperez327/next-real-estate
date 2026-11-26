# JUSTIN · Real Estate

A real-estate demo with a monthly listing sample from Realtor.com via
[RealtyAPI](https://www.realtyapi.io/). Prisma Postgres stores the sample and contact
messages. Supabase Auth is optional for accounts and dashboard access.

Demo: [justin-real-estate.vercel.app](https://justin-real-estate.vercel.app/)

## Stack

- Next.js 16 (App Router, `proxy.ts`, typed routes) · React 19
- RealtyAPI (Realtor.com provider) for listings, photos, agents, schools
- Prisma ORM and PostgreSQL for property snapshots and contact messages
- Supabase Auth via `@supabase/ssr` for optional accounts
- Tailwind CSS 4 · shadcn/ui · lucide-react
- Zod 4 for form validation · Mapbox (react-map-gl) for maps
- Node.js 24 (Vercel default)

## Getting started

1. In the Vercel project, connect [Prisma Postgres from the Marketplace](https://vercel.com/marketplace/prisma/prisma-postgres).
   The integration sets `DATABASE_URL`. For local use, pull your Vercel environment
   variables or set the connection string in `.env.local`. Set an optional
   `DIRECT_DATABASE_URL` if the provider requires a direct connection for migrations.
2. Apply the Prisma migration manually before importing or deploying the app:

   ```bash
   npm ci
   npm run db:deploy
   npm run dev
   ```

3. Set the optional Supabase Auth URL and anon key if you use sign-in and the
   admin dashboard. Listing search, details and the public contact form only
   need PostgreSQL. For an existing install, export legacy contact messages
   separately before moving them to the new database. The Prisma migration
   creates the new tables and does not move legacy data.

## Monthly property import

The homepage, search and detail pages read the stored sample from PostgreSQL.
The importer takes up to 24 homes for sale and 24 rental homes in one market
(Austin, TX by default). A full import uses at most 50 RealtyAPI requests per
attempt: two searches and up to 48 detail requests. The app serves the previous
snapshot if a refresh fails.

1. Add these GitHub Actions repository secrets:
   `DATABASE_URL` and `REALTYAPI_KEY`. The RealtyAPI key is for the
   importer only.
2. To use a different market, set the Actions repository variable
   `NEXT_PUBLIC_DEFAULT_LOCATION` to the same value as the web app.
3. Run **Import property snapshot** manually in GitHub Actions for the first
   import. Scheduled runs start on the first day of each month at 01:17 UTC
   (05:17 UAE time). A completed month is skipped before any provider calls.
   To run locally, put the same values in `.env.local` and use
   `npm run properties:import`.

The importer saves listing data and photo URLs. Photos still load from the
existing image host. Listings are a sample and prices and availability can change
between imports.

## Admin access

The dashboard (`/dashboard`) is restricted to users whose
`app_metadata.role` is `admin`. Anyone can sign up, but only admins can
read contact messages. Grant the role in the Supabase SQL editor:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'you@example.com';
```

Sign out and back in for the role to take effect.

## Project layout

Routes live in `app/`; everything else is grouped by feature.

```
app/
  (guest)/(home)/     home page (transparent navbar over the hero)
  (guest)/(site)/     properties, about, contact
  (auth-pages)/       sign in, sign up, forgot/reset password
  (admin)/            dashboard and messages (admin role required)
  auth/callback/      Supabase email-link handler
  sitemap.ts, robots.ts
features/
  properties/         Prisma queries, snapshot filters, normalization, components
  auth/               session, roles, schema, actions, form components
  contact/            contact form, schema, action, admin queries
components/
  forms/              FormField, FormAlert, SubmitButton (shared by all forms)
  layout/             navbar, footer, sidebar, breadcrumbs, page header/hero
  home/               home page sections
  ui/                 shadcn/ui primitives
lib/
  forms.ts            FormState + validateForm (zod) for server actions
  realtyapi/          RealtyAPI client and raw response types
  prisma.ts           server-side PostgreSQL client
  supabase/           Supabase Auth server and proxy clients
  env.ts, format.ts, redirect.ts, site.ts, utils.ts
proxy.ts              session refresh + guards for /dashboard and auth pages
prisma/migrations/    PostgreSQL schema and transactional import functions
supabase/migrations/  Legacy data schema for existing Supabase installs
```

### Forms

Every form follows the same pattern: a zod schema, a server action that
calls `validateForm()` and returns a `FormState`, and a client component
using `useActionState` with the shared `FormField` / `FormAlert` /
`SubmitButton`. Errors show inline next to each field, typed values are
kept (passwords never are), and listing enquiries carry the listing reference through the URL.

## Performance

- **Cache Components / partial prerendering**: pages ship a static HTML shell
  from the CDN; listings stream in from the data cache.
- **Cached reads**: PostgreSQL listing summaries and details use the Next.js
  data cache. The monthly import is the only code path that calls RealtyAPI.
- **No auth round-trips on public pages**: the proxy only runs on
  `/dashboard` and the auth pages, and uses `getClaims()` (local JWT
  verification) instead of `getUser()`.
- **Lazy Mapbox**: the 1.9 MB map bundle loads only when a map scrolls into
  view.

## Deploying

Automatic Git deployments are turned off in `vercel.json`
(`git.deploymentEnabled: false`), so pushes and pull requests no longer
deploy to Vercel. Apply the migrations and run the first property import against
the production database before deploying manually with the Vercel CLI:

```bash
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

To turn automatic deploys back on, delete `vercel.json` or set
`deploymentEnabled` to `true`. You can also enable it for specific
branches only, for example `{ "main": true }`.

## Scripts

| Command                     | Description                                 |
| --------------------------- | ------------------------------------------- |
| `npm run dev`               | Start the dev server (Turbopack)            |
| `npm run build`             | Production build                            |
| `npm run lint`              | ESLint (Next.js core-web-vitals + TS rules) |
| `npm run typecheck`         | Generate route types and run `tsc`          |
| `npm test`                  | Unit tests (Vitest)                         |
| `npm run db:deploy`         | Apply pending PostgreSQL migrations         |
| `npm run properties:import` | Import this month’s property sample         |
| `npm run check`             | Lint + typecheck + tests                    |
| `npm run format`            | Format with Prettier                        |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests, format check
and a production build on every pull request.
