# Feature Flags, Experimentation & Progressive Delivery

## Core rules
- Flags are server-authoritative for security, entitlements, billing, and irreversible behavior.
- A flag is not an authorization boundary. Every privileged action still checks real permissions.
- Every flag has an owner, purpose, type, default, scope, expiry/review date, and rollback/kill-switch behavior.
- Defaults must fail safely. Unknown/missing configuration must not grant privileged access or free paid value.
- Targeting must not leak sensitive attributes or allow users to self-select into privileged cohorts.
- Separate operational release flags from experiments and entitlements.

## Rollout
Prefer dark launch → internal cohort → small percentage → broader cohort → full rollout. Define success/error guardrails before rollout. Support immediate kill switches and rollback without requiring a new client build where architecture permits.

## Experiments
Predefine hypothesis, primary metric, guardrails, population, duration, randomization unit, exclusions, sample-size rationale, and stopping rule. Do not infer causality from unplanned segmentation. Respect consent and regional restrictions.

## Flag lifecycle
Search for stale flags before release. Remove expired flags and dead code. Never accumulate permanent flags. Record changes in audit logs with actor, time, old/new value, scope, and reason.

## Evidence
- default/deny behavior test;
- server-side authorization test independent of flag state;
- cohort targeting test;
- kill-switch exercise;
- rollback exercise;
- audit-log verification;
- experiment metric/privacy review;
- stale-flag inventory.

## Blockers
Block release if a flag can grant privileged access without server authorization, a missing configuration grants unsafe behavior, or a production flag has no owner/rollback path.