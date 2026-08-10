# Internationalization and Localization Contract

Internationalization (i18n) is the engineering capability to support multiple languages/locales. Localization (l10n) adapts content, formatting, UX, and policy surfaces to a specific market. This reference prevents English-only architecture from becoming permanent technical debt.

## 1. When this applies

Apply this reference when a product:

- targets more than one language or region;
- displays dates, times, numbers, currencies, addresses, names, or units;
- has user-generated content or internationally distributed users;
- is expected to expand internationally;
- must provide regional legal, privacy, billing, or support surfaces.

Even an English-only MVP should externalize user-facing strings and use locale-aware formatting so adding another locale remains low-cost.

## 2. String architecture

- Externalize all user-facing strings from application components, templates, validation messages, emails, notifications, and transactional UI.
- Use a maintained i18n/message-format library appropriate to the chosen stack.
- Store source catalogs in structured, version-controlled files.
- Never expose raw translation keys to users.
- Use interpolation/message formatting rather than sentence concatenation.
- Keep translator context, descriptions, placeholders, and character limits where helpful.
- Version catalogs with the application so releases do not silently mix incompatible strings.
- Define fallback behavior to the source locale when a translation is missing.
- Do not embed customer-visible text inside images.

## 3. Locale-aware formatting

Use locale-aware APIs/libraries for:

- dates and times;
- time zones and relative time;
- numbers and decimal separators;
- currencies and minor units;
- percentages;
- lists;
- plurals and grammatical gender where required;
- units and measurements;
- addresses and postal formats;
- names where cultural ordering differs.

Never hard-code separators, currency symbols, date layouts, or plural suffixes for an international product.

## 4. Locale model and persistence

Represent locale as language plus region when the distinction matters, for example `en-GB` versus `en-US`.

A sensible selection order is:

1. explicit user preference;
2. account/organization preference;
3. supported browser/OS locale;
4. product default.

Persist the user's explicit choice and make it easy to change. Do not infer a permanent preference from IP address alone.

Set correct HTML `lang` and `dir` attributes for every rendered locale.

## 5. RTL and layout resilience

If an RTL locale is in scope:

- use logical CSS properties rather than left/right assumptions;
- test navigation, forms, tables, dialogs, charts, icons, and menus in RTL;
- mirror directional controls where meaning requires it, but do not blindly mirror brand/logotype imagery;
- verify mixed RTL/LTR text, numbers, URLs, and code snippets;
- test keyboard focus and screen-reader behavior in RTL.

Design layouts for translated strings that are materially longer or shorter than English. Avoid fixed-width controls and brittle truncation.

## 6. Translation workflow

Use a repeatable pipeline:

`extract -> contextualize -> translate -> review -> automated checks -> release -> monitor`

Customer-facing legal, billing, safety, and support content should receive qualified human review when accuracy is material. Machine translation may assist drafting but must not be treated as automatic legal or safety correctness.

Required workflow controls:

- untranslated-string detection;
- placeholder consistency checks;
- catalog schema validation;
- duplicate/missing key detection;
- translation versioning;
- fallback behavior;
- review ownership.

## 7. Regional UX and legal overlap

Localization is more than language. Consider, where relevant:

- payment methods and currency;
- tax display;
- address and phone formats;
- business identifiers;
- units and measurement conventions;
- holidays/business hours;
- cultural imagery and terminology;
- privacy/cookie consent language;
- Terms, refund, accessibility, and support translations;
- market-specific restrictions and disclosures.

The authoritative-language rule for legal text must be explicit. A translation must never silently alter the legal meaning of the authoritative version.

## 8. Performance and delivery

Do not ship every locale catalog to every user unnecessarily. Lazy-load or route-split catalogs where appropriate. Cache immutable catalogs safely and invalidate them with releases.

For public indexed sites, use locale-aware URLs and `hreflang`/canonical metadata where appropriate. Do not generate duplicate SEO pages without a deliberate localization strategy.

## 9. Evidence and release gates

For R2+ products with a UI, require:

- all user-facing strings externalized or an explicit, time-limited exception;
- locale-aware date/number/currency formatting;
- no raw translation keys in rendered journeys;
- source-locale critical journeys working;
- at least one additional locale loading correctly when internationalization is in scope;
- language selection persistence;
- long-string layout test;
- RTL test when an RTL locale is supported;
- legal/support surfaces translated or clearly marked with the authoritative language;
- correct `lang`/`dir` attributes;
- translation catalogs validated in CI where tooling exists.

Recommended evidence IDs: `I18N-001` string externalization, `I18N-002` locale formatting, `I18N-003` catalog/fallback, `I18N-004` switcher persistence, `I18N-005` long strings, `I18N-006` RTL, `I18N-007` legal/support localization.

## 10. Progressive implementation

**Phase 0:** externalize strings, use locale-aware formatting, UTF-8, and a stable message system.

**Phase 1:** add the highest-value locales, translation review, persistence, and localized legal/support content.

**Phase 2:** add RTL, regional variants, advanced plural/gender handling, locale-specific URLs/SEO, and deeper cultural adaptation when justified.

Never add a complex translation platform solely for hypothetical future scale. Record the reason when infrastructure complexity is introduced.
