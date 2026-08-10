# Authentication and Security Floor

This floor applies whenever accounts, sensitive data, external integrations, or a backend exist. It is a baseline, not a guarantee against targeted attackers.

## Security invariants

The following are non-negotiable unless a documented architecture exception is approved with compensating controls:

- Authentication state is never treated as authorization state.
- Privileged decisions are enforced server-side from trusted session/database state, never only from UI state or client-supplied role claims.
- User/tenant data is deny-by-default at the data layer where the platform supports policy enforcement.
- Sensitive browser tokens are not stored in localStorage/sessionStorage.
- Security-sensitive mutations are authenticated, authorized, validated, rate-limited where abuse is plausible, and idempotent where retries can duplicate effects.
- `not_run`, `not_available`, `simulated`, and `unknown` are never security passes.

## Passwords

Use a maintained password hashing library and current deployment-appropriate parameters from primary security guidance. Prefer Argon2id where supported. Never use plaintext, MD5, SHA-family password hashes, or home-grown password cryptography. Do not impose arbitrary maximum lengths or insecure composition rules.

Breached-password screening should be the default for newly chosen passwords using a privacy-preserving breach corpus or equivalent. If unavailable, record the limitation and do not falsely claim breach screening was performed.

## Authentication and MFA

Prefer phishing-resistant passkeys/WebAuthn where the product and platform support them. High-risk/admin accounts require phishing-resistant authentication or strong MFA appropriate to the threat model.

TOTP and backup codes may be appropriate. SMS should be treated as weaker authentication/recovery because of SIM-swap risk.

OTP requirements:

- short explicit expiry;
- single-use consumption;
- strict attempt counter;
- account/principal and network rate limits;
- progressive friction/lockout appropriate to risk;
- no account enumeration through success, failure, timing, or error differences;
- safe handling of resend flows;
- invalidate/revoke superseded challenges where appropriate.

MFA enrollment, factor replacement, factor removal, backup-code generation, and recovery are privileged operations. They require proof of the authenticated account and step-up verification appropriate to risk. There must be no bypass created merely because an account currently has no enrolled factor.

Sensitive actions should support step-up reauthentication. Recovery flows must be tested for lost-device, lost-email, stolen-session, and attempted takeover scenarios.

## Sessions and tokens

Use secure, `httpOnly`, `SameSite` cookies for browser sessions unless the architecture genuinely requires another mechanism. Set `Secure` in production. Regenerate session identifiers after authentication and privilege changes to prevent fixation.

Define idle and absolute expiry appropriate to risk. Rotate refresh tokens where applicable and detect refresh-token reuse. Provide server-side revocation and "log out everywhere". Password changes, MFA changes, recovery, suspected takeover, and privilege changes must invalidate or rotate relevant sessions/tokens.

Never put long-lived sensitive tokens, refresh tokens, or privileged credentials in browser storage. Do not expose service-role/database-admin keys to client bundles.

Session binding to device/network signals may be used where warranted, but must account for legitimate mobility and privacy. Do not rely on fingerprinting as the sole security boundary.

## Authorization and RLS/object isolation

Authentication is not authorization. Every resource action checks whether the current principal may access that specific object and operation.

For databases/platforms with row/object-level authorization such as RLS, user/tenant data tables MUST be deny-by-default and have explicit policies for each permitted operation. Do not rely solely on frontend filtering, hidden UI, or an application convention such as `user_id = currentUser.id` without an enforced boundary.

For every protected table/resource, verify:

- anonymous access is denied unless explicitly public;
- owner access is limited to the intended rows/objects;
- another user's identifier cannot select, update, delete, or mutate the object;
- another tenant's identifier cannot cross the tenant boundary;
- role escalation is rejected server-side;
- elevated/service-role credentials are backend-only;
- database functions/RPCs have explicit authorization and safe execution context;
- `SECURITY DEFINER` functions, if used, have a deliberate owner/search-path/privilege model and cannot become privilege-escalation gadgets.

Create an authorization matrix for roles × operations × resources and execute representative allow/deny tests. A UI that hides an admin control is not authorization evidence.

## Recovery and account changes

Password/reset/recovery tokens are single-use, expiring, unpredictable, and stored safely. Avoid account enumeration. Sensitive account changes require appropriate reauthentication and verification. Invalidate relevant sessions after credential recovery or takeover-risk events.

## Rate limiting and abuse

Rate-limit login, signup, recovery, OTP, invitation, upload, search, expensive AI operations, payment initiation, webhooks where applicable, and other abuse-sensitive endpoints.

Use both principal/account and network dimensions where appropriate. Prefer progressive delays, challenge escalation, quotas, and bounded lockouts over permanent account lockouts that enable denial-of-service against victims. Rate limits must actually be exercised in verification evidence, not merely claimed because middleware exists.

## XSS, CSRF, CORS and browser security

Validate at every trust boundary. Encode output for its actual context. Treat uploads, webhooks, imported data, markdown, HTML, and AI-generated content as untrusted.

