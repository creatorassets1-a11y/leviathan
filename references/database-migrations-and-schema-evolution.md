# Database Migrations & Schema Evolution

Canonical contract for evolving persistent schemas safely under real traffic.

## Migration rules

- Every migration is versioned, reviewed, reproducible, and reversible or has a documented forward-recovery path.
- Back up/snapshot material data before destructive changes when the platform supports it, and rehearse the migration on representative data.
- Prefer expand -> migrate/backfill -> verify -> contract. Avoid changing application and schema assumptions atomically when old and new versions may coexist.
- Add nullable/new structures first, deploy compatible code, backfill in bounded batches, verify invariants, then enforce constraints or remove old fields after a safe window.
- Never run unbounded backfills in a request path.

## Zero-downtime patterns

For large tables, avoid long blocking locks. Use concurrent index creation where supported, batched backfills, resumable jobs, progress metrics, and bounded transactions. Measure lock duration and replication lag. Schedule destructive operations when load and recovery capacity permit.

Database changes must be compatible with workers, background jobs, read replicas, caches, analytics, and rollback versions. A rollback of application code must not assume a schema state that the migration has already removed.

## Data integrity

Encode invariants in database constraints, transactions, unique indexes, foreign keys, checks, or equivalent trusted mechanisms. Define behavior for duplicate/retry/concurrent writes. Verify counts, checksums, referential integrity, and business invariants after migration.

## Evidence: MIG-* probes

- **MIG-001 rehearsal:** run the migration on a production-like snapshot and record duration, locks, errors, and resource impact.
- **MIG-002 mixed-version:** run old/new application versions against the transitional schema and verify compatibility.
- **MIG-003 backfill:** execute a representative backfill with restart/resume and verify no duplicate or skipped records.
- **MIG-004 invariant:** verify constraints and business invariants before/after.
- **MIG-005 rollback/forward:** exercise the documented rollback or forward-fix path in an isolated environment.
- **MIG-006 load:** exercise the migration while representative traffic is present and observe latency, locks, pool saturation, and replication lag.
- **MIG-007 backup:** verify the required snapshot/backup exists and a restore path is usable before destructive work.
- **MIG-008 cleanup:** verify old columns/indexes/code paths are removed only after the compatibility window and decision record.

## Release blockers

Block when a migration can corrupt data, requires an unbounded production lock without approved mitigation, cannot recover from a failed partial execution, or leaves rollback incompatible with the deployed schema.
