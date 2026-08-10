# Analytics & Product Telemetry

Canonical contract for product analytics and privacy-safe measurement.

## Event design

Maintain a versioned event taxonomy with stable names, schema, owner, purpose, trigger, allowed properties, retention, and privacy classification. Prefer business events over noisy UI clicks. Event schemas must be validated at the producer boundary.

Use a consistent identity model: anonymous/session identifier, authenticated user identifier, tenant identifier, and merge rules must be explicit. Do not silently merge identities or expose identifiers to other tenants.

## Privacy alignment

Analytics is a processing activity. Inventory it in the privacy data map and align it with the privacy notice, consent state, retention schedule, and processor inventory. Non-essential analytics must be blocked until required consent exists. Withdrawal must stop future collection where required.

Never send passwords, access tokens, payment card data, full message contents, unnecessary precise location, or sensitive categories merely because an analytics SDK accepts arbitrary properties. Redact before data leaves the process.

## Measurement

Define funnels, activation, retention, conversion, reliability/business-health metrics, and guardrails before implementation. Use cohort definitions that can be reproduced. Distinguish product analytics from operational telemetry: operational logs/traces should not become an accidental behavioral data warehouse.

Use server-side events for authoritative business outcomes such as payment success or entitlement grants. Client events are useful for UX intent but are not authoritative for money or access control.

## Retention and quality

Set retention per event category. Detect schema drift, duplicate events, impossible sequences, clock skew, missing consent, and sudden volume anomalies. Do not use unbounded user IDs as high-cardinality metric labels.

## Evidence: ANALYTICS-* probes

- **ANALYTICS-001 schema:** validate representative events against the documented schema and reject/flag invalid payloads.
- **ANALYTICS-002 consent:** exercise analytics before and after consent/withdrawal and verify actual collection behavior.
- **ANALYTICS-003 minimization:** inspect outbound analytics payloads for secrets, payment data, unnecessary PII, and prohibited fields.
- **ANALYTICS-004 identity:** verify anonymous-to-authenticated merge behavior and tenant isolation.
- **ANALYTICS-005 business authority:** compare a material server-side outcome with client events and prove the client cannot create an authoritative success state.
- **ANALYTICS-006 retention:** execute or inspect the retention mechanism and verify expiry/anonymization.
- **ANALYTICS-007 drift:** inject a malformed/unknown event version and verify safe handling plus operator visibility.
- **ANALYTICS-008 cost/cardinality:** inspect event volume, dimensions, and processor cost against documented budgets.

## Release blockers

Block when analytics contradicts the privacy policy/consent model, sends prohibited data, permits cross-tenant identity leakage, or is used as the authoritative source for money/security decisions.
