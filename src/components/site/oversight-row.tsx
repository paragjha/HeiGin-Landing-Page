import { KeyRound, ShieldCheck, ClipboardList } from "lucide-react";

/**
 * The real guardrails that back the agents: role-based permissions, approvals
 * for sensitive actions, admin-only audit log. Sourced from what the CRM app
 * actually ships (six roles, quote approval endpoint, audit log route) — see
 * /security for the longer version.
 */
const pillars = [
  {
    icon: KeyRound,
    title: "Permissions",
    body: "Six roles (Admin, Sales Manager, Senior AE, AE, SDR, Read-only) scope what each person — and each agent, acting on their behalf — can see and touch.",
  },
  {
    icon: ShieldCheck,
    title: "Approvals",
    body: "Outbound messages and quote changes default to a review step. Copilot proposes on a card; the right person clicks Confirm, Edit or Reject before anything leaves the system.",
  },
  {
    icon: ClipboardList,
    title: "Activity log",
    body: "Every proposal and every action an agent takes is kept in an admin-only audit log, with who approved it and why.",
  },
];

export function OversightRow() {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {pillars.map((p) => (
        <article key={p.title} className="rounded-2xl border border-border bg-surface p-6">
          <span className="flex size-10 items-center justify-center rounded-md bg-sidebar text-foreground">
            <p.icon size={18} strokeWidth={1.7} aria-hidden="true" />
          </span>
          <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
          <p className="mt-2 text-md leading-relaxed text-muted-foreground">{p.body}</p>
        </article>
      ))}
    </div>
  );
}
