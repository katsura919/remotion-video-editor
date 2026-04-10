import React from "react";
import { THREED_COLORS } from "../constants";

interface GlassCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * GlassCard — A 2D glassmorphism overlay card.
 * Used as a React/CSS overlay on top of the ThreeCanvas for text callouts.
 */
export const GlassCard: React.FC<GlassCardProps> = ({ children, style }) => {
  return (
    <div
      style={{
        background: "rgba(10, 10, 20, 0.55)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1px solid ${THREED_COLORS.primary}33`,
        borderRadius: 28,
        padding: "44px 56px",
        boxShadow: `
          0 0 0 1px ${THREED_COLORS.primary}22,
          0 24px 64px rgba(0,0,0,0.5),
          inset 0 1px 0 rgba(255,255,255,0.06)
        `,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
