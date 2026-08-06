import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Nav } from "./Nav";
import { CtaFooter } from "./CtaFooter";
import { Frame, HatchDivider, Container } from "./Rails";
import { WaitlistButton } from "./Waitlist";
import { MockWindow } from "./MockWindow";
import type { Feature } from "@/content/features";

export function FeaturePage({ feature }: { feature: Feature }) {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <section className="py-20 md:py-28">
            <Container className="max-w-3xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {feature.eyebrow}
                {feature.soon && (
                  <span className="rounded bg-warning-soft px-1.5 py-0.5 text-[10px] normal-case tracking-normal text-warning">
                    Soon
                  </span>
                )}
              </span>
              <h1 className="text-display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
                {feature.h1}{" "}
                <span className="font-display italic text-muted-foreground">
                  {feature.h1Italic}
                </span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                {feature.sub}
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <WaitlistButton size="lg" className="rounded-lg px-6" />
                <Button size="lg" variant="outline" className="rounded-lg bg-card px-6" asChild>
                  <Link to="/pricing">See pricing</Link>
                </Button>
              </div>
            </Container>

            <Container className="mt-14">
              <MockWindow
                title={feature.eyebrow}
                subtitle="Heigin workspace"
                stats={[
                  { label: "This week", value: "146", hint: "New records" },
                  { label: "Automated", value: "82%", hint: "Handled by AI" },
                  { label: "Avg. response", value: "2m 14s", hint: "↓ 38%" },
                ]}
                columns={["Item", "Detail", "Owner", "Status"]}
                rows={[
                  {
                    a: feature.capabilities[0]?.title ?? "Record",
                    b: "Skyline Retail",
                    c: "S. Rao",
                    d: "Done",
                    tone: "ok",
                  },
                  {
                    a: feature.capabilities[1]?.title ?? "Record",
                    b: "Verde Tech",
                    c: "A. Mehta",
                    d: "Due today",
                    tone: "warn",
                  },
                  {
                    a: feature.capabilities[2]?.title ?? "Record",
                    b: "Orbit Labs",
                    c: "Unassigned",
                    d: "Overdue",
                    tone: "err",
                  },
                ]}
              />
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-20">
            <Container className="max-w-3xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                The problem
              </p>
              <p className="mt-4 text-[clamp(1.15rem,2.2vw,1.5rem)] leading-relaxed">
                {feature.problem}
              </p>
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-24">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                What it does
              </p>
              <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {feature.capabilities.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-border bg-card p-5">
                    <Check className="size-[18px] text-accent" />
                    <h2 className="mt-4 text-[16px] font-semibold tracking-tight">{c.title}</h2>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {c.body}
                    </p>
                  </div>
                ))}
              </div>
            </Container>
          </section>

          <HatchDivider />

          <section className="py-16 md:py-24">
            <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  Questions
                </p>
                <h2 className="text-display mt-4 text-[clamp(1.8rem,3.4vw,2.5rem)]">
                  Answers before{" "}
                  <span className="font-display italic text-muted-foreground">you ask</span>
                </h2>
              </div>
              <dl className="divide-y divide-border border-y border-border">
                {feature.faq.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="text-[15.5px] font-medium">{f.q}</dt>
                    <dd className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {f.a}
                    </dd>
                  </div>
                ))}
              </dl>
            </Container>
          </section>

          <section className="border-t border-border/70 py-14">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Related
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {feature.related.map((r) => (
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