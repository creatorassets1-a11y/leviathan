# File & Media Pipeline

This extends upload security into production processing, delivery, lifecycle, and cost control.

## Pipeline
Prefer: upload → quarantine/private storage → validation/scanning → metadata extraction → safe transformation/re-encoding → durable object → CDN/signed delivery. Never expose a newly uploaded object publicly before validation when risk warrants quarantine.

Validate size, content/signature, dimensions, codecs, archive behavior, filename/path, and declared type. Treat client metadata as untrusted. Apply quotas and rate limits. Scan malware where the risk tier/type warrants it. Strip unnecessary EXIF/location metadata from images where appropriate.

## Processing
Workers must be idempotent and bounded. Generate required thumbnails/transcodes/variants asynchronously. Prevent decompression bombs, zip bombs, resource exhaustion, unsafe active content, and parser vulnerabilities. Record processing version so variants can be reproduced.

## Delivery
Private objects use short-lived signed URLs or authenticated proxying. Public assets use immutable/versioned URLs where possible. Never construct filesystem paths directly from user input. Enforce object-level authorization at download time when content is private.

## Lifecycle/privacy
Define retention and deletion propagation for originals, variants, thumbnails, temporary files, CDN caches, search indexes, backups, and provider copies. Data export/deletion must account for all derived media.

## Evidence
- invalid/malicious/oversized type rejection;
- path traversal test;
- private-object cross-user access denial;
- signed URL expiry test;
- scan/quarantine test where applicable;
- image metadata stripping/re-encoding test;
- worker retry/idempotency test;
- deletion propagation test;
- CDN/cache invalidation test;
- quota/rate-limit exercise.

## Blockers
Block production when private media is publicly enumerable, untrusted content reaches dangerous parsers without controls, or deletion/retention semantics omit durable derived copies.