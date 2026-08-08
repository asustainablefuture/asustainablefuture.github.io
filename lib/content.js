import fs from "node:fs/promises";
import fsSync from "node:fs";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");
const pagesRoot = path.join(contentRoot, "pages");
const postsRoot = path.join(contentRoot, "posts");
const publicRoot = path.join(process.cwd(), "public");

const archivedAssetPattern = /^\/(static\.(?:wixstatic|parastorage)\.com)\//;

function resolveArchivedAsset(value) {
  if (typeof value !== "string" || !archivedAssetPattern.test(value)) {
    return value;
  }

  // A Wix srcset was captured as one image src on one legacy page. Use its
  // first candidate instead of emitting the entire comma-delimited srcset.
  const normalizedValue = value.split(/\s+1x,\s+/, 1)[0];
  const pathname = normalizedValue.split(/[?#]/, 1)[0];
  let decodedPathname = pathname;
  try {
    decodedPathname = decodeURIComponent(pathname);
  } catch {
    // Keep the encoded pathname when it cannot be decoded safely.
  }

  if (fsSync.existsSync(path.join(publicRoot, decodedPathname.replace(/^\//, "")))) {
    return normalizedValue;
  }

  return normalizedValue.replace(archivedAssetPattern, "https://$1/");
}

function repairArchivedHtml(value) {
  if (typeof value !== "string") return value;

  return value
    .replace(
      /((?:href|src)=["'])(\/(?:static\.(?:wixstatic|parastorage)\.com)\/[^"']+)(["'])/g,
      (_match, before, url, after) => `${before}${resolveArchivedAsset(url)}${after}`
    )
    .replace(
      /(["'])\/archive\/hashtags\/12\1/g,
      "$1https://sdgs.un.org/goals/goal12$1"
    );
}

function repairArchivedContent(value) {
  if (Array.isArray(value)) return value.map(repairArchivedContent);

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, repairArchivedContent(entry)])
    );
  }

  return resolveArchivedAsset(repairArchivedHtml(value));
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return repairArchivedContent(JSON.parse(raw));
}

export async function getSiteConfig() {
  return readJson(path.join(contentRoot, "site.json"));
}

export async function getPage(slug) {
  const filePath = path.join(pagesRoot, `${slug}.json`);
  try {
    return await readJson(filePath);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

export async function getAllPages() {
  const entries = await fs.readdir(pagesRoot);
  const slugs = entries
    .filter((entry) => entry.endsWith(".json"))
    .map((entry) => entry.replace(/\.json$/, ""));
  const pages = await Promise.all(slugs.map((slug) => getPage(slug)));
  return pages.filter(Boolean);
}

export async function getPostsIndex() {
  return readJson(path.join(postsRoot, "index.json"));
}

export async function getPosts() {
  const posts = await getPostsIndex();
  return posts
    .slice()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug) {
  const filePath = path.join(postsRoot, `${slug}.json`);
  try {
    return await readJson(filePath);
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function localizeAsset(url) {
  if (!url) return url;
  const localized = url
    .replace(/^https:\/\/static\.wixstatic\.com\//, "/static.wixstatic.com/")
    .replace(/^https:\/\/static\.parastorage\.com\//, "/static.parastorage.com/");
  return resolveArchivedAsset(localized);
}

export async function getPrograms() {
  const programs = await readJson(path.join(contentRoot, "programs.json"));
  return programs.map((program) => {
    const url = new URL(program.url);
    const id = url.pathname.split("/").pop();
    return {
      ...program,
      id,
      href: url.pathname,
      image: localizeAsset(program.image),
    };
  });
}

export async function getProgramById(id) {
  const programs = await getPrograms();
  return programs.find((program) => program.id === id) || null;
}

export async function getCategories() {
  const posts = await getPosts();
  const categories = new Set();
  posts.forEach((post) => {
    (post.categories || []).forEach((category) => {
      if (category) categories.add(category);
    });
  });
  return Array.from(categories).sort((a, b) => a.localeCompare(b));
}

export async function getPostsByCategory(category) {
  const posts = await getPosts();
  const normalized = category.toLowerCase();
  return posts.filter((post) =>
    (post.categories || []).some(
      (entry) => entry && entry.toLowerCase() === normalized
    )
  );
}
