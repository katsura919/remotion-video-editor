import React from "react";
import { useCurrentFrame, interpolate } from "remotion";
import { SplitTextReveal } from "../core/Typography";
import { GlassCard } from "../core/GlassCard";
import { CODEX_FONTS, CODEX_COLORS } from "../constants";

const StatCounter: React.FC<{ value: string; delay: number }> = ({ value, delay }) => {
  const frame = useCurrentFrame();
  
  // Extract number and unit (e.g., "9.2B" -> 9.2, "B")
  const numMatch = value.match(/[\d.]+/);
  const unitMatch = value.match(/[a-zA-Z%]+/);
  
  const targetNum = numMatch ? parseFloat(numMatch[0]) : 0;
  const unit = unitMatch ? unitMatch[0] : "";
  
  const animatedValue = interpolate(
    frame,
    [delay, delay + 60],
    [0, targetNum],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{ fontSize: 56, fontWeight: 800, color: CODEX_COLORS.foreground, fontFamily: CODEX_FONTS.body }}>
      {numMatch ? animatedValue.toFixed(targetNum % 1 === 0 ? 0 : 1) : value}{unit}
    </div>
  );
};

export const FeatureCardSequence: React.FC<{
  title: string;
  description: string;
  label: string;
  durationInFrames: number;
  layout?: "center" | "bottom";
  stats?: { label: string; value: string }[];
  tags?: string[];
}> = ({ title, description, label, durationInFrames, layout = "center", stats = [], tags = [] }) => {
  const frame = useCurrentFrame();
  const labelOpacity = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const cardTop = layout === "center" ? 450 : 700;
  const cardHeight = layout === "center" ? 600 : 650;

  return (
    <>
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
          textTransform: "uppercase"
        }}
      >
        [ {label} ]
      </div>

      <div style={{ position: "absolute", top: 250, left: 80, right: 80 }}>
        <SplitTextReveal text={title} size={100} />
      </div>

      <div style={{ position: "absolute", left: 60, right: 60, top: cardTop }}>
        <GlassCard height={cardHeight} delay={20}>
          <div style={{ 
            padding: "50px 60px", 
            color: CODEX_COLORS.foreground, 
            fontFamily: CODEX_FONTS.body, 
            display: "flex",
            flexDirection: "column",
            gap: 30
          }}>
            <div style={{ fontSize: 44, fontWeight: 300, lineHeight: 1.4, opacity: 0.9 }}>
              {description}
            </div>

            {/* Tags System */}
            {tags.length > 0 && (
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 99,
                      border: `1px solid ${CODEX_COLORS.primary}`,
                      color: CODEX_COLORS.primary,
                      fontFamily: CODEX_FONTS.mono,
                      fontSize: 18,
                      fontWeight: 700,
                      backgroundColor: "rgba(227, 169, 156, 0.1)",
                    }}
                  >
                    {tag}
                  </div>
                ))}
              </div>
            )}

            {/* Stats Grid */}
            {stats.length > 0 && (
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(2, 1fr)", 
                gap: 24, 
                marginTop: 10,
                borderTop: `1px solid ${CODEX_COLORS.cardBorder}`,
                paddingTop: 30
              }}>
                {stats.map((stat, i) => (
                  <div key={i}>
                    <div style={{ fontSize: 18, fontFamily: CODEX_FONTS.mono, color: CODEX_COLORS.muted, textTransform: "uppercase", letterSpacing: 1 }}>
                      {stat.label}
                    </div>
                    <StatCounter value={stat.value} delay={40} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </GlassCard>
      </div>
    </>
  );
};
