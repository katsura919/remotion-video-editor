import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const PARTICLE_COUNT = 13;

function seededRand(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const PILLS = [
  { label: "CODE", color: BRAND.accent },
  { label: "RESEARCH", color: BRAND.primary },
  { label: "AUTOMATION", color: BRAND.mutedFg },
];

const PARTICLE_COLORS = [BRAND.primary, BRAND.primarySoft, BRAND.accent];

export const Scene5Here: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame: frame - 8, fps, config: { damping: 200 } });

  const taskCount = Math.round(
    interpolate(frame, [80, 155], [0, 127], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

  const counterOpacity = interpolate(frame, [75, 95], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const dividerOpacity = interpolate(frame, [130, 148], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const ctaOpacity = interpolate(frame, [138, 158], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BRAND.bg, overflow: "hidden" }}>
      {/* Particles ~ primary palette, drift upward */}
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
        const sx = seededRand(i * 4) * 1080;
        const sy = seededRand(i * 4 + 1) * 1920;
        const speed = 0.6 + seededRand(i * 4 + 2) * 1.2;
        const size = 6 + seededRand(i * 4 + 3) * 18;
        const opacity = 0.10 + seededRand(i * 4 + 3) * 0.18;
        const color = PARTICLE_COLORS[i % 3];
        const drift = Math.sin(frame * 0.018 + i * 1.4) * 26;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: sx + drift,
              top: sy - frame * speed,
              width: size,
              height: size,
              borderRadius: "50%",
              background: color,
              opacity,
              filter: "blur(2px)",
              pointerEvents: "none",
            }}
          />
        );
      })}

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
        {/* Eyebrow */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          marginBottom: 28,
          opacity: titleIn,
        }}>
          05 ~ THEY'RE ALREADY HERE
        </div>

        {/* Headline ~ signature recipe */}
        <div style={{
          marginBottom: 48,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [56, 0])}px)`,
        }}>
          <div style={{
            ...H_DISPLAY,
            fontFamily: sansFontFamily,
            fontSize: 108,
            color: BRAND.fg,
          }}>
            AGENTS
            <br />
            ARE{" "}
            <span style={{
              ...H_ACCENT,
              fontFamily: serifFontFamily,
              fontSize: 116,
              color: BRAND.primary,
            }}>
              already
            </span>
            <br />
            HERE
          </div>
        </div>

        {/* Pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 52 }}>
          {PILLS.map(({ label, color }, i) => {
            const delay = 36 + i * 16;
            const pillIn = spring({ frame: frame - delay, fps, config: { damping: 200 } });
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                  opacity: pillIn,
                  transform: `translateX(${interpolate(pillIn, [0, 1], [-44, 0])}px)`,
                }}
              >
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: color,
                  flexShrink: 0,
                }} />
                <div style={{
                  fontFamily: monoFontFamily,
                  fontSize: 36,
                  fontWeight: 600,
                  color: BRAND.fg,
                  letterSpacing: "0.08em",
                }}>
                  {label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Counter */}
        <div style={{ opacity: counterOpacity, marginBottom: 44 }}>
          <div style={{
            ...LABEL_MONO,
            fontFamily: monoFontFamily,
            fontSize: 24,
            marginBottom: 8,
          }}>
            AI tasks completed today
          </div>
          <div style={{
            fontFamily: sansFontFamily,
            fontSize: 92,
            fontWeight: 800,
            color: BRAND.accent,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            fontVariantNumeric: "tabular-nums",
          }}>
            {taskCount}M+
          </div>
        </div>

        {/* Divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(90deg, ${BRAND.primary}, transparent)`,
          marginBottom: 28,
          opacity: dividerOpacity,
        }} />

        {/* CTA ~ abiemaxey.com */}
        <div style={{ opacity: ctaOpacity }}>
          <div style={{
            ...LABEL_MONO,
            fontFamily: monoFontFamily,
            fontSize: 24,
            marginBottom: 10,
          }}>
            learn more at
          </div>
          <div style={{
            fontFamily: sansFontFamily,
            fontSize: 52,
            fontWeight: 800,
            color: BRAND.fg,
            letterSpacing: "-0.03em",
          }}>
            abiemaxey.com
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
