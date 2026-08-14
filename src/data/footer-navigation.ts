export interface FooterNavLink {
  label: string;
  href: string;
}

export const footerNavigation: FooterNavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "Résumé", href: "/resume" },
  { label: "Contact", href: "/contact" },
];
