// Runs after `vite build`: writes every page as static HTML (with its own title, description,
// share image and JSON-LD), plus 404.html, sitemap.xml and robots.txt. Search engines and link
// previews then get the full page; React takes over in the browser.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const appDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(appDir, "dist");
const ssrDir = path.join(appDir, "dist-ssr");
const { render, metaFor, allRoutes, sitemapEntries, SITE_URL } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8")
  .replace(/\s*<title>[\s\S]*?<\/title>/, "")
  .replace(/\s*<meta name="description"[^>]*>/, "");

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
// JSON inside <script> must not contain "</script>" or similar.
const json = (value) => JSON.stringify(value).replace(/</g, "\\u003c");

function head(meta, preload) {
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
  ];
  if (meta.notFound) {
    tags.push(`<meta name="robots" content="noindex" />`);
  } else {
    tags.push(
      `<link rel="canonical" href="${esc(meta.canonical)}" />`,
      `<meta property="og:site_name" content="Tours 999" />`,
      `<meta property="og:locale" content="en_GB" />`,
      `<meta property="og:type" content="${meta.type}" />`,
      `<meta property="og:title" content="${esc(meta.title)}" />`,
      `<meta property="og:description" content="${esc(meta.description)}" />`,
      `<meta property="og:url" content="${esc(meta.canonical)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(meta.title)}" />`,
      `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    );
    if (meta.image) tags.push(`<meta property="og:image" content="${esc(meta.image)}" />`, `<meta name="twitter:image" content="${esc(meta.image)}" />`);
    if (meta.published) tags.push(`<meta property="article:published_time" content="${esc(meta.published)}" />`);
    for (const item of meta.jsonLd) tags.push(`<script type="application/ld+json">${json(item)}</script>`);
  }
  if (Object.keys(preload).length) tags.push(`<script>window.__PRELOAD__=${json(preload)}</script>`);
  return tags.map((t) => `    ${t}`).join("\n");
}

async function writePage(url, file) {
  const { html, preload } = await render(url);
  const page = template
    .replace("</head>", `${head(metaFor(url), preload)}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page);
}

const routes = allRoutes();
for (const route of routes) {
  await writePage(route, route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html"));
}
// Netlify serves 404.html (with a 404 status) for any address that isn't a page.
await writePage("/404-page-not-found", path.join(dist, "404.html"));

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...sitemapEntries().map(({ loc, lastmod }) => `  <url><loc>${esc(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);
fs.writeFileSync(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

fs.rmSync(ssrDir, { recursive: true, force: true });
console.log(`Pre-rendered ${routes.length} pages + 404.html, sitemap.xml and robots.txt`);
