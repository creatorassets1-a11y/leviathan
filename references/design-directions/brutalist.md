# Direction: Brutalist

Structure worn on the outside. Borders, raw type, hard edges, honest hierarchy. Reach
for this for bold small brands, creative tools, event sites, merch stores, and any
audience that rewards confidence over polish. It is loud on purpose; confirm the user
wants loud.

## Feel
Direct, energetic, a little confrontational. Nothing pretends to be a physical object;
everything admits it is a web page. Density is welcome.

## Type
One heavyweight statement face for display (Archivo Black, Space Grotesk Bold,
Bricolage Grotesque, Anton) + one workhorse for body (Space Grotesk, IBM Plex Sans,
Archivo). All-caps display with tight tracking is at home here. Sizes jump in big
steps - skip the polite scale, use 1rem body against 4–7rem display. Underlines are
thick (3–4px).

## Palette
High contrast, few colors: stark white or raw off-white ground, true black ink, and
one shouting accent (safety orange, acid green, signal yellow, klein blue) used in
large flat fields, not slivers. Backgrounds may flood to the accent for whole sections.
No gradients, no glow, no glass. Contrast ratios are easy to hit here; verify anyway.

## Shape & layout
Radius 0. Borders 2–3px solid, everywhere containers exist; visible grid lines are a
feature. Shadows only as hard offsets (4px 4px 0 #000) if at all. The repeated
primitive is the **bordered cell**: the page is a table of unequal cells, each ruled,
some spanning. Marquee strips, oversized numbering (01, 02, 03), and exposed metadata
(dates, coordinates, version numbers) are idiomatic. Buttons look like buttons: bordered,
instant hover inversion.

## Motion
Snappy and mechanical: 150ms, no easing softness (ease-out acceptable, springs are
off-brand), hover states that flip colors instantly, marquees that actually move
(pausable, reduced-motion aware). No parallax, no scroll-jacking.

## Imagery
High-contrast photography, harsh flash aesthetics, cutouts with visible edges, or no
imagery at all - type can carry entire pages. Dithered or posterized treatments unify
mixed sources.

## Traps
Brutalism without hierarchy is just mess: the grid must be rigorous underneath the
noise. And it must stay accessible - focus states extra-visible (this direction does
them proudly), touch targets still 44px, all-caps display text still gets real
`aria-label`s where letterspacing hurts screen readers.
