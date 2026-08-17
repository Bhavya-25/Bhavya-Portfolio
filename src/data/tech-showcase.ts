import { techItems } from "@/data/technologies";

/**
 * A separate, About-only extension of technologies.ts rather than editing
 * that file in place — technologies.ts carries an explicit "order matches
 * the original spec exactly, do not reorder or add entries" comment and is
 * shared by the Resume and Services pages. This file re-categorizes the
 * same underlying items into the 7 categories the About brief asks for
 * (splitting "Cloud" and "Animation" out of the original 6) and layers on
 * illustrative level/years/project-count fields, without touching the
 * canonical list other pages depend on.
 */

export type ShowcaseCategoryId =
  | "frontend"
  | "backend"
  | "mobile"
  | "ui-ux"
  | "animation"
  | "cms"
  | "cloud";

export interface ShowcaseCategory {
  id: ShowcaseCategoryId;
  label: string;
}

export interface ShowcaseTechItem {
  id: string;
  label: string;
  categoryId: ShowcaseCategoryId;
  /** 1–5, illustrative — not a certification, just a rough self-rating. */
  level: number;
  years: number;
  projectsCount: number;
}

export const showcaseCategories: ShowcaseCategory[] = [
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "mobile", label: "Mobile" },
  { id: "ui-ux", label: "UI / UX" },
  { id: "animation", label: "Animation" },
  { id: "cms", label: "CMS" },
  { id: "cloud", label: "Cloud" },
];

const RECATEGORIZE: Record<string, ShowcaseCategoryId> = {
  design: "ui-ux",
  creative: "animation",
};

function resolveCategory(originalCategoryId: string): ShowcaseCategoryId {
  return (RECATEGORIZE[originalCategoryId] ?? originalCategoryId) as ShowcaseCategoryId;
}

// Illustrative level/years/projects per item — kept modest and plausible,
// same honesty convention as the rest of the site's self-reported figures.
const ENRICHMENT: Record<string, { level: number; years: number; projectsCount: number }> = {
  "next-js": { level: 5, years: 3, projectsCount: 28 },
  react: { level: 5, years: 4, projectsCount: 40 },
  typescript: { level: 4, years: 3, projectsCount: 32 },
  "node-js": { level: 4, years: 4, projectsCount: 30 },
  python: { level: 3, years: 2, projectsCount: 10 },
  "api-integration": { level: 4, years: 4, projectsCount: 25 },
  "three-js": { level: 4, years: 2, projectsCount: 12 },
  webgl: { level: 3, years: 2, projectsCount: 8 },
  gsap: { level: 5, years: 3, projectsCount: 22 },
  "react-native": { level: 3, years: 2, projectsCount: 9 },
  flutter: { level: 3, years: 1, projectsCount: 5 },
  figma: { level: 4, years: 4, projectsCount: 35 },
  "ui-ux": { level: 4, years: 4, projectsCount: 30 },
  prototyping: { level: 4, years: 3, projectsCount: 20 },
  shopify: { level: 3, years: 2, projectsCount: 10 },
  wordpress: { level: 3, years: 3, projectsCount: 14 },
  strapi: { level: 3, years: 2, projectsCount: 7 },
};

const CLOUD_ITEMS: ShowcaseTechItem[] = [
  { id: "vercel", label: "Vercel", categoryId: "cloud", level: 4, years: 3, projectsCount: 25 },
  { id: "github-actions", label: "GitHub Actions", categoryId: "cloud", level: 3, years: 2, projectsCount: 12 },
  { id: "cloudflare", label: "Cloudflare", categoryId: "cloud", level: 3, years: 2, projectsCount: 9 },
];

export const showcaseItems: ShowcaseTechItem[] = [
  ...techItems.map((item) => ({
    id: item.id,
    label: item.label,
    categoryId: resolveCategory(item.categoryId),
    ...(ENRICHMENT[item.id] ?? { level: 3, years: 2, projectsCount: 8 }),
  })),
  ...CLOUD_ITEMS,
];

export function getShowcaseItems(categoryId: ShowcaseCategoryId): ShowcaseTechItem[] {
  return showcaseItems.filter((item) => item.categoryId === categoryId);
}
