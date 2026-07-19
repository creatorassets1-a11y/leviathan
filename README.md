# Leviathan

A Claude skill that turns "I want to build X" into a shipped, production-ready
product. Websites, web apps, and (in later milestones) mobile apps, bots, extensions,
and desktop tools. Successor to Behemoth.

What it enforces, on every build:

- **PRD before code.** An interview, market research, and a written PRD the user
  approves. No code exists before approval - the gate is absolute.
- **No AI slop.** A locked design system (`DESIGN.md`) replaces every default that
  marks a product as AI-made: no purple gradients, no Inter-only, no hero + three
  feature cards, no colored left borders, no fake testimonials, ever.
- **Secure by default.** Argon2id, passkeys, object-level authorization checks, rate
  limits, security headers, secrets discipline, supply-chain vetting. The floor is
  never skippable.
- **Legally covered.** Privacy, terms, and cookie pages that match the actual
  codebase, per-region logic (GDPR, EAA, CCPA and siblings), consent that actually
  blocks scripts, lawyer-review flags for regulated sectors.
- **Verified, not vibed.** Nothing is called working until it has been exercised;
  every claim in the final report links to evidence. Ship gates on security,
  accessibility (WCAG 2.2 AA), anti-slop, and performance (stricter than Core Web
  Vitals, on the audience's real device profile).
- **Owned by the user.** Runbook, decisions log, dependency ledger, exit strategy,
  and a launch checklist at handoff.

## Install

Clone into your skills directory, or:

```
npx skills add creatorassets1-a11y/leviathan
```

Leviathan invokes the [humanizer](https://github.com/blader/humanizer) skill at every
copy-generation point; install it too for best results (a fallback ruleset is bundled).

## Layout

```
SKILL.md                      orchestrator: pipeline, gates, routing
references/                   loaded per phase/task (progressive disclosure)
  interview.md                adaptive elicitation engine
  prd-template.md             the PRD every project gets
  design-system.md            anti-slop rules + token generation
  design-directions/          editorial, brutalist, industrial-mono, clean-product
  stacks/                     html-static, react-vite, nextjs, node-express
  auth-security.md            the security floor
  legal-compliance.md         per-region legal engine
  legal-templates/            privacy, terms, cookie skeletons
  testing.md                  verification protocol, evidence ledger, ship gates
  honesty.md                  tradeoff communication protocol
  copywriting.md              human copy rules + humanizer fallback
assets/checklists/            launch checklists
evals/                        starter eval prompts (benchmark suite lands in M4)
```

Current release: **M1** (full pipeline for websites and web apps). Roadmap M2–M5:
admin-dashboard deep spec, i18n and accessibility full checklists, audit scripts,
mobile/bots/extensions/3D references, eval benchmark suite, optional enterprise mode.
