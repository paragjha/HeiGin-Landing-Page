import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";
import { CtaFooter } from "./CtaFooter";
import { Frame, HatchDivider, Container } from "./Rails";
import { MockWindow } from "./MockWindow";
import { WaitlistButton } from "./Waitlist";
import type { Solution } from "@/content/solutions";

export function SolutionPage({ solution }: { solution: Solution }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <section className="py-20 md:py-24">
            <Container className="max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {solution.eyebrow}
              </span>
              <h1 className="text-display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
                {solution.h1}{" "}
                <span className="font-display italic text-muted-foreground">{solution.h1Italic}</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                {solution.sub}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WaitlistButton size="lg" className="rounded-lg px-6" />
                <Button size="lg" variant="outline" className="rounded-lg bg-card px-6" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
              </div>
            </Container>

            <Container className="mt-14">
              <MockWindow {...solution.mock} />
            </Container>
          </section>

          <HatchDivider />

          <section className="py-14">
            <Container className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
              {solution.stats.map((s) => (
                <div key={s.label} className="bg-card px-6 py-7 text-center">
                  <p className="text-display text-[2rem]">{s.value}</p>
                  <p className="mt-1 text-[13.5px] text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-20">
            <Container className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                The problem
              </p>
              <p className="mt-4 text-[clamp(1.15rem,2.2vw,1.5rem)] leading-relaxed">
                {solution.problem}
              </p>
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-24">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                What changes
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                {solution.outcomes.map((o) => (
                  <div key={o.title} className="rounded-2xl border border-border bg-card p-5">
                    <Check className="size-[18px] text-accent" />
                    <h2 className="mt-4 text-[16px] font-semibold tracking-tight">{o.title}</h2>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {o.body}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-24">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                How it runs
              </p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
                {solution.workflow.map((w) => (
                  <div key={w.step} className="bg-card p-6">
                    <span className="font-mono text-[11px] text-muted-foreground">{w.step}</span>
                    <h3 className="mt-3 text-[18px] font-semibold tracking-tight">{w.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {w.body}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          <HatchDivider />

          <section className="py-20">
            <Container className="max-w-3xl text-center">
              <p className="text-display text-[clamp(1.5rem,3vw,2.1rem)] leading-snug">
                &ldquo;{solution.quote.text}&rdquo;
              </p>
              <p className="mt-6 text-[14px] font-medium">{solution.quote.name}</p>
              <p className="text-[13.5px] text-muted-foreground">{solution.quote.role}</p>
            </Container>
          </section>

          <section className="border-t border-border/70 py-14">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Related
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {solution.related.map((r) => (
                  <Link
                    key={r.to}
                    to={r.to as never}
                    className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] transition-colors hover:bg-surface"
                  >
                    {r.label}
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                ))}
              </div>
            </Container>
          </section>

          <HatchDivider />
          <CtaFooter />
        </Frame>
      </main>
    </div>
  );
}
