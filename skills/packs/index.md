# Leviathan Native Capability Packs

These packs are intentionally provider-neutral. They capture stable engineering behavior that can be applied regardless of which external skills are selected.

| Pack | When to activate | Core checks |
| --- | --- | --- |
| `agent-workflow` | Any non-trivial agent task | plan, scope, delegation, checkpoints, stop conditions |
| `architecture` | Existing repo or multi-module system | boundaries, dependencies, maintainability, migration plan |
| `frontend` | Web UI | semantic HTML, responsive behavior, state, loading/error/empty states |
| `design-ui` | User-facing product | product-specific visual system, interaction quality, accessibility |
| `framework` | Framework-specific work | official docs/version compatibility, idioms, upgrade risks |
| `browser-qa` | Browser-visible behavior | real user journeys, console/network errors, screenshots/traces |
| `tdd-verification` | Logic/API changes | failing test first where useful, regression tests, evidence |
| `database` | Persistent data | schema, migrations, constraints, indexes, authorization, rollback |
| `security` | Any R2+ system | authn/authz, secrets, injection, dependencies, abuse controls |
| `ai-engineering` | AI features/agents | prompt injection, tool permissions, leakage, evals, cost limits |
| `observability` | Production systems | logs, errors, metrics, health, alerts, SLOs |
| `cloud-deploy` | Deployment/infrastructure | least privilege, reproducibility, rollback, cost, DR |
| `docs-research` | Unknown technology/domain | primary sources, citations, decision records |
| `mobile-native` | iOS/Android/Expo/React Native | device behavior, permissions, offline/error states, store constraints |
| `growth-content` | Public marketing/content | truthful claims, SEO, structured data, analytics/privacy |

External skills are mapped into these packs during selection. The pack is the stable contract; a third-party skill is an optional implementation aid.

## Current ecosystem examples

The skills.sh directory currently highlights high-adoption skills such as `find-skills`, `frontend-design`, `agent-browser`, `vercel-react-best-practices`, `improve-codebase-architecture`, `tdd`, `web-design-guidelines`, and `grill-me`. It also exposes official skills from technology makers such as Anthropic, OpenAI, Vercel, Microsoft, Google, Supabase, Cloudflare, Expo, React, Firebase, Stripe, Sentry, and others.

Leviathan does not hard-code these as mandatory dependencies. The catalog sync/selector discovers the current ecosystem so the system can adapt as skills are added, renamed, superseded, or removed.
