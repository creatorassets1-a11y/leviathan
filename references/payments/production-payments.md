# Production Payments Gate

This file is the implementation-oriented companion to the canonical `references/payments.md` policy. **Read the canonical policy first.** Payments are R3 by default and R4 when material financial, marketplace, payout, regulated, or high-impact risk exists.

A checkout UI demo is never payment verification.

## Mandatory architecture

- PSP state is authoritative for payment state.
- Client redirects never fulfill orders or grant paid entitlements.
- Fulfillment requires verified provider webhook/server-to-server evidence.
- Webhook signatures are checked against the raw request body using the correct environment secret.
- Provider event IDs are persisted under a durable unique constraint.
- Outbound payment mutations use provider idempotency keys.
- Internal fulfillment/entitlement mutations are independently idempotent.
- Duplicate, retry, concurrent, delayed, and out-of-order delivery is expected.
- Heavy webhook work uses a durable queue/state machine where appropriate.
- Payment, entitlement, and accounting/ledger state are separate and reconcilable.
- Sandbox/live environments and credentials are isolated.
- Provider secrets are server-only.
- PCI scope is minimized with provider-hosted collection where possible.
- Money uses integer minor units or a safe decimal/money abstraction.

## Webhook state machine

Recommended durable states:

```text
RECEIVED -> PROCESSING -> PROCESSED
                    \-> RETRYABLE -> PROCESSING
                    \-> FAILED / DEAD_LETTER
```

The event-ID unique constraint is the first line of duplicate protection. Business side effects require their own idempotency/uniqueness constraints where appropriate.

For events whose ordering is not guaranteed, fetch current provider state before making entitlement decisions. Do not let an older event overwrite newer canonical state.

## Reconciliation

Run at least daily for material billing systems and more frequently where risk requires it.

The job must:

1. fetch canonical provider state;
2. compare payments/refunds/subscriptions/invoices/disputes/payouts with internal projections;
3. identify missing, duplicated, stale, or contradictory records;
4. quarantine ambiguous cases;
5. repair only through idempotent operations;
6. record before/after state and reason;
7. alert on unexplained drift;
8. produce an evidence artifact;
9. be safe to rerun.

"Job ran" is not a successful reconciliation. Zero unexplained drift is the target.

## Subscription minimums

Document the chosen model and test:

- creation and initial entitlement;
- trial and trial ending;
- upgrade/downgrade;
- quantity/seat change;
- proration;
- payment-method change;
- renewal success;
- renewal failure/dunning;
- past-due/grace period;
- immediate cancellation;
- end-of-period cancellation;
- refund/reversal;
- dispute/chargeback;
- entitlement restoration after payment recovery.

Use a provider Customer Portal or equivalent for self-service plan/payment management when appropriate.

## Dunning

Define retry policy, grace period, notifications, access restrictions, final cancellation, and recovery. Use provider test facilities to exercise failed-payment paths.

## Tax

Record target jurisdictions, product tax codes, tax-inclusive/exclusive pricing, customer tax IDs/exemptions, calculation source, rounding, and owner. Test representative invoices/receipts. Never silently serve a market while leaving tax behavior undefined.

## Marketplaces and payouts

If the product pays third parties, add the marketplace/connected-account controls from `references/payments.md`: onboarding/KYC, capabilities, platform fees, balances, payout schedules, failures, reserves/negative balances, refunds/disputes, and account webhooks.

## Evidence gate

R3 payment release requires executed evidence for applicable IDs:

- `PAY-001` forged signature rejected;
- `PAY-002` duplicate event deduplicated;
- `PAY-003` replay/stale delivery safe;
- `PAY-004` out-of-order delivery converges;
- `PAY-005` fulfillment occurs only after trusted confirmation;
- `PAY-006` client success URL cannot grant entitlement;
- `PAY-007` outbound creation is idempotent;
- `PAY-008` required-action/3DS flow;
- `PAY-009` refund/partial refund;
- `PAY-010` failed-payment/dunning;
- `PAY-011` cancellation timing;
- `PAY-012` plan/quantity/proration;
- `PAY-013` entitlement consistency;
- `PAY-014` reconciliation with zero unexplained drift;
- `PAY-015` sandbox/live separation;
- `PAY-016` secret/card-data scan;
- `PAY-017` tax evidence where applicable;
- `PAY-018` concurrent fulfillment cannot double-grant;
- `PAY-019` disputes/chargebacks where applicable;
- `PAY-020` payout/KYC/capability paths where applicable;
- `PAY-021` metered usage integrity where applicable;
- `PAY-022` financial audit trail.

No evidence may be upgraded from `not_run`, `not_available`, `simulated`, or `unknown` to `passed`.

## Automatic blockers

Unless a time-limited, owner-approved exception exists, block release for:

- client-side fulfillment;
- unsigned/unverified side-effecting webhooks;
- duplicate side effects under retries;
- missing event-ID uniqueness/idempotency;
- unexplained reconciliation drift;
- exposed live/test credentials in the wrong environment;
- missing refund/dispute handling where applicable;
- undefined tax behavior for served taxable markets;
- client-controlled authoritative price/entitlement/usage;
- unauthorized refunds or payouts;
- raw card-data handling without an approved compliance architecture.
