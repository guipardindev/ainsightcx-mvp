import { cn } from "@/lib/utils";

/** Marca do produto: monograma + wordmark. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <span
        aria-hidden
        className="flex size-7 items-center justify-center rounded-md bg-brand text-[11px] font-bold tracking-tight text-brand-foreground"
      >
        Ai
      </span>
      <span className="text-[15px] font-semibold tracking-tight">
        AInsight<span className="text-brand-text">CX</span>
      </span>
    </span>
  );
}
