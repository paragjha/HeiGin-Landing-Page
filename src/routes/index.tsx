import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, FileText, Globe, MapPin, MessageSquare } from "lucide-react";
import { Badge, Button } from "@heigin/ui";
import { Section, SectionHeading, Eyebrow } from "@/components/site/section";
import { CtaPair } from "@/components/site/cta";
import { cta } from "@/lib/site";
import { WorkflowDemo } from "@/components/mockups/workflow-demo";
import { PipelineMockup } from "@/components/mockups/pipeline-mockup";
import { TasksMockup } from "@/components/mockups/tasks-mockup";
import { AgentActivityMockup } from "@/components/mockups/agent-activity-mockup";
import { IntegrationHub } from "@/components/mockups/integration-hub";
import { UniversalContext } from "@/components/site/universal-context";
import { TrustLadder } from "@/components/site/trust-ladder";
import { Reveal } from "@/components/site/reveal";
import { AppFrame } from "@/components/site/app-frame";
import { ScrollRise } from "@/components/site/scroll-rise";
import dashboardShot from "@/assets/app-dashboard.png.asset.json";
import copilotShot from "@/assets/app-copilot.png.asset.json";
import heimatverseLogo from "@/assets/heimatverse-logo.png.asset.json";
import adlanticLogo from "@/assets/adlantic-logo.png.asset.json";

import quotesShot from "@/assets/app-quotes.png.asset.json";
import { AgentGrid } from "@/components/site/agent-grid";

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

const problems = [
  {
    title: "Follow-ups are forgotten",
    body: "When the week gets busy, promised replies and next steps quietly fall off the list.",
  },
  {
    title: "Context is fragmented",
    body: "The real story of a relationship is spread across calls, inboxes, chats and docs.",
  },
  {
    title: "Deals stall unnoticed",
    body: "By the time a stalled deal shows up in a report, the moment has usually passed.",
  },
];

const copilotExamples = [
  {
    q: "Which quotes are still waiting on a decision?",
    a: "Three quotes are open over 7 days: Kaveri Textiles (₹1.4L), Sundaram Mills (₹86k) and one more.",
  },
  {
    q: "Who won the most this quarter?",
    a: "Meera S leads with 4 wins worth ₹6.2L in the demo workspace.",
  },
  {
    q: "Draft a follow-up for Sundaram Mills.",
    a: "Copilot drafts it against the last call notes and holds it for approval. Nothing sends itself.",
  },
];

const capabilities = [
  {
    icon: MessageSquare,
    title: "WhatsApp on the record",
    body: "Customer conversations on WhatsApp belong on the timeline, not in a rep's personal phone.",
    example: "“Send the revised quote”, logged to Kaveri Textiles",
  },
  {
    icon: FileText,
    title: "GST-correct quotes",
    body: "Quotes and invoices built for Indian tax rules from the start, not bolted on later.",
    example: "GSTIN · IGST 18% · ₹1,42,000",
  },
  {
    icon: Globe,
    title: "Indian lead sources",
    body: "Leads from IndiaMART and JustDial land in the pipeline with their context attached.",
    example: "IndiaMART enquiry → New lead, 2 min ago",
  },
  {
    icon: MapPin,
    title: "Field check-ins",
    body: "Reps on the road log visits from their phone, so the timeline knows who was where.",
    example: "Checked in · Andheri East, 11:20 am",
  },
];

