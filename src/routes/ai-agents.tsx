import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, BookOpen, Database, Eye, FileSearch, GitBranch, ListChecks, Sparkles, UserCheck } from "lucide-react";
import { Badge } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { agents, agentStatusLabels } from "@/lib/agents";
import { AgentFlow } from "@/components/mockups/agent-flow";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/ai-agents")({
  head: pageHead(
    "/ai-agents",
    "AI Agents",
    "Don't just track the work. Move it forward. How HeiGin's AI agents observe, propose and act within the permissions your team sets."
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
      <PageHero
        eyebrow="AI agents"
        title="Don't just track the work. Move it forward."
        description="HeiGin's agents read customer context, notice what needs attention, and help your team act, inside limits you control."
      />

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

      <Section>
        <SectionHeading
          eyebrow="The agents"
          title="Specific jobs, not vague AI."
          description="Each agent has a defined scope and is available today. Approvals keep you in control of what it sends or changes."
        />
        <div className="mt-12 space-y-6">
          {agents.map((agent, idx) => (
            <article
              key={agent.id}
              className={cn(
                "grid gap-6 rounded-xl border border-border bg-surface p-6 md:p-8 lg:grid-cols-[1fr_1.3fr]",
                idx % 2 === 1 && "bg-sidebar"
              )}
            >
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-3xl font-semibold tracking-tight text-foreground">{agent.name}</h3>
                  <Badge tone={agent.status === "planned" ? "outline" : "info"} size="sm">
                    {agentStatusLabels[agent.status]}
                  </Badge>
                </div>
                <p className="mt-3 text-lg text-muted-foreground">{agent.problem}</p>
                <div className="mt-5 rounded-lg border border-border bg-background p-4">
                  <p className="text-sm font-semibold uppercase tracking-wide text-faint">Scenario</p>
                  <p className="mt-1.5 text-md leading-relaxed text-foreground">{agent.scenario}</p>
                </div>
              </div>
              <div className="content-start">
                <AgentFlow
                  steps={[
                    { icon: BookOpen, label: "Context it uses", body: agent.context },
                    { icon: Sparkles, label: "What it does", body: agent.action },
                    { icon: UserCheck, label: "Human oversight", body: agent.approval },
                    { icon: Database, label: "Result in the CRM", body: agent.result },
                  ]}
                />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-xl border border-border bg-sidebar p-6 md:p-8">
          <div className="flex items-start gap-4">
            <ListChecks size={20} strokeWidth={1.7} aria-hidden="true" className="mt-1 shrink-0 text-foreground" />
            <div>
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">Workflow builder: in design</h3>
              <p className="mt-2 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                A visual builder for multi-step agent workflows is being designed with pilot teams: pick a trigger,
                define the steps, and mark which ones pause for approval. We'll publish an interactive preview here
                once it matches what the product actually does.
              </p>
              <a href="/contact" className="mt-4 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
                Help shape it as a pilot team <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </Section>

    </>
  );
}
