import { cn } from "@/lib/utils";

/**
 * Browser-style frame around a real product screenshot. The frame is meant to
 * read as a placed object: refined chrome with an address pill, a cooler
 * border, and the strongest of the site's three shadow tiers.
 */
export interface Shot {
  url: string;
  width: number;
  height: number;
}

/**
 * `shot` carries the intrinsic size so the browser reserves space before the image
 * loads (no layout shift). Pass `priority` for the one screenshot that is in the first
 * viewport; everything else loads lazily.
 */
export function AppFrame({
  shot,
  alt,
  className,
  priority = false,
}: {
  shot: Shot;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={cn("overflow-hidden rounded-xl border border-border-strong bg-surface shadow-mockup", className)}>
      <div className="flex items-center gap-3 border-b border-border bg-sidebar px-3.5 py-2.5" aria-hidden="true">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
          <span className="size-2.5 rounded-full bg-border-strong" />
        </span>
        <span className="mx-auto flex h-5 w-44 items-center justify-center rounded-md bg-surface text-[10px] font-medium tracking-wide text-faint">
          app.heigin.com
        </span>
        <span className="w-[42px]" />
      </div>
      <img
        src={shot.url}
        width={shot.width}
        height={shot.height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className="block h-auto w-full"
      />
    </div>
  );
}
