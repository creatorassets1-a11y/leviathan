# Payments & Billing: Canonical Production Policy

Payments are **R3 by default** and **R4** when the product materially moves money for third parties, operates a marketplace/payout system, handles regulated financial activity, or creates high-impact financial consequences.

This is the canonical money-handling policy. `references/payments/production-payments.md` is the implementation-oriented companion. If a provider such as Stripe is used, provider documentation supplies implementation details, but Leviathan's safety invariants remain authoritative.

## 1. Non-negotiable principles

1. The payment service provider (PSP) is the source of truth for payment state. The application's database is a webhook-fed projection of provider state plus product-specific entitlement/ledger state.
2. Never fulfill, grant entitlement, mark an order paid, release goods, or trigger an irreversible side effect from a client redirect or browser success page alone.
3. Fulfill only after a verified provider webhook or trusted server-to-server confirmation.
4. Every money-moving and entitlement-changing operation must be idempotent.
5. Minimize PCI scope. Prefer hosted checkout, provider Elements, or equivalent solutions. Never store raw PAN/CVC unless the compliance architecture explicitly requires it.
6. Sandbox/test and live environments, credentials, webhook secrets, products, prices, customers, and databases must be strictly separated.
7. Secret keys, restricted keys, webhook secrets, and provider credentials are server-only and must never appear in client bundles, source maps, logs, analytics, URLs, or support exports.
8. Real-money capture, payouts, or enabling live mode requires human approval unless authority was explicitly delegated for the current task and risk tier.
9. Monetary arithmetic uses integer minor units or a decimal/money type appropriate to the currency. Never use binary floating point for financial calculations.
10. Payment state, entitlement state, and accounting/ledger state are separate concepts with explicit reconciliation rules.

## 2. Payment architecture contract

Before implementation, record in `PRD.md` or `DECISIONS.md`:

- PSP and supported countries/currencies;
- one-time vs recurring vs usage-based vs marketplace flows;
- product/price IDs and internal entitlement mapping;
- payment collection architecture;
- webhook endpoint(s) and environment separation;
- source-of-truth fields;
- fulfillment trigger;
- refund/chargeback behavior;
- tax responsibility and target jurisdictions;
- dunning/grace-period policy;
- reconciliation cadence and owner;
- customer self-service capabilities;
- payout/KYC requirements if applicable;
- accounting/ledger semantics if the product holds balances;
- mobile-store billing decision where applicable;
- RPO/RTO and recovery strategy for payment events.

A local `paid=true` field may be a projection or cache, never an independent authority that can override the PSP without a documented reconciliation path.

## 3. One-time payments

Prefer server-created Checkout Sessions or Payment Intents plus a provider-controlled payment UI.

Required behavior:

- create payment objects on the trusted server;
- bind the payment to an internal order/cart/customer identifier;
- validate amount, currency, product, discounts, tax, and customer ownership server-side;
- never accept a client-supplied final price as authoritative;
- use provider-supported idempotency keys for create/update operations;
- handle authentication-required/3DS flows without assuming immediate success;
- fulfill only after the verified success event;
- make fulfillment idempotent under concurrent webhook deliveries;
- support full and partial refunds where the product offers them;
- maintain an audit trail for refunds and entitlement changes;
- handle payment reversal/dispute states where applicable.

## 4. Subscriptions

The PRD must explicitly choose or exclude the applicable model:

- flat-rate;
- per-seat/quantity;
- tiered;
- usage-based/metered;
- hybrid base + overage;
- trials;
- free plans;
- grandfathered pricing;
- prepaid/credit models.

### Lifecycle

For Stripe-like PSPs, map and test the provider's equivalents of:

- checkout/session completion;
- subscription creation;
- subscription updates;
- cancellation/deletion;
- invoice/payment success;
- invoice/payment failure;
- trial ending;
- payment-method changes;
- refunds and disputes.

Do not assume event order. The handler must be safe when an update arrives before a creation event, or when old events arrive after newer state exists.

### Plan changes

Document and test:

- upgrade;
- downgrade;
- quantity/seat changes;
- immediate vs end-of-period changes;
- proration behavior;
- trial conversion;
- pause/resume where supported;
- cancellation at period end;
- immediate cancellation;
- grandfathering;
- failed renewal;
- expired payment method.

Entitlements must be derived from the current trusted subscription state plus valid one-time purchases, not from an independently editable local plan field.

### Self-service

Provide a provider Customer Portal or equivalent for, as applicable:

- payment-method updates;
- plan changes;
- invoice history;
- cancellation;
- billing details.

The UI must clearly state when access ends for immediate versus end-of-period cancellation.

## 5. Webhooks: critical reliability boundary

For every side-effecting webhook:

