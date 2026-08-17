export interface PhilosophyCard {
  id: string;
  title: string;
  description: string;
  /** Controls the bento grid span — "wide" cards take two columns on desktop. */
  size: "wide" | "normal";
}

export const philosophyCards: PhilosophyCard[] = [
  {
    id: "think-first",
    title: "Think First",
    description:
      "Code is the easy part. The real work is deciding what's actually worth building before a single line gets written.",
    size: "wide",
  },
  {
    id: "research",
    title: "Research",
    description:
      "I look at what's already been solved before inventing something new — most problems have prior art worth learning from.",
    size: "normal",
  },
  {
    id: "user-experience",
    title: "User Experience",
    description:
      "The interface is the product, as far as anyone using it is concerned. It gets the same rigor as the backend.",
    size: "normal",
  },
  {
    id: "scalable-architecture",
    title: "Scalable Architecture",
    description:
      "Structured so the next feature is additive, not a rewrite — decisions made for where the product is going, not just where it is.",
    size: "wide",
  },
  {
    id: "performance",
    title: "Performance",
    description:
      "Fast by default, not optimized as an afterthought. Slow software is a design flaw, not a technical detail.",
    size: "normal",
  },
  {
    id: "clean-code",
    title: "Clean Code",
    description:
      "Written for the person who has to change it in six months — usually me, sometimes someone else entirely.",
    size: "normal",
  },
  {
    id: "business-impact",
    title: "Business Impact",
    description:
      "Every technical decision gets checked against one question: does this actually move the product or the business forward.",
    size: "wide",
  },
];
