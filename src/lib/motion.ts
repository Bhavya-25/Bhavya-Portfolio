// Shared GSAP timing tokens so every section animates with one consistent voice.

export const EASE = {
  out: "power4.out",
  inOut: "power2.inOut",
  soft: "power2.out",
} as const;

export const DURATION = {
  fast: 0.35,
  base: 0.7,
  slow: 1.1,
} as const;

export const STAGGER = {
  tight: 0.05,
  base: 0.08,
  loose: 0.14,
} as const;
