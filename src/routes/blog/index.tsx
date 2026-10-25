import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Card } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { getResources } from "@/lib/resources";
import { RESOURCE_CATEGORIES, type ResourceSummary } from "@/lib/strapi";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { PlaceholderNote } from "@/components/site/placeholder-note";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: pageHead(
    "/blog",
    "Blog",
    "Writing on agentic CRM, sales workflows and customer relationships from the HeiGin team."
  ),
  loader: () => getResources(),
  component: Resources,
});

const categories = ["All", ...RESOURCE_CATEGORIES] as const;

/**
 * Shown until the first article is published in Strapi (or whenever Strapi can't be reached).
 * Titles are proposed topics: no article bodies are published for these.
 */
const plannedResources = [
  { title: "What is an agentic CRM?", category: "Agentic CRM", summary: "How CRMs shift from storing what happened to helping decide what happens next.", readTime: 6 },
  { title: "Why follow-ups slip, and how to stop it", category: "Sales workflows", summary: "The most common reasons promised replies never get sent, and practical fixes.", readTime: 5 },
  { title: "Designing trust levels for AI agents", category: "Agentic CRM", summary: "Why we let teams decide how much an agent can do on its own.", readTime: 7 },
  { title: "Spotting stalled deals early", category: "Sales workflows", summary: "Signals that a deal is stalling, long before it shows up in a report.", readTime: 4 },
  { title: "HeiGin pilot: what we're learning", category: "Product updates", summary: "Notes from building with our first pilot teams.", readTime: 5 },
];

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

function Resources() {
  const result = Route.useLoaderData();
  const live: ResourceSummary[] = result.ok ? result.resources : [];
  const isLive = live.length > 0;
  const resources = isLive ? live : plannedResources.map((r) => ({ ...r, slug: "", publishedAt: null, updatedAt: null }));

  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const shown = cat === "All" ? resources : resources.filter((r) => r.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Guides for teams that sell on relationships."
        description="Practical writing on agentic CRM, sales workflows and how we're building HeiGin."
        showCtas={false}
      />
      <Section>
        {!isLive && <PlaceholderNote>Upcoming articles: topics are planned, full articles are being written</PlaceholderNote>}
        <div className={cn("flex flex-wrap gap-1.5", !isLive && "mt-6")} role="group" aria-label="Filter posts">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:bg-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>
        {shown.length === 0 ? (
          <p className="mt-10 text-lg text-muted-foreground">
            {cat === "Customer stories"
              ? "Customer stories will appear here once pilot teams approve them."
              : "Nothing here yet."}
          </p>
        ) : (
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((r) => {
              const card = (
                <Card padding="lg" className={cn("h-full", isLive && "transition-colors group-hover:bg-sidebar")}>
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="outline" size="sm">{r.category}</Badge>
                    <span className="text-sm text-faint">
                      {isLive ? (r.publishedAt ? dateFormat.format(new Date(r.publishedAt)) : "") : "Coming soon"}
                    </span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{r.title}</h2>
                  <p className="mt-2 text-md leading-relaxed text-muted-foreground">{r.summary}</p>
                  {r.readTime && <p className="mt-4 text-sm text-faint">{r.readTime} min read</p>}
                </Card>
              );
              return (
                <li key={r.slug || r.title}>
                  {isLive ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: r.slug }}
                      className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    >
                      {card}
                    </Link>
                  ) : (
                    card
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </>
  );
}
