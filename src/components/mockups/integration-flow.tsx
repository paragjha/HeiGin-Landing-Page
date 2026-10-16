import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface FlowNode {
  label: string;
  sub?: string;
}

/**
 * Context flow visual: connected tools → customer record → agent action.
 * Purely illustrative of the data flow, not a claim that any specific
 * integration is live.
 */
export function IntegrationFlow({
  sources,
  target = "Customer record",
  action = "Agent action",
  dark = false,
}: {
  sources: FlowNode[];
  target?: string;
  action?: string;
  dark?: boolean;
}) {
  const nodeClass = cn(
    "rounded-lg border px-3.5 py-2.5 text-center",
    dark ? "border-night-border bg-night-surface" : "border-border bg-surface"
  );
  const labelClass = cn("text-md font-semibold", dark ? "text-night-foreground" : "text-foreground");
  const subClass = cn("text-sm", dark ? "text-night-muted" : "text-muted-foreground");
  const arrowClass = cn("shrink-0", dark ? "text-night-muted" : "text-faint");

  return (
    <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center md:gap-5">
      <div className="flex flex-col gap-2.5">
        {sources.map((s) => (
          <div key={s.label} className={nodeClass}>
            <p className={labelClass}>{s.label}</p>
            {s.sub && <p className={subClass}>{s.sub}</p>}
          </div>
        ))}
      </div>
      <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" className={cn(arrowClass, "rotate-90 md:rotate-0")} />
      <div className={cn(nodeClass, dark ? "border-night-foreground/30" : "border-ink/20", "px-5 py-3.5")}>
        <p className={labelClass}>{target}</p>
        <p className={subClass}>One connected timeline</p>
      </div>
      <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" className={cn(arrowClass, "rotate-90 md:rotate-0")} />
      <div className={cn(nodeClass, dark ? "bg-night-foreground text-night" : "bg-primary", "px-5 py-3.5")}>
        <p className={cn("text-md font-semibold", dark ? "text-night" : "text-primary-foreground")}>{action}</p>
        <p className={cn("text-sm", dark ? "text-night/70" : "text-primary-foreground/70")}>Proposed with context</p>
      </div>
    </div>
  );
}
