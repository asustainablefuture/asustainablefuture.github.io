import Link from "next/link";
import PostCard from "../../components/PostCard";
import { getCategories, getPosts } from "../../lib/content";

export const metadata = {
  title: "Archive | A Sustainable Future",
};

export default async function ArchivePage() {
  const posts = await getPosts();
  const categories = await getCategories();

  return (
    <section className="page">
      <div className="archive-header">
        <h1>Archive</h1>
        <p>Explore the latest stories, reflections, and resources from ASF.</p>
      </div>

      <div className="archive-categories">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/archive/categories/${encodeURIComponent(category)}`}
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="post-list">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
