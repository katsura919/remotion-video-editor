import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const TOOLS = [
  { name: "Notion", group: "docs" },
  { name: "Linear", group: "issues" },
  { name: "Slack", group: "msg" },
  { name: "GitHub", group: "code" },
  { name: "Supabase", group: "db" },
  { name: "Asana", group: "tasks" },
  { name: "HubSpot", group: "crm" },
  { name: "Stripe", group: "payments" },
  { name: "Gmail", group: "email" },
  { name: "Drive", group: "files" },
];

export const Scene3MCP: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });

  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 64,
        right: 64,
      }}>
        {/* Eyebrow */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          color: BRAND.mutedFg,
          marginBottom: 28,
          opacity: titleIn,
        }}>
          02 ~ MCP ~ TOOLS NATIVE
        </div>

        {/* Headline */}
        <div style={{
          marginBottom: 24,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [32, 0])}px)`,
        }}>
          <div style={{ ...H_DISPLAY, fontFamily: sansFontFamily, fontSize: 88, color: BRAND.fg }}>
            ONE PROTOCOL.
          </div>
          <div style={{ ...H_ACCENT, fontFamily: serifFontFamily, fontSize: 96, color: BRAND.primary }}>
            every tool.
          </div>
        </div>

        {/* Pills grid */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 14,
          marginTop: 28,
          marginBottom: 32,
        }}>
          {TOOLS.map((t, i) => {
            const delay = 24 + i * 6;
            const p = spring({ frame: frame - delay, fps, config: { damping: 200 } });
            const dark = i % 3 === 0;
            return (
              <div
                key={t.name}
                style={{
                  background: dark ? BRAND.fg : BRAND.card,
                  color: dark ? BRAND.bg : BRAND.fg,
                  border: `1.5px solid ${dark ? BRAND.fg : BRAND.border}`,
                  borderRadius: 9999,
                  padding: "16px 28px",
                  fontFamily: sansFontFamily,
                  fontWeight: 600,
                  fontSize: 30,
                  opacity: p,
                  transform: `translateY(${interpolate(p, [0, 1], [24, 0])}px) scale(${interpolate(p, [0, 1], [0.92, 1])})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{
                  width: 10, height: 10, borderRadius: 5,
                  background: dark ? BRAND.primary : BRAND.accent,
                  display: "inline-block",
                }} />
                {t.name}
                <span style={{
                  fontFamily: monoFontFamily,
                  fontSize: 16,
                  ...LABEL_MONO,
                  opacity: 0.55,
                }}>
                  {t.group}
                </span>
              </div>
            );
          })}
        </div>

        {/* Center hub line */}
        <div style={{
          fontFamily: monoFontFamily,
          ...LABEL_MONO,
          fontSize: 22,
          color: BRAND.mutedFg,
          marginTop: 8,
          paddingTop: 24,
          borderTop: `1px solid ${BRAND.border}`,
          opacity: interpolate(frame, [110, 140], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}>
          Agent → MCP server → real app. No glue code.
        </div>

        {/* Punchline */}
        <div style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontSize: 32,
          color: BRAND.mutedFg,
          lineHeight: 1.5,
          marginTop: 24,
          opacity: interpolate(frame, [125, 152], [0, 1], {
            extrapolateRight: "clamp",
            extrapolateLeft: "clamp",
          }),
        }}>
          The agent stops being a chatbot ~
          <br />
          becomes a teammate with credentials.
        </div>
      </div>

      <div style={{
        position: "absolute",
        bottom: 80,
        left: 64,
        right: 64,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: monoFontFamily,
        ...LABEL_MONO,
        fontSize: 22,
        color: BRAND.mutedFg,
      }}>
        <span>abiemaxey.com</span>
        <span>03 / 05</span>
      </div>
    </AbsoluteFill>
  );
};
