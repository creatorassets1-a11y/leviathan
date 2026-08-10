# Product Requirements Document

## 1. Product

- Product name:
- Audience:
- Primary job to be done:
- Markets/countries:
- Platforms:
- Risk tier:
- Owner:

## 2. Scope

### In scope

### Out of scope

## 3. Core user journeys

Document the happy path and the failure/degraded path for each critical journey.

## 4. Data and authorization

- User/tenant boundaries:
- Sensitive data:
- Roles/permissions:
- RLS/object-level authorization approach:
- Export/deletion/retention requirements:

## 5. Money movement / billing

Complete this section for every product that accepts, moves, refunds, or grants value based on money. Read `references/payments.md` before implementation.

- Payment provider(s):
- Countries/currencies:
- One-time payments: yes/no
- Subscriptions: yes/no
- Billing model: flat / seat / tiered / usage / hybrid / other
- Trials/free plans/grandfathering:
- Customer Portal/self-service:
- Immediate vs end-of-period cancellation:
- Proration rules:
- Failed-payment/dunning policy:
- Grace period:
- Refund/partial refund policy:
- Dispute/chargeback policy:
- Tax jurisdictions and tax engine:
- Product/Price IDs and internal entitlement mapping:
- Usage/metering source and correction policy:
- Marketplace/connected accounts/payouts: yes/no
- KYC/capability requirements:
- Platform fees/reserves/negative-balance policy:
- Mobile App Store/Google Play billing decision:
- Reconciliation cadence and owner:
- Payment-event RPO/RTO:
- Live-mode enablement approval:

### Money invariants

- Provider state is authoritative.
- Client redirects never fulfill.
- Webhooks are signature-verified using the raw body.
- Provider event IDs are durably deduplicated.
- Outbound payment mutations are idempotent.
- Entitlement and ledger mutations are independently idempotent.
- Duplicate, replayed, concurrent, delayed, and out-of-order events are safe.
- Reconciliation detects and repairs unexplained drift safely.
- Prices, balances, entitlements, and usage are server-authoritative.
- Live/test credentials are strictly separated.

## 6. AI behavior

If the product uses AI:

- models/providers:
- data the model can access:
- tools/actions:
- tool authorization:
- cost/rate limits:
- human approval points:
- uncertainty/verification UX:

## 7. Trust, legal, and support

- Terms:
- Privacy:
- Cookies/tracking:
- AUP/community rules:
- Refund/cancellation:
- Contact/support:
- Help/FAQ:
- Accessibility statement:
- Security/trust/status:
- Jurisdiction-specific legal review:

## 8. Non-functional requirements

- Security:
- Accessibility:
- Performance budgets:
- Availability/SLO:
- RPO/RTO:
- Observability:
- Scalability:
- Localization:

## 9. Verification plan

List exact evidence required before release. For money-moving products include the applicable `PAY-*` probes from `references/testing.md`.

## 10. Human approvals

Record approval for real-money capture/payout, material security/privacy/legal risk, production credentials, destructive operations, and R4 deployment as applicable.

## 11. Open decisions / exceptions

Every exception must have owner, scope, rationale, compensating controls, residual risk, creation date, and expiry date.
