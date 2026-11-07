import { createFileRoute } from "@tanstack/react-router";
import { ClipboardList, KeyRound, ShieldCheck, Globe, Clock, Plug, Award } from "lucide-react";
import { Button } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { Section, SectionHeading } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { site } from "@/lib/site";

export const Route = createFileRoute("/security")({
  head: pageHead(
    "/security",
    "Security & Trust",
    "How HeiGin approaches data access, agent permissions, approvals and audit visibility — and what is still being confirmed or not yet claimed."
  ),
  component: Security,
});

/**
 * Three honest states, per the 2026-11-07 decisions:
 *   - principles: shipped in the product today (verifiable from the CRM app).
 *   - confirming: being worked out with the product team; stated here so visitors
 *                 know it's acknowledged, not forgotten.
 *   - notClaimed: things we explicitly do NOT claim. No vague implications.
 *
 * Do not add encryption, hosting region, DPDP posture, SOC 2 or ISO claims
 * until Parag states them. Blanks are a feature here.
 */
const principles = [
  {
    icon: KeyRound,
    title: "Role-based access",
    body: "Six roles — Admin, Sales Manager, Senior AE, AE, SDR, Read-only — scope what each person, and each agent acting on their behalf, can see and touch.",
  },
  {
    icon: ShieldCheck,
    title: "Human approval by default",
    body: "Outbound messages and quote changes default to a review step. Copilot proposes on a card; the right person clicks Confirm, Edit or Reject before anything leaves the system.",
  },
  {
    icon: ClipboardList,
    title: "Admin-only audit log",
    body: "Every proposal and every action an agent takes is kept in an audit log, with who approved it and when. Only admins can read it.",
  },
];

const confirming = [
  {
    icon: Globe,
    title: "Data storage location and residency",
    body: "We'll publish the regions HeiGin runs in, and the regions where customer data is stored, once they are finalised with the pilot program.",
  },
  {
    icon: Clock,
    title: "Retention and deletion",
    body: "Retention periods for leads, activities, calls and documents, and the self-serve deletion flow, are being specified. We'll publish them here before pilot teams need them in a contract.",
  },
  {
    icon: Plug,
    title: "Per-integration scopes",
    body: "Each integration asks for the narrowest scope its feature needs. The exact scopes per integration will land on /integrations with each row.",
  },
];

const notClaimed = [
  {
    icon: Award,
    title: "No security certifications claimed",
    body: "HeiGin does not currently hold SOC 2, ISO 27001, or a DPDP attestation. We'll list them here only when they are real — not as a roadmap commitment on this page.",
  },
];

function Security() {
  return (
    <>
      {/* 1. Hero — two-column. No CTAs; the page itself is the answer. */}
      <section className="border-b border-border">
        <div className="container-site py-16 md:py-24">
          <InlineEyebrow>Security &amp; trust</InlineEyebrow>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              Transparent about what's built, what's being confirmed, and what we don't claim.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                HeiGin is early. Rather than listing badges we haven't earned, this page splits our security posture
                into three honest states.
              </p>
              <a href={`mailto:${site.securityEmail}`}>
                <Button variant="primary" size="lg">Email security</Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pilot teams. */}
      <PilotTeamRow />

      {/* 3. Core design principles — what the product does today. */}
      <Section>
        <SectionHeading
          eyebrow="Core design principle"
          title="How agents act under human control."
          description="Three things that are built into the product today and visible in the app."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {principles.map((p) => (
            <article key={p.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-md bg-sidebar text-foreground">
                <p.icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-2 text-md leading-relaxed text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 4. Being confirmed — acknowledged, worked on, not yet published. */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Being confirmed"
          title="What we're still writing down."
          description="Known gaps. We'd rather leave them blank here than guess."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {confirming.map((c) => (
            <article key={c.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-md bg-sidebar text-foreground">
                <c.icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
              <p className="mt-2 text-md leading-relaxed text-muted-foreground">{c.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 5. Not claimed yet — explicit. */}
      <Section>
        <SectionHeading
          eyebrow="Not claimed yet"
          title="Things HeiGin does not claim."
          description="Explicit non-claims. If this page is silent on a certification, we do not hold it."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {notClaimed.map((n) => (
            <article key={n.title} className="rounded-2xl border border-border bg-surface p-6">
              <span className="flex size-10 items-center justify-center rounded-md bg-sidebar text-foreground">
                <n.icon size={18} strokeWidth={1.7} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl font-semibold tracking-tight text-foreground">{n.title}</h3>
              <p className="mt-2 text-md leading-relaxed text-muted-foreground">{n.body}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* 6. Security contact. */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="Questions"
          title="Have a security question?"
          description={
            <>
              Ask us directly at{" "}
              <a href={`mailto:${site.securityEmail}`} className="font-medium text-foreground underline">
                {site.securityEmail}
              </a>
              . We'd rather give you a straight answer than a vague one.
            </>
          }
        />
      </Section>
    </>
  );
}
