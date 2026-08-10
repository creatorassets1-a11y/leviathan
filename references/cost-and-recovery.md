# Cost, Rollback, and Recovery

## Agent work budget

For non-trivial projects, estimate maximum agent time, token/tool-call budget where visible, research query budget, parallel-agent budget, remediation loops, and human review time. If the budget is exceeded, stop and report the tradeoff rather than silently degrading tests.

## Build checkpoints

For significant changes, create a checkpoint after each verified milestone. A failed change should be reverted to the last verified checkpoint rather than repeatedly patching unknown state. Preserve the reason for rollback in `DECISIONS.md` or the evidence ledger.

## Deployment rollback

Every production-bound deployment should document:

- what constitutes a safe rollback;
- how to identify the currently deployed build;
- how to revert application code/configuration;
- database compatibility requirements;
- how to stop or drain background workers safely;
- how to prevent duplicate side effects during rollback;
- post-rollback validation;
- owner/escalation path.

Prefer backward-compatible database changes so application rollback remains possible. If a migration cannot be rolled back, document the forward-fix procedure and compatibility window.

## Database changes

For destructive or risky migrations: snapshot/backup when appropriate, test migration on representative data, test rollback or documented forward recovery, verify constraints and data counts, deploy in a compatible order, and monitor after release.

For material databases, record migration duration, lock/availability risks, expected data volume, indexes affected, and validation queries where applicable. Never claim a migration is safe solely because it succeeded against an empty development database.

## Disaster recovery

Record RPO and RTO for material production systems. Define backup frequency, retention, encryption, access controls, restore procedure, owner, and dependencies required during recovery.

Execute at least one restore test before claiming the backup path is verified. Record:

- backup identifier/time;
- restored environment;
- schema/version;
- restore duration;
- validation performed;
- data-integrity result;
- observed RPO/RTO;
- failures or limitations;
- next corrective action.

A backup that exists but has never been restored is not verified recovery capability.

## Observability recovery linkage

Production handoff must connect the recovery plan to the observability system:

- alert/runbook for backup failure;
- alert/runbook for restore or replication failure where applicable;
- dashboard for storage/backup health where available;
- deployment identity for rollback decisions;
- evidence ledger entry for restore tests.

## Cost and cardinality control

Observability costs must be bounded deliberately. Record appropriate log, metric, trace, and error-tracking retention and sampling policies. Avoid unbounded metric labels such as user IDs or request IDs. Prefer logs/traces for high-cardinality investigation dimensions.

Define a telemetry cost ceiling or review trigger where observability spend is material. Sampling must not silently discard all errors or critical business events.

Retention must satisfy both debugging needs and legal/privacy requirements. Do not collect sensitive data merely to make debugging easier.

## Vendor exit

For every material vendor, record data export format/procedure, credentials/secrets that must be rotated, replacement options, code/configuration coupling, migration risks, expected downtime, and observability dependencies that must be replaced.
