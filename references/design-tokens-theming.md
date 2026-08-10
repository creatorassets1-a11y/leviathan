# Design Tokens, Theming & Contrast Contract

Design values MUST be represented through semantic tokens rather than scattered one-off values.

Recommended layers:
1. Primitive tokens: raw scale values.
2. Semantic tokens: background, surface, text, border, focus, action, success, warning, danger, disabled, interactive states.
3. Component tokens only where semantic tokens cannot express the required relationship.

Token requirements:
- document ownership and naming conventions
- centralize color, type, spacing, radius, elevation, motion, and z-index scales
- avoid arbitrary values unless an explicit exception is recorded
- validate text/background and interactive-state contrast at token level
- define light/dark variants from semantic roles, not direct color swapping
- define forced-colors/high-contrast behavior where relevant
- verify focus, hover, active, disabled, selected, error, success, and warning states in every supported theme
- ensure theme changes do not cause unreadable content, lost focus, or broken contrast

If Tailwind `@theme`, CSS custom properties, or another token system is used, agents MUST reuse the project's existing tokens rather than creating parallel scales.

Evidence should include token inventory, contrast results, representative theme screenshots/renders, and a scan for unexplained one-off design values.
