import type { Usp } from "@/data/usps";
import { FeatureIcon } from "./feature-icon";

export function FeatureCard({ usp }: { usp: Usp }) {
  return (
    <div className="feature-card group flex min-h-[220px] flex-col justify-between rounded-2xl border border-border/70 bg-surface-raised/30 p-6 transition-[transform,border-color] duration-300 ease-out hover:-translate-y-1 hover:border-accent md:min-h-[260px] md:p-8">
      <span className="flex h-8 w-8 items-center justify-center text-ink-muted transition-colors duration-300 group-hover:text-accent">
        <FeatureIcon kind={usp.icon} />
      </span>
      <div className="mt-10">
        <p className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
          {usp.title}
        </p>
        <p className="mt-3 text-sm text-ink-muted">{usp.detail}</p>
      </div>
    </div>
  );
}
