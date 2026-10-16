import { Link } from "@tanstack/react-router";
import { Button } from "@heigin/ui";
import { cta } from "@/lib/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Primary conversion pair used across the site. Destinations are centralised in @/lib/site. */
export function CtaPair({
  primary = cta.earlyAccess,
  secondary = cta.seeHowItWorks,
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
      <Link to={primary.to} onClick={() => track("cta_early_access_clicked", { label: primary.label })}>
        <Button variant={dark ? "secondary" : "primary"} size="lg">
          {primary.label}
        </Button>
      </Link>
      {secondary && (
        <Link to={secondary.to}>
          <Button variant={dark ? "ghost" : "secondary"} size="lg" className={dark ? "text-night-foreground hover:bg-night-surface" : undefined}>
            {secondary.label}
          </Button>
        </Link>
      )}
    </div>
  );
}
