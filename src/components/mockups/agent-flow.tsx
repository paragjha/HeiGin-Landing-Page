import type { LucideIcon } from "lucide-react";

export interface AgentFlowStep {
  icon: LucideIcon;
  label: string;
  body: string;
}

/**
 * Visual pipeline for one agent: context in, action proposed, human gate,
 * result recorded. Replaces a wall of text with a readable left-to-right flow.
 */
export function AgentFlow({ steps }: { steps: AgentFlowStep[] }) {
  return (
    <ol className="relative grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <div aria-hidden="true" className="flow-beam absolute inset-x-6 top-[22px] hidden h-px xl:block" />
      {steps.map((s, i) => (
        <li key={s.label} className="relative rounded-lg border border-border bg-background p-4">
          <div className="flex items-center gap-2.5">
            <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-surface">
              <s.icon size={15} strokeWidth={1.8} aria-hidden="true" className="text-foreground" />
            </span>
            <span aria-hidden="true" className="text-xs font-semibold text-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-faint">{s.label}</p>
          <p className="mt-1.5 text-md leading-relaxed text-foreground">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
