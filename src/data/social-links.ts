import type { SocialIconKind } from "@/components/footer/social-icon";

export interface SocialLink {
  label: string;
  href: string;
  icon: SocialIconKind;
  /** True until a real profile URL replaces the "#" placeholder below. */
  isPlaceholder?: boolean;
}

// LinkedIn, Upwork, and Email are real. Everything else is a placeholder —
// swap the href in when the real profile URLs are ready.
export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "#", icon: "github", isPlaceholder: true },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/bhavya-chawla-4396661a5/",
    icon: "linkedin",
  },
  {
    label: "Upwork",
    href: "https://www.upwork.com/freelancers/~01148682312bc485f3?mp_source=share",
    icon: "upwork",
  },
  { label: "Instagram", href: "#", icon: "instagram", isPlaceholder: true },
  { label: "Twitter / X", href: "#", icon: "twitter", isPlaceholder: true },
  { label: "Dribbble", href: "#", icon: "dribbble", isPlaceholder: true },
  { label: "Behance", href: "#", icon: "behance", isPlaceholder: true },
  { label: "Medium", href: "#", icon: "medium", isPlaceholder: true },
  { label: "YouTube", href: "#", icon: "youtube", isPlaceholder: true },
  { label: "Email", href: "mailto:bhavvyawork@gmail.com", icon: "email" },
];
