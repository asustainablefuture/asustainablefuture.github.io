import fs from "fs/promises";
import path from "path";

const ROOT = process.cwd();
const SITE_DIR = path.join(ROOT, "site");
const DATA_DIR = path.join(ROOT, "data");

const SITEMAPS = [
  "https://www.asustainablefuture.org/pages-sitemap.xml",
  "https://www.asustainablefuture.org/blog-posts-sitemap.xml",
  "https://www.asustainablefuture.org/blog-categories-sitemap.xml",
];
const PAID_PROGRAMS_SITEMAP =
  "https://www.asustainablefuture.org/online-programs-sitemap.xml";

const ASSET_HOSTS = new Set([
  "static.wixstatic.com",
  "static.parastorage.com",
  "www-asustainablefuture-org.filesusr.com",
]);

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

function extractLocs(xml) {
  const locs = [];
  const regex = /<loc>([^<]+)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml))) {
    locs.push(match[1].trim());
  }
  return locs;
}

function extractProgramEntries(xml) {
  const entries = [];
  const urlRegex = /<url>([\s\S]*?)<\/url>/g;
  let match;
  while ((match = urlRegex.exec(xml))) {
    const block = match[1];
    const locMatch = block.match(/<loc>([^<]+)<\/loc>/);
    if (!locMatch) continue;
    const imageMatch = block.match(/<image:loc>([^<]+)<\/image:loc>/);
    entries.push({
      url: locMatch[1].trim(),
      image: imageMatch ? imageMatch[1].trim() : null,
    });
  }
  return entries;
}

