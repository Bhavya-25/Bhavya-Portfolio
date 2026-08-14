import type { Metadata } from "next";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/data/navigation";

interface PageSeoInput {
  title: string;
  description: string;
  /** Route path, e.g. "/services/nextjs-development". */
  path: string;
  /** Set false for thin or duplicate-risk pages. */
  index?: boolean;
}

/**
 * One helper so every route emits a consistent title, canonical, OG and
 * Twitter card. Pages call this from their `metadata` export.
 */
export function pageMetadata({
  title,
  description,
  path,
  index = true,
}: PageSeoInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = path === "/" ? `${SITE_NAME} — ${SITE_TAGLINE}` : `${title} — ${SITE_NAME}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    robots: index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      type: "website",
      url,
      siteName: SITE_NAME,
      title: fullTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}

export interface BreadcrumbEntry {
  label: string;
  href: string;
}

export function breadcrumbSchema(entries: BreadcrumbEntry[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.label,
      item: `${SITE_URL}${entry.href}`,
    })),
  };
}

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: SITE_NAME,
    jobTitle: SITE_TAGLINE,
    url: SITE_URL,
    email: "mailto:bhavvyawork@gmail.com",
    address: { "@type": "PostalAddress", addressCountry: "IN" },
  };
}

export function serviceSchema(name: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${SITE_URL}${path}`,
    provider: { "@type": "Person", name: SITE_NAME, url: SITE_URL },
  };
}
