# Product Requirements Document

## 1. Product

- Product name:
- Audience:
- Primary job to be done:
- Markets/countries:
- Target languages/locales:
- Platforms:
- Risk tier:
- Owner:

## 2. Scope

### In scope

### Out of scope

## 3. Core user journeys

Document the happy path and the failure/degraded path for each critical journey.

## 4. Data and authorization

- User/tenant boundaries:
- Sensitive data:
- Roles/permissions:
- RLS/object-level authorization approach:
- Export/deletion/retention requirements:

## 4A. Privacy engineering

Complete this section for every product that processes personal data. Read `references/privacy-engineering.md` and `references/legal-compliance.md` before implementation.

### Data inventory

- Personal-data categories:
- Sensitive/regulated categories:
- Data owner/system of record:
- Collection points:
- Database/storage locations:
- Search indexes/caches/queues:
- Logs/analytics/observability destinations:
- AI/model/retrieval destinations:
- Payment/support/email/SMS processors:
- Backup/replica locations:
- Processing purpose + legal basis where required:
- Retention period/deletion trigger:
- Legal-hold/statutory-retention exceptions:
- Last inventory review:

### Minimization

- Minimum data required at signup:
- Progressive profiling fields:
- Fields rejected/discarded by APIs:
- Telemetry redaction/minimization:
- Third-party payload minimization:

### Consent and preferences

- Consent required? yes/no/assessed:
- Consent scopes/versions:
- Consent storage:
- Processing blocked before consent:
- Withdrawal behavior:
- Cookie/tracking preference enforcement:

### Data rights

- Access/export flow:
- Export format/protection/expiry:
- Correction flow:
- Deletion/erasure flow:
- Deletion propagation targets:
- Residual backup/legal-hold data:
- Account closure semantics:
- Identity verification:
- Rate limiting/audit:

### Retention and lifecycle

- Account/profile retention:
- Security/authentication retention:
- Analytics retention:
- Logs/error telemetry retention:
- Support/UGC retention:
- AI prompt/output retention:
- Payment/financial retention:
- Export/temporary-file retention:
- Backup overwrite/expiry:
- Lifecycle job/trigger:
- Legal-hold mechanism:

### Processors and transfers

- Processor/sub-processor inventory:
- DPA/contract status where applicable:
- Processing/storage regions:
- Cross-border transfer mechanism/assessment:
- Residency commitment:
- Vendor-exit deletion/return evidence:

### AI privacy

- Personal data sent to models:
- Redaction/tokenization:
- Provider retention/training behavior:
- User opt-out/control:
- AI log/conversation retention:
- Retrieval/tenant isolation:
- Deletion propagation:

### Privacy evidence

- Data inventory evidence:
- Consent-gating test:
- Export test:
- Deletion propagation test:
- Correction test:
- Retention-job test:
- Processor drift check:
- AI data-flow test:
- Residency/transfer test:
- Privileged-data-access audit:
- Privacy-policy consistency review:

Do not replace missing privacy evidence with assumptions. Record `not_run`, `not_available`, `simulated`, or `unknown` explicitly.

## 5. Money movement / billing

Complete this section for every product that accepts, moves, refunds, or grants value based on money. Read `references/payments.md` before implementation.

- Payment provider(s):
- Countries/currencies:
- One-time payments: yes/no
- Subscriptions: yes/no
- Billing model: flat / seat / tiered / usage / hybrid / other
- Trials/free plans/grandfathering:
- Customer Portal/self-service:
- Immediate vs end-of-period cancellation:
- Proration rules:
- Failed-payment/dunning policy:
- Grace period:
- Refund/partial refund policy:
- Dispute/chargeback policy:
- Tax jurisdictions and tax engine:
- Product/Price IDs and internal entitlement mapping:
- Usage/metering source and correction policy:
- Marketplace/connected accounts/payouts: yes/no
- KYC/capability requirements:
- Platform fees/reserves/negative-balance policy:
- Mobile App Store/Google Play billing decision:
- Reconciliation cadence and owner:
- Payment-event RPO/RTO:
- Live-mode enablement approval:

### Money invariants

