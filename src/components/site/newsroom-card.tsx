import type { ReactNode } from "react";

export interface NewsroomPost {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  /** Free-text date label, e.g. "Upcoming" or "Nov 2026". */
  date: string;
}

/**
 * Painterly-backed newsroom card. When a coded `thumb` is provided, the card
 * renders that live React scene in place of the landscape photo (keeping the
 * tag pill + title overlay on top). Otherwise it falls back to the painterly
 * landscape image — the pattern the home page's "upcoming" posts used.
 *
 * `to` defaults to the blog index until individual post routes exist; pass
 * a post-specific route once posts land.
 */
export function NewsroomCard({
  post,
  to = "/blog",
  thumb,
}: {
  post: NewsroomPost;
  to?: string;
  thumb?: ReactNode;
}) {
  // Plain anchor so this component can link to any slug-based route without
  // every caller having to type the TanStack Router params shape; the router
  // still intercepts same-origin clicks for client-side navigation.
  return (
    <a
      href={to}
      className="group block overflow-hidden rounded-[1.5rem] border border-border transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        {thumb ? (
          <div aria-hidden="true" className="absolute inset-0 h-full w-full">{thumb}</div>
        ) : (
          <img
            src="/images/hero-landscape.webp"
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {!thumb && <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-foreground/40 to-foreground/70" />}
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-start p-5">
          <span className="inline-flex w-fit items-center rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
            {post.tag}
          </span>
        </div>
        {!thumb && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-start p-5">
            <h3 className="text-lg font-semibold leading-snug text-background">{post.title}</h3>
          </div>
        )}
      </div>
      <div className="bg-surface p-5">
        {thumb && <h3 className="text-lg font-semibold leading-snug text-foreground">{post.title}</h3>}
        <p className={thumb ? "mt-2 text-sm leading-relaxed text-muted-foreground" : "text-sm leading-relaxed text-muted-foreground"}>{post.summary}</p>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-faint">{post.date}</p>
      </div>
    </a>
  );
}
