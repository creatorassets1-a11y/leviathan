# Testing and Verification Protocol

Leviathan's credibility rule is simple: **a claim is only as strong as its executed evidence**. The protocol is host-neutral and must work with Claude, Codex, Kimi, Lovable, and other agents.

## Verification order

```text
build -> independent review -> remediation -> QA -> security -> release decision -> handoff
```

The reviewer should inspect the actual output cold. It must not rely on the builder's explanation.

## Evidence ledger

Each check records:

```text
id
category
severity
status
command/tool action
timestamp
environment
exit/result
artifact
notes/limitations
```

A report must never upgrade `not_run`, `not_available`, `simulated`, or `unknown` into `passed`. If the host cannot perform a check, report the limitation and choose a lower-confidence release status rather than inventing evidence.

## Release gates

### Security

- zero critical security findings;
- zero exposed secrets;
- zero unresolved authentication or authorization bypasses;
- object-level authorization tested for parameterized resources;
- authorization matrix exercised for privileged resources;
- RLS/object policies verified where supported;
- no service-role/database-admin credential exposed to clients;
- abuse-sensitive rate limits actually exercised;
- session/token storage and relevant rotation/revocation behavior checked;
- security headers, CORS, CSRF controls where relevant, and TLS behavior checked for web deployments;
- dependency vulnerabilities reviewed;
- webhook authenticity/idempotency checked where applicable;
- upload controls checked where applicable.

A critical blocker includes an exploitable authorization bypass, cross-tenant data exposure, exposed privileged secret, authentication/MFA bypass, payment fulfillment bypass, or equivalent high-impact failure. It cannot be marked accepted merely because exploitation requires an unusual UI path.

### Legal, trust, and support

For R2+ products with users, accounts, personal data, payments, or UGC, verify the required surface inventory from `references/legal-compliance.md` and `references/support-surfaces.md`.

- Terms and Privacy exist where required and accurately describe implementation;
- cookie/tracking notice and preference controls exist where required;
- AUP/community rules exist where accounts or UGC make them necessary;
- refund/cancellation/shipping policies exist where the product behavior requires them;
- accessibility statement exists where required by product/market analysis;
- UGC/takedown process exists where applicable;
- Contact/Support is reachable;
- Help/FAQ covers real product questions;
- Product Guide/Walkthrough exists for non-trivial products;
- first-run and recovery guidance exists where applicable;
- legal/privacy/accessibility/security request routes work where promised;
- every required page has a Last updated date and version identifier;
- plain-language summary does not contradict the formal policy;
- legal links are reachable from appropriate footer/account/signup/checkout surfaces;
- policy text matches actual data flows, cookies, analytics, processors, retention, payment behavior, AI behavior, and enforcement;
- data access/export/deletion controls work or are explicitly documented as unavailable/limited;
- legal status is recorded and required human review is completed before release;
- enforcement/moderation is server-side, auditable, attributable, and appealable where applicable.

Missing required higher-risk legal surfaces, materially inaccurate policy text, unreachable required contact paths, or unresolved mandatory legal review are release blockers unless a documented time-limited exception is explicitly permitted by the applicable risk tier.

### Accessibility

- automated scan where applicable;
- keyboard-only core flows;
- focus visibility and order;
- semantic names/labels;
- contrast;
- zoom/reflow;
- reduced motion;
- screen-reader spot checks using a platform-appropriate reader.

Automated accessibility tools are not proof of full accessibility.

### Performance

- define product-specific budgets from the target audience;
- test representative flows;
- use realistic device/network conditions;
- run multiple measurements when feasible;
- record p50/p75 where the tool provides it;
- separate lab evidence from real-user evidence;
- measure after production deployment when production performance matters.

### Data integrity

- migrations tested on representative data;
- rollback or forward-recovery path documented;
- idempotency checked for retried operations;
- deletion/export behavior tested;
- backup restore actually executed for material persistent systems;
- RPO/RTO documented where applicable.

### Supply chain

- lockfile present;
- dependency scan run;
- new packages reviewed;
- secret scan run;
- SBOM generated where supported;
- licenses recorded;
- CI actions and third-party integrations reviewed.

### Operations and reliability

For R3/R4 and production-bound R2 systems:

