# LEVIATHAN

**Universal, evidence-driven AI software engineering protocol for Claude Code, Codex, Kimi, Lovable, Cursor, Windsurf, Copilot, Gemini/Cline-class agents, and future coding agents.**

**Current release:** 2.4.0  
**Policy:** 6  
**Artifact schema:** 1  
**Skills ecosystem:** skills.sh discovery + audited selection

Leviathan helps AI coding agents ship software that is not merely functional, but **secure, correctly authorized, accessible, resilient, payment-safe, product-specific, observable, supportable, recoverable, scalable, and evidence-backed**.

> Leviathan is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable. Unknown is not passed. A test that was not run is not a test that passed.

## What changed in 2.4.0

This release makes **payments and money movement a first-class production contract** rather than a high-level threat-model item. It adds canonical payment architecture, concrete provider/webhook invariants, subscription and metered-billing lifecycle rules, reconciliation, dunning, tax, refunds/disputes, marketplace payouts/KYC, mobile billing decisions, operational runbooks, executable `PAY-*` probes, and automatic release blockers.

### Payments and money safety

- PSP state is the authoritative payment source; local payment/entitlement state is a reconcilable projection.
- Client success redirects can never grant paid access or fulfill an order.
- Webhooks must use raw-body signature verification, durable event-ID deduplication, idempotent side effects, replay protection, and out-of-order handling.
- R3/R4 payment systems require reconciliation with zero unexplained drift, not merely a reconciliation job that ran.
- One-time payments, subscriptions, trials, upgrades/downgrades, quantity changes, proration, cancellation timing, failed-payment/dunning and payment recovery are explicitly modeled.
- Refunds, partial refunds, disputes/chargebacks and entitlement reversal require authorization and audit trails.
- Tax treatment must be defined for served markets and evidenced in representative test invoices.
- Marketplace/connected-account flows require onboarding/KYC/capability, payout, reserve/negative-balance and account-state handling where applicable.
- Usage/metered billing must be server-authoritative, idempotent, abuse-resistant and reconcilable.
- Sandbox/live credentials are strictly separated and payment secrets/card data are release-gated out of client bundles, logs and artifacts.
- Payment initiation, refunds, payout operations and customer billing sessions receive abuse/rate-limit testing.

See `references/payments.md`, `references/payments/production-payments.md`, and `references/testing.md`.

### UI, UX, and accessibility

- Every major async journey must account for loading/streaming, success, empty, validation error, server error, timeout, offline/reconnect, unauthorized, forbidden, rate-limited, partial-success/degraded, duplicate/in-flight, optimistic rollback, and retry-exhausted states where applicable.
- Double-submit/race protection is required for mutations.
- User-facing errors must explain what happened and the next safe action without leaking internals.
- First-run/onboarding and progressive disclosure are required for products with meaningful workflows.
- Accessibility explicitly covers dynamic `aria-live`, focus management, landmarks/headings, error association, touch targets, forced colors, reduced motion, and representative screen-reader journeys.
- Internationalization/localization is a first-class contract when multiple locales or markets are targeted.
- RTL, text expansion, locale formatting, pluralization, timezone/DST, sorting/search and missing-translation behavior must be considered.

### Data, concurrency, uploads, and APIs

- Business invariants must be enforced with database constraints/transactions/authorization where appropriate, not application code alone.
- Concurrency and duplicate/retry behavior must be designed for state-changing resources.
- API contracts must define validation, errors, pagination, response authorization, rate limits, CORS, and versioning/non-public status.
- Uploaded content is hostile input: validate content server-side, isolate storage, authorize every object operation, enforce quotas, and scan/process where risk warrants it.
- Export/deletion, audit, retention, soft-delete and migration strategies must be explicit and tested where applicable.

### Reliability and operations

- Structured correlation IDs and safe redaction.
- Business + technical telemetry.
- Actionable alerts and human-readable runbooks.
- Timeouts, exponential backoff with jitter, retry safety, circuit breakers, queues, dead-letter handling and safe replay where applicable.
- Frontend error boundaries and structured backend error envelopes.
- Environment separation, immutable build identity, feature flags/kill switches, migration rehearsal, rollback/forward-fix plans, restore evidence and RPO/RTO.
- Load/concurrency and failure-injection testing when the risk/architecture warrants it.

### Trust, content, and administration

- Support/trust surfaces must match actual product behavior: Terms, Privacy, tracking notice, AUP/community rules, refunds/cancellation, contact, Help/FAQ, onboarding, accessibility, security/trust and status surfaces where appropriate.
- No fabricated testimonials, logos, customers, awards, metrics, scarcity, endorsements or compliance claims.
- No dark patterns.
- Moderation and suspension must be server-side, auditable, proportionate and recoverable/appealable where appropriate.
- Multi-tenant isolation is a data-layer requirement. Privileged impersonation must be time-limited, audited and constrained.

