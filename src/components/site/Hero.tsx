import { Sparkles } from "lucide-react";
import { WorkspaceMock } from "./WorkspaceMock";
import { Container } from "./Rails";
import { WaitlistButton } from "./Waitlist";

export function Hero() {
  return (
    <section id="top" className="relative">
      <Container className="pt-24 pb-20 text-center md:pt-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[12.5px] text-muted-foreground">
          <Sparkles className="size-3.5" />
          AI-first CRM, built for India
        </span>

        <h1 className="text-display mx-auto mt-7 max-w-4xl text-[clamp(2.6rem,6.4vw,4.6rem)]">
          Close more deals
          <br />
          with less follow-up
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-relaxed text-muted-foreground">
          Heigin is the India-first CRM for SMBs. Keep every lead, contact and deal in one place,
          let AI draft the follow-ups, and run your whole pipeline with a team of three.
          WhatsApp automation lands soon.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <WaitlistButton size="lg" className="rounded-lg px-6">
            Join waitlist
          </WaitlistButton>
        </div>

        <div className="mt-16 text-left">
          <WorkspaceMock />
        </div>
      </Container>
    </section>
  );
}