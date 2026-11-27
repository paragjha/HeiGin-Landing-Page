import { useEffect, useRef, useState } from "react";
import { ArrowDown, CircleSlash, MessageSquareQuote, PhoneCall, UserRound } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "Win-loss analysis: how to find out why you really lose
 * deals". A correction, shown as a before and after on one closed-lost deal:
 * the rep's note says "Lost on price", then the buyer's own words from a
 * follow-up call arrive below it, the rep's guess is struck through and the
 * checked reason, timing, takes its place. Loops every ~6.4s; shows the
 * corrected state when reduced motion is preferred. All names are fictional.
 */
export function ThumbLostReason({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  const [stage, setStage] = useState<"guess" | "call" | "checked">("guess");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage("checked");
      return;
    }
    let active = true;
    let timers: number[] = [];
    const schedule = () => {
      if (!active) return;
      timers.forEach(clearTimeout);
      setStage("guess");
      timers = [
        window.setTimeout(() => active && setStage("call"), 1400),
        window.setTimeout(() => active && setStage("checked"), 3000),
        window.setTimeout(schedule, 6400),
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

  const heard = stage !== "guess";
  const checked = stage === "checked";

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-danger-soft-bg text-danger-ink">
            <CircleSlash size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">Sundaram Mills</span>
          <span className="ml-auto rounded-full bg-background px-1.5 py-0.5 text-[9.5px] font-medium text-muted-foreground">
            Closed lost
          </span>
        </div>

        {/* Rep's guess */}
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1.5">
          <UserRound
            size={12}
            strokeWidth={1.8}
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="text-[9.5px] text-faint">Rep's note</span>
          <span
            className={cn(
              "ml-auto text-[11px] font-medium transition-colors duration-300",
              checked ? "text-faint line-through" : "text-foreground",
            )}
          >
            Lost on price
          </span>
        </div>

        <div className="flex justify-center py-0.5">
          <ArrowDown
            size={11}
            strokeWidth={1.8}
            className={cn(
              "transition-colors duration-300",
              heard ? "text-info-ink" : "text-border",
            )}
            aria-hidden="true"
          />
        </div>

        {/* Buyer's words */}
        <div
          className={cn(
            "rounded-lg border px-2 py-1.5 transition-colors duration-300",
            heard
              ? "border-transparent bg-info-soft-bg"
              : "border-dashed border-border bg-background",
          )}
        >
          <div className="flex items-center gap-1.5 text-[9.5px]">
            <PhoneCall
              size={10}
              strokeWidth={1.8}
              className={heard ? "text-info-ink" : "text-faint"}
              aria-hidden="true"
            />
            <span className={cn("font-medium", heard ? "text-info-ink" : "text-faint")}>
              Buyer call · 2 weeks later
            </span>
          </div>
          <p
            className={cn(
              "mt-0.5 flex items-start gap-1 text-[11px] leading-snug transition-opacity duration-300",
              heard ? "text-foreground opacity-100" : "text-muted-foreground opacity-60",
            )}
          >
            <MessageSquareQuote
              size={11}
              strokeWidth={1.8}
              className="mt-px shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            {heard ? "“Your quote came 4 days after theirs.”" : "Not asked yet"}
          </p>
        </div>

        <div className="mt-1.5 flex items-center gap-1.5 border-t border-dashed border-border pt-1.5 text-[9.5px] text-muted-foreground">
          <span>Checked reason</span>
          <span
            className={cn(
              "ml-auto rounded-full px-1.5 py-0.5 font-medium transition-colors duration-300",
              checked ? "bg-success-soft-bg text-success-ink" : "bg-background text-faint",
            )}
          >
            {checked ? "Timing, not price" : "Pending"}
          </span>
        </div>
      </div>
    </div>
  );
}
