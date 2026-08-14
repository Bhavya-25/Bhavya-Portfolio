"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./project-card";
import { ProjectProgress } from "./project-progress";
import type { Project } from "@/data/projects";

// Fraction of one project-step reserved at the end so the final card visibly
// settles before the pin releases, instead of unpinning the instant it
// becomes active.
const HOLD_STEPS = 0.35;

interface StackConfig {
  /** Scroll distance per project transition, as a fraction of viewport height. */
  perStepVh: number;
}

const DESKTOP_CONFIG: StackConfig = { perStepVh: 95 };
const MOBILE_CONFIG: StackConfig = { perStepVh: 70 };

export function ProjectStack({ projects }: { projects: Project[] }) {
  const pinRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const numberRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const total = projects.length;
      const mm = gsap.matchMedia();

      const setup = (config: StackConfig) => {
        const totalSteps = total - 1 + HOLD_STEPS;

        const setters = cardRefs.current.map((el) => {
          if (!el) return null;
          return { yPercent: gsap.quickSetter(el, "yPercent") };
        });

        // Only ONE card is ever moving at a time: whichever one is currently
        // arriving. Every card that has already arrived is pinned flat at
        // yPercent 0 forever — it doesn't animate away, it just sits there
        // and gets permanently covered by whatever arrives on top of it,
        // because z-index is strictly index order (later always beats
        // earlier, no exceptions). A card that hasn't arrived yet sits
        // completely below the frame (yPercent 100, fully out of view) until
        // it's its turn. This keeps the stacking unambiguous: there is
        // never a moment where an old card's text can render above a newer
        // one, because "newer" and "on top" are the same strictly-ordered
        // relationship.
        const applyProgress = (stackProgress: number) => {
          const activeIndex = Math.min(total - 1, Math.round(stackProgress));

          projects.forEach((_, i) => {
            const setter = setters[i];
            const el = cardRefs.current[i];
            if (!setter || !el) return;

            const depth = i - stackProgress;
            let yPercent: number;

            if (depth >= 1) {
              yPercent = 100; // waiting its turn, fully below the frame
            } else if (depth >= 0) {
              yPercent = depth * 100; // currently arriving: 100 -> 0
            } else {
              yPercent = 0; // already arrived — stays put, gets covered
            }

            setter.yPercent(yPercent);
            el.style.zIndex = String(i);
            el.style.pointerEvents = i === activeIndex ? "auto" : "none";
          });

          if (numberRef.current) {
            numberRef.current.textContent = String(activeIndex + 1).padStart(2, "0");
          }
          if (lineRef.current) {
            lineRef.current.style.width = `${((activeIndex + 1) / total) * 100}%`;
          }
        };

        // Correct starting composition before any scroll happens.
        applyProgress(0);

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
            applyProgress(Math.min(total - 1, self.progress * totalSteps));
          },
        });

        return () => trigger.kill();
      };

      mm.add("(min-width: 768px)", () => setup(DESKTOP_CONFIG));
      mm.add("(max-width: 767px)", () => setup(MOBILE_CONFIG));

      return () => mm.revert();
    },
    { scope: pinRef }
  );

  return (
    <div
      ref={pinRef}
      className="relative mt-10 flex flex-col items-center md:mt-14"
    >
      <div
        className="relative w-full max-w-[1100px] overflow-hidden rounded-2xl"
        style={{ height: "clamp(420px, 64vh, 640px)" }}
      >
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>

      <ProjectProgress total={projects.length} numberRef={numberRef} lineRef={lineRef} />
    </div>
  );
}
