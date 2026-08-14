"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { EASE } from "@/lib/motion";

const METRICS = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 50, suffix: "+", label: "Projects Delivered" },
  { value: 15, suffix: "+", label: "Clients Worked With" },
  { value: null, suffix: "Top Rated", label: "Upwork Freelancer" },
] as const;

export function StatsBand() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".stats-band-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      gsap.utils.toArray<HTMLElement>(".stats-band-value").forEach((el) => {
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
    <section
      ref={root}
      data-progress="Credibility"
      className="relative overflow-hidden border-y border-white/10 bg-[#0b0a09] px-6 py-16 text-white md:px-10 md:py-24"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center whitespace-nowrap font-display text-[14vw] font-medium leading-none text-white/[0.03]"
      >
        <span className="marquee-track flex shrink-0 gap-12" style={{ animationDuration: "26s" }}>
          <span>THE ARCHIVE THE ARCHIVE THE ARCHIVE</span>
          <span aria-hidden="true">THE ARCHIVE THE ARCHIVE THE ARCHIVE</span>
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1600px]">
        <p className="stats-band-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-white/50">
          05 / By The Numbers
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 md:mt-14 md:grid-cols-4 md:gap-8">
          {METRICS.map((metric) => (
            <div key={metric.label} className="stats-band-reveal">
              {metric.value !== null ? (
                <p
                  className="stats-band-value font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-white"
                  data-value={metric.value}
                  data-suffix={metric.suffix}
                >
                  0{metric.suffix}
                </p>
              ) : (
                <p className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium tracking-tight text-white">
                  {metric.suffix}
                </p>
              )}
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white/50">
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
