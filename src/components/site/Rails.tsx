import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small cross marker used at the intersections of the layout rails. */
function Cross({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "pointer-events-none absolute z-10 size-[9px] text-muted-foreground/50",
        className,
      )}
    >
      <svg viewBox="0 0 9 9" className="size-full">
        <path d="M4.5 0v9M0 4.5h9" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

/** Diagonally hatched band that separates major sections. */
export function HatchDivider({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="hatch-band h-12 w-full border-y border-dashed border-border" />
      <Cross className="-left-1 -top-[5px]" />
      <Cross className="-right-1 -top-[5px]" />
      <Cross className="-bottom-[5px] -left-1" />
      <Cross className="-bottom-[5px] -right-1" />
    </div>
  );
}

/** Full-width page frame with dashed vertical boundary rails. */
export function Frame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full max-w-[1280px] border-x border-dashed border-border",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5", className)}>{children}</div>;
}

export function SectionTitle({
  title,
  description,
  className,
}: {
  title: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      <h2 className="text-display text-[clamp(1.9rem,3.6vw,2.75rem)]">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
}