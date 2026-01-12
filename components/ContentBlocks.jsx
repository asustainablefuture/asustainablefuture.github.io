export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className="content-blocks">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          return (
            <figure className="content-image" key={`${block.src}-${index}`}>
              <img src={block.src} alt={block.alt || ""} loading="lazy" />
            </figure>
          );
        }

        if (block.type === "html") {
          return (
            <div
              className="content-html"
              key={`${block.type}-${index}`}
              dangerouslySetInnerHTML={{ __html: block.html }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
