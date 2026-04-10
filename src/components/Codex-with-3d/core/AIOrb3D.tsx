import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { ThreeCanvas } from "@remotion/three";

interface AIOrb3DProps {
  /** Explicit canvas width — pass the container width, not composition width */
  width: number;
  /** Explicit canvas height — pass the container height */
  height: number;
  /** Overall opacity of the entire scene */
  opacity?: number;
}

const PARTICLE_COUNT = 55;

/** Colours for the particle field — purple, blue, pink */
const PARTICLE_COLORS = ["#a78bfa", "#60a5fa", "#f472b6"];

/** Pre-computed particle positions (stable between renders) */
function buildParticles() {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const golden = i * 2.399; // golden-angle phi
    const phi = Math.acos(1 - (2 * i) / PARTICLE_COUNT);
    const theta = golden;
    const r = 3.2 + (i % 5) * 0.45;
    return {
      x: Math.sin(phi) * Math.cos(theta) * r,
      y: Math.cos(phi) * r * 0.7,
      z: Math.sin(phi) * Math.sin(theta) * r,
      size: 0.035 + (i % 4) * 0.018,
      colorIdx: i % 3,
      drift: 0.35 + (i % 4) * 0.18,
    };
  });
}

/** The inner Three.js scene — all driven by Remotion's frame, no useFrame() */
const Scene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const particles = useMemo(buildParticles, []);

  // ── Entrance spring ──────────────────────────────────────────────────────
  const enter = spring({ frame: frame - 5, fps, config: { stiffness: 70, damping: 14 } });
  const orbScale = enter;

  // ── Central sphere rotation ──────────────────────────────────────────────
  const rotY = frame * 0.009;
  const rotX = Math.sin(frame * 0.022) * 0.22;

  // ── Orbital ring angles ──────────────────────────────────────────────────
  const ring1Angle = frame * 0.020;   // primary orbit
  const ring2Angle = frame * -0.014;  // counter-orbit

  // ── Glow pulse ───────────────────────────────────────────────────────────
  const glowPulse = 0.5 + Math.sin(frame * 0.065) * 0.15;

  return (
    <>
      {/* ── Lighting ── */}
      <ambientLight intensity={0.25} />
      <pointLight position={[0, 0, 5]}  intensity={6} color="#a78bfa" decay={2} />
      <pointLight position={[4, 3, 4]}  intensity={3} color="#60a5fa" decay={2} />
      <pointLight position={[-4, -3, 3]} intensity={2.5} color="#f472b6" decay={2} />

      {/* ── Central solid sphere (AI Brain) ── */}
      <mesh rotation={[rotX, rotY, 0]} scale={orbScale * 1.1}>
        <sphereGeometry args={[1.1, 48, 48]} />
        <meshStandardMaterial
          color="#150a28"
          emissive="#6d28d9"
          emissiveIntensity={glowPulse * 0.7}
          roughness={0.25}
          metalness={0.85}
        />
      </mesh>

      {/* ── Wireframe overlay — counter-rotates slightly ── */}
      <mesh rotation={[rotX * 0.6, rotY * -0.4, rotY * 0.2]} scale={orbScale * 1.145}>
        <sphereGeometry args={[1.1, 10, 10]} />
        <meshStandardMaterial
          color="#a78bfa"
          emissive="#a78bfa"
          emissiveIntensity={glowPulse * 1.2}
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* ── Second outer wireframe (slower) ── */}
      <mesh rotation={[rotX * 0.3, rotY * 0.55, 0]} scale={orbScale * 1.35}>
        <sphereGeometry args={[1.1, 7, 7]} />
        <meshStandardMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={glowPulse * 0.8}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>

      {/* ── Orbital Ring 1 — 5 neon purple spheres ── */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = ring1Angle + (i / 5) * Math.PI * 2;
        const r = 2.3;
        return (
          <mesh
            key={`r1-${i}`}
            position={[Math.cos(a) * r, Math.sin(a) * 0.55, Math.sin(a) * r]}
            scale={orbScale}
          >
            <sphereGeometry args={[0.13, 12, 12]} />
            <meshStandardMaterial
              color="#a78bfa"
              emissive="#a78bfa"
              emissiveIntensity={3.5}
              transparent
              opacity={0.85}
            />
          </mesh>
        );
      })}

      {/* ── Orbital Ring 2 — 4 neon blue spheres, tilted 50° ── */}
      {Array.from({ length: 4 }, (_, i) => {
        const a = ring2Angle + (i / 4) * Math.PI * 2;
        const tilt = 0.9;
        const r = 2.05;
        return (
          <mesh
            key={`r2-${i}`}
            position={[
              Math.cos(a) * r,
              Math.sin(a) * r * Math.sin(tilt),
              Math.sin(a) * r * Math.cos(tilt),
            ]}
            scale={orbScale}
          >
            <sphereGeometry args={[0.095, 10, 10]} />
            <meshStandardMaterial
              color="#60a5fa"
              emissive="#60a5fa"
              emissiveIntensity={3.5}
              transparent
              opacity={0.75}
            />
          </mesh>
        );
      })}

      {/* ── Orbital Ring 3 — 3 pink micro-spheres, high tilt ── */}
      {Array.from({ length: 3 }, (_, i) => {
        const a = ring1Angle * 0.7 + (i / 3) * Math.PI * 2;
        const tilt = 1.25;
        const r = 1.75;
        return (
          <mesh
            key={`r3-${i}`}
            position={[
              Math.cos(a) * r * Math.cos(tilt),
              Math.sin(a) * r,
              Math.cos(a) * r * Math.sin(tilt),
            ]}
            scale={orbScale}
          >
            <sphereGeometry args={[0.075, 8, 8]} />
            <meshStandardMaterial
              color="#f472b6"
              emissive="#f472b6"
              emissiveIntensity={3}
              transparent
              opacity={0.7}
            />
          </mesh>
        );
      })}

      {/* ── Background particle field ── */}
      {particles.map((p, i) => {
        const dx = p.x + Math.sin(frame * 0.007 * p.drift + i) * 0.18;
        const dy = p.y + Math.cos(frame * 0.005 * p.drift + i * 0.7) * 0.12;
        const particleOpacity = (0.35 + Math.sin(frame * 0.06 + i) * 0.22) * orbScale;
        return (
          <mesh key={`p-${i}`} position={[dx, dy, p.z]}>
            <sphereGeometry args={[p.size, 6, 6]} />
            <meshStandardMaterial
              color={PARTICLE_COLORS[p.colorIdx]}
              emissive={PARTICLE_COLORS[p.colorIdx]}
              emissiveIntensity={2}
              transparent
              opacity={particleOpacity}
            />
          </mesh>
        );
      })}
    </>
  );
};

/**
 * AIOrb3D — A cinematic 3D AI brain visualization using @remotion/three.
 *
 * Features:
 *  - Central metallic sphere with animated wireframe overlays
 *  - 3 orbital rings of neon spheres (purple, blue, pink) driven by frame
 *  - 55-particle background nebula field
 *  - Entrance spring animation
 *  - All animations use useCurrentFrame() — no useFrame()
 */
export const AIOrb3D: React.FC<AIOrb3DProps> = ({ width, height, opacity = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width, height, opacity }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 7], fov: 54 }}
      >
        <Scene frame={frame} fps={fps} />
      </ThreeCanvas>
    </div>
  );
};
