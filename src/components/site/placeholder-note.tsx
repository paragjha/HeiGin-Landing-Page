import { PencilLine } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marks a section whose content is intentionally pending real assets
 * (customer logos, testimonials, legal copy...). Visible by default so the
 * structure is obviously editable; remove the note when real content lands.
 */
export function PlaceholderNote({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-dashed px-2.5 py-1 text-sm",
        dark ? "border-night-border text-night-muted" : "border-border-strong text-faint"
      )}
    >
      <PencilLine size={13} strokeWidth={1.8} aria-hidden="true" />
      {children}
    </p>
  );
}
