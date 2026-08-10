# Onboarding, First-Run & Activation

Canonical contract for turning a fresh account into a successful first outcome without dark patterns or unnecessary data collection.

## Product contract

During Discover/PRD define the user's first valuable outcome, activation event, expected time-to-value, prerequisites, and recovery path. Do not optimize for checklist completion if the checklist does not correlate with user value.

Document:
- target user and job;
- first-value event and measurable activation event;
- required setup versus optional enrichment;
- progressive profiling fields and why each is needed;
- empty/loading/error/offline/forbidden states;
- recovery and support escalation;
- accessibility and localization requirements;
- experiment/feature-flag dependencies.

## First-run architecture

Use a deterministic state machine rather than scattered client flags: `new -> setup_required -> ready -> activated`, with explicit failure/recovery states. Server state is authoritative. Refreshing, changing devices, or opening the app in another tab must not corrupt progress.

Minimize onboarding data. Do not require profile fields that are not necessary for the first useful action. If setup can be deferred, provide a safe skip path and explain the consequence honestly.

## Guided UX

Use progressive disclosure, contextual hints, useful empty states, examples that reflect the actual product, and a concise checklist for multi-step workflows. Every tutorial step must have a real target and a way to recover if the UI changed. Do not block core functionality behind unnecessary tours.

Respect keyboard navigation, screen readers, reduced motion, text scaling, long translations, RTL, and mobile constraints. Avoid auto-opening multiple dialogs or stealing focus.

## Measurement

Measure funnel events such as onboarding_started, setup_completed, first_value, activated, and recovery_needed using a documented event taxonomy. Analytics must be privacy-aligned and consent-aware. Never infer sensitive attributes merely to improve conversion.

Activation metrics should be cohort-based and interpreted with retention, task success, support contacts, and qualitative feedback. Do not declare an onboarding improvement from a short-term click-through increase alone.

## Evidence: ONB-* probes

- **ONB-001 fresh-account journey:** create a new account and reach first value without hidden setup or manual intervention.
- **ONB-002 resume/recovery:** interrupt onboarding, reload, sign out/in, and resume without state corruption.
- **ONB-003 minimal-data:** inspect requests/schema and prove optional fields are not required or stored unnecessarily.
- **ONB-004 failure states:** exercise validation, dependency failure, timeout, offline/reconnect, and permission errors.
- **ONB-005 accessibility:** keyboard and assistive-technology check of the first-value journey.
- **ONB-006 localization:** verify long strings, locale formatting, and RTL where applicable.
- **ONB-007 analytics:** verify activation events are emitted once, contain only approved fields, and respect consent.
- **ONB-008 experiment safety:** when onboarding is flagged/experimented, prove control/variant assignment is stable and no unauthorized feature is exposed.

## Release blockers

Block when onboarding requires unnecessary sensitive data, cannot recover from interruption, traps users in a tour, misreports activation, bypasses authorization, or creates inaccessible/mislocalized critical steps.
