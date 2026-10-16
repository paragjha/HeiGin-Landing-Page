import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/use-cases")({
  head: pageHead(
    "/use-cases",
    "Use Cases",
    "How HeiGin helps prevent missed follow-ups, keep deals moving, qualify leads and surface customers who need attention."
  ),
  component: UseCases,
});

const useCases = [
  {
    id: "follow-ups",
    title: "Preventing missed follow-ups",
    scenario: "A prospect asks a question on a call. The rep means to reply that afternoon. Then three other calls happen.",
    friction: "Follow-ups live in people's heads and scattered notes. Nothing reminds anyone until the prospect goes quiet.",
    helps: "The follow-up agent notices the open question and drafts the reply with the call context, ready for approval.",
    outcome: "Promised replies go out while the conversation is still warm.",
    flow: ["Call ends", "Open question detected", "Reply drafted", "Rep approves", "Logged on timeline"],
    link: { to: "/ai-agents", label: "Follow-up agent" },
  },
  {
    id: "deals",
    title: "Keeping deals moving",
    scenario: "An opportunity sits in Proposal for twelve days. No one has noticed because everyone assumes someone else is on it.",
    friction: "Stalled deals usually surface in a weekly review, long after the right moment to act.",
    helps: "The deal assistant flags inactivity as it happens and suggests a next step that references the last conversation.",
    outcome: "Stalls are caught early, while there's still momentum to recover.",
    flow: ["Activity stops", "Stall flagged", "Next step suggested", "Owner acts"],
    link: { to: "/product", label: "Pipeline view" },
  },
  {
    id: "leads",
    title: "Improving lead qualification",
    scenario: "Twenty enquiries arrive in a week through forms, email and messaging. A few are excellent fits; most aren't.",
    friction: "Sorting leads by hand is slow, and the good ones wait in the same queue as everyone else.",
    helps: "The lead qualification agent organises incoming details and highlights useful qualification signals.",
    outcome: "Your team spends its first hour on the leads most likely to matter.",
    flow: ["Enquiry arrives", "Details organised", "Signals highlighted", "Owner assigned"],
    link: { to: "/ai-agents", label: "Lead qualification agent" },
  },
  {
    id: "attention",
    title: "Surfacing customers who need attention",
    scenario: "A long-standing customer who usually orders monthly hasn't been in touch for two months.",
    friction: "Quiet accounts don't generate alerts. By the time anyone notices, the relationship has cooled.",
    helps: "The customer relationship agent spots unusual quiet and adds the account to this week's list, with the reason.",
    outcome: "Relationships get attention before they need rescuing.",
    flow: ["Pattern changes", "Account surfaced", "Reason explained", "Team reaches out"],
    link: { to: "/ai-agents", label: "Relationship agent" },
  },
  {
    id: "admin",
    title: "Reducing manual CRM administration",
    scenario: "After every meeting, someone is supposed to log notes, update the stage and create tasks. It rarely all happens.",
    friction: "CRM data decays because updating it feels like admin work, not selling.",
    helps: "Connected context lands on the timeline automatically, and agents propose the updates for a quick confirmation.",
    outcome: "The CRM stays accurate without becoming anyone's second job.",
    flow: ["Meeting happens", "Context syncs", "Updates proposed", "One-click confirm"],
    link: { to: "/integrations", label: "Integrations" },
  },
  {
    id: "coordination",
    title: "Coordinating sales workflows",
    scenario: "A deal closes. Onboarding tasks, notifications and a kickoff call all need to happen, in the right order.",
    friction: "Hand-offs depend on checklists that someone has to remember to start.",
    helps: "The workflow agent runs the steps you define, pausing before anything customer-facing.",
    outcome: "Hand-offs happen consistently, every time.",
    flow: ["Deal won", "Tasks created", "Team notified", "Approval before email", "Kickoff booked"],
    link: { to: "/ai-agents", label: "Workflow agent" },
  },
];

function UseCases() {
  return (
    <>
      <PageHero
        eyebrow="Use cases"
        title="Built around the moments relationships slip."
        description="Each use case starts with a real customer-management problem, not a feature list."
      />

      {useCases.map((uc, idx) => (
        <section key={uc.id} id={uc.id} className={cn("border-b border-border", idx % 2 === 1 ? "bg-sidebar" : "bg-background")}>
          <div className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr]">
            <div className={cn(idx % 2 === 1 && "lg:order-2")}>
              <p className="text-sm font-semibold text-faint">0{idx + 1}</p>
              <h2 className="mt-2 text-headline text-foreground">{uc.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{uc.scenario}</p>
              <Link to={uc.link.to} className="mt-5 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
                Related: {uc.link.label} <ArrowRight size={15} aria-hidden="true" />
              </Link>
            </div>
            <div className="space-y-3">
              <div className="rounded-lg border border-border bg-surface p-5">
                <Badge tone="neutral" size="sm">The friction today</Badge>
                <p className="mt-2 text-lg text-foreground">{uc.friction}</p>
              </div>
              <div className="rounded-lg border border-border bg-surface p-5">
                <Badge tone="info" size="sm">How HeiGin helps</Badge>
                <p className="mt-2 text-lg text-foreground">{uc.helps}</p>
                <ol className="mt-4 flex flex-wrap items-center gap-1.5" aria-label="Workflow">
                  {uc.flow.map((step, i) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span className="rounded-md border border-border bg-sidebar px-2.5 py-1 text-sm text-foreground">{step}</span>
                      {i < uc.flow.length - 1 && <ArrowRight size={13} aria-hidden="true" className="text-faint" />}
                    </li>
                  ))}
                </ol>
              </div>
              <div className="rounded-lg border border-border bg-surface p-5">
                <Badge tone="success" size="sm">Expected outcome</Badge>
                <p className="mt-2 text-lg font-medium text-foreground">{uc.outcome}</p>
              </div>
            </div>
          </div>
        </section>
      ))}

    </>
  );
}
