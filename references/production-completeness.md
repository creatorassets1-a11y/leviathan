# Production Completeness Matrix

This matrix converts common AI-generated product failure modes into mandatory design decisions, evidence, and release gates. It supplements stack-specific references; it does not replace them.

| Domain | Required decision/artifact | Required evidence | Typical gate |
|---|---|---|---|
| UI states | `DESIGN.md` state matrix | representative journeys/screenshots/tests | R1+ |
| Onboarding | first-value path + recovery plan | fresh-account journey + `ONB-*` | R1+ |
| Accessibility | accessibility matrix | automated + representative manual assistive-tech evidence | R1+ |
| Advanced accessibility | dynamic widget/focus/live-region plan | `A11Y-*` battery | R2+ when complex |
| i18n | locale support decision | long-string/locale/RTL evidence where applicable | R1+ |
| Authz | authorization matrix | positive + negative cross-user/tenant/admin tests | R2+ |
| Sessions | lifecycle policy | expiry/rotation/revocation/reuse tests | R2+ |
| Rate limits | endpoint abuse matrix | actual limit exercise | R2+ |
| XSS | sink/input matrix | payload battery + CSP/header evidence | R2+ |
| Database | integrity/invariant map | constraints + concurrency + migration evidence | R2+ |
| Migrations | expand/contract + backfill plan | `MIG-*` rehearsal/load/recovery evidence | R2+ when applicable |
| Uploads | upload threat model | invalid/malicious/oversize/private-access tests | R2+ when applicable |
| Media pipeline | processing/scanning/variant lifecycle | `MEDIA-*` | R2+ when applicable |
| API | contract/error/authz decision | contract + negative response tests | R2+ |
| Payments | money lifecycle + provider event map | signature, idempotency, replay, reconciliation and failure tests | R3 |
| Multi-tenancy | tenant boundary model | cross-tenant denial tests | R2+ |
| Admin/support | privileged-operation matrix | step-up/audit/impersonation tests | R2+ |
| Feature flags | flag inventory + rollout/kill plan | `FLAG-*` safety and rollout evidence | R2+ when applicable |
| Analytics | event taxonomy + privacy/consent decision | `ANALYTICS-*` | R2+ when applicable |
| Messaging | channel/template/delivery matrix | `MSG-*` delivery, consent, abuse, webhook tests | R2+ when applicable |
| Background jobs | job contract + retry/DLQ plan | `JOB-*` idempotency/failure/lag evidence | R2+ when applicable |
| Search | source/index/authorization/relevance model | `SEARCH-*` isolation/freshness/performance evidence | R2+ when applicable |
| AI | model/tool/data boundary map | injection, leakage, tool-authz, cost, evaluation and human-confirmation tests | R2+ when applicable |
| AI lifecycle | eval set + model/prompt/version policy | `AI-EVAL-*` regression/cost/rollback evidence | R2+ when applicable |
| Performance | budgets + bottleneck hypothesis | realistic device/network/load evidence | R1+; stricter by risk |
| Observability | SLI/SLO + runbook map | logs/metrics/traces/alerts + redaction evidence | R2+ |
| Reliability | dependency failure matrix | timeout/retry/circuit/DLQ/replay evidence | R2+ |
| Deployment | environment + rollback plan | staging/prod separation + build identity + rollback evidence | R2+ |
| Recovery | RPO/RTO decision | restore test + documented runbook | R2+; R3 for critical data |
| Multi-region | region/residency/failover model | `REGION-*` routing, failover, consistency, deletion evidence | R3 when applicable |
| Trust | policy/support surface matrix | generated pages and behavior consistency | R1+; expanded for R2/R3 |
| Release communication | release/deprecation communication plan | `REL-*` accuracy/impact/consistency evidence | R2+ for material releases |
| Public SEO | indexability/metadata/locale decision | `SEO-*` crawl, metadata, privacy, performance evidence | R1+ when applicable |
| Developer experience | setup/contribution/seed contract | `DX-*` clean-setup and reproducibility evidence | R2+; mandatory at handoff |
| Testing | risk-tier test map | `TEST-*` traceability + manual/automated evidence | R1+ |
| Content | claims/proof register | no fabricated claims + pricing/cancellation review | R1+ |

## Gate semantics

- A requirement marked `not_applicable` MUST include a reason.
- `not_run`, `unknown`, `simulated`, and `not_available` are never passes.
- Evidence must identify the exact artifact/check and environment.
- Human review requirements cannot be silently converted into agent claims.
- A failed prerequisite blocks dependent gates.
- A control may be satisfied by an equivalent mechanism, but the equivalence must be documented.

## Required state coverage

For each major user journey, the test/design matrix must consider:

1. initial load
2. loading/streaming
3. success
4. empty
5. invalid input
6. unauthorized
7. forbidden
8. expired session
9. rate limited
10. offline/reconnect
11. timeout
12. dependency failure
13. partial success/degraded mode
14. duplicate submission
15. concurrent update/conflict
16. retry exhausted
17. recovery/support escalation
18. notification delivery failure where messaging is involved
19. feature-flag service unavailable where flags are involved
20. stale search/index/media state where indexed or processed content is involved

Not every state applies to every journey, but each exclusion must be explicit.

## Required concurrency questions

For state-changing resources, answer before release:
- Can two requests update this object simultaneously?
- Can the same request be retried?
- Can a provider deliver the same event twice?
- Can events arrive out of order?
- Can a worker execute the same job twice?
- Can an indexer/media processor run after deletion?
- Which invariant must never be violated?
- Which database constraint/transaction/lock enforces it?
- What does the user see during conflict or partial failure?

## Required failure-injection questions

For every critical external dependency:
- What happens on timeout?
- What happens on 429?
- What happens on 5xx?
- What happens when the provider returns malformed data?
- What happens after a process restart between side effects?
- Can work be retried safely?
- Where does permanently failed work go?
- Can an operator replay it safely?
- What happens if the feature-flag/analytics/search/media provider is unavailable?

## Required human-review questions

Escalate when applicable:
- material legal/jurisdictional uncertainty
- high-impact automated decisions
- child/minor safety
- financial reconciliation exceptions
- destructive production changes
- unresolved high/critical security findings
- accessibility barriers with no equivalent path
- high-impact AI model/prompt changes without reliable automated evaluation

The agent must report the unresolved decision and evidence rather than manufacturing certainty.

## Secondary production-surface blockers

Unless an explicit, time-limited, owner-approved exception with compensating controls exists, block `RELEASE_APPROVED` when an applicable surface:

- can cause duplicate consequential side effects;
- bypasses server-side authorization or tenant isolation;
- violates consent, privacy, retention, or processor commitments;
- can silently lose work or grow without bounded cost/resource controls;
- lacks a safe failure/recovery path;
- has required evidence only in code inspection rather than an executable probe;
- creates an operational dependency that no human operator can diagnose or recover.
