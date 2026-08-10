# Legal, Trust, Compliance & User Support Surface Policy

Leviathan is **legal-risk-aware, not a law firm**. It can identify requirements, map product behavior to obligations, generate implementation checklists, and flag where qualified legal review is required. It must never claim that generated pages or tests guarantee legal compliance.

## Freshness rule

Current legal requirements must be checked at build time against authoritative government, regulator, standards-body, or official platform sources. Record source, checked date, jurisdiction, claim, and applicability in the evidence ledger. Do not hard-code a legal deadline as permanently true merely because it was true in an earlier release.

## Code-policy consistency

Legal and trust text must describe actual behavior. Before generating policies, inspect the data model, analytics, cookies, authentication, processors, storage, retention, sharing, exports, deletion, payments, user-generated content, moderation, support tooling, and AI features. If implementation and policy disagree, fix the implementation or flag the legal issue. Never write aspirational or intentionally incomplete policy text.

## Mandatory user-facing surface inventory

For any product with users, accounts, personal data, payments, or user-generated content, determine the required surface inventory during Discover/PRD and record it in `PRD.md` or `DECISIONS.md`.

| Surface | Required when | Minimum content |
|---|---|---|
| Terms of Service | users/accounts | accounts, acceptable use, payments, IP, termination, liability, governing law, changes |
| Privacy Policy/Notice | personal data | data categories, purposes, sharing/processors, retention, rights, transfers, contact |
| Cookie/Tracking Notice | non-essential tracking/cookies | technologies, purposes, controls, preference center where required |
| Acceptable Use/Community Guidelines | user accounts or UGC | prohibited behavior/content, enforcement, appeals |
| Refund/Cancellation Policy | payments/subscriptions | cancellation timing, refunds, exceptions, processing expectations |
| Shipping/Returns | physical goods | delivery, returns, damaged/lost goods, exclusions |
| Accessibility Statement | public-facing product | target, known limitations, feedback/contact |
| Contact/Support | all user-facing products | real support path, scope, response expectations |
| Help/FAQ/Knowledge Base | non-trivial products | product-specific questions and troubleshooting |
| Product Guide/Walkthrough | non-trivial products | core tasks, first-run guidance, edge cases |
| UGC/Takedown process | UGC/content platforms | reporting, notice/action, appeals where applicable |
| Security/Trust page | risk warrants | security practices, responsible disclosure/contact |
| Status/Incident history | production services where useful | service status, incident communication/history |

Only include claims and pages that match the actual product and applicable markets. Do not generate fake certifications, compliance badges, testimonials, legal counsel claims, trust logos, or guarantees.

## Readability and versioning

Every user-facing legal page must:

- show a clear **Last updated** date;
- have a stable version identifier for material changes;
- begin with a short plain-language summary before the formal text;
- use descriptive headings, short paragraphs, lists, tables where useful, and defined terms consistently;
- explain concrete user consequences instead of hiding important terms in dense boilerplate;
- be linked from an appropriate footer or legal hub and from signup, checkout, account, or settings flows when relevant;
- preserve an accessible archive/history when material changes require notice;
- identify a real contact/request path for privacy, legal, or accessibility issues where applicable.

Plain-language summaries are navigation aids, not substitutes for the formal policy. They must not contradict it.

## Support surfaces

Help, FAQ, guides, and contact support are product deliverables, not generic marketing copy.

### Help / FAQ / Knowledge Base

Create a searchable, categorized help surface using questions derived from the actual product. At minimum cover onboarding, major features, account recovery, billing/cancellation when applicable, privacy/data controls, common errors, permissions, and troubleshooting. Include links to the relevant legal or settings controls.

Do not invent questions, limits, pricing, response times, or support promises that the product does not actually provide.

### Product Guide / Walkthrough

For non-trivial products, provide an end-user guide covering the first useful task, major workflows, common edge cases, and recovery paths. Link it from first-run experiences, meaningful empty states, and Help. Keep instructions synchronized with the actual UI and feature names.

### Contact / Support

Provide a reachable support mechanism appropriate to the product. Separate privacy/legal/accessibility requests when necessary. If tickets are used, preserve a request identifier and status/history. Do not expose internal notes or sensitive data through public support surfaces.

## Data-subject and account controls

Where applicable, provide and verify:

