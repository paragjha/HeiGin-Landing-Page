import { ArrowUp, CircleHelp, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container, SectionTitle } from "./Rails";

const meetings = [
  { t: "Payroll review · Finance", h: "10:00–11:00 AM", dot: "bg-accent" },
  { t: "Hiring loop · Design", h: "11:30–12:00 PM", dot: "bg-success" },
  { t: "Skyline Retail renewal", h: "02:00–02:30 PM", dot: "bg-warning" },
];

export function Platform() {
  return (
    <section id="platform" className="py-20 md:py-28">
      <Container>
        <SectionTitle
          title={
            <>
              Everything you need to
              <br />
              run the business
            </>
          }
          description="One workspace for people, money, and customers. Connect your tools, automate approvals, and let AI keep everyone moving."
        />

        <div className="mt-8 flex justify-center">
          <Button variant="outline" className="rounded-lg bg-card">
            See a demo
          </Button>
        </div>

        {/* copilot mock */}
        <div className="relative mt-16">
          <div className="mx-auto max-w-3xl overflow-hidden rounded-t-2xl border border-b-0 border-border bg-card shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between border-b border-border px-5 py-3 text-[13px]">
              <span className="inline-flex items-center gap-2 font-medium">
                <Home className="size-4" /> Home
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <CircleHelp className="size-4" /> Help
              </span>
            </div>
            <div className="px-6 pt-6">
              <h3 className="text-[19px] font-semibold tracking-tight">Good morning, Alex</h3>
              <div className="mt-4 rounded-xl border border-accent/50 bg-surface p-3">
                <p className="text-[14px]">Who still hasn't submitted payroll documents?</p>
                <div className="mt-6 flex items-center justify-end gap-2">
                  <span className="text-[12px] text-muted-foreground">Auto</span>
                  <span className="grid size-6 place-items-center rounded-full bg-accent text-accent-foreground">
                    <ArrowUp className="size-3.5" />
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {["Prep next payroll run", "Recap yesterday's approvals"].map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-border bg-surface px-3 py-1.5 text-[12.5px] text-muted-foreground"
                  >
                    {c}
                  </span>
                ))}
              </div>
              <div className="mt-6 pb-2">
                <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                  <span>Today's schedule</span>
                  <span>Mon, Jun 22</span>
                </div>
                <div className="mt-2 space-y-2 [mask-image:linear-gradient(to_bottom,black,transparent)]">
                  {meetings.map((m) => (
                    <div key={m.t} className="flex items-center justify-between py-1.5 text-[13px]">
                      <span className="inline-flex items-center gap-2 text-muted-foreground">
                        <span className={`size-1.5 rounded-full ${m.dot}`} />
                        {m.t}
                      </span>
                      <span className="text-muted-foreground">{m.h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* split feature pair */}
      <div className="mt-16 grid border-t border-dashed border-border md:grid-cols-2">
        <div className="border-b border-dashed border-border p-10 md:border-b-0 md:border-r">
          <div className="mx-auto flex h-56 max-w-md items-end justify-center gap-3">
            {[
              { n: "Meera D.", s: "Docs pending", tone: "bg-warning-soft text-warning", h: "h-32" },
              { n: "Arjun S.", s: "Approved", tone: "bg-success-soft text-success", h: "h-44" },
              { n: "Riya K.", s: "In review", tone: "bg-surface-2 text-muted-foreground", h: "h-36" },
            ].map((c) => (
              <div
                key={c.n}
                className={`flex ${c.h} w-36 flex-col justify-between rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]`}
              >
                <span className="size-8 rounded-full bg-surface-2" />
                <div>
                  <p className="text-[14px] font-semibold">{c.n}</p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[11px] ${c.tone}`}>
                    {c.s}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-8 max-w-md text-center">
            <h3 className="text-[16px] font-semibold">People operations on autopilot</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              Onboarding, attendance, leave, and payroll checks run themselves. Heigin nudges the
              right person the moment something is missing.
            </p>
          </div>
        </div>

        <div className="p-10">
          <div className="mx-auto flex h-56 max-w-md items-center">
            <div className="w-full rounded-2xl border border-border bg-card p-4 shadow-[var(--shadow-card)]">
              <div className="flex gap-2 text-[12.5px]">
                <span className="rounded-md px-2.5 py-1 text-muted-foreground">Insights</span>
                <span className="rounded-md border border-border bg-surface px-2.5 py-1 font-medium">
                  Ledger
                </span>
              </div>
              <div className="mt-4 space-y-3">
                {[
                  { a: "Northwind Ventures", b: "₹1,02,400", t: "text-success" },
                  { a: "Pixel & Co.", b: "₹67,150", t: "text-warning" },
                  { a: "Bluetail Logistics", b: "₹1,71,500", t: "text-danger" },
                ].map((r) => (
                  <div key={r.a} className="flex items-center justify-between text-[13px]">
                    <span>{r.a}</span>
                    <span className={r.t}>{r.b}</span>
                  </div>
                ))}
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full w-2/3 rounded-full bg-accent" />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto mt-8 max-w-md text-center">
            <h3 className="text-[16px] font-semibold">Books that close themselves</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
              Invoices, expenses, and reconciliations stay current, with AI flagging every overdue
              account before it becomes a problem.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}