- Provider state is authoritative.
- Client redirects never fulfill.
- Webhooks are signature-verified using the raw body.
- Provider event IDs are durably deduplicated.
- Outbound payment mutations are idempotent.
- Entitlement and ledger mutations are independently idempotent.
- Duplicate, replayed, concurrent, delayed, and out-of-order events are safe.
- Reconciliation detects and repairs unexplained drift safely.
- Prices, balances, entitlements, and usage are server-authoritative.
- Live/test credentials are strictly separated.

## 5A. Performance, capacity, and scaling

Complete this section for production-bound products or any product making material performance/scalability claims. Read `references/scale/performance-and-reliability.md` before implementation.

### Critical journey budgets

For each critical journey record:

- Journey:
- Target device class:
- Network condition:
- Cold/warm cache state:
- Representative payload/data volume:
- Expected concurrency/traffic:
- p50 target:
- p75 target:
- p95 target:
- p99 target, if tail latency matters:
- Error-rate target:
- Frontend LCP/INP/CLS targets, where applicable:
- Backend saturation/queueing constraint, where applicable:

### Capacity assumptions

- Expected steady-state traffic:
- Expected peak traffic:
- Burst profile:
- Read/write mix:
- Largest expected collection/payload:
- Expensive endpoints:
- Dependency assumptions:
- Current tested concurrency ceiling:
- Known bottlenecks:

### Architecture decisions

- Stateless application tier:
- Horizontal scaling trigger:
- CDN/edge caching:
- Application cache:
- Cache invalidation/stale-data policy:
- Queue/worker boundaries:
- Database indexes and query-plan evidence:
- Pagination strategy:
- Connection-pool sizing rationale:
- Read replica decision and replication-lag tolerance:
- Partitioning/sharding decision and measured justification:
- Multi-region decision and measured justification:
- Graceful degradation behavior:
- Timeout/retry/circuit-breaker policy:

### Measurement and evidence

- Lab performance evidence:
- Real-user/production evidence:
- Load/concurrency test evidence:
- p50/p75/p95/p99 results:
- Core Web Vitals evidence:
- Hot-query plans/index evidence:
- N+1 evidence:
- Connection-pool utilization/wait evidence:
- Queue lag/throughput evidence:
- Dependency-failure/degradation evidence:
- Cost/capacity assumptions:
- Tested limit and limitations:

Do not replace missing measurements with estimates. If the environment cannot reproduce the target workload, record the tested ceiling and limitation explicitly.

## 5B. Internationalization / localization

Complete this section when multiple locales/markets are targeted or the UI contains region-sensitive data. Read `references/i18n-and-l10n.md`.

- Source language:
- Supported language/region locales:
- Locale fallback:
- User locale preference and persistence:
- Browser/OS locale default:
- Date/time/timezone strategy:
- Number/currency/unit formatting:
- Plural/gender/message-format strategy:
- RTL required?:
- Text expansion/long-string testing:
- Translation source/catalog format:
- Translation review owner:
- Legal/support translations:
- Locale-specific URLs/SEO/hreflang:
- Regional payment/tax/address adaptations:
- Missing-translation behavior:
- i18n evidence:

Phase 0 minimum for an English-only MVP: externalize strings and use locale-aware formatting.

## 5C. Stack and architecture selection

Complete during Discover/PRD. Read `references/stack-selection.md`.

- Existing codebase/stack:
- Team/owner skills and maintenance constraints:
- Delivery/time constraints:
- Expected workload/latency:
- Compliance/data residency constraints:
- Operational model:
- Budget/cost constraints:
- Proposed stack:
- Major alternatives:
- Why the selected stack wins:
- Deployment target:
- Auth/security capability check:
- Payment capability check where applicable:
- Privacy/data lifecycle capability check:
- Observability/recovery capability check:
- Vendor lock-in/exit considerations:
- Decision record location:

Do not select a stack because it is popular or familiar to the agent. Record the rejected alternatives and rationale.

## 6. AI behavior

If the product uses AI:

- models/providers:
- data the model can access:
- tools/actions:
- tool authorization:
- cost/rate limits:
- human approval points:
- uncertainty/verification UX:

## 7. Trust, legal, and support

Complete `references/legal-compliance.md` and `references/support-surfaces.md` before release. Determine the required surface inventory during Discover, based on actual product behavior and target jurisdictions.

### Legal and trust inventory

