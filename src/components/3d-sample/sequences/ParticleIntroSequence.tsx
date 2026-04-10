import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ThreeScene } from "../core/ThreeScene";
import { Particles } from "../core/Particles";
import { THREED_COLORS, THREED_FONTS } from "../constants";

/**
 * Scene 01 — Particle Intro (0s – 4s, frames 0–120)
 *
 * A swarm of neon particles slowly converges from the edges toward the
 * centre of the screen. A scene label and teaser line fade in from below.
 */
export const ParticleIntroSequence: React.FC = () => {
  const frame = useCurrentFrame();

  // Particles converge in the second half of this scene
  const convergeProgress = interpolate(frame, [50, 110], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [22, 48], [0, 1], {
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [22, 48], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(frame, [100, 120], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* ── 3D Layer ── */}
      <ThreeScene cameraZ={10}>
        <Particles progress={convergeProgress} phase="scatter" frame={frame} />
      </ThreeScene>

      {/* ── 2D Overlay ── */}
      <AbsoluteFill style={{ pointerEvents: "none", opacity: exitOpacity }}>
        {/* Scene label */}
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 80,
            fontFamily: THREED_FONTS.mono,
            fontSize: 26,
            color: THREED_COLORS.primary,
            letterSpacing: 6,
            opacity: labelOpacity,
            textTransform: "uppercase",
          }}
        >
          [ 01. INTRO ]
        </div>

        {/* Teaser headline */}
        <div
          style={{
            position: "absolute",
            bottom: 240,
            left: 80,
            right: 80,
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: THREED_FONTS.display,
              fontSize: 64,
              fontWeight: 800,
              color: THREED_COLORS.text,
              lineHeight: 1.18,
            }}
          >
            Entering the
          </div>
          <div
            style={{
              fontFamily: THREED_FONTS.display,
              fontSize: 64,
              fontWeight: 800,
              lineHeight: 1.18,
              background: `linear-gradient(135deg, ${THREED_COLORS.primary}, ${THREED_COLORS.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            third dimension.
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
