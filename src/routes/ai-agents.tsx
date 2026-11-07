import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, FileSearch, GitBranch, ListChecks, Sparkles, UserCheck } from "lucide-react";
import { Button } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section, SectionHeading } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { AgentDetailCard } from "@/components/site/agent-detail-card";
import { OversightRow } from "@/components/site/oversight-row";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";
import { agents } from "@/lib/agents";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-agents")({
  head: pageHead(
    "/ai-agents",
    "AI Agents",
    "Seven agents, each with one job. HeiGin's agents read customer context, notice what needs attention, and help your team act — inside limits you set."
  ),
  component: AiAgents,
});

const loopSteps = [
  { icon: Eye, label: "Observe", body: "Read the customer context: meetings, messages, records." },
  { icon: FileSearch, label: "Identify", body: "Spot a signal: an open loop, a stalled deal, a quiet account." },
  { icon: Sparkles, label: "Reason", body: "Work out the most useful next step from the context." },
  { icon: GitBranch, label: "Propose or act", body: "Draft the action, or execute it if its permissions allow." },
  { icon: UserCheck, label: "Record", body: "Log what happened, why, and who approved it." },
];

function OperatingLoop() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % loopSteps.length), 2600);
    return () => clearInterval(t);
  }, []);

  return (
    <ol className="grid gap-3 md:grid-cols-5">
      {loopSteps.map((s, i) => (
        <li key={s.label}>
          <button
            type="button"
            onClick={() => setActive(i)}
            aria-pressed={i === active}
            className={cn(
              "flex h-full w-full flex-col rounded-xl border p-4 text-left transition-colors",
              i === active
                ? "border-night-foreground/40 bg-night-surface"
                : "border-night-border bg-transparent hover:bg-night-surface/60"
            )}
          >
            <s.icon size={18} strokeWidth={1.7} aria-hidden="true" className="text-night-foreground" />
            <span className="mt-3 text-lg font-semibold text-night-foreground">
              {i + 1}. {s.label}
            </span>
            <span className="mt-1 text-md leading-relaxed text-night-muted">{s.body}</span>
          </button>
        </li>
      ))}
    </ol>
  );
}

function AiAgents() {
  return (
    <>
      {/* 1. Hero — two-column pattern matching the approved home layout. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>AI Agents</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              Seven agents. Each with one job.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                HeiGin's agents read your customer context, notice what needs attention, and help your team act —
                inside limits you set.
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

      {/* 2. Pilot teams — same quiet row as the home page. */}
      <PilotTeamRow />

      {/* 3. Operating loop — dark one-off spotlight. */}
      <Section dark>
        <SectionHeading
          dark
          eyebrow="The operating loop"
          title="How an agent works, step by step."
          description="The loop runs continuously. Where a step requires human approval, the agent waits."
        />
        <div className="mt-12">
          <OperatingLoop />
        </div>
        <p className="mt-6 text-md text-night-muted">
          Learning from updated context is part of the design; how much adaptation is enabled is configurable and
          confirmed with each pilot team.
        </p>
      </Section>

      {/* 4. The seven agents — detail grid. */}
      <Section>
        <SectionHeading
          eyebrow="The agents"
          title="Specific jobs, not vague AI."
          description="Each agent has a defined scope: what it reads, what it can do, and how review works. Rows marked to confirm are being filled in with the product team."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentDetailCard key={agent.id} agent={agent} />
          ))}
        </div>
      </Section>

      {/* 5. How oversight actually works — real guardrails (not R1/R2/R3). */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Oversight"
          title="How oversight actually works."
          description="Agents act inside the same permissions, approvals and audit log that back everything else your team does in HeiGin."
        />
        <div className="mt-12">
          <OversightRow />
        </div>
      </Section>

      {/* 6. Workflow builder — honest "in design" callout. */}
      <Section>
        <div className="rounded-xl border border-border bg-sidebar p-6 md:p-8">
          <div className="flex items-start gap-4">
            <ListChecks size={20} strokeWidth={1.7} aria-hidden="true" className="mt-1 shrink-0 text-foreground" />
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">Workflow builder: in design</h3>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A visual builder for multi-step agent workflows is being designed with pilot teams: pick a trigger,
                define the steps, and mark which ones pause for approval. We'll publish an interactive preview here
                once it matches what the product actually does.
              </p>
              <a href="/contact?intent=pilot" className="mt-4 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
                Help shape it as a pilot team <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. Final CTA banner. */}
      <Section className="border-t border-border">
        <FinalCtaBanner
          title="Try the agents with your team."
          description="A 30-minute walkthrough on your own workflow — we'll show the agents against your real pipeline."
          primary={{ label: "Book a call", to: "/contact?intent=demo" }}
          secondary={{ label: "Apply for the pilot", to: "/contact?intent=pilot" }}
          trackLocation="ai-agents-final"
        />
      </Section>
    </>
  );
}
