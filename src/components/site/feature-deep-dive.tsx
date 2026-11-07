import type { ReactNode } from "react";

/**
 * Numbered feature section used in the home page's deep dives and (planned)
 * in Product / AI Agents / Use Cases page sections.
 *
 * Layout: mono-numbered label + title on top-left, long-form description on
 * top-right, framed visual below sitting over the painterly landscape in a
 * glass frame. This is the recurring visual motif across the site.
 */
export function FeatureDeepDive({
  number,
  title,
  description,
  children,
}: {
  number: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-start lg:gap-16">
        <div>
          <p className="font-mono text-sm font-medium tracking-wider text-faint">{number}</p>
          <h2 className="mt-2 text-balance text-headline text-foreground">{title}</h2>
        </div>
        <p className="max-w-xl text-lg leading-relaxed text-muted-foreground lg:pt-8">{description}</p>
      </div>
      <div className="mt-10">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[1.75rem] p-4 md:p-8">
          <img
            src="/images/hero-landscape.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative rounded-2xl bg-white/15 p-1.5 ring-1 ring-white/30 shadow-[0_18px_42px_-12px_rgba(0,0,0,0.3)] backdrop-blur-md md:p-2">
            <div className="rounded-xl border border-border bg-surface p-4 md:p-6">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}
