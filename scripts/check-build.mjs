import { access, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = path.join(projectRoot, "dist");
const configuredBase = (process.env.BASE_PATH ?? "/").replace(/\/$/, "");
const expectedRoutes = [
  "index.html",
  "work/index.html",
  "work/industrial-ai-agent-rag-workflow/index.html",
  "work/ai-policy-teacher-agency/index.html",
  "work/ai-enhanced-science-education/index.html",
  "research/index.html",
  "leadership/index.html",
  "about/index.html",
  "resume/index.html",
  "contact/index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml"
];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(absolute)));
    } else {
      files.push(absolute);
    }
  }

  return files;
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

function localTargets(html) {
  const targets = [];
  const attributePattern = /\b(?:href|src)="([^"]+)"/g;
  const srcsetPattern = /\bsrcset="([^"]+)"/g;

  for (const match of html.matchAll(attributePattern)) {
    if (match[1]) targets.push(match[1]);
  }

  for (const match of html.matchAll(srcsetPattern)) {
    if (!match[1]) continue;
    for (const candidate of match[1].split(",")) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url) targets.push(url);
    }
  }

  return targets.filter((target) => !/^(?:[a-z]+:|#|\/\/)/i.test(target));
}

async function resolveTarget(htmlFile, target) {
  const withoutQuery = target.split(/[?#]/, 1)[0];
  if (!withoutQuery) return true;

  const relativeHtmlDir = path.dirname(path.relative(distRoot, htmlFile));
  const withoutBase =
    configuredBase && withoutQuery.startsWith(configuredBase + "/")
      ? withoutQuery.slice(configuredBase.length)
      : withoutQuery;
  const relativeTarget = withoutBase.startsWith("/")
    ? withoutBase.replace(/^\/+/, "")
    : path.normalize(path.join(relativeHtmlDir, withoutBase));

  const candidates = path.extname(relativeTarget)
    ? [relativeTarget]
    : [
        relativeTarget,
        path.join(relativeTarget, "index.html"),
        relativeTarget + ".html"
      ];

  for (const candidate of candidates) {
    if (await exists(path.join(distRoot, candidate))) return true;
  }

  return false;
}

await access(distRoot);

const allFiles = await walk(distRoot);
const htmlFiles = allFiles.filter((file) => file.endsWith(".html"));
const failures = [];

for (const route of expectedRoutes) {
  if (!(await exists(path.join(distRoot, route)))) {
    failures.push("Missing expected output: " + route);
  }
}

for (const htmlFile of htmlFiles) {
  const html = await readFile(htmlFile, "utf8");
  const relative = path.relative(distRoot, htmlFile);
  const h1Count = (html.match(/<h1\b/g) ?? []).length;
  const images = html.match(/<img\b[^>]*>/g) ?? [];

  if (h1Count !== 1) {
    failures.push(relative + " has " + h1Count + " h1 elements");
  }

  for (const image of images) {
    if (!/\balt=/.test(image)) {
      failures.push(relative + " contains an image without alt text");
    }
  }

  for (const target of localTargets(html)) {
    if (!(await resolveTarget(htmlFile, target))) {
      failures.push(relative + " has an unresolved local target: " + target);
    }
  }

  const privacyPatterns = [
    { pattern: /\b1[3-9]\d{9}\b/, label: "mobile-number pattern" },
    { pattern: /(?:resume-source|张翔补充材料)\.docx/i, label: "private source filename" },
    {
      pattern: /\b(?:wechat|weixin|xiaohongshu)\b|微信|小红书|RadianceXZ|Simon_Cambridge|simon_cambridge/i,
      label: "private or non-portfolio social identifier"
    }
  ];

  for (const check of privacyPatterns) {
    if (check.pattern.test(html)) {
      failures.push(relative + " contains a " + check.label);
    }
  }
}

const publicPrivateFiles = allFiles.filter((file) =>
  /\.(?:docx?|pages)$/i.test(file) || /(?:draft|private)/i.test(path.basename(file))
);

for (const file of publicPrivateFiles) {
  failures.push("Potential private file in build: " + path.relative(distRoot, file));
}

if (failures.length > 0) {
  console.error("Build verification failed:\n" + failures.map((item) => "- " + item).join("\n"));
  process.exitCode = 1;
} else {
  console.log(
    "Build verification passed: " +
      htmlFiles.length +
      " HTML pages, expected routes present, local assets resolved, and no private-source patterns found."
  );
}
