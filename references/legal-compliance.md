# Legal and Compliance Risk Engine

Leviathan is **legal-risk-aware, not a law firm**. It can identify requirements, map product
behavior to obligations, generate implementation checklists, and flag where qualified legal
review is required. It must never claim that generated pages or tests guarantee legal compliance.

## Freshness rule

Current legal requirements must be checked at build time against authoritative government,
regulator, standards-body, or official platform sources. Record source, checked date,
jurisdiction, claim, and applicability in the evidence ledger. Do not hard-code a legal deadline
as permanently true just because it was true in an earlier release.

## Code-policy consistency

Legal text must describe actual behavior. Before generating a policy, inspect the data model,
analytics, cookies, authentication, processors, storage, retention, sharing, exports, deletion,
payments, user-generated content, and AI features. If implementation and policy disagree, fix the
implementation or flag the legal issue. Never write a policy that intentionally hides behavior.

## Baseline artifacts

Depending on the product: privacy notice, terms, cookie notice/policy, refund/returns, shipping,
acceptable-use rules, UGC notice/takedown process, accessibility statement, and contact channel.
Only include pages and claims that match the product.

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

Do not infer that a business is exempt merely because it is small or outside the jurisdiction.
Determine whether the product targets or serves users in the named market.

## Children and minors

If minors may use the product, activate `references/child-safety.md` and perform the required
age, consent, privacy, messaging, profiling, and safeguarding analysis. Legal review may be
required.

## Regulated/high-impact products

Health, finance, insurance, employment, education, housing, gambling, alcohol, weapons,
critical infrastructure, biometric identification, high-impact automated decisions, and other
regulated domains require a stronger human-review gate. Leviathan may build technical controls,
but it must clearly label unresolved legal/regulatory questions.

## Legal status labels

Use one of:

`not_assessed`
`risk_assessment_complete`
`human_review_required`
`human_review_recorded`
`blocked_pending_review`

Never use `legally_compliant` merely because templates were generated.

## Consent and privacy engineering

Where consent is legally required, non-essential processing must actually remain blocked until
valid consent. Record consent version and evidence where appropriate. Provide withdrawal paths,
data access/export/deletion mechanisms, retention rules, and processor inventories when required.

## AI products

For products that provide AI functionality, assess disclosure/transparency, automated decision,
data use, copyright/content, safety, logging, user-control, and jurisdiction-specific rules.
The model provider's terms are also part of the platform dependency review.

## Human approval

A legal-review flag is not a blocker for every project. It becomes a release blocker when the
risk tier or market analysis says qualified review is necessary and the required reviewer has not
approved the release.
