import { cn } from "@/lib/utils";

type Row = { a: string; b: string; c: string; d: string; tone: "ok" | "warn" | "err" };

const toneCls: Record<Row["tone"], string> = {
  ok: "bg-success-soft text-success",
  warn: "bg-warning-soft text-warning",
  err: "bg-destructive/10 text-destructive",
};

export function MockWindow({
  title,
  subtitle,
  stats,
  columns,
  rows,
  className,
}: {
  title: string;
  subtitle: string;
  stats: { label: string; value: string; hint: string }[];
  columns: string[];
  rows: Row[];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]",
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <span key={i} className="size-2 rounded-full bg-muted-foreground/30" />
            ))}
          </span>
          <span className="text-[13.5px] font-medium">{title}</span>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          {subtitle}
        </span>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card px-4 py-4">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
              {s.label}
            </p>
            <p className="mt-1.5 text-[22px] font-semibold tracking-tight">{s.value}</p>
            <p className="mt-0.5 text-[12px] text-muted-foreground">{s.hint}</p>
          </div>
        ))}
      </div>

      <table className="w-full border-t border-border text-left">
        <thead>
          <tr className="border-b border-border bg-surface/60">
            {columns.map((c) => (
              <th
                key={c}
                className="px-4 py-2.5 font-mono text-[10.5px] font-normal uppercase tracking-[0.12em] text-muted-foreground"
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.a + r.b} className="border-b border-border/70 last:border-0">
              <td className="px-4 py-3 text-[14px] font-medium">{r.a}</td>
              <td className="px-4 py-3 text-[14px] text-muted-foreground">{r.b}</td>
              <td className="px-4 py-3 text-[14px] text-muted-foreground">{r.c}</td>
              <td className="px-4 py-3">
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 font-mono text-[10.5px] uppercase tracking-wide",
                    toneCls[r.tone],
                  )}
                >
                  {r.d}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
