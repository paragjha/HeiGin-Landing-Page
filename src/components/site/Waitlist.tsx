import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Toaster } from "@/components/ui/sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("Enter a valid work email").max(160),
  phone: z
    .string()
    .trim()
    .min(8, "Enter a valid phone number")
    .max(20)
    .regex(/^[0-9+\-\s]+$/, "Digits, spaces and + only"),
  company: z.string().trim().min(2, "Please enter your company").max(100),
  team: z.string().min(1, "Pick a team size"),
});

type Ctx = { open: () => void };
const WaitlistContext = createContext<Ctx>({ open: () => {} });

export function useWaitlist() {
  return useContext(WaitlistContext);
}

const teamSizes = ["1-3", "4-10", "11-50", "51-200", "200+"];

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [team, setTeam] = useState("");
  const [done, setDone] = useState(false);

  const open = useCallback(() => {
    setDone(false);
    setErrors({});
    setIsOpen(true);
  }, []);
  const value = useMemo(() => ({ open }), [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const parsed = schema.safeParse({
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      phone: String(form.get("phone") ?? ""),
      company: String(form.get("company") ?? ""),
      team,
    });
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      return;
    }
    setErrors({});

    const webhookUrl = import.meta.env.VITE_LEADS_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        // Apps Script Web Apps don't handle CORS preflight, so this goes out as a
        // simple no-cors request. We can't read the response, but the write still lands.
        await fetch(webhookUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain" },
          body: JSON.stringify(parsed.data),
        });
      } catch {
        toast.error("Couldn't submit right now", {
          description: "Please try again in a moment.",
        });
        return;
      }
    }

    setDone(true);
    toast.success("You're on the waitlist", {
      description: "We'll reach out on WhatsApp within two working days.",
    });
  }

  return (
    <WaitlistContext.Provider value={value}>
      {children}
      <Toaster />
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle className="text-display text-[26px]">
              Join the <span className="font-display italic text-muted-foreground">waitlist</span>
            </DialogTitle>
            <DialogDescription>
              Early access rolls out weekly to Indian SMB teams. Tell us where to reach you.
            </DialogDescription>
          </DialogHeader>

          {done ? (
            <div className="rounded-xl border border-border bg-surface p-5 text-center">
              <p className="text-[15px] font-medium">You're on the list.</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">
                We'll message you on WhatsApp with your invite and a 20-minute setup slot.
              </p>
              <Button className="mt-5 w-full rounded-lg" onClick={() => setIsOpen(false)}>
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid gap-4" noValidate>
              <Field id="name" label="Full name" placeholder="Riya Kapoor" error={errors["name"]} />
              <Field
                id="email"
                label="Work email"
                type="email"
                placeholder="riya@company.in"
                error={errors["email"]}
              />
              <Field
                id="phone"
                label="WhatsApp number"
                placeholder="+91 98765 43210"
                error={errors["phone"]}
              />
              <Field
                id="company"
                label="Company"
                placeholder="Skyline Retail"
                error={errors["company"]}
              />
              <div className="grid gap-1.5">
                <Label htmlFor="team">Team size</Label>
                <Select value={team} onValueChange={setTeam}>
                  <SelectTrigger id="team">
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamSizes.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t} people
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors["team"] && (
                  <p className="text-[12.5px] text-destructive">{errors["team"]}</p>
                )}
              </div>
              <Button type="submit" size="lg" className="mt-1 w-full rounded-lg">
                Join waitlist
              </Button>
              <p className="text-center text-[12px] text-muted-foreground">
                No spam. We only use this to send your invite.
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </WaitlistContext.Provider>
  );
}

function Field({
  id,
  label,
  error,
  type = "text",
  placeholder,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} placeholder={placeholder} maxLength={160} />
      {error && <p className="text-[12.5px] text-destructive">{error}</p>}
    </div>
  );
}

export function WaitlistButton({
  children = "Join waitlist",
  className,
  size,
  variant,
}: {
  children?: ReactNode;
  className?: string;
  size?: "sm" | "lg" | "default";
  variant?: "default" | "outline";
}) {
  const { open } = useWaitlist();
  return (
    <Button size={size} variant={variant} className={className} onClick={open}>
      {children}
    </Button>
  );
}