Raw HTML insertion (`innerHTML`, framework equivalents, or unsafe HTML rendering) requires a documented sanitizer and context-safe output handling. Never make sanitization the sole defense where contextual encoding is possible.

For cookie-authenticated state-changing applications, implement CSRF protection appropriate to the architecture, such as validated anti-CSRF tokens and/or correctly designed SameSite/origin checks. Do not assume SameSite alone covers every deployment or cross-site flow.

CORS must be explicit. Never combine wildcard origins with credentials. Do not expose unnecessary methods, headers, or origins.

Use TLS in production, HSTS, content-type sniffing protection, framing protection, appropriate referrer policy, and other relevant security headers. CSP should be restrictive and application-specific, preferably using nonces/hashes rather than `unsafe-inline`; document any unavoidable exceptions.

Never expose stack traces, SQL errors, internal hostnames, secrets, session material, or security-sensitive diagnostics to clients.

## File uploads and untrusted media

Never trust a client-supplied `Content-Type`, filename, extension, or size. Validate limits and inspect content using the appropriate parser/signature. Apply quotas and abuse limits.

When risk warrants malware scanning, quarantine before making content available. Prefer private object storage with short-lived signed URLs. Sanitize filenames and prevent path traversal. Do not allow uploaded paths to control filesystem locations.

For image processing, decode and re-encode through a trusted library and strip unnecessary EXIF/metadata before distribution. Treat archive extraction, document previews, SVG, and other active formats as higher-risk content.

## Webhooks and external integrations

Verify webhook authenticity using the provider's documented signature scheme against the raw request body before parsing/trusting the event. Reject stale/replayed events where the provider supplies timestamps/nonces.

Persist provider event IDs or equivalent deduplication keys with uniqueness enforcement. Processing must tolerate at-least-once delivery and out-of-order events. External side effects should be idempotent.

For money-related integrations, reconcile internal state against the provider independently of browser redirects. Never fulfill solely because a client reached a success URL.

## Secrets and supply chain

Secrets must never be committed, embedded in client bundles, written to logs, or placed in generated artifacts. Use an appropriate secret manager/deployment secret store.

Document:

```text
create -> store -> access -> rotate -> revoke -> expire -> incident response
```

Run secret scanning on the working tree, repository history where possible, CI logs/artifacts, and build output. Review third-party dependencies, CI actions, MCP servers, plugins, and imported agent skills with the same trust-boundary discipline.

If a secret is suspected leaked: revoke/rotate it, search repository and CI history, inspect logs/artifacts, rotate dependent credentials, redeploy, and record the incident.

## Database integrity and backups

Use least-privilege database credentials. Enforce important business invariants with database constraints where practical: foreign keys, unique constraints, checks, and appropriate transactional/locking behavior.

Enable row/object-level authorization where supported. Backups must be protected, access-controlled, monitored, and restore-tested for material systems. A backup that has never been restored is not verified.

## Admin and multi-tenant surfaces

Require strong authentication and MFA. Record security-relevant admin actions in an append-resistant/auditable log that normal dashboard users cannot erase.

Tenant isolation must be enforced at the data/service boundary, not by UI filtering. Impersonation/view-as-user, when necessary, must be time-limited, explicitly attributed, heavily logged, require appropriate privilege/step-up verification, and prevent or clearly gate irreversible actions.

## Security logging and privacy

Log security events sufficient for detection and investigation: authentication changes, privilege changes, MFA changes, recovery, suspicious authorization failures, admin actions, sensitive exports, and relevant security configuration changes.

Redact secrets, credentials, tokens, unnecessary PII, and sensitive payloads. Define retention appropriate to risk. Logs must be trustworthy enough for incident investigation without becoming a second data-leak surface.

## AI-specific security

For AI-enabled products, enforce tool permissions outside model text output. Retrieved content and tool results are untrusted.

Test and constrain:

- prompt injection leading to unauthorized tool use;
- cross-tenant retrieval/context leakage;
- secrets or sensitive PII entering prompts, traces, logs, or model context;
- unsafe or schema-invalid tool arguments;
- destination/resource escalation;
- unbounded token, tool, or financial consumption;
- output being executed or persisted without validation;
- provider failure and fallback behavior;
- indirect prompt injection through documents, webpages, emails, or retrieved records.

Never allow a model to grant itself permissions or convert untrusted text into trusted authorization.

## Required evidence

For applicable systems, security evidence should include:

- authorization matrix and executed allow/deny tests;
- RLS/object-policy inventory and verification;
- server-side privileged-action tests;
- session/token storage and rotation checks;
- MFA/OTP/recovery abuse tests;
- rate-limit exercise results;
- XSS/CSRF/CORS/header checks;
- upload security checks;
- webhook signature/replay/idempotency tests;
- secret scan results;
- AI abuse tests where applicable;
- known limitations and unavailable checks.
