"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ParticleFieldVisual } from "@/components/three/particle-field-visual";
import { EASE } from "@/lib/motion";
import { Section } from "@/components/ui/section";

const TAGS = ["Three.js", "WebGL", "GSAP", "Interaction Design"];

export function CreativeTech() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".ct-reveal", {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: EASE.out,
        stagger: 0.08,
        scrollTrigger: { trigger: root.current, start: "top 70%" },
      });
    },
    { scope: root }
  );

  return (
    <Section
      ref={root}
      dataProgress="Beyond the Interface"
      className="relative overflow-hidden bg-[#0b0a09] text-[#f4f1ea]"
      containerClassName="relative z-10"
      backdrop={
        <>
          <div className="absolute inset-0 opacity-70">
            <ParticleFieldVisual />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0b0a09] via-transparent to-[#0b0a09]/40" />
        </>
      }
    >
        <p className="ct-reveal font-mono text-[11px] uppercase tracking-[0.14em] text-[#948d81]">
          03 / Beyond the Interface
        </p>

        <h2 className="ct-reveal mt-6 max-w-3xl font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-tight">
          The interface is code. Sometimes the code is the interface.
        </h2>

        <p className="ct-reveal mt-6 max-w-xl text-base text-[#c9c3b8] md:text-lg">
          This particle field is running in your browser right now — a small
          proof that motion and interaction aren&apos;t bolted on after the
          product is built. They&apos;re part of how I build it.
        </p>

        <div className="ct-reveal mt-10 flex flex-wrap gap-3">
          {TAGS.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#383228] px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-[#c9c3b8]"
            >
              {tag}
            </span>
          ))}
        </div>
    </Section>
  );
}
