import type React from "react";

// Abie Maxey Design System ~ dark mode palette
export const BRAND = {
  bg: "#1e1b1a",
  fg: "#f9f5f2",
  card: "#272422",
  primary: "#e3a99c",       // dusty pink/peach ~ THE accent
  primarySoft: "#f2d6c9",   // lifted primary
  secondary: "#3d3836",     // warm sand dark ~ borders, dividers
  mutedFg: "#a69e9a",       // captions, meta text
  accent: "#bbcccd",        // dusty teal/sage ~ data, emphasis
  border: "#3d3836",
} as const;

// Heading display style ~ Host Grotesk 800 uppercase
export const H_DISPLAY: React.CSSProperties = {
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "-0.04em",
  lineHeight: 0.88,
};

// Accent word inside headline ~ Instrument Serif italic lowercase
export const H_ACCENT: React.CSSProperties = {
  fontStyle: "italic",
  fontWeight: 400,
  textTransform: "lowercase",
  letterSpacing: "0",
  opacity: 0.88,
};

// Mono label ~ Geist Mono uppercase wide tracking
export const LABEL_MONO: React.CSSProperties = {
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
  color: "#a69e9a",
};
