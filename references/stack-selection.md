# Stack, Language, and Framework Selection

Vibecode Max remains technology-agnostic. The agent must choose technology from product requirements, team constraints, operational reality, and measured needs rather than popularity or model familiarity.

## 1. Decision principles

- Prefer mature, well-supported technology for core security, payments, data, and deployment paths.
- Optimize for the actual bottleneck: delivery speed, maintainability, performance, compliance, hiring, cost, or operations.
- Prefer a coherent modular monolith before microservices when requirements do not justify distribution.
- Bias toward an existing repository's current stack unless migration has a compelling, documented reason.
- Record the decision, major rejected alternatives, and rationale in `DECISIONS.md` or the project's equivalent.
- Re-evaluate when material requirements change, not because a new framework becomes fashionable.

## 2. Required decision inputs

During Discover/PRD capture:

| Factor | Questions |
|---|---|
| Product | SaaS, marketplace, content, real-time, mobile, AI-heavy, data pipeline, internal, regulated? |
| Team | What can the owner/team actually maintain? What hiring constraints exist? |
| Time | What is the time-to-first-value and delivery window? |
| Scale | Expected traffic, concurrency, latency, data volume, geographic distribution? |
| Operations | Managed services or self-hosted? Who responds to incidents? |
| Compliance | Residency, audit, contractual, privacy, sector requirements? |
| Ecosystem | Auth, payments, AI, search, email, storage, observability maturity? |
| Longevity | Can the team maintain the stack for several years? |
| Cost | Hosting, bandwidth, database, AI, vendor, and engineering cost? |
| Existing code | Can the current system be safely extended instead of replaced? |

## 3. Recommendation process

1. Identify hard constraints.
2. Propose one or two viable stacks.
3. Explain trade-offs and operational consequences.
4. Select one stack and record why it wins.
5. Record the main rejected alternative(s).
6. Confirm the stack supports required authz/RLS, payments, privacy, observability, testing, and deployment controls.
7. Identify the deployment target and operator model early.

A recommendation that ignores the owner's ability to run or maintain the stack is a failed recommendation.

## 4. Common patterns, not mandates

**Full-stack web product:** TypeScript with Next.js/Remix/SvelteKit plus PostgreSQL is often productive, but Rails, Laravel, Django, Phoenix, Go, or another mature option may be better for the team.

**Content/marketing:** Astro, Next.js, or another CDN-friendly static/SSR architecture is often appropriate.

**High-concurrency/low-latency backend:** Go, Rust, Java/Kotlin, or another mature runtime may fit when measured latency, concurrency, or resource efficiency dominates.

**AI-heavy:** Python is strong for model/ML workflows. A separate TypeScript, Go, Java, or other application layer can be appropriate when boundaries improve maintainability.

**Mobile:** React Native/Expo or Flutter can reduce duplicated work; native iOS/Android is appropriate when platform-specific capabilities or performance justify it.

**Internal/admin tools:** a managed internal-tool platform or lightweight application may be preferable to a large custom stack.

**Simple CRUD/MVP:** Rails, Laravel, Django, Phoenix, or a similarly coherent framework can minimize moving parts.

These are starting points, not defaults that override project constraints.

## 5. Anti-patterns

Treat as findings unless justified:

- selecting the same stack for every project;
- choosing technology the owner cannot operate;
- microservices/Kubernetes/service meshes before measured need;
- bleeding-edge core auth/payment/database libraries without strong reason;
- mixing many languages without clear ownership/boundaries;
- ignoring deployment, backup, observability, and security capabilities;
- replacing an existing stable stack without a measurable benefit;
- choosing infrastructure from anticipated scale without workload evidence.

## 6. Evidence

Before build approval, record:

- selected stack and versions/major lines;
- deployment target;
- team/owner constraints;
- expected workload;
- major alternatives considered;
- reason for the final choice;
- auth/security capability check;
- payment capability check where applicable;
- privacy/data lifecycle capability check;
- observability/recovery capability check;
- known vendor lock-in and exit considerations.

Recommended IDs: `STACK-001` constraints captured, `STACK-002` alternatives compared, `STACK-003` security/payment/privacy capability check, `STACK-004` deployment/operations check.
