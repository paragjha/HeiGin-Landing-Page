import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@heigin/ui";
import { Section, SectionHeading } from "@/components/site/section";
import { InlineEyebrow } from "@/components/site/inline-eyebrow";
import { FaqList, type FaqItem } from "@/components/site/faq-list";
import { FeatureDeepDive } from "@/components/site/feature-deep-dive";
import { PilotTeamRow } from "@/components/site/pilot-team-row";
import { NewsroomCard, type NewsroomPost } from "@/components/site/newsroom-card";
import { ThumbAgenticCrm } from "@/components/blog/thumb-agentic-crm";
import { ThumbFollowUps } from "@/components/blog/thumb-follow-ups";
import { ThumbAgentTrust } from "@/components/blog/thumb-agent-trust";
import { TestimonialFigure } from "@/components/site/testimonial-figure";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";
import { testimonials } from "@/lib/testimonials";
import { track } from "@/lib/analytics";
import { HeroProductDemo } from "@/components/mockups/hero-product-demo";
import { WorkflowCard } from "@/components/mockups/workflow-card";
import {
  DeepEarlySignals,
  DeepFollowUps,
  DeepSalesContext,
  SceneDealBrief,
  SceneFollowUpDraft,
  SceneMeetingContext,
  SceneStalledAccount,
} from "@/components/mockups/workflow-scenes";
import { IntegrationMarquee } from "@/components/site/integration-marquee";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HeiGin: The CRM that never lets a customer slip through the cracks" },
      {
        name: "description",
        content:
          "HeiGin is the agentic CRM that runs your sales process. Connected context, agents that act, your team in control.",
      },
      { property: "og:title", content: "HeiGin: The agentic CRM" },
      {
        property: "og:description",
        content: "The CRM that never lets a customer slip through the cracks. Request early access.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://heigin.com/" }],
  }),
  component: Home,
});

// Home-page newsroom row: links to the three published launch posts. Each
// card renders its coded video thumbnail (not a static image) matching the
// article's hero scene.
const blogPosts: Array<NewsroomPost & { to: string; thumb: ReactNode }> = [
  {
    slug: "what-is-an-agentic-crm",
    tag: "Primer",
    title: "What is an agentic CRM?",
    summary: "Why systems of record need a second job: moving work forward.",
    date: "7 min read",
    to: "/blog/what-is-an-agentic-crm",
    thumb: <ThumbAgenticCrm tone="dark" />,
  },
  {
    slug: "why-follow-ups-slip",
    tag: "Sales workflows",
    title: "Why follow-ups slip, and how to stop it.",
    summary: "Open loops hide in the week. HeiGin surfaces them before they cool.",
    date: "7 min read",
    to: "/blog/why-follow-ups-slip",
    thumb: <ThumbFollowUps tone="dark" />,
  },
  {
    slug: "how-we-think-about-agent-trust",
    tag: "Design",
    title: "How we think about agent trust.",
    summary: "Permissions, approvals and an admin-only audit log — the real guardrails.",
    date: "8 min read",
    to: "/blog/how-we-think-about-agent-trust",
    thumb: <ThumbAgentTrust tone="dark" />,
  },
];

const faqs: FaqItem[] = [
  {
    q: "What is an agentic CRM?",
    a: "A CRM that does more than store records. It uses AI agents to read customer context, notice what needs attention, and propose or carry out the next step, within the permissions your team sets.",
  },
  {
    q: "How is HeiGin different from a traditional CRM?",
    a: "Traditional CRMs depend on people to remember what to do next. HeiGin is designed to surface open loops, stalled deals and customers needing attention, and to help your team act on them.",
  },
  {
    q: "Which tools can HeiGin connect to?",
    a: "Gmail, CSV import and Zapier are live today. Google Calendar, Google Meet, Slack, WhatsApp, Notion, Outlook, Linear, Jira, and HubSpot/Salesforce imports are in development. See the integrations page for each one's current status.",
  },
  {
    q: "Can agents take actions automatically?",
    a: "Agents work within role-based permissions. Outbound and sensitive actions require approval by default — Copilot proposes, your team confirms — and every proposal and action is kept in an admin-only audit log.",
  },
  {
    q: "Can our team review agent actions?",
    a: "Yes, that is a core design principle. Agent proposals and actions are recorded in an activity log showing what happened, why, and who approved it.",
  },
  {
    q: "Can we import existing CRM data?",
    a: "CSV import is available today with guided column mapping. Direct HubSpot and Salesforce imports are in development; in the meantime we help pilot teams migrate via a CSV export. Tell us what you're coming from.",
  },
  {
    q: "How do we get access?",
    a: "HeiGin is in an early pilot. Request early access and we'll get in touch to understand your team and workflow.",
  },
  {
    q: "How is customer data handled?",
    a: "We are documenting our data handling practices as the product matures. Our security page describes the intended model and lists what is still being confirmed. Ask us anything at any time.",
  },
];