- structured logs are active and queryable;
- representative requests carry a trace/request/correlation ID;
- health and readiness checks return expected states;
- deployment/build identity is visible in telemetry;
- golden-signal metrics and material business/dependency metrics exist;
- at least one critical alert has an executable trigger and runbook;
- controlled failures appear in error tracking without secret leakage;
- retention, sampling, and redaction policies are documented;
- material backup restore has been executed or the limitation is explicit;
- rollback/recovery is written and executable;
- SLO/RPO/RTO are recorded where applicable;
- queue/worker/dependency failure visibility exists where applicable;
- incident contact and escalation path exist;
- AI observability exists where applicable without exposing prohibited data.

A production release must not claim observability readiness from configuration inspection alone. Exercise the system and record observed evidence.

## Legal and support probe batteries

### LEGAL-001: required-surface inventory

Using the product's actual markets, users, data, payments, UGC, AI features, and regulated activities, produce the required legal/trust/support inventory. Verify every required page or system exists. Record explicit `not_applicable` reasons for omitted surfaces.

### LEGAL-002: implementation-policy consistency

Compare the generated Privacy, Terms, tracking notice, AUP, refund/cancellation, and other applicable policies against the actual data model, analytics, cookies, processors, retention, authentication, payment flows, AI behavior, UGC, moderation, and support systems. Any material mismatch is a finding.

### LEGAL-003: reachability/version/readability

Open each required page from the relevant footer, signup, checkout, account, and settings paths. Verify the page has a Last updated date, version identifier, plain-language summary, accessible headings, and working links. Verify the summary does not contradict the formal text.

### SUPPORT-001: help coverage

Enumerate the product's major user tasks and predictable failures. Verify Help/FAQ covers onboarding, core workflows, account recovery, permissions, billing/cancellation where applicable, privacy/data controls, and troubleshooting. Links must resolve to current UI/features.

### SUPPORT-002: guide/first-run coverage

Execute first-run and at least one core workflow. Verify the guide/walkthrough matches the current interface and covers a useful first task plus common recovery paths. Verify empty states and onboarding links point to relevant guidance.

### SUPPORT-003: contact escalation

Submit a controlled support request. Verify the advertised channel is reachable, creates the promised tracking/acknowledgement if applicable, and routes privacy/legal/accessibility/security requests correctly. Do not send real sensitive data during testing.

### LEGAL-004: data-rights flow

Where applicable, execute access/export/deletion/correction/consent-withdrawal flows using a test account. Verify authorization, scope, completion state, retention/legal-hold behavior, and that the system does not expose another person's data.

### LEGAL-005: enforcement/audit/appeal

For products with accounts or UGC, trigger controlled warning, soft-limit, suspension, and ban paths where implemented. Verify server-side enforcement, attributable reason/rule, durable audit record, expiry behavior, appeal/review path, and protection against ordinary-user deletion or silent client bypass.

### LEGAL-006: moderation abuse resistance

Where reporting/moderation exists, test duplicate/abusive reports, reporter targeting, moderator privilege boundaries, appeal loops, and automated moderation false-positive recovery. Verify consequential automated actions cannot bypass the documented review model.

## Security probe batteries

These probes are templates. Adapt identifiers to the application's actual resources and preserve the allow/deny evidence.

### SEC-AUTHZ-001: authorization matrix

Build a matrix of `principal/role × resource × operation × expected result` for anonymous, ordinary user, another user, tenant member, another tenant, support/admin, and privileged service context as applicable.

For each protected mutation and read path, execute both an allowed case and a denied case. A frontend-hidden control is never sufficient evidence.

### SEC-AUTHZ-002: IDOR/cross-user/cross-tenant battery

For each object identifier accepted by an API/action:

1. create object as principal A;
2. access/read it as principal B;
3. update it as B;
4. delete it as B;
5. attempt identifier substitution through path/query/body/form payloads;
6. repeat across tenant boundaries;
7. repeat with guessed/sequential identifiers if identifiers are enumerable;
8. verify every denied request leaves no unauthorized side effect.

Expected result: every unauthorized operation is denied without leaking protected fields.

### SEC-RLS-001: policy verification

Where RLS/object policy exists, enumerate protected tables/resources and their policies. Verify deny-by-default behavior and execute database/API tests with anonymous, owner, different-user, different-tenant, and privileged backend contexts. Attempt select/read, insert, update, delete, and upsert paths as applicable. Test helper functions/RPCs and explicitly inspect privileged/`SECURITY DEFINER` execution paths.

Evidence: policy inventory + executed results. Absence of an RLS-capable policy is a finding unless the architecture documents an equivalent enforced boundary.

### SEC-AUTHZ-003: server-side privilege test

