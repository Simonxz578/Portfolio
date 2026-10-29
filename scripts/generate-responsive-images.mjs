import { createRequire } from 'node:module';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Optional asset-authoring step. Existing public images remain the fallbacks;
// derivatives only resize the full frame and encode it for smaller displays.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE_PATH || 'sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = path.join(root, 'public/images/responsive');
await mkdir(outputDirectory, { recursive: true });
const specifications = [
  { source: 'media/identity/simon-portrait.jpg', widths: [240, 320, 480], quality: 94 },
  { source: 'images/ninefold/ninefold-showcase.webp', widths: [480, 768, 1024, 1280, 1600], quality: 92 },
  ...['dialogue', 'experiments', 'physics', 'maths'].map(name => ({ source: `images/ninefold/ninefold-${name}.webp`, widths: [480, 768, 1024, 1280], quality: 92 })),
  ...['seated', 'court'].map(name => ({ source: `images/v2/simon-cambridge-${name}.jpg`, widths: [320, 480, 640, 800], quality: 90 })),
  { source: 'images/v2/river-cam-fast.avif', widths: [320, 480, 640, 768, 960], quality: 86 },
  { source: 'images/v2/caius-formal-fast.avif', widths: [320, 480, 640, 800], quality: 88 },
];
const report = [];
for (const spec of specifications) {
  const original = await readFile(path.join(root, 'public', spec.source));
  const metadata = await sharp(original).metadata();
  if (!metadata.width || !metadata.height || (metadata.orientation && metadata.orientation !== 1)) throw new Error(`Review source geometry: ${spec.source}`);
  const stem = path.parse(spec.source).name;
  const derivatives = [];
  for (const width of spec.widths) {
    if (width > metadata.width) throw new Error(`Upscaling is prohibited: ${spec.source}`);
    const pipeline = sharp(original).resize({ width, kernel: 'lanczos3', withoutEnlargement: true });
    // Preserve the source profile (including the Ninefold Display P3 screenshot),
    // rather than stripping its colour interpretation during format conversion.
    if (metadata.hasProfile) pipeline.keepIccProfile();
    const encoded = await pipeline.webp({ quality: spec.quality, smartSubsample: true, effort: 6 }).toBuffer();
    // A larger derivative adds no transfer benefit. Keep the existing original
    // candidate instead, particularly for the already compact AVIF photographs.
    if (encoded.length >= original.length) continue;
    const name = `${stem}-${width}.webp`;
    await writeFile(path.join(outputDirectory, name), encoded);
    const next = await sharp(encoded).metadata();
    if (metadata.icc && (!next.icc || !metadata.icc.equals(next.icc))) throw new Error(`ICC profile changed: ${name}`);
    if (next.width !== width || Math.abs(next.height - metadata.height * width / metadata.width) > 1) throw new Error(`Unexpected resize: ${name}`);
    derivatives.push({ path: `images/responsive/${name}`, width, height: next.height, bytes: encoded.length, sha256: createHash('sha256').update(encoded).digest('hex') });
  }
  const item = { source: spec.source, sourceWidth: metadata.width, sourceHeight: metadata.height, sourceBytes: original.length,
    sourceSha256: createHash('sha256').update(original).digest('hex'), iccSha256: metadata.icc ? createHash('sha256').update(metadata.icc).digest('hex') : null, quality: spec.quality, derivatives };
  report.push(item);
  console.log(`${spec.source}: ${original.length} B -> ${derivatives.map(image => `${image.width}w:${image.bytes}B`).join(', ')}`);
}
if (process.argv[2]) await writeFile(process.argv[2], JSON.stringify(report, null, 2) + '\n');
