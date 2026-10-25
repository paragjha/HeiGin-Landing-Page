/**
 * Central site configuration: navigation, conversion destinations and
 * environment-driven URLs. Edit here instead of hunting through pages.
 */

export const site = {
  name: "HeiGin",
  tagline: "The agentic CRM",
  description:
    "HeiGin is the agentic CRM that connects your customer context, spots what needs attention, and helps your team take the next step.",
  /** Public marketing site, used for canonical URLs and structured data. */
  url: "https://heigin.com",
  /**
   * Where "Sign in" points. The product app URL is not publicly confirmed,
   * so this stays empty and the sign-in link is hidden until it is set.
   */
  appUrl: "",
  /** General contact inbox (also used for security and privacy questions). */
  contactEmail: "office@heigin.com",
  /** Sales enquiries. */
  salesEmail: "sales@heigin.com",
  securityEmail: "office@heigin.com",
  /** Google Analytics 4 measurement ID. Leave empty to turn analytics off. */
  gaMeasurementId: "G-CQYE7SD7M7",
} as const;

export const cta = {
  earlyAccess: { label: "Join waitlist", to: "/contact" },
  bookDemo: { label: "Book a demo", to: "/contact?intent=demo" },
  talkToTeam: { label: "Talk to our team", to: "/contact" },
  seeHowItWorks: { label: "See how it works", to: "/product" },
  exploreProduct: { label: "Explore the product", to: "/product" },
  exploreIntegrations: { label: "Explore integrations", to: "/integrations" },
} as const;

export interface NavItem {
  label: string;
  to: string;
  description?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const mainNav: (NavGroup | NavItem)[] = [
  {
    label: "Product",
    items: [
      { label: "Overview", to: "/product", description: "The connected customer workspace" },
      { label: "AI Agents", to: "/ai-agents", description: "Agents that move work forward" },
      { label: "Integrations", to: "/integrations", description: "Connect the tools you already use" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Use Cases", to: "/use-cases", description: "Problems HeiGin is built to solve" },
      { label: "Solutions", to: "/solutions", description: "Who HeiGin is for" },
    ],
  },
  {
    label: "Resources",
    items: [
      { label: "Blog", to: "/blog", description: "Writing on agentic CRM and sales" },
      { label: "About HeiGin", to: "/about", description: "Why we are building HeiGin" },
    ],
  },
  { label: "Pricing", to: "/pricing" },
];

export const footerNav: { label: string; items: NavItem[] }[] = [
  {
    label: "Product",
    items: [
      { label: "Overview", to: "/product" },
      { label: "AI Agents", to: "/ai-agents" },
      { label: "Integrations", to: "/integrations" },
      { label: "Pricing", to: "/pricing" },
      { label: "Security", to: "/security" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Use Cases", to: "/use-cases" },
      { label: "Solutions", to: "/solutions" },
    ],
  },
  {
    label: "Company",
    items: [
      { label: "About", to: "/about" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    label: "Legal",
    items: [
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" },
    ],
  },
];
