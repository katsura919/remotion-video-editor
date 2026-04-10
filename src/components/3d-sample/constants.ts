export const THREED_COLORS = {
  background: "#0a0a0f",
  primary: "#a78bfa",   // purple glow
  secondary: "#60a5fa", // electric blue
  accent: "#f472b6",    // neon pink
  text: "#f9f9ff",      // off-white
  muted: "#4b5563",
};

export const THREED_FONTS = {
  display: '"Inter", system-ui, sans-serif',
  mono: '"Geist Mono", monospace',
};

export const THREED_TIMING = {
  fast: { stiffness: 200, damping: 20 },
  smooth: { stiffness: 80, damping: 12 },
  bounce: { stiffness: 250, damping: 12, mass: 0.8 },
  gentle: { stiffness: 60, damping: 14 },
};

// Scene timing in frames @ 30fps
export const SCENE = {
  particleIntro: { from: 0,   duration: 120 }, // 0s  – 4s
  textDropIn:    { from: 120, duration: 150 }, // 4s  – 9s
  textMorph:     { from: 270, duration: 150 }, // 9s  – 14s
  orbitGlow:     { from: 420, duration: 120 }, // 14s – 18s
  signOff:       { from: 540, duration: 60  }, // 18s – 20s
  total: 600,
};
