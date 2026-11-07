import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Framed scene card for the 2x2 "Specialized workflows" grid.
 *
 * Each card uses the same painterly landscape as the hero (so the artwork
 * becomes a recurring motif), with a dark overlay to keep the title readable.
 * The product mock sits inside a glass frame that stays sharp against the art.
 */
export function WorkflowCard({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <article className={cn("relative overflow-hidden rounded-[1.75rem] border border-border", className)}>
      {/* Painterly backdrop + a deep wash so labels stay readable. */}
      <img
        src="/images/hero-landscape.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-foreground/55 via-foreground/35 to-foreground/55" />

      <div className="relative flex flex-col gap-5 p-6 md:p-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-background/70">{eyebrow}</p>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight text-background">{title}</h3>
          <p className="mt-2 max-w-md text-md leading-relaxed text-background/85">{description}</p>
        </div>

        {/* Glass frame holding the small animation. */}
        <div className="rounded-xl bg-white/15 p-1.5 ring-1 ring-white/30 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.4)] backdrop-blur-md">
          <div className="rounded-lg border border-border bg-surface p-4 md:p-5">{children}</div>
        </div>
      </div>
    </article>
  );
}
