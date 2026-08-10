# Authorization, RLS, Sessions, and Abuse-Resistance

## Purpose

This is a mandatory R2+ security reference. It converts common AI-generated authorization failures into explicit implementation, negative-test, and release-blocking requirements.

## Database authorization floor

For **every table/resource containing user-owned, tenant-owned, account, organization, payment, private-content, or security-sensitive data**:

1. The default posture MUST be deny-by-default.
2. Define an explicit allow policy for each actor class and operation.
3. If the database supports row-level/object-level security, enable it on every applicable table and verify the setting is actually active.
4. If the platform cannot provide RLS/object policy enforcement, ownership checks may be application-enforced only when the architecture demonstrates that every access path passes through the trusted authorization boundary and there is no client/direct-database bypass. Record the compensating control and its tests.
5. Never treat a UI filter such as `where user_id = currentUser.id` as authorization.
6. Never expose a database service/admin/elevated key to browser or untrusted client code.
7. For RPCs/functions, review invoker/definer behavior, owner privileges, search path, input validation, transaction boundaries, and privilege-escalation paths.
8. For multi-tenant systems, prove isolation across at least two tenants and every relevant tenant-scoped access path.
9. Test owner, non-owner, anonymous, suspended, deleted, cross-tenant, and privileged actors where applicable.
10. Enforce business invariants that affect authorization or ownership at the database boundary where practical.

### RLS/policy requirements for PostgreSQL-like systems

For each protected table, explicitly consider and verify SELECT, INSERT, UPDATE, DELETE, and UPSERT behavior. Policies must evaluate the authenticated principal and the target row/tenant rather than trusting client-supplied identity fields.

Do not assume that enabling RLS alone is sufficient. Verify that policies exist, apply to the intended role, and cannot be bypassed through views, RPCs, functions, elevated connections, triggers, bulk operations, or alternate endpoints.

`SECURITY DEFINER` functions require documented justification. They must constrain caller permissions and target rows internally, use a deliberate owner/search-path configuration, validate inputs, and avoid becoming privilege-escalation gadgets.

### Required negative tests

For **every parameterized resource endpoint, server action, RPC, or data operation that accepts an object/resource ID**:

1. Authenticate as User A.
2. Create or identify an object belonging to User B.
3. Request User B's object by ID as User A.
4. Attempt read, update, delete, and other applicable mutations.
5. Confirm the result is `403` or an intentionally indistinguishable `404`/equivalent denial.
6. Confirm the response contains no protected fields, existence oracle, or sensitive timing/error detail beyond what the threat model permits.
7. Confirm no unauthorized side effect occurred.
8. Repeat by changing `user_id`, owner ID, tenant/organization ID, and any equivalent identity selector in path, query, body, or form data.
9. Repeat across tenant boundaries when multi-tenant.
10. Repeat after User A's permission is revoked to verify stale authorization is not retained.
11. Record the command/request, response status, timestamp, environment, and artifact/result.

Expected result: unauthorized access is denied with no protected data leakage and no unauthorized side effect.

## Server-side privilege checks

A frontend hiding an admin control is never an authorization control. Every privileged operation MUST re-check authorization on the trusted server/database boundary using trusted authenticated session state and current permissions.

Never authorize from:

- a client-controlled role field;
- an unverified or stale client claim;
- hidden UI state;
- a request body containing `isAdmin: true`;
- an object ID alone;
- a client-only route guard.

For every privileged route, API handler, server action, RPC, background job trigger, and edge function, direct invocation as a lower-privilege principal must be denied. Evidence must include the direct-call result, not only code inspection.

## Browser sessions

For browser applications:

- Prefer `HttpOnly`, `Secure`, `SameSite=Lax` or `Strict` cookies when cookie sessions are appropriate.
- Do not store long-lived access/refresh/session tokens in `localStorage`, `sessionStorage`, or non-HttpOnly browser-readable cookies.
- Regenerate session identifiers after login, privilege change, password change, MFA enrollment, and other session-fixation-sensitive transitions.
- Define both idle and absolute session lifetime, with shorter lifetimes appropriate to high-privilege contexts.
- Rotate/revoke sessions after password change, MFA changes, privilege elevation, recovery, and other high-risk events.
- Support logout-everywhere/session revocation for security-sensitive accounts.
- Refresh tokens, where used, must rotate on use and detect reuse.
- Use device/IP risk signals only as defense-in-depth; do not create brittle permanent fingerprints or rely on them as the sole security boundary.
- Re-authenticate before highly sensitive actions.

