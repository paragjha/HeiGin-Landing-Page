import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Markdown, { type Components } from "react-markdown";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge, Button } from "@heigin/ui";
import { getPost, getPosts } from "@/lib/blog";
import { extractFaq } from "@/lib/blog-faq";
import { site } from "@/lib/site";
import { Section } from "@/components/site/section";
import { FinalCtaBanner } from "@/components/site/final-cta-banner";
import { blogThumbs, isThumbKey } from "@/components/blog/thumbs";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const [post, all] = await Promise.all([getPost({ data: params.slug }), getPosts()]);
    if (!post) throw notFound();
    const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);
    return { post, related };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    const title = `${post.title} | HeiGin`;
    const url = `${site.url}/blog/${params.slug}`;
    const faq = extractFaq(post.body);

    // JSON-LD: Article + optional FAQPage + BreadcrumbList. These are the
    // structured-data shapes Google, Bing, and most LLM answer engines look
    // for when deciding whether to extract a page into rich results.
    const scripts: { type: string; children: string }[] = [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.summary,
          datePublished: post.date,
          dateModified: post.date,
          articleSection: post.category,
          keywords: post.keyword,
          inLanguage: "en-IN",
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: {
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: { "@type": "ImageObject", url: `${site.url}/favicon.png` },
          },
          mainEntityOfPage: { "@type": "WebPage", "@id": url },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: site.url },
            { "@type": "ListItem", position: 2, name: "Blog", item: `${site.url}/blog` },
            { "@type": "ListItem", position: 3, name: post.title, item: url },
          ],
        }),
      },
    ];
    if (faq.length > 0) {
      scripts.push({
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((p) => ({
            "@type": "Question",
            name: p.question,
            acceptedAnswer: { "@type": "Answer", text: p.answer },
          })),
        }),
      });
    }

    return {
      meta: [
        { title },
        { name: "description", content: post.summary },
        ...(post.keyword ? [{ name: "keywords", content: post.keyword }] : []),
        { property: "og:title", content: title },
        { property: "og:description", content: post.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: url },
        { property: "article:published_time", content: post.date },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: post.summary },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts,
    };
  },
  component: Article,
});

const dateFormat = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const isExternal = (url: string) => /^https?:\/\//i.test(url);

/** Maps markdown elements onto the site's type styles. The page already has an h1, so `#` renders as h2. */
const components: Components = {
  h1: ({ children }) => <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>,
  h2: ({ children }) => <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>,
  h3: ({ children }) => <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{children}</h3>,
  h4: ({ children }) => <h4 className="mt-6 text-lg font-semibold text-foreground">{children}</h4>,
  p: ({ children }) => <p className="mt-5 text-lg leading-relaxed text-foreground">{children}</p>,
  ul: ({ children }) => <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground">{children}</ul>,
  ol: ({ children }) => <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-foreground">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="mt-6 border-l-2 border-border-strong pl-5 text-lg italic leading-relaxed text-muted-foreground">{children}</blockquote>
  ),
  pre: ({ children }) => (
    <pre className="mt-6 overflow-x-auto rounded-lg bg-sidebar p-4 text-sm leading-relaxed text-foreground">{children}</pre>
  ),
  code: ({ children }) => <code className="rounded bg-sidebar px-1 py-0.5 text-[0.9em]">{children}</code>,
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }) => (
    <img src={typeof src === "string" ? src : undefined} alt={alt ?? ""} loading="lazy" className="mt-8 h-auto w-full rounded-lg" />
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="font-medium underline underline-offset-2"
      {...(href && isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  ),
};

function Article() {
  const { post, related } = Route.useLoaderData();
  const Thumb = isThumbKey(post.thumb) ? blogThumbs[post.thumb] : null;

  return (
    <Section reveal={false}>
      <article className="mx-auto max-w-2xl">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} aria-hidden="true" />
          All posts
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint">
          <Badge tone="outline" size="sm">{post.category}</Badge>
          <time dateTime={post.date}>{dateFormat.format(new Date(post.date))}</time>
          <span>{post.readTime} min read</span>
        </div>
        <h1 className="mt-4 text-balance text-display text-foreground">{post.title}</h1>
        <p className="mt-5 text-subhead text-muted-foreground">{post.summary}</p>

        {Thumb && (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-border">
            <img
              src="/images/hero-landscape.webp"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative aspect-[16/9]">
              <Thumb tone="light" />
            </div>
          </div>
        )}

        <div className="mt-10 border-t border-border pb-4">
          <Markdown components={components}>{post.body}</Markdown>
        </div>
      </article>

      {related.length > 0 && (
        <div className="mx-auto mt-16 max-w-2xl border-t border-border pt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-faint">Related reading</p>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: r.slug }}
                  className="group block rounded-xl border border-border bg-surface p-5 transition-colors hover:bg-sidebar"
                >
                  <Badge tone="outline" size="sm">{r.category}</Badge>
                  <p className="mt-3 text-lg font-semibold text-foreground">{r.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{r.summary}</p>
                  <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                    Read <ArrowRight size={13} aria-hidden="true" />
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mx-auto mt-16 max-w-5xl">
        <FinalCtaBanner
          title="See how HeiGin runs this day-to-day."
          description="A 30-minute walkthrough on your own workflow — we'll show the agents against your real pipeline."
          primary={{ label: "Book a call", to: "/contact?intent=demo" }}
          secondary={{ label: "See pricing", to: "/pricing" }}
          trackLocation={`blog-${post.slug}`}
        />
      </div>

      <div className="mx-auto mt-10 max-w-2xl text-center">
        <Button variant="secondary" size="md" onClick={() => undefined}>
          <Link to="/blog" className="inline-flex items-center gap-1.5">
            <ArrowLeft size={14} aria-hidden="true" />
            Back to all posts
          </Link>
        </Button>
      </div>
    </Section>
  );
}
