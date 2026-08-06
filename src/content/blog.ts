export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: { name: string; role: string };
  body: { heading?: string; paragraphs: string[] }[];
};

export const posts: Post[] = [
  {
    slug: "whatsapp-first-sales-india",
    title: "Why Indian SMBs sell on WhatsApp, and what a CRM has to do about it",
    excerpt:
      "The enquiry arrives on WhatsApp, the quote goes out on WhatsApp, and the payment reminder does too. A CRM that treats chat as an afterthought is a CRM nobody updates.",
    category: "Playbooks",
    date: "12 May 2026",
    readTime: "6 min read",
    author: { name: "Sneha Iyer", role: "Head of Product" },
    body: [
      {
        paragraphs: [
          "Ask a hundred small businesses in India where their last order came from, and the honest answer is a chat thread. Not a form, not an email sequence: a message from a number nobody saved.",
          "Most CRMs were designed around email. Chat was bolted on later as a channel among many, which is why reps end up copying messages into notes by hand, and eventually stop.",
        ],
      },
      {
        heading: "Treat the phone number as the identity",
        paragraphs: [
          "In India the mobile number is the primary key. Two records with the same number are the same customer, whatever the spelling of the name. De-duplicating on number at import time removes most of the mess before it starts.",
          "It also means routing, ownership and history can all hang off one stable identifier that the customer themselves supplies every time they message you.",
        ],
      },
      {
        heading: "Automate the boring half of the thread",
        paragraphs: [
          "Catalogue requests, price lists, order status and payment reminders are the same three replies over and over. Automating those frees your team for the conversations that actually need a person.",
          "The rule of thumb we use: if a rep would send the identical message twice in a week, it belongs in a workflow.",
        ],
      },
    ],
  },
  {
    slug: "three-person-crm-rollout",
    title: "A CRM rollout for a three-person team, in one afternoon",
    excerpt:
      "No consultant, no discovery phase. Here's the exact sequence we walk small teams through to get from an Excel sheet to a working pipeline before dinner.",
    category: "Guides",
    date: "28 April 2026",
    readTime: "5 min read",
    author: { name: "Nikhil Rao", role: "Customer Success" },
    body: [
      {
        paragraphs: [
          "Small teams don't fail at CRM because the software is hard. They fail because the rollout assumes someone has a spare fortnight. Nobody does.",
        ],
      },
      {
        heading: "Hour one: import",
        paragraphs: [
          "Upload the sheet you already maintain, however messy. Map the four fields that matter (name, number, source, stage) and ignore the rest for now.",
        ],
      },
      {
        heading: "Hour two: connect",
        paragraphs: [
          "Link the WhatsApp Business number and the line you make calls from. Every future conversation now logs itself, which is the part that makes the CRM stay accurate.",
        ],
      },
      {
        heading: "Hour three: one workflow",
        paragraphs: [
          "Pick a single automation: a follow-up nudge 48 hours after a quote. One workflow that works beats twelve that nobody trusts.",
        ],
      },
    ],
  },
  {
    slug: "ai-lead-scoring-that-works",
    title: "Lead scoring that reps actually believe",
    excerpt:
      "A score is only useful if the rep can see why. We built ours to show its reasoning in one line, and adoption went up sharply.",
    category: "AI",
    date: "9 April 2026",
    readTime: "7 min read",
    author: { name: "Aditya Verma", role: "AI Engineering" },
    body: [
      {
        paragraphs: [
          "Every CRM sells lead scoring. Very few reps use it, because a number between 1 and 100 with no explanation is indistinguishable from a guess.",
        ],
      },
      {
        heading: "Show the reason, not just the score",
        paragraphs: [
          "Our model surfaces the two signals that moved the score most: reply speed, budget mentioned in chat, repeat enquiry, source quality. When a rep can read the reason, they can disagree with it, and that disagreement is the training signal.",
        ],
      },
      {
        heading: "Score the behaviour, not the profile",
        paragraphs: [
          "Firmographics are weak predictors for SMB sales in India. What someone did in the last 48 hours is a much stronger one.",
        ],
      },
    ],
  },
  {
    slug: "gst-quotes-to-paid",
    title: "From GST quotation to payment, without leaving the deal",
    excerpt:
      "Quoting in one tool, invoicing in another and chasing payment in a third is how margin leaks. Here's the flow we're building instead.",
    category: "Product",
    date: "21 March 2026",
    readTime: "4 min read",
    author: { name: "Priya Menon", role: "Product" },
    body: [
      {
        paragraphs: [
          "For most Indian SMBs the quote is a Word file, the invoice is in Tally, and the reminder is a WhatsApp message typed from memory. Nothing reconciles.",
        ],
      },
      {
        heading: "One document trail",
        paragraphs: [
          "Generate a GST-compliant quotation from the deal, convert it to an invoice on acceptance, and let the payment reminders run themselves until the amount clears.",
        ],
      },
    ],
  },
  {
    slug: "indiamart-lead-response-time",
    title: "The 60-second rule for IndiaMART leads",
    excerpt:
      "We looked at conversion against first-response time across 40,000 enquiries. The curve falls off a cliff faster than most teams assume.",
    category: "Data",
    date: "2 March 2026",
    readTime: "5 min read",
    author: { name: "Sneha Iyer", role: "Head of Product" },
    body: [
      {
        paragraphs: [
          "Buyers on marketplaces send the same enquiry to several suppliers at once. The first credible reply anchors the conversation.",
        ],
      },
      {
        heading: "What the data showed",
        paragraphs: [
          "Replies inside a minute converted roughly three times better than replies after an hour. After four hours, the curve is effectively flat: you are competing on price alone.",
          "The fix is rarely more staff. It is an automatic acknowledgement with the catalogue attached, followed by a human call inside the hour.",
        ],
      },
    ],
  },
  {
    slug: "crm-data-ownership",
    title: "Who owns the customer list when a rep leaves?",
    excerpt:
      "If the answer is 'whoever has the phone', you don't have a customer database. You have several private ones.",
    category: "Operations",
    date: "14 February 2026",
    readTime: "4 min read",
    author: { name: "Farhan Qureshi", role: "Operations" },
    body: [
      {
        paragraphs: [
          "The most expensive CRM problem in a small business isn't licensing. It's the day a salesperson resigns and takes three years of relationships stored in a personal phonebook.",
        ],
      },
      {
        heading: "Controls worth switching on early",
        paragraphs: [
          "Restrict bulk export, mask full phone numbers for roles that don't need them, and make sure every customer conversation happens on a business number the company controls.",
        ],
      },
    ],
  },
];

export const postBySlug = Object.fromEntries(posts.map((p) => [p.slug, p])) as Record<
  string,
  Post | undefined
>;
