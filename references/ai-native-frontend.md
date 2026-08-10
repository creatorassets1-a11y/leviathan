# AI-Native Frontend Contract

When the interface itself contains AI behavior, design the uncertainty and control surface explicitly.

Required where applicable:
- streaming output with cancellation and accessible progress/status announcements
- clear separation between generated content, user content, and verified application state
- uncertainty/confidence communication when it improves decisions without pretending to provide calibrated certainty
- per-item edit, reject, regenerate, undo, and retry controls where useful
- visible explanation of what context/data the AI can access
- visible indication of tools/actions the AI may invoke when consequential
- optimistic actions with rollback and clear partial-failure recovery
- rate, token, latency, and spend feedback/limits appropriate to the product
- graceful provider timeout/outage behavior
- human confirmation before irreversible, financial, privacy-sensitive, or high-impact actions

Never make a model-generated answer look indistinguishable from a verified system fact when that distinction matters to the user's decision.
