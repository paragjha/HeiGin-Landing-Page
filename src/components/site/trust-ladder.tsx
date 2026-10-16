import { TrustRungBadge } from "@heigin/ui";
import { cn } from "@/lib/utils";

/**
 * Trust ladder: earned autonomy shown as rungs instead of prose.
 * R1 suggest → R2 act with review → R3 act automatically.
 */
const rungs = [
  {
    rung: 1,
    title: "Suggest",
    body: "The agent reads context and recommends. Drafts, flags and lists appear — your team does every action.",
    example: "“Sundaram Mills looks stalled — suggest a check-in this week.”",
  },
  {
    rung: 2,
    title: "Act with review",
    body: "The agent prepares the full action and waits. One click approves it; edits and rejection are equally easy. The default for anything customer-facing.",
    example: "A drafted pricing reply, held until Meera approves it.",
  },
  {
    rung: 3,
    title: "Act automatically",
    body: "Within the scope you grant, the agent acts on its own and logs everything. Reserved for low-risk, internal steps — and revocable at any time.",
    example: "Filing a meeting summary on the right record after a call.",
  },
] as const;

export function TrustLadder() {
  return (
    <ol className="relative space-y-4">
      <span aria-hidden="true" className="absolute bottom-6 left-[21px] top-6 w-px bg-border" />
      {rungs.map((r) => (
        <li key={r.rung} className="relative flex gap-4">
          <span
            aria-hidden="true"
            className={cn(
              "z-10 mt-5 flex size-[11px] shrink-0 translate-x-4 rounded-full border-2 border-background",
              r.rung === 1 ? "bg-muted-foreground" : "bg-info"
            )}
          />
          <div className="flex-1 rounded-lg border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <TrustRungBadge rung={r.rung as 1 | 2 | 3} />
              <p className="text-lg font-semibold text-foreground">{r.title}</p>
              {/* autonomy meter */}
              <span className="ml-auto flex items-center gap-1" aria-label={`Autonomy level ${r.rung} of 3`}>
                {[1, 2, 3].map((i) => (
                  <span
                    key={i}
                    aria-hidden="true"
                    className={cn("h-1.5 w-6 rounded-full", i <= r.rung ? "bg-info" : "bg-muted")}
                  />
                ))}
              </span>
            </div>
            <p className="mt-1.5 text-md leading-relaxed text-muted-foreground">{r.body}</p>
            <p className="mt-2 rounded-md bg-sidebar px-3 py-2 text-sm text-muted-foreground">
              <span className="font-medium text-faint">Example: </span>
              {r.example}
            </p>
          </div>
        </li>
      ))}
    </ol>
  );
}
