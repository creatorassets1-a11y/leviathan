# LEVIATHAN

**Universal AI software engineering protocol for Claude, Codex, Kimi, Lovable, Cursor, Windsurf, GitHub Copilot, Gemini/Cline-class agents, and other coding agents.**

Current release: **2.1.0**  
Policy version: **3**  
Artifact schema version: **1**  
Skills ecosystem: **skills.sh integrated**

Leviathan turns an idea or existing repository into software that is planned, designed, implemented, reviewed, tested, secured, observed, released, and handed over with evidence.

> Leviathan is legal-risk-aware, not a lawyer. It is security-hardened, not magically unhackable. It reports evidence and limitations instead of manufacturing certainty.

## 2.1.0 — Skills Ecosystem Edition

Leviathan now integrates with the open agent-skills ecosystem at **https://www.skills.sh/**.

The important design decision is that Leviathan **does not blindly copy every skill into the repository**. The catalog is large and continuously changing. Instead, Leviathan treats the ecosystem as a capability registry:

```text
skills.sh catalog
      |
      v
 discover -> classify -> security/provenance review
      |
      v
 map to Leviathan capability packs
      |
      v
 select only what the project needs
      |
      v
 record in .leviathan/skills.lock.json
      |
      v
 manual/agent approval -> activate with least privilege
```

This provides broad ecosystem coverage without turning Leviathan into a stale, duplicated, or unsafe bundle of third-party instructions.

### What 2.1 adds

- skills.sh catalog synchronization
- project-specific skill selection
- machine-readable skill lock/provenance
- third-party skill security and activation policy
- native capability packs for agent workflow, architecture, frontend, design, browser QA, TDD, databases, security, AI engineering, observability, cloud, research, mobile, and growth/content
- official-technology-maker skill preference
- least-privilege skill activation
- protection against malicious instructions embedded in skill content
- licensing/non-vendoring rules
- skill staleness and integrity tracking
- skill-aware release provenance
- clearer organization between universal policy, native references, external skills, schemas, tools, and evals

## Core architecture

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
       skills + capability packs
                |
         evidence ledger
                |
          release gate
                |
       release + operations
```

The key idea is that rules become **state, checks, evidence, permissions, and gates**, rather than remaining only as prose instructions.

## Host-neutral model

| Agent / host | Native entrypoint | Leviathan canonical policy |
| --- | --- | --- |
| Claude Code / Cowork | `CLAUDE.md`, skills, hooks | `LEVIATHAN.md` |
| OpenAI Codex | `AGENTS.md` | `LEVIATHAN.md` |
| Kimi Code / CLI | repository instructions | `LEVIATHAN.md` |
| Lovable | project instructions/knowledge | `LEVIATHAN.md` + portable artifacts |
| Cursor / Windsurf / Copilot / Gemini / Cline | host instruction mechanism | `LEVIATHAN.md` |
| Any future agent | strongest available native mechanism | `LEVIATHAN.md` |

No vendor-specific file is allowed to become a competing policy.

## Skills ecosystem integration

Read:

- `skills/README.md`
- `skills/policy.md`
- `skills/packs/index.md`

Sync the current catalog:

```bash
node skills/catalog-sync.mjs --all
```

Select skills for a project:

```bash
node skills/apply.mjs --query "Next.js SaaS with Postgres authentication and payments"
```

This creates `.leviathan/skills.lock.json`. Selection does **not** automatically execute third-party instructions.

### Trust hierarchy

```text
LEVIATHAN.md
    > security floor
    > project-approved decisions
    > official technology guidance
    > selected third-party skills
    > generic agent defaults
```

Install counts and leaderboard position are discovery metadata, not proof of quality or safety. skills.sh itself warns that it cannot guarantee the quality or security of every listed skill, so Leviathan requires review before activation.

## Pipeline

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

Higher-risk systems require deeper discovery, threat modeling, independent review, stronger evidence, tighter permissions, and more human approval.

## What Leviathan enforces conceptually

### Evidence, not claims

A release claim needs:

```text
command/tool action
+ actual result
+ timestamp
+ environment
+ artifact
+ limitations
```

`not_run`, `not_available`, `simulated`, and `unknown` are never passes.

### Security

The baseline covers authentication, authorization/IDOR, sessions, secrets, rate limiting, validation, security headers, dependency/supply-chain controls, AI-specific threats, least privilege, backups, and recovery.

### Accessibility

Accessibility is built during implementation and verified with automated and manual checks: keyboard flows, focus, names/labels, contrast, zoom/reflow, reduced motion, screen-reader checks, and platform-appropriate interaction sizes.

### Performance

Budgets come from the actual audience and product. Repeated measurements, representative device/network conditions, percentile reporting, and separate lab/real-user evidence are preferred.

### AI engineering

AI products receive additional checks for prompt injection, retrieval/context leakage, tool overreach, cross-tenant leakage, unsafe tool arguments, secret exposure, output validation, model/provider failure, and cost/abuse exhaustion.

### Supply chain

Dependencies, packages, plugins, MCP servers, hooks, and skills are treated as part of the software supply chain. Review provenance, lock versions, scan dependencies, track licenses, and minimize permissions.

### Operations

Production systems define structured logs, errors, metrics, health checks, alerts, rollback, incident response, backup/restore, and appropriate RPO/RTO.

## Portable project artifacts

A production project should contain:

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

`.leviathan/` contains the build audit trail and must not contain secrets.

## Repository organization

```text
LEVIATHAN.md                    canonical universal policy
AGENTS.md                       universal agent entrypoint
CLAUDE.md                       Claude/repository maintenance adapter
SKILL.md                        compact skill entrypoint

