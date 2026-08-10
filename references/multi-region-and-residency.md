# Multi-Region & Data Residency Operations

Apply only when measured latency, availability, contractual requirements, or residency obligations justify regional architecture.

## Residency
Record authoritative storage and processing region for databases, object storage, backups, logs, analytics, search, queues, AI providers, and support/payment processors. A region label is not evidence of residency if vendors replicate elsewhere.

## Architecture choices
Document single-region, regionalized, active/passive, or active/active design and why. Define routing, failover triggers, health checks, consistency model, replication lag tolerance, write authority, conflict resolution, and data-class restrictions.

## Failover
Use explicit runbooks and rehearsed failover/failback. Avoid automatic cross-region promotion when it can cause split-brain or data loss without a tested consensus/lease mechanism. Preserve idempotency during replay.

## Privacy and security
Tenant/user data must remain isolated across regions. Encryption keys, backups, logs, and support access must follow the same regional/transfer policy. Region selection must never be user-controlled in a way that bypasses contractual residency rules.

## Evidence
- region inventory;
- residency/transfer assessment;
- routing test;
- controlled failover test;
- failback/reconciliation test;
- replication-lag measurement;
- tenant isolation across regions;
- backup/restore region test;
- vendor replication review.

## Progressive rule
Do not introduce multi-region merely because it sounds scalable. A measured single-region design with tested recovery is preferred until requirements demand otherwise.

## Blockers
Block a residency commitment when the architecture cannot prove where applicable data is stored/processed, and block active/active production when conflict/recovery semantics are untested.