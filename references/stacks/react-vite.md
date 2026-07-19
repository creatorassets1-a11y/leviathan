# Stack: React + Vite (SPA)

For SPAs and internal tools, usually paired with a Node/Express API
(`node-express.md`). Simple mental model, full control. Honest downside: you own more
plumbing, and an SPA's SEO is limited - content-led public sites belong on Next.js or
static instead. If the interview reveals SEO matters, say so before building.

## Structure

```
app/
├── src/
│   ├── main.tsx, App.tsx
│   ├── routes/            # one folder per route (lazy-loaded)
│   ├── components/        # shared UI, built on headless primitives
│   ├── lib/               # api client, utils, config
│   ├── hooks/
│   ├── styles/tokens.css  # DESIGN.md as CSS custom properties
│   └── types/             # generated from the API contract, never hand-copied
├── .env.example
├── index.html
└── vite.config.ts
```

TypeScript strict mode on. Types for API data are generated from the backend's schema
(OpenAPI or shared package) - the state-reconciliation rule depends on this.

## Rules

- **Routing:** React Router with `lazy()` per route; a designed 404; scroll restoration;
  document titles per route (an SPA that never changes `<title>` fails both SEO-lite
  and screen-reader navigation).
- **Server state:** TanStack Query-class data layer: caching, retries with backoff,
  and explicit `isPending / isError / data` handling. Every query renders loading,
  empty, and error states - designed ones, from DESIGN.md.
- **Client state:** local state first, context for genuinely global slices; reach for
  a store (Zustand-class) only when prop-drilling actually hurts. State libraries are
  a dependency cost like any other.
- **Forms:** react-hook-form-class + schema validation (Zod) shared with the backend
  where possible; errors in text next to fields, not color alone; disabled-during-
  submit with a visible pending state; double-submit protection.
- **Headless primitives:** dialogs, menus, tabs, selects from Radix UI / React Aria,
  styled entirely from tokens. Never hand-roll focus traps.
- **Auth in the client:** tokens live in httpOnly cookies set by the API, not in
  localStorage (XSS-readable storage is where sessions die). The client keeps only
  "who am I" state from a `/me` endpoint and handles 401 by redirecting to sign-in.
- **Error boundaries** around routes with a recovery action, and an error-tracking
  hook (Sentry-class) wired from day one.

## Performance

- Code-split by route; keep the entry chunk lean; run `vite build` with bundle
  analysis before Phase 6 and act on it. Initial JS budget applies to the entry
  route, not the sum of all lazy chunks.
- Memoize only measured hot paths; premature `useMemo` everywhere is noise.
- Long lists virtualize (TanStack Virtual-class) past ~200 rows.
- INP: keep handlers light, debounce expensive input work, move heavy computation to
  a worker.

## Hosting

Static hosting for the built assets behind a CDN, with an SPA fallback rewrite
(`/* → /index.html`) that must NOT swallow the API routes. Security headers via
platform config as in `html-static.md`; CSP needs `connect-src` for the API origin.
Environment config at build time via `VITE_*` vars documented in `.env.example`- 
and a boot-time check that required config exists, failing loudly with a clear message.
