import fs from "fs/promises";
import path from "path";
import * as cheerio from "cheerio";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
let SOURCE_DIR = path.join(ROOT, "source", "www.asustainablefuture.org");
const OUT_DIR = path.join(ROOT, "content");
const PAGE_DIR = path.join(OUT_DIR, "pages");
const POST_DIR = path.join(OUT_DIR, "posts");

const SKIP_PREFIXES = ["post", "challenge-page", "archive"];

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function exists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function walkIndexFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walkIndexFiles(fullPath)));
    } else if (entry.isFile() && entry.name === "index.html") {
      files.push(fullPath);
    }
  }
  return files;
}

function normalizeText(text) {
  return text.replace(/\s+/g, " ").trim();
}

function sanitizeFragment(fragment) {
  const $ = cheerio.load(`<div>${fragment}</div>`);
  $("script, style, iframe").remove();
  $("span").each((_, el) => {
    const html = $(el).html();
    if (html) {
      $(el).replaceWith(html);
    } else {
      $(el).remove();
    }
  });

  $("wow-image").each((_, el) => {
    const img = $(el).find("img").first();
    if (!img.length) {
      $(el).remove();
      return;
    }
    const pin = img.attr("data-pin-media") || img.attr("data-pin-url");
    if (pin) img.attr("src", pin);
    img.removeAttr("srcset");
    img.removeAttr("sizes");
    img.removeAttr("data-pin-media");
    img.removeAttr("data-pin-url");
    $(el).replaceWith(img);
  });

  $("img").each((_, el) => {
    const img = $(el);
    const pin = img.attr("data-pin-media") || img.attr("data-pin-url");
    if (pin) img.attr("src", pin);
    img.removeAttr("srcset");
    img.removeAttr("sizes");
    img.removeAttr("data-pin-media");
    img.removeAttr("data-pin-url");
    img.removeAttr("class");
    img.removeAttr("style");
  });

  $("*").each((_, el) => {
    const attribs = el.attribs || {};
    for (const name of Object.keys(attribs)) {
      if (name.startsWith("data-")) delete attribs[name];
      if (name === "class" || name === "style" || name === "id") delete attribs[name];
    }
  });

  const html = $("div").first().html() || "";
  return html.trim();
}

function extractBackgroundImage(styleValue) {
  const match = /background-image:\s*url\(["']?([^"')]+)["']?\)/i.exec(
    styleValue || ""
  );
  return match ? match[1] : null;
}

function shouldSkip(slug) {
  if (!slug) return false;
  return SKIP_PREFIXES.some((prefix) => slug.startsWith(prefix));
}

function slugFromPath(filePath) {
  const rel = path.relative(SOURCE_DIR, filePath);
  const parts = rel.split(path.sep);
  parts.pop();
  if (!parts.length) return "home";
  return parts.join("/");
}

async function extractPages(files) {
  const pages = [];
  for (const file of files) {
    const slug = slugFromPath(file);
    if (shouldSkip(slug)) continue;
    const html = await fs.readFile(file, "utf8");
    const $ = cheerio.load(html);
    const title = normalizeText($("title").first().text());
    const description = $("meta[name='description']").attr("content") || "";
    const blocks = [];
    const seenImages = new Set();

    const main = $("main#PAGES_CONTAINER");
    if (!main.length) continue;

    function pushHtml(fragment) {
      const cleaned = sanitizeFragment(fragment);
      if (!cleaned) return;
      const text = normalizeText(
        cleaned.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ")
      );
      if (!text) return;
      blocks.push({ type: "html", html: cleaned });
    }

    function pushImage(src, alt = "") {
      if (!src || seenImages.has(src)) return;
      seenImages.add(src);
      blocks.push({ type: "image", src, alt: normalizeText(alt) });
    }

    function walk(node) {
      if (!node || !node.type) return;
      if (node.type === "tag") {
        const name = node.name;
        const attribs = node.attribs || {};
        if (name === "div" && attribs["data-testid"] === "richTextElement") {
          pushHtml($(node).html() || "");
        }
        if (name === "img") {
          const img = $(node);
          const pin = img.attr("data-pin-media") || img.attr("data-pin-url");
          const src = pin || img.attr("src");
          pushImage(src, img.attr("alt") || "");
        }
        if (attribs.style && attribs.style.includes("background-image")) {
          const bg = extractBackgroundImage(attribs.style);
          if (bg) pushImage(bg, "");
        }
        if (node.children) {
          node.children.forEach(walk);
        }
      }
    }

    walk(main[0]);

    pages.push({
      slug,
      title,
      description: normalizeText(description),
      blocks,
    });
  }

  for (const page of pages) {
    const outPath = path.join(PAGE_DIR, `${page.slug}.json`);
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, `${JSON.stringify(page, null, 2)}\n`);
  }

  return pages;
}

