# Feature Flags, Experimentation & Progressive Delivery

Canonical contract for runtime configuration, gradual rollout, A/B testing, kill switches, and feature exposure.

## Rules

- Flags are server-authoritative for security, entitlement, billing, compliance, and data-access decisions.
- A feature flag never grants permission by itself. Authentication, authorization, entitlement, and policy checks remain independent.
- Every flag has an owner, purpose, type, default, scope, creation date, expiry/review date, and rollback/kill behavior.
- Defaults must be safe when the flag service is unavailable. High-risk features fail closed.
- Separate release flags, operational kill switches, permission/entitlement gates, and experiments. Do not use one mechanism for all semantics.
- Targeting must not leak sensitive attributes or permit users to self-select into privileged variants.

## Progressive delivery

Use a staged path where justified: internal/test -> small cohort -> larger cohort -> general availability. Define health metrics and abort thresholds before rollout. Kill switches must be tested before a feature depends on them.

For database/schema changes, flags must support compatibility across old and new code during migration. Never remove a flag or old code path until rollout is complete, telemetry is stable, and the removal decision is recorded.

## Experimentation

Define hypothesis, primary metric, guardrail metrics, eligibility, randomization unit, sample-size/decision rule, start/end date, and analysis owner before exposure. Avoid overlapping experiments that contaminate the same metric unless explicitly designed. Do not run experiments on legally or ethically sensitive populations without appropriate review.

Experiment events must be privacy-minimized and consent-aware. Do not use protected or sensitive attributes for targeting unless explicitly justified and reviewed.

## Entitlements and payments

Flags can change presentation or rollout but must not replace authoritative subscription/entitlement state. A paid feature remains protected by server-side entitlement checks even if the UI flag is enabled.

## Evidence: FLAG-* probes

- **FLAG-001 default safety:** disable the flag service and verify each feature reaches its documented safe state.
- **FLAG-002 server authority:** invoke a flagged privileged endpoint directly with a principal that should not qualify; verify denial.
- **FLAG-003 targeting isolation:** attempt to manipulate client-side targeting inputs and prove server policy wins.
- **FLAG-004 staged rollout:** exercise cohort targeting and verify exposure percentages/eligibility match the decision.
- **FLAG-005 kill switch:** activate the documented kill switch and verify consequential behavior stops without corrupting state.
- **FLAG-006 experiment integrity:** verify stable assignment, mutually exclusive groups where required, event deduplication, and guardrail metrics.
- **FLAG-007 expiry:** verify stale flags are surfaced for cleanup and cannot silently become permanent infrastructure.
- **FLAG-008 migration compatibility:** exercise rollout across mixed application versions and verify schema compatibility.

## Release blockers

Block when a flag can grant authorization/entitlement without a server check, when a high-risk feature has no safe default or tested kill path, or when an experiment silently collects prohibited/sensitive data.
