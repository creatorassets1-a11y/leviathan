# Testing Strategy & Evidence Depth

Canonical strategy for deciding what to automate, what to exercise manually, and how evidence scales with risk.

## Test pyramid

Prefer fast unit tests for pure logic, integration tests for database/provider boundaries, contract tests for APIs/events, and a smaller set of end-to-end tests for critical user journeys. Do not replace integration behavior with mocks when the integration itself is the risk.

Use property/invariant tests for money, authorization, idempotency, parsing, and state machines where practical. Use load/failure tests when concurrency or dependency failure is material.

## Risk-tier expectations

- **R0:** lint/format and content validation as applicable.
- **R1:** component/unit tests plus representative accessibility and journey checks.
- **R2:** integration/API/authorization tests, negative cases, data integrity, migration and abuse controls as applicable.
- **R3:** all applicable R2 evidence plus payment/privacy/operations/performance/admin/support probes and real provider sandbox exercises.
- **R4:** R3 plus independent review, adversarial testing, stronger failure injection, recovery drills, and explicit human approvals.

## Contract testing

For APIs and webhooks, version request/response/event schemas. Test validation, authorization, error envelopes, pagination, idempotency, retries, and backward compatibility. Provider adapters should have fixture-based tests for authentic and malicious events.

## Visual regression

Use screenshots or component-level visual regression when visual correctness is material. Include responsive widths, loading/error/empty/permission states, long text, dark/light themes, and localization/RTL where applicable. Visual comparison is evidence of rendering, not proof of accessibility.

## Manual evidence

Manual checks are mandatory where automation cannot establish the property: screen-reader journeys, human review of AI behavior, legal consistency, real restore drills, operational runbooks, user-facing support quality, and provider-specific payment behavior.

## Flake and reproducibility

Record test environment, seed/version, dependency versions, and timestamps for non-deterministic evidence. Flaky tests are findings when they can hide regressions. Do not repeatedly rerun until green without recording the failure.

## Evidence: TEST-* probes

- **TEST-001 pyramid coverage:** map each critical requirement to a unit/integration/e2e/manual test.
- **TEST-002 negative matrix:** verify failure, unauthorized, timeout, duplicate, concurrent, and degraded states for critical journeys.
- **TEST-003 contract:** execute API/webhook compatibility and invalid-input cases.
- **TEST-004 visual:** run representative responsive/state/localization visual checks where applicable.
- **TEST-005 accessibility:** combine automated scan with manual keyboard/assistive-tech evidence.
- **TEST-006 load:** exercise expected peak/concurrency and record percentile/error/saturation results where applicable.
- **TEST-007 failure injection:** force material dependency/worker/database failures and verify recovery.
- **TEST-008 restore/rollback:** execute real restore and rollback procedures for production-bound systems.
- **TEST-009 flake review:** inspect failed/retried tests and document whether failures are product defects, environment limitations, or test instability.
- **TEST-010 traceability:** every release-blocking requirement maps to executed evidence or an explicit approved exception.

## Release blockers

Block when critical requirements have no executable evidence, only happy-path tests exist for stateful/high-risk flows, or manual evidence is omitted where automation cannot prove the property.
