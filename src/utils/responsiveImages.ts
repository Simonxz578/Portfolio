import { withBase } from "./urls";

// Width candidates are generated from the complete source frame by
// scripts/generate-responsive-images.mjs. Keep the original src as a fallback;
// when no same-width derivative exists, also retain it as the largest candidate.
export function responsiveImageSrcSet(source: string, widths: readonly number[], sourceWidth: number): string {
  const [pathname] = source.split("?");
  const query = source.includes("?") ? source.slice(source.indexOf("?")) : "";
  const filename = pathname?.split("/").pop() ?? "";
  const stem = filename.replace(/\.[^.]+$/, "");
  const candidates = widths.map((width) => `${withBase(`/images/responsive/${stem}-${width}.webp${query}`)} ${width}w`);
  if (!widths.includes(sourceWidth)) candidates.push(`${withBase(source)} ${sourceWidth}w`);
  return candidates.join(", ");
}
