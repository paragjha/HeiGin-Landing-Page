import { Link } from "@tanstack/react-router";
import { Button } from "@heigin/ui";
import { footerNav, site } from "@/lib/site";
import { Logo } from "./logo";

/**
 * Footer. Multi-column link grid with a quiet closing block; the final CTA
 * banner now lives on the homepage, so the footer is reference-only chrome:
 * brand on the left, 4 nav columns, a huge watermark at the bottom.
 */
export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-site py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Logo />
            <p className="mt-4 max-w-60 text-md leading-relaxed text-muted-foreground">
              The agentic CRM: customer relationships that never slip through the cracks.
            </p>
            <a
              href={site.productHunt.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block"
            >
              <img
                src={site.productHunt.badge}
                alt={site.productHunt.alt}
                width={210}
                height={46}
                loading="lazy"
              />
            </a>
            <div className="mt-6">
              <Link to="/contact">
                <Button variant="secondary" size="sm">
                  Talk to us
                </Button>
              </Link>
            </div>
          </div>
          {footerNav.map((group) => (
            <nav key={group.label} aria-label={`Footer: ${group.label}`}>
              <p className="text-sm font-semibold text-foreground">{group.label}</p>
              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} HeiGin. All rights reserved.</p>
          <p className="text-xs text-faint">
            Pilot controls are confirmed per team. Status labels on this site are accurate as of today.
          </p>
        </div>

        {/* Oversized wordmark watermark, same move as the reference footer. */}
        <div
          aria-hidden="true"
          className="mt-10 overflow-hidden"
        >
          <span className="block select-none text-center font-semibold leading-none tracking-[-0.06em] text-foreground/5 [font-size:clamp(5rem,16vw,15rem)]">
            HeiGin
          </span>
        </div>
      </div>
    </footer>
  );
}
