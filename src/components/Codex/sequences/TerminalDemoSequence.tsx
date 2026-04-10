import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { SplitTextReveal } from "../core/Typography";
import { GlassCard } from "../core/GlassCard";
import { TerminalMockup, TerminalLine } from "../core/TerminalMockup";
import { CODEX_FONTS, CODEX_COLORS } from "../constants";

export const TerminalDemoSequence: React.FC<{
  title: string;
  label: string;
  terminalTitle: string;
  lines: TerminalLine[];
  durationInFrames: number;
}> = ({ title, label, terminalTitle, lines, durationInFrames }) => {
  const frame = useCurrentFrame();
  const labelOpacity = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Performance HUD animations
  const tokensPerSec = interpolate(frame, [20, Math.min(60, durationInFrames)], [0, 64.2], { extrapolateRight: "clamp" }).toFixed(1);
  const ramUsage = interpolate(frame, [20, Math.min(100, durationInFrames)], [0, 4.8], { extrapolateRight: "clamp" }).toFixed(1);
  const progressBarWidth = interpolate(frame, [20, Math.min(150, durationInFrames)], [0, 100], { extrapolateRight: "clamp" });

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

      <div style={{ position: "absolute", top: 220, left: 80, right: 80 }}>
        <SplitTextReveal text={title} size={100} />
      </div>

      <div style={{ position: "absolute", left: 60, right: 60, top: 400, display: "flex", flexDirection: "column", gap: 30 }}>
        <GlassCard height={600} delay={20}>
          <TerminalMockup 
            title={terminalTitle}
            lines={lines}
            startDelay={20}
          />
        </GlassCard>

        {/* Performance HUD */}
        <div style={{ 
          display: "flex", 
          gap: 20, 
          height: 120,
          opacity: interpolate(frame, [20, 40], [0, 1], { extrapolateRight: "clamp" }),
          transform: `translateY(${interpolate(frame, [20, 40], [20, 0], { extrapolateRight: "clamp" })}px)`
        }}>
          <GlassCard style={{ flex: 1, padding: "20px 30px", justifyContent: "center" }}>
            <div style={{ fontSize: 14, fontFamily: CODEX_FONTS.mono, color: CODEX_COLORS.muted }}>SPEED</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: CODEX_COLORS.primary }}>{tokensPerSec} T/SEC</div>
          </GlassCard>
          
          <GlassCard style={{ flex: 1, padding: "20px 30px", justifyContent: "center" }}>
            <div style={{ fontSize: 14, fontFamily: CODEX_FONTS.mono, color: CODEX_COLORS.muted }}>LOCAL RAM</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: CODEX_COLORS.foreground }}>{ramUsage} GB</div>
          </GlassCard>

          <GlassCard style={{ flex: 2, padding: "20px 30px", justifyContent: "center" }}>
            <div style={{ fontSize: 14, fontFamily: CODEX_FONTS.mono, color: CODEX_COLORS.muted }}>LOAD STABILITY</div>
            <div style={{ height: 8, background: "rgba(0,0,0,0.05)", borderRadius: 4, marginTop: 15, overflow: "hidden" }}>
              <div style={{ height: "100%", width: `${progressBarWidth}%`, background: CODEX_COLORS.primary, borderRadius: 4 }} />
            </div>
          </GlassCard>
        </div>
      </div>
    </>
  );
};
