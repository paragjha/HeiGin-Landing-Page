import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge only knows Tailwind's built-in font sizes. HeiGin defines extra ones (in the
 * @heigin/ui theme and in styles.css), and without this it reads e.g. `text-headline` as a text
 * *color*, so `cn("text-headline", "text-foreground")` silently dropped the size. Listing them
 * here keeps size and color classes independent.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["2xs", "md", "nav", "badge", "label", "page-title-mobile", "display", "headline", "subhead"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
