import { cn } from "@/lib/utils";

/** HeiGin mark: two offset vertical bars (from the official logo SVG). */
export function LogoMark({ className, inverted = false }: { className?: string; inverted?: boolean }) {
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
