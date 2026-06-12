import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const ORBIT_COUNT = 8;

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const word1 = spring({ frame, fps, config: { damping: 200 } });
  const word2 = spring({ frame: frame - 12, fps, config: { damping: 200 } });
  const word3 = spring({ frame: frame - 22, fps, config: { damping: 200 } });
  const word4 = spring({ frame: frame - 32, fps, config: { damping: 200 } });

  const taglineOpacity = interpolate(frame, [52, 72], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const taglineY = interpolate(frame, [52, 72], [24, 0], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const barOpacity = interpolate(frame, [46, 62], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BRAND.bg, overflow: "hidden" }}>
      {/* Orbiting dots */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", top: 0, left: 0 }}>
        {Array.from({ length: ORBIT_COUNT }).map((_, i) => {
          const angle = (i / ORBIT_COUNT) * Math.PI * 2 + frame * 0.016;
          const radius = 255 + (i % 2) * 85;
          const cx = 540 + radius * Math.cos(angle);
          const cy = 920 + radius * Math.sin(angle) * 0.36;
          const size = i % 3 === 0 ? 9 : i % 3 === 1 ? 5 : 7;
          const opacity = 0.2 + (i % 3) * 0.15;
          const color = i % 2 === 0 ? BRAND.primary : BRAND.primarySoft;
          return (
            <circle key={i} cx={cx} cy={cy} r={size} fill={color} opacity={opacity} />
          );
        })}
      </svg>

      {/* Warm radial glow */}
      <div style={{
        position: "absolute",
        top: 520,
        left: "50%",
        transform: "translateX(-50%)",
        width: 720,
        height: 720,
        borderRadius: "50%",
        background: `radial-gradient(circle, rgba(227,169,156,0.10) 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 60,
        right: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {/* Eyebrow ~ Geist Mono */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 26,
          marginBottom: 30,
          opacity: word1,
          transform: `translateY(${interpolate(word1, [0, 1], [16, 0])}px)`,
        }}>
          01 ~ EXPLAINER
        </div>

        {/* Headline block ~ Host Grotesk 800 + Instrument Serif italic accent */}
        <div style={{
          ...H_DISPLAY,
          fontFamily: sansFontFamily,
          color: BRAND.fg,
        }}>
          <div style={{
            fontSize: 108,
            opacity: word1,
            transform: `translateY(${interpolate(word1, [0, 1], [56, 0])}px)`,
          }}>
            AI
          </div>

          {/* AGENTS ~ serif italic accent in primary */}
          <div style={{
            ...H_ACCENT,
            fontFamily: serifFontFamily,
            fontSize: 120,
            color: BRAND.primary,
            opacity: word2 * 0.88,
            transform: `translateY(${interpolate(word2, [0, 1], [56, 0])}px)`,
          }}>
            agents
          </div>

          <div style={{
            fontSize: 108,
            opacity: word3,
            transform: `translateY(${interpolate(word3, [0, 1], [56, 0])}px)`,
          }}>
            ARE
          </div>

          {/* CHANGING ~ outline text */}
          <div style={{
            fontSize: 96,
            color: "transparent",
            WebkitTextStroke: `2.5px ${BRAND.primarySoft}`,
            opacity: word4,
            transform: `translateY(${interpolate(word4, [0, 1], [56, 0])}px)`,
          }}>
            CHANGING
          </div>

          <div style={{
            fontSize: 108,
            opacity: word4,
            transform: `translateY(${interpolate(word4, [0, 1], [56, 0])}px)`,
          }}>
            EVERYTHING
          </div>
        </div>

        {/* Accent bar */}
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, ${BRAND.primary}, transparent)`,
          marginTop: 36,
          marginBottom: 30,
          opacity: barOpacity,
        }} />

        {/* Tagline ~ Instrument Serif italic body */}
        <div style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontSize: 38,
          fontWeight: 400,
          color: BRAND.mutedFg,
          lineHeight: 1.55,
          opacity: taglineOpacity,
          transform: `translateY(${taglineY}px)`,
        }}>
          Not just chatbots. Agents plan,
          <br />
          act, and self-correct ~ autonomously.
        </div>
      </div>
    </AbsoluteFill>
  );
};
