# SEO & Public Surfaces

Apply to publicly indexed websites, marketing pages, documentation, public profiles, or any product where discoverability matters.

## Technical SEO

Every indexable page has an intentional title, description, canonical URL, language metadata, and meaningful heading structure. Generate `sitemap.xml` and `robots.txt` intentionally. Use `hreflang`/locale URLs when multiple indexable locales exist. Avoid duplicate parameterized URLs and accidental staging/index pages.

Structured data is added only when the content actually qualifies for the schema. Do not fabricate reviews, ratings, prices, availability, organizations, or claims to manipulate search results.

## Public-page quality

Public pages must be usable on mobile, keyboard accessible, fast under realistic network conditions, and resilient when analytics or third-party scripts fail. Avoid shipping unnecessary client JavaScript for static content.

Social sharing metadata (Open Graph/Twitter-compatible metadata where relevant) must match the page. Images should have appropriate dimensions, alt behavior, and licensing/provenance.

## Privacy and security

Do not put private user data, tenant identifiers, secrets, internal IDs with security significance, or authorization decisions into public metadata, URLs, structured data, or server-rendered HTML. Public search indexing must be explicit for user-generated content.

Respect deletion and privacy requests by removing public pages, indexes, caches, and generated metadata as required. Avoid analytics that silently bypass consent.

## Evidence: SEO-* probes

- **SEO-001 metadata:** inspect representative public pages for title, description, canonical, language, and heading structure.
- **SEO-002 crawl:** verify sitemap/robots behavior and that private/staging pages are not indexed.
- **SEO-003 locale:** verify hreflang/locale URLs and no conflicting canonicals where applicable.
- **SEO-004 structured data:** validate schema and prove every claim is backed by actual page content.
- **SEO-005 performance:** record public-page Core Web Vitals or equivalent journey measurements under realistic conditions.
- **SEO-006 accessibility:** run the representative keyboard/semantic checks.
- **SEO-007 privacy:** inspect rendered HTML, metadata, analytics, and URLs for private data.
- **SEO-008 social cards:** verify representative share previews and image dimensions/content.

## Release blockers

Block when private pages are indexable, structured data contains fabricated claims, canonical/locale routing causes material duplication, or public surfaces leak sensitive data.
