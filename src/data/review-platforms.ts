// PLACEHOLDER RATINGS — Upwork and LinkedIn hrefs are real profiles; the
// rating/review counts on every platform here are illustrative, not pulled
// live. Replace with real figures once the profiles carry enough reviews
// to display honestly. Clutch and Google Reviews have no real profile yet,
// so they render without an outbound link.

export type PlatformIconKind = "upwork" | "linkedin" | "clutch" | "google";

export interface ReviewPlatform {
  id: string;
  name: string;
  icon: PlatformIconKind;
  rating: number;
  reviewCount: number;
  reviewLabel: string;
  href: string | null;
}

export const reviewPlatforms: ReviewPlatform[] = [
  {
    id: "upwork",
    name: "Upwork",
    icon: "upwork",
    rating: 5.0,
    reviewCount: 18,
    reviewLabel: "reviews",
    href: "https://www.upwork.com/freelancers/~01148682312bc485f3?mp_source=share",
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    icon: "linkedin",
    rating: 4.9,
    reviewCount: 12,
    reviewLabel: "recommendations",
    href: "https://www.linkedin.com/in/bhavya-chawla-4396661a5/",
  },
  {
    id: "clutch",
    name: "Clutch",
    icon: "clutch",
    rating: 4.9,
    reviewCount: 9,
    reviewLabel: "reviews",
    href: null,
  },
  {
    id: "google",
    name: "Google Reviews",
    icon: "google",
    rating: 5.0,
    reviewCount: 14,
    reviewLabel: "reviews",
    href: null,
  },
];
