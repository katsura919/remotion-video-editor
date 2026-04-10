# Remotion Video Design Prompt: Abie Maxey Style

This document contains the prompt to be used for generating the Remotion video component structure, following the established branding and design patterns.

## The Prompt

"Create a Remotion video template for Instagram Reels (1080x1920) that implements the **Abie Maxey Design System**.

**Visual Design Architecture:**
1. **Background**: Use a solid `#f9f5f2` (Cream) background. Add a subtle animated grain overlay (low opacity) for a premium tactile feel.
2. **Typography**: 
   - Load 'Instrument Serif' for big editorial titles.
   - Load 'Space Grotesk' for labels, tech data, and ticker text.
3. **Color Palette**: 
   - Foreground Text: `#3a3a3a`
   - Primary Accent (Pills, Highlights): `#e3a99c`
   - Secondary Details: `#bbcccd`
4. **Core Components**:
   - **Header**: A category pill at the top left containing text like 'AI TRENDS' or 'TECH UPDATE'. Include a small 'LIVE' dot with a secondary rose-colored pulse animation.
   - **Centerpiece**: A title container using 'Instrument Serif'. Implement a 'Split-Text Reveal' where lines slide up into view with a spring-based easing.
   - **News Ticker**: A bottom-aligned marquee using `#3a3a3a` text on a `#e7ddd3` bar. The marquee should scroll continuously with news items.
   - **Dynamic Cards**: Simple, clean rectangles with rounded corners (`radius: 0.625rem`) that enter from the bottom using a staggered spring animation.

**Animation Requirements:**
- All movements must use the `spring(frame, fps, {stiffness: 100, damping: 10})` configuration.
- Use `AbsoluteFill` for all layers.
- Implement the 'word-reveal' pattern: mask each word by putting it in a container with `overflow-hidden` and sliding it up.

**Technical Constraints:**
- Use TailwindCSS for layout.
- Animate only using `useCurrentFrame()`.
- Ensure all components are modular and accept `title`, `category`, and `newsItems` as props."

---

## Design Tokens Summary

| Token | Value | usage |
| :--- | :--- | :--- |
| **Cream** | `#f9f5f2` | Main Background |
| **Rose** | `#e3a99c` | Primary Accent / Pulsing Ring |
| **Charcoal** | `#3a3a3a` | Primary Typography |
| **Beige** | `#e7ddd3` | Ticker Background |
| **Teal** | `#bbcccd` | Secondary Accents |
| **Heading Font** | Instrument Serif | Editorial Style |
| **Label Font** | Space Grotesk | Tech/Modern Vibe |
