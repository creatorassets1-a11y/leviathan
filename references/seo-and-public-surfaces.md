# SEO, Discoverability & Public Surfaces

Apply when a product has publicly indexed pages, marketing pages, documentation, or shareable content.

## Requirements
- Unique, accurate title and description metadata per indexable page.
- Canonical URLs and intentional redirects; avoid duplicate/indexed parameter variants.
- Sitemap and robots policy reflect the actual desired crawl surface.
- Use semantic headings and meaningful link text. Public pages must meet accessibility and performance requirements.
- Add appropriate structured data only when it truthfully describes visible content.
- Configure Open Graph/social cards without leaking private content.
- Use locale-specific URLs and `hreflang` where multiple public locales exist.
- Keep authentication, account, private tenant, preview, admin, and sensitive search results out of public indexes.
- Protect forms and public APIs from spam and abuse.

## Performance
Public pages should be CDN/cache friendly where safe, ship minimal JS, optimize images/fonts, and meet the project's measured Core Web Vitals/journey budgets.

## Evidence
- crawl/indexability review;
- canonical/redirect/sitemap/robots validation;
- structured-data validation where used;
- social-card preview;
- locale/hreflang test where applicable;
- private-page noindex/access-control test;
- mobile performance/accessibility measurement.

## Blockers
Block release when private data can be indexed, canonicalization creates material duplication, structured data is misleading, or public pages expose secrets/internal URLs.