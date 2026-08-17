import type { AiToolIconKind } from "@/components/footer/ai-tool-icon";

export interface Tool {
  name: string;
  icon: AiToolIconKind;
}

// A distinct list from footer/ai-tools.ts's AI-specifically-branded tools
// (Figma AI, Vercel AI) — this is the plain daily toolkit, editor through
// deploy.
export const tools: Tool[] = [
  { name: "VS Code", icon: "vscode" },
  { name: "Cursor", icon: "cursor" },
  { name: "Figma", icon: "figma" },
  { name: "GitHub", icon: "github" },
  { name: "Claude", icon: "claude" },
  { name: "ChatGPT", icon: "chatgpt" },
  { name: "Vercel", icon: "vercel" },
  { name: "Postman", icon: "postman" },
];
