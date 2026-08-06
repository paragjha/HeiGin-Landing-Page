import { Fragment } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "@/components/site/Nav";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Frame, HatchDivider, Container } from "@/components/site/Rails";
import { Pricing } from "@/components/site/Pricing";

const title = "Pricing — Heigin CRM for Indian SMBs";
const description =
  "Per user, per month, in rupees. Starter ₹499, Growth ₹999, Enterprise custom. No setup fee, no implementation partner, no annual contract.";

export const Route = createFileRoute("/pricing")({
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
  component: PricingPage,
});

type Row = { label: string; values: [string | boolean, string | boolean, string | boolean] };

const matrix: { group: string; rows: Row[] }[] = [
  {
    group: "Contacts & Pipeline",
    rows: [
      { label: "Contacts", values: ["Unlimited", "Unlimited", "Unlimited"] },
      { label: "Pipelines", values: ["1", "5", "Unlimited"] },
      { label: "Custom fields", values: [true, true, true] },
      { label: "Territory & round-robin routing", values: [false, true, true] },
    ],
  },
  {
    group: "WhatsApp",
    rows: [
      { label: "Business numbers", values: ["1", "1", "Multiple"] },
      { label: "Shared team inbox", values: [true, true, true] },
      { label: "Automations", values: ["5", "Unlimited", "Unlimited"] },
      { label: "Template management", values: [false, true, true] },
    ],
  },
  {
    group: "AI",
    rows: [
      { label: "AI Copilot", values: [false, true, true] },
      { label: "Explainable lead scoring", values: [false, true, true] },
      { label: "AI drafted follow-ups", values: ["Limited", "Unlimited", "Unlimited"] },
    ],
  },
  {
    group: "Integrations",
    rows: [
      { label: "Excel / CSV import", values: [true, true, true] },
      { label: "IndiaMART lead sync", values: [false, true, true] },
      { label: "Accounting & payments sync", values: [false, true, true] },
      { label: "Telephony providers", values: [false, true, true] },
    ],
  },
  {
    group: "Admin & Security",
    rows: [
      { label: "Role-based access", values: ["Basic", true, true] },
      { label: "Export controls", values: [false, true, true] },
      { label: "SSO & audit logs", values: [false, false, true] },
      { label: "India-hosted data", values: [true, true, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      { label: "Email support", values: [true, true, true] },
      { label: "Priority WhatsApp support", values: [false, true, true] },
      { label: "Onboarding manager", values: [false, false, true] },
      { label: "SLA", values: [false, false, true] },
    ],
  },
];

const faq = [
  {
    q: "Is there a free plan?",
    a: "Every plan starts with 14 days free on 3 seats. No card required to begin.",
  },
  {
    q: "Do I pay for the whole team from day one?",
    a: "No. Add seats as you hire; billing follows.",
  },
  {
    q: "What happens to my data if I leave?",
    a: "Export your contacts, deals, and message history at any time, in a standard format. Your list is yours.",
  },
  {
    q: "Is there an implementation fee?",
    a: "No. Most teams are importing contacts within an hour.",
  },
  {
    q: "Do you support Indian payment methods?",
    a: "UPI, NEFT, and cards are supported, and we issue a GST invoice for the subscription itself.",
  },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <Check className="mx-auto size-4 text-accent" />;
  if (value === false) return <Minus className="mx-auto size-4 text-muted-foreground/50" />;
  return <span className="text-[13.5px] text-muted-foreground">{value}</span>;
}

function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <section className="py-20 md:py-24">
            <Container className="max-w-3xl text-center">
              <span className="inline-flex rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Pricing
              </span>
              <h1 className="text-display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
                Priced for Indian SMBs.{" "}
                <span className="font-display italic text-muted-foreground">
                  Not enterprise budgets.
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
                Per user, per month, in rupees. No setup fee, no implementation partner, no annual
                contract to get started.
              </p>
              <p className="mx-auto mt-7 max-w-xl rounded-xl border border-border bg-surface px-4 py-3 text-[14px] text-muted-foreground">
                <span className="font-medium text-foreground">Join the waitlist</span> with 3
                seats. No card required.
              </p>
            </Container>
          </section>

          <Pricing bare />

          <HatchDivider />

          <section className="py-16 md:py-24">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Compare plans
              </p>
              <div className="mt-6 overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse text-left">
                  <thead className="sticky top-16 bg-background">
                    <tr className="border-b border-border">
                      <th className="py-3 text-[13px] font-medium text-muted-foreground">Feature</th>
                      {["Starter", "Growth", "Enterprise"].map((p) => (
                        <th
                          key={p}
                          className="w-[140px] py-3 text-center text-[13px] font-semibold"
                        >
                          {p}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {matrix.map((g) => (
                      <Fragment key={g.group}>
                        <tr className="bg-surface">
                          <td
                            colSpan={4}
                            className="py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground"
                          >
                            {g.group}
                          </td>
                        </tr>
                        {g.rows.map((r) => (
                          <tr key={r.label} className="border-b border-border/70">
                            <td className="py-3 text-[14.5px]">{r.label}</td>
                            {r.values.map((v, i) => (
                              <td key={i} className="py-3 text-center">
                                <Cell value={v} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-24">
            <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Pricing FAQ
                </p>
                <h2 className="text-display mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)]">
                  The money{" "}
                  <span className="font-display italic text-muted-foreground">questions</span>
                </h2>
                <Button variant="outline" className="mt-6 rounded-lg bg-card" asChild>
                  <Link to="/contacts">Explore the product</Link>
                </Button>
              </div>
              <dl className="divide-y divide-border border-y border-border">
                {faq.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[15.5px] font-medium">{f.q}</dt>
                    <dd className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>

          <HatchDivider />
          <CtaFooter />
        </Frame>
      </main>
    </div>
  );
}