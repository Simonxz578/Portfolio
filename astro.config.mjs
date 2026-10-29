import { defineConfig } from "astro/config";

const vercelProductionUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const site =
  process.env.SITE_URL ??
  (vercelProductionUrl ? "https://" + vercelProductionUrl : "http://localhost:4321");

export default defineConfig({
  output: "static",
  site,
  base: process.env.BASE_PATH ?? "/",
  trailingSlash: "always",
  // Prepare only a link the visitor hovers/focuses; keep native page navigation.
  prefetch: { prefetchAll: true, defaultStrategy: "hover" },
  build: {
    format: "directory"
  },
  vite: {
    build: {
      cssMinify: true
    }
  }
});
