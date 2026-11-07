import heimatverseLogo from "@/assets/heimatverse-logo.png.asset.json";
// import adlanticLogo from "@/assets/adlantic-logo.png.asset.json";

/**
 * Pilot-team quotes signed off by each team.
 *
 * Status (2026-11-07):
 *  - HeimatVerse: approved (confirmed 2026-10-16).
 *  - ADLantic: held — the previously approved quote referenced WhatsApp while
 *    WhatsApp sync is still in development. Restore once WhatsApp is live and
 *    ADLantic re-approves the wording. Do not silently rewrite a customer quote.
 */
export interface Testimonial {
  company: string;
  role: string;
  logo: string;
  /** Tailwind classes for the logo tile treatment. */
  tile: string;
  /** Short date / year string shown in the footer. */
  year: string;
  quote: string;
}

export const testimonials: Testimonial[] = [
  {
    company: "HeimatVerse",
    role: "Pilot team",
    logo: heimatverseLogo.url,
    tile: "bg-surface ring-1 ring-border",
    year: "2026",
    quote:
      "Follow-ups used to live in people's heads. Now HeiGin flags them before they slip, and drafts the message for us to approve.",
  },
  // HOLD (2026-11-07):
  // {
  //   company: "ADLantic",
  //   role: "Pilot team",
  //   logo: adlanticLogo.url,
  //   tile: "bg-night ring-1 ring-border",
  //   year: "2026",
  //   quote:
  //     "Having WhatsApp conversations, quotes and calls on one timeline means anyone on the team can pick up a client without a handover call.",
  // },
];
