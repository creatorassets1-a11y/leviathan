# Analytics & Product Telemetry

## Purpose
Measure product health and user outcomes without turning analytics into an uncontrolled copy of the production database.

## Event contract
Define a stable event taxonomy with event name, actor scope, timestamp, schema version, and only required properties. Prefer product outcomes over click noise. Version schemas and document ownership. Do not use unbounded user IDs, raw prompts, full URLs containing secrets, or sensitive attributes in high-cardinality telemetry.

## Identity and privacy
Use a stable internal analytics identifier only when justified. Separate authentication identity from analytics identity where possible. Honor consent and regional restrictions before non-essential tracking. Record consent/version/scope. Provide deletion/export propagation where required. Analytics retention must be explicit and enforced.

## Data quality
Validate events at ingestion. Reject or quarantine malformed events. Detect duplicate, missing, out-of-order, and schema-breaking events. Maintain a data dictionary and dashboard ownership. Never let analytics events become authoritative payment, entitlement, security, or accounting state.

## Observability
Track event volume, ingestion errors, latency, schema violations, dropped events, and cost. Correlate product telemetry with operational telemetry without copying unnecessary PII.

## AI telemetry
Record model/provider/version, latency, token counts, tool/retrieval identifiers, outcome class, and cost when useful. Store prompts/outputs only when justified, minimized, access-controlled, and disclosed. Prefer prompt/version IDs and redacted traces.

## Evidence
- consent-gating test;
- event schema validation test;
- identity/deletion propagation test;
- retention expiry test;
- duplicate/out-of-order ingestion test;
- dashboard/data-dictionary review;
- secret/PII scan of telemetry payloads;
- analytics-policy consistency review.

## Blockers
Block non-essential analytics if it bypasses required consent, collects prohibited data, contradicts published policy, or can alter authoritative business state.