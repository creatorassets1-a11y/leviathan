# PRD Template

Generate `PRD.md` at the project root from this structure. Fill every section with the
actual answers from the interview and research - no section ships as boilerplate, and
no section is silently dropped. Present the finished PRD to the user in plain language
and get approval or edits. **No code exists before the PRD is approved.**

Keep the register plain. The PRD is for the owner, not for engineers; jargon gets a
one-line translation.

---

```markdown
# [Product name] - PRD
Generated: [date] · Status: DRAFT until the owner approves

## 1. Summary
Three to five sentences: what this is, who it serves, and the one job it must do.

## 2. Audience
Who exactly (age, tech comfort, region, device mix), what they came to do, and what
that implies for design, copy, and testing. Name the Phase 6 test device profile here
(e.g. "cheap Android, throttled 4G" or "mid-tier laptop + iPhone").

## 3. The one job
The single action a visitor should take, and how every page routes toward it.

## 4. Features: Launch / Later / Never
- **Launch:** the smallest set that does the one job well.
- **Later:** good ideas that would delay launch; note what each waits for.
- **Never:** with a reason for every entry. "Never" entries prevent scope archaeology.
Defend small launches with fast follow-ups over six-month first releases, out loud.

## 5. Page map & user flows
Every page/screen, and each core flow walked step by step - including unhappy paths
(wrong password, expired link, payment failure, offline mid-form). Unhappy paths
listed here get built and tested; unlisted ones get invented under deadline.

## 6. Stack & why
The chosen stack, the reason, and the honest downside in the same breath.

## 7. Data model sketch
Main entities, their relationships, and which fields are sensitive (drives encryption,
retention, and export decisions). Plain-language, one table per entity.

## 8. Auth plan (if accounts)
Sign-in methods (passkeys recommended, email+password fallback), 2FA policy, session
strategy, and the account lifecycle (verify, reset, email change, deletion).

## 9. Admin scope (if backend)
What the owner can manage without touching code, mapped to the content-ownership
answer. Roles at launch.

## 10. Legal pages per region
The exact page list this build ships (from references/legal-compliance.md), which laws
triggered each, and any lawyer-review flags for regulated sectors.

## 11. i18n plan
Worldwide: language set, switcher placement, URL structure, RTL needs. Regional:
which languages and why. "English only, region X" is a valid completed section.

## 12. Design direction
The chosen direction (named, from the direction library), the 2–3 references it draws
from, and a token preview: palette, type pairing, radius, motion feel.

## 13. Performance budgets
Internal targets: LCP ≤ 2.0s, INP ≤ 160ms, CLS ≤ 0.08 on the audience device profile;
TTFB < 600ms; initial JS < 200KB gzipped (content sites); hero image < 100KB
AVIF/WebP; fonts < 40KB subset. Tighten only, never loosen.

## 14. Security floor
What ships by default (headers, rate limits, hashing, authz checks, secret handling)
and anything project-specific above the floor.

## 15. Threat model (ten lines, not a workshop)
Who would attack this product, what they want (accounts, free product, scraped data,
spam relay, card testing), and which floor control answers each.

## 16. Scale plan
Day-one invariants in place, the growth ladder, and the load-test target (above the
12-month traffic projection).

## 17. Hosting plan & cost honesty
Where it runs, and estimated monthly cost at three levels: launch, 10k users, 1M
users. "Scales to millions" must never hide "and costs thousands."

## 18. Testing plan
The flows, scenarios, breakpoints, and audits Phase 6 will run, and what cannot be
tested in this environment (say so now, not in the report).

## 19. Risks & honest tradeoffs
Every known compromise, stated plainly with its consequence.

## 20. Open questions
Anything still undecided. An approved PRD may carry open questions only if none of
them block Launch-list features.
```

---

## Presentation rules

- Walk the user through the PRD top to bottom in a short message; link or attach the
  full file. Highlight the three decisions most likely to surprise them.
- Edits are cheap now and expensive later - invite them explicitly.
- Record approval verbatim ("approved by [user], [date]") at the top of PRD.md. That
  line is the Phase 3 gate artifact.
