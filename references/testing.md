# Testing & Verification Protocol

The skill's credibility rule: **nothing is called working until it has been
exercised.** "It should work" is banned vocabulary. "Done" and "working" are claims
that require evidence.

## Order of verification

```
builder finishes
  → independent reviewer (cold read) files findings
  → builder fixes (2-attempt budget per finding class, then escalate)
  → qa scenario pass
  → security audit
  → ship decision against the hard gates
```

**The reviewer reviews cold.** It sees only the built output - repo, running app,
docs - never the builder's reasoning or chat history. In sequential harnesses,
re-read the code as a stranger inheriting the repo: no consulting your own memory of
why something was done; if the code cannot justify itself, that is a finding. The
blindness is the point: it catches what the builder rationalized.

## Evidence ledger

Every verification claim in the final report links to its evidence: the exact command
run, its actual output, timestamp, and environment. Screenshots for visual checks,
logs for scans, traces for performance runs. **A claim without an artifact does not go
in the report.** Only results from commands that actually ran may be reported -
writing a green report from imagination is the agent-world equivalent of fake
testimonials and is banned by the same rule. If something could not be tested in this
environment (real payment capture, store review, real devices), the report says
exactly that instead of implying coverage.

## Hard ship gates

Miss a gate and the build does not ship - no exceptions granted by enthusiasm:

1. Zero critical findings; at most 3 documented-and-accepted high-severity findings
   across security, accessibility, and dependency scans.
2. Zero matches on the anti-slop ban list (design-system.md), including token-to-DOM:
   no hex or spacing value untraceable to DESIGN.md.
3. Internal performance targets met on the audience device profile: LCP ≤ 2.0s,
   INP ≤ 160ms, CLS ≤ 0.08, TTFB < 600ms.
4. State reconciliation clean: schema vs generated types vs live API responses show
   no drift.

## Audience device matrix

The test profile comes from the interview's audience answer, not from convenience.
Consumer product for Cameroon or wider African markets: cheap Android profile,
throttled 3G/4G, high-latency simulation. US B2B tool: mid-tier laptop + iPhone
profile. The 75th-percentile user is the target, and in most consumer markets that
user is not holding a flagship.

## The pass list

1. **Flow tests:** every PRD user flow end to end, including unhappy paths: wrong
   password, expired reset link, double-submit, back-button mid-checkout, offline
   mid-form, payment failure, webhook retry.
2. **Scenario matrix:** new visitor / returning user / admin / attacker on each core
   page; mobile + desktop; slow-3G throttled pass; JS-disabled sanity check for
   content pages.
3. **Breakpoints:** 320, 375, 768, 1024, 1440+; touch targets ≥44px; safe areas on
   notched phones.
4. **Accessibility:** axe-core scan + the manual checklist (keyboard-only full pass,
   focus visibility, screen-reader spot pass, contrast). Automated tools catch
   roughly a third of issues; the manual checklist is mandatory, and the report says
   that instead of waving a green scanner badge.
5. **Security:** headers verified on the live responses; dependency audit with
   criticals resolved; secret scan on the repo; manual IDOR/authz probes on every
   parameterized route (swap IDs across two test accounts; every 403/404 observed is
   ledger evidence); rate limits actually triggered once.
6. **Performance:** Lighthouse (or equivalent) against the budgets on the throttled
   profile, plus a bundle-size check against the JS budget.
7. **Data integrity:** migrations up AND down; backup taken and restore actually
   executed once; deletion cascades verified against the schema; retention rules
   stated.
8. **Maintainability gate:** dedup and dead-code pass (AI-assisted builds measurably
   over-duplicate): hunt copy-pasted blocks, unused exports, orphaned files;
   consolidate. RUNBOOK.md gets a "debt" section listing anything consciously left
   imperfect and why.
9. **i18n (when active):** longest-language layout check, RTL screenshots, hreflang
   validation.

## Self-correction budget

An audit failure routes back to the responsible role with the log. Two remediation
attempts; if still failing, escalate to the user with a plain explanation of what is
broken and the options. No infinite fix loops burning tokens; no silent giving up.

## The honest report

Final structure: what passed (with evidence links), what failed and was fixed, what
remains as a known limitation, what could not be tested here. Failures are reported
as failures. The report is a deliverable - it ships in the handoff unvarnished.
