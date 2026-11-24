# JUSTIN · Real Estate

A real-estate listing site. Listings come from Realtor.com via
[RealtyAPI](https://www.realtyapi.io/); Supabase handles sign-in and contact
messages, which admins read in a small dashboard.

Demo: [justin-real-estate.vercel.app](https://justin-real-estate.vercel.app/)

## Stack

- Next.js 16 (App Router, `proxy.ts`, typed routes) · React 19
- RealtyAPI (Realtor.com provider) for listings, photos, agents, schools
- Supabase (auth + contact messages) via `@supabase/ssr`
- Tailwind CSS 4 · shadcn/ui · lucide-react
- Zod 4 for form validation · Mapbox (react-map-gl) for maps
- Node.js 24 (Vercel default)

## Getting started

1. Copy `.env.example` to `.env.local` and fill in the Supabase, RealtyAPI
   and Mapbox values. Add the same variables in Vercel (Project Settings →
   Environment Variables). `REALTYAPI_KEY` is server-only.
2. Apply `supabase/migrations/20261124000000_contact_messages.sql` (Supabase
   SQL editor or `supabase db push`). It creates the `contact_messages`
   table used by the contact form. (The older `properties` migration is no
   longer used: listings now come from RealtyAPI. The `properties` table can
   be dropped.)
3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

## Listing data (RealtyAPI)

- Provider: Realtor.com (`https://realtor.realtyapi.io`), authenticated with
  the `x-realtyapi-key` header. The client lives in `lib/realtyapi/`, and
  `features/properties/normalize.ts` maps raw responses to the app's
  `Listing` type.
- Endpoints: `/search/bylocation` (listing page, featured row) and
  `/details/byid` (property page).
- **Credits:** every request costs plan credits (the free plan is 250 per
  month). All reads are cached for hours with `"use cache"` and shared
  across visitors, so repeat views are free. The sitemap lists static pages
  only so crawlers don't spend credits.
- The default market (`NEXT_PUBLIC_DEFAULT_LOCATION`, "Austin, TX" if unset)
  is shown when nobody has searched.
- Photos are served from `*.rdcpix.com` through `next/image`.

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
  properties/         RealtyAPI queries (cached), normalize, filters, components
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
  supabase/           server (cookies), public and proxy clients
  env.ts, format.ts, redirect.ts, site.ts, utils.ts
proxy.ts              session refresh + guards for /dashboard and auth pages
supabase/migrations/  RLS policies and tables
```

### Forms

Every form follows the same pattern: a zod schema, a server action that
calls `validateForm()` and returns a `FormState`, and a client component
using `useActionState` with the shared `FormField` / `FormAlert` /
`SubmitButton`. Errors show inline next to each field, typed values are
kept (passwords never are), and nothing is passed through the URL.

## Performance

- **Cache Components / partial prerendering**: pages ship a static HTML shell
  from the CDN; listings stream in from the data cache.
- **Cached reads**: RealtyAPI searches and details use `"use cache"`
  (`listings` tag, hours lifetime), which also keeps API credit use low.
- **No auth round-trips on public pages**: the proxy only runs on
  `/dashboard` and the auth pages, and uses `getClaims()` (local JWT
  verification) instead of `getUser()`.
- **Lazy Mapbox**: the 1.9 MB map bundle loads only when a map scrolls into
  view.
- **Hero video**: 2 MB 720p loop with a poster image.
- **Region**: RealtyAPI and the listings are US-based; a US region for
  Vercel Functions (Project Settings → Functions) keeps API calls short.

## Deploying

Automatic Git deployments are turned off in `vercel.json`
(`git.deploymentEnabled: false`), so pushes and pull requests no longer
deploy to Vercel. Deploy manually with the Vercel CLI:

```bash
npx vercel          # preview deployment
npx vercel --prod   # production deployment
```

To turn automatic deploys back on, delete `vercel.json` or set
`deploymentEnabled` to `true`. You can also enable it for specific
branches only, for example `{ "main": true }`.

## Scripts

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack)            |
| `npm run build`     | Production build                            |
| `npm run lint`      | ESLint (Next.js core-web-vitals + TS rules) |
| `npm run typecheck` | Generate route types and run `tsc`          |
| `npm test`          | Unit tests (Vitest)                         |
| `npm run check`     | Lint + typecheck + tests                    |
| `npm run format`    | Format with Prettier                        |

CI (`.github/workflows/ci.yml`) runs lint, typecheck, tests, format check
and a production build on every pull request.
