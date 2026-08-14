import type { AiToolIconKind } from "@/components/footer/ai-tool-icon";

export interface AiTool {
  name: string;
  href: string;
  icon: AiToolIconKind;
}

// Placeholder hrefs — swap in real referral / profile links when ready.
export const aiTools: AiTool[] = [
  { name: "ChatGPT", href: "#", icon: "chatgpt" },
  { name: "Claude", href: "#", icon: "claude" },
  { name: "Cursor", href: "#", icon: "cursor" },
  { name: "GitHub Copilot", href: "#", icon: "copilot" },
  { name: "Vercel AI", href: "#", icon: "vercel" },
  { name: "OpenRouter", href: "#", icon: "openrouter" },
  { name: "Windsurf", href: "#", icon: "windsurf" },
  { name: "Bolt", href: "#", icon: "bolt" },
  { name: "v0", href: "#", icon: "v0" },
  { name: "Figma AI", href: "#", icon: "figma" },
];