function parseLdJson($) {
  const scripts = $("script[type='application/ld+json']");
  for (const script of scripts) {
    try {
      const json = JSON.parse($(script).text());
      if (json && json["@type"] === "BlogPosting") {
        return json;
      }
    } catch {
      // ignore
    }
  }
  return null;
}

async function extractPosts(files) {
  const posts = [];
  for (const file of files) {
    const slug = slugFromPath(file).replace(/^post\//, "");
    if (!slug || slug === "post") continue;
    const html = await fs.readFile(file, "utf8");
    const $ = cheerio.load(html);
    const ld = parseLdJson($);
    const title = ld?.headline || normalizeText($("title").text());
    const description = ld?.description || "";
    const date = ld?.datePublished || "";
    const author = ld?.author?.name || "";
    const coverImage = ld?.image?.url || "";

    const categories = new Set();
    $("a[href^='/archive/categories/']").each((_, el) => {
      const text = normalizeText($(el).text());
      if (text) categories.add(text);
    });

    const viewer = $("[data-id='content-viewer']");
    const blocks = [];
    if (viewer.length) {
      viewer.find("[data-breakout]").each((_, el) => {
        const fragment = $(el).html();
        if (!fragment) return;
        const cleaned = sanitizeFragment(fragment);
        if (!cleaned) return;
        blocks.push(cleaned);
      });
    }

    const bodyHtml = blocks.join("\n");

    posts.push({
      slug,
      title: normalizeText(title),
      description: normalizeText(description),
      date,
      author,
      coverImage,
      categories: Array.from(categories),
      html: bodyHtml,
    });
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : -1));

  for (const post of posts) {
    const outPath = path.join(POST_DIR, `${post.slug}.json`);
    await ensureDir(path.dirname(outPath));
    await fs.writeFile(outPath, `${JSON.stringify(post, null, 2)}\n`);
  }

  await fs.writeFile(
    path.join(POST_DIR, "index.json"),
    `${JSON.stringify(posts, null, 2)}\n`
  );

  return posts;
}

async function main() {
  await fs.rm(OUT_DIR, { recursive: true, force: true });
  await ensureDir(PAGE_DIR);
  await ensureDir(POST_DIR);

  const legacySource = path.join(ROOT, "site", "www.asustainablefuture.org");
  if (await exists(legacySource)) {
    SOURCE_DIR = legacySource;
  }
  if (!(await exists(SOURCE_DIR))) {
    throw new Error(
      `Source HTML not found. Place a Wix export under ${SOURCE_DIR} or ${legacySource} before running extract.`
    );
  }

  const indexFiles = await walkIndexFiles(SOURCE_DIR);
  const pageFiles = indexFiles.filter((file) => !file.includes(`${path.sep}post${path.sep}`));
  const postFiles = indexFiles.filter((file) => file.includes(`${path.sep}post${path.sep}`));

  await extractPages(pageFiles);
  await extractPosts(postFiles);
  console.log("Content extraction complete.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