For every admin/support/destructive endpoint, bypass the UI and invoke the endpoint directly as an ordinary user. Alter role claims or client fields where applicable. Expected result: server denial. Repeat with a valid privileged principal and verify the intended operation succeeds.

### SEC-SESSION-001: browser/session storage audit

Inspect application code and built client output for access/refresh tokens, service credentials, or other long-lived sensitive secrets in localStorage/sessionStorage, URLs, query strings, logs, analytics payloads, or client bundles. Verify session ID rotation after authentication and relevant privilege changes, idle/absolute expiry, revocation, log-out-everywhere, and password/MFA/recovery-triggered invalidation where applicable.

### SEC-MFA-001: OTP and recovery abuse battery

For each OTP/recovery flow verify short expiry, single use, failed-attempt counter, account/network rate limits, resend throttling, enumeration resistance, factor enrollment/removal protection, lost-factor recovery protection, and session invalidation after takeover-risk recovery. Attempt expired, reused, guessed, over-limit, and cross-account challenges.

### SEC-RATE-001: rate-limit exercise

For every listed abuse-sensitive endpoint, execute requests until the documented threshold is reached. Verify account/principal and network dimensions where both are required, progressive friction behavior, retry timing, and safe recovery. Record actual request count, response status/headers, elapsed time, and reset behavior.

### SEC-XSS-001: untrusted content battery

Insert context-appropriate benign XSS probes into every user-controlled text/HTML/markdown field, URL parameter, filename, imported record, and AI-generated content sink. Test stored, reflected, and DOM paths. Verify no script executes and that rendered output is encoded/sanitized according to context.

### SEC-WEB-001: CSRF/CORS/headers

For cookie-authenticated mutations, attempt cross-site state-changing requests and verify CSRF/origin defenses. Inspect CORS responses for explicit origins and verify credentials are never combined with wildcard origins. Check production headers including HSTS, content-type sniffing, framing, referrer policy, and CSP appropriate to the application.

### SEC-UPLOAD-001: upload abuse

Test oversized files, misleading extensions, incorrect Content-Type, malformed files, path traversal filenames, archive/document edge cases, active formats such as SVG where relevant, quota exhaustion, and unauthorized object access. Verify quarantine/scanning where required and private storage/signed URL behavior.

### SEC-WEBHOOK-001: authenticity/replay/idempotency

Send unsigned, invalid-signature, stale/replayed, duplicated, and reordered webhook events. Verify rejection/authenticity checks, event-ID deduplication, idempotent side effects, and correct handling of at-least-once delivery. Money-related flows must not depend on browser redirects for fulfillment.

### SEC-SECRET-001: secret exposure

Scan source, git history where available, client bundles, generated artifacts, CI logs/artifacts, configuration output, and telemetry samples. Verify no privileged credential is client-visible. If a secret was exposed, evidence must show revocation/rotation and dependent credential review.

### SEC-AI-001: AI security battery

Where AI is present, test user/retrieved prompt injection, tool-authorization bypass, cross-tenant retrieval leakage, unsafe arguments, sensitive data appearing in prompts/logs, output-to-execution paths, unbounded cost/tool loops, provider failure, and malicious documents attempting to alter system behavior.

Expected result: untrusted model/content output cannot expand authorization or cause an unapproved consequential side effect.

## Operations and reliability probe batteries

### OPS-001: structured-log correlation

Trigger a controlled request that reaches the backend. Locate the resulting structured log entries and verify stable timestamp, level, service, environment, version/build ID, event name, duration/status, and request/correlation ID. Where tracing exists, verify trace/span IDs are propagated. Verify sensitive fields are absent or redacted.

### OPS-002: health/readiness semantics

Exercise liveness and readiness endpoints under normal operation and a controlled dependency degradation. Verify liveness answers whether the process is alive and readiness prevents unsafe traffic when required dependencies make the instance unable to serve. Verify responses do not leak internal topology or secrets.

### OPS-003: deployment identity

Record the deployed version/build SHA and verify the same identity is visible in telemetry and, where safely exposed, the operational status endpoint. Deploy two known versions in a test/staging environment and confirm an operator can distinguish them.

### OPS-004: golden-signal metrics

Generate representative traffic containing success, client error, server error, slow request, and dependency failure cases. Verify request rate, error rate, latency distribution, and saturation metrics reflect the events. Verify business metrics exist for material workflows and that metric labels do not contain unbounded identifiers.

### OPS-005: alert exercise and runbook

For at least one critical alert, intentionally trigger the documented condition in a safe environment. Verify the alert fires at the expected severity, contains enough context to act, links to the correct runbook, and can be resolved without creating duplicate alerts. Record detection time and observed behavior.

