import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { ThreeScene } from "../core/ThreeScene";
import { TextMesh } from "../core/TextMesh";
import { Particles } from "../core/Particles";
import { THREED_COLORS, THREED_FONTS, THREED_TIMING } from "../constants";

/**
 * Scene 02 — 3D Text Drop-In (4s – 9s, frames 0–150 relative)
 *
 * The word "HELLO" springs into view from behind the camera with a
 * satisfying bounce. Particles float gently in the background.
 * The text slowly rotates on its Y-axis to reveal depth.
 */
export const TextDropInSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Scale spring — text "drops in" from scale 0 → 1, with overshoot
  const scaleSpring = spring({
    frame: frame - 8,
    fps,
    config: THREED_TIMING.bounce,
  });

  // Gentle Y-axis rotation: tilted left on entry → settles near-straight
  const rotationY = interpolate(frame, [0, 150], [0.45, -0.08]);

  // Opacity follows scale closely so text fades in as it grows
  const textOpacity = Math.min(scaleSpring, 1);

  // Label + exit fade
  const labelOpacity = interpolate(frame, [0, 12, 138, 150], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Subtitle text rises from below after text lands
  const subtitleOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const subtitleY = interpolate(frame, [55, 80], [30, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* ── 3D Layer ── */}
      <ThreeScene cameraZ={8}>
        {/* Floating particle background */}
        <Particles progress={1} phase="float" frame={frame} />

        {/* Main 3D text */}
        <TextMesh
          text="HELLO"
          position={[0, 0.6, 0]}
          rotation={[0, rotationY, 0]}
          scale={scaleSpring * 1.15}
          opacity={textOpacity}
          color="#f9f9ff"
          glowColor="#a78bfa"
        />
      </ThreeScene>

      {/* ── 2D Overlay ── */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {/* Scene label */}
        <div
          style={{
            position: "absolute",
            top: 110,
            right: 80,
            fontFamily: THREED_FONTS.mono,
            fontSize: 26,
            color: THREED_COLORS.primary,
            letterSpacing: 6,
            opacity: labelOpacity,
            textTransform: "uppercase",
          }}
        >
          [ 02. REVEAL ]
        </div>

        {/* Subtitle rising from below */}
        <div
          style={{
            position: "absolute",
            bottom: 220,
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: THREED_FONTS.mono,
              fontSize: 30,
              color: THREED_COLORS.secondary,
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            — 3D Text Reveal —
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
