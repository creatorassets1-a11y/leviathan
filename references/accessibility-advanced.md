# Advanced Accessibility

This extends the accessibility floor to complex, dynamic, and stateful interfaces.

## Complex widgets
Use correct semantic patterns for dialogs, menus, tabs, comboboxes, trees, grids, drag/drop alternatives, carousels, and custom controls. Prefer native HTML where it provides the required behavior. Keyboard interaction, focus management, names/roles/states, and escape/close behavior must be defined before implementation.

## Dynamic content
Use live regions sparingly and intentionally for status, validation, progress, and important asynchronous updates. Do not steal focus for routine updates. Error summaries should identify the problem and provide direct navigation to the field requiring correction.

## Forms
Labels, descriptions, required state, autocomplete, input purpose, validation, recovery, and error association must be programmatically exposed. Preserve entered values on recoverable failure.

## Visual and motion
Support zoom/reflow, text resizing, high-contrast/forced-colors environments where applicable, reduced motion, focus visibility, and content that does not depend on color alone.

## Testing
Combine automated checks with keyboard-only journeys, screen-reader spot checks, zoom/reflow, mobile/touch, reduced-motion, and realistic error states. Test the actual product, not only isolated components.

## Evidence
- keyboard core-flow test;
- screen-reader core-flow test;
- dialog/menu/combobox state test where used;
- dynamic/live-region test;
- complex-form validation test;
- zoom/reflow test;
- reduced-motion test;
- focus restoration test;
- automated scan with manually reviewed findings.

## Blockers
Block release of a core workflow when keyboard users cannot complete it, focus is lost/trapped incorrectly, critical errors are not announced/associated, or custom controls lack accessible semantics.