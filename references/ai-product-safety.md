# AI Product UX & Safety Contract

When the product itself uses AI, treat the model and its tools as untrusted decision components.

Required where applicable:
- accessible streaming output and cancellation
- clear distinction between generated content and verified system facts
- uncertainty/confidence signals when meaningful
- edit, reject, regenerate, and undo controls
- explicit disclosure of data visible to the model
- explicit tool permissions and least privilege
- per-user/tenant rate, token, latency, and spend limits
- prompt-injection and indirect-injection tests
- retrieval cross-tenant isolation tests
- tool authorization tests independent of model instructions
- human confirmation for irreversible/high-impact actions
- audit trail for consequential model actions
- fallback behavior when the model/provider is unavailable

Never treat a system prompt as a security boundary. Server-side authorization must independently enforce every sensitive operation.
