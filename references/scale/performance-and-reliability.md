# Scale, Performance, and Reliability

## Architecture defaults

Choose architecture from measured requirements rather than fashion. For production systems consider stateless application processes, horizontal scaling, connection pooling, caching, queues/background jobs, edge rate limits, CDN behavior, idempotent workers, and graceful degradation.

Do not prematurely distribute a simple product. Do not force a monolith when measured boundaries justify separation.

## Database

Require:

- indexes derived from real query patterns;
- query-plan inspection for critical paths;
- N+1 detection;
- pagination for unbounded collections;
- bounded queries and payloads;
- safe migrations for large tables;
- transaction boundaries appropriate to invariants;
- connection-pool sizing;
- backup/restore verification.

For multi-tenant systems, performance tests must preserve authorization boundaries.

## Performance budgets

Define budgets per critical user journey. Measure repeated runs and report p50/p75/p95 where meaningful. Separate lab results from production/real-user data.

Include realistic device and network conditions, cache state, payload sizes, concurrency, and cold-start behavior where relevant.

## Load and failure testing

R2+ systems with material traffic should exercise representative concurrency. R3 systems should test rate limits, queue saturation, database pressure, external provider failure, retries, timeouts, and graceful degradation.

Never treat one Lighthouse run or one successful request as a scale proof.

## Reliability

Define:

- SLOs/SLIs where appropriate;
- RPO/RTO;
- health/readiness checks;
- alert thresholds and ownership;
- rollback strategy;
- backup and restore procedure;
- dependency failure behavior;
- incident severity model.

## Cost

Record expected cost drivers including compute, database, storage, egress, third-party APIs, and AI token usage. Add budgets or alerts for expensive AI endpoints and background jobs.

## Stack selection

The protocol is host- and stack-neutral. Agents should choose the smallest mature stack that satisfies the measured requirements, document alternatives, and justify unusual complexity. Do not prescribe a framework merely because it is popular.

Recommended IDs: `PERF-001` through `PERF-099`, `LOAD-001` through `LOAD-099`, `DB-001` through `DB-099`, `SCALE-001` through `SCALE-099`, `RELIABILITY-001` through `RELIABILITY-099`.
