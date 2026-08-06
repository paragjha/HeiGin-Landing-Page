import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Frame, HatchDivider, Container } from "@/components/site/Rails";
import { posts } from "@/content/blog";

const title = "Blog — Heigin CRM";
const description =
  "Playbooks, data and product notes on selling with WhatsApp, AI workflows and CRM for Indian SMBs.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [lead, ...rest] = posts;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <section className="py-20 md:py-24">
            <Container className="max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Blog
              </span>
              <h1 className="text-display mt-6 text-[clamp(2.2rem,5vw,3.6rem)]">
                Notes on selling{" "}
                <span className="font-display italic text-muted-foreground">the Indian way</span>
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
                Playbooks, benchmarks and product notes from the team building Heigin.
              </p>
            </Container>
          </section>

          <HatchDivider />

          {lead && (
            <section className="py-14">
              <Container>
                <Link
                  to="/blog/$slug"
                  params={{ slug: lead.slug }}
                  className="grid gap-8 rounded-2xl border border-border bg-card p-6 transition-colors hover:bg-surface md:grid-cols-[1.2fr_1fr] md:p-8"
                >
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {lead.category} · {lead.date}
                    </p>
                    <h2 className="text-display mt-4 text-[clamp(1.6rem,3vw,2.2rem)] leading-tight">
                      {lead.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
                      {lead.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[14px]">
                      Read article <ArrowRight className="size-4" />
                    </span>
                  </div>
                  <div className="hidden rounded-xl border border-dashed border-border bg-surface p-6 md:block">
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      Featured
                    </p>
                    <p className="mt-4 text-[14px] font-medium">{lead.author.name}</p>
                    <p className="text-[13px] text-muted-foreground">{lead.author.role}</p>
                    <p className="mt-6 font-mono text-[11.5px] text-muted-foreground">
                      {lead.readTime}
                    </p>
                  </div>
                </Link>
              </Container>
            </section>
          )}

          <section className="pb-20">
            <Container>
              <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2">
                {rest.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group bg-card p-6 transition-colors hover:bg-surface"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                      {p.category} · {p.date}
                    </p>
                    <h3 className="mt-3 text-[19px] font-semibold leading-snug tracking-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted-foreground">
                      {p.excerpt}
                    </p>
                    <p className="mt-5 font-mono text-[11.5px] text-muted-foreground">
                      {p.readTime}
                    </p>
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
