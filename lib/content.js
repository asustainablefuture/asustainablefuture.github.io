import fs from "node:fs/promises";
import path from "node:path";

const contentRoot = path.join(process.cwd(), "content");
const pagesRoot = path.join(contentRoot, "pages");
const postsRoot = path.join(contentRoot, "posts");

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
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
  return url
    .replace(/^https:\/\/static\.wixstatic\.com\//, "/static.wixstatic.com/")
    .replace(/^https:\/\/static\.parastorage\.com\//, "/static.parastorage.com/");
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
