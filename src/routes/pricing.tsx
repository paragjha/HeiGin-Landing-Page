import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { Check, Minus } from "lucide-react";
import { Badge, Button, Card } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/pricing")({
  head: pageHead(
    "/pricing",
    "Pricing",
    "HeiGin pricing: four plans from ₹799 per user per month, with AI in every plan. Prices exclude 18% GST."
  ),
  component: Pricing,
});

/**
 * Pricing source: the HeiGin pricing proposal (2026-10-22). Only customer-facing parts are used
 * here. Left out on purpose: per-seat cost and margin tables, vendor costs, the "coming soon"
 * roadmap list and the open Jira items. Keep the compare table to features that are live.
 *
 * Open items from that document that affect this page:
 * - PII masking (HNCRM-130): the Read-only role still sees unmasked data, so masking is NOT
 *   listed for any plan until that is fixed.
 * - GST place of supply (HNCRM-131): unknown place of supply defaults to CGST and SGST, which is
 *   wrong for interstate deals. GST quotes are listed because the feature is live.
 * - Outlook sync (HNCRM-101) is not ready, so email is Gmail or SMTP only.
 */

/** Per-seat prices when billed annually. Monthly billing is about 20% more, as in the proposal. */
const annualPrice = { starter: 799, growth: 1299, pro: 1999, enterprise: 3499 } as const;
const monthlyPrice = (annual: number) => Math.round((annual * 1.2) / 10) * 10 - 1;
const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type Billing = "annual" | "monthly";

const plans = [
  {
    id: "starter",
    name: "Starter",
    body: "Founders and small teams getting off spreadsheets.",
    lead: "Includes",
    points: [
      "Leads, contacts, accounts, deals",
      "1 pipeline board",
      "GST quotes with PDF",
      "Gmail or SMTP inbox",
      "AI Copilot, 300 asks per seat",
      "Lead intent score and AI deal brief",
    ],
    cta: "Request access",
  },
  {
    id: "growth",
    name: "Growth",
    badge: "Most teams",
    body: "SMB sales teams that want AI doing the busywork.",
    lead: "Everything in Starter, plus",
    points: [
      "Up to 3 pipelines",
      "Agentic Copilot with bulk updates",
      "Knowledge base Q&A on your documents",
      "Inbound leads API for forms and ads",
      "Full reports",
      "1,000 Copilot asks per seat",
    ],
    cta: "Request access",
    featured: true,
  },
  {
    id: "pro",
    name: "Pro",
    body: "Scaling teams that call a lot and need control.",
    lead: "Everything in Growth, plus",
    points: [
      "AI Calling, 300 minutes per seat",
      "AI Sales Agent campaigns",
      "Record-level access rules",
      "Audit log",
      "Unlimited pipelines and Copilot",
      "Priority support and onboarding",
    ],
    cta: "Request access",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    body: "25+ seats, custom terms and a named contact.",
    lead: "Everything in Pro, plus",
    points: [
      "AI Calling, 500 minutes per seat",
      "Per-workspace feature controls",
      "Dedicated account manager",
      "Custom onboarding and data migration",
      "Volume and multi-year pricing",
    ],
    cta: "Talk to sales",
    from: true,
  },
] as const;

