import { withBase } from "./urls";

// Keep the responsive preload and visible image byte-for-byte aligned.
export const sceneEntry = {
  src: withBase("/media/cosmic-run/simon-entry.webp?v=ear-clean-8"),
  srcset: [512, 768].map(width => `${withBase(`/media/cosmic-run/simon-entry-${width}.webp?v=display-9`)} ${width}w`).concat(`${withBase("/media/cosmic-run/simon-entry.webp?v=ear-clean-8")} 1024w`).join(", "),
  sizes: "(max-width: 700px) clamp(150px, 45vw, 205px), (max-height: 760px) clamp(250px, 24vw, 320px), clamp(250px, 26vw, 360px)",
};
