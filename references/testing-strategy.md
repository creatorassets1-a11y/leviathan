# Testing Strategy

Testing depth follows risk, criticality, and failure cost rather than a fixed percentage target.

## Test layers
- Unit tests for deterministic business logic, validation, permissions, money calculations, parsers, and state transitions.
- Component/UI tests for states and interactions that are cheaper to verify below end-to-end.
- Integration tests for database/auth/payment/provider boundaries.
- API/contract tests for externally consumed request/response and webhook schemas.
- End-to-end tests for critical user journeys and high-risk workflows.
- Security/negative tests for authorization, tenant isolation, abuse, secrets, injection, and unsafe side effects.
- Performance/load tests for systems with material traffic or performance claims.
- Visual regression for design-system/public surfaces where visual stability matters.
- Manual exploratory/accessibility review for areas automation cannot prove.

## Pyramid and risk
Keep fast deterministic tests broad and expensive environment tests targeted. R3/R4 systems require strong negative and integration coverage around money, authz, privacy, admin, and external side effects. A high test count does not compensate for missing critical-path evidence.

## Contract testing
Version API/webhook/event schemas. Verify consumers tolerate compatible changes and reject unsafe ones. Test duplicate, missing, unknown, delayed, and malformed events where relevant.

## Visual testing
Capture representative viewport/state combinations rather than every pixel of every page. Review dynamic/loading/error/permission/RTL states when applicable.

## Manual evidence
Record exact journey, environment, actor, input class, expected result, observed result, timestamp, and limitations. Manual tests are evidence, not a substitute for repeatable automation where automation is practical.

## Release tiers
R0/R1: targeted checks appropriate to scope.
R2: unit/integration + critical journey + authorization/data checks.
R3: R2 plus security, privacy/payment/operations evidence as applicable, critical E2E, negative tests, and production-like verification.
R4: R3 plus independent review, adversarial scenarios, stronger rollback/recovery, and mandatory human approvals required by policy.

## Evidence quality
Prefer deterministic commands and artifacts. Record coverage gaps explicitly. Never report a test as passed merely because the code or configuration exists.

## Blockers
Block release when a critical requirement has no appropriate verification strategy, a contract-breaking change lacks consumer evidence, or high-risk behavior is covered only by a happy-path demo.