type Cell = boolean | string;
const compare: { group: string; rows: { label: string; values: [Cell, Cell, Cell, Cell] }[] }[] = [
  {
    group: "CRM",
    rows: [
      { label: "Leads, contacts, accounts, deals", values: [true, true, true, true] },
      { label: "Pipeline boards", values: ["1", "Up to 3", "Unlimited", "Unlimited"] },
      { label: "Tasks, activity timeline, Today view", values: [true, true, true, true] },
      { label: "Custom fields and saved views", values: [true, true, true, true] },
      { label: "Products catalogue", values: [true, true, true, true] },
      { label: "GST quotes with PDF", values: [true, true, true, true] },
      { label: "Dashboard", values: [true, true, true, true] },
      { label: "Reports: funnel, win rate, lead sources, rep performance", values: ["Basic", true, true, true] },
      { label: "Mobile web app and own subdomain", values: [true, true, true, true] },
    ],
  },
  {
    group: "Email",
    rows: [
      { label: "Gmail or SMTP mailbox and inbox", values: [true, true, true, true] },
      { label: "Inbound leads API (website forms, ads)", values: [false, true, true, true] },
    ],
  },
  {
    group: "AI",
    rows: [
      {
        label: "AI Copilot: ask about your pipeline in plain English",
        values: ["300 / seat / mo", "1,000 / seat / mo", "Unlimited*", "Unlimited*"],
      },
      { label: "Agentic Copilot: bulk updates with a confirm card", values: [false, true, true, true] },
      { label: "Lead intent score (Hot, Warm, Cold)", values: [true, true, true, true] },
      { label: "AI deal brief", values: [true, true, true, true] },
      { label: "Documents and knowledge base Q&A", values: [false, true, true, true] },
      { label: "AI Sales Agent campaigns", values: [false, false, true, true] },
    ],
  },
  {
    group: "AI Calling",
    rows: [
      {
        label: "Click-to-call, recording, Hinglish transcript, summary, intent, suggested tasks",
        values: ["Add-on", "Add-on", "300 min per seat", "500 min per seat"],
      },
    ],
  },
  {
    group: "Admin and security",
    rows: [
      { label: "Roles: Admin, Manager, AE, SDR, Read-only", values: [true, true, true, true] },
      { label: "Record-level access rules", values: [false, false, true, true] },
      { label: "Audit log", values: [false, false, true, true] },
      { label: "Per-workspace feature controls", values: [false, false, false, true] },
    ],
  },
  {
    group: "Support",
    rows: [
      {
        label: "Support channel",
        values: ["Email", "Email and chat", "Priority and onboarding", "Dedicated manager"],
      },
    ],
  },
];

const offers = [
  {
    title: "Founding customer",
    body: "40% off for 12 months for the first 20 workspaces, in exchange for a case study.",
  },
  {
    title: "Annual prepay",
    body: "Pay yearly and get 2 months free. Annual prices on this page already include it.",
  },
  {
    title: "14-day Pro trial",
    body: "Full Pro, including 60 AI calling minutes. No card required.",
  },
];

function CellValue({ value }: { value: Cell }): ReactNode {
  if (value === true) {
    return (
      <>
        <Check size={16} aria-hidden="true" className="mx-auto text-success" />
        <span className="sr-only">Included</span>
      </>
    );
  }
  if (value === false) {
    return (
      <>
        <Minus size={16} aria-hidden="true" className="mx-auto text-faint" />
        <span className="sr-only">Not included</span>
      </>
    );
  }
  return <span className="whitespace-nowrap text-md text-foreground">{value}</span>;
}

function BillingToggle({ billing, onChange }: { billing: Billing; onChange: (b: Billing) => void }) {
  const option = (value: Billing, label: string) => (
    <button
      type="button"
      aria-pressed={billing === value}
      onClick={() => onChange(value)}
      className={cn(
        "rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors",
        billing === value
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-surface text-muted-foreground hover:bg-accent"
      )}
    >
      {label}
    </button>
  );
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div role="group" aria-label="Billing period" className="flex gap-1.5">
        {option("annual", "Billed annually")}
        {option("monthly", "Billed monthly")}
      </div>
      <span className="text-sm text-muted-foreground" aria-live="polite">
        {billing === "annual" ? "2 months free with annual billing" : "Switch to annual billing for 2 months free"}
      </span>
    </div>
  );
}

