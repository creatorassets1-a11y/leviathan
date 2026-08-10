# Product-Specific Frontend, UX, and Anti-Slop Gate

The goal is not to ban a fixed font, framework, color, or component library. The goal is to prevent unreasoned defaults and ensure the interface is specific to the product.

## Required DESIGN.md contract

Before substantial UI implementation, record:

- audience and primary user jobs;
- information architecture and navigation model;
- visual references and why they are relevant;
- brand attributes and intentional exclusions;
- typography rationale;
- color/contrast rationale;
- spacing/layout principles;
- component strategy;
- motion principles and reduced-motion behavior;
- content/voice rules;
- empty/loading/error/offline/permission states;
- responsive behavior;
- accessibility acceptance criteria.

## Anti-slop review

Review for unreasoned use of:

- generic hero + three-card feature grids;
- repetitive metric cards;
- card-within-card layouts;
- default shadcn/Tailwind compositions with no product adaptation;
- generic gradients, glass effects, neon-on-dark palettes, or decorative blur;
- emoji used as functional icons;
- excessive hover/bounce animation;
- unexplained design-system defaults;
- copy that could describe any startup rather than this product.

These are review signals, not absolute prohibitions. A justified choice may pass.

## Copy review

Prefer concrete product language. Flag repetitive AI patterns such as generic hype, unnecessary em-dash-heavy prose, empty “not X but Y” constructions, buzzword clusters, claims unsupported by product behavior, and explanations that obscure the user's task.

The product voice must be defined in `DESIGN.md`. Humanization is not a claim of human authorship.

## State completeness

Every important flow must consider:

- first-use/empty;
- loading/skeleton where useful;
- success;
- validation error;
- server error;
- permission denied;
- offline/degraded connectivity;
- destructive confirmation;
- retry/recovery;
- long-content and localization expansion.

## Accessibility

Automated scans are necessary but insufficient. Exercise keyboard-only navigation, focus visibility, accessible names/labels, contrast, zoom/reflow, reduced motion, screen-reader flows, and touch target behavior appropriate to the platform.

## Mechanical evidence

Recommended check IDs:

- `DESIGN-001` design rationale present;
- `DESIGN-002` information architecture review;
- `UX-001` primary task completion;
- `UX-002` state completeness;
- `COPY-001` product-specific voice;
- `A11Y-001` automated scan;
- `A11Y-002` keyboard;
- `A11Y-003` screen reader;
- `A11Y-004` zoom/reflow;
- `A11Y-005` reduced motion.

No single automated score is allowed to represent the whole UX or accessibility result.
