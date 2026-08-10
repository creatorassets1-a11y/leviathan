# Payments & Money-Safety Contract

If the product accepts, moves, refunds, or grants value based on money, payment behavior is R3+ by default.

Non-negotiable technical controls where applicable:
- fulfillment only from verified server-side provider events, never client redirect success
- webhook signature verification against the raw request body
- provider event IDs and internal idempotency keys deduplicated by durable unique constraints
- at-least-once delivery and out-of-order event handling
- entitlement/ledger state independent from UI state
- reconciliation against provider state on a scheduled basis
- explicit handling for successful/failed payments, subscription transitions, refunds, disputes, cancellations, and payment reversals
- dunning/retry strategy for recurring billing
- tax treatment decision for target jurisdictions
- PCI scope minimization through hosted/provider-controlled payment collection where possible
- strict sandbox/live separation and secret controls
- integer/minor-unit or decimal-safe monetary arithmetic; never binary floating point for money
- audit trail for financial state transitions
- replay-safe webhook processing
- test evidence for duplicates, retries, out-of-order events, forged signatures, partial failures, and concurrent fulfillment

A payment UI that looks successful is never proof that funds were verified or entitlement was safely granted.