- access/data export requests;
- deletion requests and cascading/deletion semantics;
- correction/update mechanisms;
- consent withdrawal;
- marketing preference controls;
- account closure;
- retention and legal-hold exceptions;
- identity verification appropriate to prevent unauthorized requests.

Do not promise a right or deadline that has not been assessed for the target jurisdiction. Record unavailable controls as explicit limitations rather than silently omitting them.

## Automated enforcement and moderation

When accounts or UGC exist, map Terms/AUP rules to a server-side enforcement model. At minimum support, where appropriate:

`warning -> soft limit/reduced capability -> temporary suspension -> permanent ban`

Enforcement must:

- execute server-side;
- be attributable to a rule, signal, report, or authorized operator action;
- create an immutable or tamper-resistant audit record;
- record actor/system, target, timestamp, rule/reason, action, duration, and relevant evidence reference;
- support expiry of temporary actions;
- provide an appeal/review path where appropriate;
- prevent ordinary users from erasing enforcement history;
- avoid relying solely on opaque client flags;
- include protections against abusive or coordinated reporting where relevant.

For content platforms, assess notice-and-action, statement-of-reasons, reporting, appeals, trusted-flagger, transparency, and abuse-of-reporting requirements where applicable to the target markets. Do not assume a specific regulatory regime applies without assessment.

If automated AI moderation is used, document the decision authority, confidence/uncertainty handling, human review path for consequential actions, false-positive recovery, and auditability.

## Process gate

Before generating legal or trust surfaces:

1. Identify target markets and user age scope.
2. Inspect actual data flows, processors, analytics, cookies, storage, retention, payments, UGC, moderation, AI, and support behavior.
3. Determine the required page/surface inventory.
4. Generate product-specific formal text plus plain-language summaries.
5. Link and implement the surfaces in the product.
6. Implement or explicitly scope data access/export/deletion and enforcement flows.
7. Check claims against the implementation.
8. Record legal status and required human review.
9. Capture evidence and limitations.

## Regional analysis

For each target market determine:

- privacy/data protection requirements;
- consent and cookie requirements;
- consumer protection;
- accessibility obligations;
- marketing/communications rules;
- age/child protections;
- sector-specific regulation;
- data-transfer/storage requirements;
- breach/incident obligations;
- platform/store/payment-provider requirements.

Do not infer exemption merely because a business is small or outside the jurisdiction. Determine whether the product targets or serves users in the named market.

## Children and minors

If minors may use the product, activate `references/child-safety.md` and perform the required age, consent, privacy, messaging, profiling, and safeguarding analysis. Legal review may be required.

## Regulated/high-impact products

Health, finance, insurance, employment, education, housing, gambling, alcohol, weapons, critical infrastructure, biometric identification, high-impact automated decisions, and other regulated domains require stronger human-review gates. Leviathan may build technical controls, but it must clearly label unresolved legal/regulatory questions.

## Legal status labels

Use one of:

`not_assessed`
`risk_assessment_complete`
`human_review_required`
`human_review_recorded`
`blocked_pending_review`

Never use `legally_compliant` merely because templates were generated.

## Consent and privacy engineering

Where consent is legally required, non-essential processing must actually remain blocked until valid consent. Record consent version and evidence where appropriate. Provide withdrawal paths, data access/export/deletion mechanisms, retention rules, and processor inventories when required.

## AI products

For products that provide AI functionality, assess disclosure/transparency, automated decision, data use, copyright/content, safety, logging, user-control, and jurisdiction-specific rules. The model provider's terms are also part of the platform dependency review.

## Evidence and release gates

For R2+ products with users or data, evidence must establish as applicable:

- required Terms, Privacy, and tracking notices exist and match implementation;
- Contact/support path is reachable;
- Help/FAQ covers real product questions;
- core product guide exists for non-trivial products;
- data export/deletion behavior is verified or explicitly marked unavailable/limited;
- enforcement/moderation controls exist for UGC or multi-user products;
- legal status is recorded;
- required human review is recorded before release.

For higher-risk products, missing required surfaces, materially inaccurate policy text, unreachable legal/support contact, or unresolved required human review are release blockers. A host that cannot verify a requirement must report `not_available`, not `passed`.

## Human approval

A legal-review flag is not a blocker for every project. It becomes a release blocker when the risk tier or market analysis says qualified review is necessary and the required reviewer has not approved the release.
