import { integrationLogos } from "@/lib/integration-logos";
import { LogoMark } from "@/components/site/logo";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Integration hub visual: rows of connected tools flow along dashed
 * paths into the HeiGin hub, then out to the product. Brand-blue dots
 * travel along the paths. Static stacked layout on small screens.
 */

const rows: { ids: string[] }[] = [
  { ids: ["gmail", "outlook"] },
  { ids: ["whatsapp", "slack"] },
  { ids: ["google-calendar", "google-meet"] },
  { ids: ["notion", "linear"] },
  { ids: ["hubspot-import", "salesforce-import", "zapier"] },
];

// SVG space: 100 x 100. Rows sit at y 10/30/50/70/90 on the left (x 0–22),
// hub centre at 50,50, product panel on the right (x 78–100).
const rowYs = [10, 30, 50, 70, 90];
const inPath = (y: number) => `M 22 ${y} C 34 ${y}, 38 50, 44 50`;
const outPath = (y: number) => `M 56 50 C 62 50, 66 ${y}, 78 ${y}`;

function LogoChip({ id }: { id: string }) {
  const logo = integrationLogos[id];
  return (
    <span className="flex size-9 items-center justify-center rounded-lg border border-border bg-surface p-1.5">
      {logo ? (
        <img src={logo} alt="" aria-hidden="true" loading="lazy" className="size-full object-contain" />
      ) : (
        <span className="size-full rounded-sm bg-muted" />
      )}
    </span>
  );
}

export function IntegrationHub({ className }: { className?: string }) {
  return (
    <div className={cn("mx-auto w-full", className)}>
      {/* Desktop visual */}
      <div className="relative hidden aspect-[16/9] w-full md:block">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
          {rowYs.map((y, i) => (
            <g key={i}>
              <path
                d={inPath(y)}
                fill="none"
                className="stroke-faint"
                strokeWidth="1.5"
                strokeDasharray="2.4 2.4"
                vectorEffect="non-scaling-stroke"
              />
              <circle r="0.7" className="fill-info">
                <animateMotion dur="3.4s" begin={`${i * 0.55}s`} repeatCount="indefinite" path={inPath(y)} />
              </circle>
            </g>
          ))}
          {[30, 70].map((y, i) => (
            <g key={i}>
              <path d={outPath(y)} fill="none" className="stroke-faint" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
              <circle r="0.7" className="fill-info">
                <animateMotion dur="2.6s" begin={`${i * 0.9 + 1.2}s`} repeatCount="indefinite" path={outPath(y)} />
              </circle>
            </g>
          ))}
        </svg>

        {/* Left rows */}
        <div className="absolute inset-y-0 left-0 flex w-[20%] flex-col justify-between py-[2%]">
          {rows.map((row, i) => (
            <div
              key={i}
              className="flex items-center justify-center gap-2.5 rounded-xl border border-border bg-surface px-3 py-2.5 shadow-card"
            >
              {row.ids.map((id) => (
                <LogoChip key={id} id={id} />
              ))}
            </div>
          ))}
        </div>

        {/* Hub */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex size-28 items-center justify-center rounded-[2rem] border border-border bg-surface shadow-float">
            <LogoMark className="size-14 rounded-2xl" />
          </div>
        </div>

        {/* Product panel */}
        <div className="absolute inset-y-[8%] right-0 w-[20%]">
          <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-mockup">
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
              <span className="size-1.5 rounded-full bg-border-strong" />
            </div>
            <div className="flex-1 space-y-2.5 p-3.5">
              <p className="text-sm font-semibold text-foreground">Customer timeline</p>
              <Skeleton className="h-2 w-3/4" />
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-5/6" />
              <div className="mt-3 rounded-lg border border-border bg-tint p-2.5">
                <Skeleton className="h-1.5 w-1/2 bg-info/60" />
                <Skeleton className="mt-1.5 h-1.5 w-full" />
                <Skeleton className="mt-1.5 h-1.5 w-2/3" />
              </div>
              <Skeleton className="h-2 w-4/6" />
              <Skeleton className="h-2 w-3/6" />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked flow */}
      <div className="space-y-3 md:hidden">
        <div className="grid grid-cols-2 gap-2.5">
          {rows.map((row, i) => (
            <div key={i} className="flex items-center justify-center gap-2 rounded-xl border border-border bg-surface px-3 py-2.5">
              {row.ids.map((id) => (
                <LogoChip key={id} id={id} />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center py-1">
          <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-surface shadow-card">
            <LogoMark className="size-9 rounded-xl" />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-surface p-4 shadow-card">
          <p className="text-sm font-semibold text-foreground">Customer timeline</p>
          <div className="mt-3 space-y-2">
            <Skeleton className="h-2 w-3/4" />
            <Skeleton className="h-2 w-full" />
            <Skeleton className="h-2 w-5/6" />
          </div>
        </div>
      </div>
    </div>
  );
}
