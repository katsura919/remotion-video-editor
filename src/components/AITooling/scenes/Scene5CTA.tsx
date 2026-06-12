import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring, Img, staticFile } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

export const Scene5CTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const w1 = spring({ frame, fps, config: { damping: 200 } });
  const w2 = spring({ frame: frame - 14, fps, config: { damping: 200 } });
  const w3 = spring({ frame: frame - 28, fps, config: { damping: 200 } });
  const pill = spring({ frame: frame - 60, fps, config: { damping: 200 } });
  const sticker = spring({ frame: frame - 30, fps, config: { damping: 160 } });

  const rotate = interpolate(sticker, [0, 1], [-8, -3]);

  return (
    <AbsoluteFill style={{ background: BRAND.primary, overflow: "hidden" }}>
      {/* Sticker */}
      <div style={{
        position: "absolute",
        top: 110,
        right: 70,
        width: 200,
        height: 200,
        opacity: sticker,
        transform: `rotate(${rotate}deg) scale(${interpolate(sticker, [0, 1], [0.7, 1])})`,
      }}>
        <Img
          src={staticFile("abiemaxey/assets/stickers/winking_peace.png")}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>

      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 64,
        right: 64,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 26,
          color: BRAND.fg,
          opacity: w1 * 0.7,
          marginBottom: 32,
        }}>
          05 ~ YOUR MOVE
        </div>

        <div style={{ ...H_DISPLAY, fontFamily: sansFontFamily, color: BRAND.fg }}>
          <div style={{
            fontSize: 108,
            opacity: w1,
            transform: `translateY(${interpolate(w1, [0, 1], [60, 0])}px)`,
          }}>
            STOP READING
          </div>
          <div style={{
            ...H_ACCENT,
            fontFamily: serifFontFamily,
            fontSize: 120,
            color: BRAND.fg,
            opacity: w2,
            transform: `translateY(${interpolate(w2, [0, 1], [60, 0])}px)`,
          }}>
            launch notes.
          </div>
          <div style={{
            fontSize: 108,
            opacity: w3,
            transform: `translateY(${interpolate(w3, [0, 1], [60, 0])}px)`,
            marginTop: 8,
          }}>
            SHIP THE LOOP.
          </div>
        </div>

        {/* CTA pill ~ filled with fg, text bg */}
        <div style={{
          marginTop: 56,
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: pill,
          transform: `translateY(${interpolate(pill, [0, 1], [24, 0])}px)`,
        }}>
          <div style={{
            background: BRAND.fg,
            color: BRAND.bg,
            borderRadius: 9999,
            padding: "22px 42px",
            display: "flex",
            alignItems: "center",
            gap: 22,
            fontFamily: sansFontFamily,
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}>
            <span>Build with skills</span>
            <span style={{
              width: 44,
              height: 44,
              borderRadius: 9999,
              background: BRAND.primary,
              color: BRAND.fg,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              fontWeight: 800,
            }}>
              →
            </span>
          </div>
        </div>

        {/* Handle */}
        <div style={{
          marginTop: 36,
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontSize: 36,
          color: BRAND.fg,
          opacity: interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" }),
        }}>
          @abiemaxey ~ playbooks for operators
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
        color: BRAND.fg,
        opacity: 0.7,
      }}>
        <span>abiemaxey.com</span>
        <span>05 / 05</span>
      </div>
    </AbsoluteFill>
  );
};