- Terms of Service: required? status/version/last-updated:
- Privacy Policy/Notice: required? status/version/last-updated:
- Cookie/Tracking Notice: required? status/version/last-updated:
- Acceptable Use/Community Guidelines: required? status/version/last-updated:
- Refund/Cancellation Policy: required? status/version/last-updated:
- Shipping/Returns Policy: required? status/version/last-updated:
- Accessibility Statement: required? status/version/last-updated:
- UGC/Takedown process: required? status/version/last-updated:
- Security/Trust page: required? status/version/last-updated:
- Status/Incident history: required? status/version/last-updated:

### Support inventory

- Help/FAQ/Knowledge Base:
- Product Guide/Walkthrough:
- Contact/Support channel:
- Privacy/legal/accessibility request routes:
- First-run/onboarding guidance:
- Account recovery guidance:
- Billing/payment-failure guidance:

### Enforcement / moderation

If users or UGC are present:

- rules mapped to enforcement actions:
- warning / soft-limit / suspension / ban:
- server-side enforcement mechanism:
- audit trail:
- appeal/review path:
- automated moderation and human-review policy:
- notice/reason/transparency requirements by market:

### Data rights

- access/export:
- deletion:
- correction:
- consent withdrawal:
- retention/legal hold:
- identity verification:

### Legal decision record

- Target jurisdictions assessed:
- Legal status label:
- Authoritative sources checked + dates:
- Human reviewer required:
- Human review recorded:
- Known limitations:

## 7A. Admin and internal support tooling

Complete for multi-user products, products with payments/UGC/support, or any product requiring privileged operations. Read `references/admin-and-support-tooling.md`.

- Admin/support roles:
- Permission matrix:
- Admin authentication/MFA:
- Session timeout/re-authentication:
- User lookup/data minimization:
- Suspend/ban/reason/expiry:
- Support ticket workflow:
- Moderation/report/appeal workflow:
- Refund/credit/grace/plan-adjustment limits:
- Privacy export/deletion operations:
- Security event visibility:
- Impersonation required?:
- Impersonation restrictions/time limit/audit:
- Immutable/append-only audit log:
- Admin action anomaly alerts:
- Access review cadence:
- Emergency admin revocation:
- Admin evidence:

## 7B. Secondary production surfaces

Complete the applicability matrix in `references/remaining-production-surfaces.md` during Discover. For each surface record `required`, `not_applicable`, or `deferred` with a reason.

### Messaging

- Email: yes/no
- In-app notifications: yes/no
- Push: yes/no
- SMS: yes/no
- Transactional vs marketing separation:
- Delivery provider(s):
- Template/version ownership:
- Bounce/complaint/suppression handling:
- Preferences/unsubscribe/quiet hours:
- Message retention:
- Delivery/retry/DLQ evidence:

### Onboarding / activation

- First valuable outcome:
- Activation event:
- Expected time-to-value:
- Required vs optional setup:
- Progressive profiling:
- Resume/recovery behavior:
- Onboarding analytics:
- Accessibility/localization evidence:

### Feature flags / experimentation

- Flags used?:
- Flag inventory/owners/expiry:
- Safe defaults:
- Kill switches:
- Server-side authorization/entitlement separation:
- Targeting dimensions:
- Experiment hypothesis/primary metric/guardrails:
- Rollout stages and abort thresholds:
- Mixed-version/migration compatibility:

### Analytics / product telemetry

- Event taxonomy/version:
- Identity/merge model:
- Consent gate:
- Allowed properties/data classification:
- Processor:
- Retention:
- Server-authoritative business events:
- Analytics evidence:

### Database evolution

- Migration strategy:
- Expand/contract plan:
- Backfill design/resume:
- Lock/latency budget:
- Mixed-version compatibility:
- Invariant verification:
- Rollback/forward-fix:
- Restore/snapshot evidence:

### Background jobs / queues

- Job types:
- Idempotency keys/invariants:
- Retry/backoff/max attempts:
- Queue priority:
- DLQ/replay:
- Lag/depth/throughput metrics:
- Worker shutdown/restart behavior:
- Capacity limits:

### Search / media

- Search provider/index:
- Search authorization/tenant filter:
- Relevance test set:
- Index freshness/deletion:
- Upload/media processing states:
- Scan/quarantine:
- Variant/CDN delivery:
- Media retention/deletion:

### Multi-region / residency

