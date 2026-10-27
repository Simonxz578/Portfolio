import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Optional authoring step, never a runtime dependency. SHARP_MODULE_PATH may point
// to an existing local Sharp installation. The tracked SVGs remain the masters.
const require = createRequire(import.meta.url);
const sharp = require(process.env.SHARP_MODULE_PATH || 'sharp');
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const specifications = [
  { name: 'simon-entry', density: 144, width: 1024, height: 1536 },
  { name: 'kings-architecture', density: 72, width: 1600, height: 900 },
];
const reports = [];
for (const spec of specifications) {
  const source = path.join(root, 'public/media/cosmic-run', spec.name + '.svg');
  const output = path.join(root, 'public/media/cosmic-run', spec.name + '.webp');
  const original = await readFile(source, 'utf8');
  let renderable = original;
  // librsvg does not support embedded WebP consistently. PNG is an in-memory,
  // lossless bridge: decoded identity pixels and the source SVG stay untouched.
  const embedded = [...new Set(original.match(/data:image\/webp;base64,[A-Za-z0-9+/=]+/g) || [])];
  for (const dataUrl of embedded) {
    const input = Buffer.from(dataUrl.slice(dataUrl.indexOf(',') + 1), 'base64');
    const png = await sharp(input).png().toBuffer();
    renderable = renderable.replaceAll(dataUrl, 'data:image/png;base64,' + png.toString('base64'));
  }
  const { data: rgba, info } = await sharp(Buffer.from(renderable), { density: spec.density })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  if (info.width !== spec.width || info.height !== spec.height || info.channels !== 4) throw new Error('Unexpected canvas: ' + spec.name);
  await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .webp({ lossless: true, effort: 6 }).toFile(output);
  const decoded = await sharp(output).ensureAlpha().raw().toBuffer();
  let maxVisibleRgbDifference = 0;
  let maxAlphaDifference = 0;
  for (let i = 0; i < rgba.length; i += 4) {
    maxAlphaDifference = Math.max(maxAlphaDifference, Math.abs(rgba[i + 3] - decoded[i + 3]));
    if (rgba[i + 3] || decoded[i + 3]) for (let c = 0; c < 3; c++) maxVisibleRgbDifference = Math.max(maxVisibleRgbDifference, Math.abs(rgba[i + c] - decoded[i + c]));
  }
  if (maxAlphaDifference || maxVisibleRgbDifference) throw new Error('Lossless pixel verification failed: ' + spec.name);
  const bytes = await readFile(output);
  reports.push({ asset: path.relative(root, output), source: path.relative(root, source), width: info.width, height: info.height, bytes: bytes.length,
    sourceBytes: Buffer.byteLength(original), sha256: createHash('sha256').update(bytes).digest('hex'), sourceSha256: createHash('sha256').update(original).digest('hex'),
    maxAlphaDifference, maxVisibleRgbDifference, encoding: 'Lossless WebP; unchanged SVG coordinates; original embedded WebP decoded through a lossless in-memory PNG bridge' });
}
if (process.argv[2]) await writeFile(process.argv[2], JSON.stringify(reports, null, 2) + '\n');
console.log(JSON.stringify(reports, null, 2));
