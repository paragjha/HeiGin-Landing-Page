import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section, SectionHeading } from "@/components/site/section";
import { PlaceholderNote } from "@/components/site/placeholder-note";

export const Route = createFileRoute("/about")({
  head: pageHead(
    "/about",
    "About",
    "Why HeiGin exists: moving CRM from a passive system of record to a proactive system that helps teams act."
  ),
  component: About,
});

const values = [
  { title: "Help people act", body: "Software should move work forward, not just record it." },
  { title: "Earn trust gradually", body: "Agents get more autonomy only as teams choose to give it." },
  { title: "Be honest about where we are", body: "We label what's built, what's in progress, and what's planned." },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="About HeiGin"
        title="CRMs remember. We want them to help."
        description="For decades, CRMs have been systems of record — good at storing the past, dependent on people to work out what comes next. We're building HeiGin to close that gap."
        showCtas={false}
      />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Why we exist" title="Relationships slip in the gaps between tools and busy weeks." />
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Most lost customers aren't lost to a better offer. They're lost to a reply that never went out, a
              question nobody answered, a quiet account nobody noticed.
            </p>
            <p>
              We believe the next generation of CRM will be proactive: it will connect context across the tools teams
              already use, notice what needs attention, and help people take the next step — with humans firmly in
              control of what matters.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="tint">
        <SectionHeading eyebrow="What we value" title="How we build." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-lg border border-border bg-surface p-6">
              <h3 className="text-2xl font-semibold tracking-tight text-foreground">{v.title}</h3>
              <p className="mt-2 text-lg text-muted-foreground">{v.body}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="The team" title="The people building HeiGin." />
        <div className="mt-6"><PlaceholderNote>Founding team story and bios go here once provided</PlaceholderNote></div>
      </Section>
    </>
  );
}
