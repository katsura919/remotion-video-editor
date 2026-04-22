import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

const ASCII_LOGO = `
  _      ____  _ ______ __  __         __   ________     __ 
 / \\    |  _ \\|_ |  ____|  \\/  |  /\\   \\ \\ / /  ____\\ \\   / /
/ _ \\   | |_) | || |__  | \\  / | /  \\   \\ V /| |__   \\ \\_/ / 
/ ___ \\  |  _ <| ||  __| | |\\/| |/ /\\ \\   > < |  __|   \\   /  
/ /   \\ \\ | |_) | || |____| |  | / ____ \\ / . \\| |____   | |   
/_/     \\_|____/___|______|_|  |_/_/    \\_\\_/ \\_\\______|  |_|   
`.trim();

const COMMAND = "npx abiemaxey-cli";
const LOG_LINES = [
  { text: "> abiemaxey-cli@1.0.0 start", color: COLORS.text.muted },
  { text: "Starting Abiemaxey Local Server...", color: COLORS.text.primary },
  { text: "✓ SDK Backends Initialized", color: "#22c55e" },
  { text: "✓ 20+ Providers Loaded", color: "#22c55e" },
  { text: "✓ 80+ Models Connected (Opus 4.6, GPT-5.3, Gemini 3)", color: "#22c55e" },
  { text: "✓ MCP Servers Connected: Filesystem, GitHub, Postgres", color: "#22c55e" },
  { text: "Opening desktop app on :3001...", color: COLORS.accent },
];

export const Scene1Terminal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance animation for the terminal
  const enterProgress = spring({
    frame,
    fps,
    config: SPRING_CONFIG,
  });

  const translateY = interpolate(enterProgress, [0, 1], [400, 0]);
  const rotateX = interpolate(enterProgress, [0, 1], [40, 20]); // keeping some perspective
  const scale = interpolate(enterProgress, [0, 1], [0.8, 1]);
  const opacity = interpolate(enterProgress, [0, 1], [0, 1]);
  
  // Slight oscillate
  const rotateY = Math.sin(frame / 30) * 2;

  // Typing effect
  const typeIndex = Math.min(COMMAND.length, Math.floor(frame / 1)); // 1 frame per char
  const typedCommand = COMMAND.substring(0, typeIndex);

  // Appearance of ASCII Logo (starts after typing, e.g., frame 25)
  const logoOpac = spring({
    frame: frame - 25,
    fps,
    config: { damping: 100 }, 
  });

  return (
    <div
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        perspective: 1000,
        backgroundColor: COLORS.background,
      }}
    >
      <AppWindow
        containerStyle={{
          transform: `translateY(${translateY}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          opacity,
          transformStyle: "preserve-3d",
        }}
        style={{
          boxShadow: `0 40px 80px -20px ${COLORS.accent}40`,
        }}
      >
        <div
          style={{
            padding: 40,
            fontFamily: FONTS.code,
            color: COLORS.text.primary,
            fontSize: 16,
            lineHeight: 1.5,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Command Prompt Row */}
          <div style={{ display: "flex", alignItems: "center", marginBottom: 20 }}>
            <span style={{ color: COLORS.accent, width: 24, flexShrink: 0 }}>$</span>
            <span>{typedCommand}</span>
            {frame % 30 < 15 && (
              <span style={{ width: 10, height: 20, backgroundColor: COLORS.text.primary, marginLeft: 4 }} />
            )}
          </div>

          <div style={{ opacity: logoOpac }}>
            {/* ASCII Logo */}
            <pre
              style={{
                color: COLORS.accent,
                margin: "0 0 24px 0",
                fontSize: 14,
                lineHeight: 1.1,
                textShadow: `0 0 10px ${COLORS.accent}80`,
                fontFamily: FONTS.code,
              }}
            >
              {ASCII_LOGO}
            </pre>

            {/* Log Output Lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {LOG_LINES.map((line, idx) => {
                const lineAppearFrame = 35 + idx * 8;
                if (frame < lineAppearFrame) return null;
                return (
                  <div key={idx} style={{ color: line.color, display: "flex" }}>
                    <span style={{ width: 24, flexShrink: 0 }} /> {/* Spacer to align with text after prompt */}
                    <span style={{ fontSize: 14 }}>{line.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AppWindow>
    </div>
  );
};
