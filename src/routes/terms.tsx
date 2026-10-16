import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { PlaceholderNote } from "@/components/site/placeholder-note";

export const Route = createFileRoute("/terms")({
  head: pageHead("/terms", "Terms of service", "Terms for using HeiGin. The full terms are being finalised."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Terms of service" description="Our full terms of service are being finalised with legal counsel." showCtas={false} />
      <Section><PlaceholderNote>Terms text pending legal review</PlaceholderNote></Section>
    </>
  ),
});
