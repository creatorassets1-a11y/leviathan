# Auth & Security Floor

Loads whenever accounts exist; the transport/headers/database sections apply to every
backend. This floor makes the product never the easy target. Honesty note, said to the
user in these words or better: this stops opportunistic attackers cold; nothing stops
a targeted, funded attacker, and claiming otherwise would be selling false certainty.

## Password storage

- **Argon2id** (OWASP-recommended, RFC 9106). Minimum m=19 MiB, t=2, p=1 (or
  m=46 MiB, t=1, p=1); tune upward so one hash costs ~250–500ms on the production
  hardware. Use a maintained library (`argon2` on npm); never hand-roll.
- bcrypt cost 12+ only where Argon2id is impractical (72-byte input limit noted).
- MD5/SHA-family for passwords is banned. Legacy migration: rehash transparently on
  next successful login; document the path.
- No maximum-length silliness (allow 64+ chars), no forced rotation, check length ≥ 8
  and against a breached-password list rather than composition rules.

## Sign-in methods

- **Passkeys (WebAuthn/FIDO2) offered as the recommended method**, email+password as
  fallback. Nudge users to register a second passkey so a lost phone is not a lockout.
  Passkeys also satisfy WCAG 2.2 Accessible Authentication for free.
- **2FA:** TOTP + one-time backup codes generated at enrollment. SMS only if the user
  insists, with SIM-swap risk stated. **Mandatory for admin roles**, nudged for users.

## Sessions

- httpOnly + Secure + SameSite (Lax minimum) cookies. Never tokens in localStorage.
- Server-side store (Redis) preferred; short-lived rotated JWTs only when stateless is
  genuinely required.
- Regenerate session ID on login (kills fixation). Absolute timeout + idle timeout.
  "Log out everywhere" works and is exposed in account settings.

## Rate limiting & abuse

- Login, signup, password reset, and OTP endpoints limited per IP AND per account,
  with exponential backoff. Generic errors everywhere: no "email exists" leakage on
  login, signup, OR reset ("if an account exists, we sent a link").
- Bot protection on public forms: honeypot + time-trap first; CAPTCHA only when abuse
  is observed (it taxes humans too).

## Authorization (the most-skipped check)

Login is authentication; every endpoint must also verify the logged-in user may touch
*this specific resource*. Object-level checks against the DB on every route/action
that takes an ID; role checks for admin surfaces; deny by default. Phase 6 runs IDOR
probes on every parameterized route - build expecting them.

## Account lifecycle

- Email verification on signup (unverified accounts limited).
- Reset: single-use, expiring (≤1h) token, hashed at rest, sessions invalidated on
  successful reset, no enumeration.
- Email change: re-verify BOTH old and new addresses.
- Deletion: real deletion with documented legal-retention carve-outs (orders,
  invoices), cascade tested in Phase 6, export offered first (doubles as GDPR
  machinery).

## Transport & headers

TLS everywhere + HSTS; CSP tuned per app (start strict, loosen deliberately);
X-Content-Type-Options: nosniff; Referrer-Policy: strict-origin-when-cross-origin;
frame-ancestors 'none' unless embedding is a feature. Dependency audit in CI, acting
on criticals before ship. Secrets only in env/secret manager; `.env.example`
committed; a secret scan runs before every commit the skill makes.

## Database

Parameterized queries always. Least-privilege DB users (the app user cannot DROP).
Supabase: RLS on every table with tested policies (see `nextjs.md`). Encrypted
backups on schedule **with one restore actually executed** - a backup that has never
been restored is a hope, not a backup. Point-in-time recovery confirmed available on
the chosen tier.

## File uploads

OWASP File Upload Cheat Sheet baseline: allow-list extensions and content types tied
to business need (deny-lists are bypassable); validate the actual file signature, not
just the declared Content-Type header (trivially spoofed); store outside the webroot
or on a separate host, serve through an ID-to-filename map rather than exposing real
paths; rename to an application-generated filename on save. Enforce size limits,
including on decompressed size (blocks zip-bomb style exhaustion). Scan for malware
where feasible. Require authentication and authorization before any upload endpoint
is reachable. Least-privilege filesystem permissions on the storage location.

## Server hardening

Directory listing/indexing disabled on every web server: no folder contents exposed
when an index file is missing. WAF in front of production, tuned to the app rather
than left on vendor defaults (OWASP: a WAF filters common attacks such as XSS and
SQL injection at the HTTP layer; it is one layer, not a substitute for the fixes
above). Error logs reviewed on a schedule, not only when something breaks; wire
4xx/5xx spikes into the monitoring stack from Phase 6 rather than relying on a
manual log tail.

## Payment compliance

Any build that stores, processes, or transmits cardholder data falls under PCI DSS
(PCI Security Standards Council), regardless of region. Default recommendation:
never touch card data directly, route through a compliant processor (Stripe, Adyen,
or the regional equivalent) so the processor's compliance covers the transaction and
the product's own scope narrows to the lightest self-assessment tier. Only take on
direct PCI DSS scope when the user explicitly needs it, and say the audit and cost
burden out loud before building it. Regional non-compliance penalties vary by payment
association; a specific fine figure cannot be quoted here without confirming it
against that region's regulator, so ask the user's payment processor or local
regulator before stating one.

## Admin surface

Non-obvious route, admin auth + mandatory 2FA, append-only audit log (who, what,
when, before/after) that the dashboard cannot delete, no password visibility ever
(one-way hashes mean there is nothing to view), read-only view-as-user for support -
logged. Full principle set in SKILL.md.