1. Read the raw request body.
2. Verify the signature using the environment-specific endpoint secret before trusting the payload.
3. Reject invalid, missing, stale, or otherwise unacceptable signatures according to the provider's verification rules.
4. Persist the provider event ID in a durable table with a unique constraint before business processing.
5. If the event ID already exists, treat the delivery as a duplicate and do not repeat side effects.
6. Record receipt, type, signature result, processing state, attempts, timestamps, and failure reason without secrets or unnecessary PII.
7. Prefer fetching the current provider object for authoritative state when events can arrive out of order.
8. Allow-list the event types actually handled by the application.
9. Process heavy work asynchronously through a durable queue where appropriate.
10. Use a state machine such as `RECEIVED -> PROCESSING -> PROCESSED` or `FAILED/RETRYABLE`, with safe replay tooling.
11. Ensure side effects are idempotent even when the queue or provider retries.
12. Return successful acknowledgement only after the event is durably accepted according to the chosen architecture.

Never use the webhook payload as a license to bypass authorization or product rules.

### Webhook failure operations

Required for production payment systems:

- dead-letter/failure storage;
- bounded automatic retries;
- manual replay tooling with authorization;
- alerting on repeated failures;
- correlation by provider event ID;
- poison-event handling;
- safe replay that cannot double-grant entitlement or double-refund;
- retention appropriate to investigation and legal requirements.

## 6. Reconciliation

Payment systems require scheduled reconciliation against the PSP.

At least daily for material billing systems, and more frequently where financial risk warrants it:

- retrieve canonical provider state;
- compare payments, refunds, subscriptions, invoices, disputes, payouts, and entitlements as applicable;
- detect missing, duplicated, stale, or contradictory records;
- quarantine ambiguous mismatches rather than guessing;
- repair using idempotent operations;
- record the before/after state and reason;
- alert on non-zero unexplained drift;
- make the job safe to rerun;
- retain reconciliation evidence.

A successful reconciliation is evidence of **zero unexplained drift**, not merely evidence that the job executed.

## 7. Failed payments and dunning

For recurring billing define:

- retry strategy/Smart Retries or equivalent;
- grace period;
- in-app past-due status;
- email/notification sequence;
- feature restrictions during delinquency;
- final cancellation timing;
- restoration after successful payment;
- expired payment-method behavior.

Test provider failure scenarios using official sandbox/test mechanisms. Never hard-code production card numbers or rely on an undocumented test artifact.

Access restriction must be intentional and documented. Prefer graceful degradation where appropriate rather than surprising destructive lockouts.

## 8. Refunds, disputes, and chargebacks

Define:

- who can issue refunds;
- full vs partial refund rules;
- authorization and step-up requirements for manual refunds;
- entitlement reversal policy;
- accounting/ledger entries;
- duplicate refund protection;
- dispute/chargeback state;
- evidence submission responsibility;
- negative-balance handling where applicable;
- customer communication;
- audit retention.

Never treat a browser request for a refund as sufficient authorization to move money.

## 9. Tax

For every served market determine whether tax applies and who is responsible for calculation/collection/remittance.

Prefer a maintained tax engine such as the PSP's tax product where appropriate. Record:

- target jurisdictions;
- product tax codes;
- tax-inclusive/exclusive pricing;
- customer location evidence;
- tax IDs/exemptions;
- rounding rules;
- invoice presentation;
- tax configuration owner.

Tax must not be silently deferred for markets the product already serves. Test invoices/receipts in representative target jurisdictions.

## 10. Marketplaces, payouts, and connected accounts

If the product pays sellers, creators, affiliates, contractors, or service providers, treat this as an R4-sensitive extension where material.

Use the PSP's marketplace/connected-account product where appropriate, such as Stripe Connect.

Define and test:

- account onboarding;
- KYC/identity status;
- capability requirements;
- platform vs connected-account balances;
- application/platform fees;
- payout schedule and minimums;
- payout failure/retry;
- negative balances/reserves;
- refunds affecting connected accounts;
- disputes affecting connected accounts;
- account suspension/restriction;
- webhooks for account/capability/payout changes;
- platform liability and applicable compliance obligations.

Never build a homemade ledger/payout system that assumes the provider will behave synchronously.

## 11. Usage-based and metered billing

Define the measurement source, aggregation window, billing threshold, correction policy, and entitlement behavior before implementation.

For usage such as AI tokens/model calls:

- attribute usage to the correct tenant/user;
- make reporting idempotent;
- protect metering endpoints from client manipulation;
- record provider/model identifiers and units needed for reconciliation;
- prevent double-counting retries;
- define credits, prepaid balances, overages, caps, and refunds;
- enforce per-user/tenant spend limits;
- reconcile reported usage with provider billing data where available.

Usage is never accepted from an untrusted client as the sole authoritative meter for money owed.

## 12. Money correctness

Define:

- currency;
- minor-unit representation;
- decimal precision;
- rounding mode and point;
- tax ordering;
- discount ordering;
- fee treatment;
- partial refund semantics;
- negative amounts policy;
- currency conversion source and timestamp where FX is involved.

Use integer minor units or a decimal library. Add database constraints where practical.