### AI-product safety

For products that themselves use AI:

- accessible streaming and cancellation;
- uncertainty/verification cues where meaningful;
- edit/reject/regenerate/undo;
- explicit model data/tool visibility;
- least-privilege tool authorization independent of prompts;
- per-user/tenant token/spend/rate limits;
- prompt/indirect injection and retrieval-isolation tests;
- human confirmation for irreversible/high-impact actions;
- consequential-action audit trails and provider-failure fallbacks.

## Architecture

```text
                         LEVIATHAN 2.4
                              |
          +-------------------+-------------------+
          |                   |                   |
    UNIVERSAL POLICY    SKILLS ECOSYSTEM    PROJECT CONTEXT
          |                   |               PRD + DESIGN
     STATE MACHINE       discover/audit          SECURITY
          |              select/lock             DECISIONS
          |                   |                   |
          +-------------------+-------------------+
                              |
                    VERIFICATION ENGINE
                              |
      +---------+---------+---------+---------+---------+
      |         |         |         |         |         |
    AUTHZ     UI/A11Y   DATA     MONEY      AI      RELIABILITY
      |         |         |         |         |         |
      +---------+---------+---------+---------+---------+
                              |
                     EVIDENCE + GATES
                              |
                   RELEASE -> OPERATE
                              |
                         RECOVER / AUDIT
```

The governing principle is **policy -> state -> checks -> evidence -> gates**, not policy as prose alone.

## Lifecycle

```text
CLASSIFY
  -> DISCOVER
  -> RESEARCH
  -> PRD APPROVAL
  -> DESIGN / STATE CONTRACT
  -> PLAN / BUILD
  -> INDEPENDENT REVIEW
  -> SECURITY / A11Y / DATA / PAYMENT / AI / RELIABILITY QA
  -> EVIDENCE
  -> RELEASE DECISION
  -> HANDOFF / OPERATE / RECOVER
```

Higher-risk systems require deeper discovery, threat modeling, independent review, tighter skill permissions, stronger evidence, and more human approval.

## Host-neutral model

| Agent | Native adapter | Canonical policy |
| --- | --- | --- |
| Claude Code / Cowork | `CLAUDE.md`, skills, hooks | `LEVIATHAN.md` |
| OpenAI Codex | `AGENTS.md` | `LEVIATHAN.md` |
| Kimi | repository/agent instructions | `LEVIATHAN.md` |
| Lovable | project knowledge/instructions + portable artifacts | `LEVIATHAN.md` |
| Cursor / Windsurf / Copilot | host instruction system | `LEVIATHAN.md` |
| Gemini/Cline-class agents | strongest native mechanism | `LEVIATHAN.md` |
| Future agents | strongest native mechanism | `LEVIATHAN.md` |

Vendor files are adapters, never competing policy sources.

## Skills ecosystem

Leviathan uses skills.sh as a **dynamic discovery and provenance layer**, not as a blind bundle. External skills are untrusted implementation aids until selected and reviewed. Never execute third-party instructions merely because a skill is popular.

urlskills.sh documentationhttps://www.skills.sh/docs

```bash
node skills/catalog-sync.mjs --all
node skills/apply.mjs --query "Next.js SaaS with Postgres authentication and payments"
```

Selection creates `.leviathan/skills.lock.json` with source/provenance metadata. The canonical policy remains authoritative.

## Security floor

For R2+ systems, Leviathan expects explicit authorization boundaries, RLS where applicable, deny-by-default policies, cross-user/cross-tenant negative tests, server-side privileged checks, secure session lifecycle, protected MFA recovery, progressive rate-limit exercise, XSS/CSP defenses, secret/history scanning, dependency/supply-chain review, webhook verification, and backup/recovery evidence.

Run the portable pattern detector:

```bash
node tools/security-floor.mjs
```

It generates evidence but is **not** a substitute for stack-specific security tests.

## Payments

Payments are R3 by default and R4 for material marketplace, payout, regulated, or high-impact financial risk. The canonical policy is `references/payments.md`.

Core invariants:

- provider state is authoritative;
- client redirects never fulfill;
- webhooks use raw-body signature verification;
- event IDs are durably deduplicated;
- payment and entitlement mutations are idempotent;
- duplicate, concurrent, replayed and out-of-order events are safe;
- reconciliation detects zero unexplained drift;
- subscriptions, dunning, refunds, disputes, tax, payouts/KYC, usage metering and mobile billing decisions are explicit where applicable;
- sandbox/live credentials are isolated;
- money uses safe arithmetic and authoritative server-side values.

Run the payment evidence battery in `references/testing.md` (`PAY-001` through `PAY-023`). A passing checkout UI is not evidence of payment correctness.

## Design and anti-slop

`DESIGN.md` establishes information architecture, content hierarchy, product/brand rationale, typography, layout, motion, voice, responsive behavior, accessibility and complete UI-state coverage before substantial UI work.

