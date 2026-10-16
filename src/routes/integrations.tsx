import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Badge, Card, EmptyState, SearchInput } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { IntegrationFlow } from "@/components/mockups/integration-flow";
import { IntegrationOrbit } from "@/components/mockups/integration-orbit";
import { integrationCategories, integrations, statusLabels, type IntegrationStatus } from "@/lib/integrations";
import { IntegrationLogo } from "@/components/integration-logo";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/integrations")({
  head: pageHead(
    "/integrations",
    "Integrations",
    "Connect the tools your team already uses — every integration is live and ready to connect."
  ),
  component: Integrations,
});

const statusTone: Record<IntegrationStatus, "success" | "info" | "outline"> = {
  available: "success",
  "in-development": "info",
  planned: "outline",
};

function Integrations() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return integrations.filter((i) => {
      if (category !== "all" && i.category !== category) return false;
      if (q && !`${i.name} ${i.description} ${i.capabilities.join(" ")}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, category]);

  return (
    <>
      <PageHero
        eyebrow="Integrations"
        title="Meet your customers where the work already happens."
        description="HeiGin pulls context from the tools your team uses every day — every integration listed here is live and ready to connect."
      >
        <div className="grid items-center gap-10">
          <IntegrationOrbit />
          <Card padding="lg" className="bg-sidebar">
            <IntegrationFlow
              sources={[
                { label: "Meetings", sub: "Calls & notes" },
                { label: "Email", sub: "Customer threads" },
                { label: "Team chat", sub: "Internal context" },
              ]}
              action="Next step"
            />
          </Card>
        </div>
      </PageHero>

      <Section>
        <SectionHeading
          eyebrow="Directory"
          title="Every integration, ready to connect."
          description="Search or filter by category — everything below is available today."
        />

        <div className="mt-10 flex flex-col gap-3 md:flex-row md:items-center">
          <div className="md:w-72">
            <SearchInput
              value={query}
              onValueChange={setQuery}
              placeholder="Search integrations…"
              aria-label="Search integrations"
            />
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by category">
            {["all", ...integrationCategories].map((c) => (
              <button
                key={c}
                type="button"
                aria-pressed={category === c}
                onClick={() => setCategory(c)}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  category === c
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-accent"
                )}
              >
                {c === "all" ? "All categories" : c}
              </button>
            ))}
          </div>
        </div>
        <p className="mt-6 text-md text-muted-foreground" aria-live="polite">
          {filtered.length} of {integrations.length} integrations
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6">
            <EmptyState
              title="No integrations match"
              description="Try a different search or clear the filters."
            />
          </div>
        ) : (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((i) => (
              <li key={i.id}>
                <Card
                  padding="md"
                  className="h-full"
                  onClick={() => track("integration_card_selected", { integration: i.id })}
                >
                  <div className="flex items-start justify-between gap-3">
                    <IntegrationLogo integration={i} className="size-10" />
                    <Badge tone={statusTone[i.status]} size="sm">{statusLabels[i.status]}</Badge>
                  </div>
                  <h3 className="mt-3 text-xl font-semibold text-foreground">{i.name}</h3>
                  <p className="text-sm text-faint">{i.category}</p>
                  <p className="mt-2 text-md leading-relaxed text-muted-foreground">{i.description}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {i.capabilities.map((c) => (
                      <li key={c} className="rounded-full bg-muted px-2.5 py-0.5 text-sm text-muted-foreground">{c}</li>
                    ))}
                  </ul>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <Section tone="tint">
        <div className="max-w-3xl">
          <SectionHeading
            eyebrow="Why it matters"
            title="Connected context is what makes agents useful."
            description="An agent that only sees CRM fields can remind you a task exists. An agent that also saw the meeting, the email thread and the team discussion can tell you why it matters and draft the reply."
          />
        </div>
      </Section>

    </>
  );
}
