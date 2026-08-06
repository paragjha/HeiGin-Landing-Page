import { Bot, BarChart3, Search, Focus, ShieldQuestion, Workflow, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, Eyebrow } from "./Section";

const features = [
  {
    icon: Bot,
    title: "AI Copilot everywhere",
    body: "Ask for today's hot leads, draft a WhatsApp reply in Hinglish, or log a call, from any screen, in plain language.",
  },
  {
    icon: BarChart3,
    title: "Lead scoring that explains itself",
    body: "Every lead gets a score and a reason (budget signals, reply speed, source quality) so a three-person team calls the right person first.",
  },
  {
    icon: Search,
    title: "Smart search",
    body: "\"Bengaluru leads from IndiaMART who never replied\": type it the way you'd say it and get the list instantly.",
  },
  {
    icon: Focus,
    title: "Conversation memory",
    body: "AI reads the entire WhatsApp and call history before it suggests anything, so follow-ups never repeat what you already said.",
  },
  {
    icon: ShieldQuestion,
    title: "India-first by design",
    body: "Rupee pipelines, GST invoices, Hindi and regional-language replies, DPDP-aligned data residency: not a US CRM with a currency toggle.",
  },
  {
    icon: Workflow,
    title: "WhatsApp automation",
    body: "Auto-reply to new enquiries in seconds, send catalogues, chase quotes, and nudge silent deals, all on the official Business API.",
  },
];

export function AiFeatures() {
  return (
    <Section id="ai" className="bg-surface">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <Eyebrow>AI-first workflows</Eyebrow>
          <h2 className="text-display mt-5 text-[clamp(2rem,4.2vw,3.1rem)]">
            AI that works your leads,{" "}
            <span className="font-display italic text-muted-foreground">not just stores them</span>
          </h2>
          <p className="mt-4 text-[17px] leading-relaxed text-muted-foreground">
            Most CRMs are databases you have to feed. Heigin replies to enquiries, scores leads,
            writes follow-ups and updates the pipeline on its own, so a team of three runs like a
            team of ten.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button className="rounded-lg">Explore AI workflows</Button>
            <Button variant="outline" className="rounded-lg bg-card">
              Talk to us
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sparkles className="size-4 text-accent" />
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
              heigin copilot
            </span>
          </div>
          <p className="mt-4 rounded-xl bg-surface-2 px-4 py-3 text-[14.5px]">
            Which WhatsApp leads went cold this week and what should I send them?
          </p>
          <div className="mt-4 space-y-2">
            {[
              { n: "Priya Menon", d: "No reply · 2 days · ₹1.4L quote" },
              { n: "Raj Nair", d: "Asked for demo · never booked" },
            ].map((p) => (
              <div
                key={p.n}
                className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-[13px]"
              >
                <span className="font-medium">{p.n}</span>
                <span className="text-muted-foreground">{p.d}</span>
              </div>
            ))}
            <div className="flex items-center justify-between rounded-lg bg-accent-soft px-3 py-2.5 text-[13px]">
              <span className="font-medium text-accent">Draft WhatsApp follow-ups</span>
              <span className="text-accent">2 ready to send</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-5">
            <f.icon className="size-[18px] text-accent" />
            <h3 className="mt-4 text-[16px] font-semibold tracking-tight">{f.title}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{f.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}