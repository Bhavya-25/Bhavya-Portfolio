# Portfolio → Premium Multi-Page Studio Site — Architecture v2

Informed by [REFERENCE-ANALYSIS.md](REFERENCE-ANALYSIS.md) (real analysis of
themadbrains.com) and the platform already built in this repo. This supersedes the
earlier architecture doc — same destination, refined by what the reference actually
proved works.

**Current state, verified against the repo, not assumed:**

| Route | Exists | Depth today |
|---|---|---|
| `/` | ✅ | 9 sections — already close to target |
| `/about` | ✅ | 2 sections (reused, no unique story) |
| `/services`, `/services/[slug]` × 20 | ✅ | 5 sections, 3 shared |
| `/projects` | ✅ | 2 sections, no filtering/search |
| `/projects/[slug]` | ❌ | doesn't exist |
| `/blog`, `/blog/[slug]` | ✅ / ❌ | listing is a placeholder, no article route, no MDX pipeline |
| `/resources`, `/resources/[slug]` × 9 | ✅ | 2 sections each |
| `/contact` | ✅ | 4 sections |
| `/resume` | ✅ | 3 sections |
| Nav, mega menus, footer, SEO infra, breadcrumbs, page transitions | ✅ | done, working |

So the foundation (routing, data models, design tokens, SEO plumbing) is real and doesn't
need rebuilding. What's missing is **depth per page** — exactly what this request is about.

---

## The governing pattern (adopted from the reference, not invented)

Confirmed by comparing the reference's home page to its service page line-for-line: **not
every section on every page is bespoke.** ~60% of a "deep" page is a shared proof/trust
layer (stats, case studies, why-choose-me, testimonials-where-real, FAQ, CTA) reused with
different copy; ~40% is genuinely unique storytelling specific to that page. That ratio is
what makes a site feel infinitely deep without being an unsustainable one-off per page.

I'm building the same way:

- **Shared, reusable proof sections** (each a real component, copy varies per page):
  `<StatsBar>`, `<CaseStudyGrid>`, `<WhyWorkWithMe>`, `<ProcessSteps>`, `<FaqSection>`,
  `<FinalCta>` — some of these already exist as Home sections and get promoted to
  reusable primitives.
- **Per-page unique sections**: hero composition, 2–3 storytelling sections that only
  make sense on that specific page, one signature interaction/animation.

## Sitemap (target depth)

```
/                          Home — 9→11 sections (add Testimonials, Blog preview)
/about                     7 sections: Hero, Journey, Timeline, Skills, Philosophy,
                            Achievements, CTA
/services                  index (exists, adequate)
/services/[slug] × 20      7 sections: Hero, Benefits, Stack, Process, Case Studies,
                            FAQ, CTA — hero + 1-2 story sections unique per service,
                            rest shared
/projects                  7 sections: Hero, Category filter, Featured, Archive grid,
                            Process note, Tech filter, CTA
/projects/[slug]           NEW — 7 sections: Hero, Overview, Challenge, Approach,
                            Gallery, Stack, Next Project
/blog                      Listing + categories + search (real, once content pipeline exists)
/blog/[slug]                MDX article template: Hero, TOC, Content, Related, Newsletter
/resources, /resources/[slug] × 9  kept at current depth — genuinely secondary pages
/contact                   7 sections: Hero, Form, Availability, FAQ, Social, Location, CTA
/resume                    kept as-is — a résumé shouldn't be a marketing page
```

## Animation strategy (no repeats, per your instruction)

| Page | Signature interaction (distinct from every other page) |
|---|---|
| Home | Pinned project stack + capability explorer (built) |
| About | Horizontal-scroll timeline for Journey |
| Services index | Hover-driven live preview swap |
| Service detail | Clip-path hero reveal; sub-variant tabs (matches reference's "isn't one thing" pattern) |
| Projects listing | FLIP-animated filter re-layout |
| Project detail | Full-bleed parallax gallery |
| Blog article | Scroll-progress bar + TOC scroll-spy |
| Contact | Field-focus choreography (built) |

All share one motion vocabulary (`EASE.out`, the `Section`/`Button` tokens) — different
*moments*, same *language*, per your design-system constraint.

---

## ⚠️ Real content blocker — needs your decision before I write copy

The reference site's depth comes from real client proof: named testimonials, verified
conversion metrics, client logos, 250+ real case studies. I have none of these, and I'm
bound by a standing rule in this project — confirmed with you before — to never invent
testimonials, client names, or performance metrics. Your brief here explicitly bans
"Coming Soon" placeholders too, which removes the fallback I used last time.

This is a genuine conflict, not a style choice, and it only affects a few specific slots:

| Section type | Can write honestly right now | Cannot do without your input |
|---|---|---|
| Service benefits, process, stack, positioning | ✅ yes — real, specific, no fabrication needed | — |
| About: journey, philosophy, skills, achievements | ✅ yes, from what's already established (4+ yrs, 50+ projects, Top Rated Upwork) | — |
| Project case studies (Challenge/Approach/Gallery) | ✅ yes — honest, generic-where-unverified, same pattern as current placeholder projects | — |
| Testimonials (named person + company + quote) | ❌ | Do you have any real client testimonials I can use? If not, I'll omit this section type entirely rather than invent quotes — that's the one thing I won't do regardless of the "no placeholder" instruction. |
| Metrics on project cards (%, counts) | ❌ | Same — omit the metric slot per-project unless you give me a real number. |
| "Trusted By" logos/companies | ❌ | Omit, or replace with the honest stats block (50+ projects / 4+ yrs / Top Rated) already used elsewhere — my recommendation. |
