# Privacy Engineering & Data Lifecycle Policy

Leviathan is privacy-risk-aware, not a legal authority. This document defines engineering controls that make privacy commitments testable. It does not establish that a product is legally compliant. Jurisdiction-specific requirements must still be assessed under `references/legal-compliance.md`.

## Core rule

Privacy requirements must become system behavior, not policy prose. If the product says a person can access, export, correct, withdraw consent, or delete data, the implementation must provide that capability or explicitly document the limitation. If a processor receives data, it must appear in the inventory. If data expires, an automated lifecycle mechanism or an explicitly accepted limitation must exist.

## 1. Living data inventory

Before production, create a data inventory covering at minimum:

- database tables and columns;
- object/file storage;
- search indexes;
- caches and queues;
- application and audit logs;
- analytics and telemetry;
- backups and replicas;
- support systems;
- payment providers;
- email/SMS providers;
- hosting/CDN providers;
- error tracking and observability providers;
- AI/model providers and retrieval stores;
- exports and administrative tools.

For each personal-data category record:

- data element/category;
- owner/system of record;
- purpose;
- legal basis where applicable;
- sensitivity classification;
- collection point;
- downstream recipients/processors;
- storage locations/regions;
- retention period or deletion trigger;
- access roles;
- encryption/protection;
- deletion/anonymization behavior;
- export behavior;
- legal-hold or statutory-retention exception;
- last review date.

The inventory is a living artifact and must be updated when schema, vendors, analytics, AI behavior, retention, or data flows change.

## 2. Classification and minimization

Classify data using product-appropriate categories such as public, internal, personal, sensitive personal, authentication secret, financial, or regulated data. Classification must be visible in schema metadata, a catalog, migration annotations, or equivalent documentation.

Collect the minimum data needed for the current purpose. Prefer progressive profiling over collecting optional information at signup. Do not accept, persist, export, log, or forward fields that have no justified purpose.

API validation and schema design must reinforce minimization. Removing a field from the UI is not sufficient if the server still accepts and stores it.

## 3. Purpose and processing boundaries

For each material processing activity, record the purpose and applicable legal basis where required. Do not silently reuse data for a materially different purpose.

Analytics, error tracking, support tools, AI providers, and other secondary systems must receive the minimum data required for their function. Prefer identifiers, aggregation, redaction, tokenization, or pseudonymization where raw personal data is unnecessary.

## 4. Consent and preferences

Where consent is the required legal basis:

- non-essential processing must remain disabled until valid consent is recorded;
- store consent version, scope, timestamp, collection method, and relevant policy/version reference;
- support withdrawal through a comparably accessible path;
- withdrawal must change the actual processing behavior, not merely a UI flag;
- do not bundle unrelated purposes into one mandatory consent where separate choice is required;
- retain evidence needed to demonstrate the state of consent without retaining unnecessary data.

Cookie/tracking preference controls must govern the actual tags, SDKs, network calls, and storage they represent.

## 5. Data-subject and account rights

Where applicable, rights must be implemented as authenticated, rate-limited, auditable workflows.

### Access/export

Provide a machine-readable export and, where appropriate, a human-readable summary. Define which systems are included, how identity is verified, how asynchronous completion is communicated, and how the export is protected and expires.

Exports must not include another user's or tenant's data. Avoid placing sensitive exports in predictable public URLs.

### Correction

Users must be able to correct material account data through authenticated controls or a documented support workflow. Corrections must propagate to dependent systems where appropriate.

### Deletion/erasure

Deletion must cover the known data graph: primary records, child records, object storage, search indexes, caches, derived tables, analytics where controllable, and processors where applicable. Where deletion is not immediate because of backups, legal holds, fraud prevention, accounting, or statutory obligations, record the exception, retention basis, expiry/overwrite schedule, and access restrictions.

Deletion should be idempotent and safe to retry. A deletion request must not accidentally remove another person's shared/tenant data.

