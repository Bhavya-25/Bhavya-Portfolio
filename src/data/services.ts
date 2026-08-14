import type { ServiceIconKind } from "@/components/contact/service-icon";

export type ServiceGroup =
  | "Engineering"
  | "Design"
  | "Mobile"
  | "Creative"
  | "Platforms"
  | "Growth";

export interface Service {
  slug: string;
  title: string;
  /** Short label used by the footer marquee. */
  marqueeTitle?: string;
  /** One line for mega-menu rows and card subtitles. */
  summary: string;
  /** Longer positioning line for the service page hero. */
  intro: string;
  icon: ServiceIconKind;
  group: ServiceGroup;
  stack: string[];
}

export const serviceGroups: ServiceGroup[] = [
  "Engineering",
  "Design",
  "Mobile",
  "Creative",
  "Platforms",
  "Growth",
];

export const services: Service[] = [
  // ── Engineering ──────────────────────────────────────────────────────────
  {
    slug: "full-stack-development",
    title: "Full Stack Development",
    summary: "End-to-end product builds, owned by one person.",
    intro:
      "Frontend, backend, and the API layer between them — architected, built, and deployed without hand-offs between specialists.",
    icon: "code",
    group: "Engineering",
    stack: ["Next.js", "React", "Node.js", "TypeScript", "PostgreSQL"],
  },
  {
    slug: "nextjs-development",
    title: "Next.js Development",
    summary: "App Router products built for speed and SEO.",
    intro:
      "Server components, streaming, and route-level caching used deliberately — not as defaults, but where they actually change what a user feels.",
    icon: "code",
    group: "Engineering",
    stack: ["Next.js", "App Router", "React Server Components", "Vercel"],
  },
  {
    slug: "react-development",
    title: "React Development",
    summary: "Component architecture that survives the second year.",
    intro:
      "Interfaces built as systems — predictable state, composable components, and boundaries that hold up when the product grows.",
    icon: "code",
    group: "Engineering",
    stack: ["React", "TypeScript", "State management", "Testing"],
  },
  {
    slug: "nodejs-backend",
    title: "Node.js Backend",
    summary: "Services designed around how the product actually runs.",
    intro:
      "Typed APIs, sensible data modelling, and background work that fails loudly instead of silently.",
    icon: "api",
    group: "Engineering",
    stack: ["Node.js", "TypeScript", "REST", "PostgreSQL", "Auth"],
  },
  {
    slug: "api-integration",
    title: "API Integration",
    summary: "Third-party systems wired in without brittleness.",
    intro:
      "Payments, auth, CRMs, and internal services connected with retries, typed contracts, and failure states designed on purpose.",
    icon: "api",
    group: "Engineering",
    stack: ["REST", "GraphQL", "Webhooks", "Stripe", "OAuth"],
  },

  // ── Design ───────────────────────────────────────────────────────────────
  {
    slug: "ui-ux-design",
    title: "UI / UX Design",
    summary: "Interfaces designed with production in mind.",
    intro:
      "Wireframed, prototyped, and built into a system that scales past the first screen — designed by the person who ships it.",
    icon: "design",
    group: "Design",
    stack: ["Figma", "Design systems", "Prototyping", "User flows"],
  },
  {
    slug: "product-design",
    title: "Product Design",
    summary: "From problem statement to shipped interface.",
    intro:
      "Shaping what the product should be before deciding what it should look like — scope, flows, and priority first.",
    icon: "design",
    group: "Design",
    stack: ["Discovery", "IA", "Prototyping", "Design systems"],
  },

  // ── Mobile ───────────────────────────────────────────────────────────────
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    summary: "Cross-platform apps that feel native.",
    intro:
      "One codebase, two platforms, without the product feeling like a website wrapped in a shell.",
    icon: "mobile",
    group: "Mobile",
    stack: ["React Native", "Flutter", "Native modules", "App Store / Play"],
  },
  {
    slug: "react-native",
    title: "React Native",
    summary: "Shared logic between iOS and Android.",
    intro:
      "The React model applied to mobile — shared components and business logic, with native escape hatches where they matter.",
    icon: "mobile",
    group: "Mobile",
    stack: ["React Native", "Expo", "TypeScript", "Native modules"],
  },
  {
    slug: "flutter",
    title: "Flutter",
    summary: "Pixel-consistent UI across platforms.",
    intro:
      "A single rendering pipeline for interfaces that need to look identical everywhere, with motion built in.",
    icon: "mobile",
    group: "Mobile",
    stack: ["Flutter", "Dart", "Custom widgets", "Animations"],
  },

  // ── Creative ─────────────────────────────────────────────────────────────
  {
    slug: "threejs-development",
    title: "Three.js Development",
    summary: "Real-time 3D that runs on a phone.",
    intro:
      "WebGL scenes built with a performance budget from the first line — not a demo that melts mid-range hardware.",
    icon: "three-d",
    group: "Creative",
    stack: ["Three.js", "React Three Fiber", "WebGL", "GLSL"],
  },
  {
    slug: "gsap-animation",
    title: "GSAP Animation",
    summary: "Motion systems, not one-off tweens.",
    intro:
      "Scroll-driven sequences and interface choreography with one shared easing language across the whole product.",
    icon: "motion",
    group: "Creative",
    stack: ["GSAP", "ScrollTrigger", "Timelines", "Reduced-motion"],
  },
  {
    slug: "creative-development",
    title: "Creative Development",
    summary: "When the interface is part of the pitch.",
    intro:
      "Motion and interaction layered onto solid engineering — for products where how it feels is the differentiator.",
    icon: "three-d",
    group: "Creative",
    stack: ["Three.js", "GSAP", "WebGL", "Canvas"],
  },

  // ── Platforms ────────────────────────────────────────────────────────────
  {
    slug: "shopify-development",
    title: "Shopify Development",
    summary: "Storefronts built for conversion and speed.",
    intro:
      "Custom themes and headless builds a merchant can actually manage day to day.",
    icon: "commerce",
    group: "Platforms",
    stack: ["Shopify", "Liquid", "Hydrogen", "Storefront API"],
  },
  {
    slug: "wordpress-development",
    title: "WordPress Development",
    summary: "Content platforms teams can run themselves.",
    intro:
      "Custom themes and editing experiences built around how the team actually publishes.",
    icon: "cms",
    group: "Platforms",
    stack: ["WordPress", "PHP", "ACF", "Headless WP"],
  },
  {
    slug: "strapi-cms",
    title: "Strapi CMS",
    summary: "Headless content modelling done properly.",
    intro:
      "Content types shaped around the product's real structure, with an API the frontend enjoys consuming.",
    icon: "cms",
    group: "Platforms",
    stack: ["Strapi", "Node.js", "REST / GraphQL", "Media pipeline"],
  },
  {
    slug: "custom-cms",
    title: "Custom CMS",
    summary: "When off-the-shelf doesn't fit the workflow.",
    intro:
      "A purpose-built editing layer for teams whose content doesn't map onto a generic post-and-page model.",
    icon: "cms",
    group: "Platforms",
    stack: ["Next.js", "Node.js", "PostgreSQL", "Role-based access"],
  },

  // ── Growth ───────────────────────────────────────────────────────────────
  {
    slug: "performance-optimization",
    title: "Performance Optimization",
    summary: "Core Web Vitals treated as a feature.",
    intro:
      "Profiling, bundle surgery, and render-path work measured against real device conditions rather than a local dev machine.",
    icon: "gauge",
    group: "Growth",
    stack: ["Lighthouse", "Core Web Vitals", "Bundle analysis", "Caching"],
  },
  {
    slug: "seo-optimization",
    title: "SEO Optimization",
    summary: "Technical SEO built into the framework.",
    intro:
      "Metadata, structured data, sitemaps, and rendering strategy handled at the architecture level, not bolted on later.",
    icon: "search",
    group: "Growth",
    stack: ["Structured data", "Sitemaps", "Metadata", "SSR / ISR"],
  },
  {
    slug: "ai-integration",
    title: "AI Integration",
    summary: "LLM features wired into real products.",
    intro:
      "Streaming responses, tool calling, and retrieval built as product features with defined failure states — not a chat box bolted to a sidebar.",
    icon: "api",
    group: "Growth",
    stack: ["Claude API", "Streaming", "RAG", "Tool use", "Vercel AI SDK"],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServicesByGroup(group: ServiceGroup): Service[] {
  return services.filter((service) => service.group === group);
}

/** Related services = same group, excluding the current one. */
export function getRelatedServices(slug: string, limit = 3): Service[] {
  const current = getService(slug);
  if (!current) return [];
  return services
    .filter((s) => s.group === current.group && s.slug !== slug)
    .slice(0, limit);
}
