# Performance and Scaling Verification Probes

These probes turn performance and scaling requirements into executable evidence. Use the product's actual journeys, endpoints, data volumes, and workload assumptions. A configuration-only review is not a performance pass.

## Evidence states

Use the standard evidence ledger states. `not_run`, `not_available`, `simulated`, and `unknown` are never equivalent to `passed`.

## PERF-001: critical-journey budget

For every material journey:

1. record device, browser/runtime, network, cache state, payload/data volume, environment, and date;
2. run the journey repeatedly;
3. record p50/p75/p95 and p99 where tail latency matters;
4. compare against the PRD budget;
5. preserve raw measurement output or a reproducible artifact.

Expected evidence: repeated measurements with conditions, not a single best result.

## PERF-002: Core Web Vitals

For frontend-critical journeys, measure LCP, INP, and CLS under representative mobile/device/network conditions. Separate lab results from real-user/production evidence. Record the tool and version.

Expected evidence: measurements plus viewport/device/network conditions and known limitations.

## PERF-003: bundle-and-asset audit

Inspect production assets for oversized JavaScript, unnecessary dependencies, unoptimized images, missing dimensions, blocking fonts, and avoidable render-blocking resources. Verify route/feature code splitting where it materially improves the journey.

Expected evidence: bundle/build report and identified remediation or justified exception.

## PERF-004: cache correctness

For each cache layer, exercise cold, warm, expired, invalidated, and dependency-failure states. Verify authorization-safe cache keys, TTL behavior, stale-data policy, invalidation, and safe behavior after cache loss.

Expected evidence: observed cache hit/miss/invalidation behavior and no cross-user/tenant leakage.

## PERF-005: dependency timeout and degradation

Inject a controlled slow/error response from a material dependency. Verify bounded timeout, safe retry behavior, circuit/degraded behavior where applicable, and the intended user-facing fallback.

Expected evidence: timeout/retry counts, elapsed time, response behavior, and absence of duplicate side effects.

## DB-001: hot-query plan

Identify critical database queries from actual application traffic or representative traces. Run the equivalent `EXPLAIN`/query-plan analysis and verify indexes support the real predicates, joins, ordering, and uniqueness constraints.

Expected evidence: query plan plus index rationale. An index list alone is insufficient.

## DB-002: N+1 battery

Exercise list/detail endpoints with increasing result counts. Inspect query traces/logs or database instrumentation to determine whether query count grows unexpectedly with the number of returned records.

Expected evidence: bounded query pattern or explicit, justified batch behavior.

## DB-003: pagination and bounded-result battery

Attempt requests with missing, maximum, oversized, negative, and manipulated page/cursor parameters. Verify server-enforced limits, stable ordering, cursor integrity where used, and bounded response size.

Expected evidence: rejected/clamped oversized requests and stable pagination under concurrent changes where applicable.

## DB-004: connection-pool saturation

Under representative concurrency, observe configured pool size, active connections, wait time, database connection limits, and request latency. Exercise a controlled saturation scenario where safe.

Expected evidence: measured utilization/wait behavior and documented sizing rationale.

## DB-005: migration performance safety

For large or material tables, run the migration against representative data volume. Observe lock duration, query impact, replication behavior where applicable, and rollback/forward-fix path.

Expected evidence: migration timing, impact observations, and recovery procedure.

## LOAD-001: expected-peak test

Define expected steady-state and peak workload, concurrency, read/write mix, payload sizes, authentication mix, and expensive-endpoint proportions. Execute a sustained load test at the expected peak in a safe environment.

Expected evidence: p50/p75/p95/p99 latency, error rate, throughput, saturation, and tested duration.

## LOAD-002: burst and queueing test

Apply a controlled burst above steady-state traffic. Observe queueing, latency tail, autoscaling behavior where present, queue depth/age, database pressure, and recovery after the burst ends.

Expected evidence: observed saturation point and recovery time, not merely successful requests.

## LOAD-003: graceful degradation test

Disable or slow one material dependency while maintaining representative traffic. Verify the core journey remains usable in its documented degraded form and that the failed dependency cannot consume all available request capacity.

Expected evidence: user-visible degraded behavior, timeout bounds, and resource isolation.

## LOAD-004: tested-ceiling declaration

If the environment cannot reproduce the target production workload, increase load until the safe tested ceiling is identified. Record the ceiling, conditions, limiting resource, and why extrapolation is unsafe.

Expected evidence: explicit tested limit and limitation statement. Do not convert a lower test result into an unsupported scale claim.

## SCALE-001: statelessness check

Inspect application state used across requests and instances. Verify sessions, queues, caches, and other shared state are stored in systems designed for sharing or are explicitly disposable. Run the critical flow across more than one application instance where practical.

Expected evidence: successful cross-instance continuity or documented reason state is local.

## SCALE-002: horizontal scaling behavior

Where horizontal scaling is justified, exercise multiple instances and verify load balancing, readiness behavior, session continuity, shared dependencies, and consistent deployment identity. Observe whether latency improves or remains stable as capacity is added.

Expected evidence: multi-instance test and scaling trigger rationale.

## SCALE-003: queue-worker idempotency

Force a worker retry, duplicate delivery, and replay for a consequential job. Verify only the intended side effect occurs. Exercise dead-letter/replay behavior where applicable.

Expected evidence: job IDs, attempts, processing outcome, and side-effect count.

## SCALE-004: read-replica consistency

Where replicas exist, exercise write-then-read flows, stale reads, failover, and replication lag. Verify consistency-sensitive operations route appropriately to the primary or use an explicit consistency mechanism.

Expected evidence: measured lag and correct user-visible behavior.

## SCALE-005: architecture-justification review

For every non-trivial scaling mechanism, record the measured problem it solves, simpler alternatives considered, expected benefit, operational cost, and removal/rollback strategy.

Expected evidence: architecture decision record linked to the observed measurements.

## RELIABILITY-001: tail-latency diagnosis

When p95/p99 exceeds budget, correlate request latency with queue wait, database wait, connection-pool wait, dependency latency, retries, and saturation. Do not accept average latency as the explanation.

Expected evidence: trace/metric evidence identifying the dominant contributor or an explicit limitation.

## RELIABILITY-002: capacity regression

Repeat the same representative workload after a material performance change. Compare distributions rather than only averages and record environment differences.

Expected evidence: before/after measurements and release decision.

## RELIABILITY-003: cost-capacity review

Review compute, database, cache, queue, egress, third-party API, observability, and AI usage under representative traffic. Verify expensive paths have documented budgets, quotas, or alerts where material.

Expected evidence: cost assumptions plus observed or estimated usage with limitations clearly marked.

## Release blockers

Unless a time-limited, owner-approved exception is explicitly allowed by the project's risk tier, block material performance/scaling claims when:

- no critical-journey performance budgets exist;
- a claimed scale limit has no representative load/concurrency evidence;
- hot database paths have no query-plan/index evidence;
- unbounded result sets or material N+1 behavior remain on hot paths;
- consequential workers retry without idempotency protection;
- a material dependency can cascade failure without bounded timeout/degradation behavior;
- production frontend performance is judged only from a fast desktop/lab run when the target audience is materially mobile/network constrained;
- missing test capability is silently represented as a pass.
