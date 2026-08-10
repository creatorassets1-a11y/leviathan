# Multi-Region & Data Residency Operations

Apply when users, latency requirements, availability requirements, or contractual/legal commitments require more than one deployment region.

## Decision first

Do not introduce multi-region architecture without a measured requirement. Record target regions, latency objectives, availability objectives, residency constraints, failure domains, consistency requirements, budget, and operational ownership.

## Residency

Map each data category to allowed storage and processing regions, including logs, analytics, backups, replicas, queues, search indexes, AI providers, email, support tools, and payment providers. A database region alone does not prove residency.

Architecture must enforce routing rather than relying on UI selection. Tenant/account region assignment is server-authoritative and immutable or explicitly migrated through a controlled workflow.

## Routing and failover

Define the request-routing model, health checks, DNS/edge behavior, session handling, cache behavior, and failover procedure. Avoid failing over a stateful write workload into a region that cannot safely accept writes. Document which data is strongly consistent, eventually consistent, or region-pinned.

For active-active systems, define conflict resolution and idempotency. For active-passive systems, define promotion time, replication lag, write fencing, and recovery procedure. Test split-brain and partial-region failures where the architecture claims resilience.

## Privacy and security

Encryption keys, secrets, service accounts, and administrative access may themselves be region-sensitive. Ensure logs and telemetry follow the same residency decision. Data deletion/export must operate across regions and replicas.

## Evidence: REGION-* probes

- **REGION-001 residency map:** verify actual storage/processing locations against the documented data map.
- **REGION-002 routing:** exercise region selection and prove tenant/account traffic reaches the authorized region.
- **REGION-003 failover:** simulate region loss and verify documented availability/degraded behavior.
- **REGION-004 consistency:** exercise concurrent writes/failover and verify documented consistency guarantees.
- **REGION-005 replication:** measure replication lag and verify recovery point expectations.
- **REGION-006 deletion/export:** exercise data rights across all regions/replicas/indexes/caches in scope.
- **REGION-007 split-brain:** where active-active exists, test conflict/fencing protections.
- **REGION-008 cost/operations:** verify regional capacity, alerts, ownership, and recovery procedures.

## Release blockers

Block when a residency commitment cannot be demonstrated, failover can create divergent financial/security state, region routing can cross tenant boundaries, or operators cannot safely recover from a regional outage.
