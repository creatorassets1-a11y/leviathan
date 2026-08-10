# Policy Engine

The policy engine converts prose requirements into state, checks, evidence, and release gates. It is designed to work even when the host has no dedicated Leviathan runtime.

## Gate model

Every gate has: `id`, `phase`, `requirement`, `checks`, `required evidence`, `pass condition`, `failure action`, `owner`, and `exception policy`.

Example:

```yaml
id: SEC-AUTHZ-001
phase: VERIFY
requirement: Every object access is authorized for the current principal.
checks:
  - authorization-tests
  - idor-probes
pass_if:
  critical: 0
  high: 0
exception:
  allowed: false
```

## Core gates

| Gate | Minimum requirement |
| --- | --- |
| STATE-001 | State follows a valid transition |
| EVID-001 | Release claims have evidence |
| SEC-001 | No exposed secrets |
| SEC-002 | No unresolved critical security issue |
| SEC-003 | Authorization tested on object-level resources |
| DEP-001 | Lockfile and dependency scan present |
| A11Y-001 | Automated plus manual accessibility checks where applicable |
| PERF-001 | Product-specific performance budget measured |
| DATA-001 | Migrations/data integrity checked where data exists |
| OPS-001 | Health, errors, logs, rollback, and backup strategy for production backends |
| LEGAL-001 | Legal-risk flags and human review requirements recorded |
| SUPPLY-001 | New dependency provenance/license/security review |
| PROV-001 | Build provenance recorded |

## Severity policy

`critical` blocks release. `high` blocks security-sensitive release by default and requires explicit risk acceptance for non-security categories. `medium` is tracked with an owner and remediation plan. `low` is documented debt unless the project has stricter policy.

Never combine security, accessibility, and dependency findings into one arbitrary count. Each category has its own release rule.

## Exception object

```json
{
  "id": "EX-001",
  "finding": "A high accessibility issue",
  "category": "accessibility",
  "severity": "high",
  "owner": "human@example.com",
  "justification": "...",
  "mitigation": "...",
  "expires_at": "2026-09-01T00:00:00Z",
  "approved_at": "2026-08-10T10:00:00Z",
  "residual_risk": "..."
}
```

Expired exceptions fail closed.

## Evidence statuses

`passed`, `failed`, `not_run`, `not_available`, `simulated`, `unknown`, `accepted_exception`.
Only `passed` and valid `accepted_exception` may satisfy a release gate.

## Release algorithm

1. Validate state schema.
2. Validate evidence schema.
3. Validate evidence references exist.
4. Reject secrets in artifacts.
5. Evaluate every mandatory gate.
6. Evaluate exceptions and expiration.
7. Require human approvals for configured risk boundaries.
8. Produce `.leviathan/release.json`.
9. Set `RELEASED` only when all required gates pass.

A missing check is a failed gate, not an implicit pass.
