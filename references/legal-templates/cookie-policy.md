# Template: Cookie Policy

Ships whenever the build sets any cookie or uses any tracking/storage technology.
The policy must match the real cookie inventory - enumerate what the build actually
sets, including third-party scripts' cookies. A build with only a session cookie and
no analytics is allowed to say exactly that (and may not need a consent banner at
all; strictly-necessary-only builds should say so plainly and skip the banner).

---

## Cookie Policy - [Product name]
Effective date: [FILL] · Last updated: [FILL generated-on date]

### 1. What cookies are
Two-sentence plain explanation, covering cookies and similar technologies
(localStorage, pixels) actually used. [FILL to match reality.]

### 2. The cookies we use
Real inventory table, generated from the build:

| Name | Purpose | Type | Set by | Duration |
|---|---|---|---|---|
| [FILL e.g. `session`] | Keeps you signed in | Strictly necessary | Us | [FILL] |
| [FILL e.g. `consent`] | Remembers your cookie choices | Strictly necessary | Us | [FILL] |
| [FILL e.g. `NEXT_LOCALE`] | Remembers your language | Preference | Us | [FILL] |
| [FILL analytics cookie(s)] | [FILL] | Analytics | [FILL provider] | [FILL] |
| [FILL marketing, only if truly present] | … | Marketing | … | … |

### 3. Consent and how to change your choices *(when non-essential cookies exist)*
- Non-essential cookies load only after opt-in consent; rejecting is as easy as
  accepting; no pre-checked boxes.
- How to reopen the consent manager at any time [FILL: e.g. "Cookie settings" footer
  link - the link must actually exist].
- Consent proof is stored [FILL duration] and re-requested when this policy changes
  materially.
- Browser-level controls, briefly, with the honest note that blocking strictly
  necessary cookies breaks sign-in.

### 4. Third-party cookies *(conditional)*
For each third party that sets cookies here [FILL from inventory]: who, why, link to
their policy, and the consent category gating them.

### 5. Do Not Track / Global Privacy Control *(CCPA-conditional)*
Whether and how GPC signals are honored (they are, when CCPA applies - describe the
effect).

### 6. Changes and contact
Update practice and the same contact as the Privacy Policy.

---

## Implementation notes (for the build, not the page)

- The consent manager must genuinely block non-essential scripts pre-consent -
  script tags injected only after consent, not merely hidden. A banner that loads
  trackers anyway is theater and evidence against the operator.
- Default analytics is privacy-respecting (Plausible/Umami class), which usually
  keeps the Analytics row cookieless - reflect that honestly in the table.
- Consent state is versioned against the policy version; the admin legal-ops surface
  shows the consent log.
