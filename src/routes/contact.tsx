import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Button, Card } from "@heigin/ui";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { site } from "@/lib/site";
import { submitLead } from "@/lib/submit-lead";
import { track } from "@/lib/analytics";

/** Mailboxes people can write to directly. Each opens the visitor's own mail app, addressed and with a subject. */
const mailboxes = [
  {
    id: "sales",
    title: "Sales",
    body: "Pricing, a walkthrough on your own use case, or early access for your team.",
    action: "Email sales",
    address: site.salesEmail,
    subject: "HeiGin sales enquiry",
  },
  {
    id: "general",
    title: "General and support",
    body: "Questions about the product, security, privacy, or anything else.",
    action: "Email the team",
    address: site.contactEmail,
    subject: "HeiGin enquiry",
  },
] as const;

export const Route = createFileRoute("/contact")({
  head: pageHead(
    "/contact",
    "Contact & early access",
    "Request early access to HeiGin or book a walkthrough with the team. Tell us how you sell today and we will reply with next steps."
  ),
  component: Contact,
});

const field =
  "mt-1.5 w-full rounded-md border border-input bg-surface px-3 py-2 text-lg text-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20";

function Contact() {
  const [error, setError] = useState("");
  const [opened, setOpened] = useState(false);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const phone = String(data.get("phone") ?? "").trim();
    const company = String(data.get("company") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please add your name and a valid work email.");
      return;
    }
    setError("");

    setSending(true);
    try {
      const result = await submitLead({ data: { name, email, phone, company, message } });
      if (result.ok) {
        setSent(true);
        return;
      }
      if (result.reason === "failed") {
        setError(`We couldn't send that just now. Please try again or write to ${site.contactEmail}.`);
        return;
      }
    } catch {
      setError(`We couldn't send that just now. Please try again or write to ${site.contactEmail}.`);
      return;
    } finally {
      setSending(false);
    }

    // Lead capture isn't configured on this deployment: fall back to the visitor's email app.
    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\n\n${message}`;
    window.location.href = `mailto:${site.contactEmail}?subject=${encodeURIComponent("HeiGin early access")}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your team."
        description="Tell us how you sell today and we'll set up a walkthrough on your own use case."
        showCtas={false}
      />
      <Section>
        <Card padding="lg" className="mx-auto max-w-xl">
          <form onSubmit={onSubmit} noValidate className="space-y-4">
            <label className="block text-md font-medium text-foreground">Name<input name="name" className={field} autoComplete="name" /></label>
            <label className="block text-md font-medium text-foreground">Work email<input name="email" type="email" className={field} autoComplete="email" /></label>
            <label className="block text-md font-medium text-foreground">Phone (optional)<input name="phone" type="tel" className={field} autoComplete="tel" /></label>
            <label className="block text-md font-medium text-foreground">Company<input name="company" className={field} autoComplete="organization" /></label>
            <label className="block text-md font-medium text-foreground">What would you like help with?<textarea name="message" rows={4} className={field} /></label>
            {error && <p role="alert" className="text-md text-destructive">{error}</p>}
            {sent && (
              <p role="status" className="text-md text-muted-foreground">
                Thanks, we've got your details and will be in touch soon.
              </p>
            )}
            {opened && (
              <p role="status" className="text-md text-muted-foreground">
                Your email app should open with the message ready to send. If it didn't, write to {site.contactEmail}.
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" disabled={sending}>{sending ? "Sending…" : "Request early access"}</Button>
            <p className="text-sm text-faint">Prefer email? Write to {site.contactEmail}, or {site.salesEmail} for sales.</p>
          </form>
        </Card>
      </Section>
      <Section tone="tint">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-headline text-foreground">Or email us directly.</h2>
          <p className="mt-3 text-subhead text-muted-foreground">
            Pick the inbox that fits. The button opens your email app with the address and subject already filled in.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {mailboxes.map((box) => (
              <Card key={box.id} padding="lg" className="flex flex-col">
                <h3 className="text-xl font-semibold tracking-tight text-foreground">{box.title}</h3>
                <p className="mt-1.5 text-md leading-relaxed text-muted-foreground">{box.body}</p>
                <div className="mt-auto pt-6">
                  <a
                    href={`mailto:${box.address}?subject=${encodeURIComponent(box.subject)}`}
                    onClick={() => track("contact_mailbox_clicked", { mailbox: box.id })}
                  >
                    <Button variant="secondary" size="md">
                      {box.action}
                    </Button>
                  </a>
                  <p className="mt-3 text-sm text-faint">
                    <a href={`mailto:${box.address}`} className="font-medium text-foreground underline underline-offset-2">
                      {box.address}
                    </a>
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
