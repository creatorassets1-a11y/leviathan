# Email, Notifications & Messaging

Use this reference for transactional email, in-app notifications, push, SMS, or other outbound user messaging.

## Non-negotiables
- Separate transactional, security, marketing, and product messaging; each has explicit authorization and consent semantics.
- Never send secrets, passwords, OTPs, payment-card data, or unnecessary PII through logs, templates, URLs, or provider metadata.
- Provider credentials remain server-side. Outbound operations are authenticated, rate-limited, and auditable.
- Every send has a stable message/event ID and idempotency strategy. Retries cannot create uncontrolled duplicate sends.
- Templates are versioned, reviewed, localized where required, and rendered from structured data rather than string-concatenated HTML.
- User preferences are enforced server-side. Unsubscribe/withdrawal must actually stop eligible marketing processing.
- Security, password-reset, MFA, payment, and legal messages must not be silently suppressed by marketing preferences.

## Delivery architecture
Use a durable outbox or equivalent transactional handoff from application state to a queue/provider. Workers are idempotent, retry transient failures with bounded backoff, quarantine poison messages, and expose queue age/depth and delivery outcomes. Provider webhooks for delivered/bounced/complaint/unsubscribed events are authenticated and deduplicated.

## Email
Use a reputable transactional provider with domain authentication (SPF/DKIM/DMARC as applicable). Track accepted, delivered, bounced, complained, deferred, and unsubscribed states. Suppress hard bounces and complaints. Avoid open/click tracking unless justified, disclosed, and consent-compatible.

## In-app/push/SMS
Persist notification intent separately from delivery attempts. Respect device/token lifecycle, locale, quiet hours and channel preferences where applicable. SMS is treated as a weaker security channel and never as the sole high-risk authentication factor. Push payloads must avoid sensitive data visible on lock screens.

## Abuse and safety
Rate-limit sends per user, destination, IP/network, template, and product-wide budget where appropriate. Add spend caps and anomaly alerts. Prevent user-controlled recipient injection, header injection, template injection, open redirects, and arbitrary provider API access.

## Evidence
- provider credentials server-only;
- preference/consent enforcement test;
- duplicate/retry idempotency test;
- bounce/complaint/unsubscribe processing test;
- queue failure/dead-letter test;
- rate-limit and spend-budget exercise;
- template/version/localization review;
- webhook authenticity test;
- no-secret/PII leakage in provider payloads and logs.

## Release blockers
Block production messaging when credentials are exposed, marketing consent is bypassable, security messages can be suppressed incorrectly, provider webhooks accept forgery, or retry behavior can create material uncontrolled duplication/cost.