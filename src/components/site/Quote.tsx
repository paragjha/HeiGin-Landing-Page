import { Container } from "./Rails";

export function Quote() {
  return (
    <section className="py-12 md:py-24">
      <Container className="text-center">
        <p className="text-display mx-auto max-w-3xl text-[clamp(1.6rem,3.4vw,2.4rem)] leading-tight">
          “We answer every WhatsApp enquiry in under three minutes now, with three people. Heigin
          does the chasing we used to forget.”
        </p>
        <p className="mt-8 text-[15px] font-semibold">Sanjay Rao</p>
        <p className="text-[14px] text-muted-foreground">Founder · Verde Tech, Bengaluru</p>
      </Container>
    </section>
  );
}