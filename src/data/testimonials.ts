// PLACEHOLDER DATASET — illustrative testimonials, not real client quotes.
// Each entry is linked to a real project slug in data/projects.ts so the
// "View Project" CTA always resolves. Swap these for verified client
// testimonials before this section is treated as a source of real claims.

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  rating: number;
  quote: string;
  projectSlug: string;
  category: string;
  technologies: string[];
}

export const testimonials: Testimonial[] = [
  {
    id: "t-01",
    name: "Daniel Foster",
    role: "Founder",
    company: "Nimbus Retail Co.",
    country: "United States",
    rating: 5,
    quote:
      "Bhavya scoped the data model before writing a line of UI, which is exactly what a real product needed. The backend held up under our first real traffic spike without a single late-night fix.",
    projectSlug: "placeholder-product-platform",
    category: "Full Stack Development",
    technologies: ["Next.js", "TypeScript", "Node.js"],
  },
  {
    id: "t-02",
    name: "Priya Sharma",
    role: "Operations Lead",
    company: "Fernweh Studio",
    country: "United Kingdom",
    rating: 5,
    quote:
      "We needed a Shopify storefront that didn't feel like every other theme on the platform. Bhavya built it custom, handed it off with a content model our team could actually manage, and it's been rock solid since.",
    projectSlug: "placeholder-commerce-storefront",
    category: "Shopify Development",
    technologies: ["Shopify", "Liquid", "React"],
  },
  {
    id: "t-03",
    name: "Marcus Chen",
    role: "Product Manager",
    company: "Coastline Health",
    country: "Canada",
    rating: 5,
    quote:
      "One codebase, and it genuinely felt native on both iOS and Android — no compromise on either side. Bhavya tested on real devices throughout, not just simulators, which showed in the final polish.",
    projectSlug: "placeholder-mobile-app",
    category: "Mobile App Development",
    technologies: ["React Native", "TypeScript"],
  },
  {
    id: "t-04",
    name: "Anneke de Vries",
    role: "Design Director",
    company: "Cobalt & Finch",
    country: "Netherlands",
    rating: 5,
    quote:
      "Our UI was inconsistent across a dozen screens before this project. Bhavya audited every one of them and built an actual component library in code, not just a Figma file that would go stale in a month.",
    projectSlug: "placeholder-design-system",
    category: "UI/UX & Design Systems",
    technologies: ["Figma", "React", "Storybook"],
  },
  {
    id: "t-05",
    name: "James Okafor",
    role: "Content Lead",
    company: "Bramwell Journal",
    country: "Australia",
    rating: 5,
    quote:
      "Bhavya mapped how our editors actually publish before touching a single template, and it shows — the custom fields fit our workflow instead of forcing us into a generic blog layout.",
    projectSlug: "placeholder-content-site",
    category: "WordPress Development",
    technologies: ["WordPress", "PHP", "Advanced Custom Fields"],
  },
];
