import type React from "react";

// Abie Maxey Design System ~ light + dark tokens
export const BRAND = {
  // Light (canvas)
  bg: "#f9f5f2",
  fg: "#3a3a3a",
  card: "#ffffff",
  primary: "#e3a99c",
  primarySoft: "#f2d6c9",
  secondary: "#e7ddd3",
  mutedFg: "#6b6b6b",
  accent: "#bbcccd",
  border: "#e7ddd3",
  // Dark variant (used in hook + CTA scene for alternation)
  darkBg: "#1e1b1a",
  darkFg: "#f9f5f2",
  darkCard: "#272422",
  darkMutedFg: "#a69e9a",
  darkBorder: "#3d3836",
} as const;

export const H_DISPLAY: React.CSSProperties = {
  fontWeight: 800,
  textTransform: "uppercase",
  letterSpacing: "-0.04em",
  lineHeight: 0.88,
};

export const H_ACCENT: React.CSSProperties = {
  fontStyle: "italic",
  fontWeight: 400,
  textTransform: "lowercase",
  letterSpacing: "0",
  opacity: 0.88,
};

export const LABEL_MONO: React.CSSProperties = {
  fontWeight: 400,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
};

export const BODY_SERIF: React.CSSProperties = {
  fontStyle: "italic",
  fontWeight: 400,
  lineHeight: 1.55,
};
