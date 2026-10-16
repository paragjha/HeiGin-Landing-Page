import { cn } from "@/lib/utils";

/**
 * Browser-style frame around a real product screenshot. The frame is meant to
 * read as a placed object: refined chrome with an address pill, a cooler
 * border, and the strongest of the site's three shadow tiers.
 */
export function AppFrame({ src, alt, className }: { src: string; alt: string; className?: string }) {
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
      <img src={src} alt={alt} className="block w-full" />
    </div>
  );
}
