# Authentication and Security Floor

This floor applies whenever accounts, sensitive data, external integrations, or a backend exist.
It is a baseline, not a guarantee against targeted attackers.

## Passwords

Use a maintained password hashing library and current deployment-appropriate parameters from
primary security guidance. Prefer Argon2id where supported. Never use plaintext, MD5, SHA-family
password hashes, or home-grown password cryptography. Do not impose arbitrary maximum lengths.
Check breached-password risk where practical.

## Authentication

Prefer phishing-resistant passkeys/WebAuthn where the product and platform support them. Provide
secure recovery. Admin roles require strong MFA. TOTP and backup codes may be appropriate;
SMS should be treated as weaker recovery/authentication because of SIM-swap risk.

## Sessions

Use secure, httpOnly, SameSite cookies for browser sessions unless the architecture genuinely
requires another mechanism. Regenerate identifiers after authentication. Enforce idle and
absolute expiry appropriate to risk. Provide session revocation and "log out everywhere".
Never put long-lived sensitive tokens in localStorage.

## Authorization

Authentication is not authorization. Every resource action checks whether the current principal
may access that specific object and operation. Use deny-by-default policy. Test cross-user,
cross-tenant, privilege-escalation, and direct-object-reference cases.

## Recovery and account changes

Password/reset/recovery tokens are single-use, expiring, and stored safely. Avoid account
enumeration. Sensitive account changes require appropriate reauthentication and verification.
Invalidate relevant sessions after credential recovery or takeover-risk events.

## Rate limiting and abuse

Rate-limit login, signup, recovery, OTP, invitation, upload, search, expensive AI operations,
and other abuse-sensitive endpoints. Use both principal/account and network dimensions where
appropriate. Add progressive friction rather than punishing legitimate users blindly.

## Input and output safety

Validate at every trust boundary. Use parameterized database access. Encode output according to
context. Treat uploads, webhooks, imported data, and AI-generated content as untrusted.

## Secrets lifecycle

Secrets must never be committed. Use an appropriate secret manager or deployment secret store.
Document:

```text
create -> store -> access -> rotate -> revoke -> expire -> incident response
```

If a secret is suspected leaked: revoke/rotate it, search repository and CI history, inspect
logs/artifacts, rotate dependent credentials, redeploy, and record the incident.

## Transport and headers

Use TLS for production traffic. Configure HSTS and appropriate security headers for web apps,
including content-type and framing protections. CSP should be tuned to the actual application,
not copied as an unsafe blanket.

## Database and backups

Use least-privilege database credentials. Enable row/object-level authorization where the chosen
platform supports it. Backups must be protected and restore-tested for material systems. A backup
that has never been restored is not verified.

## Admin surfaces

Require strong authentication and MFA. Record security-relevant admin actions in an audit log
that normal dashboard users cannot erase. Never expose passwords or sensitive tokens to admins.
Support impersonation/view-as-user only when necessary, clearly logged, narrowly scoped, and
protected against taking irreversible actions silently.

## AI-specific security

For AI-enabled products, enforce tool permissions outside the model's text output. Retrieved
content and tool results are untrusted. Validate tool arguments, constrain destinations and data
access, enforce tenant boundaries, limit expensive operations, and never allow a model to grant
itself permissions.
