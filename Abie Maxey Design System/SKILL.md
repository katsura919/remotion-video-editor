# SKILL ~ Abie Maxey design system

When a designer or agent uses this system to design a page, slide, or post, follow these rules.

## 1. Always link the tokens

Every HTML file you create in this system must `<link rel="stylesheet" href="colors_and_type.css" />` (or the relative path equivalent). Don't redeclare the tokens. Don't import other Google Fonts ~ the three families needed are already loaded in the CSS.

## 2. Use the recipe for headlines

Default headline construction is **font-black UPPERCASE Host Grotesk + italic lowercase Instrument Serif accent**:

```html
<h2 class="h-display">Latest <span class="h-accent">writing</span></h2>
```

Roughly 80% of headlines on the site use exactly this pattern. Use it before you reach for anything else.

## 3. Tilde, never em-dash

The `~` is the brand's signature connector. It replaces every em-dash and most colons in titles. Section labels are `01 ~ Title`, never `01 — Title`.

## 4. One primary, used like a highlighter

`--primary` (`#e3a99c`) is for accents inside headlines, button fills, hover states, and pull-quote borders. **Never** as a flood-fill background for a whole page or section. The page background is always `--bg` (warm off-white) or `--fg` (charcoal in the dark closing block).

## 5. Pill, always

All buttons use `border-radius: 9999px`. The primary CTA has a circular arrow chip on the right; secondary uses a 1px primary border; tertiary is mono-uppercase text with `→`. Never sentence-case.

## 6. Borders, not shadows

Surfaces differ via `border` + `bg`, not `box-shadow`. The only places shadows show up are the floating glass-pill nav and modal overlays.

## 7. Stickers replace emoji

If you'd reach for 🎉 / 🤔 / 💼 / 😤, use a sticker from `assets/stickers/` instead. Sized 80–160px, slightly rotated, never inside body text. Use real emoji only in micro-meta lines (e.g. card metadata `📖 15 Lessons`) where a sticker would be too loud.

For IG carousel slides, sticker choice is automatic, not optional:

- Add 1–2 stickers per post without asking the user.
- Pick stickers from slide emotion/context (hook shock, pain point, insight, CTA).
- Default placement: hook slide + CTA slide unless another slide has stronger emotional fit.
- Never ask whether stickers should be added; add them directly.

## 8. Mono labels everywhere

Section numbers, captions, slide counters, status pills ~ all 9–11px, UPPERCASE, tracking-widest, in `Geist Mono`. Never use mono for body copy.

## 9. Specificity over inspiration

Sentences that could come from a LinkedIn carousel by someone who has never lived the thing don't ship. "27 countries and a weak passport later" beats "I traveled a lot." "~$1,200/mo runway" beats "affordable living abroad."

## 10. When making slides

- Square 1080×1080 for IG; 1920×1080 for general decks.
- 72px safe padding inside any 1080² IG slide.
- Always show URL (`abiemaxey.com`) and slide counter (`01 / 06`) in mono at low opacity.
- Alternate slide backgrounds: dark `--fg` → cream `--bg` → peach `--primary`. Never two same-tone slides in a row.

## 11. When unsure

Open `Abie Maxey UI Kit.html` and copy the closest pattern. If a pattern doesn't exist, ask before inventing.