### OPS-006: error-tracking redaction

Trigger a controlled application exception containing synthetic secret-like values and PII-like test data. Verify the error tracker receives enough diagnostic context but does not retain the sensitive values. Verify grouping prevents repeated identical failures from becoming an alert storm.

### OPS-007: trace propagation

For multi-service/queue systems, trigger a request that crosses at least two components. Verify the trace/correlation context is preserved across the boundary and the resulting trace can be followed end-to-end. Record any vendor boundary where propagation is unavailable.

### OPS-008: dependency failure and retry behavior

Inject a controlled timeout or error from a material external dependency. Verify timeout bounds, retry count/backoff/jitter, circuit/degraded behavior where applicable, idempotency protection, and user-facing recovery. Confirm non-idempotent side effects are not blindly duplicated.

### OPS-009: queue/worker failure recovery

Where asynchronous work exists, enqueue a controlled job and force a worker failure. Verify retry behavior, queue age/depth metrics, failure visibility, dead-letter behavior where applicable, and safe replay. Confirm replay cannot duplicate consequential side effects.

### OPS-010: backup restore evidence

For material persistent systems, perform a real restore into an isolated environment. Record backup identifier, restore duration, schema/version, data-integrity checks, observed RPO/RTO, and limitations. A successful backup creation alone is not a pass.

### OPS-011: rollback exercise

Deploy a known-good version followed by a controlled faulty version in a safe environment. Execute the documented rollback or forward-fix procedure. Verify database compatibility, worker behavior, health/readiness, critical workflows, deployment identity, and telemetry after recovery.

### OPS-012: incident-response drill

Simulate a material but controlled incident. Verify the responder can identify the owner, inspect the alert, correlate logs/metrics/traces, determine deployment identity, execute the first mitigation, communicate status, and record evidence. Capture missing steps as findings.

### OPS-013: observability cost/cardinality review

Inspect representative metric labels, log volume, trace sampling, and retention. Verify no unbounded identifiers are metric dimensions, errors/critical business events are retained according to policy, and telemetry spend/volume has an explicit review threshold where material.

### OPS-014: AI telemetry safety

Where AI is present, execute a representative request and verify model/provider/version, usage/token counts, latency, tool/retrieval metadata, outcome, and cost signals are observable without exposing raw secrets or unnecessary private prompts/outputs. Verify AI telemetry cannot bypass tenant or authorization boundaries.

## Payment probe batteries

For every R3/R4 product that accepts, moves, refunds, or grants value based on money, use `references/payments.md` as the canonical checklist and execute every applicable probe. Do not mark payment behavior as passed from code inspection alone when the behavior can be exercised in a provider sandbox/test environment.

### PAY-001: forged webhook rejection

Send an event with a missing, malformed, or invalid provider signature. Expected result: rejected without business side effects. Evidence records endpoint, event type, response, timestamp, and absence of side effects.

### PAY-002: duplicate event idempotency

Deliver the exact same provider event at least twice, including concurrent delivery where practical. Verify only one fulfillment, entitlement grant, email, ledger mutation, refund, or other side effect occurs. Confirm the provider event ID is protected by a durable uniqueness constraint.

### PAY-003: replay/stale-event safety

Replay an old valid event after newer canonical provider state exists. Verify the application does not roll the product backward or grant/revoke value incorrectly. Use provider re-fetch where required.

### PAY-004: out-of-order convergence

Deliver subscription/payment lifecycle events in an intentionally wrong order. Verify final internal state converges to current provider state and does not depend on event ordering.

### PAY-005: fulfillment source-of-truth

Complete a payment through the provider's sandbox. Verify entitlement/order fulfillment occurs only after trusted server/provider evidence. Repeat by visiting or manipulating the client success URL without a successful provider event and confirm no entitlement is granted.

### PAY-006: client-price/entitlement tampering

Alter price, currency, quantity, product/price ID, user ID, order ID, plan, balance, or entitlement fields in client requests. Verify the server derives authoritative values from trusted product/provider state and rejects unauthorized changes.

### PAY-007: outbound idempotency

Retry the same server-side create/update operation using the provider's idempotency mechanism. Verify it does not create duplicate payment objects/orders/subscriptions.

### PAY-008: authentication-required payment

Exercise the provider's required-action/3DS test path. Verify the application does not fulfill before trusted success and handles cancellation/failure/retry correctly.

### PAY-009: refund correctness

