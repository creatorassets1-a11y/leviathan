# Repo rules for Leviathan

This repository IS the Leviathan skill: the repo root is the installable skill
(SKILL.md + references + assets). Changes here change how every future build behaves.

## Standing rules for any change

1. **Update README.md every time.** Any addition, removal, or behavior change updates
   the README in the same commit: the "What's new" changelog gets a dated entry, and
   the affected sections (layout, usage, roadmap) are kept accurate. A change without
   a README entry is incomplete.
2. **No em dashes** in this repo's own files or in anything the skill generates
   (product owner's standing rule). Use periods, commas, colons, or parentheses.
   Exception: vendored third-party content (`references/humanizer/`) stays verbatim.
3. **No predecessor references.** Do not mention deprecated or predecessor skills
   anywhere in the skill or docs; Leviathan stands on its own.
4. **Verify before encoding.** Any external "current standard" (thresholds, legal
   dates, security parameters) is confirmed against the primary-source allowlist in
   SKILL.md before it is written into a reference, and the verification date noted.
5. **Vendored content stays attributed.** `references/humanizer/` is vendored from
   blader/humanizer (MIT). Keep its LICENSE alongside it; note provenance in the
   README credits section if other third-party content is ever added.
6. **SKILL.md stays under ~500 lines.** New depth goes into `references/` with a
   pointer from SKILL.md, not into the orchestrator itself.
7. **Keep the reference loading table in SKILL.md in sync** whenever a reference file
   is added, renamed, or removed.
8. **SKILL.md frontmatter limits.** The `description` field must stay at most 1024
   characters (claude.ai skill upload rejects longer). Check the folded length after
   any edit to it.
