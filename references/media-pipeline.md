# File & Media Pipelines

Canonical contract for uploads that require processing, variants, scanning, CDN delivery, or long-term storage.

## Pipeline

Use an explicit pipeline such as `RECEIVED -> QUARANTINED -> VALIDATED -> SCANNED -> PROCESSED -> PUBLISHED`, with failure/retry states. Never make an untrusted upload immediately public before required validation/scanning.

Validate size, extension, detected content type, dimensions, archive structure, and business limits server-side. Sanitize filenames and object keys. Prevent path traversal, decompression bombs, malicious active formats, and resource exhaustion. Re-encode images where practical to strip metadata and normalize content.

## Storage and delivery

Private by default. Authorize every object read/write/delete against the owning principal/tenant. Use short-lived signed URLs or an authenticated proxy for private content. CDN caches must not turn private objects into public content; purge/invalidate on replacement/deletion where necessary.

Generate variants asynchronously with bounded CPU/memory/time and idempotent processing. Store source and derived object relationships so deletion and retention can traverse them.

## Scanning

Use malware/content scanning when the risk tier or file type warrants it. Treat scan results as untrusted input too. Quarantine failed or unknown files. Do not rely on filename or browser `Content-Type` as proof of safety.

## Retention

Apply privacy and product retention rules to originals, derivatives, thumbnails, temporary processing files, failed uploads, quarantine storage, CDN caches, and backups. Track legal holds where applicable.

## Evidence: MEDIA-* probes

- **MEDIA-001 validation:** test oversize, wrong type, malformed, active, archive, and traversal payloads.
- **MEDIA-002 private storage:** verify uploaded objects are not anonymously listable/readable when private.
- **MEDIA-003 authorization:** attempt cross-user/tenant object operations and prove denial.
- **MEDIA-004 scan/quarantine:** submit a controlled malicious-test signature or fixture and verify quarantine/blocked publication where scanning is required.
- **MEDIA-005 processing:** force a processor failure and verify retry/DLQ behavior without duplicate variants.
- **MEDIA-006 CDN:** verify private signed delivery and invalidation on deletion/replacement.
- **MEDIA-007 retention:** verify expiry/deletion covers source, variants, temporary files, indexes, and caches.
- **MEDIA-008 abuse:** exercise upload quotas and processing-cost limits.

## Release blockers

Block when untrusted media is public before required checks, private objects are accessible cross-tenant, processing can be abused without resource limits, or deletion leaves known public derivatives contrary to the retention contract.
