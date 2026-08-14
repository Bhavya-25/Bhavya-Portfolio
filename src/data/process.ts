export interface ProcessStep {
  id: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    title: "Discovery",
    description:
      "Understand the idea, the users, and what actually needs to be true for the project to succeed.",
  },
  {
    id: "planning",
    title: "Planning",
    description:
      "Scope the build, choose the stack, and map out a realistic path from idea to launch.",
  },
  {
    id: "design",
    title: "Design",
    description:
      "Translate the goals into interface and visual direction — structure before polish.",
  },
  {
    id: "development",
    title: "Development",
    description:
      "Build the real product — clean architecture, typed code, and interfaces that match the design.",
  },
  {
    id: "testing",
    title: "Testing",
    description:
      "Test against real usage, fix what breaks, and tighten the experience before it ships.",
  },
  {
    id: "launch",
    title: "Launch",
    description:
      "Ship, monitor, and optimize for performance and stability once it's live.",
  },
];
