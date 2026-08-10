# Testing and Verification Protocol

Leviathan's credibility rule is simple: **a claim is only as strong as its executed evidence**.
The protocol is host-neutral and must work with Claude, Codex, Kimi, Lovable, and other agents.

## Verification order

```text
build -> independent review -> remediation -> QA -> security -> release decision -> handoff
```

The reviewer should inspect the actual output cold. It must not rely on the builder's explanation.

## Evidence ledger

Each check records:

```text
id
category
severity
status
command/tool action
timestamp
environment
exit/result
artifact
notes/limitations
```

A report must never upgrade `not_run`, `not_available`, `simulated`, or `unknown` into `passed`.
If the host cannot perform a check, report the limitation and choose a lower-confidence release
status rather than inventing evidence.

## Release gates

### Security

- zero critical security findings;
- zero exposed secrets;
- zero unresolved authentication or authorization bypasses;
- object-level authorization tested for parameterized resources;
- abuse-sensitive rate limits actually exercised;
- security headers and TLS behavior checked for web deployments;
- dependency vulnerabilities reviewed.

### Accessibility

- automated scan where applicable;
- keyboard-only core flows;
- focus visibility and order;
- semantic names/labels;
- contrast;
- zoom/reflow;
- reduced motion;
- screen-reader spot checks using a platform-appropriate reader.

Automated accessibility tools are not proof of full accessibility.

### Performance

- define product-specific budgets from the target audience;
- test representative flows;
- use realistic device/network conditions;
- run multiple measurements when feasible;
- record p50/p75 where the tool provides it;
- separate lab evidence from real-user evidence;
- measure after production deployment when production performance matters.

### Data integrity

- migrations tested on representative data;
- rollback or forward-recovery path documented;
- idempotency checked for retried operations;
- deletion/export behavior tested;
- backup restore actually executed for material persistent systems;
- RPO/RTO documented where applicable.

### Supply chain

- lockfile present;
- dependency scan run;
- new packages reviewed;
- secret scan run;
- SBOM generated where supported;
- licenses recorded;
- CI actions and third-party integrations reviewed.

### Operations

Production backends need health/readiness checks, structured safe logs, error tracking, useful
metrics, alerting, version/build identity, rollback instructions, and an incident path.

## Scenario matrix

For each core flow test as applicable:

```text
new user
returning user
admin/support user
unauthorized user
malicious input
slow network
offline/reconnect
expired session
expired token
retry/double-submit
partial external failure
empty dataset
large dataset
mobile viewport
desktop viewport
```

Payments additionally require idempotency, webhook authenticity, replay resistance, failure,
refund, and reconciliation scenarios.

## AI-specific security tests

When an application uses AI, test:

- prompt injection from user and retrieved content;
- tool authorization and excessive agency;
- cross-tenant/context leakage;
- unsafe tool parameters;
- sensitive data appearing in prompts/logs;
- output validation before execution;
- model/provider failure and timeout handling;
- abuse and cost exhaustion;
- untrusted documents attempting to alter system behavior.

## Remediation budget

Two remediation attempts per finding class are the default. Escalate after that with evidence
of the failure and explicit options. Never loop indefinitely.

## Honest report

Final release report:

1. what passed and evidence;
2. what failed and was fixed;
3. accepted exceptions with expiration;
4. known limitations;
5. checks unavailable in this environment;
6. human approvals;
7. rollback/recovery path;
8. build provenance.
