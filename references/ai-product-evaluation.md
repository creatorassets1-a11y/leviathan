# AI Product Evaluation & Lifecycle

Apply when the product itself uses generative or predictive AI. This extends the existing AI security/safety contract into repeatable quality, cost, and lifecycle management.

## Evaluation harness

Define representative, adversarial, and regression datasets with expected properties rather than assuming a single exact answer. Track task success, factuality/grounding where relevant, refusal/safety behavior, tool correctness, latency, cost, and user-reported quality.

Version evaluation sets, prompts, tools, retrieval configuration, model/provider, and scoring logic. A model change is a production change and must have before/after evidence.

## Prompt and model management

Prompts/system instructions are versioned artifacts. Never store secrets or authoritative permissions in prompts. Model output cannot grant itself access. Tool permissions are enforced outside model text.

Record model/provider/version, configuration, prompt version, tool set, retrieval source/version, and relevant policy version for reproducibility while minimizing sensitive prompt/output retention.

## Human-in-the-loop

For high-impact, irreversible, financial, legal, security, or external-communication actions, define when human confirmation is mandatory. The confirmation must occur outside the model's own output and must display enough context for an informed decision.

Provide edit/reject/regenerate/undo where useful. Clearly distinguish generated suggestions from completed actions.

## Cost and abuse

Define per-user/tenant token and spend budgets, request limits, tool-call limits, concurrency limits, and maximum execution depth. Cache repeated safe operations where appropriate. Protect retrieval and tool loops from unbounded recursion.

## Data and privacy

Prompts, retrieved documents, tool arguments, and outputs may contain personal or confidential data. Minimize, redact, isolate by tenant, apply retention, and document provider training/retention behavior. AI logs must never become an unrestricted shadow database.

## Evidence: AI-EVAL-* probes

- **AI-EVAL-001 regression:** run the versioned evaluation set before/after a model/prompt change and record deltas.
- **AI-EVAL-002 injection:** use direct and indirect prompt-injection fixtures and prove tool authorization remains independent.
- **AI-EVAL-003 retrieval isolation:** attempt cross-tenant/cross-user retrieval leakage.
- **AI-EVAL-004 tool safety:** submit malformed/unsafe arguments and verify schema validation and authorization.
- **AI-EVAL-005 human approval:** exercise a consequential action and verify an external approval gate is required.
- **AI-EVAL-006 cost guardrail:** exceed token/spend/tool limits and verify bounded behavior.
- **AI-EVAL-007 provider failure:** simulate timeout, malformed response, and unavailable model; verify safe fallback.
- **AI-EVAL-008 telemetry:** verify model/version/token/latency/cost observability without prohibited raw data.
- **AI-EVAL-009 rollback:** revert model/prompt/configuration to a known-good version and verify behavior.
- **AI-EVAL-010 data lifecycle:** verify prompt/output/retrieval deletion and retention behavior.

## Release blockers

Block when an AI output can grant itself authorization, trigger an irreversible consequential action without the required approval, leak another tenant's data, run unbounded costly operations, or ship a material model/prompt change without regression evidence.
