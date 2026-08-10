# Design, Accessibility & Anti-Slop Contract

Every user-facing project MUST create a design contract before implementation when UI complexity warrants it.

The contract records:
- target users and jobs-to-be-done
- information architecture and content hierarchy
- visual/brand rationale and reference influences
- typography, spacing, color, motion, component and interaction decisions
- voice/content strategy
- responsive behavior
- loading, empty, error, offline, permission, expired-session, rate-limit and degraded states
- accessibility behavior

Accessibility requires both automation and representative manual testing: keyboard, focus management, semantic landmarks/headings, labels and error associations, dynamic `aria-live` behavior, reduced motion, contrast/forced colors, touch targets, zoom, and representative VoiceOver/TalkBack/NVDA journeys as applicable.

Anti-slop is contextual, not a ban on particular fonts, colors, frameworks, or component libraries. Review should detect unexplained defaults, repetitive card grids, generic hero/feature patterns, decorative gradients, excessive glass/blur, empty marketing claims, and interaction noise, but a justified choice is allowed.

Copy must be product-specific, factual, task-oriented, and free of fabricated proof. Avoid generic AI cadence and buzzword stuffing. Do not treat an arbitrary punctuation rule as proof of human quality.
