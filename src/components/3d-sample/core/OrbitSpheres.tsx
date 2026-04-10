import React, { useMemo } from "react";

const SPHERE_COLORS = ["#a78bfa", "#60a5fa", "#f472b6", "#34d399", "#fbbf24", "#f87171", "#38bdf8", "#e879f9"];

interface OrbitSpheresProps {
  /** Current frame from useCurrentFrame() — drives orbit position */
  frame: number;
  /** Number of orbiting spheres */
  count?: number;
  /** Orbit radius in Three.js units */
  radius?: number;
  /** Material opacity (0–1) */
  opacity?: number;
  /** Additional Y-axis tilt of orbits in radians */
  tilt?: number;
}

/**
 * OrbitSpheres — Glowing neon spheres that orbit around the origin.
 * Each sphere has a unique orbit angle, speed, size, elevation, and colour.
 * Animation is pure deterministic math driven by `frame` from the parent.
 */
export const OrbitSpheres: React.FC<OrbitSpheresProps> = ({
  frame,
  count = 8,
  radius = 4.5,
  opacity = 1,
  tilt = 0.2,
}) => {
  const spheres = useMemo(() =>
    Array.from({ length: count }, (_, i) => {
      const seed = (i + 1) * 1.6180339887;
      return {
        baseAngle: (i / count) * Math.PI * 2,
        color: SPHERE_COLORS[i % SPHERE_COLORS.length],
        size: 0.12 + (i % 3) * 0.09,
        yBase: Math.sin(seed * 2.1) * 1.8,
        orbitSpeed: 0.40 + (i % 4) * 0.12,
        verticalAmp: 0.5 + (i % 2) * 0.4,
        // Second orbital plane (tilted)
        tiltFactor: i % 2 === 0 ? 1 : -1,
      };
    }),
    [count]
  );

  return (
    <>
      {spheres.map((s, i) => {
        const angle = s.baseAngle + frame * 0.016 * s.orbitSpeed;

        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        // Slight figure-8 vertical motion for dimension
        const y = s.yBase + Math.sin(angle * 2) * s.verticalAmp;

        // Tilted second-plane offset
        const tiltOffset = s.tiltFactor * Math.sin(angle + Math.PI / 4) * tilt * radius * 0.3;

        return (
          <mesh key={i} position={[x + tiltOffset * 0.3, y + tiltOffset, z]}>
            <sphereGeometry args={[s.size, 16, 16]} />
            <meshStandardMaterial
              color={s.color}
              emissive={s.color}
              emissiveIntensity={3.5}
              transparent={true}
              opacity={opacity}
            />
          </mesh>
        );
      })}
    </>
  );
};
