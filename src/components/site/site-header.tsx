import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@heigin/ui";
import { cta, mainNav, site, type NavGroup, type NavItem } from "@/lib/site";
import { track } from "@/lib/analytics";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

function isGroup(item: NavGroup | NavItem): item is NavGroup {
  return "items" in item;
}

function NavLink({ item, onNavigate }: { item: NavItem; onNavigate?: () => void }) {
  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className="rounded-md px-3 py-1.5 text-nav font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:text-foreground"
    >
      {item.label}
    </Link>
  );
}

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  const scheduleClose = () => {
    timeout.current = setTimeout(() => setOpen(false), 120);
  };
  const cancelClose = () => {
    if (timeout.current) clearTimeout(timeout.current);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={() => { cancelClose(); setOpen(true); }} onMouseLeave={scheduleClose}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-nav font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
      >
        {group.label}
        <ChevronDown size={14} strokeWidth={1.8} aria-hidden="true" className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute left-0 top-full pt-1.5">
          <div className="w-64 rounded-lg border border-border bg-popover p-1.5 shadow-[var(--hg-shadow-popover)]">
            {group.items.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2 transition-colors hover:bg-accent"
              >
                <span className="block text-md font-medium text-foreground">{item.label}</span>
                {item.description && (
                  <span className="mt-0.5 block text-sm text-muted-foreground">{item.description}</span>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-[var(--hg-z-header)] border-b border-border bg-background/85 backdrop-blur-md">
      <div className="container-site flex h-14 items-center justify-between gap-4">
        <Link to="/" aria-label="HeiGin home" className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 lg:flex">
          {mainNav.map((item) =>
            isGroup(item) ? <NavDropdown key={item.label} group={item} /> : <NavLink key={item.label} item={item} />
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          {site.appUrl && (
            <Button variant="ghost" size="sm" onClick={() => window.open(site.appUrl, "_blank", "noopener")}>
              Sign in
            </Button>
          )}
          <Link to={cta.earlyAccess.to} onClick={() => track("cta_early_access_clicked", { location: "header" })}>
            <Button variant="primary" size="sm" touch={false}>
              {cta.earlyAccess.label}
            </Button>
          </Link>
        </div>

        <button
          type="button"
          className="flex size-9 items-center justify-center rounded-md text-foreground transition-colors hover:bg-accent lg:hidden"
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} strokeWidth={1.8} /> : <Menu size={20} strokeWidth={1.8} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="container-site max-h-[calc(100dvh-3.5rem)] overflow-y-auto py-4">
            {mainNav.map((item) =>
              isGroup(item) ? (
                <div key={item.label} className="py-2">
                  <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-faint">{item.label}</p>
                  {item.items.map((child) => (
                    <Link
                      key={child.to}
                      to={child.to}
                      className="block rounded-md px-3 py-2.5 text-lg font-medium text-foreground hover:bg-accent"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className="block rounded-md px-3 py-2.5 text-lg font-medium text-foreground hover:bg-accent"
                >
                  {item.label}
                </Link>
              )
            )}
            <div className="mt-3 border-t border-border pt-4">
              <Link to={cta.earlyAccess.to}>
                <Button variant="primary" fullWidth>
                  {cta.earlyAccess.label}
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
