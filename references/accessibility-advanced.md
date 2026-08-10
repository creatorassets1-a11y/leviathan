# Advanced Accessibility

This reference supplements the accessibility floor with concrete requirements for complex, dynamic, and stateful interfaces.

## Dynamic interfaces

Use semantic landmarks, heading hierarchy, accessible names/descriptions, and logical focus order. When content changes without navigation, announce meaningful status changes with appropriate live-region semantics; do not spam screen readers or announce purely decorative updates.

Dialogs, popovers, comboboxes, menus, tabs, accordions, drag/drop, virtualized lists, and custom controls must follow established keyboard and assistive-technology interaction patterns. Prefer native controls over custom widgets when possible.

On open, dialogs move focus to a sensible control; on close, focus returns to the invoking context. Escape behavior and nested overlays are deterministic. Errors are associated with fields and summarized without relying on color alone.

## Forms and complex workflows

Use programmatic labels, instructions, autocomplete semantics where appropriate, input purpose, clear validation, and error recovery. Preserve user input when validation fails. Do not make time limits inaccessible; provide extension or recovery where required.

For streamed AI output, status, cancellation, completion, and errors must be perceivable without requiring visual observation of animation. Reduced-motion users must receive an equivalent experience.

## Visual and interaction robustness

Support zoom/reflow, text scaling, forced colors/high contrast where relevant, keyboard-only operation, touch targets, orientation, and sufficient non-text contrast. Do not encode meaning solely in color, hover, animation, or sound.

Test translated long strings, RTL, large text, narrow mobile widths, and error states because accessibility failures often appear outside the default English desktop path.

## Evidence: A11Y-* probes

- **A11Y-001 keyboard journey:** complete critical journeys without a pointer.
- **A11Y-002 focus:** exercise dialogs, menus, navigation, errors, and dynamic updates; record focus movement.
- **A11Y-003 screen reader:** perform representative journeys with a platform-appropriate screen reader.
- **A11Y-004 forms:** submit invalid/partial forms and verify labels, error association, summary, and preserved input.
- **A11Y-005 dynamic status:** verify meaningful async/loading/success/error updates are perceivable without excessive announcements.
- **A11Y-006 zoom/reflow:** exercise zoom/text scaling and narrow widths without loss of content/function.
- **A11Y-007 contrast/forced colors:** inspect important UI in target high-contrast/forced-color modes.
- **A11Y-008 reduced motion:** enable reduced motion and verify equivalent functional behavior.
- **A11Y-009 localization:** test long strings and RTL where applicable.
- **A11Y-010 custom widgets:** verify semantics and keyboard behavior against the chosen accessibility pattern.

## Release blockers

Block when a critical journey cannot be completed by keyboard/assistive technology, focus becomes trapped/lost, dynamic failures are inaccessible, or a custom widget has no equivalent accessible interaction.
