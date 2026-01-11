const http = require("http");
const fs = require("fs/promises");
const path = require("path");

const SITE_DIR = path.join(__dirname, "site");
const HOST_DIR = path.join(SITE_DIR, "www.asustainablefuture.org");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".ttf": "font/ttf",
  ".otf": "font/otf",
  ".avif": "image/avif",
};

async function fileExists(filePath) {
  try {
    const stat = await fs.stat(filePath);
    return stat.isFile();
  } catch {
    return false;
  }
}

async function resolveFilePath(pathname) {
  if (pathname === "/") {
    return path.join(HOST_DIR, "index.html");
  }

  const cleanPath = pathname.replace(/^\/+/, "");
  const assetPath = path.join(SITE_DIR, cleanPath);
  if (
    cleanPath.startsWith("static.wixstatic.com/") ||
    cleanPath.startsWith("static.parastorage.com/") ||
    cleanPath.startsWith("www-asustainablefuture-org.filesusr.com/")
  ) {
    if (await fileExists(assetPath)) return assetPath;
  }

  const sitePath = path.join(HOST_DIR, cleanPath);
  if (await fileExists(sitePath)) return sitePath;

  if (pathname.endsWith("/")) {
    const indexPath = path.join(HOST_DIR, cleanPath, "index.html");
    if (await fileExists(indexPath)) return indexPath;
  }

  if (!path.extname(cleanPath)) {
    const indexPath = path.join(HOST_DIR, cleanPath, "index.html");
    if (await fileExists(indexPath)) return indexPath;
  }

  return null;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const filePath = await resolveFilePath(url.pathname);
    if (!filePath) {
      res.statusCode = 404;
      res.end("Not found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    const data = await fs.readFile(filePath);
    res.setHeader("Content-Type", contentType);
    res.statusCode = 200;
    res.end(data);
  } catch (err) {
    res.statusCode = 500;
    res.end("Server error");
  }
});

const PORT = process.env.PORT || 4173;
server.listen(PORT, () => {
  console.log(`Serving ASF clone at http://127.0.0.1:${PORT}`);
});
