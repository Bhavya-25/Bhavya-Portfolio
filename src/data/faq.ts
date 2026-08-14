export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

// Original content — the questions that tend to come up right before
// someone decides to reach out, not a generic FAQ list.
export const faqItems: FaqItem[] = [
  {
    id: "trust",
    question: "Can I trust you with my project?",
    answer:
      "The best signal is the work itself and how I explain it — you can see exactly how I build before committing to anything. I also keep scope and communication clear from the start, so there's no surprise halfway through.",
  },
  {
    id: "direct",
    question: "Will I work directly with you?",
    answer:
      "Yes, always. There's no account manager or hand-off to another team — you're talking to the person who actually designs and builds the product.",
  },
  {
    id: "timeline",
    question: "How long does a typical project take?",
    answer:
      "It depends on scope, but most full-stack builds land somewhere between a few weeks and a couple of months. I'll give you a realistic timeline once we've scoped the actual work, not before.",
  },
  {
    id: "design-and-dev",
    question: "Can you handle both design and development?",
    answer:
      "Yes — that's the core of how I work. I design the interface and build it myself, so nothing gets lost translating a mockup into production code.",
  },
  {
    id: "support",
    question: "Do you provide support after launch?",
    answer:
      "Yes. Most projects include a short post-launch window for fixes, and ongoing support can be arranged separately if you need it.",
  },
  {
    id: "existing-codebase",
    question: "Can you work with an existing codebase?",
    answer:
      "Yes, though I'll usually spend some time understanding how it's actually built first, so I don't suggest changes that don't fit the existing architecture.",
  },
  {
    id: "payments",
    question: "How do payments work?",
    answer:
      "Typically a deposit before starting and milestone-based payments after that — the exact structure gets agreed on before any work begins.",
  },
  {
    id: "nda",
    question: "Can you sign an NDA?",
    answer: "Yes — happy to sign an NDA before we discuss any project details.",
  },
];
