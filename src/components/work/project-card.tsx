import { forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

// Full-bleed image with the metadata overlaid on a gradient scrim, rather
// than a separate image+footer layout — during the scroll-driven transition
// the whole card slides as one visual unit, so there's no internal seam for
// an incoming card's text to awkwardly straddle across an outgoing card's
// image.
export const ProjectCard = forwardRef<HTMLElement, ProjectCardProps>(
  function ProjectCard({ project, index, total }, ref) {
    return (
      <article
        ref={ref}
        className="project-card absolute inset-0 overflow-hidden rounded-2xl border border-border bg-surface-raised shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)]"
        data-cursor="View"
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          className="object-cover"
          sizes="(min-width: 768px) 70vw, 92vw"
          priority={index === 0}
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
        />

        <div className="absolute inset-x-0 bottom-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-8">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.08em] text-white/60">
              {String(index + 1).padStart(2, "0")} / {project.category}
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/70">{project.description}</p>
            <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1">
              {project.technologies.map((tech) => (
                <li
                  key={tech}
                  className="font-mono text-[10px] uppercase tracking-[0.06em] text-white/60"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0">
            <Link
              href={`/projects/${project.slug}`}
              className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:text-accent"
            >
              View Case Study
              <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </div>

        <span className="sr-only">
          Project {index + 1} of {total}
        </span>
      </article>
    );
  }
);
