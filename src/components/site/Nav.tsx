import { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  Sparkles,
  MessageCircle,
  Workflow,
  Users,
  BarChart3,
  Phone,
  Plug,
  Receipt,
  Store,
  Building2,
  GraduationCap,
  Home,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { Logo } from "./Logo";
import { WaitlistButton } from "./Waitlist";

type Item = { icon: LucideIcon; title: string; desc: string; to?: string; soon?: boolean };

function SoonChip() {
  return (
    <span className="ml-2 inline-block shrink-0 rounded-full border border-border bg-surface-2 px-1.5 py-[1px] align-middle font-mono text-[9.5px] uppercase tracking-[0.12em] text-muted-foreground">
      Soon
    </span>
  );
}

type MenuDef = {
  label: string;
  href: string;
  groups: { heading: string; items: Item[] }[];
  card: { heading: string; title: string; desc: string };
};

const menus: MenuDef[] = [
  {
    label: "Product",
    href: "#platform",
    groups: [
      {
        heading: "Core CRM",
        items: [
          { icon: Users, title: "Contacts", desc: "One record per customer", to: "/contacts" },
          { icon: BarChart3, title: "Pipeline", desc: "Deals that move themselves", to: "/pipeline" },
          { icon: Phone, title: "Calls & Follow-ups", desc: "Never drop a lead again", to: "/calls" },
        ],
      },
      {
        heading: "AI & Automation",
        items: [
          { icon: Sparkles, title: "AI Copilot", desc: "Ask, draft, and act", to: "/ai-copilot" },
          { icon: MessageCircle, title: "WhatsApp Inbox", desc: "Shared team inbox", to: "/whatsapp-inbox", soon: true },
          { icon: Workflow, title: "Workflows", desc: "Automate the busywork", to: "/workflows" },
        ],
      },
      {
        heading: "India-first",
        items: [
          { icon: Receipt, title: "GST Invoicing", desc: "Quote to paid, in one flow", to: "/gst-invoicing", soon: true },
          { icon: Plug, title: "Integrations", desc: "IndiaMART, Tally, Razorpay", to: "/integrations", soon: true },
          { icon: Phone, title: "Telephony", desc: "Exotel, Knowlarity, Ozonetel", to: "/telephony", soon: true },
        ],
      },
    ],
    card: {
      heading: "Changelog",
      title: "WhatsApp flow builder",
      desc: "Build multi-step WhatsApp journeys without a developer.",
    },
  },
  {
    label: "Solutions",
    href: "#solutions",
    groups: [
      {
        heading: "By team size",
        items: [
          { icon: Rocket, title: "3-person teams", desc: "Live in an afternoon", to: "/solutions/three-person-teams" },
          { icon: Users, title: "Growing SMBs", desc: "10–100 seats, no chaos", to: "/solutions/growing-smbs" },
          { icon: Building2, title: "Multi-branch", desc: "Territories and roll-ups", to: "/solutions/multi-branch" },
        ],
      },
      {
        heading: "By industry",
        items: [
          { icon: Store, title: "Retail & D2C", desc: "Repeat buyers on WhatsApp", to: "/solutions/retail-d2c" },
          { icon: Home, title: "Real Estate", desc: "Site visits to bookings", to: "/solutions/real-estate" },
          { icon: GraduationCap, title: "Ed-tech & Coaching", desc: "Enquiry to enrolment", to: "/solutions/ed-tech" },
        ],
      },
    ],
    card: {
      heading: "Customer story",
      title: "Skyline Retail",
      desc: "4 salespeople, 2,300 WhatsApp leads a month, one pipeline.",
    },
  },
];

const plainLinks = [
  { label: "Pricing", href: "/pricing" },
  { label: "Blog", href: "/blog" },
];

function ItemLink({
  item,
  fallback,
  children,
}: {
  item: Item;
  fallback: string;
  children: React.ReactNode;
}) {
  const cls = "flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-surface";
  if (item.to) {
    return (
      <Link to={item.to as never} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <a href={fallback} className={cls}>
      {children}
    </a>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const activeMenu = menus.find((m) => m.label === menu) ?? null;

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl"
      onMouseLeave={() => setMenu(null)}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link to="/">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {menus.map((m) => (
            <a
              key={m.label}
              href={m.href}
              onMouseEnter={() => setMenu(m.label)}
              onFocus={() => setMenu(m.label)}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-sm transition-colors",
                menu === m.label
                  ? "border-border bg-surface text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
              <ChevronDown
                className={cn(
                  "size-3.5 opacity-70 transition-transform",
                  menu === m.label && "rotate-180",
                )}
              />
            </a>
          ))}
          {plainLinks.map((l) => (
            <Link
              key={l.label}
              to={l.href as never}
              onMouseEnter={() => setMenu(null)}
              className="inline-flex items-center rounded-lg px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <WaitlistButton size="sm" className="rounded-lg" />
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button aria-label="Toggle menu" onClick={() => setOpen((v) => !v)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {activeMenu && (
        <div className="absolute inset-x-0 top-full hidden border-b border-border bg-background md:block">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-9 lg:grid-cols-[1fr_320px]">
            <div className="grid gap-8 sm:grid-cols-3">
              {activeMenu.groups.map((g) => (
                <div key={g.heading}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {g.heading}
                  </p>
                  <ul className="mt-4 space-y-1">
                    {g.items.map((it) => (
                      <li key={it.title}>
                        <ItemLink item={it} fallback={activeMenu.href}>
                          <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-md border border-dashed border-border text-muted-foreground">
                            <it.icon className="size-4" />
                          </span>
                          <span>
                            <span className="block text-[14px] font-medium">
                              {it.title}
                              {it.soon && <SoonChip />}
                            </span>
                            <span className="block text-[12.5px] text-muted-foreground">
                              {it.desc}
                            </span>
                          </span>
                        </ItemLink>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {activeMenu.card.heading}
              </p>
              <div className="mt-4 rounded-xl border border-border bg-surface p-4">
                <div className="relative h-28 overflow-hidden rounded-lg border border-border bg-card">
                  <div className="flex gap-1.5 border-b border-border px-3 py-2">
                    {["bg-muted-foreground/30", "bg-muted-foreground/30", "bg-muted-foreground/30"].map(
                      (c, i) => (
                        <span key={i} className={cn("size-2 rounded-full", c)} />
                      ),
                    )}
                  </div>
                  <div className="absolute right-3 top-6 h-20 w-40 rounded-lg border border-border bg-background shadow-[var(--shadow-card)]" />
                </div>
                <p className="mt-3 text-[14px] font-medium">{activeMenu.card.title}</p>
                <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                  {activeMenu.card.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="border-t border-border bg-background px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {menus.flatMap((m) => m.groups.flatMap((g) => g.items)).map((it) =>
              it.to ? (
                <Link
                  key={it.title}
                  to={it.to as never}
                  onClick={() => setOpen(false)}
                  className="text-sm text-muted-foreground"
                >
                  {it.title}
                  {it.soon && <SoonChip />}
                </Link>
              ) : null,
            )}
            {plainLinks.map((l) => (
              <Link
                key={l.label}
                to={l.href as never}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground"
              >
                {l.label}
              </Link>
            ))}
            <WaitlistButton size="sm" className="rounded-lg" />
          </div>
        </div>
      )}
    </header>
  );
}