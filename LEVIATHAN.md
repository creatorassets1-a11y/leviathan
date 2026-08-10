# LEVIATHAN Universal Specification

Version: 2.0.0
Policy version: 2
Artifact schema version: 1

This document is the canonical, host-neutral specification. Agent-specific files must point here instead of creating competing rules. If an agent has a stronger native mechanism, use it, but the behavior defined here remains authoritative.

## Mission

Turn an idea or existing repository into software that is planned, secure, accessible, maintainable, observable, tested, evidence-backed, and owned by the user. Leviathan is not bound to a model, vendor, framework, or cloud provider.

## Capability negotiation

Before work starts, determine what the host can actually do: instruction files, shell/terminal, file edits, web/research, browser, subagents, CI access, secrets manager, deployment, and database tools. Never claim a capability that the current host does not expose. If a capability is unavailable, mark the corresponding verification as `not_available` rather than simulating success.

## Risk tiers

`R0` documentation/copy only.
`R1` static UI or isolated local change.
`R2` application logic or data read/write.
`R3` authentication, payments, personal data, external integrations, or production deployment.
`R4` safety-critical, regulated, destructive, financial, or high-impact automation.

Higher risk means deeper discovery, threat modeling, independent review, stronger evidence, and more human approval. Do not apply R4 ceremony to an R0 task merely for theater.

## State machine

```text
CLASSIFY -> DISCOVERED -> RESEARCHED -> PRD_PENDING -> PRD_APPROVED
-> DESIGN_APPROVED -> BUILDING -> REVIEWED -> VERIFIED
-> RELEASE_APPROVED -> RELEASED -> OPERATING
```

An emergency fix may enter `BUILDING` only after recording `emergency=true`, reason, scope, and deferred discovery. It must still reach `VERIFIED` before release unless the user explicitly accepts an emergency production action. Preserve that exception in the release record.

## Evidence contract

Every check has a stable ID, category, severity, exact command/tool action, timestamp, environment, exit/result status, captured output or artifact path, tool/version where relevant, reviewer/actor, and limitations. A final claim may reference only evidence whose status is `passed` or a valid accepted exception. `not_run`, `not_available`, `simulated`, and `unknown` are never passes.

## Approval boundaries

Human confirmation is required before destructive database/storage operations, deleting production data, changing production credentials or domains, capturing or sending real money, publishing when authority was not delegated, accepting material security/privacy/legal risk, disabling security controls, or deploying an R4 system.

## Threat model

For R2+ systems identify assets, actors, trust boundaries, entry points, threats, impact, likelihood, controls, residual risk, and verification. Map to STRIDE and OWASP guidance when appropriate. Do not claim a threat model exists just because a paragraph called "threat model" was generated.

## Security baseline

Use maintained primitives. Prefer phishing-resistant passkeys/WebAuthn and secure server-side sessions where appropriate. Passwords use an established password hashing scheme tuned for the deployment. Every resource access requires authorization, not only authentication. Validate inputs at trust boundaries. Protect secrets. Rate-limit abuse-sensitive endpoints. Log security events without leaking secrets. Scan dependencies and repository history for secrets. Test backup restore for systems that persist important data.

## Accessibility baseline

Build accessibility during implementation. Use semantic structure, labels, keyboard access, visible focus, accessible names, sufficient contrast, reduced-motion behavior, zoom/reflow, screen-reader checks, and platform-appropriate touch targets. Automated scanning is supplementary, never proof of full accessibility.

## Performance baseline

Define budgets from the audience and product. Measure representative flows under realistic network/device conditions. Prefer repeated measurements and percentile reporting over one lucky run. Record lab and production/real-user evidence separately.

## Supply-chain baseline

Lock dependencies, review new packages, inspect install scripts when relevant, scan direct and transitive dependencies, generate an SBOM where tooling supports it, record licenses, and watch for typosquatting, malicious packages, abandoned packages, and unexpected provenance. Never copy fetched code into a project without understanding it.

## Operations baseline

Production backends need structured logs, error reporting, health checks, useful metrics, alerts, rollback instructions, backup/restore instructions, and an incident path. Define RPO and RTO for systems where data loss or downtime matters. Observability must not collect more personal data than necessary.

## Design and copy

Avoid generic AI output through deliberate product-specific choices. Do not replace one set of AI defaults with a fixed Leviathan aesthetic. Humanization is an editing aid, not a guarantee that text is human-authored or universally appropriate. Preserve the product's real voice.

## Cost and delegation

Before expensive multi-agent work, estimate a budget for time, tokens/tool calls, research, and human review. Parallelize independent work only after interfaces and contracts are stable. Stop runaway loops. Two failed remediation attempts for one finding class should escalate.

## Release decision

Release is a computed decision from the state and evidence. It must list passed gates, accepted exceptions, known limitations, untested areas, human approvals, rollback path, and build provenance identifiers. No green status is allowed to be inferred from missing evidence.
