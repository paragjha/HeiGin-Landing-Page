import { createFileRoute } from "@tanstack/react-router";
import { loadResources } from "@/lib/resources";
import { site } from "@/lib/site";

/**
 * Sitemap generated per request so published articles appear without a deploy. Static pages are
 * listed here; articles come from Strapi (and are simply left out if Strapi can't be reached).
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
        const result = await loadResources();
        const articles = result.ok ? result.resources : [];
        const urls = [
          ...staticPaths.map((p) => `  <url><loc>${site.url}${p === "/" ? "/" : p}</loc></url>`),
          ...articles.map((a) => {
            const modified = a.updatedAt ?? a.publishedAt;
            const lastmod = modified ? `<lastmod>${modified.slice(0, 10)}</lastmod>` : "";
            return `  <url><loc>${escapeXml(`${site.url}/blog/${a.slug}`)}</loc>${lastmod}</url>`;
          }),
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
