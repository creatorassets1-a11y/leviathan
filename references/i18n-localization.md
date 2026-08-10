# Internationalization & Localization Contract

When a product targets multiple locales, localization is an engineering requirement, not a translation pass.

Required where applicable:
- locale-aware dates, times, numbers, currencies, units, pluralization, sorting, and search
- no hard-coded user-facing strings in code paths intended for translation
- fallback locale and missing-translation behavior
- text expansion testing (including long German/French strings)
- RTL layout and bidirectional text testing when relevant
- locale-aware validation and legal copy
- timezone and DST handling
- culturally appropriate imagery, examples, terminology, and color assumptions
- translation ownership, review, and versioning

Evidence MUST include representative locale builds or screenshots/tests for every supported locale class, plus RTL evidence when applicable.
