# Stack: Static HTML/CSS/JS

For landing pages, marketing sites, portfolios, local-business sites. Fastest,
cheapest, nearly unhackable, trivial to host. Honest downside stated at the interview:
adding accounts later means a rebuild.

## Structure

```
site/
├── index.html
├── about.html … contact.html … 404.html
├── legal/ (privacy.html, terms.html, cookies.html)
├── css/main.css          # design tokens as CSS custom properties at :root
├── js/main.js            # progressive enhancement only
├── img/                  # AVIF/WebP + fallbacks, all with width/height
├── fonts/                # self-hosted, subset, woff2
├── favicon set + site.webmanifest + robots.txt + sitemap.xml
```

No build step unless the project earns one. If it grows past ~5 pages of shared
header/footer, introduce a minimal build (Astro is the graduation path, or an
11ty-class templater) rather than copy-pasting partials - duplicated headers drift.

## Rules

- **Tokens as custom properties.** Everything in DESIGN.md becomes `--color-*`,
  `--space-*`, `--radius-*`, `--dur-*` on `:root`. Styles reference variables only;
  a hardcoded hex in a rule is a build error (token-to-DOM).
- **Semantic first.** Landmarks (`header/nav/main/footer`), one `h1` per page, real
  `<button>`/`<a>` semantics, labels tied to inputs, skip-to-content link. This is
  most of WCAG for free.
- **JS is enhancement.** The site works with JS disabled: navigation, content, and the
  contact form (native POST to the form backend) all function. JS adds polish, never
  gatekeeps content.
- **Contact form.** A static site still needs a working form: use a form backend
  (Formspree-class or a tiny serverless function), honeypot + time-trap spam
  protection, a visible success/failure state, and a real reply-to address.
- **Media.** AVIF/WebP with explicit `width`/`height` (kills CLS), `loading="lazy"`
  below the fold, hero image preloaded and < 100KB, `<picture>` for art direction.
- **Meta floor per page.** Title, description, canonical, OG/Twitter tags, favicon
  set, structured data where it fits (LocalBusiness, Product, Article).

## Hosting & headers

Deploy to static hosting (Cloudflare Pages, Netlify, Vercel, GitHub Pages behind
Cloudflare). Security headers still apply on static sites - set via `_headers` /
platform config: CSP (strict; no inline scripts means this is easy), HSTS,
X-Content-Type-Options, Referrer-Policy, frame-ancestors. HTTPS with redirect is
platform-default; verify it.

Analytics: privacy-respecting script (Plausible/Umami class) or none. A static
brochure site with no tracking may legitimately need no cookie banner at all - say so,
it delights users.

## Performance

This stack should embarrass the budgets: LCP well under 1.5s, CLS ~0, INP trivially
green. If a static site misses a budget, something specific is wrong (unoptimized
hero, font payload, third-party script) - find it, don't accept it.
