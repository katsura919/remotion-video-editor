import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../../Codex/constants";

const AnimatedStat: React.FC<{
  value: string;
  label: string;
  delay: number;
  accent?: boolean;
}> = ({ value, delay, label, accent = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const numMatch = value.match(/[\d.]+/);
  const prefix = value.match(/^[^0-9]*/)?.[0] ?? "";
  const suffix = value.match(/[^0-9.]+$/)?.[0] ?? "";
  const target = numMatch ? parseFloat(numMatch[0]) : 0;

  const animated = interpolate(frame, [delay, delay + 50], [0, target], {
    extrapolateRight: "clamp",
  });

  const cardSpring = spring({
    frame: frame - delay,
    fps,
    config: CODEX_TIMING.smoothSpring,
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        opacity: cardSpring,
        transform: `translateY(${interpolate(cardSpring, [0, 1], [40, 0])}px)`,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          fontFamily: CODEX_FONTS.heading,
          fontSize: 160,
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1,
          color: accent ? CODEX_COLORS.primary : CODEX_COLORS.foreground,
        }}
      >
        {prefix}
        {numMatch ? (target % 1 === 0 ? Math.round(animated) : animated.toFixed(1)) : value}
        {suffix}
      </div>
      <div
        style={{
          fontFamily: CODEX_FONTS.mono,
          fontSize: 22,
          fontWeight: 600,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: CODEX_COLORS.foreground,
          opacity: 0.5,
          textAlign: "center",
        }}
      >
        {label}
      </div>
    </div>
  );
};

export const StatsRevealSequence: React.FC<{
  durationInFrames: number;
}> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });
  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  const dividerWidth = interpolate(frame, [10, 60], [0, 920], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0, opacity: exitOpacity }}>
      {/* Top label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          fontFamily: CODEX_FONTS.mono,
          fontSize: 24,
          fontWeight: 500,
          color: CODEX_COLORS.primary,
          letterSpacing: "4px",
          textTransform: "uppercase",
          opacity: headerOpacity,
        }}
      >
        [ 02. THE NUMBERS ]
      </div>

      {/* Context text */}
      <div
        style={{
          position: "absolute",
          top: 260,
          left: 80,
          right: 80,
          fontFamily: CODEX_FONTS.body,
          fontSize: 42,
          fontWeight: 300,
          color: CODEX_COLORS.foreground,
          lineHeight: 1.4,
          opacity: interpolate(frame, [10, 30], [0, 0.7], { extrapolateRight: "clamp" }),
        }}
      >
        Over 50 countries now offer dedicated<br />
        visas for location-independent workers.
      </div>

      {/* Divider */}
      <div
        style={{
          position: "absolute",
          top: 540,
          left: 80,
          width: dividerWidth,
          height: 1,
          backgroundColor: CODEX_COLORS.cardBorder,
        }}
      />

      {/* Stats row */}
      <div
        style={{
          position: "absolute",
          top: 580,
          left: 80,
          right: 80,
          display: "flex",
          gap: 0,
          alignItems: "flex-start",
        }}
      >
        <AnimatedStat value="50+" label="Countries" delay={20} accent />

        <div
          style={{
            width: 1,
            height: 200,
            backgroundColor: CODEX_COLORS.cardBorder,
            alignSelf: "center",
            opacity: interpolate(frame, [30, 50], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />

        <AnimatedStat value="24mo" label="Max Stay" delay={35} />

        <div
          style={{
            width: 1,
            height: 200,
            backgroundColor: CODEX_COLORS.cardBorder,
            alignSelf: "center",
            opacity: interpolate(frame, [45, 65], [0, 1], { extrapolateRight: "clamp" }),
          }}
        />

        <AnimatedStat value="2K" label="Min Income / mo" delay={50} />
      </div>

      {/* Bottom note */}
      <div
        style={{
          position: "absolute",
          bottom: 120,
          left: 80,
          right: 80,
          fontFamily: CODEX_FONTS.mono,
          fontSize: 22,
          color: CODEX_COLORS.primary,
          letterSpacing: "2px",
          opacity: interpolate(frame, [80, 100], [0, 1], { extrapolateRight: "clamp" }),
        }}
      >
        USD / month · varies by country
      </div>
    </div>
  );
};