Evidence: inspect source and built client output for sensitive token storage, then execute login/rotation/revocation/logout tests.

## XSS and browser trust boundaries

Ban raw HTML insertion unless the content has been intentionally sanitized with a maintained, context-appropriate sanitizer and the remaining context is safe. Markdown, rich text, URL parameters, profile fields, imported content, and AI output are untrusted.

Require:

- context-aware output encoding;
- a restrictive CSP using nonces/hashes where feasible;
- no `unsafe-eval` unless explicitly justified;
- no secrets in client bundles, source maps, or browser telemetry;
- safe URL validation for redirects and link targets;
- CSRF protection for cookie-authenticated state-changing operations where required by the architecture.

## MFA / recovery

MFA enrollment, reset, recovery, backup codes, and device replacement are authentication-critical flows.

Require:

- phishing-resistant passkeys/WebAuthn for high-risk/admin accounts where supported;
- strong MFA for privileged accounts;
- short-lived, single-use OTPs;
- strict attempt counters and progressive rate limits;
- no account enumeration through response, timing, or resend behavior;
- OTPs never logged in plaintext;
- protected MFA reset/recovery with re-authentication or equivalent proof;
- backup codes stored/revealed safely and invalidated after use;
- sensitive actions require recent reauthentication/step-up;
- successful recovery or credential changes invalidate relevant other sessions.

There must be no bypass merely because an account has no enrolled factor.

## Rate limiting

Rate limits must be tested, not merely configured. Use both identity/account and network/IP or equivalent network dimensions where practical, with progressive backoff/friction for credential attacks.

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
- webhook processing where appropriate;
- contact/support abuse;
- public API endpoints.

Prefer progressive delays, challenges, quotas, and bounded temporary lockouts over permanent account locks that can be weaponized for denial-of-service.

Evidence must show the limit was actually exceeded and the expected rejection/backoff occurred, including request count, response status, timing, and reset behavior.

## Passwords

Use a maintained password hashing scheme such as Argon2id with deployment-appropriate parameters. Accept long passphrases; do not impose arbitrary low maximums. Reject known-compromised passwords using an appropriate breach corpus or privacy-preserving equivalent by default where practical. Never store or log plaintext passwords.

Evidence: algorithm and parameters confirmed, breach screening behavior exercised, and no plaintext/password logging found.

## File uploads and untrusted content

Validate size, allowed types, and actual content; never trust the Content-Type header, filename, or extension alone. Use private storage by default and short-lived signed URLs for controlled access. Sanitize filenames and prevent path traversal. Re-encode images and strip unnecessary EXIF/metadata where practical. Malware-scan/quarantine when required by risk or file type. Rate-limit and quota uploads.

Evidence: disallowed size/type/content rejected; authorized upload succeeds; unauthorized/public listing/access fails; object storage visibility is verified.

## HTTP and integration controls

Where applicable require CSRF protection, strict CORS allowlists, HSTS, `X-Content-Type-Options`, framing protection, secure cookies, no sensitive data in URLs, open-redirect controls, and dynamic-code-execution review.

For webhooks, verify signatures using the provider's documented scheme against the raw request body before parsing/trusting the event. Deduplicate by provider event ID, tolerate at-least-once delivery and out-of-order events, and make side effects idempotent. For money-related events, reconcile internal state against the provider independently of browser redirects.

## Secrets and client exposure

No secrets in client bundles, client-prefixed environment variables, source maps, logs, generated artifacts, or telemetry. Service-role and other elevated credentials are server-only.

Secret scanning of source, repository history where available, CI artifacts/logs, and build output is a release gate. A suspected leak requires revocation/rotation, dependent-credential review, redeployment, and incident evidence.

## Evidence IDs

Recommended check IDs:

- `AUTHZ-RLS-001` through `AUTHZ-RLS-099`
- `AUTHZ-IDOR-001` through `AUTHZ-IDOR-099`
- `AUTHZ-SERVER-001` through `AUTHZ-SERVER-099`
- `SESSION-001` through `SESSION-099`
- `XSS-001` through `XSS-099`
- `CSRF-001` through `CSRF-099`
- `MFA-001` through `MFA-099`
- `RATE-001` through `RATE-099`
- `UPLOAD-001` through `UPLOAD-099`
- `WEBHOOK-001` through `WEBHOOK-099`
- `SECRET-001` through `SECRET-099`

A security claim without the relevant negative-test evidence is not a pass.
