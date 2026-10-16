import { site } from "./site";

/** Consistent head() metadata for a content route. */
export function pageHead(path: string, title: string, description: string) {
  return () => ({
    meta: [
      { title: `${title} | HeiGin` },
      { name: "description", content: description },
      { property: "og:title", content: `${title} | HeiGin` },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `${site.url}${path}` }],
  });
}
