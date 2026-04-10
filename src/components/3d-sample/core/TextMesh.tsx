import React, { useMemo } from "react";
import * as THREE from "three";

interface TextMeshProps {
  text: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** Uniform scale applied to the mesh */
  scale?: number;
  /** Material opacity (0–1) */
  opacity?: number;
  /** Text fill colour (CSS string) */
  color?: string;
  /** Glow/shadow halo colour (CSS string) */
  glowColor?: string;
}

/**
 * TextMesh — Renders bold text onto a CanvasTexture and applies it to a 3D
 * plane geometry.  The text is drawn with a multi-pass glow, then composited
 * onto a transparent canvas, so it integrates naturally with Three.js lighting.
 *
 * All animation props (position, rotation, scale, opacity) are driven by the
 * parent via useCurrentFrame() — no internal useFrame() used.
 */
export const TextMesh: React.FC<TextMeshProps> = ({
  text,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  opacity = 1,
  color = "#f9f9ff",
  glowColor = "#a78bfa",
}) => {
  // Build the canvas texture once per unique (text, color, glowColor) combo
  const texture = useMemo(() => {
    const W = 2048;
    const H = 512;

    const canvas = document.createElement("canvas");
    canvas.width = W;
    canvas.height = H;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, W, H);

    const font = `900 280px 'Impact', 'Arial Black', Arial, sans-serif`;
    ctx.font = font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    // ── Glow passes (draw text multiple times with shadow for bloom) ──
    ctx.shadowColor = glowColor;
    for (let blur = 80; blur >= 20; blur -= 20) {
      ctx.shadowBlur = blur;
      ctx.fillStyle = glowColor;
      ctx.fillText(text, W / 2, H / 2);
    }

    // ── Clean sharp fill on top ──
    ctx.shadowBlur = 0;
    ctx.fillStyle = color;
    ctx.fillText(text, W / 2, H / 2);

    // ── Thin outline for crispness ──
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeText(text, W / 2, H / 2);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [text, color, glowColor]);

  // Aspect ratio  4:1 — scale plane width by character count so short words
  // don't look too thin
  const planeW = Math.max(2, text.length * 1.1);
  const planeH = planeW / 4;

  // Clamp scale so Three.js never gets a degenerate matrix
  const safeScale = Math.max(scale, 0.001);

  return (
    <mesh
      position={position}
      rotation={rotation as unknown as THREE.Euler}
      scale={safeScale}
    >
      <planeGeometry args={[planeW, planeH]} />
      <meshStandardMaterial
        map={texture}
        transparent={true}
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};
