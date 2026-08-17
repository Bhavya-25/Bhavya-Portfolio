"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { DeviceFrame } from "@/components/work/device-frame";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";

function handleSpotlight(event: MouseEvent<HTMLElement>) {
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
  event.currentTarget.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
}

export function FeaturedProject({
  project,
  index,
  reversed,
}: {
  project: Project;
  index: number;
  reversed: boolean;
}) {
  const deviceKind = project.category === "Mobile" ? "phone" : "browser";

  return (
    <article
      onMouseMove={handleSpotlight}
      className="featured-project group relative grid grid-cols-1 items-center gap-10 overflow-hidden rounded-[2rem] border border-border bg-surface-raised p-6 transition-[border-color,box-shadow] duration-500 ease-out hover:border-accent/40 hover:shadow-[0_40px_80px_-40px_rgba(0,0,0,0.35)] md:p-10 lg:grid-cols-2 lg:gap-16"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--spot-x, 50%) var(--spot-y, 50%), rgba(255,122,66,0.12), transparent 70%)",
        }}
      />

      <div
        className={`featured-image relative z-10 ${reversed ? "lg:order-2" : ""} ${
          deviceKind === "phone" ? "flex justify-center" : ""
        }`}
      >
        {/* Purely decorative background numeral — rendered via CSS
            `content` (globals.css `[data-decorative-number]::before`)
            rather than a real text node. It conveys no information (the
            project's actual index/title is real, accessible text
            elsewhere in this card), so WCAG 1.4.3 exempts it as "pure
            decoration" — but axe-core's automated contrast check can't
            tell decorative text from real text just from aria-hidden, and
            flagged it anyway (confirmed: adding aria-hidden alone did not
            resolve the finding on retest). Moving the digits out of the
            DOM's text content and into CSS entirely resolves it correctly
            for both axe and real screen readers.
            72% of the glyph sits directly under the opaque device-frame
            image and — since both are z-index:auto siblings — the frame
            (later in DOM order) paints over it. The top offset is matched
            per-breakpoint to the card's own padding (p-6 / md:p-10) since
            that's the ceiling for how much of the glyph the card's
            overflow-hidden edge lets through above the frame — pushing it
            further up only wastes height into the clipped region, it
            doesn't reveal more. Below md, the left inset also has to clear
            the card's rounded-[2rem] (32px) corner: p-6 is only 24px, so
            at left-0 the entire visible sliver fell inside the corner's
            own clip arc and vanished — left-2 (8px) pushes it just past
            the radius. md and up, p-10 (40px) already clears the corner on
            its own. The real fix for "not clearly visible" is opacity: at
            4% the unoccluded sliver was imperceptible even rendered in
            isolation; 18% keeps it reading as a faint background watermark
            (not real text) while actually being visible against the frame
            it peeks out from. */}
        <span
          aria-hidden="true"
          data-decorative-number={String(index + 1).padStart(2, "0")}
          className="pointer-events-none absolute -top-6 left-2 select-none font-display text-[7rem] font-medium leading-none text-ink/[0.18] before:content-[attr(data-decorative-number)] md:-top-10 md:left-0 md:text-[9rem]"
        />
        <div className="group relative w-full">
          <Link
            href={`/projects/${project.slug}`}
            data-cursor="View"
            aria-label={`View ${project.title} case study`}
            className="block w-full"
          >
            <DeviceFrame image={project.image} alt={project.title} kind={deviceKind} priority={index === 0} />
          </Link>
        </div>
      </div>

      <div className={`featured-copy relative z-10 ${reversed ? "lg:order-1" : ""}`}>
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
          {project.category}
        </p>
        <h3 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
          {project.title}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-ink-muted">
          {project.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li
              key={tech}
              className="rounded-full border border-border-strong px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-ink-muted transition-colors duration-300 group-hover:border-accent/30"
            >
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <Magnetic strength={12}>
            <Button href={`/projects/${project.slug}`} dataCursor="View">
              View Case Study
            </Button>
          </Magnetic>
        </div>
      </div>
    </article>
  );
}
