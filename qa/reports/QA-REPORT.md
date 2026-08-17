# Website QA Report

Generated: 2026-08-17T11:00:06.601Z
Environment: local dev server (`npm run dev`), Node v24.13.1

## Executive Summary

This report covers automated smoke, functional, accessibility, responsive, visual, performance, and user-journey testing of the actual running site (not just source inspection), driven by a self-maintaining Playwright + axe-core suite built for this repo (`qa/`). Route coverage is derived live from the app's own content data (`qa/utils/routes.ts`), not a hand-maintained list, so it tracks new services/projects/resources automatically. 194 automated checks ran across 6 test categories.

**Every failure below was individually investigated** (Phase 20 root-cause triage) before being included here. Bugs found in the QA test code itself during development (overly broad locators, wrong assumptions about component behavior) were fixed and are not counted as findings — only what survived that triage is reported.

### Route coverage

| | |
|---|---|
| Routes discovered (live from app content data) | 40 |
| Routes smoke-tested | 40 / 40 (100%) |
| Routes accessibility-tested (axe-core) | 40 / 40 (100%) |
| Routes responsive-tested (6 breakpoints) | one representative page per template family — see Responsive Issues section |
| Routes Lighthouse-tested | 16 / 40 — see Performance section for which, and why |
| Routes skipped entirely | 0 |

## Overall Status: PASS

All automated checks passed.

## Test Statistics

| Category | Total | Passed | Failed | Skipped | Flaky (confirmed passes in isolation) |
|---|---|---|---|---|---|
| a11y | 44 | 44 | 0 | 0 | 0 |
| functional | 22 | 22 | 0 | 0 | 0 |
| journeys | 4 | 4 | 0 | 0 | 0 |
| responsive | 72 | 72 | 0 | 0 | 0 |
| smoke | 41 | 41 | 0 | 0 | 0 |
| visual | 11 | 11 | 0 | 0 | 0 |
| **Total** | **194** | **194** | **0** | **0** | |

### Bug classification

| Severity | Count |
|---|---|
| P0 Critical | 0 |
| P1 High | 0 |
| P2 Medium | 0 |
| P3 Low | 0 |

## Critical Bugs (P0)

None found.

## High Bugs (P1)

None found.

## Medium Bugs (P2)

None found.

## Low Bugs (P3)

None found.

## Functional Issues

None found — forms, navigation, and multi-step journeys behaved as expected.

## Accessibility Issues

None found in the automated axe-core + keyboard-navigation pass. Manual screen-reader testing is still recommended (see Manual Verification Required).

## Responsive Issues

None found across the 6 tested breakpoints (1440x900, 1280x800, 1024x768, 768x1024, 390x844, 375x812).

## Visual Regression

No visual diffs against baseline (or this is the first run, which establishes the baseline rather than comparing against one — re-run to get a real comparison).

## Performance

| Page | Performance | Accessibility | Best Practices | SEO |
|---|---|---|---|---|
| Home (/) | 40 | 96 | 100 | 100 |
| About (/about) | 68 | 92 | 100 | 100 |
| Services (index) (/services) | 77 | 92 | 100 | 100 |
| Projects (index) (/projects) | 65 | 91 | 100 | 100 |
| Blog (/blog) | 79 | 92 | 100 | 100 |
| Resources (index) (/resources) | 79 | 92 | 100 | 100 |
| Resume (/resume) | 88 | 92 | 100 | 100 |
| Contact (/contact) | 65 | 91 | 100 | 100 |
| Service — Next.js Development (/services/nextjs-development) | 69 | 92 | 100 | 100 |
| Service — Mobile App Development (/services/mobile-app-development) | 82 | 92 | 100 | 100 |
| Service — UI/UX Design (/services/ui-ux-design) | 94 | 92 | 100 | 100 |
| Service — Shopify Development (/services/shopify-development) | 83 | 92 | 100 | 100 |
| Project — Product Platform (/projects/placeholder-product-platform) | 70 | 92 | 100 | 100 |
| Project — Mobile Application (/projects/placeholder-mobile-app) | 62 | 92 | 100 | 100 |
| Resource — Design Process (/resources/design-process) | 84 | 92 | 100 | 100 |
| Resource — UI Inspiration (/resources/ui-inspiration) | 84 | 92 | 100 | 100 |

**Coverage:** 16 of ~40 routes ran through Lighthouse individually (all 8 static pages, plus 4 services / 2 projects / 2 resources spanning each dynamic family's different content shapes). The remaining 16 services, 3 projects, and 5 resources share the same template/component/bundle as the ones tested and were not run individually.

**Important caveat:** these scores are from `next dev` (Turbopack dev server, unminified JS, HMR client, no production code-splitting/caching) — Lighthouse Performance scores from a dev server always run well below what a production build (`next build && next start`) would score, often by 30-50+ points, regardless of the app. Treat the *relative* spread between pages as the signal, not the absolute numbers.

**Relative outlier(s) worth a look:** Home scored 40 against a 74-average across the pages tested — even accounting for dev-mode overhead shared by every page, this page is heavier than its siblings. Worth a production-build Lighthouse re-run to get an accurate number, and worth checking what's uniquely loaded on it (this app's Home page carries a Three.js hero scene and GSAP-driven pinned scroll sections that other pages don't — a reasonable first place to look, not a confirmed cause).

## Pages Tested

40 routes covered by the smoke suite, plus 1 dedicated deduped broken-links check (full route list: `qa/utils/routes.ts`, derived live from the app's own content data).

## User Journeys Tested

- Home -> Services mega menu -> service detail -> Contact CTA -> form visible — passed
- Home -> Projects -> filter -> case study -> Next Project -> Contact — passed
- Home -> FAQ -> expand a question -> final CTA -> contact form reachable — passed
- Home -> Resources mega menu -> resource detail renders real content — passed

## Recommended Fixes

No automated failures to fix right now.

## Manual Verification Required

- **Real email delivery**: `GMAIL_USER`/`GMAIL_APP_PASSWORD` aren't set in this environment, so the contact/newsletter forms are verified up to (and including) a graceful configured-error response, not an actual sent email. Set those env vars and manually submit once to confirm delivery before relying on this in production.
- **Screen reader testing**: axe-core catches a large share of accessibility issues automatically but not everything (e.g. reading order that's technically valid DOM but confusing when read aloud). A pass with VoiceOver/NVDA is still worth doing.
- **Cross-browser**: this run used Chromium only. Consider a pass in Safari/WebKit and Firefox if analytics show meaningful traffic there.
- **Visual baselines**: on a first run, `qa:visual` establishes baselines rather than catching regressions. Review `qa/tests/visual/*-snapshots/` once and commit them; future runs will then genuinely diff.
