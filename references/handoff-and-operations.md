# Final Handoff, RUNBOOK, Ownership, and Maintainability

A project is not operationally complete because it builds. At `RELEASED`/`OPERATING`, a human must be able to understand, deploy, debug, recover, and safely change it without relying on chat history or the original agent.

## 1. Mandatory handoff package

For R2+ production-bound systems create a single obvious entry point, normally `HANDOFF.md` or `docs/HANDOFF.md`, linking to:

- one-paragraph system purpose and primary users;
- current owner and escalation contact;
- safe local/staging quick-start;
- architecture and major data flows;
- environments and their differences;
- secret/configuration locations and rotation procedures, never secret values;
- CI/CD and production promotion path;
- logs, metrics, traces, alerts, and error tracking;
- common operational tasks;
- backup/restore and rollback;
- known limitations and accepted risks;
- evidence/release report;
- `RUNBOOK.md` and `DECISIONS.md`;
- dependency/vendor inventory and exit notes.

## 2. RUNBOOK coverage

Maintain short, actionable procedures for at least:

### Routine

- deploy/promote a release;
- roll back to a known-good version;
- rotate a secret/credential;
- add/remove an admin;
- review/export audit logs;
- perform a data export/deletion request;
- update legal/support/translation content where applicable.

### Incidents

- service down/high error rate;
- payment/webhook processing failure;
- database slow/connection exhaustion;
- queue/worker failure;
- suspected security incident or credential leak;
- failed backup/restore;
- data export/deletion requiring manual intervention.

Each procedure MUST contain: goal, prerequisites/permissions, exact steps, verification, failure/rollback/escalation, owner, and last-reviewed date.

## 3. Ownership

Every major component/domain must have an owner, even when one person owns everything initially. Record:

- primary owner;
- backup/escalation owner;
- production/admin access holders;
- access-review cadence;
- critical vendors and responsible owner;
- incident contact;
- decision authority for money, security, privacy, legal, and destructive operations.

Do not leave operational authority implicit in chat history.

## 4. Decision log

Maintain `DECISIONS.md` with date, decision, context, alternatives, rationale, consequences, owner, and revisit trigger for material architecture, stack, security, payment, privacy, data, compliance, and operational decisions.

## 5. Long-term maintainability

Handoff must document:

- dependency update/test procedure;
- lockfile and supported runtime versions;
- SBOM/dependency evidence where applicable;
- how to run tests and interpret failures;
- how to update legal/trust/support content;
- how to update translation catalogs;
- how to perform data export/deletion;
- how to add an environment or region;
- migration/recovery procedure;
- vendor exit and data deletion/return procedures;
- monitoring/alert ownership;
- known technical debt and accepted limitations.

## 6. Continuity rule

At the end of every major body of work, update operational documentation. Never leave the only explanation of the system in an agent conversation.

For a solo/non-expert operator, write runbooks as explicit numbered actions with exact commands/UI labels and expected results. Do not assume SRE expertise.

## 7. Verification

Before declaring a production release ready:

- handoff document exists and matches the deployed system;
- deploy, rollback, service-down, and secret-rotation runbooks exist;
- at least one operator can follow the quick-start and critical runbooks without the original agent;
- ownership and escalation are recorded;
- known limitations are explicit;
- deployment identity can be established;
- backup restore and rollback evidence are linked where applicable;
- evidence/release report is linked.

Recommended IDs: `HANDOFF-001` document accuracy, `HANDOFF-002` quick-start, `HANDOFF-003` deployment/rollback, `HANDOFF-004` incident runbook, `HANDOFF-005` ownership/access review, `HANDOFF-006` maintainability artifacts.

## 8. Release blocker

For R2+ production systems, an absent or materially inaccurate handoff, missing critical runbooks, unknown ownership, or an operation that only the original agent can explain blocks `OPERATING` unless a time-limited owner-approved exception records the limitation and remediation date.
