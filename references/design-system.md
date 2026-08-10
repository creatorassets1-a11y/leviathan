# Design System: Deliberate, Accessible, Non-Generic UI

AI slop is a convergence problem: repeated defaults produce interchangeable products. Leviathan's
solution is deliberate product-specific design, not a new mandatory visual identity.

## Design decision rule

Every major visual choice should have a reason tied to at least one of:

- brand;
- audience;
- content;
- product behavior;
- platform constraints;
- accessibility;
- performance;
- cultural/local context.

A design can intentionally use common patterns when the reason is strong. Leviathan does not
ban a color, font, component library, or layout merely because other AI products use it.

## Anti-slop signals

Review for overuse of:

- generic gradient hero backgrounds;
- repeated feature-card grids without content justification;
- identical card/radius treatment everywhere;
- stock/fake imagery that does not fit the product;
- generic testimonials, logos, or metrics;
- untouched component-library defaults;
- repetitive scroll animations;
- vague marketing copy;
- arbitrary visual decisions with no rationale.

These are review signals, not absolute aesthetic laws. Real user requirements override them.
Fake trust signals and deceptive scarcity are always prohibited.

## DESIGN.md contract

Write `DESIGN.md` before broad UI implementation. It should lock:

1. visual direction and rationale;
2. color tokens and semantic meanings;
3. typography and fallback behavior;
4. spacing and layout primitives;
5. shape/border/shadow language;
6. responsive behavior;
7. motion and reduced-motion behavior;
8. imagery rules;
9. component states;
10. content voice and examples;
11. accessibility checks and contrast evidence;
12. performance constraints.

Tokens should be the source of truth for repeated visual values. Do not demand that every one-off
layout measurement be promoted to a global token when doing so would make the code worse.

## Accessibility

Check contrast at token-generation time and again in representative rendered states. Include
focus, hover, disabled, error, selected, and high-contrast/forced-color behavior where applicable.
Do not rely on color alone to convey meaning.

## Typography

Choose typography from product requirements, not a ban list. Consider readability, language
coverage, loading cost, licensing, fallbacks, and platform availability. Self-host or use a
reliable source when appropriate.

## Motion

Motion must communicate hierarchy or state, not merely make the page feel animated. Respect
`prefers-reduced-motion`. Test on representative low-power devices. Avoid animation that blocks
interaction or causes layout instability.

## Imagery

Use real product imagery, licensed assets, honest illustration, or deliberate abstraction. Do
not fabricate people, customers, partnerships, metrics, or endorsements.

## Direction library

The existing `design-directions/` files are starting references, not a closed list. A project may
choose one, adapt one, or define a new direction. Record why.

## Sample-section gate

Before broad implementation for substantial UI projects, render a real section using real copy
and the proposed tokens. Approval of a description is not the same as approval of the rendered
design. Record the decision.

## Verification

Review the built output for:

- generic convergence;
- token consistency where tokens are appropriate;
- accessibility;
- responsive behavior;
- performance;
- real content instead of placeholders;
- honest trust signals.

A visual pattern match is a finding only when it harms the product or violates a stated project
requirement. The goal is distinctive, appropriate design, not novelty for novelty's sake.
