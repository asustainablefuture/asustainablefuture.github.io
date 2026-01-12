import Link from "next/link";
import { notFound } from "next/navigation";
import { getProgramById, getPrograms } from "../../../lib/content";

export async function generateStaticParams() {
  const programs = await getPrograms();
  return programs.map((program) => ({ id: program.id }));
}

export async function generateMetadata({ params }) {
  const program = await getProgramById(params.id);
  if (!program) {
    return { title: "Program Not Found | A Sustainable Future" };
  }
  return { title: `Program Access | A Sustainable Future` };
}

export default async function ProgramDetail({ params }) {
  const program = await getProgramById(params.id);
  if (!program) {
    notFound();
  }

  return (
    <article className="program-detail">
      <span className="badge">Now Free</span>
      <h1>Program Access</h1>
      <p>
        Program materials will be added once they are provided. This listing is
        free to access and will be updated with full content soon.
      </p>
      <img src={program.image} alt="Program" />
      <p>
        <Link href="/programs">Back to Programs</Link>
      </p>
    </article>
  );
}
