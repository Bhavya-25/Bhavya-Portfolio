export type CapabilityVisualKind =
  | "full-stack"
  | "ui-ux"
  | "mobile"
  | "creative"
  | "ecommerce"
  | "cms";

export interface Capability {
  id: string;
  index: string;
  title: string;
  description: string;
  technologies: string[];
  deliverables: string[];
  visual: CapabilityVisualKind;
}

export const capabilities: Capability[] = [
  {
    id: "full-stack",
    index: "01",
    title: "Full Stack Development",
    description:
      "End-to-end product builds — frontend, backend, and the API layer connecting them, owned by one person from architecture to deploy.",
    technologies: ["Next.js", "React", "Node.js", "TypeScript", "API Integration"],
    deliverables: [
      "Production-ready web application",
      "REST / GraphQL API layer",
      "Database schema & architecture",
      "Deployment & CI pipeline",
    ],
    visual: "full-stack",
  },
  {
    id: "ui-ux",
    index: "02",
    title: "UI / UX Design",
    description:
      "Interfaces designed with production in mind — wireframed, prototyped, and built into a system that scales past the first screen.",
    technologies: ["Figma", "Wireframes", "Prototypes", "Design Systems", "User Experience"],
    deliverables: [
      "Wireframes & user flows",
      "High-fidelity prototypes",
      "Component-based design system",
      "Handoff-ready specs",
    ],
    visual: "ui-ux",
  },
  {
    id: "mobile",
    index: "03",
    title: "Mobile Development",
    description:
      "Cross-platform apps that feel native, sharing logic between iOS and Android without duplicating the product.",
    technologies: ["Flutter", "React Native", "Cross Platform", "Native Performance"],
    deliverables: [
      "Cross-platform app build",
      "Native performance tuning",
      "App store deployment",
      "Shared component library",
    ],
    visual: "mobile",
  },
  {
    id: "creative",
    index: "04",
    title: "Creative Development",
    description:
      "Motion and interaction layered on solid engineering — for products where the interface itself is part of the pitch.",
    technologies: ["Three.js", "WebGL", "GSAP", "Interactive Experiences"],
    deliverables: [
      "Custom WebGL / 3D scenes",
      "Scroll-driven interaction design",
      "Motion system & animation library",
      "Performance-optimized rendering",
    ],
    visual: "creative",
  },
  {
    id: "ecommerce",
    index: "05",
    title: "Shopify & E-Commerce",
    description:
      "Custom storefronts built for conversion and speed, on a platform a merchant can actually manage day to day.",
    technologies: ["Custom Shopify", "Storefront", "Performance", "Conversion"],
    deliverables: [
      "Custom Shopify theme",
      "Storefront performance audit",
      "Checkout & conversion optimization",
      "Merchant-friendly CMS setup",
    ],
    visual: "ecommerce",
  },
  {
    id: "cms",
    index: "06",
    title: "CMS & Backend",
    description:
      "Content platforms and backend services built around how a team actually publishes and how a product actually runs.",
    technologies: ["Strapi", "WordPress", "Node.js", "Custom APIs"],
    deliverables: [
      "Headless CMS setup",
      "Custom API endpoints",
      "Content modeling",
      "Third-party integrations",
    ],
    visual: "cms",
  },
];
