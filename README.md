# Leviathan

The complete build system skill for Claude. It turns "I want to build X" into a
shipped, production-ready product: websites and web apps today, with mobile apps,
bots, extensions, and desktop tools on the roadmap.

## What it is

Leviathan is a Claude skill (SKILL.md + reference library) that governs the entire
lifecycle of a build. Instead of generating code on request, it runs a pipeline with
hard gates:

```
Interview → Research → PRD (user approves) → Design system → Build → Verify → Ship
```

What every build gets, enforced rather than suggested:

- **Planned before built.** An adaptive interview (plain language, defaults offered,
  consequences attached), market research, and a written PRD you approve. No code
  exists before approval; the gate is absolute.
- **No AI slop.** A locked design system (`DESIGN.md`) replaces every default that
  marks a product as AI-made: no purple gradients, no Inter-only typography, no hero
  plus three feature cards, no colored left borders, no fake testimonials, ever. Four
  named design directions ship with real type pairings and layout systems.
- **Human copy.** Every piece of user-facing text passes the bundled humanizer
  ruleset, which detects and removes the documented fingerprints of AI writing.
- **Secure by default.** Argon2id at current OWASP parameters, passkeys first,
  object-level authorization checks, rate limits, security headers, secrets
  discipline, supply-chain vetting. The security floor is never skippable.
- **Legally covered.** Privacy, terms, and cookie pages that match the actual
  codebase, per-region logic (GDPR, EAA, CCPA and siblings), consent that genuinely
  blocks scripts pre-consent, and lawyer-review flags for regulated sectors.
- **Verified, not vibed.** Nothing is called working until it has been exercised.
  Every claim in the final report links to evidence. Hard ship gates cover security,
  accessibility (WCAG 2.2 AA), anti-slop, and performance budgets stricter than Core
  Web Vitals, tested on the audience's real device profile.
- **Owned by you.** Handoff includes a runbook, decisions log, dependency ledger,
  launch checklist, and an exit strategy for every vendor.

## How to use it

**Install** into your Claude skills directory:

```
npx skills add creatorassets1-a11y/leviathan
```

or clone this repo into `~/.claude/skills/leviathan` (Claude Code) or upload it as a
skill on claude.ai. Everything it needs is bundled; there are no external skill
dependencies.

**Then just ask Claude to build something.** The skill triggers on any build request,
however casual or vague:

- "Make a site for my auntie who sells clothes in Douala"
- "I want something like Airbnb for photography studios"
- "Build me a SaaS dashboard with accounts and Stripe"
- "Is my site production ready?"
- "Make this look less AI"

**What to expect:** Claude will interview you first (a few batched questions with
suggested defaults; answering "your call" is always allowed), research your market,
and present a PRD for approval before writing any code. You will see and approve the
design direction before the full build. At the end you get a verification report
where every claim carries evidence, plus the full ownership handoff. If you ask it to
skip steps, it will tell you the cost in one paragraph and comply, except for the
security and legal floors, which are non-negotiable.

**Works in** Claude Code and Cowork (full pipeline with parallel agent roles),
claude.ai with the code container (full pipeline, sequential), and claude.ai
artifacts (honestly scoped to frontend-only, and it says so).

## Repo layout

```
SKILL.md                      orchestrator: pipeline, gates, routing, floors
references/
  interview.md                adaptive elicitation engine (ten mandatory topics)
  prd-template.md             the 20-section PRD every project gets
  design-system.md            anti-slop rules + DESIGN.md token locking
  design-directions/          editorial, brutalist, industrial-mono, clean-product
  stacks/                     html-static, react-vite, nextjs, node-express
  auth-security.md            the security floor
  legal-compliance.md         per-region legal engine
  legal-templates/            privacy, terms, cookie skeletons
  testing.md                  verification protocol, evidence ledger, ship gates
  honesty.md                  tradeoff communication protocol
  copywriting.md              human copy rules + humanizer quick-reference
  humanizer/                  bundled humanizer ruleset (vendored, MIT)
assets/checklists/            launch checklists
evals/                        starter eval prompts (benchmark suite lands in M4)
```

## What's new

This section is updated with every change to the skill. Newest first.

### 1.1 (2026-07-19)
- **Humanizer bundled.** The full humanizer ruleset (v2.5.1) is now vendored at
  `references/humanizer/`, with its README and MIT license. Leviathan no longer
  depends on any external skill; the copy pass always has the complete pattern
  catalog available.
- README rewritten: what the skill is, how to use it, and this changelog.
- `CLAUDE.md` added with repo maintenance rules, including the standing rule that
  this README (and this changelog) is updated every time anything is added or
  changed.

### 1.0 (2026-07-19) - M1 core
- Initial release: full pipeline for websites and web apps.
- SKILL.md orchestrator with seven phase gates, harness routing, context
  partitioning, floor and ban lists, and the primary-source allowlist.
- Interview engine, PRD template, anti-slop design system with four directions,
  four stack references, auth/security floor, legal engine with three templates,
  testing protocol with evidence ledger and hard ship gates, honesty protocol,
  copywriting rules.
- External standards verified against primary sources at build time: Core Web
  Vitals thresholds, OWASP Argon2id minimums, WCAG 2.2 criteria, DOJ ADA Title II
  extended deadlines, EAA scope and dates.

## Roadmap

- **M2:** admin-dashboard deep spec, full accessibility and i18n checklists,
  performance and scale references, audit scripts (a11y, perf, security, slop-scan),
  remaining design directions.
- **M3:** React Native/Expo, bots, browser and CEP extensions, Electron/Tauri, real
  3D reference, legal region expansion (LGPD, POPIA, NDPR), SBOM output.
- **M4:** fixed benchmark suite (portfolio, restaurant, marketplace, SaaS dashboard,
  mobile app, bot) with regression gating, trigger-rate optimization, packaging.
- **M5 (on demand):** enterprise mode: IaC, OpenTelemetry with SLOs, canary deploys,
  formal DR objectives, ASVS-grade verification.

## Credits and license

The bundled humanizer ruleset in `references/humanizer/` is vendored from
[blader/humanizer](https://github.com/blader/humanizer) by Siqi Chen, MIT licensed
(license preserved in that directory). Everything else in this repo is covered by the
repository [LICENSE](LICENSE).
