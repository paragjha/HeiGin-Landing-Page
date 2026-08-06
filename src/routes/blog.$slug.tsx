import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { CtaFooter } from "@/components/site/CtaFooter";
import { Frame, HatchDivider, Container } from "@/components/site/Rails";
import { postBySlug, posts } from "@/content/blog";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const p = postBySlug[params.slug];
    const title = p ? `${p.title} — Heigin Blog` : "Article — Heigin Blog";
    const description = p ? p.excerpt.slice(0, 155) : "Heigin blog article.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: BlogPost,
});

function BlogPost() {
  const { slug } = Route.useParams();
  const post = postBySlug[slug];
  if (!post) throw notFound();
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <article className="py-16 md:py-20">
            <Container className="max-w-2xl">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="size-3.5" /> All articles
              </Link>
              <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                {post.category} · {post.date} · {post.readTime}
              </p>
              <h1 className="text-display mt-4 text-[clamp(2rem,4.4vw,3rem)] leading-tight">
                {post.title}
              </h1>
              <p className="mt-5 text-[17px] leading-relaxed text-muted-foreground">
                {post.excerpt}
              </p>
              <div className="mt-8 flex items-center gap-3 border-y border-border py-4">
                <span className="grid size-9 place-items-center rounded-full bg-surface-2 font-mono text-[12px]">
                  {post.author.name
                    .split(" ")
                    .map((w) => w[0])
                    .join("")}
                </span>
                <span>
                  <span className="block text-[14px] font-medium">{post.author.name}</span>
                  <span className="block text-[13px] text-muted-foreground">{post.author.role}</span>
                </span>
              </div>

              <div className="mt-10 space-y-9">
                {post.body.map((block, i) => (
                  <section key={i}>
                    {block.heading && (
                      <h2 className="text-display text-[1.4rem] leading-snug">{block.heading}</h2>
                    )}
                    <div className="mt-3 space-y-4">
                      {block.paragraphs.map((t) => (
                        <p key={t} className="text-[16px] leading-relaxed text-muted-foreground">
                          {t}
                        </p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </Container>
          </article>

          <section className="border-t border-border/70 py-14">
            <Container>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                Keep reading
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {more.map((p) => (
                  <Link
                    key={p.slug}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="rounded-xl border border-border bg-card p-4 transition-colors hover:bg-surface"
                  >
                    <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                      {p.category}
                    </p>
                    <p className="mt-2 text-[15px] font-medium leading-snug">{p.title}</p>
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
