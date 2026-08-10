# LEVIATHAN

**Universal, evidence-driven AI software engineering protocol for Claude Code, Codex, Kimi, Lovable, Cursor, Windsurf, Copilot, Gemini/Cline-class agents, and future coding agents.**

**Current release:** 2.2.0  
**Policy:** 4  
**Artifact schema:** 1  
**Skills ecosystem:** skills.sh discovery + audited selection

Leviathan is designed to help AI coding agents ship software that is not merely functional, but **secure, authorized, accessible, product-specific, payment-safe, observable, supportable, recoverable, and evidence-backed**.

> Leviathan is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable. Unknown is not passed. A test that was not run is not a test that passed.

## What changed in 2.2.0

This release turns the 2.1 skills ecosystem edition into a substantially harder production gate.

### Security

- Explicit deny-by-default authorization requirements.
- Mandatory RLS policy generation/verification where RLS exists.
- Cross-user and cross-tenant negative authorization tests.
- Server-side-only privileged action checks.
- Explicit prohibition on long-lived sensitive browser tokens in local/session storage.
- Session idle/absolute timeout, rotation, revocation, logout-everywhere, and refresh-token reuse requirements.
- Hardened MFA/OTP/recovery requirements.
- Progressive/account + network rate-limit testing.
- XSS/raw-HTML sink controls and CSP requirements.
- Webhook signature/replay controls.
- RPC/function privilege-boundary review.
- Portable `tools/security-floor.mjs` pattern scanner.

### Payments

- Client redirects can never grant entitlements.
- Raw-body webhook signature verification.
- Provider + internal idempotency.
- Duplicate and out-of-order event handling.
- Refund/dispute/subscription failure handling.
- Reconciliation jobs.
- Money-safe arithmetic.
- Sandbox/live separation.
- PCI-scope minimization.
- Payment evidence IDs and release gates.

### UX / anti-slop

- Required `DESIGN.md` rationale before substantial UI work.
- Information architecture, brand, typography, motion, content voice, responsive, and accessibility contracts.
- Mechanical review signals for generic AI compositions and copy.
- First-class empty/loading/error/offline/permission/recovery states.
- No fixed "Leviathan aesthetic"; product-specific reasoning wins.

### Trust / legal-risk / support

- Product-dependent Terms, Privacy, cookie notice, AUP/community rules, refund policy, contact/support, help/FAQ, onboarding, accessibility, security/trust and status surfaces.
- Server-side moderation/sanction requirements where applicable.
- Policy-to-implementation consistency checks.
- Human legal escalation for material jurisdiction-specific risk.

### Scale / reliability

- Database indexing/query-plan/N+1/migration requirements.
- Load/concurrency and failure-mode testing.
- p50/p75/p95 performance reporting where useful.
- SLO/SLI, RPO/RTO, health, alerts, rollback, backup/restore and dependency-failure requirements.
- Cost and AI-token budget guidance.

## Architecture

```text
                         LEVIATHAN 2.2
                              |
                 +------------+------------+
                 |                         |
          UNIVERSAL POLICY            SKILLS ECOSYSTEM
                 |                         |
          STATE MACHINE              discover -> audit
                 |                         |
     +-----------+-----------+        select -> lock
     |           |           |             |
  SECURITY     UX       PAYMENTS      least privilege
     |           |           |             |
     +-----------+-----------+-------------+
                 |
          VERIFICATION ENGINE
                 |
       evidence + negative tests
                 |
            RELEASE GATES
                 |
       release -> operate -> recover
```

The key principle is **policy -> state -> checks -> evidence -> gates**, not policy as prose alone.

## Lifecycle

```text
CLASSIFY
  -> DISCOVER
  -> RESEARCH
  -> PRD APPROVAL
  -> DESIGN APPROVAL
  -> PLAN / BUILD
  -> INDEPENDENT REVIEW
  -> SECURITY / A11Y / PERFORMANCE / PAYMENT QA
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

## skills.sh integration

Leviathan uses skills.sh as a **dynamic discovery and provenance layer**, not as a blind bundle. The skills.sh API provides catalog, search, curated/official, detail, and security-audit endpoints. skills.sh also explicitly warns that listed skills are not guaranteed safe or appropriate, so popularity is not a trust decision.

urlskills.sh documentationhttps://www.skills.sh/docs

Sync discovery metadata:

```bash
node skills/catalog-sync.mjs --all
```

Select only skills relevant to a project:

```bash
node skills/apply.mjs --query "Next.js SaaS with Postgres authentication and payments"
```

Selection creates `.leviathan/skills.lock.json`. It does **not** automatically execute third-party instructions.

Trust hierarchy:

```text
LEVIATHAN policy
    > project-approved decisions
    > official technology-maker guidance
    > audited/selected third-party skills
    > generic agent defaults
