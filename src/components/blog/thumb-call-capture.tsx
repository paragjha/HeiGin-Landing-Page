import { useEffect, useRef, useState } from "react";
import { Check, ListTodo, Phone } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "CRM adoption: why sales reps don't update the CRM, and how
 * to fix it". A finished Hinglish call shown as a waveform. On scroll-in,
 * the Call agent works through the recording bar by bar (status in the header), a summary with its
 * intent lands beneath it, a suggested task appears, and the rep confirms
 * it. Loops every ~6.5s; shows the final state when reduced motion is
 * preferred. All names are fictional.
 */
const bars = [
  30, 55, 40, 70, 45, 85, 60, 35, 50, 75, 90, 65, 40, 55, 30, 45, 70, 50, 80, 60, 35, 55, 75, 45,
  30, 60, 85, 50, 40, 65, 35, 25,
];

export function ThumbCallCapture({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = call ended, 1 = processing, 2 = summary shown, 3 = task suggested, 4 = confirmed
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
      timers = [
        window.setTimeout(() => active && setStep(1), 600),
        window.setTimeout(() => active && setStep(2), 2300),
        window.setTimeout(() => active && setStep(3), 3100),
        window.setTimeout(() => active && setStep(4), 4300),
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

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-success-soft-bg text-success-ink">
            <Phone size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Call · Kaveri Textiles
          </span>
          <span className="ml-auto text-[9.5px] text-faint">
            {step === 0 ? "Hinglish · 3:40 pm" : step === 1 ? "Transcribing…" : "Transcript ready"}
          </span>
        </div>

        {/* Recording waveform */}
        <div className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1">
          <div className="flex h-[20px] flex-1 items-center gap-[2px]" aria-hidden="true">
            {bars.map((h, i) => (
              <span
                key={i}
                className={cn(
                  "flex-1 rounded-full transition-colors duration-200",
                  step >= 1 ? "bg-info-ink" : "bg-border",
                )}
                style={{ height: `${h}%`, transitionDelay: step === 1 ? `${i * 45}ms` : "0ms" }}
              />
            ))}
          </div>
          <span className="shrink-0 font-mono text-[9.5px] text-muted-foreground">6:42</span>
        </div>
        {/* Summary */}
        <div
          className={cn(
            "mt-1.5 border-l-2 border-info-soft-bg pl-2 transition-opacity duration-300",
            step >= 2 ? "opacity-100" : "opacity-0",
          )}
        >
          <p className="text-[11px] leading-snug text-foreground">
            Wants revised pricing for a larger order by Friday.
          </p>
          <div className="mt-1 flex items-center gap-1">
            <span className="rounded bg-warning-soft-bg px-1.5 py-px text-[9.5px] font-medium text-warning">
              Intent · Warm
            </span>
            <span className="rounded bg-background px-1.5 py-px text-[9.5px] text-muted-foreground">
              Source · call
            </span>
          </div>
        </div>

        {/* Suggested task */}
        <div
          className={cn(
            "mt-1.5 flex items-center gap-1.5 rounded-md border border-border bg-background px-2 py-1 transition-opacity duration-300",
            step >= 3 ? "opacity-100" : "opacity-0",
          )}
        >
          <ListTodo
            size={11}
            strokeWidth={1.8}
            aria-hidden="true"
            className="shrink-0 text-muted-foreground"
          />
          <span className="truncate text-[10.5px] text-foreground">Send revised quote · Fri</span>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            className={cn(
              "ml-auto inline-flex shrink-0 items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium transition-colors",
              step >= 4 ? "bg-success-soft-bg text-success-ink" : "bg-foreground text-background",
            )}
          >
            <Check size={9} strokeWidth={2.4} aria-hidden="true" />
            {step >= 4 ? "Confirmed" : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
}
