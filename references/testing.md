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

### Operations

Production backends need health/readiness checks, structured safe logs, error tracking, useful metrics, alerting, version/build identity, rollback instructions, and an incident path.

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

Where RLS/object policy exists, enumerate protected tables/resources and their policies. Verify deny-by-default behavior and execute database/API tests with:

- anonymous principal;
- owner principal;
- different user;
- different tenant;
- privileged backend context.

Attempt select/read, insert, update, delete, and upsert paths as applicable. Test helper functions/RPCs and explicitly inspect privileged/`SECURITY DEFINER` execution paths.

Evidence: policy inventory + executed results. Absence of an RLS-capable policy is a finding unless the architecture documents an equivalent enforced boundary.

### SEC-AUTHZ-003: server-side privilege test

For every admin/support/destructive endpoint, bypass the UI and invoke the endpoint directly as an ordinary user. Alter role claims or client fields where applicable. Expected result: server denial. Repeat with a valid privileged principal and verify the intended operation succeeds.

### SEC-SESSION-001: browser/session storage audit

Inspect application code and built client output for access/refresh tokens, service credentials, or other long-lived sensitive secrets in localStorage/sessionStorage, URLs, query strings, logs, analytics payloads, or client bundles.

Verify session ID rotation after authentication and relevant privilege changes. Verify idle/absolute expiry, revocation, log-out-everywhere, and password/MFA/recovery-triggered invalidation where applicable.

### SEC-MFA-001: OTP and recovery abuse battery

For each OTP/recovery flow verify:

- short expiry;
- single use;
- failed-attempt counter;
- account and network rate limits;
- resend throttling;
- enumeration resistance;
- factor enrollment/removal protection;
- lost-factor recovery protection;
- session invalidation after takeover-risk recovery.

Attempt expired, reused, guessed, over-limit, and cross-account challenges.

### SEC-RATE-001: rate-limit exercise

For every listed abuse-sensitive endpoint, execute requests until the documented threshold is reached. Verify account/principal and network dimensions where both are required, progressive friction behavior, retry timing, and safe recovery. Record the actual request count, response status/headers, elapsed time, and reset behavior.

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
