import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";

// Shown when the visitor prefers reduced motion — same project content,
// same order, no pinning or scroll-driven transforms. Just a plain stacked
// list that scrolls normally. Same full-bleed card visual as the animated
// stack, for consistency.
export function ProjectListFallback({ projects }: { projects: Project[] }) {
  return (
    <div className="mt-10 flex flex-col gap-10 md:mt-14">
      {projects.map((project, index) => (
        <article
          key={project.id}
          className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-border bg-surface-raised transition-[transform,border-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_32px_64px_-32px_rgba(0,0,0,0.4)]"
          data-cursor="View"
        >
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
            sizes="(min-width: 768px) 70vw, 92vw"
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
                className="font-mono text-[11px] uppercase tracking-[0.08em] text-white transition-colors duration-300 hover:text-accent"
              >
                View Case Study →
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
