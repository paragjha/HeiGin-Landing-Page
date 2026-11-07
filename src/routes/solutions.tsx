import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Briefcase, MessageCircle, Rocket, Users } from "lucide-react";
import { Button } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section, SectionHeading } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";

export const Route = createFileRoute("/solutions")({
  head: pageHead(
    "/solutions",
    "Solutions",
    "Who HeiGin is for: small and growing sales teams, B2B service businesses, agencies, and teams that sell through messaging."
  ),
  component: Solutions,
});

/**
 * Four proposed segments (confirmed with Parag 2026-11-07). Each useCase slug
 * links to a #anchor on /use-cases — only slugs that actually exist there:
 *  follow-ups, deals, leads, calls, admin.
 *
 * Detailed per-segment pages (e.g. /solutions/agencies) land when pilot
 * evidence supports each one, not before.
 */
interface Segment {
  icon: typeof Rocket;
  title: string;
  body: string;
  useCases: readonly { label: string; slug: string }[];
}

const segments: Segment[] = [
  {
    icon: Rocket,
    title: "Small and growing sales teams",
    body: "No time for CRM admin and no ops team to build automations. HeiGin aims to keep the pipeline moving without either.",
    useCases: [
      { label: "Missed follow-ups", slug: "follow-ups" },
      { label: "Stalled deals", slug: "deals" },
    ],
  },
  {
    icon: Briefcase,
    title: "B2B service businesses",
    body: "Long relationships, repeat work and many touchpoints. HeiGin keeps the record accurate without becoming anyone's second job.",
    useCases: [
      { label: "Stalled deals", slug: "deals" },
      { label: "CRM admin", slug: "admin" },
    ],
  },
  {
    icon: Users,
    title: "Agencies with many clients",
    body: "Dozens of relationships, each with its own threads and promises. HeiGin surfaces the ones at risk of going quiet.",
    useCases: [
      { label: "Missed follow-ups", slug: "follow-ups" },
      { label: "Lead qualification", slug: "leads" },
    ],
  },
  {
    icon: MessageCircle,
    title: "Teams selling through messaging and calls",
    body: "When deals happen in Hinglish on WhatsApp and the phone, context gets lost. HeiGin brings every conversation onto the timeline.",
    useCases: [
      { label: "Hinglish calls and notes", slug: "calls" },
      { label: "Missed follow-ups", slug: "follow-ups" },
    ],
  },
];

function Solutions() {
  return (
    <>
      {/* 1. Hero — two-column pattern. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>Solutions</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              For teams where every relationship counts.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                Four team shapes we're serving today. Detailed pages land when the pilot evidence supports each one.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a href="/contact?intent=pilot">
                  <Button variant="primary" size="lg">Apply for the pilot</Button>
                </a>
                <a href="/pricing">
                  <Button variant="secondary" size="lg">See pricing</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pilot teams. */}
      <PilotTeamRow />

      {/* 3. Four segments. */}
      <Section>
        <SectionHeading
          eyebrow="Proposed segments"
          title="Which sounds like your team?"
          description="Each card links to the use cases we think fit. Pilot evidence decides which segments get their own page next."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {segments.map((s) => (
            <article key={s.title} className="rounded-2xl border border-border bg-surface p-6 md:p-8">
              <s.icon size={20} strokeWidth={1.7} aria-hidden="true" className="text-foreground" />
              <h3 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{s.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {s.useCases.map((u) => (
                  <li key={u.slug}>
                    <Link
                      to="/use-cases"
                      hash={u.slug}
                      className="inline-flex items-center rounded-md border border-border bg-background px-2.5 py-1 text-sm text-foreground transition-colors hover:bg-sidebar"
                    >
                      {u.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <Link to="/use-cases" className="mt-8 inline-flex items-center gap-1.5 text-lg font-medium text-foreground hover:underline">
          Explore all use cases <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>

      {/* 4. Final CTA — pilot slot. */}
      <Section className="border-t border-border">
        <FinalCtaBanner
          title="Help us build the CRM your team actually needs."
          description="Pilot teams get early access, direct contact with the people building HeiGin, and real influence over what we ship next."
          primary={{ label: "Apply for the pilot", to: "/contact?intent=pilot" }}
          secondary={{ label: "Book a call", to: "/contact?intent=demo" }}
          trackLocation="solutions-final"
        />
      </Section>
    </>
  );
}
