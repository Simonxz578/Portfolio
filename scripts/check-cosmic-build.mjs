import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Static integration/privacy checks supplement, and never replace, watching the
// reversible scroll scene at actual desktop/mobile sizes.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const failures = [];
const notes = [];
const baselinePath = process.argv[2] ?? "/tmp/portfolio-cosmic-baseline.json";
async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => entry.isDirectory() ? walk(path.join(directory, entry.name)) : path.join(directory, entry.name)))).flat();
}
async function exists(file) { try { await access(file); return true; } catch { return false; } }
const builtFiles = await walk(dist);
const htmlFiles = builtFiles.filter((file) => file.endsWith(".html"));
const pages = Object.fromEntries(await Promise.all(htmlFiles.map(async (file) => [path.relative(dist, file), await readFile(file, "utf8")])));
const homeRoutes = ["index.html", "zh/index.html"];
const requiredIds = ["resume-start", "resume-education", "resume-experience", "resume-projects", "resume-research", "resume-leadership", "resume-capabilities", "resume-contact"];
const facts = {
  "index.html": ["University of Cambridge", "University College London", "University of Manchester", "MPhil", "Education", "Harris", "Hirain", "Siemens", "2025–2026", "2024–2025", "2020–2023", "Ninefold", "10.1080/09500693.2026.2733687", "2877042547@qq.com"],
  "zh/index.html": ["剑桥大学", "伦敦大学学院", "曼彻斯特大学", "教育学", "Harris", "经纬恒润", "西门子", "2025–2026", "2024–2025", "2020–2023", "Ninefold", "10.1080/09500693.2026.2733687", "2877042547@qq.com"]
};
for (const route of homeRoutes) {
  const html = pages[route];
  if (!html) { failures.push(`Homepage missing: ${route}`); continue; }
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  for (const id of requiredIds) if (!ids.includes(id)) failures.push(`${route}: one-page section #${id} missing`);
  if (!/href="#resume-start"/.test(html)) failures.push(`${route}: real skip-intro anchor missing`);
  const visibleText = html.replace(/<script\b[\s\S]*?<\/script>/g, "").replace(/<style\b[\s\S]*?<\/style>/g, "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ");
  for (const fact of facts[route]) if (!visibleText.includes(fact)) failures.push(`${route}: public résumé fact missing from HTML: ${fact}`);
  if (!/mailto:2877042547@qq\.com/.test(html)) failures.push(`${route}: direct email link missing`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) failures.push(`${route}: expected exactly one h1`);
}
for (const route of ["resume/index.html", "zh/resume/index.html"]) {
  const html = pages[route];
  if (!html || !html.includes("10.1080/09500693.2026.2733687")) failures.push(`Direct résumé route/content missing: ${route}`);
}
if (await exists(baselinePath)) {
  const baseline = JSON.parse(await readFile(baselinePath, "utf8"));
  for (const route of Object.keys(baseline.pages)) if (!(route in pages)) failures.push(`Original route removed: ${route}`);
} else notes.push(`Baseline not present at ${baselinePath}; run the preservation auditor with the captured baseline separately.`);

const sceneScriptPath = path.join(root, "src/scripts/cosmic-run.ts");
if (await exists(sceneScriptPath)) {
  const script = await readFile(sceneScriptPath, "utf8");
  if (!script.includes("requestAnimationFrame")) failures.push("Cosmic Run lacks requestAnimationFrame scheduling");
  if (!script.includes("prefers-reduced-motion")) failures.push("Cosmic Run lacks reduced-motion handling");
  if (/(?:window\.)?location\.(?:href|assign|replace)\s*(?:=|\()/m.test(script)) failures.push("Cosmic Run must not navigate away to present the résumé");
  if (/addEventListener\(\s*["'](?:wheel|touchmove)["'][\s\S]{0,600}preventDefault\(/m.test(script)) failures.push("Cosmic Run appears to intercept natural wheel/touch scrolling; review and remove scroll hijacking");
} else failures.push("Expected scene progress source src/scripts/cosmic-run.ts is missing");

let mediaBytes = 0;
let mediaCount = 0;
for (const file of builtFiles) {
  const relative = path.relative(dist, file);
  if (/\.(?:zip|psd|psb|blend|fbx|obj|docx?|pages|heic|raw|dng|nef|cr2)$/i.test(file)) failures.push(`Private/source master file must not be public: ${relative}`);
  if (/(?:identity[-_ ]?(?:analysis|master)|biometric|reference[-_ ]?pack|private[-_ ]?(?:reference|identity)|source[-_ ]?portrait)/i.test(relative)) failures.push(`Private identity/source filename detected: ${relative}`);
  if (/\.(?:json|txt)$/i.test(file)) {
    const text = await readFile(file, "utf8");
    if (/(?:identity[-_ ]?analysis|facial[-_ ]?landmarks|biometric|\/private\/tmp\/portfolio-cosmic-identity|simon_identity_portrait\.jpg)/i.test(text)) failures.push(`Private identity/source material detected: ${relative}`);
  }
  if (relative.startsWith("media/cosmic-run/") || relative.startsWith("media/identity/")) {
    const bytes = (await readFile(file)).length;
    mediaBytes += bytes;
    mediaCount++;
    if (bytes > 2_000_000) notes.push(`Large public scene asset: ${relative} ${(bytes / 1024 / 1024).toFixed(2)}MiB; verify deferred loading and mobile fallback.`);
  }
}
if (!mediaCount) failures.push("No published optimized Cosmic Run / selected identity assets found");
if (!(await exists(path.join(root, "docs/COSMIC_RUN_ASSETS.md")))) failures.push("Asset provenance document docs/COSMIC_RUN_ASSETS.md missing");
console.log(`Cosmic build: ${htmlFiles.length} HTML routes; ${mediaCount} selected scene/identity assets; ${(mediaBytes / 1024 / 1024).toFixed(2)}MiB total asset bytes.`);
if (notes.length) console.log(notes.map((note) => "NOTE: " + note).join("\n"));
if (failures.length) {
  console.error(failures.map((failure) => "FAIL: " + failure).join("\n"));
  process.exitCode = 1;
} else console.log("Cosmic static integration/privacy checks passed. This does not certify the latest user-selected face/clothing, scene mood, motion or measured performance; those still require actual asset and browser QA.");
