import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@heigin/ui";
import { getResource } from "@/lib/resources";
import { site } from "@/lib/site";
import { Section } from "@/components/site/section";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getResource({ data: params.slug });
    // A Strapi outage is a server error, not a missing page, so search engines don't drop the article.
    if (!result.ok && result.reason === "failed") throw new Error("Could not load this article.");
    if (!result.ok || !result.resource) throw notFound();
    return result.resource;
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

/** Maps Strapi rich-text blocks onto the site's type styles. */
function Body({ content }: { content: BlocksContent }) {
  return (
    <BlocksRenderer
      content={content}
      blocks={{
        paragraph: ({ children }) => <p className="mt-5 text-lg leading-relaxed text-foreground">{children}</p>,
        heading: ({ children, level }) =>
          level <= 2 ? (
            <h2 className="mt-12 text-2xl font-semibold tracking-tight text-foreground">{children}</h2>
          ) : (
            <h3 className="mt-8 text-xl font-semibold tracking-tight text-foreground">{children}</h3>
          ),
        list: ({ children, format }) =>
          format === "ordered" ? (
            <ol className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed text-foreground">{children}</ol>
          ) : (
            <ul className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed text-foreground">{children}</ul>
          ),
        "list-item": ({ children }) => <li>{children}</li>,
        quote: ({ children }) => (
          <blockquote className="mt-6 border-l-2 border-border-strong pl-5 text-lg italic leading-relaxed text-muted-foreground">
            {children}
          </blockquote>
        ),
        code: ({ plainText }) => (
          <pre className="mt-6 overflow-x-auto rounded-lg bg-sidebar p-4 text-sm leading-relaxed text-foreground">
            <code>{plainText}</code>
          </pre>
        ),
        image: ({ image }) => (
          <figure className="mt-8">
            <img src={image.url} alt={image.alternativeText ?? ""} width={image.width} height={image.height} loading="lazy" className="h-auto w-full rounded-lg" />
            {image.caption && <figcaption className="mt-2 text-sm text-faint">{image.caption}</figcaption>}
          </figure>
        ),
        link: ({ children, url }) => (
          <a
            href={url}
            className="font-medium underline underline-offset-2"
            {...(isExternal(url) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            {children}
          </a>
        ),
      }}
    />
  );
}

function Article() {
  const article = Route.useLoaderData();
  return (
    <Section reveal={false}>
      <article className="mx-auto max-w-2xl">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} aria-hidden="true" />
          All posts
        </Link>
        <div className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-faint">
          {article.category && <Badge tone="outline" size="sm">{article.category}</Badge>}
          {article.publishedAt && <time dateTime={article.publishedAt}>{dateFormat.format(new Date(article.publishedAt))}</time>}
          {article.readTime && <span>{article.readTime} min read</span>}
        </div>
        <h1 className="mt-4 text-balance text-display text-foreground">{article.title}</h1>
        {article.summary && <p className="mt-5 text-subhead text-muted-foreground">{article.summary}</p>}
        <div className="mt-10 border-t border-border pb-4">
          <Body content={article.body as unknown as BlocksContent} />
        </div>
      </article>
    </Section>
  );
}
