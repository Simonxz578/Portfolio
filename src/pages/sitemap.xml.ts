import type { APIRoute } from "astro";
import { projects } from "@data/en/projects";
import { withBase } from "../utils/urls";

export const prerender = true;

const staticRoutes = [
  "/",
  "/work/",
  "/research/",
  "/leadership/",
  "/about/",
  "/resume/",
  "/contact/"
];

export const GET: APIRoute = ({ site }) => {
  const base = site ?? new URL("http://localhost:4321");
  const routes = [
    ...staticRoutes,
    ...projects.map((project) => "/work/" + project.slug + "/")
  ];

  const urls = routes
    .map((route) => "  <url><loc>" + new URL(withBase(route), base).href + "</loc></url>")
    .join("\n");

  return new Response(
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
      urls +
      "\n</urlset>\n",
    {
      headers: {
        "Content-Type": "application/xml; charset=utf-8"
      }
    }
  );
};
