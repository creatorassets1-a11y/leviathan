# Developer Experience & Project Maintainability

A generated repository must be understandable and runnable without the original agent conversation.

## Minimum
- One documented setup path with prerequisites and supported versions.
- `.env.example` or equivalent containing names/descriptions, never real secrets.
- Deterministic install/build/test/lint/typecheck commands.
- Safe local seed/demo data that contains no real PII or credentials.
- Clear directory/module ownership and architecture overview.
- Component/story documentation where a UI system is non-trivial.
- Useful error messages and troubleshooting guidance.
- CI checks that match the documented local commands.
- Dependency/update policy, lockfile, SBOM path where applicable, and migration instructions.
- How to add a feature, test it, update translations/legal/support content, and change configuration.

## New-developer test
A person without chat history should be able to clone the repository, configure safe local settings, run the app, run tests, understand the architecture, and make a small change using only repository documentation.

## Evidence
- clean-environment quick-start execution;
- seed/reset execution;
- test/lint/build commands executed;
- representative feature-change walkthrough;
- broken-config troubleshooting path;
- docs links checked;
- dependency/version drift review.

## Blockers
For production-bound projects, block release if the only working setup depends on undocumented agent context, real credentials, manual database mutation, or hidden machine state.