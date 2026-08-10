# Design System: Deliberate, Accessible, Non-Generic UI

AI slop is a convergence problem: repeated defaults produce interchangeable products. Vibecode Max's solution is deliberate product-specific design, not a mandatory visual identity.

## Design gate: decide before code

For substantial UI, complete this sequence before broad implementation:

1. **Subject**: what the product/surface actually is.
2. **Audience**: primary user and context.
3. **Single primary job**: the one outcome this surface must make easy.
4. **Information architecture**: hierarchy, navigation, content priority, and critical states.
5. **One aesthetic direction**: choose a coherent direction tied to the subject/audience and record the rationale.
6. **Reject or justify defaults**: explicitly consider common AI defaults such as untouched component-library styling, generic hero/three-card layouts, decorative gradients, excessive glass/blur, and neon-on-dark.
7. **Lock 4–6 semantic color tokens** with values, roles, and contrast intent.
8. **Lock deliberate typography** including display/body roles, type scale, line-height, letter-spacing, measure, weights, fallbacks, loading strategy, licensing, and language coverage.
9. **Define layout** with spacing rhythm, responsive priorities, and a compact wireframe/structural description.
10. **Choose exactly one primary signature element/risk.** Everything else should remain disciplined and support it.
11. **Define motion** by purpose, duration/easing principles, orchestration, and reduced-motion behavior.
12. **Define content voice** with concrete vocabulary, CTA rules, and state-message conventions.
13. **Self-critique before implementation:** if the product name, copy, and colors were removed, would this still look like the default solution to a similar AI brief? If yes, revise.
14. **Render a representative real section** with real or production-representative copy and locked tokens. The rendered result, not merely its description, must be reviewed before broad UI implementation.

A sample-render approval should record the reviewer, findings, fixes, and decision. If review cannot be performed by the current host, mark it `not_run`/`not_available`; never convert that into a pass.

## Anti-slop signals

Review for overuse of generic gradient heroes, repeated feature-card grids, identical card/radius treatment, irrelevant stock/fake imagery, generic testimonials/logos/metrics, untouched library defaults, repetitive animation, vague copy, decorative numbering/eyebrows/side borders with no information value, decorative gradient metrics, excessive glass/blur/neon glow, unexplained purple/indigo/violet or cyan-on-dark defaults, placeholder content, and arbitrary visual decisions without rationale.

These are review signals, not absolute aesthetic laws. A common choice is acceptable when product requirements justify it and the decision is recorded. Fake trust signals and deceptive scarcity are always prohibited.

## Design tokens and theming

Use a layered token model where appropriate:

- **Primitive tokens:** raw type, spacing, color, radius, elevation, motion, and z-index scales.
- **Semantic tokens:** surface, background, text, muted text, border, focus, primary, secondary, success, warning, danger, disabled, selected, and interactive states.
- **Component tokens:** only where a semantic token cannot express the relationship cleanly.

Once tokens exist, they are the source of truth. Agents MUST NOT scatter unexplained one-off colors, spacing values, radii, shadows, or typography values. Exceptions should be rare and documented. Do not turn every unique layout measurement into a global token merely for compliance.

Light, dark, and high-contrast/forced-colors variants are first-class when supported. Audit token pairs and important interactive states: focus, hover, active, disabled, selected, error, success, and warning. Theme switching must not produce unreadable content, lost focus, or broken controls. Reuse an existing CSS custom-property, Tailwind `@theme`, or equivalent token system rather than creating a parallel scale.

## Typography craft

Define a deliberate type scale, role-specific line-height, letter-spacing, body measure normally around 45–75 characters per line, optical sizing where supported, tabular numerals for aligned data, weight/width rules, metric-compatible fallbacks, and a font loading strategy based on performance needs. Consider subsetting, preload/swap/optional behavior, licensing, and language coverage.

Typography is selected from requirements rather than arbitrary bans. Common families may be used when justified, but must not be the unexamined default for a distinctive direction.

## Component and interaction craft

Major components specify behavior as well as appearance.

**Buttons:** primary/secondary/tertiary/destructive hierarchy, focus, hover, pressed, disabled, loading, touch target, feedback, and duplicate-mutation prevention.

**Forms:** persistent labels, grouped fields, help text, appropriate validation timing, programmatic error association, preserved input after recoverable errors, explicit required/optional status, progressive disclosure, and recovery actions.

**Tables/data:** semantic headers, alignment, responsive overflow/restructure, sorting/filtering affordances, loading/empty/error states, and accessible dense-data interaction.

**Modals/drawers/sheets:** justified interruption, focus trap/restoration, Escape behavior where appropriate, background interaction control, scroll locking, mobile behavior, and navigation semantics.

