import ContentBlocks from "../components/ContentBlocks";
import { getPage } from "../lib/content";

export async function generateMetadata() {
  const page = await getPage("home");
  return {
    title: page?.title || "A Sustainable Future",
    description: page?.description,
  };
}

export default async function HomePage() {
  const page = await getPage("home");

  return (
    <article className="page">
      {page ? <ContentBlocks blocks={page.blocks} /> : null}
    </article>
  );
}
