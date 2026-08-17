export interface WorkshopImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

// Generic, honestly-labeled placeholder photography — swappable for real
// workspace photos later, following the same convention as
// public/projects/placeholder-*.svg.
export const workshopImages: WorkshopImage[] = [
  { id: "workspace", src: "/about/placeholder-workspace.svg", alt: "Workspace", caption: "Where the actual building happens" },
  { id: "editor", src: "/about/placeholder-editor.svg", alt: "Code editor", caption: "Most hours, most days" },
  { id: "sketch", src: "/about/placeholder-sketch.svg", alt: "Sketch and wireframes", caption: "Before anything is real" },
];

// Short, honestly-generic "log line" snippets — deliberately not specific
// unverifiable claims, just texture.
export const logLines: string[] = [
  "second cup of coffee before 10am",
  "rebuilding the same component for the third time, better",
  "one tab open, forty more I'm ignoring",
  "the bug was a missing semicolon, obviously",
  "sketching on paper before touching Figma",
  "shipping on a Friday, carefully",
];
