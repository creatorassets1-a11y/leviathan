# Leviathan

**Universal AI software engineering protocol for Claude, Codex, Kimi, Lovable, and other coding agents.**

Current release: **2.0.0**  
Policy version: **2**  
Artifact schema version: **1**

Leviathan turns an idea or existing repository into software that is planned, designed,
implemented, reviewed, tested, secured, observed, released, and handed over with evidence.
It is deliberately **host-neutral**. The same policy travels with the project when you move
between coding agents.

> Leviathan is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable.
> It reports evidence and limitations instead of manufacturing certainty.

## Why 2.0 is different

The first generation was a detailed build protocol. 2.0 turns that protocol into a portable
engineering system with explicit state, evidence, risk tiers, adapters, machine-readable schemas,
self-validation, stronger security, observability, recovery, child-safety analysis, supply-chain
controls, and regression benchmarks.

### The architectural change

```text
USER / PRODUCT OWNER
        |
 discovery + approval
        v
LEVIATHAN POLICY
        |
   state machine
        v
 research -> design -> build
        |       |       |
        +-------+-------+
                v
        independent review
                |
     security / a11y / performance
                |
         evidence ledger
                |
          release gate
                |
       release + operations
```

The key idea is that **rules become state, checks, evidence, and gates**, rather than remaining
only as prose instructions.

## Supported agent model

Leviathan does not require one vendor's agent API.

| Agent / host | Adapter | Core mechanism |
| --- | --- | --- |
| Claude Code / Cowork | `CLAUDE.md` + `SKILL.md` | skills, subagents, hooks, shell |
| OpenAI Codex | `AGENTS.md` | repository instructions + terminal/editing |
| Kimi Code / CLI | `AGENTS.md` + `LEVIATHAN.md` | repository instructions + available tools |
| Lovable | project instructions + repo artifacts | project knowledge, app/backend tools, preview |
| Other coding agents | `AGENTS.md` + `LEVIATHAN.md` | strongest available native mechanism |

The adapter never creates a second policy. `LEVIATHAN.md` is canonical. See
`references/adapters.md`.

## The pipeline

```text
CLASSIFY
  -> DISCOVER
  -> RESEARCH
  -> PRD APPROVAL
  -> DESIGN APPROVAL
  -> PLAN / BUILD
  -> INDEPENDENT REVIEW
  -> QA / SECURITY
  -> RELEASE DECISION
  -> HANDOFF / OPERATE
```

Emergency fixes can enter implementation sooner, but the exception is recorded and the security
and data-safety floors remain mandatory.

## What 2.0 fixes

### Prose-only gates

**Before:** the agent was told not to skip gates.  
**Now:** `.leviathan/state.json` records phase state, schemas define the contract, and the
portable checker validates it. Missing evidence is not a pass.

### Fake evidence risk

**Before:** evidence was specified but not structurally enforced.  
**Now:** `.leviathan/evidence/ledger.json` has a machine-readable schema, statuses, artifacts,
commands, timestamps, and limitations.

### One-size-fits-all severity

**Before:** security, accessibility, and dependency findings were combined into one count.  
**Now:** categories have separate release rules and security exceptions require an owner,
justification, mitigation, expiration, approval, and residual risk.

### Security advice without enough automation

**Now:** Leviathan explicitly requires authorization/IDOR probes, secret scans, dependency review,
rate-limit exercise, AI-specific threat testing, safe secret lifecycle, and recovery procedures.

### Legal overconfidence

**Before:** language could imply generated pages meant a product was legally covered.  
**Now:** legal status is explicitly risk-assessment based and can require human legal review.
Current rules must be rechecked against authoritative sources.

### Missing observability

**Now:** production backends need safe structured logs, errors, health/readiness, metrics,
alerts, deployment identity, rollback, incident response, and appropriate RPO/RTO.

### Weak disaster recovery

**Now:** material systems define backup/restore behavior, RPO/RTO, recovery steps, and actual
restore verification.

### Supply-chain gaps

**Now:** dependency provenance, lockfiles, install-script review, vulnerability scanning, SBOM
where supported, license tracking, secret scanning, and compromised-dependency response are part
of the protocol.

### Minor safety

**Now:** projects involving minors can activate a dedicated safety mode covering age assurance,
privacy, discoverability, messaging, location, moderation, reporting, and legal review.

### Anti-slop becoming another template

**Now:** Leviathan does not prescribe a single visual style. Anti-slop rules require deliberate,
product-specific choices and brand rationale instead of banning a small list of colors/fonts.

### No cost or rollback controls

**Now:** projects can define agent time/token/tool-call budgets and use verified checkpoints.
Failed changes return to the last known-good checkpoint instead of accumulating uncertain patches.

### No build provenance

Every generated project records Leviathan version, policy version, artifact schema version,
host capabilities, decisions, evidence, and release information.

### Weak self-testing

Leviathan now has self-validation CI plus a benchmark/evaluation strategy covering security,
accessibility, performance, requirements coverage, false claims, cost, human intervention,
and adversarial prompt-injection attempts.

## Portable project artifacts

A production build should contain:

