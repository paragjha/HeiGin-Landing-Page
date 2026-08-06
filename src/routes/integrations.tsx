import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plug } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Frame, HatchDivider, Container } from "@/components/site/Rails";
import { WaitlistButton } from "@/components/site/Waitlist";

const title = "Integrations — Heigin CRM";
const description =
  "Connect IndiaMART, WhatsApp Business API, Tally, Razorpay, Exotel and Google Sheets to Heigin — the India-first CRM for SMBs.";

export const Route = createFileRoute("/integrations")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Integrations,
});

const groups = [
  {
    heading: "Lead sources",
    items: [
      { name: "IndiaMART", desc: "Enquiries land as contacts in seconds, deduped on phone number.", status: "Live" },
      { name: "TradeIndia", desc: "Same pipeline, same routing rules, no manual copy-paste.", status: "Live" },
      { name: "Meta Lead Ads", desc: "Facebook and Instagram forms sync straight into the queue.", status: "Live" },
      { name: "Website forms", desc: "Drop in a snippet and every submission becomes a lead.", status: "Live" },
    ],
  },
  {
    heading: "Messaging",
    items: [
      { name: "WhatsApp Business API", desc: "Official API, shared inbox, approved template broadcasts.", status: "Live" },
      { name: "Gupshup", desc: "Bring your existing BSP number and templates.", status: "Live" },
      { name: "Email (SMTP)", desc: "Send quotes and follow-ups from your own domain.", status: "Live" },
      { name: "Instagram DM", desc: "D2C enquiries from DMs in the same shared inbox.", status: "Soon" },
    ],
  },
  {
    heading: "Telephony",
    items: [
      { name: "Exotel", desc: "Click-to-call, recordings and IVR routing on the contact record.", status: "Live" },
      { name: "Knowlarity", desc: "Virtual numbers with call logging against the lead.", status: "Live" },
      { name: "Ozonetel", desc: "Contact-centre grade routing for larger floors.", status: "Live" },
      { name: "MyOperator", desc: "Missed-call capture that creates a lead automatically.", status: "Soon" },
    ],
  },
  {
    heading: "Finance & operations",
    items: [
      { name: "Tally", desc: "Push invoices and pull payment status without re-keying.", status: "Soon" },
      { name: "Razorpay", desc: "Payment links in the chat thread, reconciled on the deal.", status: "Live" },
      { name: "Zoho Books", desc: "GST-compliant invoicing synced to the pipeline.", status: "Soon" },
      { name: "Google Sheets", desc: "Two-way sync for the reports your team already lives in.", status: "Live" },
    ],
  },
];

export function Integrations() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <section className="py-20 md:py-24">
            <Container className="max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                <Plug className="size-3.5" /> Integrations
              </span>
              <h1 className="text-display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
                Connected to the tools{" "}
                <span className="font-display italic text-muted-foreground">India runs on</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                IndiaMART, WhatsApp, Tally, Razorpay and your telephony provider — wired into one
                pipeline, so nothing has to be typed twice.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WaitlistButton size="lg" className="rounded-lg px-6" />
                <Button size="lg" variant="outline" className="rounded-lg bg-card px-6" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
              </div>
            </Container>

            <Container className="mt-14">
              <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
                <div className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
                  <span className="text-[13.5px] font-medium">Connections</span>
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                    Workspace · Skyline Retail
                  </span>
                </div>
                <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
                  {["IndiaMART", "WhatsApp API", "Razorpay", "Exotel"].map((n, i) => (
                    <div key={n} className="bg-card p-5">
                      <div className="flex items-center justify-between">
                        <span className="grid size-9 place-items-center rounded-lg border border-dashed border-border font-mono text-[12px]">
                          {n.slice(0, 2).toUpperCase()}
                        </span>
                        <span
                          className={
                            i === 3
                              ? "rounded-full bg-warning-soft px-2 py-0.5 font-mono text-[10.5px] uppercase text-warning"
                              : "rounded-full bg-success-soft px-2 py-0.5 font-mono text-[10.5px] uppercase text-success"
                          }
                        >
                          {i === 3 ? "Syncing" : "Connected"}
                        </span>
                      </div>
                      <p className="mt-3 text-[14.5px] font-medium">{n}</p>
                      <p className="mt-1 text-[12.5px] text-muted-foreground">
                        {i === 3 ? "Last sync 2 min ago" : "Live · auto-sync"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Container>
          </section>

          <HatchDivider />

          {groups.map((g) => (
            <section key={g.heading} className="border-b border-border/70 py-14 last:border-0">
              <Container>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {g.heading}
                </p>
                <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {g.items.map((it) => (
                    <div key={it.name} className="rounded-2xl border border-border bg-card p-5">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid size-9 place-items-center rounded-lg border border-dashed border-border font-mono text-[12px] text-muted-foreground">
                          {it.name.slice(0, 2).toUpperCase()}
                        </span>
                        {it.status === "Soon" && (
                          <span className="rounded bg-warning-soft px-1.5 py-0.5 text-[10px] text-warning">
                            Soon
                          </span>
                        )}
                      </div>
                      <h2 className="mt-4 text-[15.5px] font-semibold tracking-tight">{it.name}</h2>
                      <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                        {it.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </Container>
            </section>
          ))}

          <section className="py-14">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Related
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[
                  { label: "Telephony", to: "/telephony" },
                  { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
                  { label: "Workflows", to: "/workflows" },
                ].map((r) => (
                  <Link
                    key={r.to}
                    to={r.to as never}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] transition-colors hover:bg-surface"
                  >
                    {r.label}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </Container>
          </section>

          <HatchDivider />
          <CtaFooter />
        </Frame>
      </main>
    </div>
  );
}
