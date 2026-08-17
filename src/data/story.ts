export interface StoryBeat {
  id: string;
  eyebrow: string;
  headline: string;
  body: string;
}

// The more personal thread behind journey.ts's itemized milestones — why
// and how, not just when. Honest and deliberately general where specifics
// (exact dates, named employers) aren't mine to state.
export const storyBeats: StoryBeat[] = [
  {
    id: "where-started",
    eyebrow: "Where I Started",
    headline: "A curious kid who broke things to see how they worked.",
    body: "Long before \"product\" meant anything, I was the one taking apart anything with a screen — not to fix it, just to understand it. That instinct never really left.",
  },
  {
    id: "how-entered-dev",
    eyebrow: "How I Got Here",
    headline: "HTML was the first thing that talked back.",
    body: "Writing a line of code and watching the page actually change was a different kind of feedback loop than anything else I'd tried. I kept chasing that feeling, one small project at a time.",
  },
  {
    id: "why-loves-building",
    eyebrow: "Why I Build",
    headline: "The gap between an idea and a working thing is the whole game.",
    body: "Plenty of people can imagine a product. Fewer can carry it all the way through design and code without losing what made it good. That gap is where I decided to live.",
  },
  {
    id: "how-evolved",
    eyebrow: "How I've Changed",
    headline: "From \"can I build this\" to \"should I build this, and how.\"",
    body: "Early on, every project was about proving I could ship it. Now the harder, more useful questions come first — what's actually worth building, and what the simplest version of it looks like.",
  },
  {
    id: "current-mission",
    eyebrow: "Right Now",
    headline: "One person, full ownership, no hand-offs.",
    body: "I work directly with founders and teams who want design and engineering treated as one discipline — because most of the best products I've used were clearly built that way.",
  },
  {
    id: "future-vision",
    eyebrow: "Where This Goes",
    headline: "Building the kind of studio I'd want to hire.",
    body: "Small, direct, technically serious, and honest about scope. Not chasing size for its own sake — chasing the kind of work worth being known for.",
  },
];
