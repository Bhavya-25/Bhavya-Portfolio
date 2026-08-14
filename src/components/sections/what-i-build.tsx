"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { capabilities } from "@/data/capabilities";
import { EASE } from "@/lib/motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { CapabilityList } from "@/components/capability/capability-list";
import { CapabilityPreview } from "@/components/capability/capability-preview";
import { Section } from "@/components/ui/section";

const HOLD_STEPS = 0.35;
const DESKTOP_CONFIG = { perStepVh: 70 };
const MOBILE_CONFIG = { perStepVh: 55 };

export function WhatIBuild() {
  const root = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useGSAP(
    () => {
      gsap.from(".wib-heading", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: { trigger: root.current, start: "top 75%" },
      });

      const total = capabilities.length;
      const mm = gsap.matchMedia();

      const setup = (config: { perStepVh: number }) => {
        const totalSteps = total - 1 + HOLD_STEPS;

        const trigger = ScrollTrigger.create({
          trigger: pinRef.current,
          start: "top 90px",
          end: () => `+=${totalSteps * config.perStepVh * (window.innerHeight / 100)}`,
          pin: true,
          scrub: 0.4,
          snap: {
            snapTo: 1 / totalSteps,
            duration: { min: 0.15, max: 0.4 },
            ease: "power1.inOut",
          },
          onUpdate: (self) => {
            const stackProgress = Math.min(total - 1, self.progress * totalSteps);
            const nextIndex = Math.round(stackProgress);
            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        });

        triggerRef.current = trigger;
        return () => {
          trigger.kill();
          triggerRef.current = null;
        };
      };

      mm.add("(min-width: 768px)", () => setup(DESKTOP_CONFIG));
      mm.add("(max-width: 767px)", () => setup(MOBILE_CONFIG));

      return () => mm.revert();
    },
    { scope: root }
  );

  const handleSelect = (index: number) => {
    const trigger = triggerRef.current;
    if (!trigger) return;
    const totalSteps = capabilities.length - 1 + HOLD_STEPS;
    const target = trigger.start + (index / totalSteps) * (trigger.end - trigger.start);
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <Section id="services" ref={root} dataProgress="What I Build">
        <div className="wib-heading flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              04 / What I Build
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight text-ink">
              Everything your product needs.
              <br />
              Designed. Engineered. Shipped.
            </h2>
          </div>
          <p className="max-w-sm text-sm text-ink-muted">
            Six ways I plug into a product, from the first wireframe to the
            deployed build. Scroll to move through them.
          </p>
        </div>

        <div ref={pinRef} className="relative mt-10 md:mt-14">
          {isDesktop ? (
            <div className="grid grid-cols-12 gap-12 lg:gap-16">
              <div className="col-span-5">
                <CapabilityList
                  capabilities={capabilities}
                  activeIndex={activeIndex}
                  onSelect={handleSelect}
                />
              </div>
              <div className="col-span-7">
                <CapabilityPreview capability={capabilities[activeIndex]} />
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
                <span className="text-accent">{capabilities[activeIndex].index}</span>
                <span className="text-ink">{capabilities[activeIndex].title}</span>
                <span className="ml-auto">{String(capabilities.length).padStart(2, "0")}</span>
              </div>
              <div className="relative mt-3 h-px w-full bg-border">
                <div
                  className="absolute inset-y-0 left-0 bg-accent transition-[width] duration-300 ease-out"
                  style={{
                    width: `${((activeIndex + 1) / capabilities.length) * 100}%`,
                  }}
                />
              </div>
              <div className="mt-8">
                <CapabilityPreview capability={capabilities[activeIndex]} />
              </div>
            </div>
          )}
        </div>
    </Section>
  );
}
