# LEVIATHAN

**Universal, evidence-driven AI software engineering protocol for Claude Code, Codex, Kimi, Lovable, Cursor, Windsurf, Copilot, Gemini/Cline-class agents, and future coding agents.**

**Current release:** 2.5.0  
**Policy:** 7  
**Artifact schema:** 1  
**Skills ecosystem:** skills.sh discovery + audited selection

Leviathan helps AI coding agents ship software that is not merely functional, but **secure, correctly authorized, accessible, resilient, payment-safe, product-specific, observable, supportable, recoverable, scalable, and evidence-backed**.

> Leviathan is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable. Unknown is not passed. A test that was not run is not a test that passed.

## What changed in 2.5.0

The production-hardening pass now treats the remaining operational product surfaces as first-class, evidence-backed contracts when applicable:

- Email, notifications and messaging: delivery state, consent/preferences, suppression, retries, provider webhooks, abuse and spend controls.
- Onboarding and activation: first-value definition, progressive disclosure, resumable setup, recovery, and activation measurement.
- Feature flags and progressive delivery: safe defaults, server-side authorization, staged rollout, experiments, kill switches, audit and expiry.
- Analytics/product telemetry: event schemas, consent, minimization, retention/deletion, identity, quality, and AI telemetry safety.
- SEO/public surfaces: crawl boundaries, metadata, canonicalization, structured data, social cards, locale URLs, accessibility and performance.
- Database migrations: expand/contract, bounded backfills, compatibility, lock/replication analysis, and recovery evidence.
- Background jobs/queues: idempotency, retries, dead letters, backpressure, lag, fairness and replay.
- Search: tenant isolation, index consistency, deletion propagation, relevance, query-abuse resistance and performance.
- File/media pipelines: quarantine, validation, scanning, safe transformation, private delivery, variants, quotas and lifecycle deletion.
- Multi-region/residency: geography inventory, routing, consistency, failover/failback and residency evidence.
- Developer experience: clean setup, safe seed data, CI parity, architecture docs and new-developer verification.
- Release communication: changelog, material-change notices, support alignment and provenance.
- AI product evaluation: versioned evaluation harnesses, prompt/model lifecycle, human review, tool/output validation and cost guardrails.
- Advanced accessibility: complex widgets, focus management, live regions, forms, reflow and real assistive-technology evidence.
- Testing strategy: risk-based unit/integration/contract/E2E/security/performance/visual/manual layers.

## Existing production-hardening floor

Security, payments, privacy, legal/trust, observability/recovery, scaling, internationalization, admin/support, stack selection, handoff, threat modeling, supply chain, and evidence gates remain mandatory according to project scope.

See the canonical policy in `LEVIATHAN.md` and the compact agent entrypoint in `SKILL.md`.

## Architecture

```text
                         LEVIATHAN 2.5
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

Run the payment evidence battery in `references/testing.md` (`PAY-*`). A passing checkout UI is not evidence of payment correctness.

## Data, API, uploads, privacy

Read:

- `references/data-integrity-api.md`
- `references/uploads-media.md`
- `references/multi-tenancy-admin.md`
- `references/privacy-engineering.md`
- `references/file-media-pipeline.md` when media processing/delivery is in scope
- `references/search.md` when search/retrieval is in scope
- `references/database-migrations-and-schema-evolution.md` for production schema evolution

Never trust client-supplied ownership, tenant, role, price, balance, entitlement or security claims.

## Trust and support

Read `references/legal-compliance.md` and `references/support-surfaces.md`. User-facing policy and support surfaces must be synchronized with actual behavior. Legal review is escalated when the risk warrants it; generated pages never prove legal compliance.

## Product operations

Load the applicable references for messaging, onboarding, feature flags, analytics, SEO/public surfaces, jobs, search, media, multi-region, developer experience, release communication, AI evaluation, advanced accessibility, and testing strategy. Scope them during Discover/PRD and record explicit `not_applicable` or `out_of_scope` decisions rather than silently omitting them.

## Internationalization

Read `references/i18n-and-l10n.md` whenever multiple locales/markets are targeted or the product may reasonably need localization.

## Admin and support operations

Read `references/admin-and-support-tooling.md` for multi-user products, billing, UGC, moderation, privacy requests, or any privileged support surface. All privileged actions are server-authorized and audited.

## Stack selection

Read `references/stack-selection.md` during Discover/PRD. Choose from requirements and operator constraints, not agent familiarity. Record alternatives and the decision in `DECISIONS.md`.

## Reliability and operations

Read `references/observability.md`, `references/cost-and-recovery.md`, and `references/handoff-and-operations.md`. Production systems require enough telemetry, recovery, deployment identity, dependency failure handling, ownership, and runbook coverage to be operated by a human during failure.

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
HANDOFF.md
RUNBOOK.md
```

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

### 2.5.0 — 2026-08-10

- Added first-class contracts for messaging, onboarding/activation, feature flags/progressive delivery, analytics/product telemetry, SEO/public surfaces, database migrations, background jobs/queues, search, file/media pipelines, multi-region/residency, developer experience, release communication, deeper AI evaluation, advanced accessibility, and testing strategy.
- Integrated the new contracts into `LEVIATHAN.md`, `SKILL.md`, `templates/PRD.md`, threat modeling, testing probes, evidence expectations, and applicable release blockers.
- Bumped policy version from 6 to 7.

### 2.4.0 — 2026-08-10

- Added canonical `references/payments.md` for production money movement.
- Added one-time payment, subscription, usage-based, refund, dispute, tax, dunning and entitlement contracts.
- Added marketplace/payout/connected-account/KYC guidance.
- Added payment provider webhook state-machine and reconciliation requirements.
- Added `PAY-*` executable payment verification probes.
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

## License and external content

Third-party bundled content retains its original license. External skills are not automatically vendored or redistributed. Review license and provenance before copying third-party content into a project.