# Email, Notifications & Messaging

Canonical contract for transactional email, in-app notifications, push, SMS, and other user messaging. Apply when a product sends messages to users or operators.

## Non-negotiables

- Every message has an explicit purpose, audience, trigger, channel, priority, and retention rule.
- Transactional messages are separated from marketing communications in code, provider configuration, consent, and analytics.
- User-visible delivery state is never assumed from an API `200`; record provider acceptance and, where available, delivery/bounce/complaint events.
- Provider webhooks are authenticated, deduplicated, replay-safe, and idempotent.
- Templates are versioned and changes are reviewable; rendering must not depend on mutable production database state in ways that make old messages impossible to reproduce.
- Do not put secrets, authentication tokens, full payment data, or unnecessary sensitive personal data into message bodies or URLs.
- Links in messages use short-lived or revocable capabilities where sensitive actions are involved; sensitive mutations still require server-side authorization and appropriate re-authentication.
- Unsubscribe/opt-out behavior is enforced by the sending system, not merely described in copy.

## Delivery architecture

Model `notification_intent -> rendered_message -> provider_delivery -> provider_event -> final_state`. Persist a stable message/event ID and an idempotency key. Queue delivery work outside user-facing request paths. Workers must retry transient failures with bounded exponential backoff and jitter, and route poison messages to a dead-letter path with safe replay.

Maintain per-channel preferences, quiet hours where applicable, locale, verified destination, and suppression state. Never use one global `notifications_enabled` flag when different legal/transactional categories require different behavior.

## Email

Use a reputable transactional provider. Authenticate the sending domain with SPF, DKIM, and DMARC. Track bounces, complaints, blocks, and delivery failures. Suppress repeatedly invalid destinations and honor provider feedback. Do not automatically retry permanent failures.

Separate templates for security/account recovery, billing, receipts, product notifications, and marketing. Security and transactional mail must not be blocked by a marketing unsubscribe, while legal requirements for each category still apply.

## In-app and push

In-app notifications require read/unread state, deduplication, pagination, expiry/retention, and authorization so one tenant/user cannot read another's notifications. Push tokens are sensitive identifiers: rotate/remove stale tokens, never expose another user's device tokens, and avoid putting secrets in notification payloads. For sensitive actions prefer a generic notification that directs the user to the authenticated application.

## SMS

Treat SMS as a weaker and potentially costly channel. Do not use it as the only security factor for high-risk accounts when phishing-resistant alternatives are available. Rate-limit sends, enforce destination verification, prevent resend abuse, and model provider cost. Never put passwords, OTPs beyond the intended challenge, or sensitive records into ordinary notification text.

## Localization and accessibility

Messages use the user's effective locale and timezone unless the product has an explicit account-level rule. Template catalogs are versioned and externalized. Test long translations, pluralization, dates, currencies, RTL where applicable, and accessible in-app notification semantics (`aria-live` only when appropriate; do not interrupt assistive technology unnecessarily).

## Abuse and reliability

Rate-limit message initiation by account, destination, IP/network, and campaign as appropriate. Protect invite/referral/contact forms from becoming spam relays. Enforce per-user and global quotas. Alert on unusual volume, bounce/complaint spikes, provider failure, and queue lag.

## Evidence: MSG-* probes

- **MSG-001 delivery lifecycle:** trigger a controlled transactional message and verify intent, queue, provider acceptance, final delivery state, and audit correlation.
- **MSG-002 idempotency:** submit the same notification request concurrently/repeatedly and prove only the intended number of messages are sent.
- **MSG-003 webhook authenticity:** reject unsigned/invalid provider events and accept a valid event once.
- **MSG-004 bounce/complaint:** simulate permanent failure and complaint feedback; verify suppression and no unbounded retries.
- **MSG-005 unsubscribe:** withdraw marketing consent and prove future marketing sends are blocked while permitted transactional messages remain available.
- **MSG-006 preference isolation:** attempt cross-user/tenant notification reads or mutations and prove denial.
- **MSG-007 localization:** render representative templates in target locales, including long text, timezone, currency, and RTL where applicable.
- **MSG-008 abuse controls:** exceed send limits and verify progressive blocking plus safe recovery.
- **MSG-009 secret safety:** inspect templates, URLs, logs, provider payloads, and client bundles for tokens, credentials, PAN/CVC, or unnecessary sensitive data.
- **MSG-010 outage recovery:** force provider/queue failure and verify bounded retries, DLQ behavior, operator visibility, and safe replay.

## Release blockers

Block release when a required security/transactional message can be duplicated into harmful side effects, provider callbacks are unauthenticated, unsubscribe/consent controls are cosmetic, notification data crosses tenant boundaries, or delivery failures can create unbounded cost or retry loops.
