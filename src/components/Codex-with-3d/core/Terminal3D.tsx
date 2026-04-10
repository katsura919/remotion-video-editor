import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, spring, interpolate } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import * as THREE from "three";

// ── Canvas Texture Dimensions ──
const CW = 1280; // Larger texture for clarity
const CH = 800;
const TITLE_H = 70;
const PAD = 50;
const LINE_H = 72;
const FS = 32;

// ── Theme ──
const C = {
  bg: "#000000",
  titleBar: "#0a0a0a",
  border: "#222222",
  title: "#666666",
  prompt: "#a855f7", // Purple prompt
  cmd: "#ffffff",
  out: "#64748b",
  success: "#8b5cf6", // Purple/Violet success
  cursor: "#a855f7",
  dot: ["#333", "#444", "#555"], // Neutral dots for cleaner look
};

const LINES = [
  { pfx: "$ ", text: "agent.init --mode=autonomous", type: "cmd",  delay: 10 },
  { pfx: "✦ ", text: "Connecting to neural-link-01...", type: "out",  delay: 24 },
  { pfx: "✦ ", text: "Spawning local environment...",      type: "out",  delay: 38 },
  { pfx: "✦ ", text: "Executing: web_search('AI 2025')",     type: "out",  delay: 52 },
  { pfx: "✦ ", text: "Synthesizing research results...",    type: "out",  delay: 66 },
  { pfx: "✓ ", text: "Ready. Latency: 42ms | Tokens: 4.2k",type: "ok",   delay: 80 },
];

function drawTerminal(ctx: CanvasRenderingContext2D, frame: number) {
  const W = ctx.canvas.width;
  const H = ctx.canvas.height;
  const r = 40; 

  ctx.clearRect(0, 0, W, H);

  // Background
  ctx.save();
  ctx.beginPath();
  ctx.roundRect(0, 0, W, H, r);
  ctx.fillStyle = C.bg;
  ctx.fill();
  ctx.strokeStyle = C.border;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.clip(); 
  
  // Title bar
  ctx.fillStyle = C.titleBar;
  ctx.fillRect(0, 0, W, TITLE_H);
  
  // Traffic lights
  [40, 75, 110].forEach((x, i) => {
    ctx.beginPath();
    ctx.arc(x, TITLE_H / 2, 7, 0, Math.PI * 2);
    ctx.fillStyle = C.dot[i];
    ctx.fill();
  });

  // Title
  ctx.font = `600 ${FS - 6}px "Geist Mono", monospace`;
  ctx.fillStyle = C.title;
  ctx.textAlign = "center";
  ctx.fillText("assistant-v3@agent-local", W/2, TITLE_H/2 + 8);
  ctx.textAlign = "left";

  // Lines
  let y = TITLE_H + PAD + FS;
  for (let i = 0; i < LINES.length; i++) {
    const line = LINES[i];
    if (frame < line.delay) break;
    
    const elapsed = frame - line.delay;
    const maxChars = line.type === "cmd" 
      ? Math.min(Math.floor(elapsed * 2.5), line.text.length)
      : elapsed >= 5 ? line.text.length : 0;
    
    const visible = line.text.slice(0, maxChars);
    const pColor = line.type === "cmd" ? C.prompt : line.type === "ok" ? C.success : C.out;
    const tColor = line.type === "cmd" ? C.cmd : line.type === "ok" ? C.success : C.out;

    ctx.font = `700 ${FS}px "Geist Mono", monospace`;
    ctx.fillStyle = pColor;
    ctx.fillText(line.pfx, PAD, y);
    const pfxW = ctx.measureText(line.pfx).width;

    ctx.font = `400 ${FS}px "Geist Mono", monospace`;
    ctx.fillStyle = tColor;
    ctx.fillText(visible, PAD + pfxW, y);

    // Cursor
    if (i === LINES.length - 1 || frame < LINES[i+1].delay) {
      if (maxChars < line.text.length || Math.floor(frame / 15) % 2 === 0) {
        const tw = ctx.measureText(visible).width;
        ctx.fillStyle = C.cursor;
        ctx.fillRect(PAD + pfxW + tw + 6, y - FS + 4, 14, FS);
      }
    }
    y += LINE_H;
  }
  ctx.restore();
}

const TerminalScene: React.FC<{ frame: number; fps: number }> = ({ frame, fps }) => {
  const canvas = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = CW;
    c.height = CH;
    return c;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.CanvasTexture(canvas);
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    return t;
  }, [canvas]);

  const roundedRectShape = useMemo(() => {
    const shape = new THREE.Shape();
    const width = 8.5; // MUCH WIDER
    const height = 8.5 / (CW / CH); // proportional height
    const r = 0.3; 
    const x = -width / 2;
    const y = -height / 2;

    shape.moveTo(x + r, y);
    shape.lineTo(x + width - r, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + r);
    shape.lineTo(x + width, y + height - r);
    shape.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    shape.lineTo(x + r, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - r);
    shape.lineTo(x, y + r);
    shape.quadraticCurveTo(x, y, x + r, y);
    return shape;
  }, []);

  const ctx = canvas.getContext("2d")!;
  drawTerminal(ctx, frame);
  texture.needsUpdate = true;

  // Faster, snappier entry
  const enter = spring({ frame: frame - 10, fps, config: { stiffness: 100, damping: 18 } });
  
  // Minimal rotations for a "front-facing" look
  const rotX = interpolate(frame, [10, 50], [0.15, 0], { extrapolateRight: "clamp" });
  const rotY = interpolate(frame, [10, 70], [-0.25, 0], { extrapolateRight: "clamp" });
  const floatY = Math.sin(frame * 0.035) * 0.04;

  return (
    <>
      <ambientLight intensity={0.5} />
      {/* Pink/Purple accent light only */}
      <pointLight position={[5, 5, 5]} intensity={8.0} color="#a855f7" decay={2} />
      <pointLight position={[-5, -5, 5]} intensity={4.0} color="#6366f1" decay={2} />

      <group 
        rotation={[rotX, rotY, 0]} 
        position={[0, floatY, 0]} 
        scale={[enter, enter, enter]}
      >
        <mesh>
          <shapeGeometry args={[roundedRectShape]} />
          <meshStandardMaterial 
            map={texture} 
            emissive="#ffffff" 
            emissiveMap={texture} 
            emissiveIntensity={0.05}
            roughness={0.1}
            metalness={0.2}
          />
        </mesh>
      </group>
    </>
  );
};

export const Terminal3D: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ width, height }}>
      <ThreeCanvas
        width={width}
        height={height}
        camera={{ position: [0, 0, 7], fov: 42 }} // Camera slightly further back but FOV tighter for scale
        style={{ background: "transparent" }}
      >
        <TerminalScene frame={frame} fps={fps} />
      </ThreeCanvas>
    </div>
  );
};
