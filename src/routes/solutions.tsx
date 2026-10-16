import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, MessageCircle, Rocket, Users } from "lucide-react";
import { Badge, Card } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";

export const Route = createFileRoute("/solutions")({
  head: pageHead(
    "/solutions",
    "Solutions",
    "Who HeiGin is for: small and growing sales teams, B2B service businesses, agencies, and teams that sell through messaging."
  ),
  component: Solutions,
});

const segments = [
  {
    icon: Rocket,
    title: "Small and growing sales teams",
    body: "No time for CRM admin and no ops team to build automations. HeiGin aims to keep the pipeline moving without either.",
    useCases: ["Missed follow-ups", "Stalled deals"],
  },
  {
    icon: Briefcase,
    title: "B2B service businesses",
    body: "Long relationships, repeat work and many touchpoints. Surface accounts that need attention before they drift.",
    useCases: ["Customers needing attention", "Manual admin"],
  },
  {
    icon: Users,
    title: "Agencies with many clients",
    body: "Dozens of relationships, each with its own threads and promises. Keep every one moving forward.",
    useCases: ["Missed follow-ups", "Workflow coordination"],
  },
  {
    icon: MessageCircle,
    title: "Teams selling through messaging",
    body: "When deals happen in chat, context gets lost. Bring conversations onto the customer timeline.",
    useCases: ["Lead qualification", "Missed follow-ups"],
  },
];

function Solutions() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title="For teams where every relationship counts."
        description="We're confirming exactly who HeiGin serves best with our pilot teams. These are the teams we're designing for."
      />
      <Section>
        <SectionHeading
          title="Which sounds like your team?"
          description="Proposed segments: we'll publish detailed pages once pilot evidence supports them."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {segments.map((s) => (
            <Card key={s.title} padding="lg">
              <s.icon size={20} strokeWidth={1.7} aria-hidden="true" className="text-foreground" />
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {s.useCases.map((u) => <Badge key={u} tone="outline" size="sm">{u}</Badge>)}
              </div>
            </Card>
          ))}
        </div>
        <Link to="/use-cases" className="mt-8 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
          Explore all use cases <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>
      <Section tone="tint">
        <div className="grid items-center gap-8 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Become a pilot customer"
            title="Help us build the CRM your team actually needs."
            description="Pilot teams get early access, direct contact with the people building HeiGin, and real influence over what we build next."
          />
          <div className="lg:justify-self-end">
            <Link to="/contact" className="inline-flex items-center gap-1.5 rounded-md bg-primary px-5 py-2.5 text-lg font-medium text-primary-foreground transition-colors hover:bg-accent-hover">
              Apply for the pilot <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
