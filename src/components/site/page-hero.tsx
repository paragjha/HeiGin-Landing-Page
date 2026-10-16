import type { ReactNode } from "react";
import { Eyebrow } from "./section";
import { CtaPair } from "./cta";

/** Shared page hero: eyebrow, headline, subcopy and the standard CTA pair. */
export function PageHero({
  eyebrow,
  title,
  description,
  showCtas = true,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  showCtas?: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border">
      <div className="container-site py-16 md:py-24">
        <div className="max-w-3xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-4 text-display text-foreground">{title}</h1>
          <p className="mt-5 max-w-2xl text-subhead text-muted-foreground">{description}</p>
          {showCtas && <CtaPair className="mt-8" />}
        </div>
        {children && <div className="mt-12">{children}</div>}
      </div>
    </section>
  );
}
