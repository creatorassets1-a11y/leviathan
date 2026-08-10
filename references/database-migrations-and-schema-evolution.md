# Database Migrations & Schema Evolution

## Principles
- Treat schema changes as production changes with rollback/forward-recovery plans.
- Back up/snapshot material data before risky migrations and test recovery.
- Prefer backward-compatible expand/contract migrations for systems that cannot tolerate downtime.

## Expand/contract
1. Expand: add nullable/new structures without breaking old code.
2. Deploy compatible application code that can read/write both forms as needed.
3. Backfill in bounded, resumable, observable batches.
4. Verify counts, constraints, query plans, application behavior, and replication/queue impact.
5. Contract: remove old fields/indexes only after all readers/writers have migrated and the rollback window has passed.

Never combine destructive column removal, large blocking rewrites, and application behavior changes without a justified maintenance strategy.

## Backfills
Use checkpoints, idempotency, throttling, progress metrics, retries, and a dead-letter/manual recovery path. Avoid unbounded transactions. Define how partial completion is detected and repaired.

## Zero-downtime considerations
Inspect lock behavior, index creation strategy, table size, traffic, connection pools, replication lag, and deployment sequencing. For high-risk migrations rehearse on production-like data.

## Verification
- migration applies from a clean baseline;
- migration applies from the latest supported production schema;
- representative data is preserved;
- application remains compatible during the transition;
- backfill is idempotent and resumable;
- query plans remain acceptable;
- rollback or forward recovery is demonstrated;
- backup/restore evidence exists for material data;
- concurrent reads/writes are tested for risky migrations.

## Blockers
Block release when a migration can silently lose material data, leaves no recovery path, requires unsafe long locks without an approved maintenance window, or cannot be verified on representative data.