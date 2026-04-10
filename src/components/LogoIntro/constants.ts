// All frame numbers assume 30 fps

export const LOGO_INTRO_COLORS = {
  background: "#0a0a0f",
  backgroundEnd: "#0f0f24",
  glowColor: "#6366f1",   // indigo — change this for different brand colours
  logoText: "#ffffff",
  accentLight: "#8b5cf6",
};

export const LOGO_INTRO_TIMING = {
  // Phase boundaries
  intro:      { from: 0,   to: 45  }, // 0s   – 1.5s  (black → glow)
  logoAppear: { from: 45,  to: 90  }, // 1.5s – 3s    (fade/scale/blur in)
  rotation:   { from: 90,  to: 150 }, // 3s   – 5s    (3D rotateY/rotateX)
  exit:       { from: 150, to: 180 }, // 5s   – 6s    (fade + zoom out)
  lightSweep: { from: 56,  to: 84  }, // fires once during logo appear
  total: 180,
};
