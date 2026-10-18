import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { agents, agentStatusLabels } from "@/lib/agents";
import { AgentVignette } from "@/components/mockups/agent-vignettes";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/**
 * Card grid for the agent catalogue: each card leads with a small illustration of the agent at
 * work, then its name, one sentence and where it appears. Used on the home page (dark section)
 * and the AI agents page (light section). The last grid cell is a link tile that spans the
 * remaining columns, so the grid fills its final row.
 */

const themes = {
  dark: {
    card: "bg-night-surface ring-1 ring-night-border",
    well: "bg-night",
    title: "text-night-foreground",
    body: "text-night-muted",
    badge: "border-night-border text-night-muted",
    tile: "border-night-border hover:bg-night-surface",
    tileIcon: "border-night-border text-night-foreground",
    chip: "border-night-border text-night-muted",
  },
  light: {
    card: "bg-surface ring-1 ring-border",
    well: "bg-sidebar",
    title: "text-foreground",
    body: "text-muted-foreground",
    badge: "border-border text-muted-foreground",
    tile: "border-border hover:bg-sidebar",
    tileIcon: "border-border text-foreground",
    chip: "border-border text-muted-foreground",
  },
} as const;

export function AgentGrid({
  tone,
  tile,
}: {
  tone: keyof typeof themes;
  tile: { to: string; title: string; body: string; chips?: string[] };
}) {
  const t = themes[tone];
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {agents.map((agent, idx) => (
        <Reveal key={agent.id} delay={idx * 70} className="h-full">
          <article className={cn("flex h-full flex-col rounded-2xl p-3", t.card)}>
            <div aria-hidden="true" className={cn("relative flex h-52 items-center justify-center overflow-hidden rounded-xl", t.well)}>
              <AgentVignette id={agent.id} />
            </div>
            <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h3 className={cn("text-xl font-semibold tracking-tight", t.title)}>{agent.name}</h3>
                {agent.status !== "available" && (
                  <span className={cn("rounded-full border px-2.5 py-0.5 text-xs", t.badge)}>
                    {agentStatusLabels[agent.status]}
                  </span>
                )}
              </div>
              <p className={cn("mt-1.5 text-md leading-relaxed", t.body)}>{agent.summary}</p>
              <div className={cn("mt-auto space-y-1 pt-4 text-sm", t.body)}>
                <p>
                  <span className={cn("font-medium", t.title)}>Appears in</span> {agent.appearsIn}
                </p>
                {agent.oversight && (
                  <p>
                    <span className={cn("font-medium", t.title)}>Oversight</span> {agent.oversight}
                  </p>
                )}
              </div>
            </div>
          </article>
        </Reveal>
      ))}
      <Reveal delay={agents.length * 70} className="h-full sm:col-span-1 lg:col-span-2">
        <Link
          to={tile.to}
          className={cn(
            "group flex h-full min-h-56 flex-col justify-between gap-8 rounded-2xl border border-dashed p-6 transition-colors",
            t.tile
          )}
        >
          <span className="flex flex-wrap gap-2">
            {tile.chips?.map((chip) => (
              <span key={chip} className={cn("rounded-md border px-2.5 py-1 text-sm", t.chip)}>
                {chip}
              </span>
            ))}
          </span>
          <span className="flex items-end justify-between gap-6">
            <span>
              <span className={cn("block text-3xl font-semibold tracking-tight", t.title)}>{tile.title}</span>
              <span className={cn("mt-1.5 block max-w-md text-md leading-relaxed", t.body)}>{tile.body}</span>
            </span>
            <span
              className={cn(
                "flex size-10 shrink-0 items-center justify-center rounded-md border transition-transform group-hover:translate-x-0.5",
                t.tileIcon
              )}
            >
              <ArrowRight size={18} aria-hidden="true" />
            </span>
          </span>
        </Link>
      </Reveal>
    </div>
  );
}
