import { access, readdir, readFile, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Content/link regression guard for the visual redesign. Capture the existing
// build before editing, then compare the final build to that explicit snapshot.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const baselinePath = process.argv[2];
if (!baselinePath) throw new Error("Usage: node scripts/audit-redesign.mjs /absolute/baseline.json [--capture]");
const base = (process.env.BASE_PATH ?? "/Portfolio").replace(/\/$/, "");
const normalise = (value) => value.replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&#(?:39|x27);/g, "'").replace(/&quot;/g, '"').replace(/\s+/g, " ").trim();
async function filesAt(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? filesAt(path.join(dir, entry.name)) : path.join(dir, entry.name)))).flat();
}
const htmlFiles = (await filesAt(dist)).filter((file) => file.endsWith(".html"));
const pages = {};
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const body = html.replace(/<script\b[\s\S]*?<\/script>/g, "").replace(/<style\b[\s\S]*?<\/style>/g, "");
  pages[path.relative(dist, file)] = {
    links: [...html.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)].map((match) => match[1].replace(/&amp;/g, "&")),
    text: normalise(body),
    paragraphs: [...body.matchAll(/<(?:p|li)\b[^>]*>([\s\S]*?)<\/(?:p|li)>/g)].map((match) => normalise(match[1])).filter((text) => text.length > 100),
    ids: [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]),
    canonical: html.match(/<link\b[^>]*\brel="canonical"[^>]*\bhref="([^"]+)"/)?.[1],
    html,
  };
}
const data = {};
for (const file of await filesAt(path.join(root, "src/data"))) {
  data[path.relative(root, file)] = createHash("sha256").update(await readFile(file)).digest("hex");
}
if (process.argv.includes("--capture")) {
  await writeFile(baselinePath, JSON.stringify({ pages: Object.fromEntries(Object.entries(pages).map(([key, { html, ...value }]) => [key, value])), data }, null, 2));
  console.log(`Captured ${htmlFiles.length} pages and ${Object.keys(data).length} data files in ${baselinePath}`);
  process.exit(0);
}

const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
const failures = [];
const review = [];
for (const cssFile of (await filesAt(dist)).filter((file) => file.endsWith(".css"))) {
  const css = await readFile(cssFile, "utf8");
  for (const match of css.matchAll(/url\(\s*["']?([^"')\s]+)["']?\s*\)/g)) {
    const raw = match[1];
    if (/^(?:[a-z]+:|#|\/\/)/i.test(raw)) continue;
    const url = new URL(raw, `https://example.test${base}/${path.relative(dist, cssFile)}`);
    const relative = decodeURIComponent(url.pathname.startsWith(base + "/") ? url.pathname.slice(base.length + 1) : url.pathname.replace(/^\//, ""));
    try { await access(path.join(dist, relative)); }
    catch { failures.push(`Unresolved CSS asset: ${path.relative(dist, cssFile)} → ${raw}`); }
  }
}
for (const [file, hash] of Object.entries(baseline.data)) {
  if (data[file] !== hash) failures.push(`Factual data changed: ${file}`);
}
for (const [route, old] of Object.entries(baseline.pages)) {
  const page = pages[route];
  if (!page) { failures.push(`Route removed: ${route}`); continue; }
  if (page.canonical !== old.canonical) failures.push(`Canonical changed: ${route}`);
  if (!page.html.includes('href="#main-content"')) failures.push(`Skip link missing: ${route}`);
  const logical = route === "index.html" ? "/" : "/" + route.replace(/index\.html$/, "");
  if (route !== "404.html") {
    const opposite = logical.startsWith("/zh/") ? logical.slice(3) : "/zh" + logical;
    if (!page.links.includes(base + opposite)) failures.push(`Matching language route missing: ${route} → ${base + opposite}`);
  }
  for (const text of old.paragraphs) {
    if (!page.text.includes(text)) review.push({ route, text });
  }
  for (const image of page.html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\bwidth=/.test(image[0]) || !/\bheight=/.test(image[0])) review.push({ route, image: image[0], reason: "Image lacks native width/height; verify stable CSS aspect ratio" });
  }
}
const oldExternal = new Set(Object.values(baseline.pages).flatMap((page) => page.links).filter((link) => /^(?:https?:|mailto:)/.test(link)));
const newExternal = new Set(Object.values(pages).flatMap((page) => page.links).filter((link) => /^(?:https?:|mailto:)/.test(link)));
for (const link of oldExternal) if (!newExternal.has(link)) failures.push(`External/contact link removed: ${link}`);

for (const [route, page] of Object.entries(pages)) {
  for (const link of page.links) {
    if (/^(?:[a-z]+:|\/\/)/i.test(link) || !link.includes("#")) continue;
    const [rawPath, rawId] = link.split("#");
    if (!rawId) continue;
    const targetPath = rawPath ? new URL(rawPath, `https://example.test${base}/${route}`).pathname : `${base}/${route}`;
    const stripped = targetPath.startsWith(base + "/") ? targetPath.slice(base.length + 1) : targetPath.replace(/^\//, "");
    const targetRoute = stripped.endsWith("/") ? stripped + "index.html" : stripped;
    const target = pages[targetRoute];
    if (target && !target.ids.includes(decodeURIComponent(rawId))) failures.push(`Broken fragment: ${route} → ${link}`);
  }
}
const reviewPath = baselinePath.replace(/\.json$/, "") + "-review.json";
await writeFile(reviewPath, JSON.stringify(review, null, 2));
console.log(`Audited ${htmlFiles.length} pages, bilingual switches, canonical URLs, data hashes, external/contact links, fragments and CSS assets.`);
console.log(`Content/layout items for visual review: ${review.length} (${reviewPath})`);
if (failures.length) {
  console.error(failures.map((item) => "- " + item).join("\n"));
  process.exitCode = 1;
} else console.log("Redesign preservation audit passed.");