skills/
  README.md                     ecosystem integration
  policy.md                     trust/activation/licensing rules
  catalog-sync.mjs              skills.sh metadata sync
  apply.mjs                     project-specific selector/lock writer
  packs/index.md                stable capability taxonomy

references/                     stable Leviathan knowledge
schemas/                        machine-readable contracts
tools/                          dependency-free verification
evals/                          benchmark/adversarial evaluation
.github/workflows/              Leviathan self-validation
```

Do not dump the entire external skills ecosystem into `skills/`. Reference and pin external capabilities instead.

## Self-checker

```bash
node tools/leviathan-check.mjs
```

The checker validates generated-project state/evidence, recommended handoff artifacts, and safety conditions. It is intentionally small enough for any supported coding agent to run.

## Release model

Leviathan uses three version layers:

- **Leviathan version** — feature/behavior release.
- **Policy version** — changes to gates, safety requirements, or required behavior.
- **Artifact schema version** — machine-readable contract changes.

A gate-changing release bumps the policy version and includes migration guidance. A breaking artifact change bumps the artifact schema version.

## Changelog

### 2.1.0 — 2026-08-10

- Added first-class skills.sh ecosystem integration.
- Added safe catalog synchronization without vendoring the external ecosystem.
- Added project-specific skill selection and lock/provenance records.
- Added third-party skill trust, security, licensing, staleness, and least-privilege policy.
- Added stable Leviathan capability packs for cross-agent reuse.
- Added skill-aware state/evidence/release requirements.
- Reorganized repository guidance around policy, skills, references, schemas, tools, and evals.
- Expanded universal agent coverage beyond Claude to Codex, Kimi, Lovable, Cursor, Windsurf, Copilot, Gemini/Cline-class agents, and future hosts.

### 2.0.0 — 2026-08-10

- Reframed Leviathan as a universal, host-neutral AI coding-agent protocol.
- Added canonical `LEVIATHAN.md` and universal `AGENTS.md` entrypoint.
- Added explicit state-machine and evidence-ledger architecture.
- Added machine-readable state and evidence schemas.
- Added dependency-free checker and self-validation CI.
- Split security, accessibility, dependency, and performance release policies.
- Added structured threat modeling and AI-specific security testing.
- Added observability, supply-chain, minor-safety, cost, rollback, recovery, RPO/RTO, and provenance guidance.
- Added benchmark and adversarial-evaluation strategy.
- Reworked legal guidance to avoid false claims of legal compliance.
- Reworked anti-slop guidance so Leviathan does not develop a recognizable house style.

### 1.1.1 — 2026-07-21

- Tightened the Claude skill frontmatter description for host upload limits.

### 1.1 — 2026-07-19

- Bundled the humanizer ruleset and updated the documentation.

### 1.0 — 2026-07-19

- Initial lifecycle build protocol for websites and web applications.

## Roadmap

### 2.2

- Automated authz/IDOR probes, dependency/SBOM checks, accessibility scanners, performance budgets, and anti-slop verification.
- Skill audit ingestion and hash pinning through the skills.sh API where available.
- More framework/provider adapters and project migration tooling.

### 2.3

- Full benchmark corpus and quantitative regression scoring across coding agents.
- Signed provenance and artifact attestations.
- Multi-agent scheduling and capability-aware delegation.

### 3.0

- Optional standalone orchestration runtime with deterministic state transitions, signed evidence, policy packs, remote evidence storage, and enterprise governance.

## External ecosystem

Leviathan uses the skills.sh ecosystem for discovery. See https://www.skills.sh/ and its documentation for the catalog, CLI, API, and security-audit model.

Leviathan does not claim that any third-party skill is safe, current, compatible, licensed for redistribution, or appropriate for every project. Review before activation.

## Credits and license

The bundled humanizer ruleset in `references/humanizer/` is vendored from [blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen under its MIT license, with the license preserved in that directory. Everything else is covered by the repository `LICENSE`.
