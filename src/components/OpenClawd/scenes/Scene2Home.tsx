import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene2Home: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Staggered spring animations
  const tTitle = spring({ frame: frame - 10, fps, config: SPRING_CONFIG });
  const tTagline = spring({ frame: frame - 20, fps, config: SPRING_CONFIG });
  const tInput = spring({ frame: frame - 30, fps, config: SPRING_CONFIG });
  const tChips = spring({ frame: frame - 40, fps, config: SPRING_CONFIG });

  const getStyle = (s: number) => ({
    opacity: interpolate(s, [0, 1], [0, 1]),
    transform: `translateY(${interpolate(s, [0, 1], [20, 0])}px)`,
  });

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: COLORS.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <AppWindow>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: FONTS.ui,
            padding: 40,
          }}
        >
          {/* Logo / Title */}
          <div style={{ ...getStyle(tTitle), textAlign: "center", marginBottom: 16 }}>
            <h1
              style={{
                fontFamily: FONTS.brand,
                fontSize: 80,
                color: COLORS.text.primary,
                margin: 0,
                fontWeight: "normal",
                letterSpacing: "-2px",
              }}
            >
              Abiemaxey
            </h1>
          </div>

          {/* Tagline */}
          <div style={{ ...getStyle(tTagline), marginBottom: 60 }}>
            <p
              style={{
                fontSize: 24,
                color: COLORS.text.muted,
                margin: 0,
                letterSpacing: "-0.5px",
              }}
            >
              Open Source Alternative to Claude Cowork
            </p>
          </div>

          {/* Input Area */}
          <div
            style={{
              ...getStyle(tInput),
              width: 800,
              backgroundColor: COLORS.background,
              borderRadius: 32,
              border: `1px solid ${COLORS.borders}`,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 16,
              boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
            }}
          >
            <div
              style={{
                fontSize: 20,
                color: COLORS.text.dim,
                fontFamily: FONTS.ui,
              }}
            >
              How can I help you today?
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Chips */}
              <div style={{ ...getStyle(tChips), display: "flex", gap: 12 }}>
                <div style={chipStyle}>
                  <div style={{...dotStyle, backgroundColor: "#8b5cf6"}} />
                  Claude Code
                </div>
                <div style={chipStyle}>
                  <div style={{...dotStyle, backgroundColor: "#ec4899"}} />
                  Opus 4.6
                </div>
                <div style={chipStyle}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                  Attach
                </div>
              </div>

              {/* Send Button */}
              <div
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  backgroundColor: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#000",
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
};

const chipStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 16px",
  backgroundColor: COLORS.surfaces,
  border: `1px solid ${COLORS.borders}`,
  borderRadius: 20,
  fontSize: 14,
  color: COLORS.text.primary,
};

const dotStyle: React.CSSProperties = {
  width: 10,
  height: 10,
  borderRadius: "50%",
};
