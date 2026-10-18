import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Eye, FileSearch, GitBranch, ListChecks, Sparkles, UserCheck } from "lucide-react";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { agents } from "@/lib/agents";
import { AgentGrid } from "@/components/site/agent-grid";
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

const numberWords = ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
const liveCount = agents.filter((a) => a.status === "available").length;
const pendingCount = agents.length - liveCount;
const agentsSummary =
  `Each agent has a defined scope. ${numberWords[liveCount]![0]!.toUpperCase()}${numberWords[liveCount]!.slice(1)} ${liveCount === 1 ? "is" : "are"} live today` +
  (pendingCount > 0 ? ` and ${numberWords[pendingCount]} ${pendingCount === 1 ? "is" : "are"} in development.` : ".");

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
          description={agentsSummary}
        />
        <div className="mt-12">
          <AgentGrid
            tone="light"
            tile={{
              to: "/contact",
              title: "Try the agents with your team",
              body: "Request early access and we'll set up a walkthrough on your own use case.",
            }}
          />
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
