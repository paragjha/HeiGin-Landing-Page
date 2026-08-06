import { Section, SectionHeader } from "./Section";

const steps = [
  {
    n: "Step 01",
    t: "Import your contacts",
    b: "Drop in an Excel sheet, sync IndiaMART, or forward your existing WhatsApp chats. Heigin de-duplicates and maps the fields for you.",
  },
  {
    n: "Step 02",
    t: "Connect WhatsApp & calls",
    b: "Link your WhatsApp Business number and telephony provider. Every enquiry, missed call, and reply lands in the shared inbox automatically.",
  },
  {
    n: "Step 03",
    t: "Switch on AI workflows",
    b: "Turn on instant replies, follow-up nudges, and lead scoring. Even a three-person team is selling on day one, no consultant needed.",
  },
];

export function Rollout() {
  return (
    <Section className="bg-surface">
      <SectionHeader
        eyebrow="Get Started"
        title={
          <>
            Live this afternoon,{" "}
            <span className="font-display italic text-muted-foreground">in</span> three steps
          </>
        }
        description="Most teams send their first automated WhatsApp follow-up within an hour. No implementation fee, no consultants."
      />
      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-border bg-card p-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{s.n}</span>
            <h3 className="mt-3 text-[18px] font-semibold tracking-tight">{s.t}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{s.b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}