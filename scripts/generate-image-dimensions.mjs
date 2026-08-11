import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const pagesRoot = path.join(root, "content", "pages");
const publicRoot = path.join(root, "public");
const outputPath = path.join(root, "content", "image-dimensions.json");

const pageFiles = (await fs.readdir(pagesRoot))
  .filter((name) => name.endsWith(".json"))
  .sort();

const sources = new Set();
for (const name of pageFiles) {
  const page = JSON.parse(await fs.readFile(path.join(pagesRoot, name), "utf8"));
  for (const block of page.blocks || []) {
    if (block.type === "image" && typeof block.src === "string") {
      sources.add(block.src.split(/\s+1x,\s+/, 1)[0]);
    }
  }
}

const dimensions = {};
for (const source of [...sources].sort()) {
  if (!source.startsWith("/")) {
    throw new Error(`Cannot measure non-local content image: ${source}`);
  }

  const pathname = decodeURIComponent(source.split(/[?#]/, 1)[0]);
  const filePath = path.join(publicRoot, pathname.replace(/^\/+/, ""));
  let key = source;
  let width;
  let height;

  try {
    await fs.access(filePath);
    const metadata = await sharp(filePath).metadata();
    width = metadata.width;
    height = metadata.height;
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
    const requestedSize = /\/w_(\d+),h_(\d+)[,/]/.exec(source);
    if (!requestedSize) {
      throw new Error(`Missing image file and dimensions for ${source}`);
    }
    key = source.replace(
      /^\/(static\.(?:wixstatic|parastorage)\.com)\//,
      "https://$1/"
    );
    width = Number(requestedSize[1]);
    height = Number(requestedSize[2]);
  }

  if (!width || !height) {
    throw new Error(`Missing image dimensions for ${source}`);
  }
  dimensions[key] = { width, height };
}

await fs.writeFile(outputPath, `${JSON.stringify(dimensions, null, 2)}\n`);
process.stdout.write(`Wrote ${Object.keys(dimensions).length} image dimensions.\n`);
