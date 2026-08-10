# Design System Scale & Discoverability Contract

For products with multiple screens, the design system MUST become a reusable source of truth rather than a collection of copied components.

Required where complexity warrants it:
- component inventory with ownership and status
- documented component variants and state coverage
- composition guidance: when to compose primitives vs create a new component
- accessible component API expectations
- token source of truth
- usage examples and anti-patterns
- discoverable manifest or Storybook-like catalog where useful
- deprecation/versioning strategy
- visual regression coverage for critical components

Agents MUST inspect the existing component inventory before inventing a replacement. A new component requires a reason existing primitives cannot satisfy the job.

The system should optimize for composition over configuration explosion: prefer small interoperable primitives over giant components with dozens of boolean props.

Evidence should show the inventory, representative component states, and proof that critical screens reuse the canonical system.
