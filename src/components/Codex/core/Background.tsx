import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { CODEX_COLORS } from "../constants";

export const Background: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill style={{ backgroundColor: CODEX_COLORS.background }}>
      {/* Dynamic Animated Gradient Orbs adapted to lighter palette */}
      <div
        style={{
          position: "absolute",
          width: "140%",
          height: "140%",
          top: "-20%",
          left: "-20%",
          background: `radial-gradient(circle at ${
            50 + Math.sin(frame / 60) * 10
          }% ${50 + Math.cos(frame / 60) * 10}%, rgba(227, 169, 156, 0.4), transparent 50%),
          radial-gradient(circle at ${
            40 + Math.cos(frame / 40) * 15
          }% ${60 + Math.sin(frame / 40) * 15}%, rgba(187, 204, 205, 0.4), transparent 60%)`,
          filter: "blur(60px)",
          opacity: 0.8,
        }}
      />

      {/* 1. Minimalist Crosshairs Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 37v6M37 40h6' stroke='rgba(0,0,0,0.1)' stroke-width='1.5' stroke-linecap='round' fill='none'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* 2. Film Grain / Additive Noise filter */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          opacity: 0.04, // Very subtle, barely there
          mixBlendMode: "multiply", 
          pointerEvents: "none",
          zIndex: 1, // Sits above all background elements but under composition cards
        }}
      />
    </AbsoluteFill>
  );
};
