# Launch Checklist - Website / Web App

Generated per project at handoff; this is the base list. Items marked (human) cannot
be done by the skill and stay with the owner.

## Before DNS flips
- [ ] Phase 6 report reviewed; all ship gates green, known limitations accepted
- [ ] Domain purchased and DNS access confirmed (human)
- [ ] HTTPS live with redirect; security headers verified on production responses
- [ ] All legal pages live, date-stamped, linked in footer; consent manager blocks
      non-essential scripts pre-consent (verify in a fresh browser profile)
- [ ] Contact form delivers to a monitored inbox; reply address real (human: confirm
      receipt)
- [ ] Admin owner account created, 2FA enrolled, password in the owner's manager
      (human)
- [ ] Backups scheduled; one restore executed and noted in the evidence ledger
- [ ] Error tracking and uptime monitor pointed at production; alerts reach the owner
      (human: confirm the alert email/phone)
- [ ] `.env` production values set from `.env.example`; secret scan clean
- [ ] 404 and error pages render on production
- [ ] Sitemap submitted to Search Console; robots.txt correct for production
      (staging noindex removed)

## Launch day
- [ ] DNS flipped; propagation checked; www/apex both resolve to HTTPS
- [ ] Real-device spot check on the audience profile device (human)
- [ ] Core flows walked once on production (signup, sign-in, the one job, checkout
      if selling)
- [ ] Analytics receiving; consent flow verified once more on production domain

## First week
- [ ] Error tracker reviewed daily; zero-error baseline or triage list started
- [ ] Performance rechecked on production with real traffic (budgets still green)
- [ ] Lawyer review completed for any flagged regulated-sector items (human)
- [ ] RUNBOOK.md walked once by the owner: deploy, rollback, backup restore steps
      make sense to them (human)