const faqs = [
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
    a: "Integrations with tools like Gmail, Google Calendar, Google Meet and Slack are available. WhatsApp is in development. See the integrations page for the current status of each.",
  },
  {
    q: "Can agents take actions automatically?",
    a: "Agents work within defined permissions. Outbound and sensitive actions require approval by default, and your team raises each agent's autonomy as confidence grows.",
  },
  {
    q: "Can our team review agent actions?",
    a: "Yes, that is a core design principle. Agent proposals and actions are recorded in an activity log showing what happened, why, and who approved it.",
  },
  {
    q: "Can we import existing CRM data?",
    a: "Yes, imports from CSV, HubSpot and Salesforce are available, with guided field mapping. If you use something else, tell us when requesting access.",
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

// Each mark keeps its own treatment: HeimatVerse is dark on a light tile,
// ADLantic ships as a dark tile with a white mark.
const pilotTeams = [
  { name: "HeimatVerse", logo: heimatverseLogo.url, tile: "bg-surface ring-1 ring-border" },
  { name: "ADLantic", logo: adlanticLogo.url, tile: "bg-night ring-1 ring-border" },
];

// Pilot-team quotes. Wording signed off by each team (confirmed 2026-10-16).
const testimonials = [
  {
    company: "HeimatVerse",
    role: "Pilot team",
    logo: heimatverseLogo.url,
    tile: "bg-surface ring-1 ring-border",
    quote: "Follow-ups used to live in people's heads. Now HeiGin flags them before they slip, and drafts the message for us to approve.",
  },
  {
    company: "ADLantic",
    role: "Pilot team",
    logo: adlanticLogo.url,
    tile: "bg-night ring-1 ring-border",
    quote: "Having WhatsApp conversations, quotes and calls on one timeline means anyone on the team can pick up a client without a handover call.",
  },
];

function Home() {
  const [question, setQuestion] = useState(0);

  return (
    <>
      {/* 1. Hero */}
      <section className="hero-sky relative overflow-hidden border-b border-border">
        <div aria-hidden="true" className="hero-grid pointer-events-none absolute inset-0" />
        <div className="container-site relative pb-16 pt-16 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-3xl animate-rise text-center">
            <Link
              to={cta.earlyAccess.to}
              className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3.5 py-1.5 text-sm shadow-card transition-colors hover:bg-accent"
            >
              <span className="size-1.5 rounded-full bg-info" aria-hidden="true" />
              <span className="font-medium text-foreground">Pilot</span>
              <span className="text-muted-foreground">Sign up for the pilot program</span>
              <ChevronRight size={14} className="text-muted-foreground" aria-hidden="true" />
            </Link>
            <h1 className="mt-4 text-display text-foreground">
              The agentic CRM that keeps sales moving.
            </h1>
            <p className="mx-auto mt-5 max-w-2xl text-subhead text-muted-foreground">
              HeiGin connects customer signals, spots what’s slipping, and drafts
              the next step, with your team in control.
            </p>
            <CtaPair className="mt-8 justify-center" />
          </div>
          <div className="relative mt-14 animate-rise [animation-delay:200ms] [perspective:1600px]">
            <div
              aria-hidden="true"
              className="absolute inset-x-10 bottom-0 top-8 rounded-full bg-info/25 blur-3xl"
            />
            <ScrollRise className="relative mx-auto max-w-5xl">
              <AppFrame
                priority
                shot={dashboardShot}
                alt="HeiGin dashboard showing open pipeline, win rate, lead sources and recently updated deals"
              />
            </ScrollRise>
          </div>
        </div>
      </section>

      {/* 2. Pilot strip — real pilot logos only */}
      <section className="border-b border-border bg-tint">
        <div className="container-site py-10 text-center">
          <p className="text-sm font-medium text-muted-foreground">Working with early pilot teams</p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {pilotTeams.map((team) => (
              <li key={team.name} className="flex items-center gap-3">
                <span
                  className={`flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg ${team.tile}`}
                >
                  <img src={team.logo} alt="" className="size-full object-contain" />
                </span>
                <span className="text-lg font-semibold tracking-tight text-foreground">{team.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3. Problem — said once here, then shown working below */}
      <Section>
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading
            eyebrow="The problem"
            title="Your CRM knows what happened. Does it know what should happen next?"
          />
          <p className="max-w-md text-lg leading-relaxed text-muted-foreground lg:justify-self-end">
            Most CRMs are systems of record, good at storing the past, dependent on people to work out the future.
            These are the three places that breaks down:
          </p>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3">
          {problems.map((p, i) => (
            <div key={p.title} className="flex flex-col bg-surface p-6">
              <span className="text-sm font-semibold text-muted-foreground">0{i + 1}</span>
              <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground">{p.title}</h3>
              <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. How it works — the spine of the story */}
      <Section tone="tint">
        <SectionHeading
          eyebrow="How it works"
          title="From customer signal to meaningful action."
          description={<>Walk through one complete workflow, from a sales call to a closed<br />loop on&nbsp;the&nbsp;customer record.</>}
          aside="One workflow, shown end to end."
        />
        <div className="mt-12">
          <WorkflowDemo />
        </div>
      </Section>

      {/* 5. Universal context */}
      <UniversalContext />

      {/* 6. AI agents (dark): adjacent to universal context so the page has one dark punctuation moment.
          A uniform card grid; each card leads with a small illustration of the agent at work. */}
      <Section dark reveal={false} className="relative overflow-hidden">
        <SectionHeading
          dark
          align="center"
          eyebrow="AI agents"
          title="An AI team that helps move every relationship forward."
          description="Each agent has a specific job, uses specific context, and works within limits you set."
        />
        <div className="mt-14">
          <AgentGrid
            tone="dark"
            tile={{
              to: "/ai-agents",
              title: "How HeiGin agents work",
              body: "Permissions, approvals and the activity log behind every action.",
              chips: ["Permissions", "Approvals", "Activity log"],
            }}
          />
        </div>
      </Section>

      {/* 7. The workspace — proof the product is a full CRM */}
      <Section className="overflow-hidden">
        <SectionHeading
          eyebrow="The workspace"
          title="Everything about the relationship. One place to act on it."
          description="Records, pipeline, quotes, tasks and agent activity share one model - so what the agents notice turns straight into work your team can do."
          aside="Live product views. The task list below is interactive. Try ticking an item."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="min-w-0 overflow-x-auto lg:col-span-7 lg:overflow-visible"><PipelineMockup /></div>
          <div className="space-y-4 lg:col-span-5">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">A pipeline that tells you where to look</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Risk flags sit right on each opportunity, with the reason attached, not buried in a report you check on
              Fridays.
            </p>
          </div>
          <div className="order-last space-y-4 lg:order-none lg:col-span-5 lg:pt-10">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">Quotes and payments on the same record</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              GST-correct quotes go out with a public acceptance link,
              <br />and payment status lands back on the deal, no
              <br />re-entry.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-7">
            <AppFrame
              className="lg:w-[150%] lg:max-w-none"
              shot={quotesShot}
              alt="HeiGin quotes and payments view showing a GST quote with acceptance status"
            />
          </div>
          <div className="space-y-4 lg:col-span-5 lg:pt-10">
            <h3 className="text-2xl font-semibold tracking-tight text-foreground">A to-do list built from open loops</h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Agents turn what they notice into tasks. Tick them off and the record updates. Try it.
            </p>
          </div>
          <div className="min-w-0 overflow-x-auto lg:col-span-7 lg:overflow-visible"><TasksMockup /></div>
          <div className="min-w-0 overflow-x-auto lg:col-span-7 lg:col-start-3 lg:overflow-visible"><AgentActivityMockup /></div>
        </div>
        <Link to="/product" className="mt-10 inline-flex items-center gap-1.5 text-lg font-medium text-info-ink hover:underline">
          Take the product tour <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </Section>

      {/* 8. Ask HeiGin — Copilot with example questions */}
      <Section tone="tint" className="overflow-hidden" reveal={false}>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.5fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Ask HeiGin"
              title="Any record, any answer, in plain language."
              description="Ask who won the most this quarter, which quotes are waiting, or draft a follow-up. Copilot answers from your CRM data and is honest about what it can't do."
            />
            <Badge tone="info" size="sm" className="mt-6">Copilot is in beta</Badge>
            <div className="mt-6 flex flex-wrap gap-2">
              {copilotExamples.map((ex, i) => (
                <button
                  key={ex.q}
                  type="button"
                  onClick={() => setQuestion(i)}
                  aria-pressed={i === question}
                  className={`rounded-md border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                    i === question
                      ? "border-foreground bg-surface text-foreground"
                      : "border-border bg-surface text-muted-foreground hover:bg-accent"
                  }`}
                >
                  {ex.q}
                </button>
              ))}
            </div>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-faint">{copilotExamples[question]!.a}</p>
          </Reveal>
          <Reveal delay={120}>
            <AppFrame className="lg:w-[140%] lg:max-w-none" shot={copilotShot} alt="HeiGin Copilot answering questions about won and lost deals by owner" />
          </Reveal>
        </div>
      </Section>

      {/* 9. Built for how your team sells — depth, not geography */}
      <Section>
        <SectionHeading
          eyebrow="Built for how your team sells"
          title="The messy real world, handled."
          description="Selling happens on WhatsApp, on the road, and through Indian lead sources. HeiGin treats those as first-class parts of the record, not edge cases."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-surface p-5 shadow-card">
              <span className="flex size-9 items-center justify-center rounded-md bg-accent text-foreground">
                <f.icon size={17} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <p className="mt-3 text-lg font-semibold text-foreground">{f.title}</p>
              <p className="mt-1 text-md leading-relaxed text-muted-foreground">{f.body}</p>
              <p className="mt-3 rounded-md bg-sidebar px-2.5 py-1.5 text-xs text-muted-foreground">{f.example}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 10. Human control — the trust ladder, with the log beside it */}
      <Section tone="tint">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Human control"
              title="Autonomy is earned, rung by rung."
              description="Every agent starts at the bottom of the ladder. Your team raises it, rung by rung, agent by agent, as confidence grows. Every action at every rung is logged with its reason."
            />
            <p className="mt-6 text-sm text-faint">
              This is the intended operating model. Which controls are live during the pilot is confirmed with each
              team. <Link to="/security" className="underline hover:text-foreground">Read about security</Link>.
            </p>
            <div className="mt-8 max-w-md">
              <AgentActivityMockup />
            </div>
          </div>
          <TrustLadder />
        </div>
      </Section>

      {/* 11. Integrations */}
      <Section>
        <div className="grid items-end gap-8 lg:grid-cols-[1.1fr_1fr]">
          <SectionHeading
            eyebrow="Integrations"
            title="Your customer context shouldn't live in silos."
            description="Bring conversations, meeting context and team knowledge together so agents can act with better context."
          />
          <Link to="/integrations" className="inline-flex items-center gap-1.5 text-lg font-medium text-info-ink hover:underline lg:justify-self-end">
            See all integrations <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6">
          <IntegrationHub className="max-w-[1040px]" />
        </div>
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
            {testimonials.map((t, i) => (
              <figure
                key={i}
                className="flex min-h-72 flex-col rounded-2xl bg-surface p-8 shadow-card"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl ${t.tile}`}
                  >
                    <img src={t.logo} alt="" className="size-full object-contain" />
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{t.company}</p>
                    <p className="text-sm text-muted-foreground">{t.role}</p>
                  </div>
                </div>
                <blockquote className="mt-6 text-xl leading-relaxed text-foreground">“{t.quote}”</blockquote>
                <figcaption className="mt-auto flex items-center justify-between pt-6 text-sm text-muted-foreground">
                  <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-foreground">Pilot team</span>
                  <span>2026</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Section>

      {/* 13. FAQ */}
      <Section className="border-t border-border">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading eyebrow="FAQ" title="Questions, answered honestly." />
          <div className="divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-xl font-medium text-foreground [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span aria-hidden="true" className="text-2xl font-light text-faint transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-2.5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </Section>

      {/* 14. Final CTA lives in the footer */}
    </>
  );
}
