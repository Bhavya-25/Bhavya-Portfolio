import type { ServiceIconKind } from "@/components/contact/service-icon";

export interface Resource {
  slug: string;
  title: string;
  summary: string;
  icon: ServiceIconKind;
  /** Resources that live outside /resources get an explicit href. */
  href?: string;
}

export const resources: Resource[] = [
  {
    slug: "case-studies",
    title: "Case Studies",
    summary: "How selected projects were scoped, built, and shipped.",
    icon: "code",
    href: "/projects",
  },
  {
    slug: "design-process",
    title: "Design Process",
    summary: "From problem statement to a system that scales.",
    icon: "design",
  },
  {
    slug: "development-process",
    title: "Development Process",
    summary: "Discovery through launch — six repeatable stages.",
    icon: "api",
  },
  {
    slug: "technology-stack",
    title: "Technology Stack",
    summary: "The tools I reach for, and when I don't.",
    icon: "three-d",
  },
  {
    slug: "open-source",
    title: "Open Source",
    summary: "Public work, experiments, and things worth sharing.",
    icon: "code",
  },
  {
    slug: "downloads",
    title: "Downloads",
    summary: "Templates, checklists, and starter files.",
    icon: "cms",
  },
  {
    slug: "resume",
    title: "Résumé",
    summary: "Experience, skills, and background.",
    icon: "design",
    href: "/resume",
  },
  {
    slug: "certificates",
    title: "Certificates",
    summary: "Credentials and completed programmes.",
    icon: "gauge",
  },
  {
    slug: "tech-articles",
    title: "Tech Articles",
    summary: "Writing on engineering, motion, and product.",
    icon: "search",
    href: "/blog",
  },
  {
    slug: "ui-inspiration",
    title: "UI Inspiration",
    summary: "Interface details and motion worth studying.",
    icon: "motion",
  },
];

export function getResource(slug: string): Resource | undefined {
  return resources.find((resource) => resource.slug === slug);
}

/** Resources that own a page under /resources/[slug]. */
export const resourcePages = resources.filter((resource) => !resource.href);
