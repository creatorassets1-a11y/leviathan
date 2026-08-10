# VIBECODE MAX

**Universal, evidence-driven AI software engineering protocol for Claude Code, Codex, Kimi, Lovable, Cursor, Windsurf, Copilot, Gemini/Cline-class agents, and future coding agents.**

**Current release:** 1.1.0  
**Policy:** 1  
**Artifact schema:** 2  
**Skills ecosystem:** skills.sh discovery + audited selection

> **Status: version 1, brand new.** This is the first policy line published under the Vibecode Max name. It has not yet been field-tested across multiple real releases, so treat the policy as an evolving draft: expect gaps, apply judgment, and report what does not hold up in practice.

Vibecode Max helps AI coding agents ship software that is not merely functional, but **secure, correctly authorized, accessible, resilient, payment-safe, product-specific, observable, supportable, recoverable, scalable, and evidence-backed**.

> Vibecode Max is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable. Unknown is not passed. A test that was not run is not a test that passed.

## What the 1.x line includes

The 1.x line treats the full set of operational product surfaces as first-class, evidence-backed contracts when applicable:

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

## Production-hardening floor

Security, payments, privacy, legal/trust, observability/recovery, scaling, internationalization, admin/support, stack selection, handoff, threat modeling, supply chain, and evidence gates remain mandatory according to project scope.

See the canonical policy in `VIBECODE-MAX.md` and the compact agent entrypoint in `SKILL.md`.

## Architecture

```text
                       VIBECODE MAX 1.0
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
| Claude Code / Cowork | `CLAUDE.md`, skills, hooks | `VIBECODE-MAX.md` |
| OpenAI Codex | `AGENTS.md` | `VIBECODE-MAX.md` |
| Kimi | repository/agent instructions | `VIBECODE-MAX.md` |
| Lovable | project knowledge/instructions + portable artifacts | `VIBECODE-MAX.md` |
| Cursor / Windsurf / Copilot | host instruction system | `VIBECODE-MAX.md` |
| Gemini/Cline-class agents | strongest native mechanism | `VIBECODE-MAX.md` |
| Future agents | strongest native mechanism | `VIBECODE-MAX.md` |

Vendor files are adapters, never competing policy sources.

## Skills ecosystem

Vibecode Max uses skills.sh as a **dynamic discovery and provenance layer**, not as a blind bundle. External skills are untrusted implementation aids until selected and reviewed. Never execute third-party instructions merely because a skill is popular.

urlskills.sh documentationhttps://www.skills.sh/docs

```bash
node skills/catalog-sync.mjs --all
node skills/apply.mjs --query "Next.js SaaS with Postgres authentication and payments"
```

Selection creates `.vibecode-max/skills.lock.json` with source/provenance metadata. The canonical policy remains authoritative.

## Security floor

For R2+ systems, Vibecode Max expects explicit authorization boundaries, RLS where applicable, deny-by-default policies, cross-user/cross-tenant negative tests, server-side privileged checks, secure session lifecycle, protected MFA recovery, progressive rate-limit exercise, XSS/CSP defenses, secret/history scanning, dependency/supply-chain review, webhook verification, and backup/recovery evidence.

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
.vibecode-max/
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

No secrets belong in `.vibecode-max/`.

## Self-check

```bash
node tools/vibecode-max-check.mjs
node tools/security-floor.mjs
```

A passing generic scanner does not prove application security. Stack-specific evidence remains mandatory.

## Versioning

- **Vibecode Max version:** feature/behavior release.
- **Policy version:** required gate/safety behavior.
- **Artifact schema:** machine-readable contract.

Policy-changing releases include migration notes. Artifact-breaking releases bump the artifact schema.

## Changelog

### 1.1.0 (2026-08-10)

Project rename from Leviathan to Vibecode Max. Gate behavior, evidence semantics, risk tiers, and
phase names are unchanged, so the policy version stays at 1. The rename does change the on-disk
artifact contract, so the artifact schema moves to 2.

Migration from artifact schema 1:

1. Rename the project artifact directory `.leviathan/` to `.vibecode-max/`.
2. Rename the `leviathan_version` field to `vibecode_max_version` in `.vibecode-max/state.json`.
3. Set `artifact_schema_version` to `2` in `.vibecode-max/state.json`.
4. Repoint policy references: `LEVIATHAN.md` becomes `VIBECODE-MAX.md`,
   `tools/leviathan-check.mjs` becomes `tools/vibecode-max-check.mjs`, and
   `schemas/leviathan-state.schema.json` becomes `schemas/vibecode-max-state.schema.json`.
5. Repoint schema `$id` URLs to `https://github.com/kuyamcliff/vibecode-max`.

Evidence ledger records, gate identifiers, and skills lockfile contents carry over without edits.

### 1.0.0 (2026-08-10)

Initial release, published under the project's former name, Leviathan. Version 1, brand new: not yet
field-tested across multiple real releases. It establishes the canonical host-neutral policy, state
machine, evidence model, risk tiers, security/payments/accessibility floors, and the full set of
operational product surfaces (messaging, onboarding, feature flags, analytics, SEO, migrations,
background jobs, search, media pipelines, multi-region operations, developer experience, release
communication, AI evaluation, advanced accessibility, and testing strategy).

## License and external content

Third-party bundled content retains its original license. External skills are not automatically vendored or redistributed. Review license and provenance before copying third-party content into a project.