# Release Communication & Changelog

Canonical contract for communicating material product changes to users and operators.

## Release records

Maintain a human-readable changelog or release-note source with version/date, affected product areas, user impact, migration/action required, billing impact, breaking changes, deprecations, security/privacy changes where disclosure is appropriate, and support links.

Do not fabricate features, performance claims, customer counts, certifications, awards, or compatibility statements. Release notes describe shipped behavior, not aspirations.

## Audience and channels

Choose channels based on impact: in-app notices, email, dashboard/banner, status page, documentation, or direct communication. Security, billing, privacy, and breaking changes may require stronger notification than ordinary UI changes.

Respect locale, accessibility, notification preferences, and quiet hours where applicable. Marketing consent does not determine whether a legally/operationally required service notice may be sent.

## Deprecations and migrations

For breaking changes provide notice period where appropriate, migration instructions, compatibility window, owner, deadline, and fallback. Coordinate application release notes with database migrations, APIs, SDKs, feature flags, translations, legal pages, and support documentation.

## Evidence: REL-* probes

- **REL-001 accuracy:** compare release notes with the actual shipped diff/build and verify no unsupported claim.
- **REL-002 impact:** verify material billing/privacy/security/breaking changes are surfaced through the appropriate channel.
- **REL-003 accessibility/i18n:** verify public release notes render accessibly and in supported locales where promised.
- **REL-004 deprecation:** exercise the documented migration path and deadline behavior.
- **REL-005 consistency:** verify Help/FAQ, legal pages, translations, and product copy are updated for material changes.

## Release blockers

Block when a breaking or material billing/privacy/security change has no required communication path, or release notes make claims not supported by evidence.
