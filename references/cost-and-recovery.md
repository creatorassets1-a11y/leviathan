# Cost, Rollback, and Recovery

## Agent work budget

For non-trivial projects, estimate maximum agent time, token/tool-call budget where visible, research query budget, parallel-agent budget, remediation loops, and human review time. If the budget is exceeded, stop and report the tradeoff rather than silently degrading tests.

## Build checkpoints

For significant changes, create a checkpoint after each verified milestone. A failed change should be reverted to the last verified checkpoint rather than repeatedly patching unknown state. Preserve the reason for rollback in `DECISIONS.md` or the evidence ledger.

## Database changes

For destructive or risky migrations: snapshot/backup when appropriate, test migration on representative data, test rollback or documented forward recovery, verify constraints and data counts, deploy in a compatible order, and monitor after release.

## Disaster recovery

Record RPO and RTO for material production systems. Define backup frequency, retention, encryption, access controls, restore procedure, and owner. Execute at least one restore test before claiming the backup path is verified.

## Vendor exit

For every material vendor, record data export format/procedure, credentials/secrets that must be rotated, replacement options, code/configuration coupling, migration risks, and expected downtime.
