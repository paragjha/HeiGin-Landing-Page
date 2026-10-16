import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarCheck, CheckCircle2, FileText, Mail, PhoneCall, RotateCcw, Sparkles } from "lucide-react";
import { ApprovalCard, Badge, Button, Card, DealStage, TrustRungBadge } from "@heigin/ui";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/**
 * Interactive walkthrough of one complete HeiGin workflow: meeting → signal →
 * agent proposal → human approval → recorded outcome. All steps use fictional
 * demo data; nothing here executes a real integration.
 */

const steps = [
  {
    id: "meeting",
    label: "Meeting happens",
    title: "A renewal call with Kaveri Textiles",
    body: "Meera meets Asha Rao to discuss the annual contract. The meeting is on the calendar, so it lands on the customer timeline automatically once connected sources sync.",
    icon: PhoneCall,
  },
  {
    id: "context",
    label: "Context syncs",
    title: "Notes and context attach to the record",
    body: "Meeting notes and the conversation history come together on one timeline. No one copies anything between tools. The record already knows what was discussed.",
    icon: FileText,
  },
  {
    id: "signal",
    label: "Signal detected",
    title: "HeiGin spots an unanswered question",
    body: "Asha asked for spring-line pricing, and no reply has gone out. The follow-up agent matches the open question against the renewal context and raises it.",
    icon: Sparkles,
  },
  {
    id: "proposal",
    label: "Agent proposes",
    title: "A follow-up is drafted for review",
    body: "The agent drafts a reply using the rates discussed on the call. At this trust rung it cannot send anything itself. It prepares the action and explains its reasoning.",
    icon: Mail,
  },
  {
    id: "approval",
    label: "Human approves",
    title: "Meera reviews and approves",
    body: "The draft, the reason, and the source context are right there. One click approves it; edits and rejection are equally easy. Sensitive actions stay behind approval.",
    icon: CheckCircle2,
  },
  {
    id: "recorded",
    label: "CRM updates",
    title: "The action is recorded, the deal moves",
    body: "The reply sends, the timeline updates, and the open loop closes. Anyone on the team can see what happened, why, and who approved it.",
    icon: CalendarCheck,
  },
] as const;

