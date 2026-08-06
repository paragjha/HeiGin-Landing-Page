import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
      {children}
    </span>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="text-display mt-5 text-[clamp(2rem,4.2vw,3.1rem)]">{title}</h2>
      {description && (
        <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cn("border-t border-border/70 py-20 md:py-28", className)}>
      <div className="mx-auto max-w-6xl px-5">{children}</div>
    </section>
  );
}