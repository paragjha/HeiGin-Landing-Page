import { createFileRoute } from "@tanstack/react-router";
import { loadPosts } from "@/lib/blog";
import { site } from "@/lib/site";

/**
 * Sitemap generated per request so published articles appear without a deploy. Static pages are
 * listed here; posts come from `content/blog/`.
 */
const staticPaths = [
  "/",
  "/product",
  "/ai-agents",
  "/integrations",
  "/solutions",
  "/use-cases",
  "/pricing",
  "/security",
  "/about",
  "/blog",
  "/contact",
  "/privacy",
  "/terms",
];

const escapeXml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          ...staticPaths.map((p) => `  <url><loc>${site.url}${p === "/" ? "/" : p}</loc></url>`),
          ...loadPosts().map(
            (p) => `  <url><loc>${escapeXml(`${site.url}/blog/${p.slug}`)}</loc><lastmod>${p.date}</lastmod></url>`
          ),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
        return new Response(xml, {
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
          },
        });
      },
    },
  },
});
