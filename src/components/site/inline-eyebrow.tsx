import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The small uppercase label (10–11px, 0.1em tracking) above a headline.
 * Matches the home page's section eyebrows; use it anywhere a page needs
 * the same quiet label without duplicating the class list.
 */
export function InlineEyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("text-xs font-semibold uppercase tracking-[0.1em] text-faint", className)}>
      {children}
    </p>
  );
}
