import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "../../../lib/format";
import { getPost, getPostsIndex } from "../../../lib/content";

export async function generateStaticParams() {
  const posts = await getPostsIndex();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);
  if (!post) {
    return { title: "Post Not Found | A Sustainable Future" };
  }
  return {
    title: `${post.title} | A Sustainable Future`,
    description: post.description,
  };
}

export default async function PostPage({ params }) {
  const post = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="post-body">
      <p>
        <Link href="/archive">Back to Archive</Link>
      </p>
      <h1>{post.title}</h1>
      <p className="post-meta">
        {formatDate(post.date)} {post.author ? `· ${post.author}` : ""}
      </p>
      {post.coverImage ? (
        <figure>
          <img src={post.coverImage} alt={post.title} />
        </figure>
      ) : null}
      <div dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  );
}
