import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

/**
 * Marketing section shell with consistent vertical rhythm.
 * Bands alternate white / tint / white, with dark used sparingly as
 * punctuation. Tint bands carry a hairline divider so bands read as one page.
 *
 * Content fades and rises in once as the section scrolls into view. Pass `reveal={false}` for a
 * section that already staggers its own children with <Reveal>.
 */
export function Section({
  children,
  className,
  id,
  dark = false,
  tone,
  reveal = true,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  dark?: boolean;
  tone?: "white" | "tint" | "dark";
  reveal?: boolean;
}) {
  const resolved = tone ?? (dark ? "dark" : "white");
  return (
    <section
      id={id}
      className={cn(
        resolved === "dark" && "bg-night text-night-foreground",
        resolved === "tint" && "border-y border-border bg-tint",
        resolved === "white" && "bg-background",
        className
      )}
    >
      {reveal ? (
        <Reveal className="container-site py-20 md:py-28">{children}</Reveal>
      ) : (
        <div className="container-site py-20 md:py-28">{children}</div>
      )}
    </section>
  );
}

export function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "text-sm font-semibold uppercase tracking-[0.08em]",
        dark ? "text-night-muted" : "text-muted-foreground"
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  dark = false,
  align = "start",
  aside,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  dark?: boolean;
  align?: "start" | "center";
  /** Small supporting element shown to the right of left-aligned headings so the whitespace doesn't float. */
  aside?: ReactNode;
  className?: string;
}) {
  const heading = (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <h2 className={cn("mt-3 text-headline", dark ? "text-night-foreground" : "text-foreground")}>{title}</h2>
      {description && (
        <p className={cn("mt-4 text-subhead", dark ? "text-night-muted" : "text-muted-foreground")}>{description}</p>
      )}
    </div>
  );
  if (!aside || align === "center") return <div className={className}>{heading}</div>;
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-x-10 gap-y-6", className)}>
      {heading}
      <div className={cn("max-w-xs text-sm leading-relaxed", dark ? "text-night-muted" : "text-muted-foreground")}>
        {aside}
      </div>
    </div>
  );
}
