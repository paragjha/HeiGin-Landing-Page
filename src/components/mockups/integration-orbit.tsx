import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import { integrations, statusLabels } from "@/lib/integrations";
import { LogoMark } from "@/components/site/logo";
import { IntegrationLogo } from "@/components/integration-logo";
import { cn } from "@/lib/utils";

/**
 * Arc visual: integrations sit on a curved horizon feeding the HeiGin hub.
 * Signals travel along the arc into the hub, drop into a live message card
 * (demo data), then branch to the timeline and the agents.
 */

// Quadratic arc in a 100 x 70 viewBox.
const P0 = { x: -4, y: 34 };
const P1 = { x: 50, y: 6 };
const P2 = { x: 104, y: 34 };
const ARC = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`;
const at = (t: number) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
});
const SLOTS = [0.1, 0.2, 0.3, 0.4, 0.6, 0.7, 0.8, 0.9];
const HUB = at(0.5);

// Demo messages only — shown cycling in the card.
const messages = [
  { id: "whatsapp", name: "Priya Shah", text: "Can you send the revised quote with GST?" },
  { id: "gmail", name: "Rahul Mehta", text: "We'd like to move ahead with 20 seats." },
  { id: "google-meet", name: "Call with Anika", text: "Agreed on a pilot starting next Monday." },
  { id: "slack", name: "#sales", text: "Heads up: Kapoor & Co went quiet." },
];

export function IntegrationOrbit({ className }: { className?: string }) {
  const featured = integrations.filter((i) => i.featured);
  const rest = integrations.filter((i) => !i.featured);
  const nodes = [...featured, ...rest].slice(0, SLOTS.length);
  const ordered = [nodes[6], nodes[4], nodes[2], nodes[0], nodes[1], nodes[3], nodes[5], nodes[7]].filter((i): i is (typeof nodes)[number] => Boolean(i));
  const [reducedMotion, setReducedMotion] = useState(false);
  const [msg, setMsg] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    if (mq.matches) return;
    const t = window.setInterval(() => setMsg((m) => (m + 1) % messages.length), 3200);
    return () => window.clearInterval(t);
  }, []);

  const current = messages[msg]!;
  const source = integrations.find((i) => i.id === current.id);

  return (
    <>
      <div className={cn("relative mx-auto hidden aspect-[10/7] w-full max-w-[720px] sm:block", className)}>
        <svg viewBox="0 0 100 70" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
          <path d={ARC} fill="none" className="stroke-info/40" strokeWidth={0.2} />
          <path d={ARC} fill="none" className="loop-dash stroke-info" strokeWidth={0.2} strokeDasharray="1 3" />
          {/* hub → card */}
          <line x1={HUB.x} y1={HUB.y + 7} x2={50} y2={42} className="stroke-info/60" strokeWidth={0.2} />
          {/* card → outputs */}
          <path d="M 28 42 H 22 V 56" fill="none" className="stroke-info/50" strokeWidth={0.2} />
          <path d="M 72 42 H 78 V 56" fill="none" className="stroke-info/50" strokeWidth={0.2} />
          {!reducedMotion && (
            <>
              {SLOTS.map((t, i) => (
                <circle key={t} r="0.5" className="fill-info">
                  <animateMotion
                    dur="2.4s"
                    begin={`${i * 0.3}s`}
                    repeatCount="indefinite"
                    path={ARC}
                    keyPoints={`${t};0.5`}
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                </circle>
              ))}
              <circle r="0.5" className="fill-info">
                <animateMotion dur="1.6s" repeatCount="indefinite" path={`M ${HUB.x} ${HUB.y + 7} L 50 42`} />
              </circle>
              <circle r="0.5" className="fill-info">
                <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path="M 28 42 H 22 V 56" />
              </circle>
              <circle r="0.5" className="fill-info">
                <animateMotion dur="1.6s" begin="0.8s" repeatCount="indefinite" path="M 72 42 H 78 V 56" />
              </circle>
            </>
          )}
        </svg>

        {/* hub */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${HUB.x}%`, top: `${(HUB.y / 70) * 100}%` }}
        >
          <span aria-hidden="true" className="hub-pulse absolute inset-0 rounded-2xl bg-info/30" />
          <LogoMark className="relative size-16 rounded-2xl shadow-lg md:size-20" />
        </div>

        {/* nodes on the arc */}
        <ul>
          {ordered.map((item, i) => {
            const p = at(SLOTS[i]!);
            return (
              <li
                key={item.id}
                className="node-float absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${(p.y / 70) * 100}%`, animationDelay: `${i * 0.4}s` }}
              >
                <div className="orbit-node-in group relative" style={{ animationDelay: `${i * 0.12}s` }}>
                  <IntegrationLogo
                    integration={item}
                    className="size-10 rounded-xl p-2 shadow-sm transition-transform group-hover:scale-110 md:size-12"
                  />
                  <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-2 py-1 text-xs text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    {item.name} · {statusLabels[item.status]}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* live message card (demo data) */}
        <div className="absolute left-1/2 top-[60%] w-[44%] -translate-x-1/2 -translate-y-1/2">
          <div
            key={msg}
            className="animate-rise flex items-center gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 shadow-lg"
          >
            {source && <IntegrationLogo integration={source} className="size-8 shrink-0 p-1" />}
            <div className="min-w-0 text-left">
              <p className="truncate text-sm font-semibold text-foreground">{current.name}</p>
              <p className="truncate text-xs text-muted-foreground">{current.text}</p>
            </div>
          </div>
        </div>

        {/* outputs */}
        <div className="absolute left-[22%] top-[84%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
          <LogoMark className="size-11 rounded-xl shadow-md" />
          <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">Added to timeline</span>
        </div>
        <div className="absolute left-[78%] top-[84%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5">
          <span className="flex size-11 items-center justify-center rounded-xl border border-border bg-surface text-info shadow-md">
            <Sparkles className="size-5" aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap text-xs font-medium text-muted-foreground">Agent drafts next step</span>
        </div>

        <p className="absolute inset-x-0 bottom-0 text-center text-xs text-faint">
          <span className="mr-1.5 inline-block size-2 rounded-full bg-info align-middle" />
          All integrations live except WhatsApp (in development)
        </p>
      </div>

      {/* Stacked grid fallback for small screens */}
      <ul className={cn("grid grid-cols-2 gap-2.5 sm:hidden", className)}>
        {ordered.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5 rounded-lg border border-border bg-surface px-3 py-2.5">
            <IntegrationLogo integration={item} className="size-8 p-1" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground">{statusLabels[item.status]}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
