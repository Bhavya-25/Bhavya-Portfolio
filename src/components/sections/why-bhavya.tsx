"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SectionHeading } from "@/components/ui/section-heading";
import { usps } from "@/data/usps";
import { EASE } from "@/lib/motion";
import { FeatureGrid } from "@/components/why/feature-grid";
import { ProcessLayout } from "@/components/why/process-layout";
import { Section } from "@/components/ui/section";

// One continuous story: why work with me -> why the process works -> let's
// build something. Two numbered headers, one section, no hard break between
// them.
export function WhyBhavya() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Each numbered header reveals on its own scroll position — the second
      // header lives much further down than the first, so they can't share
      // a single early trigger.
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.8,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 80%" },
        });
      });

      gsap.utils.toArray<HTMLElement>(".feature-card").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.7,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 88%" },
        });
      });

      gsap.from(".medallion-wrap", {
        opacity: 0,
        scale: 0.85,
        duration: 0.8,
        ease: EASE.out,
        scrollTrigger: { trigger: ".medallion-wrap", start: "top 85%" },
      });

      gsap.utils.toArray<HTMLElement>(".process-card").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 24,
          duration: 0.6,
          ease: EASE.out,
          scrollTrigger: { trigger: el, start: "top 90%" },
        });
      });

      gsap.from(".process-hero-card", {
        opacity: 0,
        scale: 0.97,
        duration: 0.9,
        ease: EASE.out,
        scrollTrigger: { trigger: ".process-hero-card", start: "top 85%" },
      });
    },
    { scope: root }
  );

  return (
    <Section id="about" ref={root} dataProgress="Why Work With Me">
        <SectionHeading
          index="06"
          label="Why Work With Me"
          title={
            <>
              Design and engineering aren&apos;t separate disciplines here —
              they&apos;re the same act of building something that works.
            </>
          }
          description="I move between product thinking, interface design, and production code without handing off between them. That means fewer translation errors between what's designed and what's shipped."
        />

        <FeatureGrid usps={usps} />

        <div className="mt-10 md:mt-14">
          <SectionHeading
            index="07"
            label="How I Work"
            title="A repeatable process, not a one-off effort"
            description="The depth of each stage depends on the project, but the order stays the same — six steps from a rough idea to something live."
          />

          <ProcessLayout />
        </div>
    </Section>
  );
}
