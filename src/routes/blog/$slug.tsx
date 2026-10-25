import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import Markdown, { type Components } from "react-markdown";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@heigin/ui";
import { getPost } from "@/lib/blog";
import { site } from "@/lib/site";
import { Section } from "@/components/site/section";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const post = await getPost({ data: params.slug });
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const title = `${loaderData.title} | HeiGin`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.summary },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `${site.url}/blog/${params.slug}` }],
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
  const post = Route.useLoaderData();
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
        <div className="mt-10 border-t border-border pb-4">
          <Markdown components={components}>{post.body}</Markdown>
        </div>
      </article>
    </Section>
  );
}
