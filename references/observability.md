# Observability, Operations, and Reliability

Observability is part of production readiness, not an enterprise-only extra. A production system must make failures diagnosable, user impact measurable, and recovery executable without guesswork.

## 1. Production observability pillars

For every production backend, implement the applicable three pillars.

### Logs

Prefer structured JSON or equivalent key-value logs with stable fields:

- timestamp;
- level/severity;
- service/component;
- environment;
- deployment/build/version identifier;
- Leviathan policy/protocol version when applicable;
- request_id/correlation_id;
- trace_id/span_id when tracing exists;
- event name/type;
- duration_ms;
- HTTP/RPC status;
- relevant business identifiers such as tenant_id/order_id, redacted or hashed when necessary;
- safe error class/message and stack information only where it cannot expose secrets.

Logs should be machine-queryable and consistent enough to follow one request across boundaries.

### Metrics

At minimum, measure the applicable golden signals:

- request/operation rate;
- error rate;
- latency, preferably p50/p95/p99;
- saturation/resource pressure.

Also measure business signals where they matter: sign-ups, successful/failed payments, entitlement grants/revocations, queue depth and age, important workflow success/failure rates, and AI requests/failures/refusals/latency/usage/cost where applicable.

Measure dependency/database latency, error rates, connection-pool pressure, cache health, queue health, and provider failures where relevant.

Do not put unbounded values such as user IDs, request IDs, or arbitrary strings into high-cardinality metric labels.

### Traces

For systems with more than one service, asynchronous worker, queue, or materially complex external integration, prefer OpenTelemetry or an equivalent interoperable tracing standard.

Propagate trace context across HTTP/RPC, queues, background jobs, database calls, and vendor boundaries where supported. Preserve correlation identifiers when traces are unavailable.

Prefer retaining 100% of error traces and materially slow traces, with a documented sampling strategy for ordinary traffic.

## 2. Health, readiness, and deployment identity

Provide clear liveness and readiness semantics where the runtime supports them:

- `/health` or equivalent: process/service liveness;
- `/ready` or equivalent: whether the instance can safely receive work, including required dependencies where appropriate.

Do not expose secrets, internal topology, or sensitive dependency details through public health endpoints.

Every production deployment must have a machine-readable identity containing, where applicable: application version, source/build SHA, deployment timestamp, environment, Leviathan policy version, and migration/schema version.

Operators must be able to determine which version is serving traffic.

## 3. Error tracking and safe redaction

Use centralized error tracking or an equivalent searchable system for production failures.

Before telemetry leaves the process, redact or omit passwords, access/refresh/session tokens, authorization headers/cookies, API keys/webhook secrets, full payment card data, unnecessary private message/body content, unnecessary personal data, and secrets embedded in exceptions or request payloads.

Configure grouping/fingerprinting so one root cause does not create an alert storm. Preserve enough context to reproduce and diagnose the failure.

## 4. Alerting discipline

Alert on user-impacting symptoms and meaningful business failures, not every infrastructure fluctuation.

Typical alerts include availability failure, sustained error-rate increase, latency/SLO burn, queue backlog/age, payment failure or entitlement drift, reconciliation failures, critical dependency outage, backup/restore failure where monitored, authentication/abuse anomalies, and resource exhaustion that threatens service.

Every critical alert must have a short runbook answering:

1. What does this alert mean?
2. What user impact is likely?
3. What should the responder check first?
4. What safe mitigation can be attempted?
5. When and to whom should the incident be escalated?
6. What evidence should be preserved?

Define severity levels and expected response times appropriate to the product. Avoid alert rules that repeatedly fire without actionable remediation.

## 5. Incident response

Production systems must have an incident owner/on-call contact, first-response steps, escalation path, communication channel, rollback or mitigation procedure, evidence-preservation guidance, customer communication plan where warranted, and a post-incident review process for material incidents.

Post-incident reviews should be blameless and focus on systemic causes, detection gaps, recovery gaps, and concrete prevention work.

A responder must be able to correlate logs, metrics, traces, deployment identity, and business events for the affected request or workflow.

## 6. Reliability objectives

When uptime, latency, or data loss materially affects users, record product-specific SLOs, SLIs/measurement windows, error budgets where useful, RPO, and RTO.

Never invent targets. If the product has not chosen them, record that decision as pending rather than pretending an arbitrary number is an engineering requirement.

## 7. Backups, recovery, and rollback

