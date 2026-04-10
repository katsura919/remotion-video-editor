import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface LightSweepProps {
  /** The colour of the light streak (should match glowColor) */
  color?: string;
  /** Frame the sweep begins at */
  startFrame?: number;
  /** Frame the sweep ends at */
  endFrame?: number;
}

/**
 * LightSweep — a thin diagonal light streak that crosses the logo once
 * during the logo-appear phase, giving a premium metallic "shine" feel.
 */
export const LightSweep: React.FC<LightSweepProps> = ({
  color = "#ffffff",
  startFrame = 56,
  endFrame = 84,
}) => {
  const frame = useCurrentFrame();

  // Horizontal position of the sweep centre (% of screen width)
  const sweepPos = interpolate(frame, [startFrame, endFrame], [-15, 115], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade in and out at the edges of the sweep window
  const sweepOpacity = interpolate(
    frame,
    [startFrame, startFrame + 6, endFrame - 6, endFrame],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        opacity: sweepOpacity,
      }}
    >
      {/* Wide soft halo */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sweepPos - 10}%`,
          width: "24%",
          background: `linear-gradient(
            108deg,
            transparent 0%,
            ${color}05 25%,
            ${color}12 50%,
            ${color}05 75%,
            transparent 100%
          )`,
          transform: "skewX(-12deg)",
        }}
      />
      {/* Thin bright core streak */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${sweepPos - 0.6}%`,
          width: "1.2%",
          background: `linear-gradient(
            108deg,
            transparent 0%,
            ${color}22 30%,
            ${color}40 50%,
            ${color}22 70%,
            transparent 100%
          )`,
          transform: "skewX(-12deg)",
          filter: "blur(2px)",
        }}
      />
    </div>
  );
};
