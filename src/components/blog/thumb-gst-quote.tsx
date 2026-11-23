import { useEffect, useRef, useState } from "react";
import { ArrowRight, MapPin, ReceiptIndianRupee } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "GST quotation format: what to include so the quote
 * matches the invoice". A quote's tax summary: supplier State on the left,
 * delivery State on the right, then the tax lines and the total. On
 * scroll-in, the delivery moves from Bengaluru to Coimbatore and the tax
 * line changes from CGST + SGST to IGST while the total stays the same.
 * Loops every ~6.5s; shows the inter-State state when reduced motion is
 * preferred. All names and figures are fictional.
 */
type Stage = 0 | 1 | 2;

export function ThumbGstQuote({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  // 0 = intra-State quote, 1 = delivery State changing, 2 = inter-State quote
  const [stage, setStage] = useState<Stage>(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setStage(2);
      return;
    }
    let active = true;
    let timers: number[] = [];
    const schedule = () => {
      if (!active) return;
      timers.forEach(clearTimeout);
      setStage(0);
      timers = [
        window.setTimeout(() => active && setStage(1), 1600),
        window.setTimeout(() => active && setStage(2), 2500),
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

  const inter = stage === 2;

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <ReceiptIndianRupee size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">
            Quote v2 · Sundaram Mills
          </span>
          <span className="ml-auto text-[9.5px] text-faint">GST quote</span>
        </div>

        {/* From State and delivery State */}
        <div className="mt-2 flex items-center gap-1.5 text-[10.5px]" aria-hidden="true">
          <span className="inline-flex min-w-0 items-center gap-1 rounded-md border border-border bg-background px-1.5 py-0.5 font-medium text-foreground">
            <MapPin size={9} strokeWidth={2} className="shrink-0 text-faint" />
            <span className="truncate">Bengaluru, KA</span>
          </span>
          <ArrowRight size={10} strokeWidth={1.8} className="shrink-0 text-faint" />
          <span
            className={cn(
              "inline-flex min-w-0 items-center gap-1 rounded-md border px-1.5 py-0.5 font-medium text-foreground transition-colors duration-300",
              stage === 1 ? "border-info-soft-bg bg-info-soft-bg" : "border-border bg-background",
            )}
          >
            <MapPin size={9} strokeWidth={2} className="shrink-0 text-faint" />
            <span className="truncate">{inter ? "Coimbatore, TN" : "Bengaluru, KA"}</span>
          </span>
          <span className="ml-auto shrink-0 text-[9.5px] text-faint">Delivery</span>
        </div>

        {/* Tax lines */}
        <div
          className="mt-2 space-y-0.5 rounded-lg bg-background/60 px-2 py-1.5"
          aria-hidden="true"
        >
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Taxable value</span>
            <span className="font-medium tabular-nums text-foreground">₹79,800</span>
          </div>
          <div
            className={cn(
              "flex items-center justify-between rounded px-1 -mx-1 text-[11px] transition-colors duration-300",
              inter ? "bg-info-soft-bg" : "bg-success-soft-bg",
            )}
          >
            <span className={inter ? "text-info-ink" : "text-success-ink"}>
              {inter ? "IGST @ 18%" : "CGST 9% + SGST 9%"}
            </span>
            <span className="font-medium tabular-nums text-foreground">
              {inter ? "₹14,364" : "₹7,182 + ₹7,182"}
            </span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-0.5 text-[11.5px] font-semibold text-foreground">
            <span>Total</span>
            <span className="tabular-nums">₹94,164</span>
          </div>
        </div>

        {/* Footer line */}
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-border bg-background px-2 py-1 text-[10px] text-muted-foreground">
          <span
            aria-hidden="true"
            className={cn(
              "size-1.5 shrink-0 rounded-full transition-colors",
              inter ? "bg-info-ink" : "bg-success-ink",
            )}
          />
          <span className="truncate">
            {inter
              ? "Place of supply · Tamil Nadu · inter-State"
              : "Place of supply · Karnataka · intra-State"}
          </span>
        </div>
      </div>
    </div>
  );
}
