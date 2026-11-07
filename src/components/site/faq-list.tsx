import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface FaqItem {
  q: string;
  a: string;
}

/**
 * Single-open accordion with a kinetic height transition. Opening an item
 * closes the previous one with coordinated ease — no jerk/snap, no multi-open.
 *
 * Pass `defaultOpen` to pre-open an index (e.g. `0` to open the first item);
 * omit it for all-closed.
 */
export function FaqList({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  return (
    <ul className="divide-y divide-border border-y border-border">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <li key={f.q}>
            <button
              type="button"
              onClick={() => setOpen((cur) => (cur === i ? null : i))}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left text-xl font-medium text-foreground"
            >
              {f.q}
              <motion.span
                aria-hidden="true"
                className="text-2xl font-light text-faint"
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 30 }}
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="body"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    height: { type: "spring", stiffness: 320, damping: 32, mass: 0.6 },
                    opacity: { duration: 0.18 },
                  }}
                  style={{ overflow: "hidden" }}
                >
                  <p className="pb-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}
