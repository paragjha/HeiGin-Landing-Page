import { useEffect, useRef, useState } from "react";
import { FileText, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "AI sales agents: how to stop them making things up". A
 * Sales Agent draft reply whose factual claims are checked one by one
 * against the campaign's sources. Claims found in a source turn green and
 * light up the matching source chip; the claim found in no source is
 * flagged amber for a person to review. Loops every ~6.5s; shows the final
 * state when reduced motion is preferred.
 */
const sources = [
  { id: "rate", label: "Rate card.pdf" },
  { id: "faq", label: "FAQs" },
  { id: "offer", label: "Offer" },
];

export function ThumbGroundedReply({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = drafted, 1..3 = claims checked, 4 = summary shown
  const [step, setStep] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStep(4);
      return;
    }
    let active = true;
    let timers: number[] = [];
    const schedule = () => {
      if (!active) return;
      timers.forEach(clearTimeout);
      setStep(0);
      timers = [1, 2, 3, 4].map((s, i) =>
        window.setTimeout(() => active && setStep(s), 1200 + i * 600),
      );
      timers.push(window.setTimeout(schedule, 6500));
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

  const found = "bg-success-soft-bg text-success-ink";
  const flagged = "bg-warning-soft-bg text-warning";
  const claim = (n: number, ok: boolean) =>
    cn(
      "rounded px-0.5 transition-colors duration-300",
      step >= n ? (ok ? found : flagged) : "bg-background",
    );

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <Sparkles size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Sales Agent · draft reply
          </span>
          <span className="ml-auto text-[9.5px] text-faint">Sundaram Mills</span>
        </div>

        {/* Draft with its factual claims */}
        <p className="mt-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[11.5px] leading-[1.55] text-foreground">
          Our rate for 300 m is <span className={claim(1, true)}>₹185 per metre</span>, dispatch
          takes <span className={claim(2, true)}>5 working days</span>, and{" "}
          <span className={claim(3, false)}>delivery to Pune is free</span>.
        </p>

        {/* Sources the draft is checked against */}
        <div className="mt-2 flex items-center gap-1" aria-hidden="true">
          {sources.map((s, i) => {
            const lit = i < 2 && step >= i + 1;
            return (
              <span
                key={s.id}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9.5px] font-medium transition-colors duration-300",
                  lit
                    ? "border-success-soft-bg bg-success-soft-bg text-success-ink"
                    : "border-border bg-surface text-faint",
                )}
              >
                <FileText size={9} strokeWidth={1.8} aria-hidden="true" />
                {s.label}
              </span>
            );
          })}
        </div>

        {/* Result line */}
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
          <ShieldCheck
            size={10}
            strokeWidth={1.8}
            aria-hidden="true"
            className={cn("shrink-0 transition-colors", step >= 4 ? "text-warning" : "text-faint")}
          />
          <span className="truncate">
            {step >= 4
              ? "Fact-check · 2 found · 1 not in sources, review"
              : "Fact-check · checking claims"}
          </span>
        </div>
      </div>
    </div>
  );
}
