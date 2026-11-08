/**
 * Slim strip above the main navigation. Lives at the top of the page (not
 * sticky) so it scrolls away naturally on scroll-down. Keeping it static
 * means the nav's height never changes while the user scrolls, which avoids
 * the shaky header the previous collapse-on-scroll version produced whenever
 * the browser nudged scrollY (trackpad bounce, iOS rubber-banding, short
 * wheel oscillations all crossed the toggle threshold).
 */
export function EyebrowBar() {
  return (
    <div className="bg-foreground">
      <div className="container-site flex h-10 items-center justify-center">
        <a
          href="/contact?intent=pilot"
          className="group inline-flex items-center gap-2 text-xs font-medium tracking-[0.02em] text-background/80 transition-colors hover:text-background focus-visible:text-background focus-visible:outline-none"
        >
          <span className="underline-offset-4 group-hover:underline group-focus-visible:underline">
            Sign up for the pilot program
          </span>
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5 group-focus-visible:translate-x-0.5">→</span>
        </a>
      </div>
    </div>
  );
}
