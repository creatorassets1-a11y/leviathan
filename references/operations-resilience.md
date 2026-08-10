# Operations, Resilience & Deployment Contract

Production systems MUST be operable by a human during failure, not merely deployable.

Required as risk warrants:
- structured logs with request/correlation IDs and safe PII/secret redaction
- business and technical metrics
- actionable alerts with ownership and noise controls
- distributed traces for multi-service systems
- health/readiness checks
- timeout, exponential-backoff+jitter, retry-budget and circuit-breaker strategy for external dependencies
- queues for deferrable work, dead-letter handling, replay tooling, and idempotent consumers
- frontend error boundaries and backend structured error envelopes
- staging/production separation
- immutable build identity including commit SHA, Vibecode Max version, policy version
- feature flags and safe kill switches for high-risk rollouts
- migration rehearsal and rollback/forward-fix plan
- backup restore evidence, RPO/RTO, and disaster runbooks
- load/concurrency tests where scale or money makes races material
- chaos/failure injection for critical paths when risk justifies it

No production readiness claim may rely on configuration alone; critical controls require exercised evidence.
