import { useState } from "react";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "./Section";

const byRole = [
  { t: "Founder / Owner", b: "See every lead, quote, and rupee of pipeline in one view, without asking anyone for an update." },
  { t: "Sales Rep", b: "Your day, planned: who to call, what to send on WhatsApp, and which deals go cold tomorrow." },
  { t: "3-person Team", b: "No admin, no consultant, no ops hire. Import your contacts, connect WhatsApp, and start selling the same day." },
  { t: "Agency & Reseller", b: "Run multiple client pipelines, shared inboxes, and branded WhatsApp templates from one workspace." },
];

const byIndustry = [
  { t: "Retail & D2C", b: "Turn WhatsApp enquiries into repeat buyers with catalogues, offers, and automated re-order nudges." },
  { t: "Real Estate", b: "Capture portal leads, schedule site visits, and keep every broker's follow-ups on the same board." },
  { t: "Manufacturing & Exports", b: "IndiaMART enquiries to GST quotations to payment: one pipeline, no spreadsheet handoffs." },
  { t: "Ed-tech & Coaching", b: "Enquiry to counselling call to enrolment, with reminders going out on WhatsApp automatically." },
];

export function Solutions() {
  const [tab, setTab] = useState<"role" | "industry">("role");
  const items = tab === "role" ? byRole : byIndustry;

  return (
    <Section id="solutions">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeader
          eyebrow="Solutions"
          title={
            <>
              Built for small teams{" "}
              <span className="font-display italic text-muted-foreground">across</span> Indian business
            </>
          }
          description="Whether you're two founders selling on WhatsApp or a 40-person sales floor, Heigin is shaped around how Indian SMBs actually sell."
        />
        <div className="inline-flex rounded-lg border border-border bg-surface p-1">
          {(["role", "industry"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={cn(
                "rounded-md px-4 py-1.5 text-[13.5px] transition-colors",
                tab === k
                  ? "bg-card font-medium text-foreground shadow-[var(--shadow-card)]"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              By {k === "role" ? "Role" : "Industry"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {items.map((i, idx) => (
          <div key={i.t} className="bg-card p-6">
            <span className="font-mono text-[11px] text-muted-foreground">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-3 text-[18px] font-semibold tracking-tight">{i.t}</h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">{i.b}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}