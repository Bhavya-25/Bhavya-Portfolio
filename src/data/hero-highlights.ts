import type { ServiceIconKind } from "@/components/contact/service-icon";

export interface HeroHighlight {
  id: string;
  kind: "stat" | "skill";
  value?: string;
  label: string;
  icon?: ServiceIconKind;
}

// Same honest figures already established elsewhere on this page
// (achievement-counters.tsx, journey.ts) — no new numbers invented for the
// hero specifically.
export const heroHighlights: HeroHighlight[] = [
  { id: "years", kind: "stat", value: "4+", label: "Years Experience" },
  { id: "projects", kind: "stat", value: "50+", label: "Projects Delivered" },
  { id: "clients", kind: "stat", value: "15+", label: "Happy Clients" },
  { id: "rated", kind: "stat", value: "Top Rated", label: "Upwork Freelancer" },
  { id: "fullstack", kind: "skill", label: "Full-Stack & Next.js", icon: "code" },
  { id: "design", kind: "skill", label: "UI/UX Design", icon: "design" },
];
