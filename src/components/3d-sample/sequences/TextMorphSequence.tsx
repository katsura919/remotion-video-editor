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
import { GlassCard } from "../core/GlassCard";
import { THREED_COLORS, THREED_FONTS, THREED_TIMING } from "../constants";

/**
 * Scene 03 — Text Morph + Glass Card (9s – 14s, frames 0–150 relative)
 *
 * "HELLO" continues rotating while "WORLD" springs in below it.
 * A glassmorphism card fades up at the bottom with a tagline.
 */
export const TextMorphSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // HELLO continues the Y rotation it was doing in scene 02
  const rotationY = interpolate(frame, [0, 150], [-0.08, 0.55]);

  // WORLD springs in from scale 0
  const worldScale = spring({
    frame: frame - 18,
    fps,
    config: THREED_TIMING.smooth,
  });

  // Glass card entrance
  const cardOpacity = interpolate(frame, [55, 85], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cardY = interpolate(frame, [55, 85], [50, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const labelOpacity = interpolate(frame, [0, 12, 138, 150], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      {/* ── 3D Layer ── */}
      <ThreeScene cameraZ={8}>
        <Particles progress={1} phase="float" frame={frame} />

        {/* HELLO — shifted upward to make room for WORLD */}
        <TextMesh
          text="HELLO"
          position={[0, 1.5, 0]}
          rotation={[0, rotationY, 0]}
          scale={1.15}
          opacity={1}
          color="#f9f9ff"
          glowColor="#a78bfa"
        />

        {/* WORLD — springs in below with purple glow */}
        <TextMesh
          text="WORLD"
          position={[0, -0.6, 0]}
          rotation={[0, rotationY * 0.75, 0]}
          scale={Math.max(worldScale * 1.05, 0.001)}
          opacity={Math.min(worldScale, 1)}
          color="#a78bfa"
          glowColor="#60a5fa"
        />
      </ThreeScene>

      {/* ── 2D Overlay ── */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        {/* Scene label */}
        <div
          style={{
            position: "absolute",
            top: 110,
            left: 80,
            fontFamily: THREED_FONTS.mono,
            fontSize: 26,
            color: THREED_COLORS.secondary,
            letterSpacing: 6,
            opacity: labelOpacity,
            textTransform: "uppercase",
          }}
        >
          [ 03. EXPAND ]
        </div>

        {/* Glassmorphism card at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 140,
            left: 60,
            right: 60,
            opacity: cardOpacity,
            transform: `translateY(${cardY}px)`,
          }}
        >
          <GlassCard>
            <div
              style={{
                fontFamily: THREED_FONTS.mono,
                fontSize: 22,
                color: THREED_COLORS.primary,
                letterSpacing: 4,
                marginBottom: 14,
                textTransform: "uppercase",
              }}
            >
              @remotion/three
            </div>
            <div
              style={{
                fontFamily: THREED_FONTS.display,
                fontSize: 46,
                fontWeight: 700,
                color: THREED_COLORS.text,
                lineHeight: 1.25,
              }}
            >
              3D in React.{" "}
              <span style={{ color: THREED_COLORS.secondary }}>
                No compromise.
              </span>
            </div>
          </GlassCard>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
