"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { storyBeats } from "@/data/story";

const BEAT_COUNT = storyBeats.length;
const VH_PER_BEAT = 70;

/**
 * The second (and last) pinned section on this page — a vertical
 * scroll-scrubbed sequence, mechanically distinct from Section 4's
 * horizontal drag-track: here the pin holds still and the CONTENT
 * substitutes underneath it, rather than a track translating sideways.
 *
 * Pin-safety (see template.tsx): only opacity/scaleY/strokeDashoffset
 * animate here — nothing that would leave a transform on an ancestor of
 * the pinned element. Desktop-only pin via gsap.matchMedia; mobile gets a
 * plain stacked read (dragging a pinned stage vertically fights native
 * scroll on touch, same reasoning as journey-timeline.tsx's horizontal
 * pin).
 */
export function StoryScrollytelling() {
  const pinRef = useRef<HTMLDivElement>(null);
  const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const drawRef = useRef<SVGPathElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const pin = pinRef.current;
        const path = drawRef.current;
        if (!pin) return;

        const pathLength = path?.getTotalLength() ?? 0;
        if (path) {
          path.style.strokeDasharray = `${pathLength}`;
          path.style.strokeDashoffset = `${pathLength}`;
        }

        const setActive = (index: number) => {
          beatRefs.current.forEach((el, i) => {
            if (!el) return;
            el.style.opacity = i === index ? "1" : "0";
            el.style.transform = i === index ? "translateY(0px)" : `translateY(${i < index ? "-12px" : "12px"})`;
            el.style.pointerEvents = i === index ? "auto" : "none";
          });
          dotRefs.current.forEach((dot, i) => {
            if (!dot) return;
            dot.style.backgroundColor = i <= index ? "var(--color-accent)" : "var(--color-border-strong)";
            dot.style.transform = i === index ? "scale(1.4)" : "scale(1)";
          });
        };

        setActive(0);

        const st = gsap.to(
          {},
          {
            scrollTrigger: {
              trigger: pin,
              start: "top 90px",
              end: `+=${VH_PER_BEAT * BEAT_COUNT}vh`,
              pin: true,
              scrub: 0.4,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (path) {
                  path.style.strokeDashoffset = `${pathLength * (1 - self.progress)}`;
                }
                const index = Math.min(BEAT_COUNT - 1, Math.floor(self.progress * BEAT_COUNT));
                setActive(index);
              },
            },
          }
        );

        return () => st.scrollTrigger?.kill();
      });
    },
    { scope: pinRef }
  );

  return (
    <div ref={pinRef} className="relative overflow-hidden bg-[#0b0a09] px-6 py-20 text-white md:px-10">
      <div className="mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-16 md:min-h-[70vh] md:grid-cols-[auto_minmax(0,1fr)_minmax(0,0.9fr)]">
        {/* Dot rail — tracks which beat is active */}
        <div className="hidden flex-col items-center gap-3 md:flex" aria-hidden="true">
          {storyBeats.map((beat, i) => (
            <span
              key={beat.id}
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              className="h-2 w-2 rounded-full bg-border-strong transition-transform duration-300 ease-out"
              style={{ backgroundColor: "var(--color-border-strong)" }}
            />
          ))}
        </div>

        {/* Text stage — all beats stacked, crossfaded via opacity */}
        <div className="relative flex flex-col gap-8 md:min-h-[280px]">
          {storyBeats.map((beat, i) => (
            <div
              key={beat.id}
              ref={(el) => {
                beatRefs.current[i] = el;
              }}
              className="story-beat md:absolute md:inset-0 md:flex md:flex-col md:justify-center"
              style={{ transition: "opacity 0.5s ease-out, transform 0.5s ease-out" }}
            >
              {/* Hardcoded dark-mode accent (#ff7a42), not the theme-aware
                  text-accent class: this section's background is always
                  dark (bg-[#0b0a09]) regardless of the site's light/dark
                  theme toggle, but text-accent resolves to the *theme's*
                  accent — in light mode that's #b44618, tuned for a light
                  background, which only clears 3.6:1 here (axe-confirmed
                  WCAG AA failure). #ff7a42 is the value already verified
                  to pass against this exact background elsewhere in the
                  design tokens. */}
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-[#ff7a42]">
                {beat.eyebrow}
              </p>
              <h3 className="mt-4 max-w-lg font-display text-2xl font-medium leading-[1.2] tracking-tight text-white md:text-3xl">
                {beat.headline}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60 md:text-base">
                {beat.body}
              </p>
            </div>
          ))}
        </div>

        {/* Visual stage — a single line drawing itself in across the whole
            sequence, rather than six discrete shapes swapping in and out. */}
        <div aria-hidden="true" className="hidden md:block">
          <svg viewBox="0 0 320 320" className="h-auto w-full max-w-sm">
            <path
              ref={drawRef}
              d="M40 260 C 60 180, 40 140, 90 110 C 140 80, 120 40, 180 40 C 230 40, 220 90, 260 100 C 300 110, 300 160, 270 190 C 240 220, 260 260, 220 280 C 180 300, 150 270, 110 280 C 70 290, 50 280, 40 260 Z"
              fill="none"
              stroke="#ff7a42"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
