import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { THREED_COLORS, THREED_FONTS } from "../constants";

const DOT_COLORS = [THREED_COLORS.primary, THREED_COLORS.secondary, THREED_COLORS.accent];

/**
 * Scene 05 — Sign-Off CTA (18s – 20s, frames 0–60 relative)
 *
 * No ThreeCanvas — pure 2D cinematic sign-off.
 * A radial purple gradient fades in, then the handle, divider, headline,
 * and glow dots animate in sequence.
 */
export const SignOffSequence: React.FC = () => {
  const frame = useCurrentFrame();

  const bgOpacity  = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: "clamp" });
  const handleOpacity = interpolate(frame, [8, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const handleY       = interpolate(frame, [8, 28], [24, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dividerScale  = interpolate(frame, [20, 36], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaOpacity    = interpolate(frame, [28, 48], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaY          = interpolate(frame, [28, 48], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const dotsOpacity   = interpolate(frame, [40, 58], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill
      style={{
        background: "#0a0a0f",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Radial purple glow background */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse 70% 55% at 50% 50%,
            rgba(167,139,250,0.18) 0%,
            rgba(96,165,250,0.08) 40%,
            transparent 70%)`,
          opacity: bgOpacity,
        }}
      />

      {/* Center content */}
      <div style={{ textAlign: "center", position: "relative" }}>
        {/* Handle */}
        <div
          style={{
            fontFamily: THREED_FONTS.mono,
            fontSize: 34,
            color: THREED_COLORS.primary,
            letterSpacing: 7,
            textTransform: "uppercase",
            opacity: handleOpacity,
            transform: `translateY(${handleY}px)`,
            marginBottom: 28,
          }}
        >
          @your_handle
        </div>

        {/* Gradient divider */}
        <div
          style={{
            width: 72,
            height: 2,
            margin: "0 auto 36px",
            background: `linear-gradient(90deg,
              transparent,
              ${THREED_COLORS.primary},
              ${THREED_COLORS.secondary},
              transparent)`,
            transform: `scaleX(${dividerScale})`,
            transformOrigin: "center",
          }}
        />

        {/* CTA */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <div
            style={{
              fontFamily: THREED_FONTS.display,
              fontSize: 90,
              fontWeight: 900,
              color: THREED_COLORS.text,
              lineHeight: 1.05,
            }}
          >
            Follow for
          </div>
          <div
            style={{
              fontFamily: THREED_FONTS.display,
              fontSize: 90,
              fontWeight: 900,
              lineHeight: 1.05,
              background: `linear-gradient(135deg, ${THREED_COLORS.primary}, ${THREED_COLORS.secondary})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            3D content
          </div>
        </div>

        {/* Glow dots */}
        <div style={{ marginTop: 52, opacity: dotsOpacity }}>
          {DOT_COLORS.map((color, i) => (
            <span
              key={i}
              style={{
                display: "inline-block",
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: color,
                margin: "0 10px",
                boxShadow: `0 0 16px 4px ${color}88`,
              }}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
