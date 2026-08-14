export interface JourneyPhase {
  id: string;
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
