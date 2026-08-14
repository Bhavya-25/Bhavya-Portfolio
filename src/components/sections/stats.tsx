"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";

const METRICS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Clients Worked With" },
  { value: null, suffix: "Top Rated", label: "Upwork" },
] as const;

export function Stats() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stats-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".metric-value").forEach((el) => {
        const target = Number(el.dataset.value ?? 0);
        if (!target) return;
        const counter = { value: 0 };
        gsap.to(counter, {
          value: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
          onUpdate: () => {
            el.textContent = `${Math.round(counter.value)}${el.dataset.suffix ?? ""}`;
          },
        });
      });
    },
    { scope: root }
  );

  return (
    <Section
      ref={root}
      dataProgress="Credibility"
      className="border-y border-border"
    >
        <p className="stats-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          01 / Credibility
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 md:gap-8">
          {METRICS.map((metric) => (
            <div key={metric.label} className="stats-reveal">
              {metric.value !== null ? (
                <p
                  className="metric-value font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-ink"
                  data-value={metric.value}
                  data-suffix={metric.suffix}
                >
                  0{metric.suffix}
                </p>
              ) : (
                <p className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-ink">
                  {metric.suffix}
                </p>
              )}
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
    </Section>
  );
}
