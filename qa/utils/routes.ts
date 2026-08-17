// Single source of truth for "every route in the app" — reused by every QA
// suite (smoke, a11y, responsive, visual). Deliberately imports the same
// data files src/app/sitemap.ts uses, instead of hardcoding slugs, so
// adding a service/project/resource automatically gets covered by QA with
// no test file to edit.

import { services } from "../../src/data/services";
import { projects } from "../../src/data/projects";
import { resourcePages } from "../../src/data/resources";

export interface RouteInfo {
  /** Path relative to the site root, e.g. "/services/nextjs-development". */
  path: string;
  /** Human label for reports/screenshots. */
  label: string;
  /** Grouping used to keep reports and targeted runs organized. */
  group: "static" | "service" | "project" | "resource";
}

export const STATIC_ROUTES: RouteInfo[] = [
  { path: "/", label: "Home", group: "static" },
  { path: "/about", label: "About", group: "static" },
  { path: "/services", label: "Services (index)", group: "static" },
  { path: "/projects", label: "Projects (index)", group: "static" },
  { path: "/blog", label: "Blog", group: "static" },
  { path: "/resources", label: "Resources (index)", group: "static" },
  { path: "/resume", label: "Resume", group: "static" },
  { path: "/contact", label: "Contact", group: "static" },
];

export const SERVICE_ROUTES: RouteInfo[] = services.map((service) => ({
  path: `/services/${service.slug}`,
  label: `Service — ${service.title}`,
  group: "service",
}));

export const PROJECT_ROUTES: RouteInfo[] = projects.map((project) => ({
  path: `/projects/${project.slug}`,
  label: `Project — ${project.title}`,
  group: "project",
}));

export const RESOURCE_ROUTES: RouteInfo[] = resourcePages.map((resource) => ({
  path: `/resources/${resource.slug}`,
  label: `Resource — ${resource.title}`,
  group: "resource",
}));

/** Every real page in the app. This is the full crawl surface. */
export const ALL_ROUTES: RouteInfo[] = [
  ...STATIC_ROUTES,
  ...SERVICE_ROUTES,
  ...PROJECT_ROUTES,
  ...RESOURCE_ROUTES,
];

/**
 * A small, representative subset for expensive suites (responsive, visual,
 * performance) where running all ~40 routes would be slow without adding
 * real coverage — one page per template/layout family, not one per slug.
 */
export const KEY_ROUTES: RouteInfo[] = [
  STATIC_ROUTES[0], // Home
  STATIC_ROUTES[1], // About
  STATIC_ROUTES[2], // Services index
  SERVICE_ROUTES[0], // one service detail page
  STATIC_ROUTES[3], // Projects index
  PROJECT_ROUTES[0], // one project detail page
  STATIC_ROUTES[4], // Blog
  STATIC_ROUTES[5], // Resources index
  RESOURCE_ROUTES[0], // one resource detail page
  STATIC_ROUTES[6], // Resume
  STATIC_ROUTES[7], // Contact
];

// External/dangerous patterns the crawler (functional/journeys) must never
// follow, even if discovered as a link on a page.
export const EXCLUDED_LINK_PATTERNS: RegExp[] = [
  /^mailto:/i,
  /^tel:/i,
  /^https?:\/\/(?!localhost)/i, // any external absolute URL
  /^#/, // pure in-page anchors
];
