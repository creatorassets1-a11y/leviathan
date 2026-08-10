# Generated-Project Developer Experience

Leviathan must optimize not only the runtime product but also the human experience of inheriting and changing the generated repository.

## Local setup

Provide a short, deterministic quick-start: prerequisites, environment bootstrap, dependency install, local database/services, seed data, test account, development command, test/lint/build commands, and expected output. Never require secrets committed to the repository.

Use safe local defaults and clearly distinguish local, staging, and production configuration. Provide `.env.example` or equivalent without secret values and validate required configuration at startup with actionable errors.

## Repository ergonomics

Keep a predictable structure. Document major modules and boundaries. Avoid generated-code sprawl and unexplained abstractions. Include ownership/comments where a non-obvious invariant matters.

For component-heavy UIs, provide Storybook or an equivalent component playground when it materially improves contribution speed. Include representative states: loading, empty, error, disabled, long text, permission denied, and responsive variants.

## Seed/demo data

Provide deterministic, synthetic seed data that exercises important states without personal or production data. Seeds must be idempotent and safe to reset locally. Never include real credentials, API keys, or customer data.

## Contribution workflow

Document branch/PR expectations, formatting/linting, test strategy, migration workflow, feature-flag cleanup, dependency updates, release process, and decision-record expectations. New developers should be able to make a small change without asking the original agent how the repository works.

## Evidence: DX-* probes

- **DX-001 fresh setup:** start from a clean environment and complete local setup using only repository documentation.
- **DX-002 test command:** run the documented test/lint/build commands and verify they match CI expectations.
- **DX-003 seed:** reset and seed a local environment twice; verify deterministic, idempotent behavior.
- **DX-004 docs accuracy:** follow a representative contribution path and record discrepancies.
- **DX-005 component states:** where a component playground exists, verify key states are represented.
- **DX-006 secret hygiene:** verify setup docs and example files contain no real credentials.
- **DX-007 migration workflow:** create/apply/revert or forward-fix a representative migration locally.

## Release blockers

Block production handoff when a clean human operator cannot set up, test, or understand the project using repository documentation, or when demo/seed assets contain real secrets or personal data.
