import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section, SectionHeading } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { PlaceholderNote } from "@/components/site/placeholder-note";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";

export const Route = createFileRoute("/about")({
  head: pageHead(
    "/about",
    "About",
    "Why HeiGin exists: moving CRM from a passive system of record to a proactive system that helps teams act."
  ),
  component: About,
});

const values = [
  {
    title: "Help people act",
    body: "Software should move work forward, not just record it.",
  },
  {
    title: "Human approval by default",
    body: "Agents propose; people confirm. Permissions, approvals and an admin-only audit log back every action.",
  },
  {
    title: "Honest about where we are",
    body: "Status labels on this site stay honest. If something isn't shipped, we don't call it shipped.",
  },
];

function About() {
  return (
    <>
      {/* 1. Hero — two-column. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>About HeiGin</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              CRMs remember. We want them to help.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                For decades, CRMs have been systems of record — good at storing the past, dependent on people to
                work out what comes next. HeiGin is built to close that gap.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/contact?intent=demo">
                  <Button variant="primary" size="lg">Book a call</Button>
                </a>
                <a href="/contact?intent=pilot">
                  <Button variant="secondary" size="lg">Apply for the pilot</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pilot teams. */}
      <PilotTeamRow />

      {/* 3. Why we exist. */}
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="Why we exist" title="Relationships slip in the gaps between tools and busy weeks." />
          <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Most lost customers aren't lost to a better offer. They're lost to a reply that never went out, a
              question nobody answered, a quiet account nobody noticed.
            </p>
            <p>
              The next generation of CRM is proactive: it connects context across the tools teams already use,
              notices what needs attention, and helps people take the next step — with humans firmly in control of
              what matters.
            </p>
          </div>
        </div>
      </Section>

      {/* 4. What we value. */}
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

      {/* 5. The team — BLOCKED on bios + founder note. */}
      <Section>
        <SectionHeading eyebrow="The team" title="The people building HeiGin." />
        <div className="mt-6">
          <PlaceholderNote>
            Founder note and team bios go here once Parag shares them. Keeping this section out until then — see the
            website redesign plan.
          </PlaceholderNote>
        </div>
      </Section>

      {/* 6. Final CTA. */}
      <Section className="border-t border-border">
        <FinalCtaBanner
          title="Want to see what we're building?"
          description="A 30-minute walkthrough on your own workflow — we'll show what ships today and what's next."
          primary={{ label: "Book a call", to: "/contact?intent=demo" }}
          secondary={{ label: "Apply for the pilot", to: "/contact?intent=pilot" }}
          trackLocation="about-final"
        />
      </Section>
    </>
  );
}
