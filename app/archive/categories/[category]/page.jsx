import Link from "next/link";
import { notFound } from "next/navigation";
import PostCard from "../../../../components/PostCard";
import { getCategories, getPostsByCategory } from "../../../../lib/content";

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ category }));
}

export async function generateMetadata({ params }) {
  const category = decodeURIComponent(params.category);
  return {
    title: `${category} | Archive | A Sustainable Future`,
  };
}

export default async function CategoryPage({ params }) {
  const category = decodeURIComponent(params.category);
  const posts = await getPostsByCategory(category);

  if (!posts.length) {
    notFound();
  }

  return (
    <section className="page">
      <div className="archive-header">
        <h1>{category}</h1>
        <p>Posts in the {category} collection.</p>
        <p>
          <Link href="/archive">Back to Archive</Link>
        </p>
      </div>
      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
