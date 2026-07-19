# Template: Privacy Policy

Skeleton for the generated page. Formal, comprehensive register. Every `[FILL]` is
populated from the actual build - data model, dependency list, processor accounts -
never from imagination. Sections marked *(conditional)* appear only when true of the
build; do not ship empty sections. Date-stamp at top. A short plain-language summary
box may precede the full text.

---

## Privacy Policy - [Product name]
Effective date: [FILL] · Last updated: [FILL generated-on date]

### 1. Who we are
[FILL: legal/trading name, jurisdiction, contact email, postal address where required
by the named markets. Named privacy contact or DPO where GDPR applies.]

### 2. Scope
What this policy covers: the website/app at [FILL domains], and the services described
in the Terms. What it does not cover: third-party sites we link to.

### 3. Information we collect
Enumerate honestly from the data model and the analytics/logging configuration:
- **You provide:** [FILL: e.g. account details (name, email), profile content,
  messages, order and delivery details, support requests.]
- **Collected automatically:** [FILL: e.g. IP address, device/browser type, pages
  viewed, referrers, cookies per the Cookie Policy, server logs and their retention.]
- **From third parties:** [FILL: e.g. payment confirmation from Stripe (we never
  receive full card numbers), OAuth profile data if social sign-in exists.]
State plainly what is NOT collected (e.g. no biometric data, no precise location) -
honest negative space builds trust and constrains scope.

### 4. Why we process it, and lawful bases *(GDPR-conditional table)*
| Purpose | Data | Lawful basis |
|---|---|---|
| [FILL: Provide the service / accounts] | … | Contract |
| [FILL: Payments and fraud prevention] | … | Contract / legal obligation |
| [FILL: Analytics] | … | Consent (or legitimate interest if genuinely cookieless) |
| [FILL: Transactional email] | … | Contract |
| [FILL: Marketing email] | … | Consent, withdrawable |

### 5. Cookies and similar technologies
Short cross-reference to the Cookie Policy, with the consent mechanism named.

### 6. Who we share it with (processors and recipients)
Enumerate from the real dependency/infra list: [FILL: e.g. Supabase (database and
auth, hosting region X), Stripe (payments), hosting provider, email provider,
analytics provider - with links to each processor's own policy]. State that data is
never sold [only if true; if CCPA "sharing" occurs, disclose it and link the opt-out].

### 7. International transfers *(conditional)*
[FILL: where data is hosted and processed; transfer mechanisms (SCCs/adequacy) for
EU data if applicable.]

### 8. Retention
Per data class, from the real configuration: [FILL: account data until deletion +
carve-outs; order/invoice records X years by law; server logs N days; consent proofs
duration; backups cycle].

### 9. Security
Summarize the real floor without overclaiming: encryption in transit, one-way password
hashing (Argon2id), access controls, audit logging. Never promise "unhackable"; state
that no method is 100% secure and describe breach-notification practice.

### 10. Your rights
Per applicable regimes: access, correction, deletion, export/portability, objection,
consent withdrawal; how to exercise (in-account tools first, contact fallback);
response timeframe; right to complain to a supervisory authority *(GDPR)* /
non-discrimination and "Do Not Sell or Share" + GPC honoring *(CCPA-conditional)*.

### 11. Children *(conditional wording per audience answer)*
[FILL: not directed at children under N; what happens if such data is discovered; or
the parental-consent flow if the product serves minors.]

### 12. Changes to this policy
Versioning practice, notification method, and re-consent trigger on material change.

### 13. Contact
[FILL: privacy contact email; DPO/EU representative where applicable.]
