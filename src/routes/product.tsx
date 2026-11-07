import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { FeatureDeepDive } from "@/components/site/feature-deep-dive";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";
import { AppFrame } from "@/components/site/app-frame";
import { PipelineMockup } from "@/components/mockups/pipeline-mockup";
import { TasksMockup } from "@/components/mockups/tasks-mockup";
import { AgentActivityMockup } from "@/components/mockups/agent-activity-mockup";
import dashboardShot from "@/assets/app-dashboard.png.asset.json";
import quotesShot from "@/assets/app-quotes.png.asset.json";

export const Route = createFileRoute("/product")({
  head: pageHead(
    "/product",
    "Product",
    "One workspace for every customer relationship. Pipeline, inbox, quotes and tasks share the same record — so what one agent notices becomes work the team can finish."
  ),
  component: Product,
});

function Product() {
  return (
    <>
      {/* 1. Hero — two-column, matches the home + /ai-agents pattern. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>Product</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              One workspace for every customer relationship.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                Pipeline, inbox, quotes and tasks share the same record — so what one agent notices becomes work
                the team can finish.
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
        </div>
      </section>

      {/* 2. Pilot teams — same quiet row. */}
      <PilotTeamRow />

      {/* 3. Connected record — real app screenshot. */}
      <Section id="connected-record" className="scroll-mt-28">
        <FeatureDeepDive
          number="01"
          title="Every email, call, quote and task on one customer timeline."
          description="Contacts, companies, deals and conversations share one model, so your team sees the full relationship at a glance — not scattered across six tabs."
        >
          <AppFrame
            shot={dashboardShot}
            alt="HeiGin customer dashboard showing a connected record with activity timeline, open deal and contacts"
            priority
          />
        </FeatureDeepDive>
      </Section>

      {/* 4. Pipeline that flags itself — coded mockup. */}
      <Section tone="tint" id="pipeline" className="scroll-mt-28">
        <FeatureDeepDive
          number="02"
          title="Risk flags sit on the deal, not in a Friday report."
          description="Stalled deals and buying signals surface on the pipeline as they happen, each with the reason attached. Deal brief tells the owner what the deal needs next."
        >
          <PipelineMockup />
        </FeatureDeepDive>
      </Section>

      {/* 5. Quotes & payments — real app screenshot. */}
      <Section id="quotes" className="scroll-mt-28">
        <FeatureDeepDive
          number="03"
          title="GST-correct quotes go out with a public link."
          description="Create, version and approve quotes on the same record as the deal. Payment status lands back on the timeline, so no one has to chase finance for an answer."
        >
          <AppFrame
            shot={quotesShot}
            alt="HeiGin Quotes & Payments screen listing customer quotes with version, status, total and updated date"
          />
        </FeatureDeepDive>
      </Section>

      {/* 6. Tasks built from open loops — coded mockup. */}
      <Section tone="tint" id="tasks" className="scroll-mt-28">
        <FeatureDeepDive
          number="04"
          title="Tick a task, the record updates."
          description="Copilot builds your Today list from open loops across your accounts. Each task carries the account, the reason it's here, and the context an agent already gathered."
        >
          <TasksMockup />
        </FeatureDeepDive>
      </Section>

      {/* 7. Agent activity, recorded — coded mockup. */}
      <Section id="activity" className="scroll-mt-28">
        <FeatureDeepDive
          number="05"
          title="Every proposal and action is logged — with who approved it, and why."
          description="An admin-only audit log that your team can inspect at any time. No agent action is a black box."
        >
          <AgentActivityMockup />
        </FeatureDeepDive>
      </Section>

      {/* 8. Final CTA banner. */}
      <Section className="border-t border-border">
        <FinalCtaBanner
          title="See how HeiGin runs your week."
          description="A 30-minute walkthrough on your own workflow — we'll show the workspace against your real pipeline."
          primary={{ label: "Book a call", to: "/contact?intent=demo" }}
          secondary={{ label: "See pricing", to: "/pricing" }}
          trackLocation="product-final"
        />
      </Section>
    </>
  );
}
