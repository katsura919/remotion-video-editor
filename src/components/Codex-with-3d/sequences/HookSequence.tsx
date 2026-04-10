import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { SplitTextReveal } from "../core/Typography";
import { Terminal3D } from "../core/Terminal3D";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../constants";

const COMPOSITION_WIDTH = 1080;
const ORB_CONTAINER_TOP = 820;
const ORB_CONTAINER_HEIGHT = 1100;

export const HookSequence: React.FC<{
  text: string;
  label: string;
  durationInFrames: number;
}> = ({ text, label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, fps } = useVideoConfig();

  const labelOpacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  // AI/ML-themed floating background symbols
  const icons = ["λ", "∑", "∇", "→", "{}",  "∞"];

  // Orb entrance spring — starts delayed so text appears first
  const orbSpring = spring({
    frame: frame - 18,
    fps,
    config: CODEX_TIMING.delayedSpring,
  });

  const orbOpacity = interpolate(orbSpring, [0, 1], [0, 0.92]);
  const orbTranslateY = interpolate(orbSpring, [0, 1], [60, 0]);

  return (
    <>
      {/* ── Background Parallax Symbols (AI/ML themed) ── */}
      {icons.map((icon, i) => {
        const x = interpolate(i, [0, icons.length - 1], [80, width - 80]);
        const y = interpolate((frame + i * 55) % 820, [0, 820], [height + 100, -100]);
        const rotate = (frame * 0.4 + i * 45) % 360;
        const opacity = interpolate(Math.abs(y - 960), [0, 420], [0.13, 0]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `rotate(${rotate}deg)`,
              fontFamily: CODEX_FONTS.mono,
              fontSize: 56 + (i % 3) * 22,
              color: CODEX_COLORS.primary,
              opacity,
              filter: "blur(3px)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {icon}
          </div>
        );
      })}

      {/* ── Scene Label ── */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          fontFamily: CODEX_FONTS.mono,
          fontSize: 24,
          fontWeight: 500,
          color: CODEX_COLORS.primary,
          opacity: labelOpacity,
          letterSpacing: "4px",
          textTransform: "uppercase",
        }}
      >
        [ {label} ]
      </div>

      {/* ── Main Hook Text ── */}
      <div style={{ position: "absolute", top: 340, left: 80, right: 80 }}>
        <SplitTextReveal text={text} size={128} />
      </div>

      {/* ── 3D Terminal — replaces static logo ── */}
      <div
        style={{
          position: "absolute",
          top: ORB_CONTAINER_TOP,
          left: 0,
          width: COMPOSITION_WIDTH,
          height: ORB_CONTAINER_HEIGHT,
          opacity: orbOpacity,
          transform: `translateY(${orbTranslateY}px)`,
        }}
      >
        <Terminal3D width={COMPOSITION_WIDTH} height={ORB_CONTAINER_HEIGHT} />
      </div>

      {/* ── Gradient trim — fades scene text into the orb ── */}
      <div
        style={{
          position: "absolute",
          top: ORB_CONTAINER_TOP - 80,
          left: 0,
          right: 0,
          height: 120,
          background: `linear-gradient(to bottom, ${CODEX_COLORS.background}, transparent)`,
          pointerEvents: "none",
        }}
      />

      {/* ── Bottom vignette so orb bleeds to black ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 280,
          background: `linear-gradient(to bottom, transparent, ${CODEX_COLORS.background})`,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

// Satisfy undefined-height reference above (height = 1920 for portrait IG)
const height = 1920;