**Navigation:** current-location indication, keyboard behavior, overflow strategy, responsive/mobile pattern, and predictable back/deep-link behavior.

**Toasts/status:** critical information must not exist only in a toast. Use appropriate live/status semantics, timing, stacking, dismissal, and persistence rules.

**Selection controls:** semantics must match behavior. Do not choose a visually convenient primitive whose interaction model differs from the user's mental model.

Micro-interactions should communicate causality, state change, progress, feedback, or hierarchy. Decorative motion is not a substitute for interaction design.

## Visual hierarchy and optical refinement

Use spacing as a hierarchy tool. Define a base rhythm or scale and permit intentional exceptions. Related elements should group through proximity; unrelated groups need sufficient separation.

Optical alignment may override mathematical alignment when icons, glyph shapes, borders, baselines, or asymmetric marks make mathematical centering look wrong. Judge the rendered result at its actual size.

Hierarchy must survive long labels, localization, large datasets, zoom, density changes, and narrow viewports. Whitespace should control attention and grouping, not merely fill a template.

## Responsive and real-device behavior

Breakpoints should be driven by content/layout failure. For each major surface define what is preserved, collapsed, reordered, or replaced as space decreases. Account for safe-area insets, touch-vs-pointer differences, virtual keyboard/viewport changes, bottom sheets, sticky controls, long text, zoom/reflow, and orientation. Critical flows should use representative real devices; emulators/simulators are supplementary.

## Motion

Classify motion as entrance/transition, state change, or feedback. Define duration/easing ranges appropriate to the interaction and avoid scattered decorative animation. Motion must not block interaction, cause layout instability, or hide important information. `prefers-reduced-motion` should reduce or replace movement while preserving communicated state.

## Imagery

Use real product imagery, licensed assets, honest illustration, or deliberate abstraction. Never fabricate people, customers, partnerships, metrics, or endorsements. Define crop, aspect ratio, loading, and responsive behavior for important media.

## AI-native interfaces

When the product itself uses AI, design streaming output, cancellation, accessible live/status updates, useful uncertainty communication, edit/reject/regenerate/undo controls, optimistic rollback, provider failure, rate/token/spend limits, and a clear distinction between generated output and verified application state.

If AI can invoke tools or consequential actions, show the relevant permission boundary and require human confirmation for irreversible, financial, privacy-sensitive, or high-impact actions where appropriate.

## Accessibility

Accessibility is interaction design, not a final scan. Check semantic HTML, landmarks and heading hierarchy, keyboard reachability, visible focus, focus restoration after dialogs/routes/async updates, field-error associations, dynamic `aria-live`/status semantics, no color-only meaning, contrast, forced-colors/high-contrast, touch targets, zoom/reflow, and reduced motion.

Use automated checks plus representative manual screen-reader journeys such as NVDA, VoiceOver, or TalkBack as appropriate. Test real dynamic/streamed content, not only static placeholders.

## Performance

Consider font loading/subsetting, responsive image formats and dimensions, priority/lazy loading, code splitting, CSS complexity, layout/paint cost, animation work, caching/invalidation, SSR/streaming, and API latency behind perceived UI performance. Set measurable budgets appropriate to the product and test representative devices/networks. A fast development machine is not performance evidence.

## Direction library

The existing `design-directions/` files are starting references, not a closed list. A project may choose, adapt, or replace a direction. Record why.

## Design-system scalability

For multi-screen products, maintain a component inventory with ownership, status, variants, accessibility behavior, state coverage, usage guidance, and anti-patterns. Provide a discoverable manifest/Storybook-like catalog when useful.

Agents MUST inspect the existing inventory before creating a new component. Prefer composition of small interoperable primitives over giant components with dozens of boolean props. Record deprecation/versioning as the system evolves.

## Sample-section gate

Before broad implementation for substantial UI projects, render a real section using real copy and proposed tokens. Approval of a description is not approval of the rendered design. Record reviewer, findings, fixes, and approval. This is a hard Design gate subject to honest `not_run`/`not_available` reporting.

## Verification and maintenance

Review for generic convergence, unexplained defaults/one-off values, component/state coverage, accessibility and dynamic states, responsive/device behavior, performance/Core Web Vitals where applicable, real content, honest trust signals, and visual regression on critical screens/components where warranted.

Evidence should include `DESIGN.md`, token inventory, representative rendered screens/states, accessibility evidence, responsive/device evidence, and findings/fixes. Mechanical scans are detectors, not proof of design quality.

A visual pattern match is a finding only when it harms the product or violates a stated requirement. The goal is distinctive, appropriate, consistent design, not novelty for novelty's sake.
