import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const BARS = [
  { label: "GPT-4 / 2023", tokens: 8, color: BRAND.darkBorder },
  { label: "Claude 3 / 2024", tokens: 200, color: BRAND.darkBorder },
  { label: "Claude 4.5 / 2025", tokens: 200, color: BRAND.darkMutedFg },
  { label: "Opus 4.7 / 2026", tokens: 1000, color: BRAND.primary },
];

const MAX = 1000;

export const Scene4Context: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: BRAND.darkBg, overflow: "hidden" }}>
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 64,
        right: 64,
        display: "flex",
        flexDirection: "column",
      }}>
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          color: BRAND.darkMutedFg,
          marginBottom: 28,
          opacity: titleIn,
        }}>
          03 ~ CONTEXT WINDOW ~ 1M
        </div>

        <div style={{
          marginBottom: 36,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [32, 0])}px)`,
        }}>
          <div style={{ ...H_DISPLAY, fontFamily: sansFontFamily, fontSize: 92, color: BRAND.darkFg }}>
            1M TOKENS
          </div>
          <div style={{ ...H_ACCENT, fontFamily: serifFontFamily, fontSize: 100, color: BRAND.primary }}>
            is the new normal.
          </div>
        </div>

        {/* Bar chart */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24, marginTop: 12 }}>
          {BARS.map((b, i) => {
            const delay = 24 + i * 14;
            const widthProgress = spring({ frame: frame - delay, fps, config: { damping: 180, mass: 0.9 } });
            const widthPct = (b.tokens / MAX) * 100 * widthProgress;
            const labelOpacity = interpolate(frame - delay, [0, 12], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
            const tokenTxt = b.tokens >= 1000 ? `${b.tokens / 1000}M` : `${b.tokens}K`;
            return (
              <div key={b.label}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 8,
                  opacity: labelOpacity,
                }}>
                  <span style={{
                    fontFamily: monoFontFamily,
                    ...LABEL_MONO,
                    fontSize: 20,
                    color: BRAND.darkMutedFg,
                  }}>
                    {b.label}
                  </span>
                  <span style={{
                    fontFamily: sansFontFamily,
                    fontWeight: 800,
                    fontSize: 30,
                    color: b.color === BRAND.primary ? BRAND.primary : BRAND.darkFg,
                    letterSpacing: "-0.02em",
                  }}>
                    {tokenTxt}
                  </span>
                </div>
                <div style={{
                  height: 36,
                  background: BRAND.darkBorder,
                  borderRadius: 6,
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "100%",
                    width: `${widthPct}%`,
                    background: b.color === BRAND.primary
                      ? `linear-gradient(90deg, ${BRAND.primary}, ${BRAND.primarySoft})`
                      : b.color,
                    borderRadius: 6,
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Punchline */}
        <div style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontSize: 32,
          color: BRAND.darkMutedFg,
          lineHeight: 1.5,
          marginTop: 40,
          opacity: interpolate(frame, [125, 152], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}>
          Whole monorepos in one prompt ~
          <br />
          no more chunk-and-pray RAG.
        </div>
      </div>

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
      }}>
        <span>abiemaxey.com</span>
        <span>04 / 05</span>
      </div>
    </AbsoluteFill>
  );
};
