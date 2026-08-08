# ASF Website (Next.js)

React/Next.js rebuild of the A Sustainable Future site using locally stored Wix assets and extracted content blocks. Pages render from JSON in `content/` to keep edits simple.

The Oregon-focused public site is deployed from this repository to <https://www.asustainablefuture.org/> with GitHub Pages. The earlier Wix-era text and routes remain in `content/`; locally mirrored media is preferred, with the original Wix CDN used only when an archived image variant is not present in `public/`.

## Quick start

```bash
npm install
npm run dev -- --port 4173
```

Open `http://127.0.0.1:4173`.

## Content updates

```bash
npm run extract
```

`extract` expects the original HTML to live in `source/www.asustainablefuture.org/` (or the legacy `site/www.asustainablefuture.org/`). It outputs:

- `content/pages/*.json` — page blocks (HTML + images)
- `content/posts/*.json` — blog posts
- `content/posts/index.json` — post index

Site-wide navigation and footer content live in `content/site.json`.

## Programs

Program cards are sourced from `content/programs.json`. Each `challenge-page` route renders a free-access placeholder until full materials are provided.

## Tests

```bash
npm test
```

Playwright uses the system Chromium at `/usr/bin/chromium` and boots `npm run dev -- --port 4173`.

## Project layout

- `app/` — Next.js App Router pages and layout
- `components/` — shared React components
- `lib/` — content loaders + helpers
- `content/` — extracted JSON content
- `public/` — downloaded assets from `static.wixstatic.com` and `static.parastorage.com`
- `scripts/extract-content.mjs` — HTML → JSON extractor
- `tests/` — Playwright smoke tests
