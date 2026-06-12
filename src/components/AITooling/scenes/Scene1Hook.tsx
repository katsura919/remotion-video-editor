import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const TEASERS = [
  "01 ~ Agent Skills",
  "02 ~ MCP everywhere",
  "03 ~ 1M context",
  "04 ~ Your move",
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const eyebrow = spring({ frame, fps, config: { damping: 200 } });
  const mega = spring({ frame: frame - 8, fps, config: { damping: 200, mass: 1.2 } });
  const h1 = spring({ frame: frame - 22, fps, config: { damping: 200 } });
  const h2 = spring({ frame: frame - 34, fps, config: { damping: 200 } });
  const h3 = spring({ frame: frame - 46, fps, config: { damping: 200 } });
  const bar = interpolate(frame, [58, 74], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  return (
    <AbsoluteFill style={{ background: BRAND.darkBg, overflow: "hidden" }}>
      {/* Warm radial behind mega number */}
      <div style={{
        position: "absolute",
        top: 280,
        left: "50%",
        transform: "translateX(-50%)",
        width: 980,
        height: 980,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(227,169,156,0.22) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />

      {/* Mega 04 anchor */}
      <div style={{
        position: "absolute",
        top: 220,
        left: 0,
        right: 0,
        textAlign: "center",
        fontFamily: serifFontFamily,
        fontStyle: "italic",
        fontSize: 720,
        fontWeight: 400,
        color: BRAND.primary,
        opacity: interpolate(mega, [0, 1], [0, 0.18]),
        lineHeight: 1,
        letterSpacing: "-0.04em",
        transform: `translateY(${interpolate(mega, [0, 1], [40, 0])}px) scale(${interpolate(mega, [0, 1], [0.92, 1])})`,
        pointerEvents: "none",
        userSelect: "none",
      }}>
        04
      </div>

      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 64,
        right: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}>
        {/* Top ~ eyebrow */}
        <div>
          <div style={{
            ...LABEL_MONO,
            fontFamily: monoFontFamily,
            fontSize: 26,
            color: BRAND.darkMutedFg,
            opacity: eyebrow,
            transform: `translateY(${interpolate(eyebrow, [0, 1], [12, 0])}px)`,
          }}>
            00 ~ Q1 2026 ~ AI TOOLING
          </div>
        </div>

        {/* Mid ~ headline (sits over mega number) */}
        <div style={{ position: "relative" }}>
          <div style={{ ...H_DISPLAY, fontFamily: sansFontFamily, color: BRAND.darkFg }}>
            <div style={{
              fontSize: 124,
              opacity: h1,
              transform: `translateY(${interpolate(h1, [0, 1], [56, 0])}px)`,
            }}>
              FOUR
            </div>
            <div style={{
              ...H_ACCENT,
              fontFamily: serifFontFamily,
              fontSize: 132,
              color: BRAND.primary,
              opacity: h2 * 0.94,
              transform: `translateY(${interpolate(h2, [0, 1], [56, 0])}px)`,
              marginTop: -8,
            }}>
              shifts that
            </div>
            <div style={{
              fontSize: 124,
              opacity: h3,
              transform: `translateY(${interpolate(h3, [0, 1], [56, 0])}px)`,
              marginTop: -4,
            }}>
              CHANGED 2026.
            </div>
          </div>

          <div style={{
            height: 2,
            width: 220,
            background: BRAND.primary,
            marginTop: 36,
            opacity: bar,
          }} />
        </div>

        {/* Bottom ~ teaser list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TEASERS.map((t, i) => {
            const delay = 70 + i * 8;
            const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
            return (
              <div
                key={t}
                style={{
                  fontFamily: monoFontFamily,
                  ...LABEL_MONO,
                  fontSize: 28,
                  color: BRAND.darkFg,
                  opacity: p * 0.85,
                  transform: `translateX(${interpolate(p, [0, 1], [-24, 0])}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 18,
                }}
              >
                <span style={{
                  width: 10, height: 10, borderRadius: 5,
                  background: BRAND.primary,
                  display: "inline-block",
                  opacity: p,
                }} />
                {t}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: 64,
        right: 64,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: monoFontFamily,
        ...LABEL_MONO,
        fontSize: 22,
        color: BRAND.darkMutedFg,
        opacity: interpolate(frame, [100, 124], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
      }}>
        <span>abiemaxey.com</span>
        <span>01 / 05</span>
      </div>
    </AbsoluteFill>
  );
};
