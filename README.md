# LEVIATHAN

**Universal, evidence-driven AI software engineering protocol for Claude Code, Codex, Kimi, Lovable, Cursor, Windsurf, Copilot, Gemini/Cline-class agents, and future coding agents.**

**Current release:** 2.4.0  
**Policy:** 6  
**Artifact schema:** 1  
**Skills ecosystem:** skills.sh discovery + audited selection

Leviathan helps AI coding agents ship software that is not merely functional, but **secure, correctly authorized, accessible, resilient, payment-safe, product-specific, observable, supportable, recoverable, scalable, and evidence-backed**.

> Leviathan is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable. Unknown is not passed. A test that was not run is not a test that passed.

## What changed in the production-hardening pass

The production-hardening pass closes the remaining major protocol gaps by making privacy engineering, internationalization, admin/support tooling, stack selection, and operational handoff first-class contracts. It also wires those contracts into the PRD, skill entrypoint, evidence expectations, and release workflow.

### Security and data

- Deny-by-default RLS/object authorization, server-side privilege checks, session lifecycle, MFA/recovery, rate-limit exercise, upload isolation, webhook authenticity, and secret scanning are mandatory where applicable.
- Privacy engineering covers living data inventory, minimization, consent enforcement, export/deletion/correction, retention automation, processors, residency, AI data flows, and executable privacy probes.
- Personal-data policy claims must match actual implementation; missing evidence remains `not_run`, `not_available`, `simulated`, or `unknown`.

### Payments

- PSP state is authoritative; local payment/entitlement state is a reconcilable projection.
- Client success redirects can never grant paid access or fulfill an order.
- Webhooks require raw-body signature verification, durable event-ID deduplication, idempotent side effects, replay protection, and out-of-order handling.
- R3/R4 payment systems require reconciliation with zero unexplained drift.
- One-time payments, subscriptions, usage billing, refunds, disputes, tax, dunning, marketplace payouts/KYC, mobile billing decisions, and operational runbooks are covered where applicable.

See `references/payments.md` and `references/testing.md`.

### UX, accessibility, and localization

- Major async journeys cover loading, success, empty, validation error, server error, timeout, offline/reconnect, unauthorized, forbidden, rate-limited, partial/degraded, duplicate/in-flight, rollback, and retry-exhausted states where applicable.
- Accessibility is tested on meaningful journeys, not only automated scans.
- Internationalization externalizes strings, uses locale-aware formatting, supports fallback and text expansion, and requires RTL evidence where relevant.

See `references/i18n-and-l10n.md`.

### Performance and reliability

- Performance claims require product-specific budgets, repeated percentile measurements, realistic device/network evidence, and representative concurrency/load results.
- Hot queries require query-plan/index evidence; N+1 behavior, pool saturation, queue failure, dependency degradation, and graceful recovery are tested.
- Production observability requires structured correlation, safe redaction, health/readiness, golden signals, business/dependency metrics, actionable alerts, rollback, backup restore, and incident procedures.

See `references/scale/performance-and-reliability.md`, `references/scale/performance-probes.md`, and `references/observability.md`.

### Trust, support, and administration

- Terms, Privacy, tracking, AUP, refunds/cancellation, contact, Help/FAQ, guides, accessibility, security/trust, and status surfaces are generated according to actual product behavior and market risk.
- Moderation/enforcement is server-side, auditable, attributable, and appealable where applicable.
- Admin/support tooling uses least privilege, strong authentication, server-side authorization, append-only audit evidence, safe impersonation, billing controls, moderation workflows, privacy operations, anomaly detection, and access review.

See `references/legal-compliance.md`, `references/support-surfaces.md`, and `references/admin-and-support-tooling.md`.

### Stack selection and handoff

- Stack choices are evidence-based and recorded with constraints, alternatives, operational consequences, and rationale.
- Production systems require `HANDOFF.md`, `RUNBOOK.md`, `DECISIONS.md`, ownership, escalation, deployment/recovery procedures, known limitations, and maintainability instructions.
- The original agent conversation is never the sole source of operational knowledge.

See `references/stack-selection.md`, `references/handoff-and-operations.md`, `templates/HANDOFF.md`, `templates/RUNBOOK.md`, and `templates/DECISIONS.md`.

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

Run the payment evidence battery in `references/testing.md` (`PAY-*`). A passing checkout UI is not evidence of payment correctness.

## Data, API, uploads, privacy

Read:

- `references/data-integrity-api.md`
- `references/uploads-media.md`
- `references/multi-tenancy-admin.md`
- `references/privacy-engineering.md`

Never trust client-supplied ownership, tenant, role, price, balance, entitlement or security claims.

## Trust and support

Read `references/legal-compliance.md` and `references/support-surfaces.md`. User-facing policy and support surfaces must be synchronized with actual behavior. Legal review is escalated when the risk warrants it; generated pages never prove legal compliance.

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

### Production-hardening pass — 2026-08-10

- Added canonical internationalization/localization contract with string externalization, locale formatting, translation workflow, RTL, legal/support localization, and `I18N-*` evidence.
- Added secure admin/internal support tooling contract with least privilege, server-side authorization, auditability, impersonation controls, billing/privacy operations, moderation, anomaly detection, and `ADMIN-*` evidence.
- Added evidence-based stack/language/framework selection guidance and required decision records.
- Added final handoff, RUNBOOK, ownership, maintainability, and continuity requirements.
- Added `HANDOFF.md`, `RUNBOOK.md`, and `DECISIONS.md` templates.
- Added executable performance/scaling probe coverage and wired production contracts into the PRD and skill entrypoint.
- Preserved existing security, payments, legal/trust, observability, scaling, and privacy contracts while making the remaining major operational surfaces first-class.

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
