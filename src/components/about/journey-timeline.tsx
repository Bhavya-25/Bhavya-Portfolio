"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { journeyMilestones, type JourneyMilestoneType } from "@/data/journey";
import { EASE } from "@/lib/motion";
import { TimelineConnectorLine } from "@/components/about/timeline-connector-line";

/**
 * About's signature interaction — a horizontal-scroll pinned timeline.
 * Distinct from Home's pinned stack/capability-explorer (this one translates
 * the track sideways instead of swapping cards) and from every other page's
 * animation, per the "no repeated interaction" requirement.
 *
 * Follows the same safe pinning pattern established elsewhere in this repo
 * (ProjectStack, WhatIBuild): pin the track's own wrapper via ScrollTrigger,
 * gate desktop/mobile behavior through gsap.matchMedia, and never let an
 * ancestor of the pinned element carry a CSS transform (that combination
 * broke `position: fixed` pinning site-wide earlier — see template.tsx).
 * Mobile gets a plain vertical stack instead of a horizontal pin — dragging
 * a pinned track sideways on a touch device fights native scroll.
 */

const TYPE_LABEL: Record<JourneyMilestoneType, string> = {
  career: "Career",
  education: "Learning",
  achievement: "Achievement",
};

const TYPE_DOT: Record<JourneyMilestoneType, string> = {
  career: "bg-accent",
  education: "bg-ink-faint",
  achievement: "bg-ink",
};

export function JourneyTimeline() {
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const lineFillRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const pin = pinRef.current;
        if (!track || !pin) return;

        const distance = () => track.scrollWidth - pin.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: pin,
            start: "top 90px",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 0.5,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (lineFillRef.current) {
                lineFillRef.current.style.transform = `scaleX(${self.progress})`;
              }
            },
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      gsap.from(".journey-milestone", {
        opacity: 0,
        y: 24,
        duration: 0.6,
        ease: EASE.out,
        stagger: 0.1,
        scrollTrigger: { trigger: pinRef.current, start: "top 80%" },
      });
    },
    { scope: pinRef }
  );

  return (
    <div ref={pinRef} className="relative overflow-hidden">
      <TimelineConnectorLine ref={lineFillRef} />
      <div ref={trackRef} className="flex flex-col gap-8 md:w-max md:flex-row md:gap-6">
        {journeyMilestones.map((milestone, i) => (
          <div
            key={milestone.id}
            className="journey-milestone flex flex-col rounded-[1.75rem] border border-border bg-surface-raised/60 p-8 md:w-[340px] md:shrink-0"
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {milestone.range}
              </span>
              <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ink-muted">
                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${TYPE_DOT[milestone.type]}`} />
                {TYPE_LABEL[milestone.type]}
              </span>
            </div>
            <span className="mt-4 font-display text-4xl font-medium tracking-tight text-ink-faint">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-4 font-display text-2xl font-medium tracking-tight text-ink">
              {milestone.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              {milestone.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