function normalizeCandidate(raw, baseUrl) {
  if (!raw) return null;
  let value = raw.trim().replace(/^['"]|['"]$/g, "");
  if (!value) return null;
  if (value.startsWith("data:")) return null;
  if (value.startsWith("mailto:") || value.startsWith("tel:")) return null;
  if (value.startsWith("#")) return null;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("http://") || value.startsWith("https://")) return value;
  if (value.startsWith("/")) {
    if (!baseUrl) return null;
    return new URL(value, baseUrl).href;
  }
  return null;
}

function extractAssetUrls(html, baseUrl) {
  const urls = new Set();
  const attrRegex = /(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi;
  const urlFnRegex = /url\(([^)]+)\)/gi;

  let match;
  while ((match = attrRegex.exec(html))) {
    const candidate = normalizeCandidate(match[1], baseUrl);
    if (candidate) urls.add(candidate);
  }

  while ((match = urlFnRegex.exec(html))) {
    const candidate = normalizeCandidate(match[1], baseUrl);
    if (candidate) urls.add(candidate);
  }

  return urls;
}

function urlToFilePath(url) {
  const parsed = new URL(url);
  const host = parsed.host;
  let pathname = decodeURIComponent(parsed.pathname);
  if (!pathname || pathname === "/") {
    return path.join(SITE_DIR, host, "index.html");
  }
  if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  } else if (!path.extname(pathname)) {
    pathname = `${pathname}/index.html`;
  }
  const cleanPath = pathname.replace(/^\/+/, "");
  return path.join(SITE_DIR, host, cleanPath);
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function downloadAsset(assetUrl) {
  const parsed = new URL(assetUrl);
  if (!ASSET_HOSTS.has(parsed.host)) return;
  let pathname = decodeURIComponent(parsed.pathname);
  if (pathname.endsWith("/")) {
    pathname = `${pathname}index.html`;
  }
  const cleanPath = pathname.replace(/^\/+/, "");
  const destPath = path.join(SITE_DIR, parsed.host, cleanPath);
  if (await fileExists(destPath)) return;

  await ensureDir(path.dirname(destPath));
  const res = await fetch(assetUrl);
  if (!res.ok) {
    console.warn(`Skipping asset ${assetUrl}: ${res.status}`);
    return;
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(destPath, buffer);
}

function rewriteHtml(html) {
  const replacements = [
    ["https://static.wixstatic.com", "/static.wixstatic.com"],
    ["http://static.wixstatic.com", "/static.wixstatic.com"],
    ["//static.wixstatic.com", "/static.wixstatic.com"],
    ["https://static.wixstatic.com/", "/static.wixstatic.com/"],
    ["http://static.wixstatic.com/", "/static.wixstatic.com/"],
    ["//static.wixstatic.com/", "/static.wixstatic.com/"],
    ["https://static.parastorage.com", "/static.parastorage.com"],
    ["http://static.parastorage.com", "/static.parastorage.com"],
    ["//static.parastorage.com", "/static.parastorage.com"],
    ["https://static.parastorage.com/", "/static.parastorage.com/"],
    ["http://static.parastorage.com/", "/static.parastorage.com/"],
    ["//static.parastorage.com/", "/static.parastorage.com/"],
    [
      "https://www-asustainablefuture-org.filesusr.com",
      "/www-asustainablefuture-org.filesusr.com",
    ],
    [
      "http://www-asustainablefuture-org.filesusr.com",
      "/www-asustainablefuture-org.filesusr.com",
    ],
    [
      "//www-asustainablefuture-org.filesusr.com",
      "/www-asustainablefuture-org.filesusr.com",
    ],
    [
      "https://www-asustainablefuture-org.filesusr.com/",
      "/www-asustainablefuture-org.filesusr.com/",
    ],
    [
      "http://www-asustainablefuture-org.filesusr.com/",
      "/www-asustainablefuture-org.filesusr.com/",
    ],
    ["//www-asustainablefuture-org.filesusr.com/", "/www-asustainablefuture-org.filesusr.com/"],
  ];

  let output = html;
  for (const [from, to] of replacements) {
    output = output.split(from).join(to);
  }

  output = output.replace(/https?:\/\/www\.asustainablefuture\.org\//g, "/");
  output = output.replace(/https?:\/\/asustainablefuture\.org\//g, "/");
  output = output.replace(/https?:\/\/www\.asustainablefuture\.org\b/g, "/");
  output = output.replace(/https?:\/\/asustainablefuture\.org\b/g, "/");

  output = output.replace(
    /(["'])\/_api\//g,
    '$1https://www.asustainablefuture.org/_api/'
  );

  return output;
}

function localizeAssetUrl(url) {
  if (!url) return "";
  return rewriteHtml(url);
}

function placeholderHtml(title) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title} | A Sustainable Future</title>
    <style>
      :root {
        color-scheme: light;
      }
      body {
        margin: 0;
        font-family: "futura-lt-w01-light", "helvetica-w01-roman", Arial, sans-serif;
        background: #f6f0e7;
        color: #2f3d2f;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 48px 24px;
        text-align: center;
      }
      .card {
        max-width: 720px;
        background: #fffdf8;
        border: 1px solid #d8d1c6;
        box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
        padding: 48px;
      }
      h1 {
        font-family: "cormorant garamond", "cormorantgaramond-light", serif;
        font-size: 42px;
        margin: 0 0 12px;
      }
      p {
        margin: 0 0 18px;
        font-size: 18px;
        line-height: 1.6;
      }
      a {
        color: inherit;
        text-decoration: underline;
      }
      .badge {
        display: inline-block;
        padding: 6px 14px;
        border-radius: 999px;
        border: 1px solid #2f3d2f;
        font-size: 14px;
        text-transform: uppercase;
        letter-spacing: 0.12em;
      }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="badge">Now Free</div>
      <h1>${title}</h1>
      <p>This program is now free to join.</p>
      <p>Program materials will be added here once you provide them.</p>
      <p><a href="/">Return to the main site</a></p>
    </div>
  </body>
</html>`;
}

async function main() {
  await ensureDir(SITE_DIR);
  await ensureDir(DATA_DIR);

  const urlSet = new Set();
  for (const sitemap of SITEMAPS) {
    const xml = await fetchText(sitemap);
    for (const loc of extractLocs(xml)) {
      if (loc.includes("/challenge-page/")) continue;
      urlSet.add(loc);
    }
  }

  const paidXml = await fetchText(PAID_PROGRAMS_SITEMAP);
  const paidEntries = extractProgramEntries(paidXml).filter((entry) =>
    entry.url.includes("/challenge-page/")
  );
  const paidPrograms = paidEntries.map((entry) => entry.url);

  urlSet.add("https://www.asustainablefuture.org");

  const urls = Array.from(urlSet).sort();
  await fs.writeFile(path.join(DATA_DIR, "urls.txt"), `${urls.join("\n")}\n`);
  await fs.writeFile(
    path.join(DATA_DIR, "paid-programs.txt"),
    `${paidPrograms.join("\n")}\n`
  );
  await fs.writeFile(
    path.join(DATA_DIR, "paid-programs.json"),
    `${JSON.stringify(paidEntries, null, 2)}\n`
  );

  const assetUrls = new Set();

  for (const url of urls) {
    console.log(`Fetching ${url}`);
    const html = await fetchText(url);
    const rewritten = rewriteHtml(html);
    const outPath = urlToFilePath(url);
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, rewritten);

    const assets = extractAssetUrls(html, url);
    for (const assetUrl of assets) {
      try {
        const parsed = new URL(assetUrl);
        if (ASSET_HOSTS.has(parsed.host)) {
          assetUrls.add(assetUrl);
        }
      } catch {
        // ignore invalid URLs
      }
    }
  }

  console.log(`Downloading ${assetUrls.size} assets`);
  for (const assetUrl of assetUrls) {
    await downloadAsset(assetUrl);
  }

  for (const entry of paidEntries) {
    if (entry.image) {
      assetUrls.add(entry.image);
      await downloadAsset(entry.image);
    }
  }

  for (const programUrl of paidPrograms) {
    const outPath = urlToFilePath(programUrl);
    await ensureDir(path.dirname(outPath));
    const slug = new URL(programUrl).pathname.split("/").filter(Boolean).pop();
    const title = `Program ${slug ?? ""}`.trim();
    await fs.writeFile(outPath, placeholderHtml(title));
  }

  const programsPath = path.join(
    SITE_DIR,
    "www.asustainablefuture.org",
    "programs",
    "index.html"
  );
  if (await fileExists(programsPath)) {
    let programsHtml = await fs.readFile(programsPath, "utf8");
    const cards = paidEntries
      .map((entry, index) => {
        const slug = new URL(entry.url).pathname;
        const title = `ASF Program ${index + 1}`;
        const image = entry.image ? localizeAssetUrl(entry.image) : "";
        const imageStyle = image
          ? `style=\"background-image:url('${image}')\"`
          : "";
        return `<a class=\"asf-program-card\" href=\"${slug}\">
  <div class=\"asf-program-image\" ${imageStyle}></div>
  <div class=\"asf-program-body\">
    <h3>${title}</h3>
    <p>Now free to join. Program details will be added once provided.</p>
    <span class=\"asf-program-tag\">Free</span>
  </div>
</a>`;
      })
      .join("\n");

    const customStyles = `
<style id="asf-programs-free">
  #TPASection_l7l6kicq { display: none !important; }
  .asf-programs-free {
    padding: 64px 24px;
    background: #f6f0e7;
    color: #2f3d2f;
    text-align: center;
  }
  .asf-programs-free h2 {
    font-family: "cormorant garamond", "cormorantgaramond-light", serif;
    font-size: 46px;
    margin: 0 0 12px;
  }
  .asf-programs-free p {
    margin: 0 auto 32px;
    max-width: 720px;
    font-size: 18px;
    line-height: 1.6;
    font-family: "futura-lt-w01-light", "helvetica-w01-roman", Arial, sans-serif;
  }
  .asf-program-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    max-width: 1100px;
    margin: 0 auto;
  }
  .asf-program-card {
    text-decoration: none;
    color: inherit;
    background: #fffdf8;
    border: 1px solid #d8d1c6;
    box-shadow: 0 14px 30px rgba(0, 0, 0, 0.08);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .asf-program-image {
    min-height: 180px;
    background-size: cover;
    background-position: center;
  }
  .asf-program-body {
    padding: 24px;
    text-align: left;
  }
  .asf-program-body h3 {
    margin: 0 0 8px;
    font-size: 22px;
    font-family: "cormorant garamond", "cormorantgaramond-light", serif;
  }
  .asf-program-body p {
    margin: 0 0 16px;
    font-size: 16px;
    line-height: 1.5;
  }
  .asf-program-tag {
    display: inline-block;
    padding: 6px 12px;
    border-radius: 999px;
    border: 1px solid #2f3d2f;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.12em;
  }
</style>`;

    const freeSection = `
<section class="asf-programs-free">
  <h2>All Programs Are Free</h2>
  <p>We have removed paywalls across the ASF Network. Browse the free programs below. Detailed program content will be added once you share the paid materials.</p>
  <div class="asf-program-grid">
    ${cards}
  </div>
</section>
`;

    if (!programsHtml.includes("asf-programs-free")) {
      programsHtml = programsHtml.replace("</head>", `${customStyles}\n</head>`);
      programsHtml = programsHtml.replace(
        '<section id="comp-lce1t1ma"',
        `${freeSection}\n<section id="comp-lce1t1ma"`
      );
      await fs.writeFile(programsPath, programsHtml);
    }
  }

  console.log("Mirror complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
