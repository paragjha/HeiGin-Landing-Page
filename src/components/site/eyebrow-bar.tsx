import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Slim strip above the main navigation. Collapses on scroll down and reopens
 * on scroll up, so the nav itself never shifts position: when the eyebrow
 * collapses, `max-h-0 + overflow-hidden` removes its visual height while the
 * surrounding sticky container stays pinned.
 *
 * Respects prefers-reduced-motion by jumping between states rather than animating.
 */
export function EyebrowBar() {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // One scroll-direction watcher. We don't animate opacity to avoid interfering with pointer
    // events while the strip is collapsing; max-height takes the strip out of flow for real.
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 8) {
        setVisible(true);
      } else if (y > lastScrollY.current + 4) {
        setVisible(false);
      } else if (y < lastScrollY.current - 4) {
        setVisible(true);
      }
      lastScrollY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        "overflow-hidden bg-foreground transition-[max-height,opacity] duration-300 ease-out motion-reduce:transition-none",
        visible ? "max-h-10 opacity-100" : "max-h-0 opacity-0"
      )}
    >
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
