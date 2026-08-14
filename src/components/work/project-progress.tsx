import type { RefObject } from "react";

interface ProjectProgressProps {
  total: number;
  numberRef: RefObject<HTMLSpanElement | null>;
  lineRef: RefObject<HTMLDivElement | null>;
}

export function ProjectProgress({ total, numberRef, lineRef }: ProjectProgressProps) {
  return (
    <div
      aria-hidden="true"
      className="mt-6 flex w-full max-w-[1100px] items-center gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint"
    >
      <span ref={numberRef}>01</span>
      <div className="relative h-px flex-1 bg-border">
        <div
          ref={lineRef}
          className="absolute inset-y-0 left-0 bg-accent"
          style={{ width: `${100 / total}%` }}
        />
      </div>
      <span>{String(total).padStart(2, "0")}</span>
    </div>
  );
}
