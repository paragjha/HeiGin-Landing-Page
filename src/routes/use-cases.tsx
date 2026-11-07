import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge, Button } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/use-cases")({
  head: pageHead(
    "/use-cases",
    "Use Cases",
    "Five sales problems HeiGin is built around: missed follow-ups, stalled deals, lead qualification, Hinglish calls and CRM admin. Each case names the agent that helps and the record it works on."
  ),
  component: UseCases,
});

/**
 * Each use case names both the agent(s) that help and the record surface where
 * the work happens, per the 2026-11-07 decisions.
 *
 * `agents` and `surfaces` render as pills under the case title so the real
 * vocabulary (Sales Agent, Deal brief, Intent scoring, Call agent, Hinglish
 * support, Copilot) stays visible across the page.
 *
 * `link` is the "Related" callout at the bottom of each case — usually points
 * at /ai-agents so people can read what the named agent actually does.
 */
interface UseCase {
  id: string;
  title: string;
  scenario: string;
  friction: string;
  helps: string;
  outcome: string;
  flow: readonly string[];
  agents: readonly string[];
  surfaces: readonly string[];
  link: { to: string; label: string };
}

const useCases: UseCase[] = [
  {
    id: "follow-ups",
    title: "Missed follow-ups",
    scenario: "A prospect asks a question on a call. The rep means to reply that afternoon. Then three other calls happen.",
    friction: "Follow-ups live in people's heads and scattered notes. Nothing reminds anyone until the prospect goes quiet.",
    helps: "Sales Agent notices the open question and drafts the reply with the call context, ready for your approval. Copilot queues it on your Today list so it doesn't slip.",
    outcome: "Promised replies go out while the conversation is still warm.",
    flow: ["Call ends", "Open question detected", "Reply drafted", "Rep approves", "Logged on timeline"],
    agents: ["Sales Agent", "Copilot"],
    surfaces: ["Today", "Inbox"],
    link: { to: "/ai-agents", label: "Sales Agent" },
  },
  {
    id: "deals",
    title: "Stalled deals",
    scenario: "An opportunity sits in Proposal for twelve days. No one has noticed because everyone assumes someone else is on it.",
    friction: "Stalled deals usually surface in a weekly review, long after the right moment to act.",
    helps: "Deal brief flags inactivity as it happens and suggests a next step that references the last conversation. Copilot proposes the message for you to confirm.",
    outcome: "Stalls are caught early, while there's still momentum to recover.",
    flow: ["Activity stops", "Stall flagged", "Next step suggested", "Owner acts"],
    agents: ["Deal brief", "Copilot"],
    surfaces: ["Pipeline", "Deal page"],
    link: { to: "/product#pipeline", label: "Pipeline view" },
  },
  {
    id: "leads",
    title: "Lead qualification",
    scenario: "Twenty enquiries arrive in a week through forms, email and messaging. A few are excellent fits; most aren't.",
    friction: "Sorting leads by hand is slow, and the good ones wait in the same queue as everyone else.",
    helps: "Intent scoring tags each reply Hot, Warm or Cold from the conversation itself. Sales Agent drafts the response your team sends, in the right tone.",
    outcome: "Your team spends its first hour on the leads most likely to matter.",
    flow: ["Enquiry arrives", "Intent scored", "Reply drafted", "Owner assigned"],
    agents: ["Intent scoring", "Sales Agent"],
    surfaces: ["Inbox", "Lead page"],
    link: { to: "/ai-agents", label: "Intent scoring" },
  },
  {
    id: "calls",
    title: "Hinglish calls and notes",
    scenario: "A rep finishes a Hinglish sales call. Pricing was discussed, a follow-up was promised, and three things need updating on the deal.",
    friction: "English-first tools miss half the context. Reps spend their evening writing up calls, or skip it and the CRM falls behind.",
    helps: "Call agent turns the call into a transcript, summary and suggested tasks. Hinglish support keeps the sale's context intact — the way the conversation actually happened — and updates the record.",
    outcome: "The CRM reflects what was said, in the language it was said in, without anyone writing it up by hand.",
    flow: ["Call ends", "Transcript ready", "Summary + intent", "Tasks proposed", "Record updated"],
    agents: ["Call agent", "Hinglish support"],
    surfaces: ["Lead page", "Contact page", "Deal page"],
    link: { to: "/ai-agents", label: "Call agent" },
  },
  {
    id: "admin",
    title: "CRM admin",
    scenario: "After every meeting, someone is supposed to log notes, update the stage and create tasks. It rarely all happens.",
    friction: "CRM data decays because updating it feels like admin work, not selling.",
    helps: "Connected context lands on the timeline automatically. Copilot proposes the stage changes, task creates and bulk cleanups — one click confirms each one.",
    outcome: "The CRM stays accurate without becoming anyone's second job.",
    flow: ["Meeting happens", "Context syncs", "Updates proposed", "One-click confirm"],
    agents: ["Copilot"],
    surfaces: ["Everywhere"],
    link: { to: "/ai-agents", label: "Copilot" },
  },
  // "Coordinating sales workflows" removed 2026-11-07: the workflow builder is
  // still in design, so there is no "Workflow agent" to cite. Will land as its
  // own case once the builder ships.
];

function UseCases() {
  return (
    <>
      {/* 1. Hero — two-column pattern. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>Use cases</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              Built around the moments relationships slip.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                Five sales problems HeiGin is built around. Each case names the agent that helps and the record
                surface the work lives on.
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

      {/* 2. Pilot teams. */}
      <PilotTeamRow />

      {/* 3. The five use cases — alternating white / tint bands. */}
      {useCases.map((uc, idx) => (
        <section
          key={uc.id}
          id={uc.id}
          className={cn("scroll-mt-28 border-b border-border", idx % 2 === 1 ? "bg-sidebar" : "bg-background")}
        >
          <div className="container-site grid gap-10 py-16 md:py-20 lg:grid-cols-[1fr_1.1fr]">
            <div className={cn(idx % 2 === 1 && "lg:order-2")}>
              <p className="text-sm font-semibold text-faint">0{idx + 1}</p>
              <h2 className="mt-2 text-headline text-foreground">{uc.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{uc.scenario}</p>

              {/* Named agents and surfaces — the real vocabulary, visible at a glance. */}
              <dl className="mt-6 space-y-3">
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">Agents</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {uc.agents.map((a) => (
                      <span key={a} className="rounded-md border border-border bg-surface px-2 py-0.5 text-sm text-foreground">
                        {a}
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">Lives on</dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {uc.surfaces.map((s) => (
                      <span key={s} className="rounded-md border border-border bg-surface px-2 py-0.5 text-sm text-foreground">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <Link to={uc.link.to} className="mt-6 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
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

      {/* 4. Final CTA. */}
      <Section>
        <FinalCtaBanner
          title="See how this plays out on your pipeline."
          description="A 30-minute walkthrough on your own workflow — we'll show the use cases that fit your sales motion."
          primary={{ label: "Book a call", to: "/contact?intent=demo" }}
          secondary={{ label: "See pricing", to: "/pricing" }}
          trackLocation="use-cases-final"
        />
      </Section>
    </>
  );
}
