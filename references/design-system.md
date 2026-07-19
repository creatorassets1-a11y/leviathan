# Design System - Anti-Slop Rules & Token Generation

AI slop is not one big mistake. It is a stack of small default decisions, each
individually defensible, that together produce a look documented and detectable enough
that over half of indie launch pages now trigger it. The fix is not talent, it is
deliberateness: before any UI is built, write a `DESIGN.md` at the project root that
replaces every default with a choice. Committing to a direction is the cure; the
statistically safe average is the disease.

## The recognizable-AI ban list

These patterns are banned as defaults. Any of them may appear only if the user
explicitly asks for it after hearing why it reads as AI-made.

- Purple-to-blue / violet gradients; gradient orbs; neon cyan or violet glow borders
  on dark backgrounds.
- Inter as the only typeface. (Inter is fine *in a pairing chosen on purpose*; alone
  and by default it is a fingerprint.)
- Glassmorphism on everything; frosted cards as the universal container.
- Dark mode as an unrequested default. Ship it when the user asked or the audience
  justifies it (developer tools, media viewing), never as a reflex.
- Three feature cards in a row under a hero; hero + features + testimonials + pricing
  as the universal page skeleton. If the content genuinely is three features, express
  it with a different structure than the slop template.
- One giant rounded icon (Lucide-class) floating above every heading.
- Colored left borders on cards - described by designers as "as reliable a sign of AI
  design as em dashes are for AI text." Banned outright.
- Identical padding and border radius on every element; five different card styles on
  one page.
- The same fade-in-on-scroll applied to every element.
- Plastic AI illustrations; fake diverse-team-at-laptop stock photos.
- Fake testimonials, fake client logos, fake metrics. Non-negotiable, no exceptions.
  Empty social-proof sections are cut until real proof exists, and the user is told why.
- Default shadcn styling without customization - the library is designed to be
  copy-pasted by agents, so its untouched output converges on the same look everywhere.

## DESIGN.md - what it must lock

Write it before building any UI. Every token in it is load-bearing: the build may not
use a color, size, or duration that is not in DESIGN.md (hardcoded hex values and
arbitrary spacing are build errors - this is the token-to-DOM rule).

1. **Direction.** One named aesthetic from `design-directions/`, chosen from the
   interview and audience - not from what is easiest to generate. Name it in the file.
2. **Palette.** Maximum one accent + a neutral ramp + semantic colors (success,
   warning, danger, info). Every foreground/background pair checked against WCAG
   contrast minimums (4.5:1 body text, 3:1 large text and UI components) at
   token-generation time. Record the checked ratios in DESIGN.md.
3. **Type.** A real pairing with personality, per the direction file. Free, fast,
   self-hostable fonts; correct fallback stacks; `font-display: swap`; total payload
   under 40KB subset and preloaded.
4. **Shape.** One radius scale (e.g. 2/6/12), one shadow philosophy (or none -
   borderless-first cards are the default), one border treatment.
5. **Layout primitives.** One strong repeated primitive instead of five card styles.
   Decide the grid, the section rhythm, and the one container pattern the whole
   product reuses.
6. **Motion.** Durations fast 150ms / base 250ms / slow 400ms; `ease-out` entrances;
   never linear snaps. Animate only `transform` and `opacity`. Entrances staggered
   with intention. Scroll triggers via IntersectionObserver. Every animation has a
   `prefers-reduced-motion` variant with a dignified static fallback. Any effect that
   cannot hold 60fps on a mid-range Android ships simplified, not janky.
7. **Imagery.** Real photos, real product shots, honest illustration, or deliberate
   abstraction. State which, and the treatment (duotone, grain, borders) so images
   read as part of the system.
8. **Voice.** Copy rules for this audience: register, sentence length, what gets
   named plainly. The read-aloud test: any sentence that could sit on a thousand
   other sites gets rewritten or cut. All copy passes the humanizer check.

## Direction selection

Pick from `design-directions/` using the audience and brand-input answers:

| Direction | Reach for it when |
|---|---|
| `editorial.md` | Content-led products, portfolios, studios, publications, anything where reading is the product |
| `brutalist.md` | Bold small brands, creative tools, audiences that reward confidence over polish |
| `industrial-mono.md` | Developer tools, technical products, dashboards, infrastructure |
| `clean-product.md` | SaaS, e-commerce, services for broad mainstream audiences |

Load exactly one. If the user supplied reference sites, map them to the nearest
direction and note the deltas in DESIGN.md rather than inventing a hybrid from scratch.

## Sample-section gate

Before the full build, render one real section (usually the hero plus one content
section) with real copy in the locked tokens, and show it. The user approving a
described direction and approving a rendered one are different events; only the second
opens Phase 5.

## Enforcement in review

The reviewer and qa passes re-check the ban list against the built UI, and the
token-to-DOM rule against the stylesheets: any hex value or spacing not traceable to
DESIGN.md fails the build. (An automated `audit_slop.py` lands in a later milestone;
until then this check is manual and mandatory.)
