# Copywriting - Human Copy Rules & Humanizer Fallback

All user-facing copy passes through the `humanizer` skill before it ships. This file
sets the writing rules and carries a condensed fallback ruleset for environments
where humanizer is not installed and cannot be.

## Process

1. Draft copy in the DESIGN.md voice, for the interviewed audience.
2. Run the humanizer pass (or the fallback ruleset below).
3. Apply the read-aloud test: any sentence that could sit on a thousand other sites
   gets rewritten or cut. "We help businesses grow" is nobody; "We reupholster
   mid-century chairs in Douala, two-week turnaround" is somebody.
4. Verify claims: every number, testimonial, and logo on the page is real or it goes.

## Voice rules

- Specific beats general, always. Name the place, the price, the turnaround, the
  limitation.
- One idea per sentence in UI copy; body copy may breathe.
- Buttons say what happens: "Book a fitting," not "Get started." "Submit" is a last
  resort.
- Error messages: what happened + what to do next, in the user's language, no codes
  without translation.
- Microcopy is where trust lives: form hints, empty states, confirmation emails get
  the same care as the hero.
- The audience answer governs register: a tool for developers may say "API key"; a
  site for clothing customers may not say "SKU."
- No em dashes anywhere (standing rule). Use periods, commas, or parentheses.

## Fallback humanizer ruleset (condensed)

Hunt and fix these AI-writing fingerprints:

- **Inflated significance:** "elevate," "unleash," "seamless," "effortless,"
  "empower," "revolutionize," "delve," "landscape," "realm," "testament to."
  Replace with the plain verb or cut.
- **Rule of three everywhere:** "fast, simple, and secure." Break the rhythm; two
  items or four, or one strong claim.
- **Negative parallelism:** "It's not just X, it's Y." Say Y.
- **Superficial -ing analysis:** "...showcasing our commitment to excellence,
  ensuring the best experience." Delete the participle tail; state the fact.
- **Vague attribution:** "studies show," "experts agree," "many users report" - cite
  it or cut it.
- **Promotional adjectives stacked:** "our innovative, cutting-edge platform." One
  concrete noun beats three adjectives.
- **Filler frames:** "In today's fast-paced world," "When it comes to," "It's worth
  noting that." Start at the content.
- **Uniform sentence length.** Vary it. Short lands.
- **Perfect symmetry between sections** (every feature described in exactly two
  sentences + benefit clause). Let content have its natural shape.
- **Hedging stacks:** "can help to potentially improve." Commit or cut.
- **Em dashes** used as universal glue. Banned here regardless.

## Legal-page exception

Privacy, terms, and cookie pages keep their formal register (per
`legal-compliance.md`); the humanizer pass there smooths only the plain-language
summary boxes, never the operative text.
