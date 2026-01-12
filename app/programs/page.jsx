import Link from "next/link";
import ContentBlocks from "../../components/ContentBlocks";
import { getPage, getPrograms } from "../../lib/content";

export async function generateMetadata() {
  const page = await getPage("programs");
  return {
    title: page?.title || "Programs | A Sustainable Future",
    description: page?.description,
  };
}

export default async function ProgramsPage() {
  const page = await getPage("programs");
  const programs = await getPrograms();

  return (
    <article className="page">
      {page ? <ContentBlocks blocks={page.blocks} /> : null}

      <section className="programs-free">
        <h2>All Programs Are Free</h2>
        <p>
          These programs are now freely accessible. We will add the full materials
          as soon as they are provided.
        </p>
      </section>

      <section className="program-grid">
        {programs.map((program, index) => (
          <Link
            key={program.id}
            href={program.href}
            className="program-card"
          >
            <img src={program.image} alt={`Program ${index + 1}`} loading="lazy" />
            <span>Program {index + 1}</span>
          </Link>
        ))}
      </section>
    </article>
  );
}