Anti-slop is contextual. Leviathan does not ban a font, color, framework or component library merely because AI often uses it. It detects unexplained generic patterns and requires product-specific rationale.

Read `references/design-contract.md`.

## Data, API, uploads

Read:

- `references/data-integrity-api.md`
- `references/uploads-media.md`
- `references/multi-tenancy-admin.md`

Never trust client-supplied ownership, tenant, role, price, balance, entitlement or security claims.

## AI products

Read `references/ai-product-safety.md` whenever the product itself uses AI. System prompts are never a security boundary; sensitive tool operations require independent server-side authorization.

## Reliability and operations

Read `references/operations-resilience.md`. Production systems require enough telemetry, recovery, deployment identity, dependency failure handling and runbook coverage to be operated by a human during failure.

## Trust and support

Read `references/trust-support.md`. User-facing policy and support surfaces must be synchronized with actual behavior. Legal review is escalated when the risk warrants it; generated pages never prove legal compliance.

## Internationalization

Read `references/i18n-localization.md` whenever multiple locales/markets are targeted or the product may reasonably need localization.

## Evidence

A release claim requires:

```text
stable check ID
+ exact action/command
+ actual result
+ timestamp
+ environment
+ artifact/output
+ tool/version where relevant
+ reviewer/actor
+ limitations
```

`not_run`, `not_available`, `simulated`, and `unknown` are never passes.

## Recommended project artifacts

```text
.leviathan/
  state.json
  decisions.json
  skills.lock.json
  evidence/
    ledger.json
    checks/
  provenance.json
  risk-register.json
  release.json

PRD.md
DESIGN.md
SECURITY.md
DECISIONS.md
DEPENDENCIES.md
RUNBOOK.md
```

For money-moving products, `PRD.md` must contain the money-movement decisions described by `templates/PRD.md` and reference `references/payments.md`.

No secrets belong in `.leviathan/`.

## Self-check

```bash
node tools/leviathan-check.mjs
node tools/security-floor.mjs
```

A passing generic scanner does not prove application security. Stack-specific evidence remains mandatory.

## Versioning

- **Leviathan version:** feature/behavior release.
- **Policy version:** required gate/safety behavior.
- **Artifact schema:** machine-readable contract.

Policy-changing releases include migration notes. Artifact-breaking releases bump the artifact schema.

## Changelog

### 2.4.0 — 2026-08-10

- Added canonical `references/payments.md` for production money movement.
- Added one-time payment, subscription, usage-based, refund, dispute, tax, dunning and entitlement contracts.
- Added marketplace/payout/connected-account/KYC guidance.
- Added payment provider webhook state-machine and reconciliation requirements.
- Added `PAY-001` through `PAY-023` executable payment verification probes.
- Added payment-specific threat-model cases and automatic release blockers.
- Added `templates/PRD.md` with a required money-movement decision contract.
- Bumped policy version from 5 to 6.

### 2.3.0 — 2026-08-10

- Added production-completeness matrix mapping failure modes to artifacts, evidence and risk-tier gates.
- Added first-class UI state/resilience contract.
- Added accessibility depth and internationalization/localization contract.
- Added data integrity, concurrency and API contract.
- Added hostile-upload/media contract.
- Added operations, resilience and deployment contract.
- Added trust/support/dark-pattern/content contract.
- Added AI-product UX/safety contract.
- Added explicit multi-tenancy/admin/impersonation contract.
- Expanded payment, security, reliability and evidence requirements.

### 2.2.0 — 2026-08-10

- Hardened RLS/object authorization, sessions, MFA, rate limiting and browser security.
- Added production payment architecture and evidence requirements.
- Added product-specific DESIGN.md and contextual anti-slop review.
- Added support/trust and reliability guidance.

### 2.1.0 — 2026-08-10

- Added skills.sh discovery, selection, lock/provenance and least-privilege integration.
- Added universal host support beyond Claude.

### 2.0.0 — 2026-08-10

- Established canonical host-neutral policy, state machine, evidence model, security/accessibility/performance gates, observability, recovery, provenance and adversarial evaluation strategy.

## Roadmap

### 2.5

- Stack-specific executable RLS/authz probes for major database providers.
- Accessibility runner integration with representative screen-reader harnesses.
- SBOM/dependency/license evidence runner.
- Payment provider test-harness adapters.
- Performance/load evidence adapters.
- Mechanical copy/UI anti-slop scoring.
- Skills.sh audit ingestion and hash pinning.
- Automated UI-state matrix generation from routes/actions.

### 3.0

- Optional standalone orchestration runtime with deterministic transitions, policy packs, signed evidence, remote evidence storage, enterprise governance, and continuous project compliance.

## License and external content

Third-party bundled content retains its original license. External skills are not automatically vendored or redistributed. Review license and provenance before copying third-party content into a project.
