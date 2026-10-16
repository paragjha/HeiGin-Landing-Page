import type { Integration } from "@/lib/integrations";
import { integrationLogos } from "@/lib/integration-logos";
import { cn } from "@/lib/utils";

/**
 * Brand logo tile for an integration. Falls back to the two-letter
 * monogram when the integration has no brand logo (e.g. CSV import).
 * The decorative alt text is empty — the integration name is always
 * rendered nearby as visible text.
 */
export function IntegrationLogo({
  integration,
  className,
}: {
  integration: Integration;
  className?: string;
}) {
  const logo = integrationLogos[integration.id];
  if (logo) {
    return (
      <span className={cn("flex items-center justify-center overflow-hidden rounded-md border border-border bg-surface p-1.5", className)}>
        <img src={logo} alt="" aria-hidden="true" loading="lazy" className="size-full object-contain" />
      </span>
    );
  }
  return (
    <span className={cn("flex items-center justify-center rounded-md bg-accent text-md font-semibold text-accent-foreground", className)}>
      {integration.monogram}
    </span>
  );
}
