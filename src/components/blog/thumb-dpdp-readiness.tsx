import { useEffect, useRef, useState } from "react";
import { Check, Database, FileText, Trash2, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "DPDP Act for sales teams: what changes for your CRM". A
 * small readiness checklist for a sales team's CRM data: three items tick
 * themselves off one after another. The header
 * chip carries May 2027, when the core DPDP duties apply. Loops every
 * ~6.5s; shows the finished state when reduced motion is preferred.
 */
interface Item {
  id: string;
  icon: typeof Database;
  title: string;
  context: string;
}

const items: Item[] = [
  {
    id: "a",
    icon: Database,
    title: "Tag every lead with its source",
    context: "Website form · trade fair · import",
  },
  {
    id: "b",
    icon: FileText,
    title: "Record the purpose shared",
    context: "Quotation request · Kaveri Textiles",
  },
  { id: "c", icon: Trash2, title: "Review cold leads for erasure", context: "Owner · Meera S" },
];

export function ThumbDpdpReadiness({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  const [done, setDone] = useState<Set<string>>(new Set());
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setDone(new Set(items.map((i) => i.id)));
      return;
    }
    let active = true;
    let timers: number[] = [];
    const schedule = () => {
      if (!active) return;
      timers.forEach(clearTimeout);
      setDone(new Set());
      timers = items.map((it, i) =>
        window.setTimeout(() => active && setDone((d) => new Set([...d, it.id])), 800 + i * 900),
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
      <div className="w-full max-w-[290px]">
        {/* Checklist card */}
        <div className="rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-2 text-[10.5px]">
            <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
              <ShieldCheck size={11} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <span className="font-semibold tracking-tight text-foreground">
              DPDP readiness · Sales CRM
            </span>
            <span className="ml-auto rounded-full bg-info-soft-bg px-1.5 py-0.5 text-[9.5px] font-medium text-info-ink">
              May 2027
            </span>
          </div>

          <ul className="mt-2 flex flex-col gap-1.5">
            {items.map((it) => {
              const isDone = done.has(it.id);
              const Icon = it.icon;
              return (
                <li
                  key={it.id}
                  className={cn(
                    "flex items-center gap-2.5 rounded-md border border-border px-2.5 py-1.5 transition-colors duration-500",
                    isDone ? "bg-success-soft-bg/40" : "bg-background",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex size-4 flex-none items-center justify-center rounded border transition-colors",
                      isDone
                        ? "border-success-ink bg-success-ink text-background"
                        : "border-border text-muted-foreground",
                    )}
                  >
                    {isDone ? (
                      <Check size={9} strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <Icon size={9} strokeWidth={1.8} aria-hidden="true" />
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p
                      className={cn(
                        "truncate text-[11.5px] font-medium",
                        isDone ? "text-muted-foreground" : "text-foreground",
                      )}
                    >
                      {it.title}
                    </p>
                    <p className="truncate text-[10px] text-faint">{it.context}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
