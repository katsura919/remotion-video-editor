import React from "react";
import { useCurrentFrame } from "remotion";
import { CODEX_FONTS, CODEX_COLORS } from "../constants";

export interface TerminalLine {
  prefix?: string;
  text: string;
  color?: string;
  delay?: number;
  isCommand?: boolean;
  isResponse?: boolean;
}

export const TerminalMockup: React.FC<{ 
  title: string; 
  lines: TerminalLine[];
  startDelay?: number;
}> = ({ title, lines, startDelay = 0 }) => {
  const frame = useCurrentFrame();
  const adjustedFrame = Math.max(0, frame - startDelay);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ 
        backgroundColor: "#1e1e1e", 
        padding: "16px 24px", 
        display: "flex", 
        alignItems: "center", 
        gap: 12,
        borderBottom: `1px solid rgba(255,255,255,0.1)`
      }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#28c840" }} />
        </div>
        <span style={{ fontFamily: CODEX_FONTS.mono, fontSize: 18, color: "rgba(255,255,255,0.4)", marginLeft: 8 }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ 
        flex: 1, 
        backgroundColor: "#0d0d0d", 
        padding: 40, 
        fontFamily: CODEX_FONTS.mono, 
        fontSize: 24, 
        lineHeight: 1.6, 
        overflow: "hidden" 
      }}>
        {lines.map((l, i) => {
          const lineDelay = l.delay ?? i * 5;
          const charsToShow = Math.max(0, Math.floor((adjustedFrame - lineDelay) / 1));
          const visibleText = l.text.substring(0, charsToShow);
          const isVisible = adjustedFrame >= lineDelay;

          if (!isVisible) return null;

          const defaultPrefix = l.isCommand ? ">" : l.isResponse ? ">>>" : l.prefix;
          const defaultColor = l.isCommand ? "#fff" : l.isResponse ? CODEX_COLORS.primary : (l.color || "rgba(255,255,255,0.7)");

          return (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, color: defaultColor }}>
              {defaultPrefix && (
                <span style={{ color: CODEX_COLORS.primary, fontWeight: "bold" }}>
                  {defaultPrefix}
                </span>
              )}
              <span>
                {visibleText}
                {adjustedFrame % 20 < 10 && i === lines.filter(val => (adjustedFrame >= (val.delay ?? 0))).length - 1 && charsToShow < l.text.length ? "█" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
