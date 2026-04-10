import React, { useMemo } from "react";

const PARTICLE_COUNT = 80;

interface ParticlesProps {
  /** 0 = fully scattered at edges, 1 = converged to center */
  progress?: number;
  /** "scatter" = particles fly inward; "float" = gently drift in place */
  phase?: "scatter" | "float";
  /** Current frame from useCurrentFrame() — drives the float animation */
  frame?: number;
}

/**
 * Particles — A field of glowing neon dots.
 * In "scatter" mode the dots converge toward the center as `progress` increases.
 * In "float" mode the dots gently drift using sinusoidal motion driven by `frame`.
 */
export const Particles: React.FC<ParticlesProps> = ({
  progress = 0,
  phase = "float",
  frame = 0,
}) => {
  const colors = ["#a78bfa", "#60a5fa", "#f472b6"];

  const particles = useMemo(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, i) => {
      // Deterministic "random" positions using the golden ratio
      const seed = (i + 1) * 1.6180339887;
      const angle = seed * 6.283185;
      const orbitRadius = 7 + (i % 7) * 1.5;

      return {
        startX: Math.cos(angle) * orbitRadius,
        startY: Math.sin(angle) * orbitRadius * 1.8,
        startZ: Math.sin(angle * 0.7) * 4,
        driftX: Math.sin(seed * 2.3) * 0.6,
        driftY: Math.cos(seed * 1.7) * 0.6,
        size: 0.04 + (i % 5) * 0.018,
        colorIdx: i % 3,
        speed: 0.5 + (i % 3) * 0.25,
      };
    });
  }, []);

  return (
    <>
      {particles.map((p, i) => {
        let x: number, y: number, z: number;

        if (phase === "scatter") {
          // Fly from edge toward center based on `progress` (0→1)
          x = p.startX * (1 - progress) + Math.sin(frame * 0.015 + i) * 0.2;
          y = p.startY * (1 - progress) + Math.cos(frame * 0.01  + i) * 0.2;
          z = p.startZ * (1 - progress * 0.6);
        } else {
          // Gentle float — sinusoidal drift in place, radius fades with progress
          const spread = 1 - progress * 0.9;
          x = p.startX * spread + Math.sin(frame * 0.012 * p.speed + i * 0.9) * p.driftX;
          y = p.startY * spread + Math.cos(frame * 0.009 * p.speed + i * 1.1) * p.driftY;
          z = p.startZ * spread;
        }

        const opacity =
          phase === "scatter"
            ? 0.3 + progress * 0.65
            : 0.5 + Math.sin(frame * 0.05 + i) * 0.25;

        return (
          <mesh key={i} position={[x, y, z]}>
            <sphereGeometry args={[p.size, 8, 8]} />
            <meshStandardMaterial
              color={colors[p.colorIdx]}
              emissive={colors[p.colorIdx]}
              emissiveIntensity={2.5}
              transparent={true}
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </>
  );
};
