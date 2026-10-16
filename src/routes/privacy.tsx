import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/page-head";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { PlaceholderNote } from "@/components/site/placeholder-note";

export const Route = createFileRoute("/privacy")({
  head: pageHead("/privacy", "Privacy policy", "How HeiGin handles personal data. The full policy is being finalised."),
  component: () => (
    <>
      <PageHero eyebrow="Legal" title="Privacy policy" description="Our full privacy policy is being finalised with legal counsel." showCtas={false} />
      <Section><PlaceholderNote>Privacy policy text pending legal review</PlaceholderNote></Section>
    </>
  ),
});
