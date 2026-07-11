import type { APIRoute } from "astro";
import { withBase } from "../utils/urls";

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("http://localhost:4321");
  const sitemap = new URL(withBase("/sitemap.xml"), base).href;

  return new Response("User-agent: *\nAllow: /\nSitemap: " + sitemap + "\n", {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};
