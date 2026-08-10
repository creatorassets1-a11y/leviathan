# AI Product Evaluation, Prompt Management & Human Oversight

Apply when AI/ML materially affects product behavior.

## Evaluation harness
Maintain a versioned representative evaluation set covering correctness, refusal/safety, tool use, retrieval isolation, hallucination, adversarial prompts, multilingual behavior, latency, and cost. Separate deterministic unit/contract tests from model-quality evaluations. Record model/provider/version, prompt/config version, dataset version, metrics, thresholds, and known limitations.

## Prompt and model lifecycle
Treat prompts, system policies, tool schemas, model selections, safety settings, and retrieval configuration as versioned production artifacts. Roll out model/prompt changes progressively and retain rollback capability. Do not silently change an authoritative behavior without review.

## Human-in-the-loop
For high-impact or irreversible outcomes define when human review is mandatory, what evidence the reviewer sees, how decisions are recorded, and how users appeal/correct outcomes. The model never grants itself permissions or overrides server authorization.

## Guardrails
Validate tool arguments server-side. Constrain tools by principal, tenant, scope, rate, budget, and action risk. Validate model outputs before side effects. Add timeouts, loop limits, token/cost budgets, provider fallbacks, and circuit breakers.

## Data and privacy
Minimize prompts/retrieval. Treat prompts, retrieved documents, outputs, traces, and embeddings containing personal data as personal data. Respect retention/deletion and provider training/retention controls.

## Evidence
- evaluation suite baseline;
- prompt/model version traceability;
- adversarial prompt-injection test;
- retrieval cross-tenant test;
- tool authorization/argument validation test;
- output-to-side-effect validation test;
- human-review workflow test where applicable;
- cost/loop budget exercise;
- provider outage/fallback test;
- privacy/deletion propagation test.

## Blockers
Block consequential AI actions when the model can directly bypass authorization, execute unvalidated tool arguments, cause unbounded spend, or materially affect users without the required human-review/appeal path.