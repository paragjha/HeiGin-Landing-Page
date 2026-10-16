import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check } from "lucide-react";
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
    "HeiGin pricing: pilot programme open now, with settled launch prices of ₹799 and ₹1,599 per user per month."
  ),
  component: Pricing,
});

const plans = [
  {
    name: "Pilot programme",
    status: "Open now",
    price: "By arrangement",
    per: null,
    body: "Work directly with the HeiGin team, use the product early and shape what we build.",
    points: ["Guided onboarding on your workflow", "Direct line to the product team", "Influence over the roadmap"],
    cta: { label: "Apply for the pilot", to: "/contact" },
    featured: true,
  },
  {
    name: "Starter",
    status: "At public launch",
    price: "₹799",
    per: "per user / month",
    body: "For small sales teams moving off spreadsheets and chat threads.",
    points: ["Customer records, pipeline and timeline", "Follow-up agent with approvals", "Task list built from open loops"],
    cta: { label: "Get notified", to: "/contact" },
  },
  {
    name: "Growth",
    status: "At public launch",
    price: "₹1,599",
    per: "per user / month",
    body: "For growing teams that want agents working across the whole pipeline.",
    points: ["Everything in Starter", "Full agent team as agents launch", "Quotes and payments"],
    cta: { label: "Get notified", to: "/contact" },
  },
  {
    name: "Custom",
    status: "Talk to us",
    price: "Custom",
    per: null,
    body: "For organisations with specific requirements around workflows, data or rollout.",
    points: ["Requirements discussed individually"],
    cta: { label: "Talk to our team", to: "/contact" },
  },
];

function Pricing() {
  useEffect(() => {
    track("pricing_page_visited");
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title="Join the pilot now. Simple per-user pricing at launch."
        description="HeiGin is in early access. Starter and Growth are our settled launch prices — they go on sale when public access opens. Right now, the way in is the pilot programme."
        showCtas={false}
      />
      <Section>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((p) => (
            <Card key={p.name} padding="lg" className={cn("flex flex-col", p.featured && "border-ink shadow-[var(--hg-shadow-popover)]")}>
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">{p.name}</h2>
              </div>
              <div className="mt-2"><Badge tone={p.featured ? "success" : "outline"} size="sm">{p.status}</Badge></div>
              <p className="mt-5 text-4xl font-semibold tracking-tight text-foreground">{p.price}</p>
              {p.per && <p className="mt-1 text-sm text-faint">{p.per}</p>}
              <p className="mt-2 text-md leading-relaxed text-muted-foreground">{p.body}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {p.points.map((pt) => (
                  <li key={pt} className="flex gap-2 text-md text-foreground">
                    <Check size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-success" />
                    {pt}
                  </li>
                ))}
              </ul>
              <Link to={p.cta.to} className="mt-6">
                <Button variant={p.featured ? "primary" : "secondary"} fullWidth>{p.cta.label}</Button>
              </Link>
            </Card>
          ))}
        </div>
        <p className="mt-6 text-sm text-faint">Prices in INR, exclusive of GST.</p>
      </Section>
      <Section tone="tint">
        <SectionHeading
          eyebrow="The pilot"
          title="What joining the pilot looks like."
        />
        <ol className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            ["Tell us about your team", "Share your current CRM or workflow and the problems you want solved."],
            ["Walk through your use case", "We show HeiGin on scenarios that match how your team actually sells."],
            ["Start and give feedback", "Use HeiGin with your team and tell us what works and what doesn't."],
          ].map(([t, b], i) => (
            <li key={t} className="rounded-lg border border-border bg-surface p-5">
              <span className="text-sm font-semibold text-faint">Step {i + 1}</span>
              <p className="mt-1 text-xl font-semibold text-foreground">{t}</p>
              <p className="mt-1.5 text-md leading-relaxed text-muted-foreground">{b}</p>
            </li>
          ))}
        </ol>
      </Section>
    </>
  );
}
