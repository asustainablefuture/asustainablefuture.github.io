import Link from "next/link";
import { formatDate } from "../lib/format";

export default function PostCard({ post }) {
  return (
    <article className="post-card">
      <Link href={`/post/${post.slug}`} className="post-card__image">
        {post.coverImage ? (
          <img src={post.coverImage} alt={post.title} loading="lazy" />
        ) : (
          <div className="post-card__placeholder" />
        )}
      </Link>
      <div className="post-card__body">
        <div className="post-card__meta">
          <span>{formatDate(post.date)}</span>
          {post.author ? <span>{post.author}</span> : null}
        </div>
        <h3>
          <Link href={`/post/${post.slug}`}>{post.title}</Link>
        </h3>
        {post.description ? <p>{post.description}</p> : null}
        {post.categories && post.categories.length > 0 ? (
          <div className="post-card__tags">
            {post.categories.map((category) => (
              <Link
                key={`${post.slug}-${category}`}
                href={`/archive/categories/${encodeURIComponent(category)}`}
              >
                {category}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
