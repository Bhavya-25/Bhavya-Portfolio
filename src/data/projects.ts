// PLACEHOLDER DATASET.
// These entries exist only so the Selected Work UI has something real to render
// against while the actual project archive is being assembled. Nothing here is
// fabricated business data — descriptions are intentionally generic and every
// `liveUrl` is null until a verified project is swapped in. Replace entries in
// place; components read this file, never hardcode project content.

export type ProjectCategory =
  | "Full Stack"
  | "Web"
  | "Mobile"
  | "Shopify"
  | "WordPress"
  | "UI/UX";

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  description: string;
  /** One-line summary of what this category of engagement typically involves — generic on purpose. */
  challenge: string;
  /** Ordered, generic process notes for the detail page's Approach section. */
  approach: string[];
  highlights: string[];
  technologies: string[];
  liveUrl: string | null;
  designUrl: string | null;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    id: "proj-01",
    slug: "placeholder-product-platform",
    title: "Product Platform",
    category: "Full Stack",
    description: "A full-stack web application placeholder — swap in a real case study.",
    challenge:
      "This slot is reserved for a full-stack engagement: a product that needed a real backend, not just a marketing front end — data modelling, auth, and an API layer built to last past the first version.",
    approach: [
      "Scope the data model and API surface before any UI work starts.",
      "Build the backend and frontend together, not in sequence, so integration issues surface early.",
      "Ship a deployable version early, then iterate against real usage.",
    ],
    highlights: [],
    technologies: ["Next.js", "TypeScript", "Node.js"],
    liveUrl: null,
    designUrl: null,
    image: "/projects/placeholder-01.svg",
    featured: true,
  },
  {
    id: "proj-02",
    slug: "placeholder-commerce-storefront",
    title: "Commerce Storefront",
    category: "Shopify",
    description: "A Shopify storefront placeholder — swap in a real case study.",
    challenge:
      "This slot is reserved for a Shopify engagement: a storefront that needed to look custom, load fast, and stay manageable by a merchant who isn't a developer.",
    approach: [
      "Audit the product catalog and checkout flow for friction before touching theme code.",
      "Build a custom theme instead of stacking apps on a generic one.",
      "Hand off with a content model the merchant can actually maintain.",
    ],
    highlights: [],
    technologies: ["Shopify", "Liquid", "React"],
    liveUrl: null,
    designUrl: null,
    image: "/projects/placeholder-02.svg",
    featured: true,
  },
  {
    id: "proj-03",
    slug: "placeholder-mobile-app",
    title: "Mobile Application",
    category: "Mobile",
    description: "A cross-platform mobile app placeholder — swap in a real case study.",
    challenge:
      "This slot is reserved for a cross-platform mobile engagement: one codebase that needed to feel genuinely native on both iOS and Android, not like a web view in a shell.",
    approach: [
      "Prototype the core interaction on-device early — simulators hide real performance issues.",
      "Share business logic across platforms, keep native modules for what actually needs them.",
      "Test on real hardware across a spread of devices, not just the newest phone.",
    ],
    highlights: [],
    technologies: ["React Native", "TypeScript"],
    liveUrl: null,
    designUrl: null,
    image: "/projects/placeholder-03.svg",
    featured: true,
  },
  {
    id: "proj-04",
    slug: "placeholder-design-system",
    title: "Product Design System",
    category: "UI/UX",
    description: "A design-system and prototyping placeholder — swap in a real case study.",
    challenge:
      "This slot is reserved for a design-systems engagement: a product with inconsistent UI across screens that needed a shared component language before it could scale.",
    approach: [
      "Audit existing screens for real inconsistencies, not a wishlist of new patterns.",
      "Build the component library in code, not just as static design files.",
      "Document usage rules so the system holds up after handoff.",
    ],
    highlights: [],
    technologies: ["Figma", "React", "Storybook"],
    liveUrl: null,
    designUrl: null,
    image: "/projects/placeholder-04.svg",
    featured: true,
  },
  {
    id: "proj-05",
    slug: "placeholder-content-site",
    title: "Content Platform",
    category: "WordPress",
    description: "A WordPress content platform placeholder — swap in a real case study.",
    challenge:
      "This slot is reserved for a WordPress engagement: a content-heavy site that needed a custom editing experience matched to how the team actually publishes.",
    approach: [
      "Map the real editorial workflow before choosing a page-builder or ACF structure.",
      "Build custom fields and templates around that workflow, not a generic blog layout.",
      "Optimize for editor experience as much as visitor experience.",
    ],
    highlights: [],
    technologies: ["WordPress", "PHP", "Advanced Custom Fields"],
    liveUrl: null,
    designUrl: null,
    image: "/projects/placeholder-05.svg",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Next project in the archive, wrapping around at the end. */
export function getNextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}
