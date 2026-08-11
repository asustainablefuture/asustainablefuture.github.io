import imageDimensions from "../content/image-dimensions.json";

const EMPTY_PARAGRAPH =
  /<p(?:\s[^>]*)?>\s*(?:(?:<span(?:\s[^>]*)?>)?(?:\s|&nbsp;|&#160;|&#xA0;|\u00a0|\u200b)*(?:<\/span>)?)\s*<\/p>/gi;

function removeEmptyParagraphs(html) {
  return html.replace(EMPTY_PARAGRAPH, "");
}

export default function ContentBlocks({ blocks }) {
  if (!blocks || blocks.length === 0) return null;
  return (
    <div className="content-blocks">
      {blocks.map((block, index) => {
        if (block.type === "image") {
          const dimensions = imageDimensions[block.src];
          return (
            <figure className="content-image" key={`${block.src}-${index}`}>
              <img
                src={block.src}
                alt={block.alt || ""}
                loading="lazy"
                width={dimensions?.width}
                height={dimensions?.height}
              />
            </figure>
          );
        }

        if (block.type === "html") {
          const html = removeEmptyParagraphs(block.html);
          return (
            <div
              className="content-html"
              key={`${block.type}-${index}`}
              dangerouslySetInnerHTML={{ __html: html }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
