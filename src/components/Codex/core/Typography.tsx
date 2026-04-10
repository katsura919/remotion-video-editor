import React from "react";
import { spring, useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../constants";

export const SplitTextReveal: React.FC<{ 
  text: string; 
  size?: number; 
  width?: number | string; 
  delay?: number;
  align?: "left" | "center" | "right";
}> = ({ 
  text, 
  size = 120, 
  width = "100%", 
  delay = 0,
  align = "left"
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ 
      display: "flex", 
      flexWrap: "wrap", 
      width, 
      gap: `${size * 0.15}px`, // Dynamic gap based on font size
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start"
    }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 4;
        const translateY = spring({
          frame: frame - wordDelay,
          fps,
          config: CODEX_TIMING.delayedSpring,
          from: 100,
          to: 0,
        });
        const opacity = interpolate(frame - wordDelay, [0, 8], [0, 1], { extrapolateRight: "clamp" });

        return (
          <div key={i} style={{ overflow: "hidden" }}>
            <div
              style={{
                fontFamily: CODEX_FONTS.heading,
                fontSize: size,
                color: CODEX_COLORS.foreground,
                lineHeight: 1.05,
                transform: `translateY(${translateY}%)`,
                opacity,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {word}
            </div>
          </div>
        );
      })}
    </div>
  );
};