function Home() {
  return (
    <>
      {/* 1. Hero: two-column text row + framed workflow demo over the landscape. */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="container-site pt-10 md:pt-14">
          {/* Text row: headline left, description + CTAs right; stacks on mobile. */}
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
            <h1 className="text-balance text-display text-foreground">
              Stop losing deals to missed follow-ups.
            </h1>
            <div className="flex flex-col gap-6">
              <p className="max-w-xl text-subhead text-muted-foreground">
                HeiGin brings every customer signal to one timeline, drafts the next step, and keeps
                your team in control.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href="/contact?intent=trial"
                  onClick={() => track("cta_early_access_clicked", { location: "hero-primary" })}
                >
                  <Button variant="primary" size="lg">Start free</Button>
                </a>
                <a href="/pricing">
                  <Button variant="secondary" size="lg">See pricing</Button>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Framed demo lives inside HeroProductDemo now — painterly bg, glass
            app frame and the circular pause button all belong to that component. */}
        <div className="relative mt-10 pb-12 md:mt-14 md:pb-16">
          <HeroProductDemo />
        </div>
      </section>

      {/* 2. Pilot teams — quiet logo row. */}
      <PilotTeamRow />

      {/* 3. Specialized workflows — 2×2 grid, each card over the landscape. */}
      <Section>
        <SectionHeading
          eyebrow="Specialized workflows"
          title="Workflows HeiGin runs today."
          description="Each one picks up where a rep would have run out of hours in the week."
        />
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <WorkflowCard
            eyebrow="01 · Context"
            title="Meeting context, on the record"
            description="Calls and notes attach themselves to the customer timeline, with their source visible."
          >
            <SceneMeetingContext />
          </WorkflowCard>
          <WorkflowCard
            eyebrow="02 · Follow-ups"
            title="Drafts, ready for a human"
            description="The agent writes the reply from the discussed context. Customer-facing actions wait for approval."
          >
            <SceneFollowUpDraft />
          </WorkflowCard>
          <WorkflowCard
            eyebrow="03 · Briefs"
            title="A brief for the next conversation"
            description="Before a meeting, HeiGin surfaces what matters: last touch, open asks, the suggested next step."
          >
            <SceneDealBrief />
          </WorkflowCard>
          <WorkflowCard
            eyebrow="04 · Early signals"
            title="Quiet accounts, surfaced in time"
            description="Stalled deals and silent customers are flagged while the week can still move them."
          >
            <SceneStalledAccount />
          </WorkflowCard>
        </div>
      </Section>

      {/* 4. Integrations marquee — single continuous row of monochrome logos. */}
      <Section tone="tint">
        <div className="grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
          <SectionHeading
            eyebrow="Integrations"
            title="Works with the tools your team already uses."
            description="Conversations, calendars and docs feed context in."
          />
          <Link
            to="/integrations"
            className="inline-flex items-center gap-1.5 text-md font-medium text-foreground hover:underline lg:justify-self-end"
          >
            See every integration <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <p className="mt-2 text-sm text-faint">
          Gmail, CSV import and Zapier are live today. Other logos are in development — the integrations page shows each one's current status.
        </p>
        <div className="mt-10">
          <IntegrationMarquee />
        </div>
      </Section>

      {/* 5–7. Three feature deep-dives: numbered heading on the left, copy on the right, demo below. */}
      <Section id="workflow" className="scroll-mt-28">
        <FeatureDeepDive
          number="01"
          title="Sales context in one place"
          description="Bring conversations, meetings and customer details together so the team sees the full relationship at a glance — not scattered across six tabs."
        >
          <DeepSalesContext />
        </FeatureDeepDive>
      </Section>

      <Section tone="tint">
        <FeatureDeepDive
          number="02"
          title="Follow-ups that keep moving"
          description="Surface the open loops across your accounts and prepare timely, context-aware next steps. Customer-facing actions are reviewed before they go out, per HeiGin's approval settings."
        >
          <DeepFollowUps />
        </FeatureDeepDive>
      </Section>

      <Section>
        <FeatureDeepDive
          number="03"
          title="Early signals on deals and customers"
          description="Stalled deals and quiet accounts are brought to the team's attention while there is still time to act — with the reason attached, not buried in a Friday report."
        >
          <DeepEarlySignals />
        </FeatureDeepDive>
      </Section>

      {/* Blog / newsroom — 3 recent posts in painterly-backed cards. */}
      <Section tone="tint">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <InlineEyebrow>Newsroom</InlineEyebrow>
            <h2 className="mt-3 text-balance text-headline text-foreground">
              Writing from the HeiGin team.
            </h2>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 rounded-md px-3.5 py-1.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            View all <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {blogPosts.map(({ to, thumb, ...post }) => (
            <li key={post.slug}>
              <NewsroomCard post={post} to={to} thumb={thumb} />
            </li>
          ))}
        </ul>
      </Section>

      {/* 12. Testimonials — pilot-team quotes, signed off */}
      <Section tone="tint" className="overflow-hidden">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="inline-flex rounded-full bg-surface px-3 py-1 text-sm font-medium text-foreground shadow-card">
              Testimonials
            </span>
            <h2 className="mt-4 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-semibold leading-tight tracking-tight text-foreground">
              Early teams, real pipelines.
              <br />
              <span className="text-faint">Here's what they say.</span>
            </h2>
          </div>
          <Link to="/contact">
            <Button variant="primary" size="md">Talk to us</Button>
          </Link>
        </div>
        <div className="relative mt-12">
          <div className="grid gap-5 md:grid-cols-2">
            {testimonials.map((t) => (
              <TestimonialFigure key={t.company} testimonial={t} />
            ))}
          </div>
        </div>
      </Section>

      {/* 13. FAQ — kinetic accordion: opening one closes the previous with a smooth height transition. */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <InlineEyebrow>Good to know</InlineEyebrow>
            <h2 className="mt-3 text-balance text-headline text-foreground">
              Frequently asked questions.
            </h2>
          </div>
          <FaqList items={faqs} />
        </div>
      </Section>

      {/* 14. Final CTA banner — contained panel (1279 × 824.72 at desktop),
          painterly bg, big closing headline, two CTAs. Not full-bleed. */}
      <Section className="border-t border-border">
        <FinalCtaBanner
          title="Give every customer relationship a clear next step."
          description="Book a 30-minute walkthrough on your own workflow, or apply for the pilot."
          primary={{ label: "Book a call", to: "/contact?intent=demo" }}
          secondary={{ label: "Apply for the pilot", to: "/contact?intent=pilot" }}
        />
      </Section>
    </>
  );
}
