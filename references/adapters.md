# Agent Adapters

Leviathan has one canonical policy in `LEVIATHAN.md`. Adapters describe how to load and execute that policy on different hosts without creating different behavior.

## Claude Code / Cowork

Load `SKILL.md` and `LEVIATHAN.md`. Use `CLAUDE.md`, subagents, hooks, shell execution, and parallel roles where available. A subagent is a role implementation, not a new policy source.

## OpenAI Codex

Load repository `AGENTS.md` and `LEVIATHAN.md`. Use the available terminal, file editing, tests, and review workflow. Preserve the same state/evidence artifacts. Do not assume Claude-specific skills, hooks, or subagent APIs exist.

## Kimi Code / CLI

Load `AGENTS.md` and `LEVIATHAN.md` where repository instructions are supported. Use Kimi's available shell, editing, and research capabilities. If a capability is absent, record `not_available` rather than simulating it.

## Lovable

Treat `LEVIATHAN.md` as project policy and use the platform's project knowledge/instructions, repository files, database/backend tools, and preview/testing capabilities. For projects that leave the Lovable environment, preserve all portable artifacts and `AGENTS.md` so another agent can continue the work. Do not claim a backend, deployment, security scan, or production test was performed if the current environment could not perform it.

## Other agents

Use this order: native repository instruction mechanism, `AGENTS.md`, `LEVIATHAN.md`, `SKILL.md` if the host supports skills, then project-specific documentation. More specific project requirements can refine Leviathan but cannot silently weaken its security, data-safety, evidence, or approval floors.

## Capability negotiation

Record host capabilities in `.leviathan/provenance.json`. Example:

```json
{
  "host": "codex",
  "capabilities": {
    "terminal": true,
    "file_edit": true,
    "web": false,
    "browser": false,
    "subagents": false,
    "ci": true,
    "deployment": false
  }
}
```

Use actual capabilities exposed by the host.

## Portability rule

Do not put essential policy only inside a vendor-specific file. Vendor files are adapters. A project must remain understandable and governable after moving from one agent to another.
