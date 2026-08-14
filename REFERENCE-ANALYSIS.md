# Reference Analysis — themadbrains.com

Live analysis, not assumptions — I browsed the actual site (Home, `/ux-audit-services`,
`/portfolio`, `/blogs`, footer) and captured real structure. Branding, copy, client names,
and visuals below are **their** content, quoted only to describe the pattern — none of it
appears anywhere in my build.

---

## 1. Header & navigation

Sticky pill-less full-width bar: logo · **Services▾** · **Industries▾** · **Work▾** ·
**Why Madbrains▾** · **Resources▾** · a small "AI Studio" badge-link · primary CTA button
("Get a UX Audit") pinned right. Five separate mega-menu triggers, not one. I could not get
their hover-menu to render in this sandboxed browser (Framer's `whileHover` didn't fire on
synthetic events), so menu *contents* below are inferred from the homepage's own capability
tabs, which mirror the same taxonomy.

**What I'm taking:** multiple mega-menu triggers (not just one "Services"), a small
studio/status badge in the bar, one persistent primary CTA. **What I'm not taking:** five
separate menus — my site's IA doesn't need Industries or a "Why [Brand]" menu; I'll fold
those ideas into fewer, denser menus (see Sitemap below).

## 2. Home page — 14 distinct section types, in order

1. **Hero** — headline + subhead + primary/secondary CTA, decorative floating capability
   badges orbiting the headline (label + icon pills: "UX Audit", "Product Strategy", etc.)
2. **Stats bar** — 4 numbers (Projects Delivered, Global Clients, Client Satisfaction,
   Countries Served)
3. **"One Studio. Every Capability" — a 4-tab capability explorer.** Tabs: AI Development /
   App Development / Design / Web Development. Each tab swaps: an intro paragraph + a
   "What we deliver" grid of sub-service cards (icon, title, one-line description, arrow —
   each linking to its own page) + a "Tools we use" logo row + a "Need a custom solution?"
   inline CTA. **This is the single most important pattern on the site** — it's how 20+
   services stay organized without a wall of cards.
4. **Industry strip** — "Built for your industry, not a generic template" + tag pills
   (Healthcare, Education, Ecommerce, Fitness, AR/VR)
5. **Technologies grid** — grouped by category (AI&ML, Cloud, Web, Mobile, eCommerce, Data,
   Design), logo tiles
6. **Case studies grid** — cards with tags, "Challenge" / "Solution" copy pairs, "See all"
   CTA. Reused verbatim (component + layout) on service pages later.
7. **"Trusted by" strip** — country names (implies a map/globe, not logos)
8. **Testimonial wall** — many quote cards, name + title + company
9. **Ratings strip** — review-platform scores, Behance/Dribbble follower counts
10. **"Why choose us"** — 4 differentiator cards. Reused verbatim on service pages.
11. **Process** — 6 numbered steps, with a CTA card embedded mid-sequence (between step 4
    and 5, not at the very end)
12. **FAQ** — framed as "Still deciding? Here's what usually settles it" — objection-handling
    questions ("Can I trust these guys", "What if my idea gets leaked"), not feature
    questions. **This exact framing is already what my own FAQ does.**
13. **Final CTA** — headline + form-adjacent trust badges (NDA Protected, Quick Response,
    Fixed-Scope Quotes...) + one more trust line
14. **Blog preview** — 3 featured cards + smaller list, date/category/title

## 3. Service page anatomy (`/ux-audit-services`)

This is the key discovery: **service pages are not fully bespoke.** Comparing this page to
the homepage line-for-line, the Case Studies grid, the "Why choose us" 4-card grid, and the
testimonial wall are the **same component with the same layout**, just re-ordered and with
service-specific copy swapped in. The pattern is:

```
[unique hero — service-specific headline/CTA]
[stats bar — SAME as every other page]
[2–3 sections unique to this service — deliverables, "when you need this" triggers,
 "this isn't one thing" — sub-variants by product type]
[case studies grid — SAME component, filtered/reordered]
[mid-page CTA]
[why-choose-us 4-card — SAME component, re-copied]
[testimonial wall — SAME component]
[FAQ, final CTA, blog, footer — SAME as every page]
```

**This is why the site feels infinitely deep without being infinitely bespoke.** ~3 sections
per page are genuinely unique; the rest is one well-designed proof/trust layer, reused with
different copy. I'm adopting this pattern deliberately — it's the only version of "every page
is unique but the site feels like one product" that's actually sustainable, and it's exactly
what the reference site itself does.

## 4. Portfolio / Work listing (`/portfolio`)

Hero → dense filter-chip bar (20+ category tags, not a dropdown) → project card grid. Each
card: category tags, one-paragraph description, **measurable metric callouts** ("31K+ New
Visitors", "72% Increase Conversion", "45% Growth in Business"), "View Case" link.

**What I'm taking:** the filter-chip pattern, the metric-callout slot on cards. **What I
can't take:** the metrics themselves are real client data. My card component will have a
metrics slot that's simply omitted when no verified number exists — never a fabricated
percentage.

## 5. Blog listing (`/blogs`)

Hero → 3 large featured cards → category filter chips (13 categories) → chronological grid
(date · category · title, no excerpt). Simple, doesn't over-design — the content carries it.

## 6. Footer

Newsletter capture at the top (not the bottom), one-line brand blurb, two link columns
("Solutions" / "Company"), a "Get in touch" column (email + CTA button), social icons row,
copyright. Notably **simpler** than what I already built for this site (mine also has an
AI-tools row and a slimmer bottom bar) — confirms my footer is already at or above this
reference's depth. No changes needed there.

---

## What I'm explicitly not copying

Their AI-agency positioning, "Mad Brains" branding, client logos/names, specific metrics,
country-trust map, and WhatsApp/AI-chat widgets are all brand- or business-specific to them.
None of it fits a solo developer's honest positioning, and I was told explicitly not to
copy branding or identity — this analysis is about structure and UX mechanics only.
