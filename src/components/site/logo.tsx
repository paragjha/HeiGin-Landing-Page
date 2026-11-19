import { cn } from "@/lib/utils";

/**
 * HeiGin mark: two offset vertical bars (from the official logo SVG).
 * Bare by default. `tile` wraps it in the rounded square, for app-icon nodes
 * that sit among other tiled logos (integration diagrams).
 */
export function LogoMark({
  className,
  inverted = false,
  tile = false,
}: {
  className?: string;
  inverted?: boolean;
  tile?: boolean;
}) {
  if (tile) {
    return (
      <span
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center rounded-md",
          inverted ? "bg-night-foreground text-night" : "bg-primary text-primary-foreground",
          className ?? "size-7"
        )}
      >
        <svg viewBox="0 0 54 54" fill="none" className="size-[62%]">
          <path d="M35.5928 0V35.594" stroke="currentColor" strokeWidth="5.4" />
          <path d="M17.797 17.797V53.3909" stroke="currentColor" strokeWidth="5.4" />
        </svg>
      </span>
    );
  }

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 23.196 53.391"
      fill="currentColor"
      className={cn("h-5 w-auto shrink-0", inverted ? "text-night-foreground" : "text-foreground", className)}
    >
      <rect x="17.796" y="0" width="5.4" height="35.594" />
      <rect x="0" y="17.797" width="5.4" height="35.594" />
    </svg>
  );
}

export function Logo({ className, dark = false }: { className?: string; dark?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <LogoMark inverted={dark} />
      <span
        className={cn(
          "text-[15.5px] font-semibold tracking-tight",
          dark ? "text-night-foreground" : "text-foreground"
        )}
      >
        HeiGin
      </span>
    </span>
  );
}
