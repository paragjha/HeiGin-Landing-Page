import { useEffect, useRef, useState } from "react";
import { Check, Scale } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "DPDP Act for sales teams: what changes for your CRM". A
 * rollout stepper for the DPDP Act and Rules: November 2025, November 2026
 * and May 2027. On scroll-in, the track fills phase by phase, then the May
 * 2027 node lights up and the duties that start then appear as chips.
 * Loops every ~6.5s; shows the final state when reduced motion is preferred.
 */
const phases = [
  { id: "p1", when: "Nov 2025", what: "Rules published" },
  { id: "p2", when: "Nov 2026", what: "Consent Managers" },
  { id: "p3", when: "May 2027", what: "Core duties" },
];

const duties = ["Notice + consent", "Erasure", "Breach in 72h"];

export function ThumbDpdpReadiness({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = nothing reached, 1..3 = phases reached, 4 = duties shown
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
        window.setTimeout(() => active && setStep(s), 500 + i * 900),
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

  // Track fill: 0% before phase 2, 50% at phase 2, 100% at phase 3.
  const fill = step <= 1 ? 0 : step === 2 ? 50 : 100;

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <Scale size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">DPDP Act · rollout</span>
          <span className="ml-auto text-[9.5px] text-faint">India</span>
        </div>

        {/* Stepper */}
        <div className="relative mt-3">
          <div
            className="absolute left-[42px] right-[42px] top-[9px] h-0.5 rounded-full bg-border"
            aria-hidden="true"
          >
            <div
              className="h-full rounded-full bg-success-ink transition-[width] duration-700 ease-out"
              style={{ width: `${fill}%` }}
            />
          </div>
          <ol className="relative flex justify-between">
            {phases.map((p, i) => {
              const reached = step >= i + 1;
              const isLast = i === phases.length - 1;
              return (
                <li key={p.id} className="flex w-[84px] flex-col items-center text-center">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2 bg-surface transition-colors duration-500",
                      reached && !isLast && "border-success-ink bg-success-ink text-background",
                      reached && isLast && "border-info-ink bg-info-soft-bg text-info-ink",
                      !reached && "border-border text-faint",
                      isLast &&
                        step === 3 &&
                        "motion-safe:animate-[pulse_1.4s_ease-in-out_infinite]",
                    )}
                  >
                    {reached && !isLast ? (
                      <Check size={10} strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <span className="text-[9.5px] font-semibold">{i + 1}</span>
                    )}
                  </span>
                  <span
                    className={cn(
                      "mt-1.5 text-[11px] font-semibold tracking-tight transition-colors",
                      reached ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {p.when}
                  </span>
                  <span className="text-[9.5px] leading-tight text-faint">{p.what}</span>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Duties that start in May 2027 */}
        <div className="mt-3 rounded-md border border-dashed border-border bg-background px-2 py-1.5">
          <p className="text-[9.5px] font-medium uppercase tracking-[0.06em] text-faint">
            From May 2027
          </p>
          <div className="mt-1 flex flex-wrap gap-1">
            {duties.map((d, i) => (
              <span
                key={d}
                className={cn(
                  "rounded-full border px-1.5 py-0.5 text-[10px] font-medium transition-all duration-500",
                  step >= 4
                    ? "border-info-soft-bg bg-info-soft-bg text-info-ink opacity-100"
                    : "border-border bg-surface text-faint opacity-60",
                )}
                style={{ transitionDelay: step >= 4 ? `${i * 120}ms` : "0ms" }}
              >
                {d}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
