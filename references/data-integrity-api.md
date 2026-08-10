# Data Integrity, Concurrency & API Contract

## Data
Business invariants MUST be enforced at the strongest appropriate layer: database constraints, transactions, authorization policies, and application logic.

Required review for state-changing systems:
- unique/foreign-key/check constraints
- transaction boundaries
- optimistic concurrency or locking where races can corrupt state
- idempotency for retryable mutations
- soft-delete/retention/recovery policy
- audit trails for sensitive actions
- tested export and deletion workflows
- migration rehearsal on representative data
- documented rollback or forward-fix strategy

## API
APIs MUST define consistent validation and error shapes, pagination/filtering/sorting conventions, authorization-aware response shaping, rate limits, CORS policy, and versioning or an explicit non-public API decision.

Never trust client-supplied ownership, role, tenant, price, balance, entitlement, or security claims. Re-derive them server-side.

## Evidence
Verification MUST include negative authorization cases, duplicate/retry cases, concurrent mutation cases where relevant, constraint violations, migration tests, and proof that sensitive responses contain only authorized fields.
