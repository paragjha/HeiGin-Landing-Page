import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Platform } from "@/components/site/Platform";
import { Logos } from "@/components/site/Logos";
import { Quote } from "@/components/site/Quote";
import { Frame, HatchDivider } from "@/components/site/Rails";
import { AiFeatures } from "@/components/site/AiFeatures";
import { Solutions } from "@/components/site/Solutions";
import { Rollout } from "@/components/site/Rollout";
import { Security } from "@/components/site/Security";
import { Pricing } from "@/components/site/Pricing";
import { CtaFooter } from "@/components/site/CtaFooter";

const title = "Heigin: India's AI-First CRM with WhatsApp Automation";
const description =
  "An India-first CRM for SMBs: capture leads from WhatsApp and IndiaMART, automate follow-ups with AI, and run your pipeline with a team of three.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Frame>
          <Hero />
          <Logos />
          <HatchDivider />
          <Platform />
          <Quote />
          <HatchDivider />
          <AiFeatures />
          <Solutions />
          <HatchDivider />
          <Rollout />
          <Security />
          <Pricing />
          <HatchDivider />
          <CtaFooter />
        </Frame>
      </main>
    </div>
  );
}
