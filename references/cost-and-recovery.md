# Cost, Rollback, and Recovery

## Agent work budget

For non-trivial projects, estimate:

- maximum agent time;
- token/tool-call budget where visible;
- research query budget;
- parallel-agent budget;
- maximum remediation loops;
- human review time.

If the budget is exceeded, stop and report the tradeoff rather than silently degrading tests.

## Build checkpoints

For significant changes, create a checkpoint after each verified milestone. A failed change
should be reverted to the last verified checkpoint rather than repeatedly patching unknown
state. Preserve the reason for rollback in `DECISIONS.md` or the evidence ledger.

## Database changes

For destructive or risky migrations:

1. snapshot/backup when appropriate;
2. test migration on representative data;
3. test rollback or documented forward recovery;
4. verify constraints and data counts;
5. deploy in an order that preserves compatibility;
6. monitor after release.

## Disaster recovery

Record RPO and RTO for material production systems. Define backup frequency, retention,
encryption, access controls, restore procedure, and owner. Execute at least one restore test
before claiming the backup path is verified.

## Vendor exit

For every material vendor, record:

- data export format and procedure;
- credentials/secrets that must be rotated;
- replacement options;
- code/configuration coupling;
- migration risks and expected downtime.
