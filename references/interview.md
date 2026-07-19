# Interview Engine

The interview exists to make the PRD true. Every question maps to a build decision;
a question with no downstream consequence does not get asked. The reverse also holds:
no build decision gets made on a guess when a question could have settled it.

## Conduct rules

1. **Adaptive, never a form.** Skip anything already answered in the request, in memory,
   or in past chats. Never ask a question whose answer is already in context - it reads
   as not listening.
2. **Batched.** 3–6 questions per message, grouped by theme. One wall of twenty
   questions kills momentum; twelve single-question messages kill patience.
3. **Defaults on everything.** Every question carries a suggested default so a beginner
   can answer "your call" and still get a good outcome. When they say "your call,"
   record the default as the decision and read it back at the gate.
4. **Consequences attached.** Every technical option gets a one-line consequence.
   "Next.js: best for SEO and scale, needs Node hosting. Plain HTML: cheapest and
   fastest to host, hard to add accounts later." The user decides with information,
   not vibes.
5. **Plain language.** Assume a smart person with no CS degree. "Do people need to log
   in?" not "Do you require an authentication layer?"
6. **Memory-aware.** Use known stack preferences, known infra (existing hosting, CDN,
   database accounts), known style rules, and prior projects to pre-fill and shorten.
   A current explicit instruction always beats memory.

## The ten mandatory topics

The interview may not conclude with unknowns on any of these. Everything else is
optional depth.

### 1. The one job
What is this, and what is the single action a visitor/user should take? One product,
one primary job. If the user lists five jobs, help them rank; the top one shapes the
homepage, the nav, and every CTA.

### 2. Stack
Always ask which language/framework they want: plain HTML/CSS/JS, React (Vite),
Next.js, Node backend, or "you pick." If "you pick," recommend with reasons and get an
explicit yes. Recommendation matrix:

| Project | Recommend | Why | Honest downside |
|---|---|---|---|
| Landing / marketing / portfolio | Static HTML/CSS/JS (or Astro) | Fastest, cheapest, nearly unhackable, trivial hosting | Adding accounts later means a rebuild |
| Content site / blog / docs | Astro or Next.js | SEO, speed, content workflows | Next needs Node hosting |
| Web app with accounts | Next.js + Postgres (Supabase) | Auth, SSR, API routes, one repo, RLS at the DB | Vendor coupling; heavier than Vite |
| SPA / internal tool | React + Vite + Node/Express API | Simple mental model, full control | You own more plumbing |

### 3. Target audience
Who exactly: age range, tech comfort, region, device mix. This drives design direction,
copy voice, accessibility depth, and - critically - the Phase 6 test device profile.
A product for consumers in most of the world is verified on a cheap Android over a
throttled network, not on a flagship.

### 4. Worldwide or regional
Worldwide: i18n architecture activates (externalized strings, locale-aware formatting,
visible language switcher, hreflang). Regional: which regions, which laws apply, which
languages. This answer feeds the legal engine directly.

### 5. Accounts or not
Accounts: the full auth stack activates (`references/auth-security.md`), profile
editing exists, the security floor rises, an admin dashboard is in scope. No accounts:
state plainly what becomes impossible later without a migration (saved state,
personalization, payments tied to identity).

### 6. Money
Payments, subscriptions, payouts? Which providers actually work in the target regions -
Stripe availability differs by country; Mobile Money matters for Cameroon and much of
Africa; card-only checkout quietly excludes huge markets. Ask, never assume. Money
moving also raises the legal floor (refund policy, consumer protection, PCI scope note).

### 7. Content ownership
Who updates content after launch, and how technical are they? This scopes the admin
dashboard/CMS. "I'll edit code" and "my cousin updates the menu weekly" are different
products.

### 8. Brand inputs
Existing logo, colors, fonts, and - most valuable - 2 or 3 sites whose vibe they want,
plus any they hate. Concrete references beat fifty adjectives. If they have nothing,
the design direction library carries the choice.

### 9. 3D / motion ambitions
If they want 3D or heavy motion, confirm real scope and target devices now, because it
shapes stack and performance budgets. If the concept cannot hold 60fps on the declared
audience's devices, say so before building and offer the version that can.

### 10. Constraints
Monthly budget for hosting/services, deadline, existing infra to reuse (domains,
hosting accounts, databases, email). Estimated costs go in the PRD at three traffic
levels.

## Conditional deep-dives

Trigger these only when the classification warrants:

- **Minors possible in the audience:** raise it explicitly. US COPPA under 13, GDPR
  consent age 13–16 by member state. Options: no behavioral tracking + parental consent
  flows, or an honest recommendation to age-gate.
- **UGC platform:** moderation expectations, report/appeal flow, Acceptable Use Policy,
  DMCA agent for US audience.
- **Regulated sector** (health, finance, gambling, alcohol, CBD): state now that the
  skill builds scaffolding and marks where a licensed lawyer in the operating
  jurisdiction must review before launch. Template compliance is not regulated-industry
  compliance.
- **Existing project** ("continue/fix/review my project"): the interview shrinks to
  gap analysis - read the codebase first, then ask only about what is undecided,
  broken, or missing against the Leviathan floor.

## Exit gate

Read back a short summary of every decision - one line each, defaults included - and
get an explicit "yes." This summary seeds the PRD. If the user changes something at
readback, that is the interview working, not failing.
