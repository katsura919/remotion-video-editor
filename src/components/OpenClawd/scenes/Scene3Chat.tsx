import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene3Chat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const sidebarIn = spring({ frame: frame - 10, fps, config: SPRING_CONFIG });
  const centerIn = spring({ frame: frame - 20, fps, config: SPRING_CONFIG });
  const rightIn = spring({ frame: frame - 30, fps, config: SPRING_CONFIG });

  const textToStream = `I've reviewed your API code. Here are the main security findings:

1. Rate Limiting: There is no rate limiting on the /auth endpoint.
2. SQL Injection: Using raw queries in the users controller.
3. Input Validation: Missing schema validation on the request bodies.

I will implement these fixes now.`;

  const charsShown = Math.max(0, Math.floor((frame - 50) * 1.5));
  const streamedText = textToStream.substring(0, charsShown);

  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background, padding: 0 }}>
      <AppWindow>
        <div style={{ display: "flex", height: "100%", width: "100%", fontFamily: FONTS.ui }}>
          {/* Left Sidebar */}
          <div
            style={{
              width: 260,
              backgroundColor: COLORS.surfaces,
              borderRight: `1px solid ${COLORS.borders}`,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 16,
              transform: `translateX(${interpolate(sidebarIn, [0, 1], [-50, 0])}px)`,
              opacity: sidebarIn,
            }}
          >
            <div style={{ fontSize: 12, color: COLORS.text.dim, fontWeight: 600, textTransform: "uppercase" }}>
              Recent Chats
            </div>
            {[
               "API Code Review",
               "MCP Integration",
               "Update React dependencies",
               "Debug Next.js routing",
             ].map((t, i) => (
              <div
                key={i}
                style={{
                  padding: "10px 12px",
                  backgroundColor: i === 0 ? COLORS.borders : "transparent",
                  borderRadius: 8,
                  color: i === 0 ? COLORS.text.primary : COLORS.text.muted,
                  fontSize: 14,
                }}
              >
                {t}
              </div>
            ))}
          </div>

          {/* Center Chat */}
          <div
            style={{
              flex: 1,
              backgroundColor: COLORS.background,
              padding: 40,
              display: "flex",
              flexDirection: "column",
              gap: 32,
              transform: `translateY(${interpolate(centerIn, [0, 1], [30, 0])}px)`,
              opacity: centerIn,
            }}
          >
            {/* User Message */}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  backgroundColor: COLORS.surfaces,
                  padding: "12px 20px",
                  borderRadius: "20px 20px 4px 20px",
                  color: COLORS.text.primary,
                  fontSize: 15,
                  border: `1px solid ${COLORS.borders}`,
                }}
              >
                Review my API code
              </div>
            </div>

            {/* AI Response */}
            <div style={{ display: "flex", gap: 16 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  backgroundColor: COLORS.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ color: "#000", fontWeight: "bold" }}>A</div>
              </div>
              <div
                style={{
                  color: COLORS.text.primary,
                  fontSize: 15,
                  lineHeight: 1.6,
                  whiteSpace: "pre-wrap",
                }}
              >
                {streamedText}
                {frame % 30 < 15 && charsShown < textToStream.length && (
                  <span style={{ display: "inline-block", width: 8, height: 16, backgroundColor: COLORS.accent, marginLeft: 4 }} />
                )}
              </div>
            </div>
          </div>

          {/* Right Panel - Tools */}
          <div
            style={{
              width: 300,
              backgroundColor: COLORS.surfaces,
              borderLeft: `1px solid ${COLORS.borders}`,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 24,
              transform: `translateX(${interpolate(rightIn, [0, 1], [50, 0])}px)`,
              opacity: rightIn,
            }}
          >
            <div style={{ fontSize: 14, color: COLORS.text.primary, fontWeight: 600 }}>Active Tools</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { step: "Reading", tool: "filesystem.read", at: 40 },
                { step: "Security analysis", tool: "bash.exec", at: 80 },
                { step: "Applying fixes", tool: "filesystem.write", at: 110 },
                { step: "Creating PR", tool: "github.create_pr", at: 140 },
              ].map((item, idx) => {
                const isDone = frame > item.at;
                return (
                  <div key={idx} style={{ display: "flex", gap: 12, opacity: frame > item.at - 10 ? 1 : 0, transition: 'opacity 0.2s' }}>
                    <div style={{ color: isDone ? "#22c55e" : COLORS.text.dim }}>
                      {isDone ? "✓" : "○"}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                      <span style={{ color: isDone ? COLORS.text.primary : COLORS.text.muted, fontSize: 14 }}>
                        {item.step}
                      </span>
                      <span style={{ color: COLORS.accent, fontFamily: FONTS.code, fontSize: 12 }}>
                        {item.tool}
                      </span>
                    </div>
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
