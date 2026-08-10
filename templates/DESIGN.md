# DESIGN.md: Project Design Contract

## Product
- Name:
- Subject:
- Primary audience:
- Primary job of this interface:
- Secondary jobs:

## Information architecture
- Primary navigation:
- Content hierarchy:
- Critical journeys:
- Permission boundaries:

## Aesthetic direction
- Direction name:
- Rationale:
- References/influences:
- Three defaults explicitly rejected or justified:
  1.
  2.
  3.

## Palette
| Token | Value | Semantic role | Contrast intent |
|---|---|---|---|
| color-… | #… | … | … |

## Typography
- Display family:
- Body/UI family:
- Weights:
- Rationale:
- Fallbacks:

## Layout
- Grid/container:
- Spacing scale:
- Responsive breakpoints:
- Compact wireframe:

## Signature element
- Exactly one primary signature device:
- Why it belongs to this product:
- Complexity budget:

## Motion
- Principles:
- Key transitions:
- Reduced-motion behavior:

## Content voice
- Vocabulary:
- CTA style:
- Forbidden generic claims:
- Empty/error/help voice:

## State inventory
| Journey/component | Loading | Empty | Error | Offline | Forbidden | Session expired | Rate limited | Partial/degraded | Optimistic rollback |
|---|---|---|---|---|---|---|---|---|---|

## Accessibility
- Keyboard/focus:
- Screen reader strategy:
- Dynamic announcements:
- Contrast/forced colors:
- Zoom/reflow:
- Touch targets:
- Reduced motion:
- Manual device/screen-reader evidence:

## Sample render gate
- Representative section:
- Real/representative copy:
- Render artifact:
- Reviewer:
- Findings:
- Fixes:
- Approved for broad implementation: [ ]

## Anti-slop self-critique
- Would this look like the default answer to a similar AI brief?
- What was deliberately made different?
- Which decorative elements were removed?
- Which library defaults were changed and why?
- Is the signature element doing real work?

## Verification
- [ ] Tokens locked before broad implementation
- [ ] Sample rendered and reviewed
- [ ] Key states designed
- [ ] Accessibility reviewed
- [ ] Responsive behavior reviewed
- [ ] Anti-slop review completed
- [ ] Evidence attached/linked
- [ ] Known limitations recorded
