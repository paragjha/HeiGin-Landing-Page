import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { WorkspaceMockup } from "@/components/mockups/workspace-mockup";
import { PipelineMockup } from "@/components/mockups/pipeline-mockup";
import { TasksMockup } from "@/components/mockups/tasks-mockup";
import { AgentActivityMockup } from "@/components/mockups/agent-activity-mockup";
import { WorkflowDemo } from "@/components/mockups/workflow-demo";
import { AppFrame } from "@/components/site/app-frame";
import quotesShot from "@/assets/app-quotes.png.asset.json";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product")({
  head: pageHead(
    "/product",
    "Product",
    "Your customer relationships, connected and actionable. Records, conversations, pipeline, tasks and agent actions in one workspace."
  ),
  component: Product,
});

const tourViews = [
  {
    id: "record",
    label: "Customer record",
    value: "The full story of a relationship: timeline, open loops and agent insight in one place.",
    render: <WorkspaceMockup />,
  },
  {
    id: "pipeline",
    label: "Pipeline",
    value: "Opportunities with risk flags raised as they happen, each with the reason attached.",
    render: <PipelineMockup />,
  },
  {
    id: "tasks",
    label: "Tasks",
    value: "A to-do list the agents build from open loops across your accounts.",
    render: <TasksMockup />,
  },
  {
    id: "activity",
    label: "Agent activity",
    value: "An inspectable log of everything agents proposed and did, and who approved it.",
    render: <AgentActivityMockup />,
  },
  {
    id: "quotes",
    label: "Quotes & Payments",
    value: "Customer quotes with versions and approval statuses: a real screen from the live product.",
    render: (
      <AppFrame
        shot={quotesShot}
        alt="HeiGin Quotes & Payments screen listing customer quotes with version, status, total and updated date"
      />
    ),
  },
];

function Product() {
  const [view, setView] = useState(0);
  const current = tourViews[view]!;

  return (
    <>
      <PageHero
        eyebrow="Product"
        title="Your customer relationships, connected and actionable."
        description="Contacts, companies, opportunities, conversations and tasks share one model, so agent insight turns straight into work your team can do."
      />

      {/* Interactive tour */}
      <Section>
        <SectionHeading
          eyebrow="Product tour"
          title="Four views, one connected workspace."
         
        />
        <div className="mt-10">
          <div role="tablist" aria-label="Product views" className="flex flex-wrap gap-1.5">
            {tourViews.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={i === view}
                onClick={() => { setView(i); track("product_tour_interacted", { tour: "product", view: v.id }); }}
                className={cn(
                  "rounded-md border px-4 py-2 text-md font-medium transition-colors",
                  i === view
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-muted-foreground hover:bg-accent"
                )}
              >
                {v.label}
              </button>
            ))}
          </div>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground" aria-live="polite">
            {current.value}
          </p>
          <div className="mt-6 animate-rise" key={current.id} role="tabpanel" aria-label={current.label}>
            {current.render}
          </div>
        </div>
      </Section>

      {/* Traditional vs agent-assisted */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="The shift"
          title="Same CRM job. A very different week."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
          <div className="bg-surface p-6 md:p-8">
            <Badge tone="neutral" size="sm">Traditional CRM workflow</Badge>
            <ol className="mt-5 space-y-3">
              {[
                "Notice the pricing question while re-reading call notes",
                "Look up the rates in a spreadsheet or chat thread",
                "Draft the reply from scratch",
                "Send it, hopefully before the customer follows up",
                "Log the activity by hand, if there's time",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-lg text-muted-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold text-muted-foreground">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
          <div className="bg-surface p-6 md:p-8">
            <Badge tone="info" size="sm">Agent-assisted workflow</Badge>
            <ol className="mt-5 space-y-3">
              {[
                "The agent flags the open question within the hour",
                "The draft arrives with the discussed rates attached",
                "You review and approve in one click",
                "The reply sends and logs itself on the timeline",
                "The open loop closes and the deal stays on track",
              ].map((s, i) => (
                <li key={s} className="flex gap-3 text-lg text-foreground">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-semibold text-foreground">{i + 1}</span>
                  {s}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Full workflow */}
      <Section>
        <SectionHeading
          eyebrow="End to end"
          title="Watch one relationship move forward."
          description="The same interactive walkthrough as on the home page: meeting to closed loop."
        />
        <div className="mt-12"><WorkflowDemo /></div>
        <Link to="/ai-agents" className="mt-8 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
          Next: how the agents work <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>

    </>
  );
}
