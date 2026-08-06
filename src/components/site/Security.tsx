import { Section, SectionHeader } from "./Section";

const controls = [
  { t: "Data stays in India", b: "Customer records, chats, and invoices are stored on Indian infrastructure, aligned with DPDP expectations." },
  { t: "Official WhatsApp API", b: "No unofficial hacks or shared numbers: your business number, your templates, your sender reputation." },
  { t: "Lead ownership rules", b: "Assign territories and round-robin routing so two reps never call the same enquiry twice." },
  { t: "Export & contact locking", b: "Control who can export contact lists or view phone numbers, so your database leaves with you, not with a rep." },
  { t: "Role-based visibility", b: "Owners see everything; reps see their own pipeline. Configure it in a minute, not a workshop." },
  { t: "Full activity trail", b: "Every call, message, stage change, and discount is logged against the contact, auditable at any time." },
];

const stats = [
  { v: "1,200+", l: "Indian SMBs selling on Heigin" },
  { v: "2m 14s", l: "Average WhatsApp reply time" },
  { v: "38%", l: "Faster deal close time" },
  { v: "99.95%", l: "Platform uptime" },
];

export function Security() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Trust & Controls"
        title={
          <>
            Your customer data,{" "}
            <span className="font-display italic text-muted-foreground">under your control</span>
          </>
        }
        description="India-hosted data, the official WhatsApp Business API, and clear ownership rules, so your contact list stays yours."
      />

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {controls.map((c) => (
          <div key={c.t} className="rounded-xl border border-border bg-card p-5">
            <h3 className="text-[15.5px] font-semibold tracking-tight">{c.t}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{c.b}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 grid gap-8 rounded-2xl border border-border bg-surface p-8 lg:grid-cols-[1.1fr_1fr] lg:items-center">
        <div className="grid grid-cols-2 gap-6">
          {stats.map((s) => (
            <div key={s.l}>
              <p className="text-display text-[clamp(1.9rem,3.5vw,2.6rem)]">{s.v}</p>
              <p className="mt-1 text-[13.5px] text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
        <figure className="rounded-2xl border border-border bg-card p-6">
          <blockquote className="font-display text-[20px] leading-snug">
            "We ran sales out of three WhatsApp phones and one Excel file. Heigin gave four of us a
            single inbox and pipeline, enquiries now get answered in minutes."
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-full bg-surface-2 text-[12px] font-medium text-muted-foreground">
              MD
            </span>
            <span className="text-[13.5px]">
              <span className="block font-medium">Meera Desai</span>
              <span className="text-muted-foreground">Co-founder, Skyline Retail · Pune</span>
            </span>
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}