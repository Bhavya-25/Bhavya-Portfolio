import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { ProjectGallery } from "@/components/work/project-gallery";
import { projects, getProject, getNextProject } from "@/data/projects";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getNextProject(slug);

  return (
    <>
      {/* 1. Hero */}
      <PageHero
        eyebrow={project.category}
        title={project.title}
        description={project.description}
        breadcrumbs={[
          { label: "Projects", href: "/projects" },
          { label: project.title, href: `/projects/${project.slug}` },
        ]}
        actions={
          project.liveUrl ? (
            <Button href={project.liveUrl} target="_blank" rel="noreferrer">
              Visit Live Site
            </Button>
          ) : (
            <Button href="/contact">Start a similar project</Button>
          )
        }
      />

      {/* 2. Overview — full-bleed hero image */}
      <Section className="pt-0">
        <div className="relative h-[45vh] min-h-[320px] w-full overflow-hidden rounded-[1.75rem] border border-border">
          <Image
            src={project.image}
            alt={`${project.title} preview`}
            fill
            className="object-cover"
            priority
          />
        </div>
      </Section>

      {/* 3. Challenge */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            The Brief
          </p>
          <p className="max-w-2xl font-display text-xl font-medium leading-[1.4] tracking-tight text-ink md:text-2xl">
            {project.challenge}
          </p>
        </div>
      </Section>

      {/* 4. Approach */}
      <Section className="pt-0">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr] md:gap-16">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Approach
          </p>
          <ol className="flex flex-col gap-6">
            {project.approach.map((step, i) => (
              <li key={i} className="flex gap-5 border-b border-border pb-6 last:border-0">
                <span className="shrink-0 font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-base text-ink-muted md:text-lg">{step}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* 5. Gallery */}
      <Section className="pt-0">
        <ProjectGallery image={project.image} title={project.title} />
      </Section>

      {/* 6. Technology stack */}
      <Section className="pt-0">
        <div className="flex flex-col gap-6 border-y border-border py-8 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Built With
          </p>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full border border-border-strong px-4 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* 7. Next project */}
      <Section className="pt-0">
        <Link
          href={`/projects/${next.slug}`}
          className="group flex flex-col gap-6 rounded-[1.75rem] border border-border bg-surface-raised p-8 transition-[border-color] duration-300 ease-out hover:border-accent md:flex-row md:items-center md:justify-between md:p-12"
        >
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
              Next Project
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium tracking-tight text-ink md:text-4xl">
              {next.title}
            </h2>
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink transition-colors duration-300 ease-out group-hover:text-accent">
            View Project
            <span className="transition-transform duration-300 ease-out group-hover:translate-x-1">
              →
            </span>
          </span>
        </Link>
      </Section>
    </>
  );
}
