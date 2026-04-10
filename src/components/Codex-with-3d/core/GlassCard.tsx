import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CODEX_COLORS, CODEX_TIMING } from "../constants";

export const GlassCard: React.FC<{ 
  children: React.ReactNode; 
  delay?: number;
  width?: number | string;
  height?: number | string;
  style?: React.CSSProperties;
}> = ({ 
  children, 
  delay = 0,
  width = "100%",
  height = "100%",
  style = {}
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const translateY = spring({
    frame: frame - delay,
    fps,
    config: CODEX_TIMING.smoothSpring,
    from: 400,
    to: 0,
  });

  const opacity = spring({
    frame: frame - delay,
    fps,
    config: CODEX_TIMING.smoothSpring,
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        width,
        height,
        backgroundColor: CODEX_COLORS.card,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "24px",
        transform: `translateY(${translateY}px)`,
        opacity,
        boxShadow: "0 30px 60px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.5)",
        border: `1px solid ${CODEX_COLORS.cardBorder}`,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        ...style
      }}
    >
      {children}
    </div>
  );
};
