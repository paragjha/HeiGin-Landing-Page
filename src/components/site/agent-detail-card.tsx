import type { Agent } from "@/lib/agents";
import { agentStatusLabels } from "@/lib/agents";
import { AgentVignette } from "@/components/mockups/agent-vignettes";
import { cn } from "@/lib/utils";

/**
 * Richer per-agent card used on /ai-agents. Builds on the existing
 * AgentVignette illustration and the shared agent catalogue, and adds
 * explicit lines for Context / What it can do / Oversight.
 *
 * Fields that the catalogue has not filled in yet (context, actions,
 * oversight) render a "To confirm with the product team" chip instead of
 * blank text — so unfilled rows show up as actionable follow-ups.
 */
export function AgentDetailCard({ agent }: { agent: Agent }) {
  return (
    <article className="flex h-full flex-col rounded-2xl bg-surface p-3 ring-1 ring-border">
      <div aria-hidden="true" className="relative flex h-52 items-center justify-center overflow-hidden rounded-xl bg-sidebar">
        <AgentVignette id={agent.id} />
      </div>
      <div className="flex flex-1 flex-col px-3 pb-3 pt-5">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{agent.name}</h3>
          {agent.status !== "available" && (
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {agentStatusLabels[agent.status]}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-md leading-relaxed text-muted-foreground">{agent.summary}</p>

        <dl className="mt-auto space-y-3 pt-5 text-sm">
          <DetailRow label="Appears in" value={agent.appearsIn} />
          <DetailRow label="Context it reads" value={agent.context} />
          <DetailRow label="What it can do" value={agent.actions} />
          <DetailRow label="Oversight" value={agent.oversight} />
        </dl>
      </div>
    </article>
  );
}

function DetailRow({ label, value }: { label: string; value: string | undefined }) {
  const missing = !value;
  return (
    <div className="grid gap-0.5">
      <dt className="text-xs font-semibold uppercase tracking-[0.08em] text-faint">{label}</dt>
      <dd className={cn("text-md leading-relaxed", missing ? "text-faint italic" : "text-foreground")}>
        {value ?? (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-0.5 text-xs not-italic text-muted-foreground">
            To confirm with the product team
          </span>
        )}
      </dd>
    </div>
  );
}
