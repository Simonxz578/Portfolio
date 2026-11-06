import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { withBase } from "./urls";

// The browser cache key changes only when the asset's bytes change.
/** @param {string} name */
function sceneAsset(name) {
  const path = `/media/cosmic-run/${name}.webp`;
  const revision = createHash("sha256").update(readFileSync(`public${path}`)).digest("hex").slice(0, 16);
  return withBase(`${path}?v=${revision}`);
}

const entry = sceneAsset("simon-entry");
export const sceneEntry = {
  src: entry,
  srcset: [512, 768].map(width => `${sceneAsset(`simon-entry-${width}`)} ${width}w`).concat(`${entry} 1024w`).join(", "),
  sizes: "(max-width: 700px) clamp(150px, 45vw, 205px), (max-height: 760px) clamp(250px, 24vw, 320px), clamp(250px, 26vw, 360px)",
};
export const sceneDepth = sceneAsset("cosmic-depth");
export const sceneArchitecture = sceneAsset("kings-architecture");
export const sceneSprite = sceneAsset("runner-cycle");
