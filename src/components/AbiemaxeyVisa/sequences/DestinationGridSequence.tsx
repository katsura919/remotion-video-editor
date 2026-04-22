import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../../Codex/constants";

const DESTINATIONS = [
  { country: "Portugal", flag: "🇵🇹", detail: "D8 Visa · €760/mo min" },
  { country: "Indonesia", flag: "🇮🇩", detail: "E33G Visa · $2K/mo min" },
  { country: "Mexico", flag: "🇲🇽", detail: "Temporal · $1.6K/mo min" },
  { country: "Georgia", flag: "🇬🇪", detail: "Remotely from Georgia · Free" },
  { country: "Thailand", flag: "🇹🇭", detail: "LTR Visa · $40K/yr income" },
  { country: "Estonia", flag: "🇪🇪", detail: "Digital Nomad · €3.5K/mo" },
];

export const DestinationGridSequence: React.FC<{
  durationInFrames: number;
}> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const titleSpring = spring({
    frame: frame - 5,
    fps,
    config: CODEX_TIMING.delayedSpring,
    from: 40,
    to: 0,
  });
  const titleOpacity = interpolate(frame - 5, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Label */}
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
          opacity: labelOpacity,
        }}
      >
        [ 04. TOP PICKS ]
      </div>

      {/* Title */}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 80,
          right: 80,
          fontFamily: CODEX_FONTS.heading,
          fontSize: 110,
          fontStyle: "italic",
          fontWeight: 400,
          color: CODEX_COLORS.foreground,
          lineHeight: 1.0,
          opacity: titleOpacity,
          transform: `translateY(${titleSpring}px)`,
        }}
      >
        Best<br />Destinations.
      </div>

      {/* 2×3 Grid */}
      <div
        style={{
          position: "absolute",
          top: 560,
          left: 60,
          right: 60,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
        }}
      >
        {DESTINATIONS.map((dest, i) => {
          const delay = 20 + i * 16;
          const cardSpring = spring({
            frame: frame - delay,
            fps,
            config: CODEX_TIMING.fastSpring,
            from: 0,
            to: 1,
          });

          return (
            <div
              key={i}
              style={{
                backgroundColor: CODEX_COLORS.card,
                border: `1px solid ${CODEX_COLORS.cardBorder}`,
                borderRadius: 20,
                padding: "32px 36px",
                opacity: cardSpring,
                transform: `scale(${interpolate(cardSpring, [0, 1], [0.88, 1])})`,
                boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
              }}
            >
              <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 12 }}>{dest.flag}</div>
              <div
                style={{
                  fontFamily: CODEX_FONTS.body,
                  fontSize: 38,
                  fontWeight: 700,
                  color: CODEX_COLORS.foreground,
                  marginBottom: 6,
                }}
              >
                {dest.country}
              </div>
              <div
                style={{
                  fontFamily: CODEX_FONTS.mono,
                  fontSize: 20,
                  color: CODEX_COLORS.primary,
                  letterSpacing: "1px",
                }}
              >
                {dest.detail}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
