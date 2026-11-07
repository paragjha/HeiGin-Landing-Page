import { Link } from "@tanstack/react-router";

export interface NewsroomPost {
  slug: string;
  tag: string;
  title: string;
  summary: string;
  /** Free-text date label, e.g. "Upcoming" or "Nov 2026". */
  date: string;
}

/**
 * Painterly-backed newsroom card: landscape image under a gradient overlay,
 * tag pill at the top, title at the bottom, summary and date beneath.
 *
 * `to` defaults to the blog index until individual post routes exist; pass
 * a post-specific route once posts land.
 */
export function NewsroomCard({ post, to = "/blog" }: { post: NewsroomPost; to?: string }) {
  return (
    <Link
      to={to}
      className="group block overflow-hidden rounded-[1.5rem] border border-border transition-transform hover:-translate-y-0.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src="/images/hero-landscape.webp"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-foreground/40 to-foreground/70" />
        <div className="absolute inset-0 flex flex-col justify-between p-5">
          <span className="inline-flex w-fit items-center rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
            {post.tag}
          </span>
          <h3 className="text-lg font-semibold leading-snug text-background">{post.title}</h3>
        </div>
      </div>
      <div className="bg-surface p-5">
        <p className="text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
        <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-faint">{post.date}</p>
      </div>
    </Link>
  );
}
