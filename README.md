# ASF Website Clone

Static mirror of `asustainablefuture.org` with local assets, a lightweight server, and Playwright smoke tests. Paid program pages are stubbed as free placeholders until the full materials are provided.

## Quick start

```bash
npm install
npm run serve
```

Open `http://127.0.0.1:4173`.

## Refresh the mirror

```bash
npm run mirror
```

This pulls the latest pages listed in the public sitemaps, downloads assets into `site/`, and regenerates paid program placeholders + the free programs banner.

## Tests

```bash
npm test
```

Playwright uses the system Chromium at `/usr/bin/chromium`.

## Project layout

- `site/` — mirrored HTML and downloaded assets.
- `data/urls.txt` — pages pulled from sitemaps.
- `data/paid-programs.json` — paid program URLs + images (used for free placeholders).
- `scripts/mirror.mjs` — mirroring and post-processing pipeline.
- `server.js` — minimal static server.
- `tests/` — Playwright smoke tests.
