import { FileText, Layers, Mail, MessageSquare, Sparkles, Database, User } from "lucide-react";
import { Eyebrow } from "./section";
import { Reveal } from "./reveal";
import { LogoMark } from "./logo";

const steps = [
  { icon: Mail, name: "Your tools", description: "Email, WhatsApp, meetings and documents." },
  { icon: Layers, name: "One timeline", description: "Every record keeps the full story of the relationship." },
  { icon: Sparkles, name: "Agents read it", description: "They notice what is slipping and why." },
] as const;

const inputs = [
  { icon: Mail, name: "Tools", description: "Email, meetings, docs", y: 20 },
  { icon: Database, name: "CRM updates", description: "Contacts, deals, activity", y: 50 },
  { icon: MessageSquare, name: "Messages", description: "WhatsApp, team chats", y: 80 },
] as const;

const outputs = [
  { icon: Layers, name: "One customer timeline", description: "All signals in one place", y: 20 },
  { icon: FileText, name: "Next step drafted", description: "Personalised follow-ups", y: 50 },
  { icon: User, name: "You approve", description: "Keep control with human oversight", y: 80 },
] as const;

// SVG coordinate space: 100 x 100; cards occupy x 0–30 and 70–100, hub at 50,50.
const leftPath = (y: number) => `M 35 ${y} C 42 ${y}, 39 50, 45 50`;
const rightPath = (y: number) => `M 55 50 C 61 50, 58 ${y}, 65 ${y}`;

function NodeCard({ icon: Icon, name, description }: { icon: typeof Mail; name: string; description: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-night-border bg-night-surface px-4 py-3.5">
      <Icon size={20} strokeWidth={1.6} className="shrink-0 text-night-foreground" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-sm font-medium text-night-foreground">{name}</p>
        <p className="mt-0.5 text-xs leading-snug text-night-muted">{description}</p>
      </div>
    </div>
  );
}

/** Universal Context — inputs flow into HeiGin, which produces the timeline, drafts and approvals. */
export function UniversalContext() {
  return (
    <section className="border-y border-night-border bg-night text-night-foreground">
      <div className="container-site py-20 md:py-28">
        <div className="grid items-center gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <Eyebrow dark>Universal context</Eyebrow>
            <h2 className="mt-3 text-headline text-night-foreground">Every tool you use feeds one customer story.</h2>
            <p className="mt-4 max-w-xl text-subhead text-night-muted">
              Email, WhatsApp, meetings and documents each hold a fragment of every relationship. HeiGin brings them
              onto one timeline: what the agents read, what you approve against, and what the CRM learns from.
            </p>
            <ul className="mt-8 space-y-4">
              {steps.map((s, i) => (
                <li key={s.name} className="flex items-start gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-night-border bg-night-surface">
                    <s.icon className="size-4 text-night-foreground" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-md font-medium text-night-foreground">
                      <span className="mr-2 text-sm text-night-muted">0{i + 1}</span>
                      {s.name}
                    </p>
                    <p className="mt-0.5 text-sm text-night-muted">{s.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            {/* Flow diagram — desktop */}
            <div className="relative hidden aspect-[16/10] w-full md:block">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden="true">
                {[...inputs.map((n) => leftPath(n.y)), ...outputs.map((n) => rightPath(n.y))].map((d, i) => (
                  <g key={i}>
                    <path d={d} fill="none" className="stroke-night-border" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                    <path d={d} fill="none" className="stroke-info" strokeWidth="1.25" vectorEffect="non-scaling-stroke" strokeDasharray="6 200" opacity="0.9">
                      <animate attributeName="stroke-dashoffset" from="6" to="-200" dur="3.2s" begin={`${i * 0.4}s`} repeatCount="indefinite" />
                    </path>
                  </g>
                ))}
              </svg>
              {inputs.map((n) => (
                <div key={n.name} className="absolute left-0 w-[34%] -translate-y-1/2" style={{ top: `${n.y}%` }}>
                  <NodeCard {...n} />
                </div>
              ))}
              {outputs.map((n) => (
                <div key={n.name} className="absolute right-0 w-[34%] -translate-y-1/2" style={{ top: `${n.y}%` }}>
                  <NodeCard {...n} />
                </div>
              ))}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <LogoMark inverted className="size-16 rounded-2xl shadow-float" />
              </div>
            </div>

            {/* Stacked — small screens */}
            <div className="space-y-3 md:hidden">
              {inputs.map((n) => <NodeCard key={n.name} {...n} />)}
              <div className="flex justify-center py-2">
                <LogoMark inverted className="size-12 rounded-xl" />
              </div>
              {outputs.map((n) => <NodeCard key={n.name} {...n} />)}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
