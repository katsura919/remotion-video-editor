# Abie Maxey ~ Design System

> **The brand in one line.** Smart, honest, systems-first ~ built for the person who's been there and done it, not the one selling the dream.

This is the design system for [abiemaxey.com](https://abiemaxey.com), the personal brand OS for **Joenabie Gamao** ~ Filipina operator, builder and digital nomad currently building from Madrid. It powers a portfolio site, three businesses (Abie Maxey, HappyVoyager, TalentMucho), interactive tools, playbooks, and IG carousels.

The system was reverse-engineered from the production codebase (`Next.js 15 + Tailwind v4 + shadcn`) and the canonical brand guidelines doc shipped at `/brand/guidelines.html`. Everything below is intentional ~ if a rule feels arbitrary, the section explains why.

---

## How to use this system

| You want to... | Read |
|---|---|
| Understand the voice and writing style | [§1 Content fundamentals](#1--content-fundamentals) |
| Know which colors, fonts, sizes to use | [§2 Visual foundations](#2--visual-foundations) |
| Find the right sticker, logo, or photo treatment | [§3 Iconography & imagery](#3--iconography--imagery) |
| Drop in pre-built buttons, cards, badges | [§4 Components](#4--components) |
| See it all live | Open `Abie Maxey UI Kit.html` |
| Browse static reference cards | Open the cards in `cards/` (also visible in the Design System tab) |

---

## 1 ~ Content fundamentals

The way Abie writes is the *soul* of the brand ~ stripped, specific, experiential. Visuals can change; this voice cannot.

### 1.1  Voice

Pick three. The brand always sounds like all three at once.

- **Smart.** It assumes the reader is too. No condescension, no "let me explain visas in 5 easy steps."
- **Honest.** Receipts, not promises. "I went through it; here's what broke."
- **Systems-first.** Every story lands on a *playbook*, *framework*, or *operating model*. We don't do "tips."

We don't do **motivational fluff** ("believe in yourself!"), **travel-blogger aesthetics** ("dreamy sunsets!"), or **guru selling** ("DM me to unlock the system"). If a sentence could appear on a LinkedIn carousel from someone who has never left their hometown, delete it.

### 1.2  Tone modulation

Same voice, different temperatures.

| Context | Tone | Example opener |
|---|---|---|
| **Hero / homepage** | Confident, direct | "Filipina. Building from Madrid." |
| **Long-form blog** | Reflective, specific | "It started with a decision, little savings, and a one-way ticket to Japan." |
| **Tools / playbooks** | Operator, terse | "Phase 01 ~ visa chaos. Phase 02 ~ runway." |
| **IG carousel quote slide** | Aphoristic, punchy | "Cheap living often creates cheap thinking." |
| **Newsletter / footer** | Quiet, warm | "I document what it actually takes to rebuild your life abroad." |

### 1.3  The tilde rule

The em-dash (`—`) is **banned**. We use the **tilde** (`~`) as our universal connector.

- Section labels: `01 ~ Who I Am`
- Subtitles: `From the Field ~ Latest writing`
- Inline asides: `27 countries and a weak passport later ~ I'm now a Spanish resident...`
- Pricing: `~$1,200/mo runway`

The tilde is the brand's signature punctuation ~ it reads as breath, not interruption. If you find yourself reaching for an em-dash, stop and ask whether two short sentences would work, or whether a tilde fits better.

### 1.4  Numbering & section labels

Every long page is numbered. Numbers are **two-digit, zero-padded**, set in italic serif, and followed by ` ~ ` then a short title.

```
01 ~ Who I Am
02 ~ Three Businesses
03 ~ Tools
04 ~ Playbooks
05 ~ From the Field
06 ~ Get In Touch
```

Numbers give the page rhythm and signal that there's a *system* under the surface. They also do the work of nav anchors and IG slide counters (`01 / 06`).

### 1.5  Specificity

Always prefer the specific, **felt** detail.

- ✕ "I traveled a lot." → ✓ "27 countries and a weak passport later."
- ✕ "Affordable living abroad." → ✓ "~$1,200/mo runway in Madrid."
- ✕ "Stories from my journey." → ✓ "Real stories from a nomad building businesses abroad."

If a sentence could be written by someone who hasn't lived the thing, it doesn't ship.

### 1.6  CTAs

CTAs are imperative, short, and uppercase. Two registers:

- **Primary action** ~ short verb phrase, all caps, in the pill button. e.g. `WORK WITH ME`, `READ THE POST`, `ALL PLAYBOOKS`
- **Secondary action** ~ tiny mono label with arrow, lowercase tracking. e.g. `Book a Call →`, `Subscribe →`

Never end a CTA with a period. Always pair with a `→` (right arrow) or `↗` (external).

---

## 2 ~ Visual foundations

The visual system is a deliberate three-font, ten-color, eight-spacing-step world. **Restraint is the point.** When everything is set in the same three families, the typography itself becomes the brand mark.

### 2.1  Color

Tokens live in [`colors_and_type.css`](./colors_and_type.css). The system is **warm-paper light** by default with a fully wired dark mode.

#### Light palette (default)

| Token | Hex | Role |
|---|---|---|
| `--bg` | `#f9f5f2` | Warm off-white. *The* canvas. |
| `--fg` | `#3a3a3a` | Deep charcoal. Never pure black. |
| `--primary` | `#e3a99c` | Dusty pink/peach. THE accent. |
| `--primary-soft` | `#f2d6c9` | Lifted primary for tints, hovers. |
| `--secondary` | `#e7ddd3` | Warm sand. Surfaces, dividers. |
| `--muted-fg` | `#6b6b6b` | Gray text, captions, meta. |
| `--accent` | `#bbcccd` | Dusty teal/sage. Data, charts. |
| `--card` | `#ffffff` | Pure white. Cards over warm bg. |

#### Dark palette

| Token | Hex |
|---|---|
| `--bg` | `#1e1b1a` |
| `--fg` | `#f9f5f2` |
| `--card` | `#272422` |
| `--primary` | `#e3a99c` (unchanged) |
| `--secondary` | `#3d3836` |
| `--muted-fg` | `#a69e9a` |

The primary stays put across modes ~ it's the anchor. Everything else flips around it.

#### Color rules

- **One primary, used like a highlighter.** It accents words inside headlines, hover states, badge fills, and quote marks. Never as a flood-fill background for a whole page.
- **Secondary is a divider, not a fill.** `--secondary` is for borders, hairlines, and badge backgrounds. Use `--bg` for actual page backgrounds.
- **Never fully saturated.** No neon pink, no pure red, no `#000`. Everything is muted by ~10–15% from its pure form.
- **Data colors exist** (`--success`, `--warning`, `--danger`) but are reserved for charts, progress bars, and status dots. Don't use them as decoration.

### 2.2  Typography

Three families. Two weights of the sans (400 and 900). One italic of the serif. All caps is a *mode*, not a flourish.

| Family | Used for |
|---|---|
| **Host Grotesk** (sans) | UI, navigation, headlines (uppercase, font-black, tighter tracking) |
| **Instrument Serif** (italic) | Accent words inside headlines, body paragraphs, pull quotes |
| **Geist Mono** (mono) | Tiny labels, section numbers, captions, slide counters |

#### The signature recipe

Almost every headline on the site uses this construction:

```html
<h2 class="h-display">
  Latest <span class="h-accent">writing</span>
</h2>
```

A bold, uppercase, tight-tracked sans phrase with one or two **lowercase italic serif** words mixed in. This single recipe does ~80% of the typographic heavy lifting. It works because the contrast (black/normal, uppercase/lowercase, sans/serif) is maximum on every axis.

#### Type scale

| Token | Size | Use |
|---|---|---|
| `--t-mono-xs` | 9px | Tiny meta labels, slide counters |
| `--t-mono-sm` | 10px | Section labels, eyebrow |
| `--t-body-sm` | 14px | Captions |
| `--t-body` | 17px | Body default |
| `--t-h5` | 24px | Card titles |
| `--t-h4` | 32px | Sub-section heads |
| `--t-h3` | 48px | Section heads (mobile) |
| `--t-h2` | 60px | Section heads (desktop) |
| `--t-h1` | 72px | Hero (mobile) |
| `--t-display` | 96px | Hero (desktop) |
| `--t-mega` | 160px | Footer "Let's Talk." moment |

#### Type rules

- **Body never below 14px.** Mono labels can go to 9px because they're set in tracking-widest uppercase.
- **Mix only 400 and 900 of the sans.** No 500, no 600. The contrast is the system.
- **Never center body text.** Centered headlines OK. Centered paragraphs — never.
- **Italic serif body bumps up ~6%.** Italics read smaller; we compensate.

### 2.3  Spacing & layout

Tailwind's 4px base. Every margin, padding, and gap on the site lives in this scale.

`4 ~ 8 ~ 12 ~ 16 ~ 24 ~ 32 ~ 48 ~ 64 ~ 96` (px)

| Step | Use case |
|---|---|
| 4–8 | Icon gap, badge interior |
| 12–16 | Standard component gap |
| 24 | Section-to-section within a card |
| 32 | Card interior padding |
| 48–64 | Block-to-block on a page |
| 96 | Hero / section vertical padding |

**Container.** Max width is `2200px` (intentionally generous for ultra-wide monitors). Horizontal padding scales: `24 → 48 → 80 → 128px`.

**Radius.** Five values: `6 ~ 10 ~ 18 ~ 26 ~ ∞`. Pills use full radius; cards use 18 or 26; inline badges use 6.

**No drop shadows on UI.** Use `border` + `bg` to differentiate surfaces. Shadows only show up on the floating glass-pill nav and modal overlays, both with very subtle tints.

### 2.4  Motion

Motion is purposeful, never decorative.

- **Entrance** ~ GSAP fade + 20-40px translate, 0.7-1s, `power3.out`. Triggered at `top 85%` of viewport.
- **Hover** ~ 200-300ms color shift, optional 1px translate or 1.05 scale. Never bigger.
- **Stagger** ~ 0.08-0.15s between siblings. Read like breath.
- **Marquee** ~ 25s linear, infinite, for partner logos only.

Animations should feel like a slow exhale, not a pop.

---

## 3 ~ Iconography & imagery

Three image categories. Each has a strict role.

### 3.1  Logos

The wordmark is `Abie Maxey` set as a custom display lockup. Two files are shipped:

- `assets/logo.png` ~ for use on the warm-paper background (light mode)
- `assets/logo-dark.png` ~ for use on the dark `#1e1b1a` background

Always render at `40px height`. Don't recolor, stretch, or place on a primary-tinted background.

### 3.2  Stickers

The system ships **21 hand-illustrated mascot stickers** (see `assets/stickers/`). They depict Abie in different emotional states ~ smiling, thinking, shouting through a megaphone, sitting with a laptop, etc.

Stickers are the **only emoji-equivalent in the brand.** They replace 🎉 / 🤔 / 💼 / 😤 etc. They:

- Sit on top of headlines or in margins, often slightly rotated.
- Are sized 80–160px on web; never below 60px (illustration detail breaks).
- Animate on hover ~ scale 1.1 + rotate `-3deg` over 300ms.
- Have transparent backgrounds (a `Stickers with background` set exists for IG only).
- Are never placed inside body text. They're punctuation, not vocabulary.

Available expressions: `smiling_portrait`, `winking_peace`, `thumbs_up`, `thinking_ellipsis`, `shouting_megaphone`, `sitting_with_laptop`, `working_on_laptop`, `sleepy_zzz`, `overwhelmed_shocked`, `shocked_worried`, `sad_worried`, `laughing_ha`, `excited_sparkles`, `holding_yt`, `angry_crossed_arms`, `crying_tears`, `furious_on_fire`, `move_to_spain_playbook`.

### 3.3  Lucide icons

For functional UI iconography (arrows, dropdowns, social, status), the brand uses **Lucide** at:

- **Stroke width** ~ 2 (or 2.5 in CTAs, never thinner than 1.5)
- **Sizes** ~ 10–14px inline with text, 16-18px in featured cards, never 24+ except in mega-CTA buttons
- **Color** ~ `currentColor` so they inherit the parent's text color

Common picks: `ArrowRight`, `ArrowUpRight` (external), `ChevronDown` (dropdowns), `Zap`, `Clock`, `BookOpen`, `Sparkles`. Custom SVGs (`TikTok`, `Threads`) live in the codebase because Lucide doesn't ship them.

### 3.4  Photography

- **Full-bleed, gradient-overlaid.** Hero images get a `bg-gradient-to-t from-black/90 via-black/30 to-transparent` overlay for legibility.
- **Warm, natural light.** No studio HDR, no over-saturated travel-blogger color grading.
- **Portraits framed by rounded corners.** The hero portrait sits in a `rounded-b-[500px]` arch ~ that arch is a brand element.
- **Subject in environment.** Abie at a desk in Madrid, not Abie in a void.

### 3.5  Partner logos

Always **rendered in `--muted-fg` greyscale** in marquees, never in color. The marquee is 25s linear infinite. Logos shipped: `coda`, `feather`, `manychat`, `safetywing`.

---

## 4 ~ Components

The core component vocabulary. See `Abie Maxey UI Kit.html` for the live reference.

### 4.1  Buttons

Three button registers. All buttons are **pill-shaped** (`border-radius: 9999px`) without exception.

- **Primary** ~ filled with `--fg`, text in `--bg`, has an embedded circular arrow chip. Used for the *one* main CTA per section.
- **Secondary** ~ outlined, primary border. Used for "Book a Call", "All Posts" type follow-ups.
- **Tertiary / link** ~ underlined mono label with arrow. Used for tertiary navigation.

### 4.2  Cards

| Card | Look |
|---|---|
| **Content card** | White surface, `rounded-2xl`, `border-border/40`, hover lifts `border-primary/60` |
| **Tinted card** | `bg-primary/5`, `border-primary/30`, used for playbook/feature highlights |
| **Image card** | Full-bleed image, gradient overlay, copy at the bottom in white |
| **Dark hero card** | `bg-fg`, `text-bg`, used for featured/promo blocks at the top of dropdowns |

### 4.3  Badges & pills

- **Status pill** ~ `rounded-full`, `bg-primary/10`, `border-primary/20`, mono uppercase 10px
- **Category chip** ~ same shape, but on dark imagery use `bg-white/10 backdrop-blur-sm`
- **Live dot** ~ 1.5–2px circle, animated pulse, paired with mono label

### 4.4  Navigation

The flagship nav is a **floating glass pill dock** centered top of viewport, `pl-7 pr-3 py-2`, `rounded-full`, `bg-background/60 backdrop-blur-xl`. It contains: logo → divider → nav links → divider → theme toggle. Mobile collapses to a hamburger that opens a right-side slide-in drawer.

### 4.5  IG carousel

A complete sub-system for Instagram. Square `1080×1080`, `72px` safe padding, slide types alternate dark / off-white / primary backgrounds. Always include `abiemaxey.com` and a slide counter (`01 / 06`) in mono at low opacity. See the brand guidelines for the full template.

---

## 5 ~ Files in this system

```
README.md                       ← you are here
SKILL.md                        ← agent instructions for using this system
colors_and_type.css             ← all design tokens

assets/
  logo.png, logo-dark.png       ← wordmark
  abie-logo.png, og-image.png   ← supplemental brand
  stickers/                     ← 18 mascot illustrations
  partners/                     ← coda, feather, manychat, safetywing

cards/
  brand_intro.html              ← brand overview card
  color_palette.html            ← swatches
  typography.html               ← type scale
  spacing_radius.html           ← spacing & radius
  buttons.html                  ← button gallery
  badges_pills.html             ← badge gallery
  cards.html                    ← card patterns
  stickers.html                 ← sticker library

reference/
  brand_guidelines.html         ← full original brand doc

Abie Maxey UI Kit.html          ← live UI kit (start here)
```

---

> Built ~ 2025 ~ v1.0
