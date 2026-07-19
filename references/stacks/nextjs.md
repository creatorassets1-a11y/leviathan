# Stack: Next.js (+ Postgres/Supabase)

For web apps with accounts, content sites needing SEO plus dynamic features, and
anything that wants SSR, API routes, and one repo. Honest downsides, stated at the
interview: needs Node hosting, heavier than Vite, and pairing with Supabase couples
you to a vendor (the exit strategy section of RUNBOOK.md covers what leaving costs).

## Structure (App Router)

```
app/
├── app/
│   ├── (marketing)/          # public pages, static/ISR where possible
│   ├── (app)/                # authenticated app, dynamic
│   ├── admin/…               # actually at a non-obvious route per SKILL.md
│   ├── api/…/route.ts        # route handlers (webhooks, health, exports)
│   ├── layout.tsx, not-found.tsx, error.tsx, sitemap.ts, robots.ts
├── components/               # on headless primitives, styled from tokens
├── lib/ (db, auth, config, email)
├── db/ (schema, migrations)  # schema is the source of truth; types generated
├── styles/tokens.css
└── .env.example
```

## Rules

- **Server Components by default.** `"use client"` only where interaction demands it.
  Data fetching on the server; secrets never reach client bundles (`NEXT_PUBLIC_` is
  the only public surface, audit it).
- **Rendering per page, on purpose:** marketing/legal pages static or ISR; app pages
  dynamic; note the choice per route group in DECISIONS.md. Metadata API for
  titles/OG/canonical on every page; `sitemap.ts` and `robots.ts` generated.
- **Data layer:** Postgres. Schema in migrations from day one (Supabase migrations or
  Drizzle/Prisma migrate). Types generated from the schema (`supabase gen types` /
  drizzle inference) - the state-reconciliation gate diffs these against actual
  responses. Parameterized access only.
- **Supabase specifics:** RLS ON for every table, policies written and *tested* (a
  table without a policy test is unverified); service-role key server-only, never in
  the browser; anon key treated as public. RLS is the authorization backstop, not a
  replacement for checks in server code.
- **Auth:** per `auth-security.md`. Middleware protects route groups; every server
  action and route handler re-checks session AND object-level authorization -
  middleware alone is not authorization. Admin group additionally checks role + 2FA
  enrollment.
- **Server Actions:** validate input with a schema (Zod) at the boundary, check authz
  inside the action, return typed error states the UI renders; never trust the
  client's idea of IDs it may touch (IDOR probes in Phase 6 target exactly this).
- **Error/loading UX:** `error.tsx`, `loading.tsx`, `not-found.tsx` per segment,
  designed from DESIGN.md, with recovery actions.
- **Config:** validated at boot (Zod schema over `process.env`), `.env.example`
  committed, boot fails loudly listing what is missing.
- **Webhooks (Stripe etc.):** verify signatures, idempotency keys, respond fast and
  queue heavy work, retries with backoff and dead-letter logging.

## Performance

- `next/image` for all images (dimensioned, AVIF/WebP); `next/font` self-hosted
  subset under the 40KB budget; hero preloaded.
- Watch client-bundle creep: run the bundle analyzer before Phase 6; a "use client"
  at a layout root drags whole trees client-side.
- Cache reads (`unstable_cache`/fetch cache or Redis) for hot public data with
  explicit revalidation; never cache per-user data in shared caches.
- TTFB budget (<600ms) rules out cold-start-heavy setups for the primary market;
  pick region and hosting accordingly.

## Hosting

Vercel is the low-friction default (say the cost curve out loud at the three PRD
traffic levels); self-hosted Node on the user's existing infra (Hetzner/DO-class)
behind Cloudflare is the cost-stable alternative - document the tradeoff in the PRD.
Security headers via `next.config` headers(); health endpoint at `app/api/health`;
error tracking + structured logs wired before launch.
