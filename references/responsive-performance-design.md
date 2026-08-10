# Responsive, Device & Performance Design Contract

Responsive design MUST describe priority and behavior, not merely add media queries.

## Responsive
- define content-first breakpoints based on layout failure, not device brand lists
- define reflow priorities for navigation, tables, forms, media, and dense content
- test narrow mobile, typical mobile, tablet, laptop, and wide displays as applicable
- account for safe-area insets on edge-to-edge mobile interfaces
- account for virtual keyboard/viewport changes in forms and bottom sheets
- use touch targets appropriate to the platform
- test with real devices for critical flows; simulators/emulators are supplementary
- test zoom/reflow and long text

## Performance
Design choices MUST consider:
- font loading, subsetting, fallback behavior, and layout shift
- responsive image sources, modern formats, dimensions, and lazy loading
- code splitting and route/component loading
- CSS complexity and long main-thread tasks
- animation cost and layout/paint behavior
- caching and invalidation strategy
- server rendering/streaming when it materially improves the experience
- database/API latency behind perceived UI latency

Set measurable budgets appropriate to the product and test on representative devices and networks. Do not claim performance from a fast developer machine alone.

Evidence should include representative device/network measurements, Core Web Vitals where applicable, bundle/image analysis, and documented exceptions.
