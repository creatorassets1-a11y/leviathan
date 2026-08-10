# Component & Interaction Craft Contract

## Forms
- Labels MUST remain programmatically associated with controls.
- Validation timing must avoid punishing users before useful input is possible.
- Errors identify the field, explain the problem, and provide a correction path.
- Preserve valid input after recoverable errors.
- Required/optional status must be explicit.
- Submit controls show in-flight state and prevent accidental duplicate submission.
- Sensitive actions require appropriate confirmation/re-authentication.

## Buttons and controls
Every interactive control needs visible focus, clear enabled/disabled/loading semantics, an adequate touch target, and feedback appropriate to the action. Disabled controls must not be the only explanation for why an action is unavailable.

## Modals/drawers
Use them only when the interruption is justified. Trap focus correctly, restore focus on close, support Escape where appropriate, prevent background interaction, and preserve deep-link/navigation semantics where needed.

## Toasts/status
Toasts MUST NOT be the only place critical information exists. Important status must remain accessible and discoverable. Use appropriate live-region semantics for dynamic updates.

## Tables/data-dense UI
Define responsive behavior before implementation. Preserve headings/context, support keyboard navigation where needed, provide empty/loading/error states, and avoid forcing users to horizontally scroll for information that can be meaningfully restructured.

## Selection controls
Radio, checkbox, switch, combobox, menu, tabs, and segmented controls must use semantics matching their behavior. Do not use a visually convenient primitive when its interaction model differs from the user's mental model.

## Micro-interactions
Feedback should communicate causality, state change, progress, or hierarchy. Decorative motion is not a substitute for feedback. Avoid animation that delays work, causes layout shift, or competes with the primary task.
