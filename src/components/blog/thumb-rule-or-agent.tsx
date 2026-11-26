import { useEffect, useRef, useState } from "react";
import { FileText, MessageSquareQuote, PhoneMissed, Sparkles, Split, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Thumbnail for "AI agents vs automation: which one should run your sales
 * work?". A fork: one incoming sales event at the top splits into two lanes,
 * Rule and Agent. On scroll-in, three events arrive in turn and each is sent
 * down one branch: a lead form and a missed call go to the Rule lane, a
 * buyer's price reply goes to the Agent lane, which drafts a reply for a
 * person to confirm. Loops every ~6.6s; shows the price question routed to
 * the Agent lane when reduced motion is preferred. All names are fictional.
 */

type Lane = "rule" | "agent";

const events: {
  icon: typeof FileText;
  text: string;
  source: string;
  lane: Lane;
  result: string;
}[] = [
  {
    icon: FileText,
    text: "Kaveri Textiles",
    source: "Lead form",
    lane: "rule",
    result: "Lead added, owner set",
  },
  {
    icon: MessageSquareQuote,
    text: "“Match ₹182/m for 2,000 m?”",
    source: "Reply",
    lane: "agent",
    result: "Drafted, you confirm",
  },
  {
    icon: PhoneMissed,
    text: "Northwind Traders",
    source: "Missed call",
    lane: "rule",
    result: "Lead added, call task",
  },
];

const lanes: { id: Lane; label: string; icon: typeof Zap; idle: string }[] = [
  { id: "rule", label: "Rule", icon: Zap, idle: "Same steps every time" },
  { id: "agent", label: "Agent", icon: Sparkles, idle: "Needs judgement" },
];

export function ThumbRuleOrAgent({ tone = "light" }: { tone?: "light" | "dark" } = {}) {
  const [index, setIndex] = useState(0);
  const [routed, setRouted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIndex(1);
      setRouted(true);
      return;
    }
    let active = true;
    let timers: number[] = [];
    const show = (i: number, r: boolean) => {
      if (!active) return;
      setIndex(i);
      setRouted(r);
    };
    const schedule = () => {
      if (!active) return;
      timers.forEach(clearTimeout);
      show(0, false);
      timers = [
        window.setTimeout(() => show(0, true), 700),
        window.setTimeout(() => show(1, false), 2200),
        window.setTimeout(() => show(1, true), 2900),
        window.setTimeout(() => show(2, false), 4400),
        window.setTimeout(() => show(2, true), 5100),
        window.setTimeout(schedule, 6600),
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

  const event = events[index]!;
  const EventIcon = event.icon;

  return (
    <div
      ref={ref}
      className="flex h-full w-full items-center justify-center overflow-hidden p-4"
      data-tone={tone}
    >
      <div className="w-full max-w-[290px] rounded-xl border border-border bg-surface p-3 shadow-[0_8px_24px_-8px_rgba(0,0,0,0.3)]">
        <div className="flex items-center gap-2 text-[10.5px]">
          <span className="flex size-5 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
            <Split size={11} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <span className="font-semibold tracking-tight text-foreground">Rule or agent?</span>
          <span className="ml-auto font-mono text-[9.5px] text-faint">{index + 1}/3</span>
        </div>

        {/* Incoming event */}
        <div
          key={index}
          className="mt-2 flex items-center gap-2 rounded-lg border border-border bg-background px-2 py-1.5 animate-in fade-in duration-300"
        >
          <EventIcon
            size={12}
            strokeWidth={1.8}
            className="shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <p className="min-w-0 flex-1 truncate text-[11px] leading-tight text-foreground">
            {event.text}
          </p>
          <span className="shrink-0 text-[9.5px] text-faint">{event.source}</span>
        </div>

        {/* Fork */}
        <svg viewBox="0 0 260 14" className="block h-3.5 w-full" aria-hidden="true">
          <path
            d="M130 0 V4 Q130 7 124 7 H71 Q65 7 65 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
            className={cn(
              "transition-colors duration-300",
              routed && event.lane === "rule" ? "text-success-ink" : "text-border",
            )}
          />
          <path
            d="M130 0 V4 Q130 7 136 7 H189 Q195 7 195 14"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.4}
            vectorEffect="non-scaling-stroke"
            className={cn(
              "transition-colors duration-300",
              routed && event.lane === "agent" ? "text-info-ink" : "text-border",
            )}
          />
        </svg>

        {/* Lanes */}
        <div className="grid grid-cols-2 gap-1.5">
          {lanes.map((lane) => {
            const on = routed && event.lane === lane.id;
            const LaneIcon = lane.icon;
            return (
              <div
                key={lane.id}
                className={cn(
                  "rounded-lg border px-2 py-1.5 transition-colors duration-300",
                  on && lane.id === "rule" && "border-transparent bg-success-soft-bg",
                  on && lane.id === "agent" && "border-transparent bg-info-soft-bg",
                  !on && "border-border bg-background",
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-1 text-[10.5px] font-semibold",
                    on && lane.id === "rule" && "text-success-ink",
                    on && lane.id === "agent" && "text-info-ink",
                    !on && "text-foreground",
                  )}
                >
                  <LaneIcon size={10} strokeWidth={2} aria-hidden="true" />
                  {lane.label}
                </div>
                <p
                  className={cn(
                    "mt-0.5 truncate text-[9.5px] leading-tight",
                    on ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {on ? event.result : lane.idle}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-1.5 border-t border-dashed border-border pt-1.5 text-[9.5px] text-muted-foreground">
          Routine steps run on rules · judgement goes to an agent
        </div>
      </div>
    </div>
  );
}
