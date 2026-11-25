import { useEffect, useRef, useState } from "react";
import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "Lead response time: how fast should you reply to a new
 * lead?". A small metric card charting the odds of contacting a web lead by
 * minutes to the first call, from the InsideSales.com/MIT Lead Response
 * Management Study (2007). On scroll-in, the curve draws, then a marker steps
 * from 5 to 10 to 30 minutes while the chip reads "Best odds", "5× lower" and
 * "100× lower". Loops every ~6.5s; shows the final state when reduced motion
 * is preferred.
 */

// Relative "initial dials to leads that become contacted" from the study,
// normalised to the 5-minute value.
const points = [
  { min: 5, v: 1 },
  { min: 10, v: 1650 / 9400 },
  { min: 15, v: 550 / 9400 },
  { min: 20, v: 300 / 9400 },
  { min: 25, v: 120 / 9400 },
  { min: 30, v: 70 / 9400 },
];

const W = 260;
const H = 44;
const PAD_X = 8;
const PAD_TOP = 6;
const PAD_BOTTOM = 4;

const x = (min: number) => PAD_X + ((min - 5) / 25) * (W - PAD_X * 2);
const y = (v: number) => PAD_TOP + (1 - v) * (H - PAD_TOP - PAD_BOTTOM);

const line = points.map((p, i) => `${i === 0 ? "M" : "L"}${x(p.min)},${y(p.v)}`).join(" ");
const area = `${line} L${x(30)},${H} L${x(5)},${H} Z`;

const stops = [
  { min: 5, label: "Called in 5 min", chip: "Best odds", tone: "success" },
  { min: 10, label: "Called in 10 min", chip: "5× lower", tone: "warning" },
  { min: 30, label: "Called in 30 min", chip: "100× lower", tone: "danger" },
] as const;

export function ThumbResponseDecay({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = empty, 1 = curve drawn, 2..4 = marker at stops[0..2]
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
        window.setTimeout(() => active && setStep(1), 300),
        window.setTimeout(() => active && setStep(2), 1600),
        window.setTimeout(() => active && setStep(3), 2900),
        window.setTimeout(() => active && setStep(4), 4200),
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

  const stop = stops[Math.max(0, Math.min(2, step - 2))]!;
  const stopPoint = points.find((p) => p.min === stop.min)!;
  const showMarker = step >= 2;

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <Timer size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Odds of reaching a lead
          </span>
          <span className="ml-auto text-[9.5px] text-faint">Web leads</span>
        </div>

        {/* Decay chart */}
        <div className="relative mt-2 rounded-lg border border-border bg-background px-1.5 pt-1.5 pb-0.5">
          <div className="relative h-[44px] text-info-ink">
            <svg
              viewBox={`0 0 ${W} ${H}`}
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
              aria-hidden="true"
            >
              <path
                d={area}
                className={cn(
                  "fill-current transition-opacity duration-700",
                  step >= 1 ? "opacity-10" : "opacity-0",
                )}
              />
              <path
                d={line}
                pathLength={1}
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  strokeDasharray: 1,
                  strokeDashoffset: step >= 1 ? 0 : 1,
                  transition: "stroke-dashoffset 1.1s ease-out",
                }}
              />
            </svg>
            {/* Marker (HTML so it stays round when the SVG stretches) */}
            <span
              aria-hidden="true"
              className={cn(
                "absolute size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface shadow transition-all duration-500",
                stop.tone === "success" && "bg-success-ink",
                stop.tone === "warning" && "bg-warning",
                stop.tone === "danger" && "bg-danger-ink",
                showMarker ? "opacity-100" : "opacity-0",
              )}
              style={{
                left: `${(x(stopPoint.min) / W) * 100}%`,
                top: `${(y(stopPoint.v) / H) * 100}%`,
              }}
            />
          </div>
          <div className="mt-0.5 flex justify-between px-0.5 font-mono text-[9.5px] text-faint">
            {points.map((p) => (
              <span key={p.min}>{p.min}m</span>
            ))}
          </div>
        </div>

        {/* Readout */}
        <div
          className={cn(
            "mt-1.5 flex items-center gap-1.5 transition-opacity duration-300",
            showMarker ? "opacity-100" : "opacity-0",
          )}
        >
          <span className="text-[11px] text-foreground">{stop.label}</span>
          <span
            className={cn(
              "ml-auto rounded px-1.5 py-px text-[9.5px] font-medium",
              stop.tone === "success" && "bg-success-soft-bg text-success-ink",
              stop.tone === "warning" && "bg-warning-soft-bg text-warning",
              stop.tone === "danger" && "bg-danger-soft-bg text-danger-ink",
            )}
          >
            {stop.chip}
          </span>
        </div>

        <div className="mt-1.5 border-t border-dashed border-border pt-1.5 text-[9.5px] text-muted-foreground">
          Minutes to first call · InsideSales.com/MIT, 2007
        </div>
      </div>
    </div>
  );
}