```

Never copy the entire live catalog into the repository. Pin selected capabilities and retain source/hash/audit/provenance information.

## Security floor

For R2+ systems, Leviathan expects explicit authorization boundaries, RLS where applicable, negative IDOR/cross-tenant tests, server-side privileged checks, secure sessions, protected MFA recovery, rate-limit exercise, XSS defenses, secret/history scanning, dependency/supply-chain review, webhook verification, and backup/recovery evidence.

Read `references/security/authorization-and-rls.md`.

Run the portable scanner:

```bash
node tools/security-floor.mjs
```

The scanner is a pattern detector and evidence generator. It is **not** a replacement for stack-specific authorization/security testing.

## Payments

Payments are R3 by default. Fulfillment must come from verified provider events, never from a browser success redirect. Webhooks must be signature-verified and idempotent. Duplicate/out-of-order delivery, refunds, disputes, subscriptions, reconciliation, money arithmetic, and sandbox/live separation must be tested.

Read `references/payments/production-payments.md`.

## Frontend and UX

`DESIGN.md` must establish product-specific information architecture, visual rationale, brand, typography, layout, motion, voice, responsive behavior, accessibility, and state completeness before substantial UI work.

Anti-slop is a review discipline, not a blacklist. A justified design choice can pass. Leviathan must not replace generic AI defaults with a recognizable Leviathan house style.

Read `references/frontend/anti-slop-and-ux.md`.

## Trust and support

User-facing policies and support surfaces must match actual product behavior. Applicable products should provide appropriate Terms, Privacy, tracking/cookie notice, AUP/community rules, refund/cancellation policy, contact/support, help/FAQ, onboarding, accessibility, security/trust, and status/incident surfaces.

Read `references/product/trust-and-support.md`.

## Scale and reliability

Architecture is selected from measured requirements. Critical paths need realistic performance measurement, database/query review, load/failure testing where justified, observability, rollback, backup/restore, RPO/RTO, and cost controls.

Read `references/scale/performance-and-reliability.md`.

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
RUNBOOK.md
SECURITY.md
DECISIONS.md
DEPENDENCIES.md
```

No secrets belong in `.leviathan/`.

## Repository organization

```text
LEVIATHAN.md
AGENTS.md
CLAUDE.md
SKILL.md

skills/
  README.md
  policy.md
  catalog-sync.mjs
  apply.mjs
  packs/index.md

references/
  security/
  payments/
  frontend/
  product/
  scale/
  stacks/
  legal-compliance.md
  threat-model.md

schemas/
tools/
evals/
.github/workflows/
```

The repository contains **Leviathan policy and curated references**, not a stale dump of every third-party skill.

## Self-check

```bash
node tools/leviathan-check.mjs
node tools/security-floor.mjs
```

Both tools produce evidence. A passing scanner still does not mean the application is secure without the required stack-specific tests.

## Versioning

- **Leviathan version:** feature/behavior release.
- **Policy version:** changes to required gates/safety behavior.
- **Artifact schema version:** machine-readable contract changes.

Policy-changing releases must include migration notes. Artifact-breaking releases must bump the artifact schema version.

## Changelog

### 2.2.0 — 2026-08-10

- Hardened RLS/object authorization and cross-tenant isolation requirements.
- Added server-side-only privilege checks and browser session controls.
- Added MFA/OTP/recovery and progressive rate-limit requirements.
- Added XSS/CSP/browser trust-boundary requirements.
- Added production payment architecture and evidence gate.
- Added reconciliation, idempotency, duplicate/out-of-order event handling, refund/dispute and entitlement requirements.
- Added product-specific DESIGN.md and mechanical anti-slop/UX review requirements.
- Added first-class empty/loading/error/offline/permission state requirements.
- Added trust, support, moderation, and policy-to-implementation consistency requirements.
- Added database/load/reliability/cost guidance.
- Added portable `tools/security-floor.mjs`.
- Bumped policy version from 3 to 4.

### 2.1.0 — 2026-08-10

- Added skills.sh ecosystem discovery, selection, lock/provenance, trust, licensing, and least-privilege integration.
- Added universal host support beyond Claude.

### 2.0.0 — 2026-08-10

- Established canonical host-neutral policy, state machine, evidence model, security/accessibility/performance gates, observability, recovery, provenance, and adversarial evaluation strategy.

## Roadmap

### 2.3

- Stack-specific executable RLS/authz probes for major database providers.
- Accessibility runner integration.
- SBOM/dependency/license evidence runner.
- Payment test harness adapters.
- Performance/load evidence adapters.
- Mechanical copy/UI anti-slop scoring.
- Skills.sh audit ingestion and hash pinning using the live API.

### 2.4

- Cross-agent benchmark corpus with quantitative regression scoring.
- Signed evidence/provenance and artifact attestations.
- Capability-aware multi-agent delegation.

### 3.0

- Optional standalone orchestration runtime with deterministic transitions, policy packs, signed evidence, remote evidence storage, enterprise governance, and continuous project compliance.

## License and external content

Third-party bundled content retains its original license. External skills are not automatically vendored or redistributed. Review license and provenance before copying third-party content into a project.
