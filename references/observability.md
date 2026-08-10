# Observability

Observability is part of production readiness, not an enterprise-only extra.

## Minimum for a production backend

- structured application logs;
- error tracking with safe redaction;
- health/readiness endpoint;
- request latency and error metrics;
- dependency/database latency where useful;
- authentication and abuse signals without sensitive payloads;
- alerts for availability and critical business failures;
- deployment version/build identifier in telemetry;
- rollback procedure;
- incident response contact and first-response steps.

## Data minimization

Do not log passwords, tokens, authorization headers, session identifiers, full payment data, private message bodies, or unnecessary personal data. Redact before telemetry leaves the process. Define retention appropriate to the project and region.

## Reliability objectives

For systems where downtime/data loss matters, record SLO, RPO, and RTO. Targets are product-specific. Never invent them.

## Verification

A release should demonstrate that health checks return expected states, errors are captured without secret leakage, critical alerts have a documented trigger, deployment identity is visible, rollback can be followed, and backups/restore paths are tested when applicable.
