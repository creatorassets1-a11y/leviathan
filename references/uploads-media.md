# Uploads & Untrusted Media Contract

Treat every uploaded file as hostile input.

Required where uploads exist:
- enforce server-side size, extension, MIME and content validation
- do not trust Content-Type or filename
- sanitize filenames and prevent path traversal
- private storage by default; signed, scoped URLs for access
- malware scanning when risk warrants it
- quotas and rate limits per user/tenant/IP as appropriate
- safe image decoding/re-encoding and metadata stripping when appropriate
- content-disposition and download handling that prevents browser execution
- authorization checks on every object read/write/delete
- lifecycle, retention, and deletion rules

Evidence MUST demonstrate unauthorized object access is denied, oversize/invalid files are rejected, storage is not unintentionally public, and limits are actually exercised.
