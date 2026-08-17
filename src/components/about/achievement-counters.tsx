"use client";

import { useCounter } from "@/hooks/useCounter";

// Same honest figures used by Home's Stats and the old achievements-section
// — no new unverified claims (a "100% satisfaction" stat was considered and
// dropped; it doesn't exist anywhere else on the site).
const RING_STATS = [
  { id: "projects", target: 50, suffix: "+", label: "Projects Delivered", ringPct: 92 },
  { id: "clients", target: 15, suffix: "+", label: "Clients Worked With", ringPct: 78 },
  { id: "years", target: 4, suffix: "+", label: "Years in Practice", ringPct: 65 },
];

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function RingCounter({ target, suffix, label, ringPct }: (typeof RING_STATS)[number]) {
  const ref = useCounter<HTMLSpanElement>(target, (n) => `${n}${suffix}`);

  return (
    <div className="flex flex-col items-center gap-5 p-8 text-center">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="var(--color-border)" strokeWidth="4" />
          <circle
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            stroke="var(--color-accent)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={CIRCUMFERENCE * (1 - ringPct / 100)}
          />
        </svg>
        <span
          ref={ref}
          className="absolute inset-0 flex items-center justify-center font-display text-2xl font-medium tracking-tight text-ink"
        >
          0
        </span>
      </div>
      <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">{label}</p>
    </div>
  );
}

export function AchievementCounters() {
  return (
    <div className="flex flex-col divide-y divide-border rounded-[1.75rem] border border-border bg-surface-raised sm:flex-row sm:divide-x sm:divide-y-0">
      {RING_STATS.map((stat) => (
        <div key={stat.id} className="flex-1">
          <RingCounter {...stat} />
        </div>
      ))}
      <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center">
        <p className="font-display text-2xl font-medium tracking-tight text-ink">Top Rated</p>
        <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
          Upwork Freelancer
        </p>
      </div>
    </div>
  );
}