function StepVisual({ step }: { step: number }) {
  const id = steps[step]!.id;
  switch (id) {
    case "meeting":
      return (
        <Card padding="md">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-info-soft-bg text-info-ink">
              <PhoneCall size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="text-md font-semibold text-foreground">Renewal call · Kaveri Textiles</p>
              <p className="text-sm text-muted-foreground">Yesterday, 3:40 pm · 32 min · with Asha Rao</p>
            </div>
            <Badge tone="success" size="sm" className="ml-auto">Completed</Badge>
          </div>
        </Card>
      );
    case "context":
      return (
        <Card padding="md">
          <div className="space-y-2.5">
            {[
              { icon: PhoneCall, text: "Call recording & notes", meta: "from Google Meet" },
              { icon: Mail, text: "Email thread: delivery schedule", meta: "from Gmail" },
              { icon: FileText, text: "Spring contract brief", meta: "from Notion" },
            ].map((row) => (
              <div key={row.text} className="flex items-center gap-3 rounded-md border border-border bg-sidebar px-3 py-2.5">
                <row.icon size={15} strokeWidth={1.8} aria-hidden="true" className="text-muted-foreground" />
                <span className="text-md text-foreground">{row.text}</span>
                <span className="ml-auto text-sm text-faint">{row.meta}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-sm text-muted-foreground">Illustrative. Integration statuses are listed on the integrations page.</p>
        </Card>
      );
    case "signal":
      return (
        <Card padding="md">
          <div className="flex items-start gap-3">
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-warning-soft-bg text-warning">
              <Sparkles size={16} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="text-md font-semibold text-foreground">Open loop: pricing question</p>
              <p className="mt-1 text-md leading-relaxed text-muted-foreground">
                “Could you send the updated spring-line pricing?” Unanswered for 22 hours on an account in active
                renewal talks.
              </p>
              <div className="mt-2"><Badge tone="warning" dot size="sm">Needs attention</Badge></div>
            </div>
          </div>
        </Card>
      );
    case "proposal":
      return (
        <ApprovalCard
          title="Send pricing follow-up to Asha Rao"
          reason="Answers the open pricing question with the rates discussed on the call."
          requestedBy="Follow-up agent"
          rung={2}
          onApprove={() => {}}
          onReject={() => {}}
        >
          <div className="rounded-md border border-border bg-sidebar p-3 text-md leading-relaxed text-muted-foreground">
            Hi Asha, thanks for the time yesterday. Attaching the updated spring-line pricing we discussed…
          </div>
        </ApprovalCard>
      );
    case "approval":
      return (
        <Card padding="md">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-success-soft-bg text-success-ink">
              <CheckCircle2 size={17} strokeWidth={1.8} aria-hidden="true" />
            </span>
            <div>
              <p className="text-md font-semibold text-foreground">Approved by Meera S</p>
              <p className="text-sm text-muted-foreground">Draft reviewed against the call notes · 9:12 am</p>
            </div>
            <TrustRungBadge rung={2} className="ml-auto" />
          </div>
        </Card>
      );
    case "recorded":
      return (
        <Card padding="md">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-md font-semibold text-foreground">Kaveri Textiles · Annual supply</p>
              <p className="mt-0.5 text-sm text-muted-foreground">Follow-up sent · Open loops: 0 · Next: contract review Friday</p>
            </div>
            <Badge tone="success" size="sm">On track</Badge>
          </div>
          <div className="mt-4">
            <DealStage compact stages={["Qualified", "Proposal", "Negotiation", "Won"]} current="Negotiation" />
          </div>
        </Card>
      );
  }
}

/** How long each step stays on screen before the demo moves on by itself. */
const STEP_DELAY_MS = 2500;

export function WorkflowDemo() {
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  // Autoplay ends once the visitor picks a step themselves; Replay turns it back on.
  const [autoplay, setAutoplay] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLOListElement>(null);
  const paused = hovered || focused;

  // Track whether the demo is on screen so it only plays while someone can see it.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setAutoplay(false);
      return;
    }
    // Entries can batch up during fast scrolling; the last one is the current state.
    const io = new IntersectionObserver((entries) => setInView(Boolean(entries.at(-1)?.isIntersecting)), {
      threshold: 0.4,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Advance after a fixed delay. Depending on `step` restarts the delay on every change, so each
  // step gets its full time on screen.
  useEffect(() => {
    if (!autoplay || !inView || paused) return;
    const timer = window.setTimeout(() => setStep((s) => (s + 1) % steps.length), STEP_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [step, autoplay, inView, paused]);

  // On narrow screens the step pills scroll sideways; keep the active one in view.
  useEffect(() => {
    const list = tabsRef.current;
    const tab = list?.querySelectorAll<HTMLElement>('[role="tab"]')[step];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    const offset = tab.getBoundingClientRect().left - list.getBoundingClientRect().left + list.scrollLeft;
    list.scrollTo({ left: offset - (list.clientWidth - tab.offsetWidth) / 2, behavior: "smooth" });
  }, [step]);

  const choose = (i: number, source?: string) => {
    setAutoplay(false);
    setStep(i);
    if (source) track("product_tour_interacted", { tour: "workflow", step: source });
  };

  const replay = () => {
    setStep(0);
    setAutoplay(true);
    track("workflow_demo_replayed");
  };

  // Crossfade: the outgoing step leaves quickly, the incoming one arrives just after, so the two
  // never overlap legibly.
  const fade = (active: boolean) =>
    cn(
      "col-start-1 row-start-1 transition-[opacity,transform,visibility] ease-out motion-reduce:delay-0",
      active ? "translate-y-0 opacity-100 delay-150 duration-300" : "invisible translate-y-1 opacity-0 duration-150"
    );

  return (
    <div
      ref={rootRef}
      // Pause for a mouse resting on the demo or for keyboard focus inside it, but not for touch or
      // a click that leaves focus on a button, which would otherwise stall autoplay indefinitely.
      onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={(e) => setFocused(e.target.matches(":focus-visible"))}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      className="overflow-hidden rounded-xl border border-border bg-surface shadow-[var(--hg-shadow-card)]"
    >
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-sidebar px-5 py-3">
        <p className="text-md font-semibold text-foreground">From signal to action: one workflow</p>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            touch={false}
            leadingIcon={<RotateCcw size={14} />}
            onClick={replay}
          >
            Replay
          </Button>
        </div>
      </div>

      {/* Step selector — horizontally scrollable on small screens */}
      <div className="border-b border-border px-5 py-4">
        <ol ref={tabsRef} role="tablist" aria-label="Workflow steps" className="flex flex-nowrap gap-1.5 overflow-x-auto pb-1">
          {steps.map((s, i) => (
            <li key={s.id} role="presentation" className="shrink-0">
              <button
                type="button"
                role="tab"
                aria-selected={i === step}
                onClick={() => choose(i, s.id)}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                  i === step
                    ? "border-primary bg-primary text-primary-foreground"
                    : i < step
                      ? "border-border bg-success-soft-bg text-success-ink"
                      : "border-border bg-surface text-muted-foreground hover:bg-accent"
                )}
              >
                {i + 1}. {s.label}
              </button>
            </li>
          ))}
        </ol>
        {/* progress track */}
        <div aria-hidden="true" className="mt-3 h-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-info transition-[width] duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/*
        All steps share one grid cell and only the active one is visible, so the panel is always as
        tall as the tallest step. Swapping content in and out used to change the height (step 4's
        approval card is taller than step 3's) and pushed the next section up and down.
        `invisible` also removes hidden steps from the tab order and the accessibility tree.
      */}
      <div className="grid gap-6 p-5 md:grid-cols-[1fr_1.2fr] md:p-6">
        <div>
          <div className="grid">
            {steps.map((s, i) => {
              const StepIcon = s.icon;
              return (
                <div key={s.id} className={fade(i === step)}>
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
                      <StepIcon size={16} strokeWidth={1.8} aria-hidden="true" />
                    </span>
                    <h3 className="text-xl font-semibold tracking-tight text-foreground">{s.title}</h3>
                  </div>
                  <p className="mt-3 text-lg leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5 flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              touch={false}
              leadingIcon={<ArrowLeft size={14} />}
              disabled={step === 0}
              onClick={() => choose(Math.max(0, step - 1))}
            >
              Back
            </Button>
            <Button
              variant="primary"
              size="sm"
              touch={false}
              trailingIcon={<ArrowRight size={14} />}
              disabled={step === steps.length - 1}
              onClick={() => choose(Math.min(steps.length - 1, step + 1))}
            >
              Next step
            </Button>
          </div>
        </div>
        <div className="grid">
          {steps.map((s, i) => (
            <div key={s.id} className={fade(i === step)}>
              <StepVisual step={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
