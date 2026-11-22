import { useEffect, useRef, useState, type ReactNode } from "react";
import { Check, Clock, Columns3 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "Sales pipeline stages: how to set them up so deals don't
 * stall". A three-column pipeline board. On scroll-in, Copilot proposes
 * moving Kaveri Textiles from Quote sent to Negotiation, the move is
 * confirmed and the card lands in the next column, then Deal brief flags
 * Sundaram Mills as stalled in Qualified. Loops every ~6.5s; shows the
 * final state when reduced motion is preferred.
 */
type Stage = 0 | 1 | 2 | 3;

function MiniDeal({
  name,
  value,
  className,
  children,
}: {
  name: string;
  value: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-md border border-border bg-background px-1.5 py-1 transition-colors duration-300",
        className,
      )}
    >
      <p className="text-[10px] font-medium leading-tight text-foreground">{name}</p>
      <p className="text-[9.5px] leading-tight text-muted-foreground">{value}</p>
      {children}
    </div>
  );
}

export function ThumbPipelineStages({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = idle, 1 = move proposed, 2 = move confirmed, 3 = stall flagged
  const [stage, setStage] = useState<Stage>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(3);
      return;
    }
    let active = true;
    let timers: number[] = [];
    const schedule = () => {
      if (!active) return;
      timers.forEach(clearTimeout);
      setStage(0);
      timers = [
        window.setTimeout(() => active && setStage(1), 700),
        window.setTimeout(() => active && setStage(2), 2000),
        window.setTimeout(() => active && setStage(3), 3200),
        window.setTimeout(schedule, 6500),
      ];
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          schedule();
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => {
      active = false;
      timers.forEach(clearTimeout);
      io.disconnect();
    };
  }, []);

  const moved = stage >= 2;
  const stalled = stage >= 3;

  const columns = [
    { id: "qualified", label: "Qualified", count: 1 },
    { id: "quote", label: "Quote sent", count: moved ? 0 : 1 },
    { id: "negotiation", label: "Negotiation", count: moved ? 1 : 0 },
  ];

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[300px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <Columns3 size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">Sales pipeline</span>
          <span className="ml-auto text-[9.5px] text-faint">2 open deals</span>
        </div>

        {/* Board */}
        <div className="mt-2 grid grid-cols-3 gap-1.5" aria-hidden="true">
          {columns.map((col) => (
            <div key={col.id} className="min-w-0 rounded-lg bg-background/60 p-1">
              <div className="mb-1 flex items-center justify-between px-0.5 text-[9.5px] font-medium uppercase tracking-[0.02em] text-faint">
                <span className="truncate">{col.label}</span>
                <span>{col.count}</span>
              </div>
              <div className="min-h-[58px] space-y-1">
                {col.id === "qualified" ? (
                  <MiniDeal
                    name="Sundaram Mills"
                    value="₹4,15,000"
                    className={stalled ? "border-warning-soft-bg bg-warning-soft-bg" : undefined}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex items-center gap-0.5 text-[9.5px] font-medium leading-tight transition-opacity duration-300",
                        stalled ? "text-warning opacity-100" : "opacity-0",
                      )}
                    >
                      <Clock size={8} strokeWidth={2} />
                      Stalled 12d
                    </span>
                  </MiniDeal>
                ) : null}

                {col.id === "quote" ? (
                  <>
                    {!moved ? (
                      <MiniDeal
                        name="Kaveri Textiles"
                        value="₹8,40,000"
                        className={stage === 1 ? "border-info-soft-bg bg-info-soft-bg" : undefined}
                      />
                    ) : (
                      <div className="flex h-[42px] items-center justify-center rounded-md border border-dashed border-border text-[9.5px] text-faint">
                        Empty
                      </div>
                    )}
                  </>
                ) : null}

                {col.id === "negotiation" ? (
                  moved ? (
                    <MiniDeal
                      name="Kaveri Textiles"
                      value="₹8,40,000"
                      className="border-success-soft-bg bg-success-soft-bg"
                    >
                      <span className="mt-0.5 flex items-center gap-0.5 text-[9.5px] font-medium leading-tight text-success-ink">
                        <Check size={8} strokeWidth={2.4} />
                        Confirmed
                      </span>
                    </MiniDeal>
                  ) : (
                    <div className="flex h-[42px] items-center justify-center rounded-md border border-dashed border-border text-[9.5px] text-faint">
                      Empty
                    </div>
                  )
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Footer line */}
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
          <Check
            size={10}
            strokeWidth={2}
            aria-hidden="true"
            className={cn("shrink-0 transition-colors", moved ? "text-success-ink" : "text-faint")}
          />
          <span className="truncate">
            {stalled
              ? "Deal brief · 1 stall flagged · 1 move confirmed"
              : moved
                ? "Stage change confirmed · Meera S"
                : stage === 1
                  ? "Copilot: move Kaveri Textiles to Negotiation?"
                  : "Deal brief watching 2 open deals"}
          </span>
        </div>
      </div>
    </div>
  );
}
