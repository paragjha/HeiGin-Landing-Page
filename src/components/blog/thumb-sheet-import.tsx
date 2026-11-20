import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, FileSpreadsheet } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "CRM vs spreadsheet: when should your sales team switch?".
 * A CSV import card that maps spreadsheet columns on the left to CRM fields
 * on the right. On scroll-in, each column is matched in turn, then the
 * footer confirms the mapping. Loops every ~6.5s; shows the final state when
 * reduced motion is preferred.
 */
const columns = [
  { id: "firm", from: "Firm name", to: "Company" },
  { id: "person", from: "Contact person", to: "Contact" },
  { id: "mobile", from: "Mobile no.", to: "Phone" },
];

export function ThumbSheetImport({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = nothing mapped, 1..3 = columns mapped, 4 = ready
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
        window.setTimeout(() => active && setStep(s), 700 + i * 550 + (s === 4 ? 250 : 0)),
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

  const mapped = Math.min(step, columns.length);

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-success-soft-bg text-success-ink">
            <FileSpreadsheet size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">leads-2026.csv</span>
          <span className="ml-auto text-[9.5px] text-faint">CSV import</span>
        </div>

        {/* Column headers */}
        <div className="mt-2 grid grid-cols-[1fr_14px_1fr] items-center gap-1.5 text-[9.5px] font-medium uppercase tracking-[0.06em] text-faint">
          <span>Sheet column</span>
          <span />
          <span>HeiGin field</span>
        </div>

        {/* Mapping rows */}
        <ul className="mt-1 space-y-1" aria-hidden="true">
          {columns.map((c, i) => {
            const on = mapped >= i + 1;
            return (
              <li key={c.id} className="grid grid-cols-[1fr_14px_1fr] items-center gap-1.5">
                <span className="truncate rounded-md border border-border bg-background px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                  {c.from}
                </span>
                <ArrowRight
                  size={11}
                  strokeWidth={1.8}
                  className={cn(
                    "transition-colors duration-300",
                    on ? "text-info-ink" : "text-faint",
                  )}
                />
                <span
                  className={cn(
                    "flex items-center gap-1 truncate rounded-md border px-2 py-0.5 text-[10.5px] font-medium transition-colors duration-300",
                    on
                      ? "border-info-soft-bg bg-info-soft-bg text-info-ink"
                      : "border-dashed border-border bg-surface text-faint",
                  )}
                >
                  {on ? c.to : "Choose field"}
                  {on ? <Check size={9} strokeWidth={2.2} className="ml-auto shrink-0" /> : null}
                </span>
              </li>
            );
          })}
        </ul>

        {/* Result line */}
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
          <Check
            size={10}
            strokeWidth={2}
            aria-hidden="true"
            className={cn(
              "shrink-0 transition-colors",
              step >= 4 ? "text-success-ink" : "text-faint",
            )}
          />
          <span className="truncate">
            {step >= 4
              ? "3 of 3 columns mapped · ready to import"
              : `Guided column mapping · ${mapped} of 3`}
          </span>
        </div>
      </div>
    </div>
  );
}
