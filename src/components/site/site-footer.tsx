import { Link } from "@tanstack/react-router";
import { footerNav, cta } from "@/lib/site";
import { Logo } from "./logo";
import { Reveal } from "./reveal";
import { AppFrame } from "./app-frame";
import dashboardShot from "@/assets/app-dashboard.png.asset.json";

/** Footer: brand-blue closing band with the product peeking out, then the link card. */
export function SiteFooter() {
  return (
    <footer>
      {/* Final CTA band */}
      <section className="overflow-hidden bg-gradient-to-br from-primary via-info to-primary">
        <div className="container-site pt-20 text-center md:pt-28">
          <Reveal>
            <h2 className="mx-auto max-w-2xl text-[clamp(2rem,1.3rem+3vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em] text-primary-foreground">
              Give every customer relationship a next step.
            </h2>
            <div className="mt-8 flex justify-center">
              <Link
                to={cta.earlyAccess.to}
                className="rounded-lg bg-background px-5 py-2.5 text-lg font-medium text-foreground shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {cta.earlyAccess.label}
              </Link>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <AppFrame
              shot={dashboardShot}
              alt="HeiGin dashboard showing open pipeline, win rate, lead sources and recently updated deals"
              className="mx-auto mt-14 max-w-4xl translate-y-10 shadow-2xl md:translate-y-16"
            />
          </Reveal>
        </div>
      </section>

      {/* Link card */}
      <div className="container-site pb-6 pt-24 md:pt-32">
        <Reveal>
          <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm md:p-10">
            <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(4,1fr)]">
              <div>
                <Logo />
                <p className="mt-3 max-w-60 text-md leading-relaxed text-muted-foreground">
                  The agentic CRM — customer relationships that never slip through the cracks.
                </p>
              </div>
              {footerNav.map((group) => (
                <nav key={group.label} aria-label={`Footer: ${group.label}`}>
                  <p className="text-md font-semibold text-foreground">{group.label}</p>
                  <ul className="mt-3 space-y-2">
                    {group.items.map((item) => (
                      <li key={item.to}>
                        <Link to={item.to} className="text-md text-muted-foreground transition-colors hover:text-foreground">
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-2 border-t border-border pt-5 text-sm text-muted-foreground sm:flex-row sm:justify-between">
              <p>© {new Date().getFullYear()} HeiGin. All rights reserved.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </footer>
  );
}
