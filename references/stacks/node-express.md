# Stack: Node + Express API

The backend for SPA builds (`react-vite.md`) and standalone APIs. Full control;
honest downside: you own the plumbing that platforms would otherwise own - sessions,
rate limiting, deploys, monitoring are all yours here.

## Structure

```
api/
├── src/
│   ├── index.ts              # boot: validate config, connect deps, then listen
│   ├── app.ts                # express app assembly (testable without listening)
│   ├── config.ts             # Zod-validated process.env; fail loud, list missing
│   ├── routes/               # thin: parse → authorize → call service → respond
│   ├── services/             # business logic, no req/res types
│   ├── db/                   # schema, migrations, query layer (parameterized)
│   ├── middleware/ (auth, rate-limit, error-handler, request-id)
│   ├── jobs/                 # queue workers (BullMQ-class)
│   └── lib/ (logger, email, errors)
├── openapi.yaml | shared types package   # THE contract; client types generate from it
└── .env.example
```

## Rules

- **The contract is generated, not remembered.** OpenAPI spec or a shared types
  package derived from the DB schema; the frontend consumes generated types. The
  Phase 6 reconciliation pass diffs schema vs contract vs live responses.
- **Route shape:** validate input at the edge (Zod), check authentication AND
  object-level authorization on every route that takes an ID (ownership/role check
  against the DB, not against the client's claims), keep handlers thin.
- **Error handling:** one error middleware; typed AppError classes with status codes;
  generic messages outward (no stack traces, no "email exists" enumeration), full
  detail into structured logs with a request ID that is also returned in the response
  for support. Unhandled rejection/exception handlers that log and exit cleanly.
- **Security middleware floor:** helmet (CSP tuned per app, HSTS, nosniff,
  frame-ancestors), CORS locked to known origins with credentials only where needed,
  cookie sessions per `auth-security.md`, rate limiting per IP and per account on
  auth endpoints, body-size limits, and no `x-powered-by`.
- **Database:** parameterized queries always; migrations up AND down, written
  additive-first for zero-downtime; indexes reviewed against every real query
  pattern; connection pool sized to the host; N+1s treated as bugs.
- **Jobs:** anything slow (email, media, reports, webhook fan-out) goes through the
  queue with retries + exponential backoff + dead-letter handling, never in the
  request path.
- **Observability:** structured JSON logs (pino-class), error tracking, `/health`
  (cheap) and `/ready` (checks deps) endpoints, and a pre-launch baseline of p50/p95
  latency so regressions are visible.

## Sessions & auth

Implement per `auth-security.md`: server-side sessions in Redis (or short-lived
rotated JWTs when stateless is genuinely required), httpOnly/Secure/SameSite cookies,
session-ID regeneration on login, absolute + idle timeouts, log-out-everywhere.

## Hosting

Node process under a supervisor (systemd/PM2/container) on the user's infra
(Hetzner/DO-class) behind Cloudflare, or a managed platform (Railway/Render/Fly) -
present the cost/control tradeoff. TLS terminates at the proxy; app trusts
`X-Forwarded-*` only from it (`trust proxy` set correctly, or rate-limit keys break).
Deploys: migrations run before new code serves traffic; rollback procedure written in
RUNBOOK.md and rehearsed once.
