---
title: "AI sales agents: how to stop them making things up"
summary: An AI sales agent makes things up when it answers from what it guesses instead of what your business has approved. Ground every reply in your own offer, FAQs and documents, check each claim before it goes out, and keep a person on anything that commits the business.
category: Agentic CRM
date: 2026-11-21
slug: ai-sales-agent-hallucinations
thumb: grounded-reply
keyword: AI sales agent
---

## AI sales agents: how to stop them making things up

An **AI sales agent** makes things up when it is allowed to answer from general knowledge instead of from your business's own approved material. The fix is not a better prompt. Limit what the agent may draw on to your offer, FAQs and documents, check every factual claim in a draft against those sources before it goes out, and keep a person in the loop for prices, discounts, dates and policies. If the agent cannot find the answer in your material, it should say so rather than fill the gap.

## What is an AI sales agent?

An AI sales agent is software that reads sales conversations and does part of a rep's job: drafting replies to enquiries, answering product questions, summarising calls or suggesting the next step. Some tools are sold as an "AI SDR" that prospects and replies at scale. Others sit inside a CRM and help the rep rather than replace them.

The label covers a lot. Gartner warns about "agent washing" and estimates that only about 130 of the thousands of vendors claiming agentic AI are real ([Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)). So it pays to ask what a given agent actually reads and what it is allowed to do. We set out the wider idea in [what is an agentic CRM](https://heigin.com/blog/what-is-an-agentic-crm).

## Why do AI sales agents make things up?

AI models make things up because they are built to produce a fluent answer, and they are often rewarded for guessing rather than for admitting they do not know. OpenAI's own research, published in September 2025, says standard training and evaluation "reward guessing over acknowledging uncertainty" ([OpenAI](https://openai.com/index/why-language-models-hallucinate/)). It defines a hallucination as a model confidently giving an answer that is not true.

The US National Institute of Standards and Technology uses the word "confabulation" for the same thing: a generative AI system producing false content and presenting it confidently ([NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)).

In sales, the gaps a model is most tempted to fill are the ones that matter most:

- **Prices and discounts.** A buyer asks for a better rate, and the model offers one that nobody approved.
- **Delivery dates and stock.** "Yes, we can ship by Friday" sounds helpful and may be false.
- **Policies.** Refunds, warranties, payment terms and returns, written in a confident tone.
- **Product specifications.** A plausible thread count, capacity or certification that is not in any datasheet.

## What happens when an AI agent gives a customer wrong information?

The business usually owns it. In _Moffatt v. Air Canada_, decided on 14 February 2024, an airline's website chatbot told a customer he could apply for a bereavement fare after travelling, which did not match the airline's actual policy ([Civil Resolution Tribunal decision](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do)). Air Canada argued that it could not be held liable for what the chatbot said. The tribunal rejected that, finding the airline responsible for all the information on its website, whether it came from a static page or a chatbot, and ordered it to pay the customer $812.02 in total.

The cost is not only legal. In April 2025, an AI support bot at the coding tool Cursor told users that being logged out was expected under a new login policy that did not exist, and the claim spread quickly online before a co-founder apologised ([Fortune](https://fortune.com/article/customer-support-ai-cursor-went-rogue/)).

For a B2B seller, the same mistake might be a discount a buyer screenshots, a delivery date your factory cannot meet, or a payment term your finance team has never offered. That is why the risk controls matter more than the model. Gartner expects over 40% of agentic AI projects to be cancelled by the end of 2027, and lists inadequate risk controls among the reasons, alongside cost and unclear value ([Gartner](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)).

![Comparison of two AI drafts answering the same fictional buyer question about free delivery and a discount: the ungrounded draft promises free delivery and a 5% discount that appear in no approved source, while the grounded draft quotes the delivery charge from the rate card, says the discount needs the account owner's approval and lists the sources it checked](/images/blog/ai-sales-agent-hallucinations-two-drafts.webp)

## How do you stop an AI sales agent from hallucinating?

You stop it by changing what the agent is allowed to draw on and by checking its work before a customer sees it.

1. **Ground replies in approved sources.** Give the agent your offer, price list, FAQs and product PDFs for the campaign, and tell it to answer only from those. This approach is known as retrieval-augmented generation (RAG). The original research found that retrieving documents before writing produced more specific and factual language than a model working from memory alone ([Lewis et al., 2020](https://arxiv.org/abs/2005.11401)).
2. **Keep the sources current.** A grounded agent is only as right as its documents. When prices or terms change, update the source the same day and retire the old file.
3. **Check every claim before sending.** Compare each factual statement in the draft against the sources and flag anything that is not supported. NIST's guidance for generative AI includes deploying fact-checking techniques and reviewing sources and citations in outputs ([NIST AI 600-1](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)).
4. **Let the agent say "I don't know".** A draft that says "I'll confirm the lead time with our team today" is better than a confident wrong date. Write that into the agent's instructions.
5. **Put a person on commercial commitments.** Prices, discounts, delivery dates, payment terms and policy exceptions should go to the rep or manager who owns the account. This is the core of [human-in-the-loop sales AI](https://heigin.com/blog/how-we-think-about-agent-trust).
6. **Log what was drafted, changed and sent.** When a buyer disputes a reply, you want to see what the agent proposed, what the rep edited and who approved it.

![Process flow for a grounded AI sales reply: a buyer question comes in, the agent pulls only the campaign's offer, FAQs and PDFs, drafts from those sources, checks each claim against them, sends any claim it cannot find to a person, and the rep reviews and sends the reply](/images/blog/ai-sales-agent-hallucinations-grounded-flow.webp)

## Which sales claims should never go out unchecked?

Anything that commits the business should be checked against a source and seen by a person. A useful test: if a buyer could hold you to it, a human signs off on it.

- **Always check:** prices, discounts, taxes, delivery dates, stock, payment terms, refund and warranty terms, specifications and certifications.
- **Check when in doubt:** comparisons with competitors, case examples and anything about a customer's own account history.
- **Usually safe to automate:** acknowledging an enquiry, proposing meeting slots, summarising what the buyer asked and attaching an approved brochure.

Consider a fictional company, Sundaram Mills, whose buyer emails: "Is delivery to Pune free, and can you do 5% off on 300 metres?" An ungrounded agent writes "Yes to both." A grounded agent quotes the delivery charge from the current rate card, says the discount needs the account owner's approval, and the rep decides before anything is sent. The second reply takes a few minutes longer and promises nothing the business has not agreed to.

## How does HeiGin approach grounded AI replies?

HeiGin is an agentic CRM for Indian B2B sales teams, and its agents are designed around the steps above. You can see what each agent reads and does on the [AI agents page](https://heigin.com/ai-agents).

- **Sales Agent drafts from campaign material only.** It writes email replies using only the campaign's own offer, FAQs and PDFs, then fact-checks the draft against them. Outbound messages go to review before they are sent.
- **Documents Q&A answers with citations.** Questions about your documents come back with the source they were drawn from, so a rep can check the answer against the document.
- **Copilot asks before it changes anything.** It proposes changes and bulk actions, and never commits one until you click Confirm.
- **Intent scoring tells the rep who to answer first.** Replies are rated Hot, Warm or Cold, as we describe in [AI lead scoring](https://heigin.com/blog/ai-lead-scoring-buying-intent).
- **Every proposal and action is logged.** An admin-only audit log records what an agent proposed and who approved it, as shown on the [product page](https://heigin.com/product).

The aim is simple: an agent that does the first draft and the checking, and a person who owns the promise.

## Frequently asked questions

### What is an AI sales agent?

An AI sales agent is software that handles part of a salesperson's work, such as drafting replies, answering product questions, summarising calls or suggesting next steps. Some work on their own at scale, often sold as AI SDRs. Others work inside a CRM and keep the rep in charge of what is sent.

### Why do AI sales agents hallucinate?

Language models are built to produce fluent answers, and OpenAI's research says common training and evaluation methods reward guessing over admitting uncertainty. When an agent is not limited to your approved material, it can fill gaps with plausible but false prices, dates or policies.

### Is a company responsible for what its AI chatbot tells customers?

In the Moffatt v. Air Canada case, a Canadian tribunal held the airline responsible for wrong information its website chatbot gave a customer, and rejected the argument that the chatbot was answerable for its own words. Rules differ by country, so check local advice, but plan on owning what your AI says.

### What is a grounded AI reply?

A grounded reply is one the AI writes only from sources you have approved, such as your offer, price list, FAQs and product documents. Each claim can be traced back to one of those sources and checked. If the answer is not in the sources, a grounded agent should say it will confirm rather than guess.

### Can AI sales agents send emails without human review?

They can for low-risk messages like acknowledging an enquiry or offering meeting times. Anything that commits the business, such as prices, discounts, delivery dates or policy terms, should be reviewed by the person who owns the account before it goes out.

### Do AI SDRs work for small businesses?

They can save time on first replies and routine questions, but small teams feel a wrong promise more sharply because each customer matters more. Start with drafts that a rep reviews, ground them in your own material, and widen what the agent sends on its own only once the drafts are reliably right.

## Sources

- [Moffatt v. Air Canada, 2024 BCCRT 149 (Civil Resolution Tribunal, British Columbia)](https://decisions.civilresolutionbc.ca/crt/crtd/en/525448/1/document.do)
- [Why language models hallucinate (OpenAI)](https://openai.com/index/why-language-models-hallucinate/)
- [Artificial Intelligence Risk Management Framework: Generative Artificial Intelligence Profile, NIST AI 600-1 (NIST)](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [A customer support AI went rogue (Fortune)](https://fortune.com/article/customer-support-ai-cursor-went-rogue/)
- [Gartner predicts over 40% of agentic AI projects will be canceled by end of 2027 (Gartner)](https://www.gartner.com/en/newsroom/press-releases/2025-06-25-gartner-predicts-over-40-percent-of-agentic-ai-projects-will-be-canceled-by-end-of-2027)
- [Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al., 2020, arXiv)](https://arxiv.org/abs/2005.11401)
