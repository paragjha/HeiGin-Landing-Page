import type { ReactNode } from "react";
import { ArrowDown, Check, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Small illustrated moments shown at the top of each agent card, one per agent in
 * `@/lib/agents`. They are decorative (the card's title and sentence carry the meaning) and
 * use fictional sample data. Where the product's real output isn't spelled out (for example
 * the contents of a deal brief) they use neutral placeholder bars instead of invented detail.
 * Each is a light "window" so it reads against the dark section.
 */

const tile = "rounded-lg bg-surface text-foreground shadow-card ring-1 ring-black/5";

type Tone = "neutral" | "info" | "success" | "warning";

const tones: Record<Tone, string> = {
  neutral: "bg-muted text-muted-foreground",
  info: "bg-info-soft-bg text-info-ink",
  success: "bg-success-soft-bg text-success-ink",
  warning: "bg-warning-soft-bg text-warning",
};

function Chip({ tone = "neutral", children }: { tone?: Tone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium leading-4",
        tones[tone]
      )}
    >
      {children}
    </span>
  );
}

/** A grey line standing in for text we don't want to invent. */
function Bar({ className }: { className?: string }) {
  return <span className={cn("block h-1.5 rounded-full bg-muted", className)} />;
}

function Copilot() {
  return (
    <div className="w-[88%] space-y-2">
      <div className="ml-auto w-[80%] rounded-lg bg-primary px-3 py-2 text-[11px] leading-snug text-primary-foreground ring-1 ring-white/25">
        Which leads went cold this week?
      </div>
      <div className={cn(tile, "p-3")}>
        <p className="text-[11px] leading-snug text-muted-foreground">
          3 leads have had no reply in 7 days. Move them to Cold?
        </p>
        <div className="mt-2.5 flex gap-1.5">
          <span className="rounded-md bg-primary px-2.5 py-1 text-[11px] font-medium text-primary-foreground">Confirm 3 changes</span>
          <span className="rounded-md border border-border px-2.5 py-1 text-[11px] text-muted-foreground">Cancel</span>
        </div>
      </div>
    </div>
  );
}

function SalesAgent() {
  return (
    <div className={cn(tile, "w-[88%] p-3")}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-semibold">Reply to Kapoor &amp; Co</span>
        <Chip tone="success">
          <Check size={11} strokeWidth={3} aria-hidden="true" />
          Fact-checked
        </Chip>
      </div>
      <div className="mt-2.5 space-y-1.5">
        <Bar className="w-full" />
        <Bar className="w-11/12" />
        <Bar className="w-2/3" />
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border pt-2.5">
        <span className="text-[11px] text-muted-foreground">Sources</span>
        <Chip>Campaign offer</Chip>
        <Chip>FAQ</Chip>
        <Chip>PDF</Chip>
      </div>
    </div>
  );
}

function IntentScoring() {
  const rows: { text: string; label: string; tone: Tone }[] = [
    { text: "Can you send the quote today?", label: "Hot", tone: "warning" },
    { text: "Let's talk again next quarter.", label: "Warm", tone: "info" },
    { text: "Not interested, thanks.", label: "Cold", tone: "neutral" },
  ];
  return (
    <div className="w-[88%] space-y-1.5">
      {rows.map((r) => (
        <div key={r.text} className={cn(tile, "flex items-center justify-between gap-2 px-3 py-2")}>
          <span className="truncate text-[11px] text-foreground">{r.text}</span>
          <Chip tone={r.tone}>{r.label}</Chip>
        </div>
      ))}
    </div>
  );
}

function DealBrief() {
  return (
    <div className={cn(tile, "w-[88%] p-3")}>
      <div className="flex items-center justify-between gap-2">
        <span className="truncate text-xs font-semibold">Kaveri Textiles · Annual supply</span>
        <Chip tone="info">Brief</Chip>
      </div>
      <div className="mt-3 space-y-2">
        <Bar className="w-full" />
        <Bar className="w-5/6" />
        <Bar className="w-full" />
        <Bar className="w-3/5" />
      </div>
    </div>
  );
}

function HinglishSupport() {
  return (
    <div className="w-[88%]">
      <div className={cn(tile, "p-3")}>
        <Chip>Activity note, Hinglish</Chip>
        <p className="mt-1.5 text-[11px] leading-snug text-foreground">Customer ko pricing chahiye, kal call karna hai.</p>
      </div>
      <div className="grid place-items-center py-1 opacity-70" aria-hidden="true">
        <ArrowDown size={14} />
      </div>
      <div className={cn(tile, "p-3")}>
        <Chip tone="success">
          <Check size={11} strokeWidth={3} aria-hidden="true" />
          CRM updated
        </Chip>
        <ul className="mt-2 space-y-1 text-[11px] leading-snug text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Task</span> Call tomorrow
          </li>
          <li>
            <span className="font-medium text-foreground">Context</span> Customer asked for pricing
          </li>
        </ul>
      </div>
    </div>
  );
}

function DocumentsQa() {
  return (
    <div className={cn(tile, "w-[88%] p-3")}>
      <p className="text-xs font-semibold">What notice period does the contract set?</p>
      <div className="mt-2.5 space-y-1.5">
        <Bar className="w-full" />
        <Bar className="w-3/4" />
      </div>
      <div className="mt-3 border-t border-border pt-2.5">
        <Chip tone="info">
          <FileText size={11} aria-hidden="true" />
          Contract.pdf, p. 4
        </Chip>
      </div>
    </div>
  );
}

function CallAgent() {
  const wave = [30, 55, 40, 75, 50, 90, 60, 35, 70, 45, 25, 60, 80, 40];
  return (
    <div className={cn(tile, "w-[88%] p-3")}>
      <div className="flex h-9 items-center gap-[3px]" aria-hidden="true">
        {wave.map((h, i) => (
          <span key={i} className="w-1 rounded-full bg-info" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="mt-2.5 space-y-1.5 border-t border-border pt-2.5">
        {["Transcript", "Summary", "Suggested tasks"].map((label) => (
          <div key={label} className="flex items-center justify-between gap-3">
            <span className="text-[11px] text-muted-foreground">{label}</span>
            <Bar className="w-1/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

const vignettes: Record<string, () => ReactNode> = {
  copilot: Copilot,
  "sales-agent": SalesAgent,
  "intent-scoring": IntentScoring,
  "deal-brief": DealBrief,
  "hinglish-support": HinglishSupport,
  "documents-qa": DocumentsQa,
  "call-agent": CallAgent,
};

/** Illustration for an agent id from `@/lib/agents`. Renders nothing for an unknown id. */
export function AgentVignette({ id }: { id: string }) {
  const Vignette = vignettes[id];
  return Vignette ? <Vignette /> : null;
}
