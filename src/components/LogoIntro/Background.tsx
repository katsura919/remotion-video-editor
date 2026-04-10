import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, Easing } from "remotion";

interface BackgroundProps {
  glowColor: string;
}

/**
 * Background — dark gradient base + animated ambient glow + edge vignette + film grain.
 * The ambient glow fades in during the intro phase and pulses gently throughout.
 */
export const Background: React.FC<BackgroundProps> = ({ glowColor }) => {
  const frame = useCurrentFrame();

  // Glow fades in 0→1 over the intro phase (frames 0–45)
  const glowOpacity = interpolate(frame, [0, 45], [0, 1], {
    easing: Easing.out(Easing.quad),
    extrapolateRight: "clamp",
  });

  // Exit: glow fades back out (frames 150–180)
  const glowExitOpacity = interpolate(frame, [150, 180], [1, 0], {
    easing: Easing.in(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalGlowOpacity = glowOpacity * glowExitOpacity;

  // Slow organic pulsing (varies ±8% scale)
  const glowScale = 1 + Math.sin(frame * 0.035) * 0.08;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(145deg, #0a0a0f 0%, #0f0f24 55%, #0a0a18 100%)`,
      }}
    >
      {/* ── Ambient radial glow — centre screen ── */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: `translate(-50%, -50%) scale(${glowScale})`,
          width: 900,
          height: 680,
          borderRadius: "50%",
          background: `radial-gradient(ellipse,
            ${glowColor}28 0%,
            ${glowColor}10 35%,
            ${glowColor}04 60%,
            transparent 75%
          )`,
          filter: "blur(50px)",
          opacity: finalGlowOpacity,
          pointerEvents: "none",
        }}
      />

      {/* ── Secondary colour splash (top-left) ── */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "-5%",
          width: 600,
          height: 500,
          borderRadius: "50%",
          background: `radial-gradient(ellipse, ${glowColor}0c 0%, transparent 70%)`,
          filter: "blur(80px)",
          opacity: finalGlowOpacity * 0.6,
          pointerEvents: "none",
        }}
      />

      {/* ── Vignette (edges → dark) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 85% 75% at 50% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Film grain (SVG noise — very subtle) ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.032,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
