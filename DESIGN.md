---
name: Dev By Dylan
description: A proof-first engineering portfolio — warm paper, one blue, and evidence that reads without a hover.
colors:
  ground: "#F7F7F5"
  surface: "#FFFFFF"
  sunk: "#EFEFEC"
  ink: "#151515"
  muted: "#54595F"
  faint: "#656A72"
  line: "#E2E2DD"
  line-strong: "#CFCFC8"
  accent: "#315EFB"
  accent-ink: "#2447C9"
  accent-wash: "#EEF2FE"
  live: "#0F7B3D"
  live-wash: "#E7F5EC"
  on-ink: "#E8E8E4"
  on-ink-muted: "#B9BDC4"
  on-ink-accent: "#8AA6FF"
typography:
  display:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(38px, 6vw, 62px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.021em"
  headline:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(26px, 3.4vw, 34px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.021em"
  title:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "clamp(22px, 2.6vw, 27px)"
    fontWeight: 700
    lineHeight: 1.12
    letterSpacing: "-0.021em"
  lede:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "clamp(18px, 2.1vw, 21px)"
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: "normal"
  body:
    fontFamily: "Literata, Georgia, 'Times New Roman', serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Archivo, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    fontSize: "11px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.14em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  pill: "99px"
  full: "50%"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  s9: "96px"
  s10: "128px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    typography: "{typography.label}"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  button-primary-hover:
    backgroundColor: "{colors.accent-ink}"
    textColor: "#FFFFFF"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  button-secondary-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  nav-link:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    rounded: "7px"
    padding: "8px 12px"
  nav-link-hover:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.ink}"
  nav-cta:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "{rounded.md}"
    padding: "9px 16px"
  badge-live:
    backgroundColor: "{colors.live-wash}"
    textColor: "{colors.live}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  badge-internal:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  tech-chip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    rounded: "{rounded.sm}"
    padding: "3px 9px"
  project-figure:
    backgroundColor: "{colors.sunk}"
    rounded: "{rounded.lg}"
    width: "100%"
  featured-band:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-ink}"
    rounded: "{rounded.xl}"
    padding: "32px 32px 48px"
  footer-mail:
    backgroundColor: "{colors.accent}"
    textColor: "#FFFFFF"
    rounded: "9px"
    padding: "12px 24px"
---

# Design System: Dev By Dylan

## Overview

**Creative North Star: "The Lab Report"**

