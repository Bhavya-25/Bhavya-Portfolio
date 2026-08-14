"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";

// The same honest facts used in Home's Stats bar, deliberately not repeated
// with fabricated additions (awards, certifications) that aren't real —
// framed here as milestones in a single editorial row instead of Stats'
// 4-column counter grid, so the two pages don't feel like reskins.
const MILESTONES = [
  { value: "50+", label: "Projects delivered" },
  { value: "4+", label: "Years in practice" },
  { value: "15+", label: "Clients worked with" },
  { value: "Top Rated", label: "Upwork freelancer" },
];

export function AchievementsSection() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".milestone-item", {
        opacity: 0,
        scale: 0.94,
        duration: 0.5,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root }
  );

  return (
    <div
      ref={root}
      className="flex flex-col divide-y divide-border rounded-[1.75rem] border border-border bg-surface-raised sm:flex-row sm:divide-x sm:divide-y-0"
    >
      {MILESTONES.map((m) => (
        <div key={m.label} className="milestone-item flex-1 p-8 text-center md:p-10">
          <p className="font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
            {m.value}
          </p>
          <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
            {m.label}
          </p>
        </div>
      ))}
    </div>
  );
}
