import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { EyeOff, KeyRound, Wrench } from "lucide-react";
import { Badge, Button, Card, EmptyState, SearchInput } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section, SectionHeading } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { IntegrationMarquee } from "@/components/site/integration-marquee";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";
import { integrationCategories, integrations, statusLabels, type IntegrationStatus } from "@/lib/integrations";
import { IntegrationLogo } from "@/components/integration-logo";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/integrations")({
  head: pageHead(
    "/integrations",
    "Integrations",
    "Connect the tools your team already uses. Status labels say what is live and what is in development — kept honest."
  ),
  component: Integrations,
});

const statusTone: Record<IntegrationStatus, "success" | "info" | "outline"> = {
  available: "success",
  "in-development": "info",
  planned: "outline",
};

const principles = [
  {
    icon: Wrench,
    title: "Only what the app actually does",
    body: "An integration is listed as Available only when the surface ships in the product and a pilot team has used it. Everything else is In development.",
  },
  {
    icon: KeyRound,
    title: "Least-privilege scopes",
    body: "Each integration asks for the narrowest scope the feature needs. Nothing broader — it's easier to add a scope later than explain why we took one.",
  },
  {
    icon: EyeOff,
    title: "Revocable keys",
    body: "Access tokens and webhook keys are rotatable from admin settings. Revoking one disconnects HeiGin cleanly without touching the underlying tool.",
  },
];

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
      {/* 1. Hero — two-column pattern. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>Integrations</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              Meet your customers where the work already happens.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                Email, calendar, meetings, chat, documents and lead sources — connected, with status labels we
                keep honest.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/contact?intent=demo">
                  <Button variant="primary" size="lg">Book a call</Button>
                </a>
                <a href="/pricing">
                  <Button variant="secondary" size="lg">See pricing</Button>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12">
            <IntegrationMarquee />
          </div>
        </div>
      </section>

      {/* 2. Pilot teams. */}
      <PilotTeamRow />

      {/* 3. Directory — card grid with search + category filter. */}
      <Section id="directory" className="scroll-mt-28">
        <SectionHeading
          eyebrow="Directory"
          title="Connect the tools you already use."
          description="Search or filter by category. The badge on each card says Available (live today) or In development."
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
                  "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
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

      {/* 4. How we think about integrations. */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="How we think about integrations"
          title="Honest status, narrow scopes, revocable access."
          description="The rules we hold ourselves to on every integration — without exceptions for a prettier marketing page."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-md bg-sidebar text-foreground">
                <p.icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-2 text-md leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 5. Final CTA — missing-tool prompt. */}
      <Section className="border-t border-border">
        <FinalCtaBanner
          title="Don't see your tool?"
          description="Tell us what your team uses. If enough pilot teams need it, it goes on the roadmap."
          primary={{ label: "Talk to us", to: "/contact" }}
          secondary={{ label: "Apply for the pilot", to: "/contact?intent=pilot" }}
          trackLocation="integrations-final"
        />
      </Section>
    </>
  );
}
