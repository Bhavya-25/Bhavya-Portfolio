export type NavItem =
  | { label: string; href: string; megaMenu?: never }
  | { label: string; href: string; megaMenu: "services" | "resources" };

/** Single source of truth for the header, mobile panel, and footer nav. */
export const mainNavigation: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", megaMenu: "services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources", megaMenu: "resources" },
  { label: "Contact", href: "/contact" },
];

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_NAME = "Bhavya Chawla";
export const SITE_TAGLINE = "Full-Stack Developer & Creative Technologist";
