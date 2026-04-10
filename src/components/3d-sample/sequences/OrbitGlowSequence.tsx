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
import { OrbitSpheres } from "../core/OrbitSpheres";
import { THREED_COLORS, THREED_FONTS, THREED_TIMING } from "../constants";

/**
 * Scene 04 — Orbit & Glow (14s – 18s, frames 0–120 relative)
 *
 * Neon spheres orbit the floating text like a mini solar system.
 * The camera pulls back slightly to reveal the full orbit radius.
 * Both HELLO and WORLD are present, slowly rotating.
 */
export const OrbitGlowSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Orbits spring in at the start of this scene
  const orbitOpacity = spring({
    frame: frame - 5,
    fps,
    config: THREED_TIMING.smooth,
  });

  // Text continues its slow Y rotation
  const rotationY = interpolate(frame, [0, 120], [0.55, 0.85]);
  const rotationX = 0.08; // subtle tilt for cinematic look

  const labelOpacity = interpolate(frame, [0, 12, 108, 120], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  // Pulse-glow on the label
  const labelPulse = 0.7 + Math.sin(frame * 0.18) * 0.3;

  return (
    <AbsoluteFill>
      {/* ── 3D Layer — wider FOV so orbits are fully visible ── */}
      <ThreeScene cameraZ={11} fov={65}>
        {/* HELLO */}
        <TextMesh
          text="HELLO"
          position={[0, 1.0, 0]}
          rotation={[rotationX, rotationY, 0]}
          scale={1.15}
          opacity={1}
          color="#f9f9ff"
          glowColor="#a78bfa"
        />

        {/* WORLD */}
        <TextMesh
          text="WORLD"
          position={[0, -1.1, 0]}
          rotation={[rotationX, rotationY * 0.75, 0]}
          scale={1.0}
          opacity={0.85}
          color="#a78bfa"
          glowColor="#60a5fa"
        />

        {/* Orbiting neon spheres */}
        <OrbitSpheres
          frame={frame}
          count={8}
          radius={4.8}
          opacity={Math.min(orbitOpacity, 1)}
          tilt={0.3}
        />
      </ThreeScene>

      {/* ── 2D Overlay ── */}
      <AbsoluteFill style={{ pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: 110,
            right: 80,
            fontFamily: THREED_FONTS.mono,
            fontSize: 26,
            color: THREED_COLORS.accent,
            letterSpacing: 6,
            opacity: labelOpacity * labelPulse,
            textTransform: "uppercase",
          }}
        >
          [ 04. ORBIT ]
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
