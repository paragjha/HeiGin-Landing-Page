import { Button } from "@heigin/ui";
import { track } from "@/lib/analytics";

export interface FinalCtaButton {
  label: string;
  to: string;
  /** Variant styling: primary is the default white button; secondary is the
   *  translucent outlined one for dark panels. */
  variant?: "primary" | "secondary";
}

/**
 * Contained painterly CTA banner, 1279 × 824.72 at desktop. Lives inside a
 * `Section` on the home page; pass headline, body, and up to two CTAs.
 *
 * Both CTAs route to in-site URLs (no external signup), per the agreed CTA
 * cascade. `trackLocation` is the analytics label for the primary button
 * (defaults to "final-banner" to match the home-page event history).
 */
export function FinalCtaBanner({
  title,
  description,
  primary,
  secondary,
  trackLocation = "final-banner",
}: {
  title: string;
  description: string;
  primary: FinalCtaButton;
  secondary?: FinalCtaButton;
  trackLocation?: string;
}) {
  return (
    <div
      className="relative mx-auto flex w-full items-center justify-center overflow-hidden rounded-[2rem] px-6 text-center md:px-12"
      style={{ maxWidth: 1279, aspectRatio: "1279 / 824.72" }}
    >
      <img
        src="/images/hero-landscape.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-foreground/65 via-foreground/45 to-foreground/70" />
      <div className="relative flex flex-col items-center">
        <h2 className="mx-auto max-w-2xl text-balance text-[clamp(2rem,1.3rem+3vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-background">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-background/85">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={primary.to}
            onClick={() => track("cta_early_access_clicked", { location: trackLocation })}
          >
            <Button variant="primary" size="lg">
              {primary.label}
            </Button>
          </a>
          {secondary && (
            <a href={secondary.to}>
              <Button
                variant="secondary"
                size="lg"
                className="border-background/40 bg-background/10 text-background hover:bg-background/20"
              >
                {secondary.label}
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
