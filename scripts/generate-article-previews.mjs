import assert from "node:assert/strict";
import { access, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const siteUrl = (process.env.SITE_URL || "https://noxcoredev.is-a.dev").replace(/\/$/, "");
const manifest = JSON.parse(await readFile(path.join(root, "src/data/article-slugs.json"), "utf8"));
const server = await createServer({
  configFile: path.join(root, "vite.config.mjs"),
  root,
  appType: "custom",
  logLevel: "error",
  server: { middlewareMode: true },
});

let articles;
try {
  ({ articles } = await server.ssrLoadModule("/src/data/articles.jsx"));
} finally {
  await server.close();
}

assert.deepEqual(
  articles.map((article) => article.slug).sort(),
  [...manifest].sort(),
  "Update src/data/article-slugs.json whenever an article slug is added or changed.",
);

const publicDirectory = path.resolve(root, "public");
for (const article of articles) {
  const images = [
    ["cover", article.cover],
    ["Open Graph image", article.ogImage],
    ...(article.illustrations || []).map((illustration, index) => [`illustrations[${index}]`, illustration.src]),
  ];
  for (const [field, asset] of images) {
    if (!asset) continue;
    assert.ok(asset.startsWith("/") && !asset.startsWith("//"), `${article.slug}: ${field} must be an absolute local public/ path.`);
    const assetPath = path.resolve(publicDirectory, asset.slice(1));
    assert.ok(assetPath.startsWith(`${publicDirectory}${path.sep}`), `${article.slug}: ${field} must stay inside public/.`);
    try {
      await access(assetPath);
    } catch {
      assert.fail(`${article.slug}: missing ${field} file at public${asset}.`);
    }
  }
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
}[character]));

function setMeta(html, attribute, name, value) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const tagPattern = new RegExp(`<meta\\b(?=[^>]*\\b${attribute}=["']${escapedName}["'])[^>]*>`, "i");
  const replacement = `content="${escapeHtml(value)}"`;
  if (tagPattern.test(html)) {
    return html.replace(tagPattern, (tag) => {
      const contentPattern = /content=(['"])[\s\S]*?\1/i;
      if (contentPattern.test(tag)) return tag.replace(contentPattern, replacement);
      return tag.replace(/>$/, ` ${replacement}>`);
    });
  }
  return html.replace("</head>", `  <meta ${attribute}="${escapeHtml(name)}" ${replacement} />\n  </head>`);
}

function setCanonical(html, url) {
  return html.replace(/<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
    `<link rel="canonical" href="${escapeHtml(url)}" />`);
}

let template = await readFile(path.join(root, "dist/index.html"), "utf8");
for (const article of articles) {
  const localized = article.fr || article.en;
  const url = `${siteUrl}/blog/${article.slug}`;
  const image = `${siteUrl}${article.ogImage || article.cover}`;
  let html = template
    .replace(/<title[^>]*>[\s\S]*?<\/title>/i, `<title>${escapeHtml(localized.title)} — NoxCoreDev</title>`);

  html = setMeta(html, "name", "description", localized.excerpt);
  html = setMeta(html, "property", "og:type", "article");
  html = setMeta(html, "property", "og:title", localized.title);
  html = setMeta(html, "property", "og:description", localized.excerpt);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:secure_url", image);
  html = setMeta(html, "property", "og:image:type", article.ogImageType || "image/jpeg");
  html = setMeta(html, "property", "og:image:width", article.ogImageWidth || "1600");
  html = setMeta(html, "property", "og:image:height", article.ogImageHeight || "900");
  html = setMeta(html, "property", "og:image:alt", localized.title);
  html = setMeta(html, "property", "article:published_time", `${article.publishedAt}T00:00:00Z`);
  html = setMeta(html, "name", "twitter:card", "summary_large_image");
  html = setMeta(html, "name", "twitter:title", localized.title);
  html = setMeta(html, "name", "twitter:description", localized.excerpt);
  html = setMeta(html, "name", "twitter:image", image);
  html = setMeta(html, "name", "twitter:image:alt", localized.title);
  html = setCanonical(html, url);

  const outputDir = path.join(root, "dist/blog");
  await mkdir(outputDir, { recursive: true });
  await writeFile(path.join(outputDir, `${article.slug}.html`), html);
}

console.log(`Generated ${articles.length} article preview pages.`);
