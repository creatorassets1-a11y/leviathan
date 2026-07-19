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

## Admin surface

Non-obvious route, admin auth + mandatory 2FA, append-only audit log (who, what,
when, before/after) that the dashboard cannot delete, no password visibility ever
(one-way hashes mean there is nothing to view), read-only view-as-user for support -
logged. Full principle set in SKILL.md.
