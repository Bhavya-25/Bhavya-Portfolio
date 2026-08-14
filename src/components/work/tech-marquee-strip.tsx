import { Marquee } from "@/components/ui/marquee";
import { techItems } from "@/data/technologies";

export function TechMarqueeStrip() {
  return (
    <Marquee durationSeconds={38} gapClassName="gap-4">
      {techItems.map((item) => (
        <span
          key={item.id}
          className="flex shrink-0 items-center gap-2.5 rounded-full border border-border-strong bg-surface-raised px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted"
        >
          <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          {item.label}
        </span>
      ))}
    </Marquee>
  );
}
