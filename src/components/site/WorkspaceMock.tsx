import { useState } from "react";
import { MessageCircle, Handshake, Users, Sparkles, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Row = { initials: string; a: string; b: string; c: string; d: string; tone: "ok" | "warn" | "err" };
type Board = {
  key: string;
  tab: string;
  icon: LucideIcon;
  dot: string;
  owner: string;
  title: string;
  subtitle: string;
  action: string;
  stats: { label: string; value: string; hint: string }[];
  columns: string[];
  rows: Row[];
};

const boards: Board[] = [
  {
    key: "pipeline",
    tab: "Pipeline",
    icon: Handshake,
    dot: "bg-success",
    owner: "Sales team",
    title: "Deal pipeline",
    subtitle: "Q2 · all owners",
    action: "+ New deal",
    stats: [
      { label: "Open pipeline", value: "₹51L", hint: "↑ 12% this qtr" },
      { label: "Win rate", value: "38%", hint: "↑ 4 pts" },
      { label: "Closing soon", value: "7 deals", hint: "This week" },
    ],
    columns: ["Deal", "Value", "Stage", "Status"],
    rows: [
      { initials: "SK", a: "Skyline Retail", b: "₹7.0L", c: "Negotiation", d: "Hot", tone: "ok" },
      { initials: "VT", a: "Verde Tech", b: "₹3.8L", c: "Proposal", d: "Follow up", tone: "warn" },
      { initials: "OL", a: "Orbit Labs", b: "₹9.8L", c: "Closed won", d: "Won", tone: "ok" },
    ],
  },
  {
    key: "whatsapp",
    tab: "WhatsApp Inbox",
    icon: MessageCircle,
    dot: "bg-accent",
    owner: "Shared inbox",
    title: "WhatsApp Inbox",
    subtitle: "Official Business API",
    action: "+ Send broadcast",
    stats: [
      { label: "Unread chats", value: "18", hint: "4 unassigned" },
      { label: "Avg. reply", value: "2m 14s", hint: "↓ 38% this week" },
      { label: "Auto-replies", value: "406", hint: "Sent by AI today" },
    ],
    columns: ["Contact", "Last message", "Owner", "Status"],
    rows: [
      { initials: "AK", a: "Aisha Khan", b: "Sent price list", c: "AI bot", d: "Replied", tone: "ok" },
      { initials: "RN", a: "Raj Nair", b: "Asked for demo", c: "S. Rao", d: "Waiting", tone: "warn" },
      { initials: "PM", a: "Priya Menon", b: "No reply · 2 days", c: "Unassigned", d: "Overdue", tone: "err" },
    ],
  },
  {
    key: "contacts",
    tab: "Contacts",
    icon: Users,
    dot: "bg-warning",
    owner: "Everyone",
    title: "Contacts",
    subtitle: "Leads & customers",
    action: "+ Import leads",
    stats: [
      { label: "Total contacts", value: "8,412", hint: "↑ 320 this month" },
      { label: "New leads", value: "146", hint: "IndiaMART + WhatsApp" },
      { label: "Repeat buyers", value: "27%", hint: "↑ 3 pts" },
    ],
    columns: ["Contact", "Source", "City", "Stage"],
    rows: [
      { initials: "MD", a: "Meera Desai", b: "IndiaMART", c: "Pune", d: "Qualified", tone: "ok" },
      { initials: "AS", a: "Arjun Sethi", b: "WhatsApp", c: "Jaipur", d: "New", tone: "warn" },
      { initials: "RK", a: "Riya Kapoor", b: "Missed call", c: "Kochi", d: "Cold", tone: "err" },
    ],
  },
  {
    key: "copilot",
    tab: "AI Copilot",
    icon: Sparkles,
    dot: "bg-danger",
    owner: "Works while you sleep",
    title: "AI Copilot",
    subtitle: "Automations & nudges",
    action: "+ New workflow",
    stats: [
      { label: "Tasks automated", value: "1,204", hint: "This month" },
      { label: "Hours saved", value: "63", hint: "Across 3 users" },
      { label: "Leads scored", value: "146", hint: "With reasoning" },
    ],
    columns: ["Automation", "Trigger", "Runs", "Status"],
    rows: [
      { initials: "W", a: "Instant WhatsApp reply", b: "New lead", c: "406", d: "Live", tone: "ok" },
      { initials: "F", a: "Follow-up nudge", b: "No reply · 48h", c: "212", d: "Live", tone: "ok" },
      { initials: "Q", a: "Quote to GST invoice", b: "Deal won", c: "38", d: "Draft", tone: "warn" },
    ],
  },
];

const toneClass = {
  ok: "bg-success-soft text-success",
  warn: "bg-warning-soft text-warning",
  err: "bg-danger-soft text-danger",
};

export function WorkspaceMock() {
  const [active, setActive] = useState(0);
  // stack order: active card first (front), the rest keep their cyclic order behind it
  const stack = boards.map((_, i) => boards[(active + i) % boards.length]!);

  return (
    <div>
      {/* stacked windows */}
      <div style={{ paddingTop: (boards.length - 1) * 32 }}>
        <div className="relative">
        {stack.map((board, depth) => {
          const front = depth === 0;
          return (
            <article
              key={board.key}
              style={{
                transformOrigin: "center top",
                transform: front ? undefined : `scale(${1 - depth * 0.05})`,
                top: front ? 0 : -depth * 32,
                zIndex: boards.length - depth,
              }}
              className={cn(
                "overflow-hidden rounded-2xl border border-border bg-card transition-all duration-500 ease-out",
                front
                  ? "relative shadow-[var(--shadow-float)]"
                  : "absolute inset-x-0 shadow-[var(--shadow-card)]",
              )}
            >
          <button
            type="button"
            onClick={() => setActive(boards.indexOf(board))}
            disabled={front}
            className="flex w-full items-center gap-2 border-b border-border px-5 py-2.5 text-left transition-colors enabled:hover:bg-surface"
          >
            <span className={cn("size-2 rotate-45 shrink-0", board.dot)} />
            <span className="truncate text-[13px] font-semibold">{board.tab}</span>
            <span className="truncate text-[12.5px] text-muted-foreground">· {board.owner}</span>
            <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground sm:block">
              app.heigin.com/{board.key}
            </span>
          </button>

          <div className="p-4 md:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold">{board.title}</h3>
              <p className="text-[12.5px] text-muted-foreground">{board.subtitle}</p>
            </div>
            <span className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-[12px] text-muted-foreground">
              {board.action}
            </span>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {board.stats.map((s) => (
              <div key={s.label} className="rounded-lg border border-border bg-surface p-3">
                <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{s.label}</p>
                <p className="mt-1 font-display text-[20px] font-semibold">{s.value}</p>
                <p className="text-[11px] text-muted-foreground">{s.hint}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 overflow-hidden rounded-lg border border-border">
            <div className="grid grid-cols-[1.5fr_1fr_1fr_0.9fr] gap-2 border-b border-border bg-surface px-3 py-2 text-[11px] uppercase tracking-wide text-muted-foreground">
              {board.columns.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </div>
            {board.rows.map((r) => (
              <div
                key={r.a}
                className="grid grid-cols-[1.5fr_1fr_1fr_0.9fr] items-center gap-2 border-b border-border px-3 py-2.5 text-[12.5px] last:border-b-0"
              >
                <span className="flex items-center gap-2">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-surface-2 text-[10px] font-medium text-muted-foreground">
                    {r.initials}
                  </span>
                  <span className="truncate font-medium">{r.a}</span>
                </span>
                <span className="truncate text-muted-foreground">{r.b}</span>
                <span className="truncate text-muted-foreground">{r.c}</span>
                <span>
                  <span
                    className={cn(
                      "inline-block truncate rounded-full px-2 py-0.5 text-[11px]",
                      toneClass[r.tone],
                    )}
                  >
                    {r.d}
                  </span>
                </span>
              </div>
            ))}
          </div>
          </div>
            </article>
          );
        })}
        </div>
      </div>

      {/* window selector */}
      <div className="mt-8 flex justify-center">
        <div className="flex flex-wrap items-center justify-center gap-1 rounded-full border border-border bg-card p-1.5 shadow-[var(--shadow-card)]">
          {boards.map((b, i) => (
            <button
              key={b.key}
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] transition-colors",
                i === active
                  ? "border border-border bg-surface font-medium text-foreground"
                  : "border border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              <b.icon className="size-4" />
              {b.tab}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}