# Authorization, RLS, Sessions, and Abuse-Resistance

## Purpose

This is a mandatory R2+ security reference. It converts common AI-generated authorization failures into explicit implementation and evidence requirements.

## Database authorization floor

For every table containing tenant, user, account, organization, payment, private content, or security-sensitive data:

1. Default to deny.
2. Define an explicit read/write policy for each actor class.
3. If the database supports row-level security, enable it on every applicable table and verify that it is actually enabled.
4. Never treat a UI filter such as `where user_id = currentUser.id` as authorization.
5. Never expose a database service/admin key to browser or untrusted client code.
6. For RPC/functions, review invoker/definer behavior, search path, input validation, and privilege escalation paths.
7. For multi-tenant systems, prove isolation across at least two tenants.
8. Test owner, non-owner, anonymous, suspended, deleted, and privileged actors where applicable.

### Required negative tests

For each parameterized object endpoint or data operation, exercise at minimum:

- change `user_id` to another user's ID;
- change `tenant_id`/organization ID;
- replace an object ID with a known object belonging to another actor;
- remove the authorization context;
- downgrade the role;
- replay a previously authorized request after permission removal.

Expected result: denial with no sensitive data leakage and no unauthorized side effect.

## Server-side privilege checks

A frontend hiding an admin control is never an authorization control. Every privileged operation must re-check authorization on the trusted server/database boundary using trusted session state and current permissions.

Never authorize from:

- a client-controlled role field;
- an unverified JWT claim;
- hidden UI state;
- a request body containing `isAdmin: true`;
- an object ID alone.

## Browser sessions

For browser applications:

- Do not store long-lived access/refresh/session tokens in `localStorage` or `sessionStorage`.
- Prefer secure, `HttpOnly`, `SameSite` cookies when cookie sessions are appropriate.
- Define idle and absolute session lifetime.
- Rotate/revoke sessions after password change, MFA enrollment/removal, privilege elevation, and other high-risk events.
- Support logout-everywhere/session revocation for security-sensitive accounts.
- Detect refresh-token reuse where refresh tokens are used.
- Use device/IP risk signals only as defense-in-depth; do not create brittle permanent fingerprints.
- Re-authenticate before highly sensitive actions.

## XSS and browser trust boundaries

Ban raw HTML insertion unless the content has been intentionally sanitized with a maintained, context-appropriate sanitizer. Markdown, rich text, URL parameters, profile fields, imported content, and AI output are untrusted.

Require:

- context-aware output encoding;
- a restrictive CSP using nonces/hashes where feasible;
- no `unsafe-eval` unless explicitly justified;
- no secrets in client bundles;
- safe URL validation for redirects and link targets.

## MFA / recovery

MFA enrollment, reset, recovery, backup codes, and device replacement are authentication-critical flows.

Require:

- short-lived, single-use OTPs;
- strict attempt counters and progressive rate limits;
- no account enumeration through recovery responses;
- protected MFA reset/recovery with re-authentication or equivalent proof;
- backup codes stored/revealed safely and invalidated after use;
- phishing-resistant authentication for high-risk/admin accounts where supported.

## Rate limiting

Rate limits must be tested, not merely configured. Use both identity/account and network/IP dimensions where appropriate, with progressive backoff for credential attacks.

At minimum consider:

- login;
- signup;
- password reset;
- OTP/email verification;
- invitations;
- search and expensive queries;
- uploads;
- AI/model endpoints;
- payment initiation;
- webhook processing;
- contact/support abuse;
- public API endpoints.

Evidence must show the limit was exercised and the expected denial/backoff occurred.

## Passwords

Use a maintained password hashing scheme such as Argon2id with deployment-appropriate parameters. Accept long passphrases; do not impose arbitrary low maximums. Reject known-compromised passwords using an appropriate breach corpus or privacy-preserving equivalent when practical.

## HTTP and integration controls

Where applicable require CSRF protection, strict CORS allowlists, HSTS, `X-Content-Type-Options`, frame-ancestors/CSP, secure cookies, no sensitive data in URLs, webhook signature verification against the raw request body, and replay protection.

## Evidence IDs

Recommended check IDs:

- `AUTHZ-RLS-001` through `AUTHZ-RLS-099`
- `AUTHZ-SERVER-001` through `AUTHZ-SERVER-099`
- `SESSION-001` through `SESSION-099`
- `XSS-001` through `XSS-099`
- `MFA-001` through `MFA-099`
- `RATE-001` through `RATE-099`

A security claim without the relevant negative-test evidence is not a pass.
