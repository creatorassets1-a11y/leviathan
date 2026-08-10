# Production Payments Gate

Payments are R3 by default and R4 when material financial or regulated risk is involved. Passing a checkout UI demo is not payment verification.

## Non-negotiable architecture

1. Never grant entitlement from a client redirect or success page.
2. Fulfill only after a verified provider webhook or trusted server-to-server confirmation.
3. Verify webhook signatures against the raw request body.
4. Make every state-changing payment handler idempotent.
5. Persist provider event IDs under a unique constraint and safely ignore duplicates.
6. Handle at-least-once delivery, retries, duplicates, and out-of-order events.
7. Keep payment state separate from entitlement state and define the reconciliation relationship.
8. Never expose provider secret keys or service credentials to clients.
9. Minimize PCI scope with provider-hosted checkout/elements where possible; never handle raw card data unless the compliance architecture explicitly requires it.
10. Keep test/sandbox and live environments strictly separated.

## Event model

Document the provider events that matter to the product. For Stripe-like systems this commonly includes successful/failed payment events, subscription lifecycle changes, refunds, disputes, and invoice events. Do not assume event order.

Each event processor should record:

- provider event ID;
- event type;
- received timestamp;
- signature verification result;
- processing attempt;
- processing result;
- linked customer/account/order;
- entitlement effect;
- failure reason and retry state.

## Reconciliation

A production payment system needs a scheduled reconciliation job that compares internal payment/entitlement state with the provider. Define how mismatches are detected, quarantined, alerted, and repaired. Reconciliation must be safe to rerun.

## Idempotency

Use provider-supported idempotency keys for outbound creates/updates and an internal idempotency/event table for inbound events. Database uniqueness must back application-level deduplication.

## Subscriptions and failed payments

Define behavior for failed renewals, retries/dunning, cancellations, grace periods, upgrades/downgrades, prorations, pauses, refunds, chargebacks/disputes, and expired payment methods. User-facing status must agree with the trusted payment state.

## Money correctness

Use integer minor units or a decimal/money library appropriate to the currency. Never use binary floating point for financial arithmetic. Define rounding, currency, tax, discount, refund, and partial-refund rules.

## Tax and legal configuration

If tax applies, define the jurisdictions and tax source. Use a maintained provider/tax engine when appropriate. Do not invent tax rates in application code without an explicit source and maintenance owner.

## Evidence gate

A payment release must include evidence for:

- signature verification;
- duplicate event delivery;
- out-of-order event handling;
- replay protection;
- idempotent checkout/order creation;
- failed payment;
- successful payment;
- refund;
- dispute/chargeback path where applicable;
- entitlement consistency;
- reconciliation;
- sandbox/live separation;
- secret scanning;
- audit trail.

Recommended IDs: `PAY-001` through `PAY-099`.
