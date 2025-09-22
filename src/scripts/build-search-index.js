// scripts/build-search-index.js
// Run with: node ./scripts/build-search-index.js
// Requires: npm i node-fetch@2 cheerio glob fs-extra

const fs = require("fs-extra");
const path = require("path");
const glob = require("glob");
const cheerio = require("cheerio");
const fetch = require("node-fetch");

// CONFIG: adjust these to your project
const OUT = path.join(__dirname, "..", "public", "search-index.json"); // public so it's served
const STATIC_HTML_GLOBS = [
  path.join(__dirname, "..", "dist", "**/*.html"), // if you build static HTML into dist
  path.join(__dirname, "..", "public", "**/*.html"), // fallback
];
const API_BASE = process.env.VITE_API_BASE_URL || `http://localhost:5173/api`; // adjust

function stripHtml(html = "") {
  try {
    const $ = cheerio.load(html);
    // remove scripts/styles and hidden elements
    $("script, style, noscript, svg, img").remove();
    return $.root().text().replace(/\s+/g, " ").trim();
  } catch (e) {
    return String(html || "");
  }
}

async function indexStaticFiles() {
  const files = [];
  for (const g of STATIC_HTML_GLOBS) {
    files.push(...glob.sync(g, { nodir: true }));
  }
  const pageDocs = [];
  for (const f of new Set(files)) {
    try {
      const html = await fs.readFile(f, "utf8");
      const $ = cheerio.load(html);
      const title = $("title").text() || $("h1").first().text() || path.basename(f);
      // derive a path relative to site root
      // if your static generator writes index.html in subfolders, convert accordingly
      let rel = path.relative(path.join(__dirname, "..", "dist"), f);
      if (rel.startsWith("..")) {
        rel = "/" + path.relative(path.join(__dirname, "..", "public"), f).replace(/\\/g, "/");
      } else {
        rel = "/" + rel.replace(/\\/g, "/");
      }
      if (rel.endsWith("index.html")) rel = rel.replace(/index\.html$/, "");
      const text = stripHtml(html);
      const excerpt = text.slice(0, 400);
      pageDocs.push({ type: "page", title: title || rel, path: rel, text, excerpt });
    } catch (e) {
      console.warn("Skip file", f, e.message);
    }
  }
  return pageDocs;
}

async function indexBroadcasts() {
  try {
    const res = await fetch(`${API_BASE}/public/broadcasts?limit=1000`);
    if (!res.ok) {
      console.warn("Broadcasts fetch failed:", res.status);
      return [];
    }
    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : data.items ? [data.items] : [];
    return items.map((b) => {
      const text = [b.title, b.summary, (b.body_html || "").replace(/<\/?[^>]+(>|$)/g, ""), b.tag].join(" ");
      return {
        type: "broadcast",
        id: b.id,
        title: b.title || `Broadcast ${b.id}`,
        path: `/news`, // main page — SearchResults will open by id
        text: text.replace(/\s+/g, " ").trim(),
        excerpt: (b.summary || "").slice(0, 400),
        meta: { date: b.scheduled_at || b.created_at, image: b.image_url || null },
        raw: b,
      };
    });
  } catch (e) {
    console.warn("Failed to fetch broadcasts:", e.message);
    return [];
  }
}

(async () => {
  console.log("Building search index...");
  const pages = await indexStaticFiles();
  const broadcasts = await indexBroadcasts();

  const all = [...pages, ...broadcasts];
  console.log(`Indexed pages: ${pages.length}, broadcasts: ${broadcasts.length} => total ${all.length}`);

  await fs.ensureFile(OUT);
  await fs.writeJson(OUT, all, { spaces: 2 });
  console.log("Wrote", OUT);
})();
