"use client";

import { useRef, useState, type TouchEvent } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { testimonials } from "@/data/testimonials";
import { TestimonialAvatar } from "./testimonial-avatar";
import { Star } from "./star-rating";
import { EASE } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const SWIPE_THRESHOLD_PX = 50;

export function TestimonialShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const root = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  const active = testimonials[activeIndex];
  const total = testimonials.length;

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".testimonial-blob", {
        opacity: 0,
        scale: 0.85,
        duration: 0.6,
        ease: EASE.out,
      })
        .fromTo(
          ".testimonial-avatar-wrap",
          { opacity: 0, scale: 0.85, rotate: -4 },
          { opacity: 1, scale: 1, rotate: 0, duration: 0.5, ease: EASE.out },
          "-=0.4"
        )
        .from(
          ".testimonial-identity > *",
          { opacity: 0, y: 12, duration: 0.4, ease: EASE.out, stagger: 0.05 },
          "-=0.3"
        )
        .from(
          ".testimonial-star",
          { opacity: 0, scale: 0.4, duration: 0.3, ease: EASE.out, stagger: 0.04 },
          "-=0.25"
        )
        .from(
          ".testimonial-quote-line",
          { opacity: 0, y: 16, duration: 0.5, ease: EASE.out, stagger: 0.06 },
          "-=0.2"
        )
        .from(
          ".testimonial-meta > *",
          { opacity: 0, y: 10, duration: 0.35, ease: EASE.out, stagger: 0.04 },
          "-=0.25"
        );

      // Ambient blobs drift to a new resting position each time the
      // testimonial changes — subtle background motion, not a redraw.
      if (!prefersReducedMotion) {
        gsap.to(".testimonial-blob-1", {
          x: (activeIndex % 3) * 18 - 18,
          y: (activeIndex % 2) * 14,
          duration: 1.4,
          ease: EASE.out,
        });
        gsap.to(".testimonial-blob-2", {
          x: -((activeIndex % 3) * 16 - 16),
          y: -((activeIndex % 2) * 12),
          duration: 1.6,
          ease: EASE.out,
        });
      }
    },
    { scope: root, dependencies: [active.id], revertOnUpdate: true }
  );

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    if (delta > SWIPE_THRESHOLD_PX) goTo(activeIndex - 1);
    else if (delta < -SWIPE_THRESHOLD_PX) goTo(activeIndex + 1);
  };

  return (
    <div
      ref={root}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative overflow-hidden rounded-[2rem] border border-border bg-surface-raised/60 p-8 shadow-[0_40px_80px_-40px_rgba(0,0,0,0.25)] backdrop-blur-md md:p-12 lg:p-14"
    >
      <div
        aria-hidden="true"
        className="testimonial-blob testimonial-blob-1 pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="testimonial-blob testimonial-blob-2 pointer-events-none absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-accent/[0.06] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="relative z-10 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.6fr)] lg:gap-16">
        {/* Client identity */}
        <div>
          <div className="testimonial-avatar-wrap">
            <TestimonialAvatar name={active.name} size={72} />
          </div>

          <div className="testimonial-identity mt-6">
            <p className="font-display text-xl font-medium tracking-tight text-ink">
              {active.name}
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              {active.role}, {active.company}
            </p>
            <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-faint">
              {active.country}
            </p>
          </div>

          <div
            className="mt-5 flex items-center gap-1"
            role="img"
            aria-label={`${active.rating} out of 5 stars`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className="testimonial-star block h-4 w-4">
                <Star fill={Math.max(0, Math.min(1, active.rating - i))} />
              </span>
            ))}
          </div>
        </div>

        {/* Quote + project meta */}
        <div className="flex flex-col justify-between">
          <div>
            <svg
              viewBox="0 0 32 24"
              className="h-8 w-8 text-accent/40"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M0 24V14.4C0 6.4 4.8 1.2 12.8 0l1.6 4.8C9.6 6 7.2 8.8 6.8 12.8H14V24H0Zm17.6 0V14.4c0-8 4.8-13.2 12.8-14.4l1.6 4.8c-4.8 1.2-7.2 4-7.6 8h7.2V24H17.6Z" />
            </svg>

            <blockquote className="mt-4 overflow-hidden">
              <span className="testimonial-quote-line block font-display text-2xl font-medium leading-[1.35] tracking-tight text-ink md:text-3xl">
                &ldquo;{active.quote}&rdquo;
              </span>
            </blockquote>
          </div>

          <div className="testimonial-meta mt-8 flex flex-wrap items-center gap-x-8 gap-y-5 border-t border-border pt-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-faint">
                Project
              </p>
              <p className="mt-1.5 text-sm text-ink">{active.category}</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {active.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border-strong px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-muted"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Link
              href={`/projects/${active.projectSlug}`}
              data-cursor="View"
              className="group ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors duration-300 ease-out hover:text-accent"
            >
              View Project
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="relative z-10 mt-10 flex items-center justify-between border-t border-border pt-6">
        <div className="flex items-center gap-2">
          {testimonials.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show testimonial from ${item.name}`}
              aria-current={i === activeIndex}
              className="group flex h-6 w-6 items-center justify-center"
            >
              <span
                className="block h-1.5 rounded-full bg-border-strong transition-[width,background-color] duration-300 ease-out group-hover:bg-accent/60"
                style={{
                  width: i === activeIndex ? 24 : 6,
                  backgroundColor: i === activeIndex ? "var(--color-accent)" : undefined,
                }}
              />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => goTo(activeIndex - 1)}
            aria-label="Previous testimonial"
            data-cursor="Prev"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-ink transition-[border-color,color,transform] duration-300 ease-out hover:-translate-x-0.5 hover:border-accent hover:text-accent"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => goTo(activeIndex + 1)}
            aria-label="Next testimonial"
            data-cursor="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-ink transition-[border-color,color,transform] duration-300 ease-out hover:translate-x-0.5 hover:border-accent hover:text-accent"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
