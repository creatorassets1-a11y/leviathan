# Search

Apply when the product exposes search, filtering, discovery, or retrieval over user/tenant data.

## Correctness and security
- The authoritative database remains the source of truth.
- Index documents carry tenant/ownership/security metadata sufficient to enforce the same authorization boundary as the source data.
- Never rely solely on client-side filtering to hide another user's or tenant's results.
- Deletions, permission changes, and privacy requests propagate to indexes within the documented consistency window.
- Search input is untrusted: parameterize/filter it and protect against query-language injection, pathological queries, scraping, and denial of service.

## Relevance
Define ranking goals, typo handling, pagination/cursors, filters, stemming/tokenization, language/locale behavior, freshness expectations, and zero-result behavior. Evaluate relevance with representative queries rather than intuition.

## Performance
Index only fields needed for search. Bound result sizes, enforce timeouts, cache safe repeated queries, and measure p50/p95/p99 plus index latency and saturation.

## Evidence
- cross-user/cross-tenant search denial test;
- deleted-object/index propagation test;
- permission-change propagation test;
- injection/pathological-query test;
- pagination consistency test;
- relevance benchmark;
- latency/load measurement;
- indexing failure/retry test.

## Blockers
Block release when search can reveal unauthorized rows/documents, stale deleted private content remains accessible beyond an accepted window, or unbounded queries can materially exhaust resources.