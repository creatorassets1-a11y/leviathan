# Migrating to Leviathan 2.0

Leviathan 2.0 is a policy and artifact architecture upgrade. It is designed to preserve the
useful lifecycle rules from 1.x while making them portable across coding agents and more
verifiable.

## Required changes

1. Add `LEVIATHAN.md` and `AGENTS.md` to projects using Leviathan.
2. Record `leviathan_version`, `policy_version`, and `artifact_schema_version`.
3. Create `.leviathan/state.json` and `.leviathan/evidence/ledger.json` for active builds.
4. Replace any "all tests passed" prose with evidence-backed check entries.
5. Reclassify old combined severity rules into security, accessibility, dependency, and product
   categories.
6. Review legal language. Replace claims of being "legally covered" with a current risk/review
   status.
7. Add production observability and recovery requirements where the project has a backend.
8. Add threat modeling for R2+ systems and minor-safety analysis where relevant.
9. Record host capabilities so a new coding agent can continue the project without vendor memory.

## Compatibility

Existing reference files remain useful. `SKILL.md` remains available for skill-capable hosts,
but `LEVIATHAN.md` is the portable source of truth.

## Gate migration

Old gate claims do not automatically satisfy 2.0 gates. Re-run checks and create evidence under
the new schema. If a check cannot be run, mark it `not_available` and explain why.

## Rollback

If a project cannot safely adopt the new artifact structure immediately, keep the existing build
unchanged, create a migration branch/checkpoint, and migrate before the next release. Do not
silently mix old and new release evidence.
