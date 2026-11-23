# JUSTIN · Real Estate

A real-estate listing site with a public catalogue and an admin dashboard.

Demo: [justin-real-estate.vercel.app](https://justin-real-estate.vercel.app/)

## Stack

- Next.js 16 (App Router, `proxy.ts`, typed routes) · React 19
- Supabase (auth + Postgres) via `@supabase/ssr`
- Tailwind CSS 4 · shadcn/ui · lucide-react
- Zod 4 for form validation · Mapbox (react-map-gl) for maps
- Node.js 24 (Vercel default)

## Getting started

1. Copy `.env.example` to `.env.local` and fill in the Supabase and Mapbox values.
2. Apply the row-level security policies in
   `supabase/migrations/` (Supabase SQL editor or `supabase db push`).
3. Install and run:

   ```bash
   npm install
   npm run dev
   ```

## Admin access

The dashboard (`/dashboard`) is restricted to users whose
`app_metadata.role` is `admin`. Anyone can sign up, but only admins can
manage listings. Grant the role in the Supabase SQL editor:

```sql
update auth.users
set raw_app_meta_data = raw_app_meta_data || '{"role":"admin"}'
where email = 'you@example.com';
```

Sign out and back in for the role to take effect.

## Project layout

```
app/
  (guest)/        public site: home, properties, about, contact
  (auth-pages)/   sign in, sign up, forgot/reset password
  (admin)/        admin dashboard (requires admin role)
  auth/callback/  Supabase email-link handler
components/       UI components (shadcn primitives in components/ui)
lib/
  auth.ts         getUser / requireUser / requireAdmin
  properties/     zod schema + server-only queries
  supabase/       server, browser and proxy clients
proxy.ts          session refresh + route guarding
```

## Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `npm run dev`       | Start the dev server (Turbopack) |
| `npm run build`     | Production build                 |
| `npm run typecheck` | Generate route types and run tsc |
| `npm run format`    | Format with Prettier             |