Use `references/cost-and-recovery.md` as the canonical recovery policy.

For material persistent data, document backup frequency, retention, encryption, access controls, restore procedure, owner, RPO/RTO, and dependencies needed during recovery.

Execute a restore test before claiming the recovery path is verified. Record the result, duration, restored version/schema, validation performed, and limitations.

For deployments and migrations, maintain a known-good checkpoint and a rollback or forward-fix path. Do not perform uncontrolled live patching when a reversible deployment path exists.

## 8. Cost, cardinality, and retention

Observability is itself a production dependency and cost center. Define, where material, log/trace/metric/error-tracking retention, trace sampling, maximum telemetry volume/cost expectations, and PII/legal retention constraints.

Never trade away security/privacy by collecting everything “for debugging.” Collect the minimum useful evidence.

Avoid high-cardinality metrics. Prefer structured logs or traces for dimensions useful for individual investigations but unsafe or expensive as metric labels.

## 9. AI/LLM-specific observability

For products using AI, instrument enough to diagnose model behavior and cost without exposing sensitive content.

Where applicable record request/trace ID, model/provider/version, prompt/template identifier rather than raw prompt where possible, token counts/input-output usage, latency, tool calls/outcomes, retrieval identifiers/source metadata, output status/refusal/error classification, cost estimate, and safety/policy outcome.

Raw prompts and outputs should not be retained by default merely because they are useful for debugging. If retention is required, document purpose, minimization, access control, encryption, retention, and legal basis.

Track quality/error/refusal/cost-per-request signals appropriate to the product. AI telemetry must never become a backdoor around authorization, tenant isolation, or secret-redaction rules.

## 10. External dependencies and asynchronous work

For material external providers, record timeout behavior, retry policy/jitter, circuit-breaker/degraded behavior where useful, provider latency/error metrics, correlation IDs where supported, queue/job status, dead-letter/failure handling, and replay/recovery procedure.

Do not retry non-idempotent operations blindly. Tie retries to explicit idempotency semantics.

For queues and workers, measure depth, oldest-job age, processing latency, failure count, retry count, and dead-letter count where applicable.

## 11. Security-aware telemetry

Authentication, authorization, rate-limit, abuse, and security events should be observable without logging secrets or sensitive payloads.

Useful events include login success/failure, MFA events, password/recovery events, privilege changes, authorization denials, suspicious rate-limit activity, secret/key rotation, admin/impersonation actions, and payment/security-sensitive mutations.

Security telemetry follows the same retention, access-control, and minimization requirements as application telemetry.

## 12. Verification and evidence

For R3/R4 and production-bound R2 systems, the evidence ledger must include the applicable results below:

- structured logs are active and queryable;
- a correlation/request ID can be followed through a representative request;
- health and readiness endpoints return expected states;
- deployment/build identity is visible in telemetry;
- key request, error, latency, and dependency metrics exist;
- at least one critical alert has an executable trigger and runbook;
- error tracking captures a controlled failure without secret leakage;
- log/trace/metric retention and redaction configuration are documented;
- backup restore has actually been executed for material persistent data, or the limitation is explicitly recorded;
- rollback procedure is written and can be followed;
- SLO/RPO/RTO are recorded where applicable;
- queues/workers and external dependencies have failure visibility where applicable;
- AI telemetry is present where applicable and does not expose prohibited data;
- incident contact and escalation path are documented.

“Logging configured” or “monitoring installed” is not sufficient evidence. Exercise the system and record the observed result.

## 13. Release blockers

For production systems, unless an explicit time-limited exception is permitted by the applicable risk tier, block release when:

- critical production errors cannot be diagnosed from available telemetry;
- health/readiness behavior is missing where the deployment model requires it;
- telemetry leaks secrets or prohibited sensitive data;
- deployment identity cannot be established;
- a material backup path is claimed but has never been restored/tested;
- rollback/recovery has no executable procedure;
- critical alerts have no actionable runbook;
- payment/reconciliation failures are invisible where money moves;
- material queue/dependency failures have no detection path;
- required SLO/RPO/RTO decisions are absent for a system where they materially matter.

## 14. Handoff requirements

The production handoff should point to observability dashboards, alert definitions, runbooks, deployment/version identity, rollback procedure, backup/restore procedure, incident contact, vendor/dependency inventory, known limitations, and the evidence ledger.

If a host cannot provide a requested observability capability, report `not_available` or `not_verified`; never convert the limitation into a false pass.
