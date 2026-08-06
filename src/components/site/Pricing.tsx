import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "./Section";
import { WaitlistButton } from "./Waitlist";

const plans = [
  {
    name: "Starter",
    desc: "For 3-person teams getting off Excel",
    price: "₹499",
    unit: "/ user / month",
    features: [
      "Up to 5 users",
      "Contacts, pipeline & tasks",
      "1 WhatsApp Business number",
      "5 AI workflows",
      "Email support",
    ],
    cta: "Join waitlist",
  },
  {
    name: "Growth",
    desc: "For SMBs running sales on WhatsApp",
    price: "₹999",
    unit: "/ user / month",
    features: [
      "Unlimited users",
      "AI copilot & lead scoring",
      "Unlimited WhatsApp automations",
      "IndiaMART, Tally & Razorpay sync",
      "GST quotes & invoices",
      "Priority WhatsApp support",
    ],
    cta: "Join waitlist",
    popular: true,
  },
  {
    name: "Enterprise",
    desc: "For multi-branch and multi-brand teams",
    price: "Custom",
    unit: "",
    features: [
      "Multiple WhatsApp numbers",
      "Territory & round-robin routing",
      "Custom roles, SSO & audit logs",
      "Dedicated onboarding manager",
      "SLA guarantees",
    ],
    cta: "Talk to sales",
  },
];

export function Pricing({ bare = false }: { bare?: boolean }) {
  return (
    <Section id="pricing" className="bg-surface">
      {!bare && (
      <SectionHeader
        eyebrow="Pricing"
        title={
          <>
            Priced for Indian SMBs.{" "}
            <span className="font-display italic text-muted-foreground">Not enterprise budgets.</span>
          </>
        }
        description="Join the waitlist and get 3 seats free for 14 days when your invite lands. No setup fee, no implementation partner, cancel any time."
      />
      )}

      <div className={cn("grid gap-4 lg:grid-cols-3", !bare && "mt-12")}>
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "relative flex flex-col rounded-2xl border bg-card p-6",
              p.popular ? "border-accent shadow-[var(--shadow-card)]" : "border-border",
            )}
          >
            {p.popular && (
              <span className="absolute -top-2.5 left-6 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-accent-foreground">
                Most popular
              </span>
            )}
            <h3 className="text-[17px] font-semibold tracking-tight">{p.name}</h3>
            <p className="mt-1 text-[13.5px] text-muted-foreground">{p.desc}</p>
            <p className="mt-6 flex items-end gap-1.5">
              <span className="text-display text-[2.4rem]">{p.price}</span>
              <span className="pb-2 text-[13px] text-muted-foreground">{p.unit}</span>
            </p>
            <ul className="mt-6 flex-1 space-y-2.5">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[14px]">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  <span className="text-muted-foreground">{f}</span>
                </li>
              ))}
            </ul>
            <WaitlistButton
              className="mt-7 w-full rounded-lg"
              variant={p.popular ? "default" : "outline"}
            >
              {p.cta}
            </WaitlistButton>
          </div>
        ))}
      </div>
    </Section>
  );
}