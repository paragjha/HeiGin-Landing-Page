import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 54 54"
      fill="none"
      aria-hidden
      className={cn("size-6 text-foreground", className)}
    >
      <path d="M35.5934 0V35.5939" stroke="currentColor" strokeWidth="5.39329" />
      <path d="M17.797 17.7966V53.3905" stroke="currentColor" strokeWidth="5.39329" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      <span className="text-[17px] font-semibold tracking-tight">heigin</span>
    </span>
  );
}
