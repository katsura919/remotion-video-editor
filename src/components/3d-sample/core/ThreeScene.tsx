import React from "react";
import { ThreeCanvas } from "@remotion/three";
import { useVideoConfig } from "remotion";

interface ThreeSceneProps {
  children: React.ReactNode;
  cameraZ?: number;
  fov?: number;
}

/**
 * ThreeScene — Reusable ThreeCanvas wrapper with a cinematic lighting rig.
 * All 3D content must be placed inside this component.
 * Lighting: purple rim, blue fill, pink back light.
 */
export const ThreeScene: React.FC<ThreeSceneProps> = ({
  children,
  cameraZ = 8,
  fov = 60,
}) => {
  const { width, height } = useVideoConfig();

  return (
    <ThreeCanvas
      width={width}
      height={height}
      camera={{ position: [0, 0, cameraZ], fov }}
    >
      {/* Ambient base light */}
      <ambientLight intensity={0.25} />
      {/* Key light — white, from front-top-right */}
      <directionalLight position={[4, 8, 6]} intensity={1.0} color="#ffffff" />
      {/* Purple rim light — left */}
      <pointLight position={[-5, 2, 4]}  intensity={4} color="#a78bfa" decay={2} />
      {/* Blue fill light — right */}
      <pointLight position={[5, -2, 4]}  intensity={3} color="#60a5fa" decay={2} />
      {/* Pink back light — behind subject */}
      <pointLight position={[0, 0, -6]}  intensity={2} color="#f472b6" decay={2} />

      {children}
    </ThreeCanvas>
  );
};
