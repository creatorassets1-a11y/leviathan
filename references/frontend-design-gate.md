# LEVIATHAN Frontend Design Gate

**Status:** Normative
**Applies:** Non-trivial user-facing interfaces

## 1. Design before implementation
Before broad UI implementation, the agent MUST create or update `DESIGN.md` and record:

1. **Subject**: what the product/page actually is.
2. **Audience**: the primary user and their context.
3. **Single primary job**: the one outcome the screen must make easy.
4. **Information architecture**: hierarchy, navigation, content priority, and important states.
5. **Aesthetic direction**: one coherent direction with a rationale tied to the subject and audience.
6. **Rejected defaults**: explicitly consider and reject or justify the common AI defaults: untouched component-library styling, generic hero/three-card layouts, decorative gradients, excessive glass/blur, neon-on-dark, and other statistically convenient choices.
7. **Palette**: 4–6 named colors with semantic roles and contrast intent. Use actual tokens, not ad-hoc color values.
8. **Typography**: deliberate display/body pairing with rationale. Inter, Roboto, Arial, and pure system stacks MUST NOT be the unexamined primary choice. A prohibited/default typeface may be used only when the product direction genuinely requires it and the rationale is recorded.
9. **Layout concept**: include a compact wireframe or structural description before implementation.
10. **Signature element**: exactly one primary visual/interaction risk or memorable device, justified by the product. Everything else should support it rather than compete with it.
11. **Motion model**: what moves, why, timing principles, and reduced-motion behavior.
12. **Content voice**: concrete vocabulary, CTA conventions, and rules for product copy.

## 2. Self-critique before code
The design plan MUST answer:

> If the product name, copy, and colors were removed, would this still look like the default solution to a vaguely similar AI-generated brief?

If yes, revise the direction before implementation.

Also ask:
- Is every decorative element carrying meaning or improving comprehension?
- Is the signature element worth the complexity it adds?
- Have I used a component because it is appropriate, or because the library made it convenient?
- Does the typography communicate personality rather than merely provide readability?
- Does the hierarchy reflect the user's real job rather than a generic marketing template?
- Could one visual accessory be removed without weakening the design? If yes, remove it unless it serves a clear purpose.

## 3. Sample-render gate
Before broad implementation, the agent MUST render at least one representative real section using real or production-representative copy and the proposed tokens.

The sample must be reviewed for:
- hierarchy
- typography
- spacing and optical alignment
- responsive behavior
- contrast
- focus/keyboard behavior
- content density
- state transitions
- visual distinctiveness
- performance implications

A description, screenshot of a mockup unrelated to the implementation, or code-only review is not equivalent to rendered evidence.

## 4. State-complete component design
Major components MUST design and implement applicable:
- loading
- streaming/progressive
- success
- empty
- validation error
- system error
- offline/reconnect
- unauthorized/session expired
- forbidden
- rate limited
- partial success/degraded
- optimistic update + rollback
- in-flight/double-submit prevention

These states are part of the design, not post-release QA.

## 5. Accessibility gate
Accessibility MUST be treated as interaction design:
- semantic landmarks and heading hierarchy
- keyboard reachability and visible focus
- focus restoration after dialogs and meaningful route/state changes
- programmatic labels and field-error associations
- `aria-live`/status semantics for dynamic and streamed content
- no color-only meaning
- contrast and forced-colors considerations
- touch target sizing
- zoom/reflow
- reduced-motion behavior
- representative screen-reader testing (NVDA, VoiceOver, or TalkBack as appropriate)

Automated accessibility scanning is useful evidence but does not replace representative manual journeys.

## 6. Anti-slop review
Review for recognizable convergence patterns, including:
- untouched Tailwind/shadcn/component-library defaults
- generic hero + three identical feature cards
- repeated icon/heading/paragraph grids without information justification
- card-inside-card composition without hierarchy reason
- gradient text used merely to make metrics look impressive
- decorative numbering or eyebrows that encode nothing
- excessive blur/glass/neon glow
- purple/indigo/violet gradients or cyan-on-dark defaults without rationale
- generic stock imagery or AI-looking decorative art without product relevance
- excessive hover/bounce animation
- generic CTA/copy that could describe any product
- placeholder content surviving into the product

These are findings, not universal aesthetic bans. A deliberate, documented choice can override a finding; the evidence must explain why.

## 7. Review against external standards
When relevant skills are available, the agent SHOULD load and review against high-quality frontend review guidance such as Vercel-style web design/accessibility guidelines and reputable frontend-design skills through the LEVIATHAN skills trust process.

External skills may advise; `LEVIATHAN.md`, the project `DESIGN.md`, security policy, accessibility requirements, and evidence gates remain authoritative.

## 8. Evidence required for Design gate
For non-trivial UI, evidence should include as applicable:
- `DESIGN.md`
- token definitions
- rendered sample
- screenshots/rendered artifacts of key screens
- screenshots or recordings of representative non-happy states
- responsive/mobile evidence
- accessibility evidence
- review findings and fixes
- known limitations

A Design gate is `passed` only when required artifacts exist and verification is actually performed. `unknown`, `not_run`, `simulated`, or `not_available` MUST NOT be represented as passed.
