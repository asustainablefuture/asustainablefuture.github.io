# ASF Website Agent Notes

## Overview
- Stack: Next.js (App Router) + React
- Content is stored as JSON in `content/` to make edits quick and framework-agnostic.
- Local asset mirror is served from `public/static.wixstatic.com` and `public/static.parastorage.com`.

## Common tasks
- Start dev server: `npm run dev -- --port 4173`
- Run tests: `npm test`
- Re-extract content: `npm run extract` (expects HTML in `source/www.asustainablefuture.org/` or legacy `site/www.asustainablefuture.org/`)

## Content structure
- `content/pages/*.json` — page blocks (HTML and images)
- `content/posts/*.json` + `content/posts/index.json` — blog content
- `content/programs.json` — program cards + challenge page links
- `content/site.json` — navigation + footer metadata

## Routing map
- `/` — home page (renders `content/pages/home.json`)
- `/:slug` — general pages from `content/pages/*.json`
- `/programs` — programs landing page + program grid
- `/challenge-page/:id` — free-access program placeholder
- `/archive` — blog index
- `/archive/categories/:category` — category filter
- `/post/:slug` — blog post detail

## Styling
- Global styles live in `app/globals.css`.
- Fonts are loaded from mirrored Wix font assets (Futura LT + Cormorant Garamond).

## Updating navigation
- Edit `content/site.json` to add/remove nav items or update the footer text.

## Deployment
- GitHub Pages deployment is configured through `.github/workflows/deploy-pages.yml`.
- Static export is enabled in `next.config.mjs` with `output: "export"` and `trailingSlash: true`.
- This config assumes the production site is a root Pages site such as `https://asustainablefuture.github.io/`, not a project site under a subpath.
