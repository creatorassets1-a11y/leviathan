# Background Jobs, Workers & Queues

Use queues for work that does not need to block the user request or needs independent retry/isolation.

## Job contract
Every job has a stable ID, type/version, payload schema, owner, priority, timeout, retry policy, idempotency key, and observable lifecycle. Never put unnecessary secrets or personal data in queue payloads.

## Reliability
Workers must be idempotent. Expect at-least-once delivery, duplicates, delayed messages, crashes, and out-of-order work. Use bounded retries with exponential backoff/jitter. Poison messages move to a dead-letter/quarantine path with safe replay tooling. Avoid infinite retry loops.

## Scheduling and priority
Define concurrency, per-tenant fairness, priority classes, rate limits, maximum runtime, and backpressure. Expensive AI/payment/email jobs require budget controls and abuse protection.

## Data consistency
Use an outbox/transactional enqueue pattern when a database state change and job must not diverge. For workflows spanning systems, use explicit state machines rather than assuming distributed transactions.

## Observability
Measure queue depth, age/lag, throughput, success/failure/retry rates, worker saturation, dead-letter count, and processing latency. Alert on user-impacting lag, not every transient retry.

## Evidence
- duplicate-job test;
- crash/retry test;
- poison/dead-letter test;
- replay test;
- backpressure/concurrency test;
- queue-lag alert test;
- authorization/tenant isolation test;
- payload secret/PII scan;
- graceful shutdown test.

## Blockers
Block production when retries can duplicate money/entitlements/messages, jobs have no bounded failure path, or sensitive queue payloads are exposed without justification.