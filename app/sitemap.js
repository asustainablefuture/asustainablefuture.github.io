import {
  getAllPages,
  getCategories,
  getPosts,
  getPrograms,
} from "../lib/content";

export const dynamic = "force-static";

export default async function sitemap() {
  const base = "https://www.asustainablefuture.org";
  const [pages, posts, programs, categories] = await Promise.all([
    getAllPages(),
    getPosts(),
    getPrograms(),
    getCategories(),
  ]);

  const entries = [
    { url: `${base}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/washington-tier-2/`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/oregon-building-support/`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/archive/`, priority: 0.5, changeFrequency: "monthly" },
    { url: `${base}/programs/`, priority: 0.5, changeFrequency: "yearly" },
    ...pages
      .filter((page) => !["home", "programs"].includes(page.slug))
      .map((page) => ({
        url: `${base}/${page.slug}/`,
        priority: 0.4,
        changeFrequency: "yearly",
      })),
    ...posts.map((post) => ({
      url: `${base}/post/${post.slug}/`,
      lastModified: post.date,
      priority: 0.3,
      changeFrequency: "yearly",
    })),
    ...programs.map((program) => ({
      url: `${base}${program.href}/`,
      priority: 0.3,
      changeFrequency: "yearly",
    })),
    ...categories.map((category) => ({
      url: `${base}/archive/categories/${encodeURIComponent(category)}/`,
      priority: 0.3,
      changeFrequency: "monthly",
    })),
  ];

  return Array.from(new Map(entries.map((entry) => [entry.url, entry])).values());
}
