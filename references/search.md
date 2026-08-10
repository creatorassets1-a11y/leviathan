# Search Systems

Apply when the product exposes search, filtering, discovery, or indexed retrieval.

## Architecture

Define the source of truth, indexing pipeline, searchable fields, tokenization/normalization, ranking strategy, freshness target, deletion propagation, and failure behavior. Keep authoritative authorization in the database/application boundary; the search index is not a permission boundary.

For multi-tenant data, every indexed document must carry an authorization scope that is enforced before results are returned. Prefer server-side tenant filters or isolated indexes where appropriate. Never trust a client-supplied tenant/user filter as the only isolation control.

## Relevance

Define representative queries, expected results, typo handling, stemming/language behavior, synonyms, ranking signals, pagination, and zero-result UX. Evaluate ranking changes against a versioned test set instead of relying on intuition.

## Freshness and deletion

Use an idempotent indexer. Handle create/update/delete events, retries, duplicates, out-of-order events, and rebuilds. Deletion requests must propagate to indexes and caches according to the privacy retention contract. Provide a rebuild/reconciliation procedure that can detect index drift.

## Performance

Use bounded result sets and cursor pagination where appropriate. Measure query latency percentiles, index size, ingestion lag, cache hit rate, and resource saturation. Avoid expensive wildcard/fuzzy behavior without quotas and limits.

## Evidence: SEARCH-* probes

- **SEARCH-001 authorization:** attempt cross-user/cross-tenant searches and prove no unauthorized result or snippet leakage.
- **SEARCH-002 ranking:** execute the representative relevance set and record expected/observed results.
- **SEARCH-003 freshness:** change a record and measure documented index propagation time.
- **SEARCH-004 deletion:** delete a test record and verify it disappears from the index, cache, and UI.
- **SEARCH-005 rebuild:** execute or simulate a rebuild and verify idempotency and consistency with the source of truth.
- **SEARCH-006 abuse:** exercise expensive queries, pagination limits, and rate limits.
- **SEARCH-007 failure:** force index/provider failure and verify degraded behavior rather than silent data corruption.
- **SEARCH-008 performance:** record p50/p95 latency and ingestion lag under representative load.

## Release blockers

Block when the search index can return another tenant's data, deletion does not propagate as required, ranking/queries can exhaust resources without limits, or search is treated as authoritative for security/financial state.
