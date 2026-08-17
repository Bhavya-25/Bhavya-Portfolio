"use client";

import type { PointerEvent } from "react";
import { Tooltip } from "@/components/ui/tooltip";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { ShowcaseTechItem } from "@/data/tech-showcase";

function handleGlow(event: PointerEvent<HTMLDivElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--glow-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--glow-y", `${event.clientY - rect.top}px`);
}

export function TechShowcaseCard({ item }: { item: ShowcaseTechItem }) {
  const initials = item.label
    .split(/[\s./]+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div
      onPointerMove={handleGlow}
      className="group relative overflow-hidden rounded-2xl border border-border bg-surface-raised p-5"
      style={{
        background:
          "radial-gradient(160px circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(255,122,66,0.14), transparent 70%), var(--color-surface-raised)",
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <Tooltip label={`${item.years}yr · ${item.projectsCount} projects`}>
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface font-mono text-[11px] font-medium text-ink">
            {initials}
          </span>
        </Tooltip>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-ink-faint">
          {item.years}yr
        </span>
      </div>

      <p className="mt-4 font-display text-base font-medium tracking-tight text-ink">
        {item.label}
      </p>
      <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-muted">
        {item.projectsCount} projects
      </p>

      <div className="mt-4">
        <ProgressBar value={item.level * 20} label={`${item.label} skill level`} />
      </div>
    </div>
  );
}
