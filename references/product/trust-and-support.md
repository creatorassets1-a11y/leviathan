# Trust, Support, and User-Facing Product Surfaces

Production products must expose enough information for users to understand, use, secure, and recover the service.

## Required surfaces by risk/product type

Generate and keep consistent with actual behavior:

- Terms of Service;
- Privacy Policy;
- cookie/tracking notice when applicable;
- Acceptable Use / Community Guidelines when users can publish or interact;
- refund/cancellation policy when money is involved;
- contact/support channel;
- help/FAQ or knowledge base appropriate to complexity;
- onboarding/feature guide for non-obvious workflows;
- accessibility statement where appropriate;
- security/trust page when handling sensitive or enterprise data;
- status/incident communication for material production services.

Do not generate boilerplate claims that contradict the implementation.

## Enforcement and moderation

If the product has user rules, moderation, or account sanctions, define server-side states such as warning, limited, suspended, and banned only where appropriate. Actions should have audit trails, clear reasons, expiration/review behavior where applicable, and an appeal or support path for consequential decisions.

Never rely on client-side moderation state.

## Policy-to-product consistency

Policies must be derived from actual data collection, processors, retention, account behavior, AI features, payments, analytics, and user-generated content. Changes to material behavior should trigger policy review.

Legal pages are risk-aware documentation, not proof of legal compliance. Escalate jurisdiction-specific or high-impact questions to qualified counsel.

## Support readiness

For R2+ products define:

- support ownership;
- expected response targets where promised;
- account recovery route;
- security incident reporting route;
- payment/refund route if applicable;
- abuse report route if applicable;
- escalation path for critical failures.

Recommended IDs: `TRUST-001` through `TRUST-099`, `SUPPORT-001` through `SUPPORT-099`.
