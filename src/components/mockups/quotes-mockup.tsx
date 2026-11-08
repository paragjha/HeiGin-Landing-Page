import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Clock, Eye, FileText, Link2, Sparkles } from "lucide-react";
import { Badge, Card, CardHeader } from "@heigin/ui";
import { cn } from "@/lib/utils";

/**
 * Coded Quotes & Payments mockup. Mirrors the shape of the real app screen —
 * a header strip (GST state + a public share link), then a short table of
 * customer quotes with version, status, total and updated-at.
 *
 * The newest row flips from "Viewed" to "Approved" when the mockup scrolls
 * into view, so the mockup carries a small "it just happened" beat and a
 * payment-status pill appears next to it.
 *
 * All numbers are fictional demo data; nothing hits a real API.
 */

type Status = "Draft" | "Sent" | "Viewed" | "Approved" | "Paid";

interface Row {
  customer: string;
  deal: string;
  version: string;
  status: Status;
  total: string;
  updated: string;
}

const initialRows: Row[] = [
  {
    customer: "Kaveri Textiles",
    deal: "Annual supply",
    version: "v3",
    status: "Paid",
    total: "₹8,40,000",
    updated: "2d",
  },
  {
    customer: "Northwind Traders",
    deal: "Q4 restock",
    version: "v2",
    status: "Sent",
    total: "₹2,60,000",
    updated: "yesterday",
  },
  {
    customer: "Sundaram Mills",
    deal: "New account",
    version: "v1",
    status: "Draft",
    total: "₹4,15,000",
    updated: "today",
  },
  {
    customer: "ADLantic Pilot",
    deal: "Discovery",
    version: "v1",
    status: "Viewed",
    total: "₹1,20,000",
    updated: "3h ago",
  },
];

const statusTone: Record<Status, { tone: "neutral" | "info" | "success" | "warning"; icon: typeof FileText }> = {
  Draft: { tone: "neutral", icon: FileText },
  Sent: { tone: "info", icon: Clock },
  Viewed: { tone: "warning", icon: Eye },
  Approved: { tone: "success", icon: CheckCircle2 },
  Paid: { tone: "success", icon: CheckCircle2 },
};

export function QuotesMockup() {
  const [rows, setRows] = useState<Row[]>(initialRows);
  const [flash, setFlash] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // When the mockup scrolls into view, the Viewed quote flips to Approved
  // after a beat. Respects prefers-reduced-motion.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let t1: number | undefined;
    let t2: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        t1 = window.setTimeout(() => {
          setRows((prev) =>
            prev.map((r) =>
              r.customer === "ADLantic Pilot" ? { ...r, status: "Approved", updated: "just now" } : r
            )
          );
          t2 = window.setTimeout(() => setFlash(true), 500);
        }, 1400);
      },
      { rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (t1 !== undefined) window.clearTimeout(t1);
      if (t2 !== undefined) window.clearTimeout(t2);
    };
  }, []);

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-border px-5 py-4">
        <CardHeader
          title="Customer quotes"
          description="GST-correct, versioned, with a public link for the customer"
        />
      </div>

      {/* State strip — GST info + public link indicator, mirrors the real app chrome. */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-border bg-sidebar px-5 py-2.5 text-sm">
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Sparkles size={13} strokeWidth={1.7} aria-hidden="true" className="text-info-ink" />
          Auto GST · place of supply: Karnataka
        </span>
        <span className="hidden text-faint sm:inline">·</span>
        <span className="inline-flex items-center gap-1.5 text-muted-foreground">
          <Link2 size={13} strokeWidth={1.7} aria-hidden="true" />
          Each quote has a public share link
        </span>
      </div>

      <div ref={ref}>
        {/* Table header (desktop) */}
        <div className="hidden grid-cols-[1.6fr_0.5fr_1fr_1fr_0.9fr] items-center gap-3 border-b border-border bg-sidebar/60 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-faint sm:grid">
          <span>Customer · Deal</span>
          <span>Version</span>
          <span>Status</span>
          <span className="text-right">Total</span>
          <span className="text-right">Updated</span>
        </div>

        <ul>
          {rows.map((row, i) => {
            const tone = statusTone[row.status];
            const Icon = tone.icon;
            return (
              <li
                key={row.customer}
                className={cn(
                  "transition-colors",
                  i < rows.length - 1 && "border-b border-border",
                  row.customer === "ADLantic Pilot" && flash && "bg-success-soft-bg/30"
                )}
              >
                {/* Desktop grid row */}
                <div className="hidden grid-cols-[1.6fr_0.5fr_1fr_1fr_0.9fr] items-center gap-3 px-5 py-3 sm:grid">
                  <div className="min-w-0">
                    <p className="truncate text-md font-medium text-foreground">{row.customer}</p>
                    <p className="truncate text-sm text-muted-foreground">{row.deal}</p>
                  </div>
                  <span className="text-md font-mono text-muted-foreground">{row.version}</span>
                  <Badge tone={tone.tone} size="sm">
                    <Icon size={11} strokeWidth={2} aria-hidden="true" className="mr-1" />
                    {row.status}
                  </Badge>
                  <span className="text-right text-md font-medium text-foreground">{row.total}</span>
                  <span className="text-right text-sm text-muted-foreground">{row.updated}</span>
                </div>

                {/* Mobile stacked row */}
                <div className="flex flex-col gap-2 px-5 py-3 sm:hidden">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate text-md font-medium text-foreground">{row.customer}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {row.deal} · <span className="font-mono">{row.version}</span>
                      </p>
                    </div>
                    <span className="shrink-0 text-md font-semibold text-foreground">{row.total}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <Badge tone={tone.tone} size="sm">
                      <Icon size={11} strokeWidth={2} aria-hidden="true" className="mr-1" />
                      {row.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{row.updated}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {flash && (
          <p className="update-flash flex items-center gap-2 border-t border-border bg-info-soft-bg px-5 py-2.5 text-sm font-medium text-info-ink">
            <CheckCircle2 size={14} aria-hidden="true" />
            ADLantic Pilot approved the quote — logged on the deal timeline
          </p>
        )}
      </div>
    </Card>
  );
}
