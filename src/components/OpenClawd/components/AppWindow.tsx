import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../constants";

export const AppWindow: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
  containerStyle?: React.CSSProperties;
}> = ({ children, style, containerStyle }) => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 1040,
          height: 660,
          backgroundColor: COLORS.surfaces,
          borderRadius: 24,
          border: `1px solid ${COLORS.borders}`,
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.5)`,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          ...containerStyle,
        }}
      >
        {/* Mac OS Chrome / Header */}
        <div
          style={{
            height: 48,
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            borderBottom: `1px solid ${COLORS.borders}`,
            flexShrink: 0,
            gap: 8,
          }}
        >
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ff5f56",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor: "#27c93f",
            }}
          />
        </div>

        {/* Window Content */}
        <div
          style={{
            flex: 1,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {children}
        </div>
      </div>
    </AbsoluteFill>
  );
};
