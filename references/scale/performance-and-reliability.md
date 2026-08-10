# Scale, Performance, and Reliability

This reference turns performance and scaling claims into measured, evidence-backed requirements. Architecture must follow measured requirements, not fashion. The smallest architecture that satisfies the observed workload is the default.

## 1. Performance claims are evidence claims

Never claim that a product is “fast,” “scalable,” “low latency,” or “production ready at scale” without recording the measurement conditions and observed results.

For every material critical journey, define a product-specific budget before optimization:

- journey and user action;
- target device class;
- network condition;
- cache state (cold/warm);
- representative payload/data volume;
- expected concurrency or traffic rate;
- p50, p75, and p95 targets where meaningful;
- p99 target when tail latency materially affects the product;
- error-rate budget;
- Core Web Vitals for frontend journeys where applicable;
- backend saturation constraints where applicable.

Report repeated measurements, not a single best run. Separate lab measurements from production/real-user measurements. Record the tool, version, environment, date, workload, and limitations.

### Tail latency

Optimize for p95/p99 when users or downstream systems experience tail behavior. A low average can hide a broken tail. Track queueing, connection-pool waits, database waits, dependency latency, and retries when explaining high percentiles.

## 2. Architecture decision rules

Choose architecture from measured requirements. Document the reason for each scaling mechanism and the threshold that would justify adding it.

### Stateless application tier

Prefer stateless application processes when horizontal scaling or replacement is expected. Keep session state in an appropriate shared system rather than process memory unless the state is explicitly disposable.

### Horizontal scaling

Add instances behind a load balancer when measured CPU, memory, event-loop, request concurrency, queueing, or latency behavior justifies it. Health checks must distinguish an alive process from an instance safe to receive traffic.

### Caching

Use layers deliberately:

- CDN/edge caching for static and safely cacheable responses;
- application cache such as Redis for hot, reusable data;
- in-process caches only for small, stable data with short TTLs and clear invalidation behavior.

Every cache must document key shape, TTL, invalidation, stale-data tolerance, stampede protection where needed, and behavior after cache loss. Never cache data across authorization boundaries without an explicit tenant/user-safe key strategy.

### Asynchronous work

Move non-critical work off the request path when users do not need to wait for it: email, exports, reports, webhook processing, heavy AI jobs, media processing, and similar workloads.

Workers must be idempotent. Retries require bounded exponential backoff and jitter, and consequential work requires deduplication or an idempotency key. Define queue capacity, maximum age, failure handling, and dead-letter/replay behavior where applicable.

### Graceful degradation

Identify the minimum useful product behavior when a dependency is slow or unavailable. Use bounded timeouts, circuit breakers, bulkheads, fallbacks, cached/stale reads where acceptable, or reduced functionality as appropriate. Do not allow a single slow dependency to consume all request capacity.

## 3. Database and data-path performance

Require:

- indexes derived from actual query predicates, joins, ordering, and uniqueness requirements;
- query-plan inspection (`EXPLAIN`/equivalent) for hot and expensive queries;
- detection and elimination of N+1 access patterns;
- bounded queries and payloads;
- cursor/keyset pagination for large or frequently changing collections where offset pagination becomes inefficient;
- safe limits for page size and request payload size;
- transaction boundaries that protect business invariants without holding locks unnecessarily;
- connection pooling sized from measured concurrency and database capacity;
- slow-query visibility and alerting where material;
- safe migrations, including lock-duration and large-table considerations;
- backup/restore verification.

### Connection pools

Too-small pools create application-side queueing. Too-large pools can exhaust the database and worsen latency. Record configured pool limits, observed utilization, wait time, database connection limits, and the rationale for sizing.

### Read replicas

Use replicas only when read volume or latency justifies them. Route writes and consistency-sensitive reads to the primary as required. Document replication lag tolerance and the user-visible consequences of stale reads.

### Partitioning and sharding

Do not introduce partitioning, sharding, or multi-primary complexity until simpler indexing, query, archival, caching, batching, and replica strategies have been measured and shown insufficient. Record the workload evidence that justifies the added complexity.

## 4. Frontend performance

For critical journeys:

- optimize images with appropriate dimensions and modern formats;
- lazy-load non-critical media and prioritize genuinely above-the-fold assets;
- avoid layout shifts by reserving media dimensions and stable UI space;
- split code by route/feature where useful and avoid unnecessary client-side JavaScript;
- subset and efficiently load fonts; preload only genuinely critical faces;
- use appropriate `font-display` behavior;
- minimize long main-thread tasks and layout thrashing;
- use CDN/cache headers for immutable static assets;
- test realistic mobile hardware and network conditions rather than flagship desktop alone.

Track LCP, INP, and CLS where applicable, alongside journey-level timing. A good Lighthouse score is not a substitute for real-user evidence.