### Account closure

Define what closing an account does to active sessions, subscriptions, outstanding obligations, public content, support records, financial records, and retained legal/audit data.

## 6. Retention and automated lifecycle

Define retention periods or event-driven deletion rules for material categories, including where relevant:

- account/profile data;
- authentication/security events;
- analytics;
- application/error logs;
- support tickets;
- UGC;
- AI conversations/prompts/outputs;
- payment and financial records;
- exports;
- backups;
- temporary files;
- consent records.

Lifecycle jobs must be safe to retry, observable, bounded, and auditable without leaking the data being removed. Prefer deletion or irreversible anonymization when the purpose expires.

Legal holds and statutory retention must be narrow and explicit. They must not become a general-purpose reason to retain everything forever.

Backups need a documented lifecycle. If individual records cannot be removed from immutable backups, document the overwrite/expiry schedule and prevent restored historical data from silently re-entering production without the deletion state being reconciled.

## 7. Processor and sub-processor inventory

Maintain an inventory of every external recipient of personal data. For each provider record:

- purpose/data categories;
- geographic processing/storage;
- contract/DPA status where applicable;
- sub-processors where relevant;
- retention/deletion behavior;
- security/privacy controls;
- transfer mechanism where required;
- exit/deletion procedure.

No new material processor should receive production personal data before the required review and contractual/organizational controls are complete.

On vendor exit, verify return/deletion according to the contract and preserve evidence.

## 8. Cross-border processing and residency

Record where personal data is stored and processed, including material backups and processors. Assess applicable transfer restrictions and mechanisms for each relevant market.

If the product promises regional residency, enforce it architecturally rather than through documentation alone. Region selection must propagate to primary storage, backups, queues, search, analytics, and processors as required by the promise.

Never claim residency merely because the primary database is regional if material copies leave that region.

## 9. AI and personal data

Prompts, retrieved records, uploaded documents, tool arguments, conversation history, and model outputs can contain personal data. Apply the same minimization, purpose, access, retention, and deletion rules to them.

Before sending data to an AI provider, determine:

- exactly what fields are transmitted;
- why they are required;
- provider retention/training behavior;
- processing/storage regions;
- deletion controls;
- tenant isolation;
- whether user controls or consent apply.

Redact, tokenize, summarize, or pseudonymize where raw data is unnecessary. Do not send secrets or unrelated personal records merely because the model can technically accept them.

If users can opt out of training/model-improvement use, make the preference effective in the provider integration and verify it. Do not promise provider behavior that has not been confirmed.

AI logs and traces must follow the product's privacy classification and observability redaction policy.

## 10. Access, encryption, and auditability

Protect personal data in transit and at rest according to risk. Production access should use least privilege, preferably time-limited elevation, and should be attributable.

Sensitive-data access by operators or privileged services should produce security/audit events without copying unnecessary sensitive values into the audit record.

Combine privacy controls with `references/auth-security.md` and `references/observability.md`: authorization, RLS/object controls, secret handling, log redaction, and incident response remain mandatory.

## 11. Breach and incident readiness

Know what data categories and users could be affected by a material incident. Maintain enough records to determine scope and support applicable notification obligations. Do not invent a universal notification deadline; assess the target jurisdictions and contracts.

Incident telemetry must preserve useful forensic identifiers while minimizing unnecessary personal data.

## 12. Privacy-by-design change gate

Re-run privacy analysis when any change:

- adds a personal-data field;
- adds or changes analytics/tracking;
- adds a processor or AI provider;
- changes retention/deletion;
- changes authentication or identity data;
- changes export/deletion behavior;
- changes data residency;
- introduces new AI retrieval, logging, or training behavior;
- changes UGC/moderation data flows.

Update the inventory, policy mapping, retention rules, processor list, and tests as applicable.

## 13. Required verification evidence

For products processing personal data, the evidence ledger should contain, as applicable:

- current data inventory/classification;
- purpose/legal-basis mapping where required;
- processor/sub-processor inventory;
- consent record and behavioral gating test where consent is required;
- export test showing complete, authorized output;
- deletion test covering known storage/derived systems;
- correction test;
- retention-job execution evidence;
- backup lifecycle/restore evidence;
- AI-provider data-flow and retention review where AI exists;
- cross-border/residency assessment where applicable;
- access-control/RLS evidence;
- log/telemetry redaction evidence;
- privacy-policy versus implementation consistency review.

`not_run`, `not_available`, `simulated`, and `unknown` must never be represented as `passed`.

## 14. Privacy probes

### PRIV-001: data inventory completeness

Trace a representative user's data through signup, core workflows, analytics, support, AI, payments, exports, logs, caches, and deletion. Compare observed destinations against the inventory. Every unexpected recipient or storage location is a finding until classified.

### PRIV-002: minimization probe

Inspect representative create/update APIs, schemas, logs, analytics events, and provider payloads. Attempt to submit unnecessary personal fields and verify they are rejected or discarded. Verify sensitive values are not copied into telemetry without justification.

### PRIV-003: consent gating

With consent absent, inspect network/storage behavior and verify non-essential processing does not occur. Grant consent and verify it begins where intended. Withdraw consent and verify the processing stops. Repeat after reload/session renewal.

### PRIV-004: export authorization and completeness

Request export as User A and verify only A's data is included. Attempt another user's identifier and direct object access. Verify the resulting package contains the systems promised by the product and expires/is protected as designed.

### PRIV-005: deletion propagation

Create synthetic test data across every known storage/derived destination. Execute deletion and verify primary records, child records, objects, indexes, caches, derived records, and controllable processors are removed or anonymized according to policy. Verify retained exceptions and backup schedules explicitly.

### PRIV-006: retention execution

Seed records at and beyond the configured retention boundary. Run the lifecycle job in a safe environment. Verify eligible records are removed/anonymized, protected records remain only when justified, retries are safe, and the job produces useful non-sensitive audit evidence.

### PRIV-007: processor drift

Compare the declared processor inventory with actual dependencies, environment configuration, network calls, SDKs, webhook destinations, and provider integrations. Flag undeclared data recipients.

### PRIV-008: AI data-flow probe

Execute representative AI requests containing synthetic personal data. Verify only required fields reach the provider, tenant boundaries remain intact, retention matches the documented policy, logs are redacted, and deletion/opt-out behavior is effective where promised.

### PRIV-009: residency/transfer probe

For products with residency commitments, trace production and backup data destinations, queue routing, search, analytics, AI, and processor calls. Verify every material copy follows the documented region/transfer design.

### PRIV-010: privileged-access audit

Exercise a controlled operator access to sensitive data. Verify least privilege, authorization, audit attribution, and absence of unnecessary sensitive values in the audit event.

## 15. Release gates

For R2+ products handling personal data, release must not be represented as privacy-ready when any of the following material blockers remain without an explicit, time-limited, owner-approved exception:

- no reasonably current data inventory;
- undocumented material processor receiving personal data;
- export promised but not functioning or honestly documented as unavailable;
- deletion promised but not implemented or residual locations not documented;
- consent required but not behaviorally enforced;
- retention claims with no enforcement mechanism or documented limitation;
- cross-tenant/user data exposure in export/deletion flows;
- AI provider receiving unnecessary personal data or violating documented retention/opt-out behavior;
- residency promise contradicted by material data copies;
- privacy policy materially contradicts actual processing;
- sensitive production access lacks appropriate authorization/audit controls.

## References

Coordinate with:

- `references/legal-compliance.md`
- `references/auth-security.md`
- `references/threat-model.md`
- `references/observability.md`
- `references/cost-and-recovery.md`
- `references/testing.md`
- `templates/PRD.md`
