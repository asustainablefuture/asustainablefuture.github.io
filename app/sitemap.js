export const dynamic = "force-static";

export default function sitemap() {
  const base = "https://www.asustainablefuture.org";
  return [
    { url: `${base}/`, priority: 1, changeFrequency: "weekly" },
    { url: `${base}/oregon-building-support/`, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}/research/`, priority: 0.6, changeFrequency: "yearly" },
    { url: `${base}/archive/`, priority: 0.5, changeFrequency: "monthly" },
  ];
}