```text
.leviathan/
  state.json
  decisions.json
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

The `.leviathan/` directory contains no secrets. It is the audit trail for the build.

## Verification philosophy

Leviathan refuses to say "working" merely because code looks plausible.

A release claim needs evidence such as:

```text
command/tool action
+ actual result
+ timestamp
+ environment
+ artifact
+ limitations
```

If the current agent cannot perform browser testing, real-device testing, payment capture,
production deployment, or another required check, the report says **not available**. It does not
pretend.

## Security floor

The security baseline includes strong password hashing using maintained primitives,
passkeys/WebAuthn where appropriate, secure sessions and recovery, object-level authorization and
IDOR testing, rate limiting, input/output validation, secret lifecycle and rotation, TLS/security
headers, least-privilege database access, dependency/secret scanning, AI tool authorization,
prompt-injection defenses, and backup restore verification for material systems.

See `references/auth-security.md` and `references/threat-model.md`.

## Accessibility and performance

Accessibility is built during implementation and verified with both automated and manual checks.
Typical checks include keyboard flows, focus, names/labels, contrast, zoom/reflow, reduced motion,
and screen-reader spot tests.

Performance budgets are chosen from the actual audience and product rather than from a convenient
flagship device. Multiple measurements are preferred. Lab results and real-user evidence are
reported separately.

## AI-specific engineering

If the product itself contains AI, Leviathan adds tests for prompt injection, retrieval/context
leakage, tool overreach, cross-tenant leakage, unsafe tool arguments, secret exposure in prompts
or logs, output validation, model/provider failure, and abuse/cost exhaustion.

## Install / use

### Generic

Make the agent read:

```text
LEVIATHAN.md
AGENTS.md
```

If the host supports skills, also install/use `SKILL.md`.

### Claude Code

Use the repository as a Claude skill or make the project's `CLAUDE.md` point to `LEVIATHAN.md`.

### Codex

Keep `AGENTS.md` in the repository and load `LEVIATHAN.md` as the canonical policy.

### Kimi

Use the repository instruction mechanism available in the Kimi environment and preserve
`AGENTS.md` + `LEVIATHAN.md`.

### Lovable

Add the canonical policy to the project's supported instructions/knowledge and keep portable
artifacts in the generated repository. If a verification capability is unavailable, record it
instead of claiming it happened.

## Self-checker

The repository includes a dependency-free checker:

```bash
node tools/leviathan-check.mjs
```

It validates generated-project state/evidence, recommended handoff artifacts, and several
secret/release safety conditions. It is intentionally small so any coding agent can run it.

## Repository layout

```text
SKILL.md                         compact skill entrypoint
LEVIATHAN.md                    canonical universal policy
AGENTS.md                       universal repository entrypoint
CLAUDE.md                       repository maintenance rules
references/adapters.md          host adapters
references/policy-engine.md     gates and release policy
references/threat-model.md      structured threat modeling
references/auth-security.md     security floor
references/testing.md           verification protocol
references/observability.md     production observability
references/supply-chain.md      dependency/supply-chain security
references/child-safety.md      minor-safety mode
references/cost-and-recovery.md cost, rollback, disaster recovery
references/benchmarking.md      self-evaluation and regression strategy
schemas/                        portable state/evidence contracts
tools/leviathan-check.mjs       dependency-free checker
evals/                          benchmark/evaluation inputs
.github/workflows/              Leviathan self-validation CI
```

## Release model

Versioning has three layers:

- **Leviathan version:** overall feature/behavior release.
- **Policy version:** changes that alter gates, safety requirements, or required behavior.
- **Artifact schema version:** changes to machine-readable project artifacts.

A gate-changing release must bump the policy version and include a migration note. A schema
breaking change must bump the artifact schema version and include migration guidance.

## Changelog

### 2.0.0 - 2026-08-10

- Reframed Leviathan as a universal, host-neutral AI coding-agent protocol.
- Added canonical `LEVIATHAN.md` and universal `AGENTS.md` entrypoint.
- Added cross-agent adapter guidance for Claude, Codex, Kimi, Lovable, and other hosts.
- Added explicit state-machine and evidence-ledger architecture.
- Added machine-readable state and evidence schemas.
- Added dependency-free `leviathan-check.mjs` gate/evidence checker.
- Added self-validation GitHub Actions workflow.
- Split security, accessibility, dependency, and performance release policies.
- Added structured threat modeling and AI-specific security testing.
- Added production observability requirements.
- Added supply-chain/SBOM/provenance guidance.
- Added minor-safety mode.
- Added cost budgets, build checkpoints, rollback, recovery, RPO/RTO, and vendor-exit guidance.
- Added benchmark and adversarial-evaluation strategy.
- Reworked legal guidance to avoid false claims of legal compliance.
- Strengthened authentication, authorization, secret lifecycle, and recovery guidance.
- Reworked anti-slop guidance so Leviathan does not develop a recognizable house style.
- Added versioned policy/schema model and build provenance requirements.

### 1.1.1 - 2026-07-21

- Tightened the Claude skill frontmatter description for host upload limits.

### 1.1 - 2026-07-19

- Bundled the humanizer ruleset and updated the documentation.

### 1.0 - 2026-07-19

- Initial lifecycle build protocol for websites and web applications.

## Roadmap

### 2.1

- More executable scanners for authorization, headers, dependency risk, accessibility, and
  anti-slop checks.
- Project migration/upgrade command for older Leviathan artifacts.
- Expanded benchmark corpus and regression scoring.
- More deployment/provider adapters.

### 2.2

- Portable SBOM generation adapters.
- More framework stacks and mobile/bot/extension guidance.
- Structured incident-response and observability templates.

### 3.0

- Optional standalone orchestration runtime with deterministic state transitions, artifact
  signing, multi-agent scheduling, remote evidence storage, and policy packs.

## Credits and license

The bundled humanizer ruleset in `references/humanizer/` is vendored from
[blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen under its MIT license,
with the license preserved in that directory. Everything else is covered by the repository
`LICENSE`.
