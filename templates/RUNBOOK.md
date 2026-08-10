# Production Runbook

> Fill this document with product-specific values before production release. Do not invent SLOs, RPOs, RTOs, contacts, or vendor behavior.

## 1. Service identity

- Product/service:
- Environment(s):
- Current build/version:
- Source/build SHA:
- Vibecode Max policy version:
- Database/schema version:
- Primary owner:
- On-call/contact:
- Escalation contact:

## 2. Reliability objectives

- SLO/SLIs:
- Error budget:
- RPO:
- RTO:
- Important exclusions/assumptions:

## 3. Observability

### Dashboards

- Service health:
- Golden signals:
- Business metrics:
- Database/dependencies:
- Queue/workers:
- Payments/reconciliation:
- AI usage/cost/quality:

### Logs/traces

- Log query location:
- Correlation/request ID field:
- Trace location:
- Error tracker:
- Redaction policy:

## 4. Health and deployment

- Liveness endpoint:
- Readiness endpoint:
- Status/version endpoint:
- Deployment system:
- Known-good build:
- Rollback command/procedure:

## 5. Critical alerts

For every critical alert, record trigger, likely impact, first checks, safe mitigation, escalation, and evidence to preserve.

| Alert | Trigger | Likely impact | First checks | Mitigation | Escalation |
|---|---|---|---|---|---|
| | | | | | |

## 6. Common incidents

### Elevated 5xx/errors

1. Confirm scope and affected version.
2. Check recent deployment and dependency health.
3. Correlate representative request IDs.
4. Apply the documented safe mitigation or rollback.
5. Verify recovery using health, error, latency, and business signals.

### Latency/SLO burn

1. Check p95/p99 and affected routes.
2. Check saturation, database, cache, queues, and external providers.
3. Identify recent configuration/deployment changes.
4. Apply safe capacity, traffic, or rollback action.
5. Verify latency recovery.

### Queue backlog / worker failure

1. Check queue depth and oldest-job age.
2. Check worker errors/restarts and dependency failures.
3. Stop unsafe replay if side effects may duplicate.
4. Recover workers and replay only idempotent/recoverable jobs.
5. Verify backlog drains without duplicate consequences.

### Payment/webhook failure

1. Check provider status and webhook delivery.
2. Check signature validation and event processing status.
3. Inspect durable event IDs and failed/dead-letter events.
4. Do not manually grant value based only on client redirects.
5. Reconcile against provider state before repair.

### Suspected security incident

1. Preserve relevant evidence.
2. Revoke/rotate affected credentials where appropriate.
3. Restrict compromised access paths.
4. Identify affected users/tenants/data.
5. Follow the security incident escalation and legal/privacy procedures.
6. Do not place secrets or sensitive payloads in incident notes.

### Database incident

1. Determine whether reads/writes are safe.
2. Check current schema/migration/version.
3. Preserve backups and logs before destructive action.
4. Follow rollback or forward-fix procedure.
5. Validate constraints, counts, and critical workflows after recovery.

## 7. Rollback and recovery

- Application rollback procedure:
- Database forward-fix procedure:
- Worker/queue drain procedure:
- Backup identifier/location:
- Restore procedure:
- Restore test evidence:
- Post-recovery validation:

## 8. Communication

- Internal incident channel:
- Customer status channel:
- Support escalation:
- Privacy/legal escalation:
- Security escalation:

## 9. Post-incident review

For material incidents record:

- timeline;
- user/business impact;
- detection gap;
- root/systemic causes;
- mitigation;
- recovery duration;
- data-loss assessment;
- what worked;
- what failed;
- permanent corrective actions;
- owner and due date.

The review is blameless and should produce concrete prevention or detection improvements.

## 10. Known limitations

List anything unavailable in the current host/environment. Mark it `not_available` or `not_verified`; never describe it as tested when it was not.
