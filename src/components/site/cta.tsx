import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@heigin/ui";
import { cta } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const isExternal = (to: string) => /^https?:\/\//.test(to);

export function CtaLink({ to, onClick, children, className }: { to: string; onClick?: () => void; children: ReactNode; className?: string }) {
  if (isExternal(to)) {
    return (
      <a href={to} onClick={onClick} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}

/** Primary conversion pair used across the site. Destinations are centralised in @/lib/site. */
export function CtaPair({
  primary = cta.earlyAccess,
  secondary = cta.startFree,
  dark = false,
  className,
}: {
  primary?: { label: string; to: string };
  secondary?: { label: string; to: string } | null;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <CtaLink to={primary.to} onClick={() => track("cta_early_access_clicked", { label: primary.label })}>
        <Button variant={dark ? "secondary" : "primary"} size="lg">
          {primary.label}
        </Button>
      </CtaLink>
      {secondary && (
        <CtaLink to={secondary.to}>
          <Button variant={dark ? "ghost" : "secondary"} size="lg" className={dark ? "text-night-foreground hover:bg-night-surface" : undefined}>
            {secondary.label}
          </Button>
        </CtaLink>
      )}
    </div>
  );
}
