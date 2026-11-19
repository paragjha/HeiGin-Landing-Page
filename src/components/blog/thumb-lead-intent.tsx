import { useEffect, useRef, useState } from "react";
import { Flame, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "AI lead scoring: how to read buying intent in what leads
 * say". A buyer's email reply with a three-segment intent meter beneath it.
 * On scroll-in, the reply is read, then the meter fills Cold, Warm, Hot and
 * settles on a Hot label. Loops every ~6.5s; shows the final state when
 * reduced motion is preferred.
 */
const segments = [
  { id: "cold", label: "Cold", on: "bg-info-soft-bg text-info-ink border-info-soft-bg" },
  { id: "warm", label: "Warm", on: "bg-warning-soft-bg text-warning border-warning-soft-bg" },
  { id: "hot", label: "Hot", on: "bg-danger-soft-bg text-danger-ink border-danger-soft-bg" },
];

export function ThumbLeadIntent({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = reading, 1..3 = segments filled, 4 = scored
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
        window.setTimeout(() => active && setStep(s), 1300 + i * 450 + (s === 4 ? 300 : 0)),
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

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <Mail size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Arjun K · Northwind Traders
          </span>
          <span className="ml-auto text-[9.5px] text-faint">Re: quote</span>
        </div>

        {/* The buyer's reply */}
        <p className="mt-2 rounded-lg border border-border bg-background px-2.5 py-1.5 text-[11.5px] leading-snug text-foreground">
          Please send the quote for 500 metres by Friday. Rate thoda kam ho sakta hai?
        </p>

        {/* Intent meter */}
        <div className="mt-2.5 flex items-center gap-2">
          <span className="w-[38px] shrink-0 text-[9.5px] font-medium uppercase tracking-[0.06em] text-faint">
            Intent
          </span>
          <div className="flex flex-1 gap-1" aria-hidden="true">
            {segments.map((s, i) => (
              <span
                key={s.id}
                className={cn(
                  "flex-1 rounded-md border py-0.5 text-center text-[10px] font-medium transition-colors duration-300",
                  step >= i + 1 ? s.on : "border-border bg-surface text-faint",
                )}
              >
                {s.label}
              </span>
            ))}
          </div>
        </div>

        {/* Result line */}
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
          <Flame
            size={10}
            strokeWidth={1.8}
            aria-hidden="true"
            className={cn(
              "shrink-0 transition-colors",
              step >= 4 ? "text-danger-ink" : "text-faint",
            )}
          />
          <span className="truncate">
            {step >= 4 ? "Intent scoring · Hot · answer today" : "Intent scoring · reading reply"}
          </span>
        </div>
      </div>
    </div>
  );
}