Never calculate money with JavaScript/Python/etc. binary floating-point arithmetic and assume equality is safe.

## 13. Security and PCI

Required controls include:

- server-only secret/restricted keys;
- environment-specific webhook secrets;
- secret rotation procedure;
- no PAN/CVC or sensitive authentication data in logs;
- no card data in analytics or error reports;
- PCI scope minimization;
- payment endpoint rate limits;
- Customer Portal session rate limits;
- authorization for refunds and payout actions;
- audit logs for financial state transitions;
- secret scanning of source, history, build artifacts, and CI artifacts;
- live-mode credentials prohibited in test environments;
- sandbox credentials prohibited from production.

Use the provider's documented authentication/signature mechanism. Do not invent webhook verification cryptography.

## 14. Entitlements

Maintain an explicit mapping:

```text
Provider Product/Price ID
        -> internal plan/product
        -> feature entitlements
        -> seat/usage limits
        -> effective dates
```

Protected resources must perform server-side entitlement checks.

Do not authorize a paid feature solely because the client displays a premium plan.

Handle:

- active;
- trialing;
- past_due;
- unpaid;
- canceled;
- incomplete;
- paused/restricted;
- refunded/reversed;

according to the PSP's current semantics and the product's documented policy.

## 15. Customer experience

The product should expose, where applicable:

- current billing status;
- next invoice date;
- current plan;
- payment-method management;
- invoice/receipt history;
- cancellation timing;
- past-due warnings;
- failed-payment recovery;
- refund status;
- support/contact path.

Billing errors must be actionable and must not expose provider secrets, raw responses, or internal IDs unnecessarily.

## 16. Mobile/platform billing

If digital goods or subscriptions are sold through iOS or Android apps, explicitly determine whether App Store/Google Play billing is required and document the applicable rules, entitlements, receipt validation, restore-purchase behavior, and any allowed external-payment/linking paths.

Do not assume a web Stripe flow can simply be embedded in a native app.

## 17. Operational runbooks

R3/R4 payment systems require human-readable runbooks for:

- failed webhook processing;
- webhook secret rotation;
- provider outage;
- reconciliation drift;
- duplicate fulfillment;
- failed refund;
- disputed/charged-back payment;
- failed payout;
- KYC/capability restriction;
- tax configuration change;
- accidental live/test credential exposure;
- entitlement drift;
- billing-provider migration.

Define alerts for webhook failures, reconciliation drift, unusual payment failures, duplicate attempts, payout failures, and provider incidents as applicable.

## 18. Required evidence for R3

At minimum, produce executed evidence for applicable flows:

- `PAY-001` forged webhook rejected;
- `PAY-002` duplicate event causes no duplicate side effect;
- `PAY-003` stale/replayed event rejected or safely deduplicated;
- `PAY-004` out-of-order events converge to current provider state;
- `PAY-005` successful one-time payment grants entitlement only after trusted confirmation;
- `PAY-006` client success redirect alone cannot grant entitlement;
- `PAY-007` create/payment initiation is idempotent;
- `PAY-008` 3DS/required-action flow completes correctly;
- `PAY-009` refund and partial refund behavior is correct;
- `PAY-010` failed payment enters the documented dunning state;
- `PAY-011` cancellation applies at the documented time;
- `PAY-012` plan/quantity change and proration are correct;
- `PAY-013` entitlement state matches provider subscription state;
- `PAY-014` reconciliation completes with zero unexplained drift;
- `PAY-015` sandbox/live separation is verified;
- `PAY-016` no secret/card data appears in client bundles/logs;
- `PAY-017` tax calculation is correct for representative target markets;
- `PAY-018` duplicate/concurrent fulfillment cannot double-grant value;
- `PAY-019` dispute/chargeback path works where applicable;
- `PAY-020` payout/KYC/capability failures work where applicable;
- `PAY-021` metered usage cannot be client-inflated and is idempotent where applicable;
- `PAY-022` audit records exist for grants, revocations, refunds, and payouts.

Each evidence record must include the standard Leviathan evidence fields and identify whether the result is `passed`, `failed`, `not_available`, or `not_run`.

## 19. Automatic release blockers

Unless a time-limited, owner-approved exception with compensating controls exists, a real-money product cannot reach `RELEASE_APPROVED` with:

- client-side fulfillment;
- unverified webhooks;
- missing durable event-ID/idempotency protection;
- duplicate side effects under retry/concurrency;
- unexplained reconciliation drift;
- exposed live credentials or webhook secrets;
- live credentials used in test environments;
- no documented refund/dispute behavior where relevant;
- no tax decision for an already-served taxable market;
- client-controlled prices, balances, entitlements, or usage as authoritative values;
- missing authorization on refunds/payouts;
- missing payout/KYC controls for a marketplace where they are applicable;
- raw card-data handling without an explicitly approved compliance architecture.

Exceptions expire automatically and must include owner, scope, rationale, compensating controls, residual risk, creation date, and expiry date.
