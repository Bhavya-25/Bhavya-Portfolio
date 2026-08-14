export type TechCategoryId =
  | "frontend"
  | "backend"
  | "creative"
  | "mobile"
  | "design"
  | "cms";

export interface TechCategory {
  id: TechCategoryId;
  label: string;
}

export interface TechItem {
  id: string;
  label: string;
  categoryId: TechCategoryId;
}

export const techCategories: TechCategory[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "creative", label: "Creative" },
  { id: "mobile", label: "Mobile" },
  { id: "design", label: "Design" },
  { id: "cms", label: "CMS / E-Commerce" },
];

// Order within each category matches the original spec exactly — do not
// reorder or add entries.
export const techItems: TechItem[] = [
  { id: "next-js", label: "Next.js", categoryId: "frontend" },
  { id: "react", label: "React", categoryId: "frontend" },
  { id: "typescript", label: "TypeScript", categoryId: "frontend" },

  { id: "node-js", label: "Node.js", categoryId: "backend" },
  { id: "python", label: "Python", categoryId: "backend" },
  { id: "api-integration", label: "API Integration", categoryId: "backend" },

  { id: "three-js", label: "Three.js", categoryId: "creative" },
  { id: "webgl", label: "WebGL", categoryId: "creative" },
  { id: "gsap", label: "GSAP", categoryId: "creative" },

  { id: "react-native", label: "React Native", categoryId: "mobile" },
  { id: "flutter", label: "Flutter", categoryId: "mobile" },

  { id: "figma", label: "Figma", categoryId: "design" },
  { id: "ui-ux", label: "UI/UX", categoryId: "design" },
  { id: "prototyping", label: "Prototyping", categoryId: "design" },

  { id: "shopify", label: "Shopify", categoryId: "cms" },
  { id: "wordpress", label: "WordPress", categoryId: "cms" },
  { id: "strapi", label: "Strapi", categoryId: "cms" },
];

export function getCategoryItems(categoryId: TechCategoryId): TechItem[] {
  return techItems.filter((item) => item.categoryId === categoryId);
}
