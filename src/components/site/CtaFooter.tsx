import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Logo } from "./Logo";
import { WaitlistButton } from "./Waitlist";

function LinkOrAnchor({ to, children }: { to?: string | undefined; children: ReactNode }) {
  const cls = "text-[14px] text-muted-foreground hover:text-foreground";
  if (to) {
    return (
      <Link to={to as never} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href="#top" className={cls}>
      {children}
    </a>
  );
}

const routeFor: Record<string, string> = {
  Contacts: "/contacts",
  Pipeline: "/pipeline",
  "WhatsApp Inbox": "/whatsapp-inbox",
  "AI Copilot": "/ai-copilot",
  "GST Invoicing": "/gst-invoicing",
  Pricing: "/pricing",
  Integrations: "/integrations",
  "Retail & D2C": "/solutions/retail-d2c",
  "Real Estate": "/solutions/real-estate",
  Manufacturing: "/solutions/growing-smbs",
  "Ed-tech": "/solutions/ed-tech",
  "Multi-branch": "/solutions/multi-branch",
  Blog: "/blog",
};

const columns = [
  {
    title: "Product",
    links: ["Contacts", "Pipeline", "WhatsApp Inbox", "AI Copilot", "Integrations", "GST Invoicing", "Pricing"],
  },
  {
    title: "Solutions",
    links: ["Retail & D2C", "Real Estate", "Manufacturing", "Ed-tech", "Multi-branch"],
  },
  { title: "Resources", links: ["Blog", "Documentation", "API Reference", "Help Center", "Status"] },
  { title: "Company", links: ["About", "Careers", "Contact", "Privacy", "Terms"] },
];

export function CtaFooter() {
  return (
    <>
      <section className="border-t border-border/70 py-24">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <h2 className="text-display text-[clamp(2.2rem,5vw,3.6rem)]">
            Ready to close more{" "}
            <span className="font-display italic text-muted-foreground">on WhatsApp?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[17px] leading-relaxed text-muted-foreground">
            1,200+ Indian SMBs are already on the Heigin waitlist. Early access rolls out weekly —
            three seats free when your invite lands.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <WaitlistButton size="lg" className="rounded-lg px-6" />
          </div>
        </div>
      </section>

      <footer className="border-t border-border/70 bg-surface py-14">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
            <div>
              <Logo />
              <p className="mt-4 max-w-xs text-[14px] leading-relaxed text-muted-foreground">
                The India-first, AI-first CRM for SMBs — with WhatsApp automation built in.
              </p>
              <a
                href="mailto:heiginofficial@gmail.com"
                className="mt-3 inline-block font-mono text-[12.5px] text-accent"
              >
                heiginofficial@gmail.com
              </a>
            </div>
            {columns.map((c) => (
              <div key={c.title}>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  {c.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.links.map((l) => (
                    <li key={l}>
                      <LinkOrAnchor to={routeFor[l]}>
                        {l}
                        {(l === "GST Invoicing" || l === "WhatsApp Inbox" || l === "Integrations") && (
                          <span className="ml-1.5 rounded bg-warning-soft px-1.5 py-0.5 text-[10px] text-warning">
                            Soon
                          </span>
                        )}
                      </LinkOrAnchor>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t border-border pt-6 text-[13px] text-muted-foreground">
            © 2025 Heigin. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}