## 5. Backend latency and dependency behavior

Design for bounded latency:

- set explicit timeouts for external dependencies;
- retry only operations that are safe to retry, or make them idempotent first;
- use bounded exponential backoff with jitter;
- use circuit breakers where a dependency can otherwise cascade failure;
- isolate high-cost or unreliable dependencies with bulkheads/worker pools where justified;
- avoid chatty service-to-service calls;
- batch requests where safe;
- prefer one well-designed round trip over many sequential calls;
- instrument queue wait time separately from execution time.

Do not increase timeout values merely to hide dependency degradation. Record the user-visible fallback or failure mode.

## 6. Load, concurrency, and capacity testing

Load tests must represent the actual product workload. Define:

- expected steady-state traffic;
- expected peak traffic;
- burst behavior;
- concurrency;
- read/write mix;
- representative payload sizes;
- authenticated and anonymous proportions;
- expensive endpoint proportions;
- dependency behavior;
- duration sufficient to expose saturation or memory leaks.

At minimum, test the expected peak for systems making material capacity claims. If the environment cannot safely reproduce the target, record the tested ceiling and limitation rather than extrapolating a pass.

Test more than throughput. Observe p95/p99 latency, error rate, saturation, queue depth/age, database waits, connection-pool saturation, and dependency failures.

## 7. Cost-aware scaling

Scale from evidence, not fear. Track cost drivers including compute, database, storage, egress, third-party APIs, queue volume, observability, and AI usage.

Cache hit rate, queue lag, database connection utilization, and expensive endpoint volume are operational signals as well as cost signals.

For AI systems, enforce quotas/rate limits and cost budgets. Cache repeated work only when privacy, correctness, freshness, and authorization semantics remain safe.

## 8. Progressive scaling path

Use the simplest viable stage:

**Early / low traffic**
- one reliable application tier;
- strong database indexes;
- bounded queries;
- basic CDN/static caching;
- background jobs where needed;
- connection pooling.

**Growth**
- horizontal application scaling;
- shared cache where measured useful;
- queues/workers;
- stronger edge rate limits;
- read replicas where justified;
- more deliberate CDN and cache invalidation.

**Higher scale**
- partitioning or archival strategies;
- specialized data stores only when workload evidence justifies them;
- multi-region only when availability, residency, or latency requirements demand it;
- more advanced traffic management only when simpler mechanisms have been measured insufficient.

Never add sharding, multi-region, service meshes, or distributed complexity solely because they sound “production grade.”

## 9. Anti-patterns

Treat these as findings unless explicitly justified:

- one Lighthouse run presented as scale proof;
- average latency used while ignoring p95/p99;
- unbounded database queries or API responses;
- N+1 queries on hot paths;
- indexes added without inspecting actual query plans;
- connection pools sized by guesswork;
- synchronous email/report/export/AI processing on user requests without need;
- retries on non-idempotent operations;
- unlimited queue retries with no dead-letter/replay policy;
- cache without invalidation or authorization-safe keys;
- read replicas used without replication-lag semantics;
- sharding/multi-region introduced before simpler options are measured;
- frontend performance evaluated only on a fast desktop connection;
- performance budgets defined after implementation instead of before it;
- “scales to X users” claims without a workload and measured test result.

## 10. Evidence requirements

For any production-bound R2/R3/R4 system, and any project that makes material performance claims, require evidence appropriate to the architecture:

- written budgets for critical journeys;
- repeated p50/p75/p95 measurements and p99 where material;
- lab vs real-user evidence clearly separated;
- realistic device/network test evidence for frontend-critical journeys;
- representative concurrency/load results or an explicitly recorded tested ceiling;
- hot-query plans and supporting indexes;
- evidence that hot-path N+1 behavior is absent or bounded;
- connection-pool configuration plus observed saturation/wait behavior;
- queue/worker evidence where asynchronous work exists;
- dependency timeout/retry/degradation evidence where applicable;
- cache behavior and invalidation evidence where caching exists;
- Core Web Vitals evidence where applicable;
- graceful degradation under at least one material dependency failure;
- SLO/SLI and capacity assumptions where applicable.

A check that could not be executed must remain `not_run`, `not_available`, `simulated`, or `unknown`; it must never be promoted to `passed` by inference.

## 11. Stack selection

The protocol is host- and stack-neutral. Agents should choose the smallest mature stack that satisfies measured requirements, document alternatives, and justify unusual complexity. Prefer production-proven primitives over experimental infrastructure when reliability requirements are material.

Recommended IDs: `PERF-001` through `PERF-099`, `LOAD-001` through `LOAD-099`, `DB-001` through `DB-099`, `SCALE-001` through `SCALE-099`, `RELIABILITY-001` through `RELIABILITY-099`.
