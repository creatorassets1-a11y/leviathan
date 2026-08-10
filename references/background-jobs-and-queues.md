# Background Jobs, Workers & Queues

Canonical contract for asynchronous work such as email, exports, webhooks, reports, media processing, scheduled tasks, and heavy AI jobs.

## Job contract

Every job defines: input schema, idempotency key, owner, priority, timeout, retry policy, maximum attempts, visibility/lease timeout, side effects, dead-letter behavior, retention, and replay procedure.

Workers are stateless where possible. Do not put authoritative state only in memory. Persist enough job state to distinguish `QUEUED -> PROCESSING -> SUCCEEDED/FAILED/DLQ` and recover after process termination.

## Idempotency and side effects

A job may execute more than once. Use database uniqueness, idempotency records, transactional outbox/inbox patterns, or provider idempotency keys to prevent duplicate consequential effects. A retry must not double-send money, grant entitlement twice, create duplicate exports, or send duplicate security messages.

Prefer transactionally recording an intent/outbox event with the state change that requires asynchronous delivery. Workers consume the durable event and acknowledge only after safe completion.

## Failure behavior

Transient failures use bounded exponential backoff with jitter. Permanent validation failures go to a DLQ with a human-readable reason. Poison messages must not block unrelated work. Replay tooling must be authorization-protected, auditable, rate-limited, and idempotent.

Use queues with priority classes where necessary. Never let low-priority bulk work starve security, payment, or customer-critical jobs.

## Capacity and observability

Track queue depth, oldest-job age, enqueue rate, completion rate, retry rate, failure/DLQ rate, worker utilization, processing duration, and dependency latency. Alert on user-impacting lag, not arbitrary queue size alone. Set concurrency limits based on downstream capacity.

Gracefully handle shutdown: stop accepting new work, finish/lease current work within bounds, and make interrupted jobs safely retryable.

## Evidence: JOB-* probes

- **JOB-001 idempotency:** execute the same job concurrently/repeatedly and prove one consequential side effect.
- **JOB-002 crash recovery:** terminate a worker during processing and verify safe retry/recovery.
- **JOB-003 retry:** force transient failures and verify bounded backoff, jitter, and maximum attempts.
- **JOB-004 poison/DLQ:** force permanent failure and verify isolation, DLQ visibility, and safe replay.
- **JOB-005 priority:** fill the queue with bulk work and verify critical work receives its documented priority.
- **JOB-006 lag telemetry:** verify queue age/depth/throughput metrics and alerts.
- **JOB-007 authorization:** attempt replay or administrative job mutation as an ordinary user and verify denial.
- **JOB-008 shutdown:** exercise deployment/restart during active jobs and verify no lost or duplicated consequential work.

## Release blockers

Block when retries can duplicate consequential effects, failed jobs disappear without operator visibility, DLQ/replay is unsafe, or queue growth can exhaust a critical dependency without a bounded control.
