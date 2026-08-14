import type { FeatureIconKind } from "@/components/why/feature-icon";

export interface Usp {
  id: string;
  title: string;
  detail: string;
  icon: FeatureIconKind;
}

export const usps: Usp[] = [
  {
    id: "one-person",
    title: "One Person, Start to Finish",
    detail:
      "No hand-offs, no waiting in someone else's queue — the person who designs it is the person who ships it.",
    icon: "thread",
  },
  {
    id: "design-literate",
    title: "Design-Literate Engineering",
    detail:
      "Code that respects the interface it came from — spacing, motion, and detail carried through to production.",
    icon: "pen",
  },
  {
    id: "range",
    title: "Full-Stack, Mobile, and Creative",
    detail:
      "Whatever combination the product actually needs, without bringing in a different specialist for each piece.",
    icon: "layers",
  },
  {
    id: "direct",
    title: "Direct, No Middleman",
    detail:
      "You talk to the person actually building it — clear updates, honest scoping, no account manager in between.",
    icon: "chat",
  },
];
