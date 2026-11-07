import type { Testimonial } from "@/lib/testimonials";

/**
 * Single pilot-team testimonial card. Use inside a grid on any page that
 * carries approved customer quotes. The home page composes a `md:grid-cols-2`
 * grid; other pages can go wider or stack.
 */
export function TestimonialFigure({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <figure className="flex min-h-72 flex-col rounded-2xl bg-surface p-8 shadow-card">
      <div className="flex items-center gap-3">
        <span
          className={`flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl ${t.tile}`}
        >
          <img src={t.logo} alt="" className="size-full object-contain" />
        </span>
        <div>
          <p className="font-medium text-foreground">{t.company}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
        </div>
      </div>
      <blockquote className="mt-6 text-xl leading-relaxed text-foreground">“{t.quote}”</blockquote>
      <figcaption className="mt-auto flex items-center justify-between pt-6 text-sm text-muted-foreground">
        <span className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-foreground">{t.role}</span>
        <span>{t.year}</span>
      </figcaption>
    </figure>
  );
}