Execute full and partial refunds where supported. Verify authorization, provider state, internal ledger/audit record, entitlement behavior, duplicate-refund protection, and customer-visible status.

### PAY-010: failed-payment/dunning

Use official provider sandbox failure scenarios. Verify invoice/subscription state, retry/dunning behavior, notifications, grace-period rules, access restrictions, and restoration after successful recovery.

### PAY-011: subscription lifecycle

Use provider test clocks/sandbox lifecycle controls where available to test trial, renewal, upgrade, downgrade, quantity change, proration, payment failure, immediate cancellation, end-of-period cancellation, and recovery.

### PAY-012: entitlement consistency

Compare the current provider subscription/product state with internal entitlements. Verify every protected resource checks entitlements server-side and that stale local plan fields cannot authorize access.

### PAY-013: reconciliation

Run the production-style reconciliation job against a controlled sandbox dataset containing successes, failures, refunds, duplicates, missing local records, and stale records. Expected result: zero unexplained drift and a durable evidence artifact.

### PAY-014: sandbox/live isolation

Verify live credentials cannot be loaded by tests/staging and sandbox credentials cannot accidentally target production. Inspect configuration, deployment variables, webhook endpoints, client bundles, and logs.

### PAY-015: secret/card-data scan

Scan source, history, CI artifacts, build output, logs, telemetry and support exports for provider secrets, webhook secrets, PAN/CVC or other prohibited payment data. Verify no secret is client-visible.

### PAY-016: tax verification

For each materially served taxable jurisdiction, execute representative test invoices/checkout flows and record calculated tax, tax treatment, currency, rounding, and tax-ID/exemption behavior where applicable.

### PAY-017: concurrent fulfillment

Trigger two or more fulfillment paths simultaneously for the same payment/order. Verify database constraints/idempotency prevent double fulfillment, duplicate credits, duplicate inventory release, or duplicate emails with financial consequence.

### PAY-018: disputes/chargebacks

Where applicable, simulate provider dispute/chargeback events. Verify access/ledger behavior, audit trail, customer status, and reconciliation.

### PAY-019: payout/KYC/capability

For marketplace products, test connected-account onboarding, incomplete KYC, capability loss, payout failure, negative balance/reserve behavior, refund effects, and account restriction events.

### PAY-020: metered billing integrity

Where usage-based billing exists, attempt duplicate, delayed, missing, manipulated, and concurrent usage reports. Verify attribution, idempotency, caps/credits/overages, and provider reconciliation.

### PAY-021: payment abuse/rate limits

Exercise rate limits on payment initiation, checkout/session creation, Customer Portal session creation, coupon/promotion abuse, refund requests, and other money-sensitive endpoints. Verify limits are actually triggered and safely recoverable.

### PAY-022: audit trail

Verify durable audit records for entitlement grants/revocations, refunds, payout changes, reconciliation repairs, manual billing changes, and security-sensitive payment operations. Audit records must identify actor/time/reason and must not expose secrets.

### PAY-023: provider outage/degraded behavior

Simulate timeout/provider failure for payment creation, webhook delivery, reconciliation, and customer billing status. Verify no false success, duplicate retry side effects, or irreversible local state is created.

## Scenario matrix

For each core flow test as applicable:

```text
new user
returning user
admin/support user
unauthorized user
malicious input
slow network
offline/reconnect
expired session
expired token
retry/double-submit
partial external failure
empty dataset
large dataset
mobile viewport
desktop viewport
```

Payments additionally require the dedicated `PAY-*` probes above for idempotency, webhook authenticity, replay resistance, fulfillment source-of-truth, concurrent delivery, failure/dunning, subscription lifecycle, refunds, disputes/chargebacks, reconciliation, tax, sandbox/live separation, and payout/metered flows where applicable.

## AI-specific security tests

When an application uses AI, test prompt injection from user and retrieved content, tool authorization/excessive agency, cross-tenant/context leakage, unsafe tool parameters, sensitive data appearing in prompts/logs, output validation before execution, model/provider failure and timeout handling, abuse/cost exhaustion, and untrusted documents attempting to alter system behavior.

## Remediation budget

Two remediation attempts per finding class are the default. Escalate after that with evidence of the failure and explicit options. Never loop indefinitely.

## Honest report

Final release report:

1. what passed and evidence;
2. what failed and was fixed;
3. accepted exceptions with expiration;
4. known limitations;
5. checks unavailable in this environment;
6. human approvals;
7. rollback/recovery path;
8. build provenance.
