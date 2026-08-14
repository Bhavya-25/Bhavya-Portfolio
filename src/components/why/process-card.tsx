import type { ProcessStep } from "@/data/process";

export function ProcessCard({ step, index }: { step: ProcessStep; index: number }) {
  return (
    <div className="process-card rounded-2xl border border-border/70 bg-surface p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent md:p-7">
      <p className="font-display text-3xl font-medium tracking-tight text-ink-faint md:text-4xl">
        {String(index + 1).padStart(2, "0")}
      </p>
      <p className="mt-4 font-display text-lg font-medium tracking-tight text-ink md:text-xl">
        {step.title}
      </p>
      <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
    </div>
  );
}