- Regions:
- Data residency requirements:
- Actual storage/processing map:
- Routing model:
- Consistency model:
- Failover model:
- Replication lag/RPO:
- Region-specific deletion/export:

### Developer experience

- Clean quick-start:
- Local/staging bootstrap:
- Seed/demo data:
- Test/lint/build commands:
- Component playground if useful:
- Contribution workflow:
- Migration workflow:

### Release communication / public surfaces

- Changelog/release notes:
- Breaking/deprecation communication:
- SEO/indexability requirements:
- Sitemap/robots/canonical/hreflang:
- Structured data:
- Social metadata:
- Public-page performance/accessibility:

### AI lifecycle / advanced accessibility / testing

- AI evaluation set/versioning:
- Model/prompt/tool rollback:
- Human-in-loop points:
- AI cost/abuse guardrails:
- Dynamic accessibility requirements:
- Screen-reader/live-region/custom-widget evidence:
- Test pyramid/contract/visual/load/failure strategy:
- Required manual evidence:

### Secondary-surface evidence

Record all applicable probes: `MSG-*`, `ONB-*`, `FLAG-*`, `ANALYTICS-*`, `MIG-*`, `JOB-*`, `SEARCH-*`, `MEDIA-*`, `REGION-*`, `DX-*`, `REL-*`, `AI-EVAL-*`, `A11Y-*`, `SEO-*`, and `TEST-*`.

Do not convert deferred or unavailable checks into passes.

## 8. Non-functional requirements

- Security:
- Accessibility:
- Performance budgets: see §5A; no unmeasured “fast” or “scales to X users” claim
- Availability/SLO:
- RPO/RTO:
- Observability:
- Scalability:
- Privacy/data lifecycle: see §4A; no unsupported minimization, deletion, residency, or retention claim
- Localization: see §5B
- Operability/handoff: see §10
- Secondary production surfaces: see §7B; no untested material messaging, worker, migration, flag, analytics, search, media, regional, AI, accessibility, SEO, or release-communication claim

## 9. Verification plan

List exact evidence required before release. For privacy-sensitive products, include the applicable `PRIV-*` probes from `references/privacy-engineering.md`. For performance/scaling claims, include the applicable `PERF-*`, `LOAD-*`, `DB-*`, `SCALE-*`, and `RELIABILITY-*` probes from `references/scale/performance-probes.md` and `references/scale/performance-and-reliability.md`. For money-moving products include the applicable `PAY-*` probes from `references/testing.md`. For legal/trust/support surfaces, evidence must verify existence, links, reachability, implementation consistency, and required data-rights/enforcement flows. For admin tooling include the `ADMIN-*` matrix and audit/impersonation tests. For localization include the applicable `I18N-*` checks. For secondary production surfaces include the applicable `MSG-*`, `ONB-*`, `FLAG-*`, `ANALYTICS-*`, `MIG-*`, `JOB-*`, `SEARCH-*`, `MEDIA-*`, `REGION-*`, `DX-*`, `REL-*`, `AI-EVAL-*`, `A11Y-*`, `SEO-*`, and `TEST-*` probes.

## 10. Handoff, ownership, and long-term maintainability

Complete before `RELEASED`/`OPERATING` for R2+ production systems. Read `references/handoff-and-operations.md`.

- `HANDOFF.md` location:
- `RUNBOOK.md` location:
- `DECISIONS.md` location:
- Primary owner:
- Backup/escalation owner:
- Production/admin access list:
- Access-review cadence:
- Local/staging quick-start:
- Architecture/data-flow description:
- Environment differences:
- Secret/configuration locations and rotation procedures:
- CI/CD and promotion path:
- Logs/metrics/traces/errors:
- Backup/restore evidence:
- Rollback evidence:
- Test/dependency/SBOM procedure:
- Legal/support/translation update procedure:
- Data export/deletion procedure:
- Region/environment creation procedure:
- Vendor exit notes:
- Known limitations/accepted risks:
- Last handoff review:

No project may depend on the original chat as the only operational documentation.

## 11. Human approvals

Record approval for real-money capture/payout, material security/privacy/legal risk, production credentials, destructive operations, and R4 deployment as applicable.

## 12. Open decisions / exceptions

Every exception must have owner, scope, rationale, compensating controls, residual risk, creation date, and expiry date.
