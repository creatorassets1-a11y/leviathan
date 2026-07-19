# Legal & Compliance Engine

Every build ships legally covered for its declared markets. The templates in
`legal-templates/` are the skeleton; the law is checked fresh per build.

**Standing rule - never trust templates stale:** before populating any template, run
a live web check on the current requirements of each named market (official/government
sources per the primary-source allowlist). US state privacy laws multiply yearly and
children's-data rules keep tightening. Every generated legal page carries a
"generated on [date]" line as a tripwire.

**Standing rule - the policy matches the codebase:** every populated template
describes the *actual* data practices of the *actual* build: what is collected, why,
where stored, which processors (e.g. Supabase, Stripe, the analytics tool). A privacy
policy that contradicts the code is worse than none - it is documented deception.
The legal role reads the data model and the dependency list before writing.

**Register:** per the product owner's explicit requirement, privacy and terms are
comprehensive and formal. "Long and boring" is the correct register; brevity in legal
pages reads as amateurism and creates gaps. Plain-language summaries may sit at the
top; they supplement, never replace, the full text.

## Baseline (every site, every region)

Privacy Policy + Terms of Service + working Contact. Cookie Policy whenever cookies
or tracking exist. Add when relevant: Refund/Returns (anything selling), Shipping
(physical goods), Acceptable Use (UGC), DMCA/notice page (UGC or US audience),
Accessibility statement. All wired into the footer.

## Region logic

### EU/EEA + UK (GDPR / UK GDPR)
- Lawful-basis mapping for each processing purpose, written into the policy.
- Cookie consent: opt-in, granular categories, no pre-checked boxes, reject as easy
  as accept. "Continuing to browse" banners are non-compliant. The consent manager
  must actually block non-essential scripts until consent (a banner that loads
  trackers anyway is theater), store proof of consent, and re-prompt on policy
  version change.
- Data-subject rights (access, correction, deletion, export) wired to real
  machinery - the account export and deletion flows, surfaced through admin.
- Processor list, breach-notification note (72h to supervisory authority), named
  contact point.
- **European Accessibility Act:** enforceable since 2025-06-28; EN 301 549 (WCAG
  2.1 AA) is the presumed-conformity standard; reaches non-EU businesses selling to
  EU consumers (e-commerce, banking, ticketing, e-books and more). Flag it for any
  build with EU customers; the WCAG 2.2 AA build floor clears the technical bar.
- Google tooling: if the user insists on GA or Google Ads for EU traffic, wire
  Consent Mode v2 (required since 2024). The privacy-respecting default analytics
  avoids the whole problem - say so.

### United States
- **ADA exposure:** private-business web suits are live now regardless of the DOJ
  Title II government deadlines (extended in 2026 to Apr 2027 / Apr 2028). The WCAG
  floor is the defense; note it in the accessibility statement.
- **CCPA/CPRA and sibling state laws:** when in scope, ship the "Do Not Sell or Share
  My Personal Information" footer link, honor Global Privacy Control signals, include
  the rights disclosure and opt-out flow. Check the current state-law roster at
  populate time (it grows yearly).
- **DMCA:** UGC platforms get the notice/takedown page and registered-agent guidance.

### Other named markets
Brazil LGPD, Canada PIPEDA, South Africa POPIA, Nigeria NDPR: verify current text at
populate time. **Strictest-applicable-standard rule:** when audiences span
jurisdictions, build one consent mechanism to the toughest law in scope; it beats
per-region banner spaghetti and always passes the weaker regimes.

### Children
If under-13s (COPPA) or under-16s (GDPR, consent age varies by member state) could be
users: raise it explicitly; options are no behavioral tracking + parental-consent
flows, or an honest recommendation to age-gate. Never silently proceed.

### Regulated sectors
Health, finance, gambling, alcohol, CBD: build the scaffolding, mark it clearly, and
state plainly that a licensed lawyer in the operating jurisdiction must review before
launch. Template compliance never equals regulated-industry compliance - the skill
does not replace lawyers and says so.

### AI features in the product
If the built product itself generates AI content or runs AI features for users: honest
disclosure page, plus a check of current AI-transparency rules for the named markets
(EU AI Act transparency obligations; US state rules are moving) at populate time.

## Admin wiring

Legal ops surface in the admin dashboard: policy version management with changelog,
consent log viewer, and the data-request queue. Consent proof and policy versions are
retained; the deletion flow respects retention carve-outs and documents them.

## Templates

- `legal-templates/privacy-policy.md`
- `legal-templates/terms-of-service.md`
- `legal-templates/cookie-policy.md`

Each is a structured skeleton with `[FILL]` slots and per-section guidance. Populate,
verify against the codebase, date-stamp, and have the copywriter pass smooth the
plain-language summary only - the operative text stays formal.
