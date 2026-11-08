import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { getPosts } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/lib/posts";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { NewsroomCard, type NewsroomPost } from "@/components/site/newsroom-card";
import { PlaceholderNote } from "@/components/site/placeholder-note";
import { blogThumbs, isThumbKey } from "@/components/blog/thumbs";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/blog/")({
  head: pageHead(
    "/blog",
    "Blog",
    "Writing on agentic CRM, sales workflows and customer relationships from the HeiGin team."
  ),
  loader: () => getPosts(),
  component: Blog,
});

const categories = ["All", ...BLOG_CATEGORIES] as const;

function Blog() {
  const live = Route.useLoaderData();
  const isLive = live.length > 0;

  const [cat, setCat] = useState<(typeof categories)[number]>("All");
  const shown = cat === "All" ? live : live.filter((r) => r.category === cat);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Writing on agentic CRM, sales workflows and the HeiGin build."
        description="Practical pieces for Indian B2B sales leaders. Each post is tagged with its category and links to real product surfaces."
        showCtas={false}
      />
      <Section>
        {!isLive && <PlaceholderNote>Posts land here as the team publishes them.</PlaceholderNote>}

        <div className={cn("flex flex-wrap gap-1.5", !isLive && "mt-6")} role="group" aria-label="Filter posts">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border bg-surface text-muted-foreground hover:bg-accent"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <p className="mt-10 text-lg text-muted-foreground">
            {cat === "Customer stories"
              ? "Customer stories will appear here once pilot teams approve them."
              : "Nothing here yet in this category."}
          </p>
        ) : (
          <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((r) => {
              const Thumb = isThumbKey(r.thumb) ? blogThumbs[r.thumb] : null;
              const summary: NewsroomPost = {
                slug: r.slug,
                tag: r.category,
                title: r.title,
                summary: r.summary,
                date: `${r.readTime} min read`,
              };
              return (
                <li key={r.slug}>
                  <NewsroomCard
                    post={summary}
                    to={`/blog/${r.slug}`}
                    thumb={Thumb ? <Thumb tone="dark" /> : undefined}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </>
  );
}
