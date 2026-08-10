# Remaining Production Surfaces

This reference closes the next layer of production gaps after security, payments, privacy, legal/trust, observability, scaling, i18n, admin/support, stack selection, and handoff. It is the cross-domain index for the following canonical references:

| Surface | Canonical reference | Required when |
|---|---|---|
| Email/notifications/messaging | `references/email-notifications-messaging.md` | product sends email, push, SMS, or in-app messages |
| Onboarding/activation | `references/onboarding-and-activation.md` | product has accounts or meaningful workflows |
| Feature flags/experimentation | `references/feature-flags-and-progressive-delivery.md` | flags, experiments, staged rollout, or kill switches exist |
| Analytics/product telemetry | `references/analytics-and-product-telemetry.md` | product measures user/product behavior |
| Database migrations | `references/database-migrations-and-schema-evolution.md` | persistent schema changes exist |
| Background jobs/queues | `references/background-jobs-and-queues.md` | asynchronous work exists |
| Search | `references/search.md` | search/indexed retrieval exists |
| File/media pipeline | `references/file-media-pipeline.md` | uploads require processing/CDN/variants/scanning |
| Multi-region/residency operations | `references/multi-region-and-residency.md` | multiple regions/residency/failover is required |
| Developer experience | `references/developer-experience.md` | generated project will be maintained by humans |
| Release communication | `references/changelog-and-release-communication.md` | users/operators need material change notices |
| AI evaluation/lifecycle | `references/ai-product-evaluation.md` | product itself uses AI |
| Advanced accessibility | `references/accessibility-advanced.md` | UI has dynamic/complex/custom widgets or high accessibility risk |
| SEO/public surfaces | `references/seo-and-public-surfaces.md` | public/indexable pages exist |
| Testing strategy | `references/testing-strategy.md` | all R1+ products; depth scales with risk |

## Agent process

1. During Discover, classify each surface as `required`, `not_applicable`, or `deferred`.
2. For `required`, load the canonical reference before implementation.
3. For `not_applicable`, record a concrete reason in the PRD/evidence ledger.
4. For `deferred`, record owner, scope, risk, compensating control, and target phase; do not represent deferred work as complete.
5. Add applicable probe IDs to the verification plan and release evidence.
6. Cross-check user-facing behavior against privacy, legal, payment, accessibility, observability, and handoff artifacts.

## Cross-domain invariants

- Server-side authorization remains authoritative even when flags, analytics, search, notifications, or AI are involved.
- Personal data remains subject to minimization, consent, retention, export, deletion, and processor controls in every secondary system.
- Background work and provider callbacks are assumed retryable and duplicateable.
- Public surfaces must not expose private data or unsupported claims.
- Release and rollback decisions must remain compatible with database migrations, queues, feature flags, templates, translations, and external integrations.
- Evidence states retain Leviathan semantics: `passed` requires executed evidence; `not_run`, `unknown`, `simulated`, and `not_available` do not pass.

## Cross-domain release blockers

Unless a time-limited owner-approved exception exists:

- security/transactional messaging can duplicate consequential effects;
- feature flags grant authorization/entitlement or lack a tested safe failure mode for high-risk features;
- analytics bypasses required consent or sends prohibited data;
- a migration can corrupt data or has no recovery path;
- a worker can duplicate consequential side effects or silently lose jobs;
- search/media indexes or caches cross tenant boundaries;
- residency claims cannot be verified against actual processors/replicas/logs/backups;
- a production project cannot be set up/tested by a new human from repository documentation;
- material breaking/billing/privacy/security changes have no communication path;
- an AI model/prompt/tool change lacks applicable regression and safety evidence;
- a critical accessibility journey is unusable by keyboard/assistive technology;
- public pages leak private data or publish fabricated structured-data claims;
- critical requirements lack executable evidence appropriate to their risk tier.