function Pricing() {
  const [billing, setBilling] = useState<Billing>("annual");

  useEffect(() => {
    track("pricing_page_visited");
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="AI in every plan. Priced per seat."
        description="Four plans for Indian B2B sales teams. Prices are per user per month and exclude 18% GST."
        showCtas={false}
      />
      <Section>
        <BillingToggle billing={billing} onChange={setBilling} />
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => {
            const annual = annualPrice[p.id];
            const price = billing === "annual" ? annual : monthlyPrice(annual);
            const featured = "featured" in p && p.featured;
            return (
              <Card key={p.id} padding="lg" className={cn("flex flex-col", featured && "border-ink shadow-[var(--hg-shadow-popover)]")}>
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-2xl font-semibold tracking-tight text-foreground">{p.name}</h2>
                  {"badge" in p && (
                    <Badge tone="success" size="sm">
                      {p.badge}
                    </Badge>
                  )}
                </div>
                <p className="mt-5 flex h-10 items-baseline gap-1.5 text-4xl font-semibold tracking-tight text-foreground">
                  {"from" in p && <span className="text-lg font-medium text-muted-foreground">from</span>}
                  {inr(price)}
                </p>
                <p className="mt-1 text-sm text-faint">
                  per user / month, billed {billing === "annual" ? "annually" : "monthly"}
                </p>
                <p className="mt-2 text-md leading-relaxed text-muted-foreground">{p.body}</p>
                <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-faint">{p.lead}</p>
                <ul className="mt-3 flex-1 space-y-2">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 text-md text-foreground">
                      <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                      {pt}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="mt-6" onClick={() => track("cta_early_access_clicked", { label: `${p.name} plan` })}>
                  <Button variant={featured ? "primary" : "secondary"} fullWidth>
                    {p.cta}
                  </Button>
                </Link>
              </Card>
            );
          })}
        </div>
        <p className="mt-6 text-sm text-faint">Prices in INR, exclusive of 18% GST.</p>
      </Section>

      <Section tone="tint">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <SectionHeading
            eyebrow="Add-on"
            title="AI Calling for Starter and Growth."
            description="Click to call from any lead, contact or deal. HeiGin records the call, transcribes English, Hindi and Hinglish, and writes the summary, intent score and follow-up tasks a minute after hang-up. Minutes are metered because transcription and analysis are billed by the minute."
          />
          <Card padding="lg">
            <dl className="divide-y divide-border">
              {[
                ["Add-on, per seat, per month", inr(1499)],
                ["AI minutes included", "300"],
                ["Extra AI minutes", `${inr(4)} / min`],
                ["Telephony (Exotel)", "At actuals, or bring your own"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
                  <dt className="text-md text-muted-foreground">{k}</dt>
                  <dd className="text-right text-lg font-semibold text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Card>
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Compare plans"
          title="Every feature, side by side."
          description="Only features that are live today are listed."
        />
        <div
          role="region"
          aria-label="Plan comparison table, scrolls sideways on small screens"
          tabIndex={0}
          className="relative mt-10 overflow-x-auto rounded-xl border border-border bg-surface"
        >
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">Features included in each HeiGin plan</caption>
            <thead>
              <tr className="border-b border-border bg-sidebar">
                <th scope="col" className="px-4 py-3 text-sm font-semibold text-muted-foreground">
                  Feature
                </th>
                {plans.map((p) => (
                  <th key={p.id} scope="col" className="px-4 py-3 text-center text-md font-semibold text-foreground">
                    {p.name}
                    <span className="block text-sm font-normal text-muted-foreground">
                      {"from" in p ? "from " : ""}
                      {inr(annualPrice[p.id])}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            {compare.map((g) => (
              <tbody key={g.group}>
                <tr className="bg-sidebar/60">
                  <th scope="colgroup" colSpan={5} className="px-4 py-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                    {g.group}
                  </th>
                </tr>
                {g.rows.map((r) => (
                  <tr key={r.label} className="border-t border-border">
                    <th scope="row" className="px-4 py-3 text-md font-normal text-foreground">
                      {r.label}
                    </th>
                    {r.values.map((v, i) => (
                      <td key={i} className="px-4 py-3 text-center">
                        <CellValue value={v} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
        <p className="mt-4 text-sm text-faint">
          Compare table shows annual-billing prices per user per month. * Unlimited Copilot is subject to fair use, which
          exists to prevent abuse.
        </p>
      </Section>

      <Section tone="tint">
        <SectionHeading eyebrow="Launch offers" title="Ways to get started for less." />
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {offers.map((o) => (
            <li key={o.title} className="rounded-lg border border-border bg-surface p-5">
              <p className="text-xl font-semibold text-foreground">{o.title}</p>
              <p className="mt-1.5 text-md leading-relaxed text-muted-foreground">{o.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Request access
            </Button>
          </Link>
          <p className="text-md text-muted-foreground">Not sure which plan fits? Tell us how your team sells and we will recommend one.</p>
        </div>
      </Section>
    </>
  );
}
