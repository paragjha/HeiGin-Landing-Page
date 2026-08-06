import { createFileRoute, notFound } from "@tanstack/react-router";
import { SolutionPage } from "@/components/site/SolutionPage";
import { solutionBySlug } from "@/content/solutions";

export const Route = createFileRoute("/solutions/$slug")({
  head: ({ params }) => {
    const s = solutionBySlug[params.slug];
    const title = s ? `${s.eyebrow} CRM — Heigin` : "Solutions — Heigin";
    const description = s ? s.sub.slice(0, 155) : "Heigin CRM solutions for Indian SMB teams.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: SolutionRoute,
});

function SolutionRoute() {
  const { slug } = Route.useParams();
  const solution = solutionBySlug[slug];
  if (!solution) throw notFound();
  return <SolutionPage solution={solution} />;
}
