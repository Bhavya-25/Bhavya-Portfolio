import type { CSSProperties } from "react";
import type { TechCategory, TechItem } from "@/data/technologies";
import { CategoryIcon } from "./category-icon";

// One accent (--color-accent), varying intensity per card via color-mix —
// deliberately not six different hues, matching the site's single-accent
// design system.
const SHADE_LEVELS = [16, 22, 28, 34, 40, 46];

export function TechCard({
  category,
  items,
  index,
}: {
  category: TechCategory;
  items: TechItem[];
  index: number;
}) {
  const level = SHADE_LEVELS[index % SHADE_LEVELS.length];

  return (
    <div
      className="tech-card group relative flex flex-col overflow-hidden rounded-xl border p-5 shadow-[0_0_0_0_transparent] transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_20px_36px_-22px_var(--tech-glow)]"
      data-cursor="Explore"
      style={
        {
          borderColor: `color-mix(in srgb, var(--color-accent) ${level + 14}%, var(--color-border-strong))`,
          background: `linear-gradient(160deg, color-mix(in srgb, var(--color-accent) ${level}%, var(--color-surface)) 0%, color-mix(in srgb, var(--color-accent) ${Math.round(level * 0.35)}%, var(--color-surface)) 100%)`,
          "--tech-glow": `color-mix(in srgb, var(--color-accent) ${level + 30}%, transparent)`,
        } as CSSProperties
      }
    >
      <div className="flex items-start justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink"
          style={{
            background: `color-mix(in srgb, var(--color-accent) ${level + 24}%, var(--color-surface-raised))`,
          }}
        >
          <div className="h-4 w-4">
            <CategoryIcon categoryId={category.id} />
          </div>
        </div>

        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border-strong text-ink-muted transition-[transform,border-color,color] duration-300 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent group-hover:text-accent">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
            <path
              d="M7 17 17 7M9 7h8v8"
              stroke="currentColor"
              strokeWidth={1.6}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>

      <p className="mt-4 font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">
        {category.label}
      </p>

      <ul className="mt-4 flex flex-col gap-2.5">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span className="font-display text-sm text-ink-muted">{item.label}</span>
          </li>
        ))}
      </ul>

      <span className="mt-6 font-mono text-[11px] text-ink-faint">
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
  );
}
