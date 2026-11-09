import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@heigin/ui";
import { cta, mainNav, site, type NavGroup, type NavItem } from "@/lib/site";
import { track } from "@/lib/analytics";
import { CtaLink } from "./cta";
import { Logo, LogoMark } from "./logo";
import { cn } from "@/lib/utils";

function isGroup(item: NavGroup | NavItem): item is NavGroup {
  return "items" in item;
}

function panelWidth(group: NavGroup): number {
  if (group.feature) return 560;
  if (group.items.length > 1) return 420;
  return 260;
}

/**
 * Desktop primary nav. Owns a single animated dropdown container that morphs
 * between groups instead of unmounting + remounting. When the pointer slides
 * from Product to Solutions, the container's width, position and content
 * change in place with a spring transition — no close/open flicker.
 *
 * A short grace timeout on mouseleave lets the pointer travel from a trigger
 * into the panel (or vice versa) without snapping shut.
 */
function DesktopPrimaryNav() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const rowRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [panelLeft, setPanelLeft] = useState(0);

  // Position the panel under the hovered trigger whenever it changes. Reads
  // layout synchronously so the first frame of the transition doesn't flash
  // at the old position.
  useLayoutEffect(() => {
    if (openIndex === null) return;
    const trigger = triggerRefs.current[openIndex];
    const row = rowRef.current;
    if (!trigger || !row) return;
    const tr = trigger.getBoundingClientRect();
    const rr = row.getBoundingClientRect();
    setPanelLeft(tr.left - rr.left);
  }, [openIndex]);

  // Escape key closes any open panel.
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIndex(null);
        triggerRefs.current[openIndex]?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex]);

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setOpenIndex(null), 140);
  };
  const cancelClose = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openGroup = openIndex !== null && isGroup(mainNav[openIndex]!) ? (mainNav[openIndex] as NavGroup) : null;

  return (
    <div
      ref={rowRef}
      className="relative hidden lg:block"
      onMouseLeave={scheduleClose}
      onMouseEnter={cancelClose}
    >
      <nav aria-label="Primary" className="flex items-center gap-0.5">
        {mainNav.map((item, i) =>
          isGroup(item) ? (
            <button
              key={item.label}
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              aria-expanded={openIndex === i}
              aria-haspopup="true"
              onMouseEnter={() => { cancelClose(); setOpenIndex(i); }}
              onFocus={() => { cancelClose(); setOpenIndex(i); }}
              onClick={() => setOpenIndex((v) => (v === i ? null : i))}
              className="inline-flex items-center gap-1 rounded-md px-3 py-1.5 text-nav font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              {item.label}
              <ChevronDown
                size={14}
                strokeWidth={1.8}
                aria-hidden="true"
                className={cn("transition-transform", openIndex === i && "rotate-180")}
              />
            </button>
          ) : (
            <Link
              key={item.label}
              to={item.to}
              onMouseEnter={() => setOpenIndex(null)}
              className="rounded-md px-3 py-1.5 text-nav font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground [&.active]:text-foreground"
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      <AnimatePresence>
        {openGroup && (
          <motion.div
            key="nav-panel"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0, x: panelLeft, width: panelWidth(openGroup) }}
            exit={{ opacity: 0, y: -6, transition: { duration: 0.14 } }}
            transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
            className="absolute top-full left-0 z-40 pt-2 motion-reduce:transition-none"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <motion.div
              layout="size"
              transition={{ type: "spring", stiffness: 420, damping: 36, mass: 0.6 }}
              className="overflow-hidden rounded-xl border border-border bg-popover p-2 shadow-[var(--hg-shadow-popover)]"
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4, position: "absolute" }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                >
                  <NavPanelContent group={openGroup} onClose={() => setOpenIndex(null)} />
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function NavPanelContent({ group, onClose }: { group: NavGroup; onClose: () => void }) {
  const hasFeature = Boolean(group.feature);
  return (
    <div
      className={cn(
        "grid gap-2",
        hasFeature ? "grid-cols-[0.95fr_1fr]" : group.items.length > 1 ? "grid-cols-2" : "grid-cols-1"
      )}
    >
      {group.feature && <NavFeatureTile feature={group.feature} onClose={onClose} />}
      <ul className={cn("flex flex-col gap-1", hasFeature && "self-stretch")}>
        {group.items.map((item) => (
          <li key={item.to} className="flex">
            <Link
              to={item.to}
              onClick={onClose}
              className="group/nav-item flex w-full flex-col justify-center rounded-md px-3 py-2.5 transition-colors hover:bg-accent"
            >
              <span className="flex items-center gap-1.5 text-md font-medium text-foreground">
                {item.label}
                <ArrowRight
                  size={12}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="translate-x-0 opacity-0 transition-all group-hover/nav-item:translate-x-0.5 group-hover/nav-item:opacity-70"
                />
              </span>
              {item.description && (
                <span className="mt-0.5 block text-sm leading-snug text-muted-foreground">{item.description}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NavFeatureTile({ feature, onClose }: { feature: NonNullable<NavGroup["feature"]>; onClose: () => void }) {
  return (
    <Link
      to={feature.to}
      onClick={onClose}
      className="group/feature relative flex h-full flex-col justify-between overflow-hidden rounded-md p-5 text-background no-underline transition-transform"
    >
      {/* Painterly backdrop keeps the site's visual language inside the nav panel. */}
      <img
        src="/images/hero-landscape.webp"
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-foreground/70 via-foreground/55 to-foreground/75" />
      <div className="relative flex items-center gap-2">
        <LogoMark className="size-6 text-background" />
        <span className="text-xs font-semibold uppercase tracking-[0.1em] text-background/80">{feature.eyebrow}</span>
      </div>
      <div className="relative">
        <p className="text-lg font-semibold leading-snug text-background">{feature.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-background/80">{feature.body}</p>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-background">
          {feature.cta}
          <ArrowRight size={13} strokeWidth={1.8} aria-hidden="true" className="transition-transform group-hover/feature:translate-x-0.5" />
        </p>
      </div>
    </Link>
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
    <header className="border-b border-border bg-background/85 backdrop-blur-md [view-transition-name:site-header]">
      <div className="container-site flex h-14 items-center justify-between gap-4">
        <Link to="/" aria-label="HeiGin home" className="shrink-0">
          <Logo />
        </Link>

        <DesktopPrimaryNav />

        <div className="hidden items-center gap-2 lg:flex">
          {site.appUrl && (
            <Button variant="ghost" size="sm" onClick={() => window.open(site.appUrl, "_blank", "noopener")}>
              Sign in
            </Button>
          )}
          <CtaLink to={cta.earlyAccess.to} onClick={() => track("cta_early_access_clicked", { location: "header" })}>
            <Button variant="primary" size="sm" touch={false}>
              {cta.earlyAccess.label}
            </Button>
          </CtaLink>
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
              <CtaLink to={cta.earlyAccess.to}>
                <Button variant="primary" fullWidth>
                  {cta.earlyAccess.label}
                </Button>
              </CtaLink>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
