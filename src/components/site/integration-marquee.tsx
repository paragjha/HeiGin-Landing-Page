import type { ReactNode } from "react";
import gmail from "@/assets/integrations/gmail.svg";
import googleMeet from "@/assets/integrations/googlemeet.svg";
import whatsapp from "@/assets/integrations/whatsapp.svg";
import slack from "@/assets/integrations/slack.svg";
import notion from "@/assets/integrations/notion.svg";
import zapier from "@/assets/integrations/zapier.svg";

/**
 * Horizontal, slow, continuous logo marquee for the integrations section.
 *
 * - Monochrome treatment via `filter: grayscale(1) brightness(0)`.
 * - Seamless loop: the row is rendered twice and the whole track slides -50%,
 *   so there is never a visible "jump" at the boundary.
 * - Pauses on hover and on keyboard focus-within (browsers apply :hover from
 *   touch taps too, which is fine).
 * - `motion-reduce:animate-none` keeps it still for reduced-motion visitors.
 * - Edge fade via a horizontal mask so logos dissolve at the gutter rather
 *   than hitting a hard cut.
 */

interface Item {
  name: string;
  logo?: string;
  /** For brands we don't have an asset for (Jira today): an inline SVG. */
  inline?: ReactNode;
}

const items: Item[] = [
  { name: "Gmail", logo: gmail },
  { name: "Google Meet", logo: googleMeet },
  { name: "WhatsApp", logo: whatsapp },
  { name: "Slack", logo: slack },
  { name: "Notion", logo: notion },
  {
    name: "Jira",
    // Simplified monochrome Jira-style mark: two interlocking chevrons.
    inline: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full">
        <path d="M11.5 1.5L21 11a1.5 1.5 0 010 2.12l-9.5 9.5-2.12-2.13L17.75 12 9.38 3.62 11.5 1.5z" />
        <path d="M11.5 6.5L16 11a1.5 1.5 0 010 2.12L11.5 17.5 9.38 15.38 12.75 12 9.38 8.62 11.5 6.5z" opacity="0.6" />
      </svg>
    ),
  },
  { name: "Zapier", logo: zapier },
];

// Duplicate the list for the seamless -50% loop.
const track = [...items, ...items];

export function IntegrationMarquee() {
  return (
    <div className="group relative overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)" }}>
      <ul
        className="flex w-max items-center gap-14 motion-safe:animate-[marquee_42s_linear_infinite] group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused] motion-reduce:animate-none"
        aria-label="Integrations HeiGin works with"
      >
        {track.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex shrink-0 items-center gap-3 text-foreground"
            // Mark the duplicate half so it doesn't double-announce.
            aria-hidden={i >= items.length ? true : undefined}
          >
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center"
              style={{ filter: "grayscale(1) brightness(0) contrast(1)", opacity: 0.75 }}
            >
              {item.logo ? (
                <img src={item.logo} alt="" aria-hidden="true" className="h-full w-full object-contain" loading="lazy" />
              ) : (
                item.inline
              )}
            </span>
            <span className="text-md font-medium tracking-tight">{item.name}</span>
          </li>
        ))}
      </ul>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </div>
  );
}
