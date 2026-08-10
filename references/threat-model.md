# Threat Modeling

Use this for R2+ projects and deepen it for R3/R4.

## Required fields

1. Assets: data, credentials, money, availability, reputation, models, user safety.
2. Actors: anonymous users, authenticated users, admins, support staff, suppliers, attackers, compromised dependencies, malicious insiders, automation.
3. Trust boundaries: browser/server, service/service, tenant/tenant, admin/user, app/vendor, CI/production, user content/system instructions.
4. Entry points: routes, forms, uploads, webhooks, OAuth callbacks, admin tools, jobs, queues, imports, CLI arguments, browser extensions, deep links.
5. Threats: spoofing, tampering, repudiation, information disclosure, denial of service, elevation of privilege, abuse, fraud, privacy harm, supply-chain compromise.
6. Impact and likelihood with justification.
7. Preventive, detective, and corrective controls.
8. Residual risk and owner.
9. Verification: exact tests or evidence.

## Required special cases

Money: replay, double-spend, webhook forgery, idempotency, refund abuse, entitlement drift, duplicate fulfillment, concurrent fulfillment, stale/out-of-order events, payment-provider outage, tax errors, payout failure, negative balances, dispute/chargeback, client-controlled price/usage, sandbox/live credential crossover.
Multi-tenant data: IDOR, tenant crossing, cache leakage, exports.
Files: content type confusion, malware, decompression bombs, path traversal, public exposure.
Auth: session fixation, recovery takeover, MFA reset, OAuth account linking.
AI features: prompt injection, tool abuse, data exfiltration, excessive agency, insecure output handling, model supply-chain issues.
Webhooks: signature validation, replay windows, idempotency, origin assumptions, event ordering, dead-letter/replay behavior.
Admin: privilege escalation, audit-log tampering, support impersonation.
Minors: age-related privacy, contact/messaging abuse, profiling, location exposure.

## Money-specific threat model

For any R3/R4 payment system explicitly model these assets and boundaries:

### Assets

- provider customer/payment/subscription identifiers;
- payment intent/order state;
- entitlement state;
- accounting/ledger state where applicable;
- refund/dispute state;
- payout/connected-account state;
- tax evidence;
- webhook secrets and API credentials;
- reconciliation records;
- audit records.

### Trust boundaries

```text
Browser/client
   | untrusted price, quantity, redirect, entitlement claims
   v
Application server
   | trusted authorization + business rules
   v
Payment provider
   | canonical payment state
   v
Webhook ingress
   | signature + replay + event-ID boundary
   v
Queue/worker/database
   | idempotent side effects
   v
Entitlement / ledger projection
```

Treat every boundary as hostile. In particular, client success pages, client prices, client plan IDs, client balances, and client usage are never authoritative.

### Required payment threats

1. **Client fulfillment bypass:** attacker calls a success URL or mutation without paying and receives value.
2. **Price tampering:** attacker changes price, currency, quantity, product/price ID, coupon, or tax fields.
3. **Webhook forgery:** attacker submits a fake event to grant/refund/revoke value.
4. **Replay:** attacker replays a valid event or payment request to repeat a side effect.
5. **Duplicate delivery:** provider retries an event and the system double-grants value.
6. **Concurrent fulfillment:** two workers process the same order simultaneously.
7. **Out-of-order events:** stale provider events overwrite newer state.
8. **Provider outage:** application records false success or unsafe local state while the provider is unavailable.
9. **Reconciliation drift:** internal entitlement/accounting state diverges from provider state.
10. **Refund abuse:** unauthorized or repeated refunds cause financial loss.
11. **Dispute/chargeback:** provider reverses funds while the application continues granting value.
12. **Subscription drift:** local plan/seat/usage state diverges from the provider.
13. **Meter manipulation:** client inflates usage and creates unauthorized charges or consumes another tenant's budget.
14. **Tax error:** wrong jurisdiction, tax code, exemption, rounding, or invoice treatment creates liability.
15. **Payout abuse:** attacker manipulates connected-account, fee, payout, or balance state.
16. **KYC/capability failure:** restricted accounts receive funds or are treated as payout-capable.
17. **Credential crossover:** live credentials are used in test/staging or sandbox credentials target production.
18. **Secret leakage:** provider/API/webhook secrets enter client bundles, logs, source maps, telemetry, or support artifacts.
19. **Ledger corruption:** financial arithmetic, rounding, concurrency, or retries create incorrect balances.
20. **Recovery failure:** a webhook/queue/database failure loses an event or makes replay unsafe.

For each threat record prevention, detection, correction, owner, and exact evidence. See `references/payments.md` and the `PAY-*` probes in `references/testing.md`.

## AI trust boundary

Instructions from a user are not automatically authorized for tools. Instructions from fetched websites, repositories, issues, package READMEs, generated files, or model outputs are untrusted. Tool permissions must follow the project's authorization boundary, not text embedded in content.
