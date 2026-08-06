export type Capability = { title: string; body: string };
export type Faq = { q: string; a: string };

export type Feature = {
  slug: string;
  eyebrow: string;
  h1: string;
  h1Italic: string;
  sub: string;
  problem: string;
  capabilities: Capability[];
  faq: Faq[];
  related: { label: string; to: string }[];
  soon?: boolean;
};

export const features: Feature[] = [
  {
    slug: "contacts",
    eyebrow: "Contacts",
    h1: "Every lead in one place,",
    h1Italic: "not five phones",
    sub: "Contacts, chats, calls, and quotes on a single record. Import an Excel sheet, sync IndiaMART, or forward an existing WhatsApp thread — Heigin de-duplicates and maps the fields for you.",
    problem:
      "Your customer list is in three places and none of them agree. There's an Excel file from last year, a WhatsApp group where quotes get forwarded, and whatever is saved on each rep's personal phone. When someone leaves, part of the list leaves too.",
    capabilities: [
      {
        title: "Import without the cleanup",
        body: "Drop in an Excel or CSV file. Heigin reads your column names and maps them; you fix what it gets wrong instead of formatting a spreadsheet for an afternoon.",
      },
      {
        title: "De-duplicate on the way in",
        body: "Matches on phone number first, because in India the number is the identity. The same customer from IndiaMART and WhatsApp becomes one record, not two.",
      },
      {
        title: "One record, whole history",
        body: "Every call, message, quote, stage change, and note sits on the contact in order. A new rep opens it and knows where things stand.",
      },
      {
        title: "Fields that match your business",
        body: "Add what you actually track: dealer code, site location, batch size, board and stream. No consultant, no ticket.",
      },
      {
        title: "Ownership that's clear",
        body: "Assign contacts to reps by territory or round-robin, so two people never call the same enquiry twice.",
      },
      {
        title: "Your list stays yours",
        body: "Control who can export contacts or view full phone numbers. The database leaves with the business, not with a rep.",
      },
    ],
    faq: [
      {
        q: "Can I import from my current CRM?",
        a: "Yes — export to Excel or CSV and upload. Direct importers for popular tools are on the roadmap.",
      },
      {
        q: "What happens to duplicates?",
        a: "Heigin flags matches before importing and you choose to merge or keep both.",
      },
      {
        q: "Can reps see each other's contacts?",
        a: "You decide. Owners see everything; reps can be limited to their own.",
      },
    ],
    related: [
      { label: "Pipeline", to: "/pipeline" },
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "Telephony", to: "/telephony" },
    ],
  },
  {
    slug: "pipeline",
    eyebrow: "Pipeline",
    h1: "See every deal move,",
    h1Italic: "without asking anyone",
    sub: "Drag deals through stages you define, with rupee values, ageing, and owner on every card. The forecast updates itself as your team works.",
    problem:
      "Right now the forecast is a WhatsApp message on Friday evening asking four people where they've reached. Half reply, one is travelling, and the number you take to the bank is a guess assembled on Saturday morning.",
    capabilities: [
      {
        title: "Stages you define",
        body: "Enquiry, quoted, site visit, negotiation, won. Name them how your business actually talks, not how a US CRM assumes you sell.",
      },
      {
        title: "Rupees, in lakh",
        body: "₹7.0L, not ₹700,000 and definitely not $8,400. Values, totals, and forecasts read the way you already write them.",
      },
      {
        title: "Deals that age visibly",
        body: "A card sitting untouched for eleven days looks different from one that moved yesterday. Nothing goes quiet without you noticing.",
      },
      {
        title: "Board or table",
        body: "Kanban when you're working the deals, sortable table when you're reviewing the quarter. Same data, two heads.",
      },
      {
        title: "Won and lost, with reasons",
        body: "Capture why a deal closed or didn't. Three months in, the pattern is the most useful report you have.",
      },
      {
        title: "Forecast without a meeting",
        body: "Open pipeline, weighted value, and closing-this-week are on the screen. The Friday call becomes optional.",
      },
    ],
    faq: [
      { q: "Can I change stages after setup?", a: "Yes, and existing deals move with them." },
      {
        q: "Can I run more than one pipeline?",
        a: "Multiple pipelines are supported on Growth and above, one per line of business.",
      },
      {
        q: "Does it work on a phone?",
        a: "Reps in the field get a mobile view of their deals, tasks, and today's call list.",
      },
    ],
    related: [
      { label: "Contacts", to: "/contacts" },
      { label: "Calls & Follow-ups", to: "/calls" },
      { label: "AI Copilot", to: "/ai-copilot" },
    ],
  },
  {
    slug: "calls",
    eyebrow: "Calls & Follow-ups",
    h1: "Nobody gets forgotten,",
    h1Italic: "especially the quiet ones",
    sub: "Every call logs itself against the contact. The follow-up gets scheduled the moment the call ends, and the reminder reaches the rep where they'll see it.",
    problem:
      "The follow-up lives in someone's memory, or a notebook, or a phone reminder that got swiped away at a traffic light. The customer who didn't push is the one who quietly buys somewhere else.",
    capabilities: [
      {
        title: "Call and log in one action",
        body: "Tap the number in Heigin. The call connects, the log writes itself, and you add a line of context instead of a full entry.",
      },
      {
        title: "Follow-up before you hang up",
        body: "End a call and Heigin asks when to come back to it. Two taps and it's scheduled against the deal.",
      },
      {
        title: "A missed call is a lead",
        body: "Unanswered numbers become contacts with a task attached, so the enquiry survives the moment nobody could pick up.",
      },
      {
        title: "Today's call list",
        body: "Every rep opens the day to an ordered list: who to call, why, and what happened last time.",
      },
      {
        title: "Reminders where reps are",
        body: "Nudges arrive on WhatsApp, not buried in an email nobody opens on a shop floor.",
      },
      {
        title: "Notes worth reading",
        body: "AI turns a rambling call note into three lines the next person can actually use.",
      },
    ],
    faq: [
      {
        q: "Do I need a special phone system?",
        a: "Not for basic logging. Full call recording and routing need Telephony — see that page.",
      },
      {
        q: "Can follow-ups be automatic?",
        a: "Yes, via Workflows: silent for N days triggers a nudge.",
      },
      { q: "Who sees the notes?", a: "Anyone with access to the contact. Configurable by role." },
    ],
    related: [
      { label: "Telephony", to: "/telephony" },
      { label: "Workflows", to: "/workflows" },
      { label: "Pipeline", to: "/pipeline" },
    ],
  },
  {
    slug: "ai-copilot",
    eyebrow: "AI Copilot",
    h1: "Ask in plain English,",
    h1Italic: "get an answer, not a report",
    sub: "\"Which Bengaluru leads from IndiaMART never replied?\" Type it the way you'd say it. Copilot reads your pipeline, drafts your follow-ups, and tells you why it scored a lead the way it did.",
    problem:
      "You know the answer is somewhere in the CRM. Getting it out means three filters and a saved view somebody configured last year. So you don't ask, and you work off memory instead.",
    capabilities: [
      {
        title: "Ask anything, from anywhere",
        body: "Copilot sits on every screen. Ask for today's hot leads, last quarter's lost reasons, or which deals slipped, without building a view.",
      },
      {
        title: "Drafts in the language of the deal",
        body: "Follow-ups written in English, Hindi, or Hinglish, matching how that customer already talks to you.",
      },
      {
        title: "Scores that explain themselves",
        body: "Every lead gets a score and the reasoning: budget signal, reply speed, source quality. You can disagree with it, which is the point.",
      },
      {
        title: "Reads the whole history first",
        body: "Copilot has the full WhatsApp and call thread before it suggests anything, so a follow-up never repeats what you already said.",
      },
      {
        title: "A brief, not a dashboard",
        body: "Open the day to what changed, what's at risk, and who to call. Three lines, not twelve charts.",
      },
      {
        title: "Suggests, never sends",
        body: "Every draft waits for a person. Copilot prepares the work; you decide what goes out.",
      },
    ],
    faq: [
      {
        q: "Can I turn AI off?",
        a: "Yes — Copilot can be switched off per workspace or per user by an owner.",
      },
      {
        q: "Does it send messages on its own?",
        a: "Not unless you build a Workflow that does. Copilot drafts and waits.",
      },
      {
        q: "Where does my data sit?",
        a: "Customer records stay in India-hosted storage, and Copilot reads only the workspace it's asked about.",
      },
    ],
    related: [
      { label: "Workflows", to: "/workflows" },
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "Contacts", to: "/contacts" },
    ],
  },
  {
    slug: "whatsapp-inbox",
    eyebrow: "WhatsApp Inbox",
    h1: "One number,",
    h1Italic: "the whole team behind it",
    sub: "A shared inbox on the official WhatsApp Business API. Enquiries get assigned, replies get drafted, and every message lands on the customer record automatically.",
    problem:
      "Enquiries arrive on the owner's personal WhatsApp at eleven at night, get forwarded to a rep in the morning, and the thread ends up split across two phones nobody else can see.",
    capabilities: [
      {
        title: "One business number, shared",
        body: "Your whole team works the same WhatsApp number, with assignment so two reps never reply to the same chat.",
      },
      {
        title: "Replies in seconds, not hours",
        body: "New enquiries get an acknowledgement instantly, in the language they arrived in, whatever the hour.",
      },
      {
        title: "Catalogues and quotes in-thread",
        body: "Send a product list, a PDF quote, or a payment link without leaving the conversation.",
      },
      {
        title: "Templates that get approved",
        body: "Manage your message templates and their approval status from inside Heigin.",
      },
      {
        title: "Every chat on the record",
        body: "The thread attaches to the contact and the deal, so the history survives a rep leaving.",
      },
      {
        title: "Official API, not a scraper",
        body: "Built on the WhatsApp Business API, so your number doesn't get banned for automation.",
      },
    ],
    faq: [
      {
        q: "Can I keep my existing number?",
        a: "Yes, if it isn't already registered on the consumer WhatsApp app. We'll walk you through migration.",
      },
      {
        q: "Who pays the WhatsApp conversation charges?",
        a: "Meta bills conversations at cost; Heigin doesn't mark them up.",
      },
      {
        q: "Can I have more than one number?",
        a: "Multiple numbers are available on Enterprise, one per branch or brand.",
      },
    ],
    related: [
      { label: "Workflows", to: "/workflows" },
      { label: "AI Copilot", to: "/ai-copilot" },
      { label: "Contacts", to: "/contacts" },
    ],
  },
  {
    slug: "workflows",
    eyebrow: "Workflows",
    h1: "Automate the chasing,",
    h1Italic: "not the relationship",
    sub: "New enquiry gets a reply in seconds. A silent deal gets a nudge on day four. A large discount waits for the owner. You build it once by picking from lists, and it runs whether or not anyone is at a desk.",
    problem:
      "The work that loses deals is the boring work — replying at 9pm, chasing on the fourth day, remembering the quote expires Friday. It's the first thing to slip when the team is busy, which is exactly when it matters most.",
    capabilities: [
      {
        title: "Start with what happened",
        body: "New enquiry, missed call, stage change, quote sent, seven days of silence. Real events, not abstract triggers.",
      },
      {
        title: "Instant first reply",
        body: "An enquiry at 11pm gets an acknowledgement at 11pm, in the language it arrived in. First response time stops depending on who's awake.",
      },
      {
        title: "Nudge the silent ones",
        body: "Deals that go quiet get a follow-up on a schedule you set, so nothing dies from neglect alone.",
      },
      {
        title: "Route by territory or turn",
        body: "Enquiries land with the right rep automatically. No group message asking who's taking this one.",
      },
      {
        title: "Pause where a person belongs",
        body: "Discounts past a threshold, contract terms, refunds: the workflow stops and waits for approval instead of quietly deciding.",
      },
      {
        title: "Build it by picking, not coding",
        body: "Choose a trigger, add conditions, pick actions. No consultant, no implementation partner.",
      },
    ],
    faq: [
      { q: "How many workflows can I run?", a: "Five on Starter, unlimited from Growth up." },
      {
        q: "Can I test before it's live?",
        a: "Yes — run a workflow in draft against recent records and read the log before switching it on.",
      },
      {
        q: "What if it goes wrong at 2am?",
        a: "Workflows log every run. Pause any workflow instantly and see exactly what fired.",
      },
    ],
    related: [
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "AI Copilot", to: "/ai-copilot" },
      { label: "Calls & Follow-ups", to: "/calls" },
    ],
  },
  {
    slug: "gst-invoicing",
    eyebrow: "GST Invoicing",
    soon: true,
    h1: "Quote to invoice,",
    h1Italic: "without leaving the deal",
    sub: "Build a GST quotation from the deal, convert it to an invoice when it's won, and send a payment link in the same WhatsApp thread. Numbers stay where the conversation is.",
    problem:
      "The quote gets built in Excel, the invoice in Tally, the payment reminder in WhatsApp — and the deal record in the CRM knows about none of it. Reconciling the three is somebody's Saturday.",
    capabilities: [
      {
        title: "Quotations that follow GST rules",
        body: "Line items with HSN or SAC codes, tax rates per item, and totals that compute correctly the first time.",
      },
      {
        title: "CGST, SGST, IGST handled",
        body: "Intra-state and inter-state split from the place of supply, rather than from someone remembering.",
      },
      {
        title: "Won deal becomes an invoice",
        body: "Convert the accepted quotation without retyping. Terms, items, and taxes carry through.",
      },
      {
        title: "Payment link in the thread",
        body: "Send the invoice and the link where the customer already is.",
      },
      {
        title: "Exports to your books",
        body: "Push documents to your accounting stack rather than around it.",
      },
      {
        title: "Every version kept",
        body: "Quote revisions stay on the deal, so a price discussion three weeks old is still readable.",
      },
    ],
    faq: [
      {
        q: "Is this accounting software?",
        a: "No. Heigin is a quoting-and-invoicing layer that feeds your accounting software; your books stay where they are.",
      },
      {
        q: "When does it ship?",
        a: "GST Invoicing is in build. Waitlist members get early access as modules land.",
      },
      {
        q: "What about e-invoicing and returns?",
        a: "Scope for IRN, e-way bills, and return formats is being finalised before launch — we'll publish specifics rather than promise them now.",
      },
    ],
    related: [
      { label: "Pipeline", to: "/pipeline" },
      { label: "WhatsApp Inbox", to: "/whatsapp-inbox" },
      { label: "Contacts", to: "/contacts" },
    ],
  },
  {
    slug: "telephony",
    eyebrow: "Telephony",
    h1: "Every call logged,",
    h1Italic: "including the one you missed",
    sub: "Connect your calling provider and every call — placed, received, or missed — lands on the contact with a recording and a follow-up task attached.",
    problem:
      "Calls are where Indian SMB deals are actually won, and they're the least recorded thing in the business. A rep leaves and takes four hundred conversations with them.",
    capabilities: [
      {
        title: "Click to call",
        body: "Dial from the contact record. The call routes through your existing number, so customers see what they expect.",
      },
      {
        title: "Missed calls become leads",
        body: "An unanswered number becomes a contact with a callback task, instead of a notification nobody opens.",
      },
      {
        title: "Recordings on the record",
        body: "Calls attach to the contact, with retention and consent settings your admin controls.",
      },
      {
        title: "Route to the right person",
        body: "Incoming calls reach the rep who owns the account, or the next available one.",
      },
      {
        title: "Call outcomes in one tap",
        body: "Connected, no answer, callback requested, not interested. Enough structure to be useful, not enough to be a chore.",
      },
      {
        title: "See who's actually calling",
        body: "Volume, connect rate, and talk time per rep, per week.",
      },
    ],
    faq: [
      {
        q: "Which providers do you connect to?",
        a: "Heigin connects to your existing cloud telephony account — the launch provider list is being confirmed and will be published here.",
      },
      {
        q: "Do you sell me numbers?",
        a: "No. You keep your provider and your numbers; Heigin sits on top.",
      },
      {
        q: "What about recording consent?",
        a: "Recording is off by default and configurable per workspace, with announcements available on connect.",
      },
    ],
    related: [
      { label: "Calls & Follow-ups", to: "/calls" },
      { label: "Contacts", to: "/contacts" },
      { label: "Workflows", to: "/workflows" },
    ],
  },
];

export const featureBySlug = Object.fromEntries(features.map((f) => [f.slug, f]));