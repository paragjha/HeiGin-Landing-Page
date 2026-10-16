import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Badge, Card } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { PlaceholderNote } from "@/components/site/placeholder-note";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/resources")({
  head: pageHead(
    "/resources",
    "Resources",
    "Guides on agentic CRM, sales workflows and customer relationship management from the HeiGin team."
  ),
  component: Resources,
});

const categories = ["All", "Agentic CRM", "Sales workflows", "Product updates", "Customer stories"] as const;

/** Planned articles. Titles are proposed topics — no article bodies are published yet. */
const resources = [
  { title: "What is an agentic CRM?", category: "Agentic CRM", summary: "How CRMs shift from storing what happened to helping decide what happens next.", readTime: "6 min" },
  { title: "Why follow-ups slip — and how to stop it", category: "Sales workflows", summary: "The most common reasons promised replies never get sent, and practical fixes.", readTime: "5 min" },
  { title: "Designing trust levels for AI agents", category: "Agentic CRM", summary: "Why we let teams decide how much an agent can do on its own.", readTime: "7 min" },
  { title: "Spotting stalled deals early", category: "Sales workflows", summary: "Signals that a deal is stalling, long before it shows up in a report.", readTime: "4 min" },
  { title: "HeiGin pilot: what we're learning", category: "Product updates", summary: "Notes from building with our first pilot teams.", readTime: "5 min" },
];

function Resources() {
  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const shown = cat === "All" ? resources : resources.filter((r) => r.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides for teams that sell on relationships."
        description="Practical writing on agentic CRM, sales workflows and how we're building HeiGin."
        showCtas={false}
      />
      <Section>
        <PlaceholderNote>Upcoming articles — topics are planned, full articles are being written</PlaceholderNote>
        <div className="mt-6 flex flex-wrap gap-1.5" role="group" aria-label="Filter resources">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
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
            {shown.map((r) => (
              <li key={r.title}>
                <Card padding="lg" className="h-full">
                  <div className="flex items-center justify-between gap-2">
                    <Badge tone="outline" size="sm">{r.category}</Badge>
                    <span className="text-sm text-faint">Coming soon</span>
                  </div>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground">{r.title}</h2>
                  <p className="mt-2 text-md leading-relaxed text-muted-foreground">{r.summary}</p>
                  <p className="mt-4 text-sm text-faint">{r.readTime} read</p>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>
    </>
  );
}
