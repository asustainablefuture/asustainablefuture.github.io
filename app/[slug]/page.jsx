import { notFound } from "next/navigation";
import ContentBlocks from "../../components/ContentBlocks";
import { getAllPages, getPage } from "../../lib/content";

const RESERVED = new Set(["home", "programs", "archive", "post", "challenge-page", "paper-consumption-model", "washington-tier-2", "oregon-building-support"]);

export async function generateStaticParams() {
  const pages = await getAllPages();
  return pages
    .map((page) => page.slug)
    .filter((slug) => !RESERVED.has(slug))
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = await getPage(slug);
  if (!page) {
    return {
      title: "Page Not Found | A Sustainable Future",
    };
  }
  return {
    title: page.title,
    description: page.description,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  if (RESERVED.has(slug)) {
    notFound();
  }

  const page = await getPage(slug);
  if (!page) {
    notFound();
  }

  return (
    <article className="page">
      <ContentBlocks blocks={page.blocks} />
    </article>
  );
}
