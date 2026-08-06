export type Solution = {
  slug: string;
  group: "size" | "industry";
  eyebrow: string;
  h1: string;
  h1Italic: string;
  sub: string;
  problem: string;
  stats: { value: string; label: string }[];
  outcomes: { title: string; body: string }[];
  workflow: { step: string; title: string; body: string }[];
  quote: { text: string; name: string; role: string };
  mock: {
    title: string;
    subtitle: string;
    stats: { label: string; value: string; hint: string }[];
    columns: string[];
    rows: { a: string; b: string; c: string; d: string; tone: "ok" | "warn" | "err" }[];
  };
  related: { label: string; to: string }[];
};

export const solutions: Solution[] = [
  {
    slug: "three-person-teams",
    group: "size",
    eyebrow: "3-person teams",
    h1: "A CRM that goes live",
    h1Italic: "in an afternoon",
    sub: "No admin, no consultant, no six-week rollout. Import your contacts, connect one WhatsApp number, and your whole team is selling on Heigin before the day ends.",
    problem:
      "Most CRMs assume you have an ops person. You don't. You have three people who sell, quote, and deliver — and a WhatsApp inbox that never stops. Anything that takes a week to configure will never get configured.",
    stats: [
      { value: "1 afternoon", label: "Typical time to go live" },
      { value: "3 seats", label: "Free for the first 14 days" },
      { value: "0", label: "Consultants required" },
    ],
    outcomes: [
      { title: "Start from your Excel sheet", body: "Upload the file you already keep. Heigin maps columns, merges duplicates on phone number, and you're looking at a real pipeline in minutes." },
      { title: "One shared WhatsApp number", body: "All three of you answer from the same inbox, with ownership rules so nobody double-replies to the same enquiry." },
      { title: "AI does the admin", body: "Follow-up drafts, call summaries and next steps get written for you, so selling time doesn't turn into typing time." },
      { title: "Priced like a small team", body: "₹499 per user a month on Starter. No setup fee, no minimum seat count, cancel any time." },
    ],
    workflow: [
      { step: "01", title: "Import", body: "Excel, CSV or an exported contact list. Deduped on the way in." },
      { step: "02", title: "Connect", body: "Link your WhatsApp Business number and your calling SIM or cloud number." },
      { step: "03", title: "Switch on AI", body: "Turn on lead scoring and follow-up nudges from the templates library." },
    ],
    quote: {
      text: "We set it up between two customer visits. By evening every enquiry from the week was in the pipeline and nothing was sitting unanswered.",
      name: "Nikhil Rao",
      role: "Co-founder, Vector Interiors",
    },
    mock: {
      title: "Today's plan",
      subtitle: "3 users · shared inbox",
      stats: [
        { label: "Open enquiries", value: "26", hint: "6 unassigned" },
        { label: "Setup progress", value: "100%", hint: "Live in 3h 40m" },
        { label: "Pipeline", value: "₹8.4L", hint: "First week" },
      ],
      columns: ["Task", "Contact", "Owner", "Status"],
      rows: [
        { a: "Send quote", b: "Skyline Retail", c: "Nikhil", d: "Due today", tone: "warn" },
        { a: "Call back", b: "Aisha Khan", c: "Priya", d: "Done", tone: "ok" },
        { a: "Follow up", b: "Verde Tech", c: "Unassigned", d: "Overdue", tone: "err" },
      ],
    },
    related: [
      { label: "Growing SMBs", to: "/solutions/growing-smbs" },
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "Pricing", to: "/pricing" },
    ],
  },
  {
    slug: "growing-smbs",
    group: "size",
    eyebrow: "Growing SMBs",
    h1: "10 to 100 seats,",
    h1Italic: "without the chaos",
    sub: "As the team grows, leads start slipping between reps. Heigin adds routing, ownership rules and reporting without turning your CRM into a project.",
    problem:
      "At ten people, the WhatsApp group stops working. Two reps call the same lead, a third one lets an enquiry go cold, and nobody can say what this month's pipeline actually looks like without asking everyone.",
    stats: [
      { value: "38%", label: "Average lift in follow-up rate" },
      { value: "2m 14s", label: "Median first-reply time on WhatsApp" },
      { value: "1 view", label: "For every rep, branch and source" },
    ],
    outcomes: [
      { title: "Routing that fits your floor", body: "Round-robin, territory or product-line assignment, with automatic reassignment when someone is on leave." },
      { title: "Nothing goes cold quietly", body: "SLA timers on first reply and follow-ups, with escalation to a manager when a lead is about to age out." },
      { title: "Reporting without spreadsheets", body: "Source-wise conversion, rep-wise activity and stage-wise ageing, refreshed live." },
      { title: "Onboard reps in a day", body: "A new joiner opens a contact and reads the whole history — calls, chats, quotes — in one scroll." },
    ],
    workflow: [
      { step: "01", title: "Define ownership", body: "Set territories, product lines and round-robin rules per source." },
      { step: "02", title: "Add SLAs", body: "First reply in 10 minutes, follow-up in 48 hours, escalate after that." },
      { step: "03", title: "Review weekly", body: "One dashboard for pipeline health, ageing and rep activity." },
    ],
    quote: {
      text: "We went from 6 reps to 24 in a year. The only reason nothing broke is that routing and follow-ups stopped depending on memory.",
      name: "Sneha Iyer",
      role: "Head of Sales, Orbit Labs",
    },
    mock: {
      title: "Team performance",
      subtitle: "This month · 24 reps",
      stats: [
        { label: "Pipeline", value: "₹1.9Cr", hint: "↑ 18% MoM" },
        { label: "SLA breaches", value: "4", hint: "↓ from 37" },
        { label: "Win rate", value: "34%", hint: "↑ 5 pts" },
      ],
      columns: ["Rep", "Open deals", "Reply time", "Status"],
      rows: [
        { a: "S. Rao", b: "18", c: "1m 40s", d: "On track", tone: "ok" },
        { a: "A. Mehta", b: "22", c: "6m 12s", d: "Watch", tone: "warn" },
        { a: "K. Pillai", b: "9", c: "24m", d: "Breached", tone: "err" },
      ],
    },
    related: [
      { label: "Pipeline", to: "/pipeline" },
      { label: "Workflows", to: "/workflows" },
      { label: "Multi-branch", to: "/solutions/multi-branch" },
    ],
  },
  {
    slug: "multi-branch",
    group: "size",
    eyebrow: "Multi-branch",
    h1: "Every branch on one board,",
    h1Italic: "roll-ups included",
    sub: "Run separate territories, price lists and WhatsApp numbers per branch — and still see one consolidated pipeline at head office.",
    problem:
      "Each branch keeps its own sheet, its own WhatsApp number and its own version of the price list. Consolidating a monthly number means five phone calls and a lot of copy-paste.",
    stats: [
      { value: "Unlimited", label: "Branches and territories" },
      { value: "Per-branch", label: "WhatsApp numbers and templates" },
      { value: "Live", label: "Head-office roll-up" },
    ],
    outcomes: [
      { title: "Data boundaries that hold", body: "Branch managers see their own leads; regional heads see their cluster; head office sees everything." },
      { title: "Local numbers, one inbox model", body: "Each branch answers on its own WhatsApp number with its own templates and business hours." },
      { title: "Transfers without losing history", body: "Move a lead between branches and the full chat, call and quote trail moves with it." },
      { title: "Consolidated reporting", body: "Compare branches on conversion, ageing and revenue without exporting anything." },
    ],
    workflow: [
      { step: "01", title: "Model the org", body: "Create branches, clusters and roles with the access each level needs." },
      { step: "02", title: "Attach numbers", body: "Map a WhatsApp number and calling line to each branch." },
      { step: "03", title: "Roll up", body: "Head office gets a single dashboard across every branch." },
    ],
    quote: {
      text: "Nine showrooms, nine numbers, one pipeline. The Monday review went from two hours of collation to opening one screen.",
      name: "Farhan Qureshi",
      role: "Director, Meridian Retail Group",
    },
    mock: {
      title: "Branch roll-up",
      subtitle: "9 branches · June",
      stats: [
        { label: "Group pipeline", value: "₹4.6Cr", hint: "↑ 11%" },
        { label: "Best branch", value: "Pune", hint: "42% win rate" },
        { label: "Needs attention", value: "Indore", hint: "Ageing leads" },
      ],
      columns: ["Branch", "Pipeline", "Win rate", "Status"],
      rows: [
        { a: "Pune", b: "₹92L", c: "42%", d: "Ahead", tone: "ok" },
        { a: "Jaipur", b: "₹61L", c: "29%", d: "On plan", tone: "warn" },
        { a: "Indore", b: "₹24L", c: "17%", d: "Behind", tone: "err" },
      ],
    },
    related: [
      { label: "Telephony", to: "/telephony" },
      { label: "Pipeline", to: "/pipeline" },
      { label: "Growing SMBs", to: "/solutions/growing-smbs" },
    ],
  },
  {
    slug: "retail-d2c",
    group: "industry",
    eyebrow: "Retail & D2C",
    h1: "Turn WhatsApp enquiries into",
    h1Italic: "repeat buyers",
    sub: "Catalogues, offers, order updates and re-order nudges — all on the number your customers already message you from.",
    problem:
      "Customers ask for the price list on WhatsApp, buy once, and then disappear. There's no record of what they bought, so there's nothing to send them three months later.",
    stats: [
      { value: "27%", label: "Typical repeat-purchase share" },
      { value: "4x", label: "Reply rate vs. email campaigns" },
      { value: "< 3 min", label: "Catalogue sent after an enquiry" },
    ],
    outcomes: [
      { title: "Catalogue on demand", body: "An auto-reply sends the right catalogue or price list the moment someone asks, day or night." },
      { title: "Purchase history on the contact", body: "Every order, size, colour and invoice sits on one record your team can search." },
      { title: "Re-order nudges", body: "Automatic WhatsApp reminders timed to the product's consumption cycle, not a generic calendar." },
      { title: "Festive campaigns that convert", body: "Segment by city, spend and last purchase, then send an approved template broadcast." },
    ],
    workflow: [
      { step: "01", title: "Capture", body: "Every WhatsApp, Instagram and store enquiry lands as a contact." },
      { step: "02", title: "Convert", body: "Catalogue, offer and payment link go out in the same thread." },
      { step: "03", title: "Repeat", body: "Automated nudges bring the buyer back on schedule." },
    ],
    quote: {
      text: "We stopped losing the WhatsApp customers who bought once. Repeat orders are now a third of our monthly revenue.",
      name: "Ananya Bose",
      role: "Founder, Kalka Home",
    },
    mock: {
      title: "Retail inbox",
      subtitle: "D2C · WhatsApp first",
      stats: [
        { label: "Enquiries today", value: "212", hint: "↑ 34 vs. yesterday" },
        { label: "Catalogues sent", value: "180", hint: "Automated" },
        { label: "Repeat orders", value: "48", hint: "This week" },
      ],
      columns: ["Customer", "Last order", "City", "Stage"],
      rows: [
        { a: "Aisha Khan", b: "Table linen set", c: "Mumbai", d: "Re-order due", tone: "warn" },
        { a: "Rohit Sen", b: "Cotton throws", c: "Kolkata", d: "Paid", tone: "ok" },
        { a: "Divya N.", b: "—", c: "Kochi", d: "No reply", tone: "err" },
      ],
    },
    related: [
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "Workflows", to: "/workflows" },
      { label: "Contacts", to: "/contacts" },
    ],
  },
  {
    slug: "real-estate",
    group: "industry",
    eyebrow: "Real Estate",
    h1: "From portal lead to",
    h1Italic: "site visit to booking",
    sub: "Capture leads from portals and ads, route them to the right broker in seconds, and keep every site visit and follow-up on one board.",
    problem:
      "Portal leads are expensive and perishable. If the first call doesn't happen within minutes, the buyer has already spoken to three other projects — and nobody can tell you which broker dropped it.",
    stats: [
      { value: "< 60s", label: "Lead-to-first-call target" },
      { value: "3.2x", label: "More site visits booked" },
      { value: "100%", label: "Calls recorded against the lead" },
    ],
    outcomes: [
      { title: "Instant routing", body: "Portal and ad leads are assigned by project, budget band and language before the tab closes." },
      { title: "Site visits on a board", body: "Schedule, confirm and remind on WhatsApp, with no-show follow-ups built in." },
      { title: "Broker accountability", body: "Every call, message and visit is logged against the lead and the broker who owns it." },
      { title: "Inventory-aware conversations", body: "Track unit, tower, facing and budget so the follow-up is about something real." },
    ],
    workflow: [
      { step: "01", title: "Capture", body: "Portals, ad forms and walk-ins land in one queue." },
      { step: "02", title: "Route", body: "Assigned in seconds by project and budget, with SLA timers running." },
      { step: "03", title: "Close", body: "Visit, negotiation and booking tracked to the token amount." },
    ],
    quote: {
      text: "Response time on portal leads went from an hour to under a minute. That alone changed how many site visits we book.",
      name: "Karan Malhotra",
      role: "Sales Head, Northline Developers",
    },
    mock: {
      title: "Site visit board",
      subtitle: "Project: Northline Grove",
      stats: [
        { label: "New leads", value: "74", hint: "Portals + ads" },
        { label: "Visits this week", value: "23", hint: "6 confirmed today" },
        { label: "Bookings", value: "5", hint: "₹3.1Cr value" },
      ],
      columns: ["Lead", "Budget", "Broker", "Visit"],
      rows: [
        { a: "Meera Desai", b: "₹1.4Cr", c: "S. Rao", d: "Confirmed", tone: "ok" },
        { a: "Arjun Sethi", b: "₹85L", c: "A. Mehta", d: "Rescheduled", tone: "warn" },
        { a: "Vikram J.", b: "₹2.2Cr", c: "Unassigned", d: "No-show", tone: "err" },
      ],
    },
    related: [
      { label: "Calls & Follow-ups", to: "/calls" },
      { label: "Telephony", to: "/telephony" },
      { label: "Pipeline", to: "/pipeline" },
    ],
  },
  {
    slug: "ed-tech",
    group: "industry",
    eyebrow: "Ed-tech & Coaching",
    h1: "Enquiry to counselling call to",
    h1Italic: "enrolment",
    sub: "Track every student enquiry through counselling, demo class and fee payment, with reminders going out on WhatsApp automatically.",
    problem:
      "Admission season is a flood. Parents enquire on WhatsApp at 10pm, counsellors call the next afternoon, and half the batch is lost to a competitor who called first.",
    stats: [
      { value: "24/7", label: "Auto-response to new enquiries" },
      { value: "2.4x", label: "Demo-class attendance" },
      { value: "Batch-wise", label: "Seat and fee tracking" },
    ],
    outcomes: [
      { title: "Answer at 10pm", body: "Automated replies share the course brochure, fee structure and counselling slots outside office hours." },
      { title: "Counselling pipeline", body: "Enquiry, counselling, demo, enrolment — a stage board built for admissions, not enterprise sales." },
      { title: "Parent-friendly reminders", body: "Demo class and fee-due reminders on WhatsApp in the parent's preferred language." },
      { title: "Batch and stream fields", body: "Track board, stream, target exam and preferred batch on the student record." },
    ],
    workflow: [
      { step: "01", title: "Capture", body: "Ads, website forms and WhatsApp enquiries land with course interest attached." },
      { step: "02", title: "Counsel", body: "Slot booked, reminder sent, call summary written by AI." },
      { step: "03", title: "Enrol", body: "Fee link, payment confirmation and batch allocation in one thread." },
    ],
    quote: {
      text: "Late-night parent enquiries used to be lost by morning. Now they get a reply in seconds and a counselling slot before we open.",
      name: "Deepa Krishnan",
      role: "Director, Lumen Coaching",
    },
    mock: {
      title: "Admissions board",
      subtitle: "June intake · 4 counsellors",
      stats: [
        { label: "Enquiries", value: "1,180", hint: "This month" },
        { label: "Demos booked", value: "312", hint: "↑ 22%" },
        { label: "Enrolments", value: "96", hint: "₹58L fees" },
      ],
      columns: ["Student", "Course", "Counsellor", "Stage"],
      rows: [
        { a: "Ishaan G.", b: "JEE Advanced", c: "D. Nair", d: "Enrolled", tone: "ok" },
        { a: "Sara P.", b: "NEET Repeat", c: "M. Joseph", d: "Demo due", tone: "warn" },
        { a: "Kabir S.", b: "Foundation", c: "Unassigned", d: "No reply", tone: "err" },
      ],
    },
    related: [
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "AI Copilot", to: "/ai-copilot" },
      { label: "Workflows", to: "/workflows" },
    ],
  },
];

export const solutionBySlug = Object.fromEntries(solutions.map((s) => [s.slug, s])) as Record<
  string,
  Solution | undefined
>;