This is a paper world, not a screen world. Everything sits on a warm off-white ground (#F7F7F5) with near-black ink, separated by hairlines rather than boxes, and the only saturated colour in the system is one blue used at decision points. The reference is a well-set technical document that happens to be a website: the reader is a hiring manager with limited time, and the design's whole job is to let them read a claim and the evidence for it in the same glance.

The density is generous rather than tight. The type ramp is wide — a 62px display headline over 17px serif body — because the site's argument is carried by prose, not by tiles. Two families do all the work: Archivo builds every structural element (headings, labels, buttons, navigation, metadata), Literata carries every sentence a person is meant to actually read. That split is the system's most visible rule, and it holds on every page.

What this world refuses is as load-bearing as what it uses. There is no grid of equal unlabeled tiles that only speaks on hover: every project states its role, its status, what it cost and what it still gets wrong at rest, in plain text. There are no tracked uppercase eyebrows above headings. There is no hero-metric template — no oversized accent numeral in a bordered box with a tiny label above it. Ornament that carries no information does not ship. Depth is used exactly once, on real screenshots, so that the evidence looks like an object on the page and everything else stays flat.

**Key Characteristics:**
- Warm paper ground, near-black ink, one blue — no second accent, ever.
- Archivo for structure and Literata for reading, split strictly by function.
- Hairline rules (#E2E2DD) as the primary separator; borders before boxes, boxes before shadows.
- Everything legible at rest. Hover reveals nothing that was not already stated.
- One inverted ink band, on the flagship project only, as the single value break in a long page.
- Exactly one authored motion, transform-only, whose default state is its finished state.

## Colors

A single warm-neutral field with one saturated blue and one green, both used only where they mean something.

### Primary
- **Signal Blue** (`{colors.accent}`): the one saturated colour in the system. It is the fill of every primary action (nav CTA, "Read the case study", the footer mail button), the focus ring, the `::selection` background, and the marker on the currently-read rail item. Nothing decorative is ever this colour.
- **Deep Signal** (`{colors.accent-ink}`): the darker blue that all body links sit at by default and every blue fill hovers to. Links start here and brighten to Signal Blue on hover, which is the reverse of the usual convention and is deliberate: it keeps inline links legible in running serif text.
- **Signal Wash** (`{colors.accent-wash}`): the faintest blue tint, used only as the background of inline `<code>` in the case study.

### Secondary
- **Shipped Green** (`{colors.live}`): status only. It fills the live indicator dot in the intro status line and the text of the "Shipped" badge. It never appears as a surface, a link, or a decorative accent.
- **Shipped Wash** (`{colors.live-wash}`): the tint behind the "Shipped" badge, and its only use.

### Neutral
- **Warm Paper** (`{colors.ground}`): the page ground on every surface, and the scrollbar track. This is the default state of the site.
- **Card White** (`{colors.surface}`): raised above the ground for small enclosed objects — tech chips, figure captions, the mobile rail pills. It is a lift, not a page background.
- **Sunk Paper** (`{colors.sunk}`): recessed below the ground. It is the footer field, the placeholder behind an image that has not loaded, and the hover state of a nav link.
- **Ink** (`{colors.ink}`): all primary text, and the fill of the two inverted surfaces (the skip link, the featured band).
- **Muted Ink** (`{colors.muted}`): every supporting sentence — ledes, project summaries, capability copy, figure captions, nav links at rest, rail labels. This is the second most-used colour on the site after Ink.
- **Faint Ink** (`{colors.faint}`): the smallest labels only — the rail heading, project role lines, breadcrumbs, footer meta, the rail's numerals, disclaimers. It is not lighter than #656A72 and cannot be made lighter.
- **Hairline** (`{colors.line}`): the default 1px separator, and the border of every card, chip and figure.
- **Hairline Strong** (`{colors.line-strong}`): the secondary-button border, the scrollbar thumb, and the hover border on a project figure. It is the only "stronger" rule weight the system has.

### On-Ink (the inverted band)
- **Paper on Ink** (`{colors.on-ink}`): heading and secondary-button text inside the featured band.
- **Muted on Ink** (`{colors.on-ink-muted}`): the band's role line, summary, and tech chip text.
- **Signal on Ink** (`{colors.on-ink-accent}`): the band's link-hover and "Shipped" badge colour. Signal Blue is too dark on ink; this is its on-dark counterpart, and it exists only inside the band.

### Named Rules

**The One Blue Rule.** There is exactly one accent hue in this system, in three values (Signal, Deep Signal, Signal Wash) plus one on-dark counterpart. A new colour is not introduced to distinguish a new thing; a new thing is distinguished by type, weight, or a rule. Green is not a second accent — it is a status literal, and only "shipped/live" is allowed to use it.

**The Legible-Faint Rule.** `{colors.faint}` is the floor of the text palette and every value in it clears 4.5:1 on `{colors.ground}`. This is not a preference. An earlier build ran this token at #767B82 (3.96:1) and it failed review; it carries the majority of the small labels on the site, so it is the one token that can never be lightened "just for this label."

**The Numeral-Subordinate Rule.** Where a number labels an item — the rail's `01`–`07` — the numeral sits at `{colors.faint}` and its label sits at `{colors.muted}`, so the number stays quieter than the thing it names. A numeral is never the loudest element in its own row.

## Typography

**Display Font:** Archivo (with -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif)
**Body Font:** Literata (with Georgia, Times New Roman, serif)
**Label Font:** Archivo — the same family as display; labels are a weight-and-size register, not a third face.

**Character:** A grotesque that is slightly narrow and very even against a serif designed for screen reading. Archivo gives headings and controls a flat, engineered edge with tight negative tracking (-0.021em); Literata gives paragraphs the warmth and rhythm that makes a 400-word project summary survivable. The pairing reads as a technical document rather than a marketing page, which is the whole point.

### Hierarchy
- **Display** (Archivo 700, `clamp(38px, 6vw, 62px)`, line-height 1.04): one per page, the opening headline. Capped at 17ch on the work page so it breaks into three or four short lines rather than one wide band.
- **Headline** (Archivo 700, `clamp(26px, 3.4vw, 34px)`, line-height 1.12): case-study section headings and the footer's closing question.
- **Title** (Archivo 700, `clamp(22px, 2.6vw, 27px)`, line-height 1.12): project names in the work list, and the capability headings on `/services` (which run at a flat 26px/600 — slightly lighter, because each is a claim rather than a name).
- **Lede** (Literata 400, `clamp(18px, 2.1vw, 21px)`, line-height 1.65, `{colors.muted}`): the paragraph directly under a Display headline, capped at 56–60ch. Every page has exactly one.
- **Body** (Literata 400, 17px / 16px below 640px, line-height 1.7): all running prose. Measure is capped at `68ch` by the `--measure` token (72ch inside the case study's own column).
- **Label** (Archivo 700, 11px, letter-spacing 0.14em, uppercase): the rail heading and the status badges (badges run slightly tighter at 0.08em). This is the only uppercase register in the system.
- **Micro** (Archivo 500–600, 13.5px–14.5px, sentence case): nav links, project role lines, breadcrumbs, footer meta, rail item labels, buttons. Most small text on this site lives here, not in the uppercase Label register.

### Named Rules

**The Two-Job Rule.** Archivo structures, Literata reads. If a person is meant to read it as a sentence, it is Literata; if it is a name, a control, a status, or a piece of metadata, it is Archivo. No element mixes them, and there is no third family.

**The No-Eyebrow Rule.** A tracked uppercase label never sits above a heading. Nine of them were removed from the case study for exactly this reason. When a number or a stage genuinely is information — `01 · Beam search` — it is folded inside the `<h3>` as a `{colors.faint}` span, never set as a separate line above it. The uppercase Label register is for badges and for the rail heading; anywhere else, use the Micro register in sentence case.

**The No-Hero-Metric Rule.** The template of a tracked uppercase label over an oversized accent numeral over a supporting line, repeated in equal bordered boxes, is refused outright. Where the site has numbers worth stating — search space, parity standard, engine speedup — they are set as a two-column definition list with hairlines between rows, label left in Archivo, value right in Literata with the number bolded to `{colors.ink}`. A number earns emphasis by being bolded inside a sentence, not by being blown up in a box.

## Layout

A single centred column, `1120px` maximum, with `24px` inline gutters (`.wrap`). Reading measure is capped independently of the container at `68ch` (`--measure`), so a wide viewport widens the figures and the rail, never the prose.

The work page is a two-column grid: a `190px` sticky rail (`top: 86px`, clearing the 62px sticky nav) beside a `minmax(0, 1fr)` project stack, separated by `64px`. The rail is generated at runtime from what actually rendered, and an IntersectionObserver marks the topmost project in view — it can never disagree with the list beneath it.

Spacing runs on a ten-step scale from `4px` to `128px` (`--s1`…`--s10`), roughly doubling through the middle. `64px` (`--s8`) is the workhorse: it is the gap between projects, the gap between rail and stack, and the section padding. `96px` (`--s9`) opens a page; `128px` (`--s10`) is used once, as the gap before the footer.

Vertical gaps between projects live on the `work-list` custom element itself, not on its `.stack` wrapper. The `.proj` articles are children of the custom element, so a gap on the wrapper separates nothing — this is a light-DOM consequence and it will recur on any future light-DOM component.

**Responsive.** Three breakpoints plus one guard:
- **≤900px** — the grid collapses to one column and the rail is hidden entirely (it duplicates the list directly beneath it and pushes the first project past the fold). The intro portrait drops to `76px` and moves above the headline. Every tappable target is raised to a 44px minimum here: nav links, rail links, buttons, the intro's mail link.
- **≤640px** — body type drops to 16px, the nav bar goes `flex-wrap: nowrap` at a 56px height, the featured band loses padding and bleeds `12px` into the gutters, and action buttons go full-width.
- **≤360px** — the nav's current-page link hides. The bar's intrinsic width is 363px, so 375 and 390 (the two commonest phone widths) keep both links; the link only drops below that, and only because the visitor is already on that page.

### Named Rules

**The Measure-Not-Container Rule.** Prose is capped by `--measure` (68ch), never by the container. Widening the viewport widens the evidence — figures, the rail, the featured band — and leaves the reading column where it is.

**The Rail-Is-Desktop Rule.** The sticky numbered rail is a scroll-linked desktop affordance. Below 900px it is removed, not restyled — a duplicate index sitting directly on top of the list it indexes costs a viewport and buys nothing.

## Elevation & Depth

This system is flat by default and uses tonal layering — Sunk Paper below the ground, Card White above it, hairlines between — for almost all separation. Shadow appears in exactly one place: the project screenshot. That is deliberate. The screenshots are the evidence the site exists to present, and the single lift is what makes them read as objects on a page rather than as decoration inside it.

The inverted featured band provides the only other depth cue, and it is a value inversion rather than a shadow: an ink-filled panel with its own on-dark palette, occurring once, on item 01.

### Shadow Vocabulary
- **Figure at rest** (`box-shadow: 0 1px 2px rgba(21,21,21,.05), 0 8px 24px -12px rgba(21,21,21,.18)`): the resting lift on every `.proj-shot`. A tight contact shadow plus a wide, heavily-negative-spread ambient.
- **Figure on hover** (`box-shadow: 0 2px 4px rgba(21,21,21,.06), 0 18px 40px -16px rgba(21,21,21,.26)`): applied only when the figure is a link, alongside `translateY(-2px)` and a border shift to Hairline Strong.
- **Figure on ink** (`0 18px 48px -20px rgba(0,0,0,.8)` at rest, `0 26px 60px -20px rgba(0,0,0,.9)` on hover): the same two shadows re-tuned for the featured band, where the ground is #151515 and the paper-ground values would be invisible.

### Named Rules

**The Evidence-Only Shadow Rule.** Shadow is reserved for real screenshots. Cards, chips, badges, buttons, the nav and the footer are all flat and separated by a 1px hairline. If a new surface wants a shadow, it needs a border instead — and if a border is not enough, it probably wants to be adjacent to a figure rather than to look like one.

**The Lift-Only-If-Clickable Rule.** The hover lift is bound to `a.proj-shot`, not to `.proj-shot`. A figure that is not a link does not move, does not deepen, and does not invite a click it cannot honour.

## Shapes

Rounding is soft but never playful, and it scales with the object: `6px` on the smallest chips and rail links, `8px` on buttons and the nav CTA, `10px` (`--radius`) on project figures and cards, `14px` on the featured band, `99px` on status badges, and `50%` on the portrait and the live dot. Larger objects get a larger radius so the corner reads as the same curvature at every size.

Borders are the system's real form language. Every enclosed object — figure, chip, caption, secondary button, mobile rail pill — is defined by a 1px hairline, not by a fill. Sections are separated by a single 1px rule with generous padding on both sides, and the `/services` page is built almost entirely out of that one device: each capability is one claim, one paragraph, and a rule above it.

Two shapes are asymmetric on purpose: the skip link, which rounds only its bottom-right corner (`0 0 10px 0`) as it drops from the top-left of the viewport, and the case-study figure, whose image and caption share one border with the seam between them removed so they read as a single object.

### Named Rules

**The Hairline-First Rule.** Reach for a 1px rule before a border box, a border box before a fill, and a fill before a shadow. Most separations on this site are solved at step one.

## Components

### Buttons
- **Shape:** softly rounded (`{rounded.md}`, 8px), 9px × 16px padding, Archivo 600 at 14.5px, with a 44px minimum height below 900px.
- **Primary:** Signal Blue fill, white text, matching border. Used once per action cluster — the case-study link, the footer mail button, the nav CTA.
- **Secondary:** Card White fill, Ink text, Hairline Strong border. This is the default; every button that is not *the* action is this one.
- **Hover / Focus:** primary deepens to Deep Signal; secondary darkens its border to Ink. Both lift `translateY(-1px)` over 160ms. Focus is the global 2.5px Signal Blue `:focus-visible` ring at 3px offset, never a button-local treatment.
- **On ink:** inside the featured band, secondary buttons go transparent with a #4A4A4A border and Paper-on-Ink text; the primary keeps Signal Blue and brightens to #4C74FF instead of darkening.
- **Icon:** a 15px inline SVG stroke icon (`stroke-width: 2.2`, `currentColor`) sits 7px after the label on external links only. Icons are inline SVG — there is no icon font and no glyph-as-icon anywhere in this system.

### Chips and Badges
- **Tech chip:** Card White on a hairline, `{rounded.sm}`, Archivo 12.5px in Muted Ink, sentence case with no tracking. It lists a technology; it is not a control and never gains a hover state.
- **Status badge:** a pill (`{rounded.pill}`) in the uppercase Label register at 11px/0.08em. Two variants only — "Shipped" in Shipped Green on Shipped Wash, "Internal" in Muted Ink on Sunk Paper. Status is the one thing on this site allowed to be a coloured pill, because a hiring manager scanning the list is asking exactly that question.

### Cards / Containers
There are no cards in the conventional sense. A project is an unenclosed article: figure, then heading and badge, then role line, summary, tech chips, actions — separated by spacing, not by a container. The only bordered container is the figure itself (`{rounded.lg}`, Sunk Paper placeholder, hairline border, resting shadow, 16:9 crop from the top).

### Navigation
- **Style:** sticky, 62px minimum height, a translucent Warm Paper ground (`rgba(247,247,245,.86)`) with `backdrop-filter: saturate(1.6) blur(12px)`, closed by a single hairline.
- **Items:** the wordmark ("Dev By Dylan", Archivo 700/16px) pushed left with `margin-right: auto`; two Micro-register links; then a Signal Blue CTA. The contact action is visible in the first viewport on every page.
- **States:** links sit at Muted Ink and darken to Ink on a Sunk Paper hover chip; the current page is marked with `aria-current="page"` and goes Ink at weight 600 — no underline, no bar.
- **Mobile:** locked to one line (`flex-wrap: nowrap`) at 56px, with all three items shrunk in step; below 360px the current-page link drops.

### The Numbered Rail (signature)
A 190px sticky index of the work, generated from the rendered list rather than authored twice. Each row is a two-column grid: a tabular-numeral `01`–`07` in Faint Ink at 11.5px, then the project name in Micro at 13.5px in Muted Ink. The row currently in view goes Deep Signal with its numeral in Signal Blue, driven by an IntersectionObserver with a `-84px 0px -55% 0px` root margin so "current" means "topmost in the upper half of the viewport." Hidden below 900px.

### The Featured Band (signature)
Item 01 rendered as an ink-filled panel (`{rounded.xl}`, 32px/32px/48px padding) with its own on-dark palette. Its heading steps up to `clamp(27px, 3.4vw, 36px)`, its figure crops slightly wider at 16:8.4, and every child colour remaps to the On-Ink tokens. It does two jobs at once: it marks primacy for the only shipped, paying, case-studied project, and it is the single value break in a page that otherwise runs ~7,700px as one continuous field. There is exactly one of these per page, and it is applied by rank, not by taste.

### Motion
One authored moment exists in the entire system: `.proj-shot` rises `26px` and scales from `.982` as it enters view, on an expo-out curve (`cubic-bezier(.16, 1, .3, 1)`) across `entry 4%` to `entry 58%`. It is scroll-driven via `animation-timeline: view()`, so there is no JavaScript and no observer, and it is wrapped in both `@media (prefers-reduced-motion: no-preference)` and `@supports (animation-timeline: view())`. Everything else is a 160–220ms state transition on colour, border, transform or filter.

**The Never-From-Zero Rule.** The animation is transform-only and never touches opacity. The default state is the finished state: a browser without `animation-timeline`, a reader on reduced motion, and a figure caught mid-animation all show the image fully. An element that fades in is an element that is missing when the fade does not run — an `opacity: 0` focus trap was the P0 that started this rebuild, and this rule exists to make it unrepeatable.

## Do's and Don'ts

### Do:
- **Do** keep every claim legible at rest. Status, role, cost and known limitation are stated in text; hover reveals nothing new.
- **Do** split the families by function — Archivo for anything structural, Literata for anything read as a sentence.
- **Do** cap prose at `--measure` (68ch) and let the container widen around it.
- **Do** separate with a 1px hairline first. Escalate to a bordered box, then a fill, then a shadow — and only figures ever reach the last step.
- **Do** fold a meaningful number inside its heading (`01 · Beam search`) at `{colors.faint}`.
- **Do** put gaps on a light-DOM custom element itself, not on its wrapper — the wrapper is not the children's parent for layout purposes.
- **Do** keep every tappable target at 44px minimum below 900px, and give the mobile nav bar a nowrap single line.
- **Do** ship rasters as WebP in three derived sizes off one source path (`/images/cards/`, `/images/thumbs/`, `/images/full/`), remapped by the shared `variant()` helper. Originals stay on disk and never ship.
- **Do** theme the browser's own surfaces from the palette — selection, focus ring, scrollbar track and thumb, underline offset, tabular numerals. Their defaults belong to no system.

### Don't:
- **Don't** set a tracked uppercase label above a heading. No kickers, no eyebrows, anywhere, for any reason.
- **Don't** build a hero-metric row: a tiny tracked label over an oversized accent numeral in equal bordered boxes is refused. Use the two-column definition list with hairlines.
- **Don't** introduce a second accent hue, or use Shipped Green as anything but a live/shipped status.
- **Don't** lighten `{colors.faint}` past #656A72, or set any body or label text below 4.5:1 on its ground.
- **Don't** animate opacity. Ever. Transform only, inside both the reduced-motion query and the `@supports` guard, with the resting state already finished.
- **Don't** add a second authored motion. There is one, it is on the evidence, and a second one makes both cheap.
- **Don't** put a shadow on anything that is not a real screenshot, or a hover lift on anything that is not a link.
- **Don't** give a Lit component a shadow root. Every component here returns `this` from `createRenderRoot()` on purpose — shadow roots hid the markup from the accessibility tree and from every static scan of the page.
- **Don't** use a glyph or an icon font as an icon. Inline SVG at 15–16px with `currentColor`, or nothing.
- **Don't** ship a grid of equal unlabeled tiles that only speaks on mouseover. That is the anti-reference this entire system was built against.

<!--
Recorded from the shipped code, not from the plan. Divergences and debt found in
the build, deliberately NOT canonized as system rules:

- portfolio/2k-build-lab/index.html carries a page-scoped `<style>` block of `.cs-*`
  rules layered on site.css. Those are extensions to this system, not part of it.
  Anything in that block that contradicts a rule above is page-local debt.
- `.cs-tags li` sets uppercase 12px at 1px tracking in Signal Blue; the core system's
  equivalent (`.tech li`) is sentence-case Muted Ink with no tracking. The core rule
  is the system; the case-study variant is drift.
- `.cs-kicker` is a class name only — it renders as a lede paragraph, not as a tracked
  uppercase eyebrow. The name is stale; the No-Eyebrow Rule still holds.
- The case study's `<style>` block opens with a comment naming "Poppins". No Poppins is
  loaded anywhere in the build. Stale comment, not a font in this system.
- Radii of 7px (.nav a.link) and 9px (.nav a.cta, .foot-mail) sit off the recorded
  6/8/10/14 scale. Unauthored drift; new work should use the scale.
- package.json still carries the original template's name/description ("Thank you for
  using our template!"). Metadata residue from the pre-rebuild site.
- Colorlib is fully gone; css/ is site.css alone. No residue found.
-->
