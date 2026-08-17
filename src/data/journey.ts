export interface JourneyPhase {
  id: string;
  range: string;
  title: string;
  description: string;
}

export type JourneyMilestoneType = "career" | "education" | "achievement";

export interface JourneyMilestone {
  id: string;
  type: JourneyMilestoneType;
  range: string;
  title: string;
  description: string;
}

// Phase-based, not date-and-employer-specific — honest about what's actually
// verifiable (the shape of the progression) without inventing company names
// or exact dates that aren't mine to state here.
export const journeyPhases: JourneyPhase[] = [
  {
    id: "foundations",
    range: "Year 1",
    title: "Foundations",
    description:
      "Started as a generalist — HTML to deployment, learning by shipping small things for real people rather than tutorials.",
  },
  {
    id: "full-stack",
    range: "Year 2",
    title: "Going Full-Stack",
    description:
      "Moved into complete ownership: frontend, backend, and the database decisions in between. Stopped treating design as someone else's problem.",
  },
  {
    id: "creative-technology",
    range: "Year 3",
    title: "Creative Technology",
    description:
      "Added Three.js and GSAP to the toolkit — not as decoration, but because some products need the interface itself to be part of the pitch.",
  },
  {
    id: "independent",
    range: "Year 4+",
    title: "Independent Practice",
    description:
      "Went independent. Top Rated on Upwork, 50+ projects shipped, working directly with founders and teams instead of through a chain of hand-offs.",
  },
];

// Itemized breakdown of the same four eras above — same honesty constraint
// (no invented employers, clients, or exact calendar dates), just finer
// grained so the About page's interactive timeline has real texture instead
// of four abstract blocks.
export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "generalist-start",
    type: "education",
    range: "Year 1",
    title: "Learning by Shipping",
    description:
      "Started as a generalist — HTML to deployment, learning by building small things for real people rather than tutorials.",
  },
  {
    id: "first-real-client",
    type: "achievement",
    range: "Year 1",
    title: "First Paid Client Work",
    description:
      "Took on the first real client project — small in scope, but the first time code had to hold up outside a personal sandbox.",
  },
  {
    id: "full-stack-ownership",
    type: "career",
    range: "Year 2",
    title: "Full-Stack Ownership",
    description:
      "Moved into complete ownership: frontend, backend, and the database decisions in between. Stopped treating design as someone else's problem.",
  },
  {
    id: "design-engineering-merge",
    type: "education",
    range: "Year 2",
    title: "Design Became Part of the Job",
    description:
      "Started designing interfaces before building them, instead of receiving finished mockups from someone else.",
  },
  {
    id: "creative-technology",
    type: "career",
    range: "Year 3",
    title: "Added Creative Technology",
    description:
      "Brought Three.js and GSAP into the toolkit — not as decoration, but because some products need the interface itself to be part of the pitch.",
  },
  {
    id: "fifty-projects",
    type: "achievement",
    range: "Year 3",
    title: "50+ Projects Shipped",
    description:
      "Crossed fifty delivered projects — the point where patterns start repeating and the process gets genuinely reliable.",
  },
  {
    id: "went-independent",
    type: "career",
    range: "Year 4",
    title: "Went Independent",
    description:
      "Left a single employer's queue behind to work directly with founders and teams, full time, on my own terms.",
  },
  {
    id: "top-rated-upwork",
    type: "achievement",
    range: "Year 4+",
    title: "Top Rated on Upwork",
    description:
      "Reached Top Rated status — a small, verifiable signal that the direct-client model actually works.",
  },
];
