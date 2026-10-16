import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked rise: the child starts tilted back and lower, and flattens
 * and lifts into place as the page scrolls. Driven by scroll only, never the cursor.
 */
export function ScrollRise({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the frame top sits at the bottom of the viewport, 1 when it reaches 30% from the top.
      const p = Math.min(1, Math.max(0, (vh - rect.top) / (vh * 0.7)));
      const ease = 1 - (1 - p) ** 3;
      el.style.transform = `translateY(${(1 - ease) * 80}px) rotateX(${(1 - ease) * 14}deg) scale(${0.94 + ease * 0.06})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={cn("origin-top will-change-transform", className)}>
      {children}
    </div>
  );
}
