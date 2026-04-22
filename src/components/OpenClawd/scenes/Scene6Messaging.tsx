import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene6Messaging: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PLATFORMS = [
    { name: "WhatsApp", color: "#25D366" },
    { name: "Telegram", color: "#0088cc" },
    { name: "Signal", color: "#3A76F0" },
    { name: "iMessage", color: "#34C759" },
  ];

  const FEATURES = ["Memory", "Scheduling", "Tools"];

  const titleIn = spring({ frame: frame - 10, fps, config: SPRING_CONFIG });
  const subIn = spring({ frame: frame - 15, fps, config: SPRING_CONFIG });

  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AppWindow>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", width: "100%", fontFamily: FONTS.ui, padding: 40, backgroundColor: COLORS.background }}>
          
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{
              margin: 0,
              fontSize: 48,
              color: COLORS.text.primary,
              letterSpacing: "-1px",
              transform: `translateY(${interpolate(titleIn, [0, 1], [30, 0])}px)`,
              opacity: titleIn,
            }}>
              Your AI, everywhere you chat
            </h2>
            <p style={{
              margin: "16px 0 0 0",
              fontSize: 20,
              color: COLORS.accent,
              transform: `translateY(${interpolate(subIn, [0, 1], [20, 0])}px)`,
              opacity: subIn,
            }}>
              Full tool access · Memory · Scheduling
            </p>
          </div>

          <div style={{ display: "flex", gap: 24 }}>
            {PLATFORMS.map((plat, i) => {
              const cardIn = spring({ frame: frame - 25 - i * 5, fps, config: SPRING_CONFIG });
              return (
                <div key={i} style={{
                  width: 200,
                  backgroundColor: COLORS.surfaces,
                  border: `1px solid ${COLORS.borders}`,
                  borderRadius: 20,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                  alignItems: "center",
                  transform: `scale(${interpolate(cardIn, [0, 1], [0.8, 1])}) translateY(${interpolate(cardIn, [0, 1], [40, 0])}px)`,
                  opacity: cardIn,
                  boxShadow: `0 10px 30px -10px ${plat.color}40`,
                }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, backgroundColor: plat.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 20, fontWeight: "bold" }}>
                    {plat.name[0]}
                  </div>
                  
                  <div style={{ fontSize: 18, color: COLORS.text.primary, fontWeight: 500 }}>{plat.name}</div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, backgroundColor: "rgba(34, 197, 94, 0.1)", padding: "4px 10px", borderRadius: 12 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#22c55e" }} />
                    <span style={{ color: "#22c55e", fontSize: 12, fontWeight: 600 }}>Connected</span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 6, marginTop: 8 }}>
                    {FEATURES.map((feat, fi) => (
                      <div key={fi} style={{
                        padding: "4px 8px",
                        borderRadius: 6,
                        backgroundColor: COLORS.background,
                        color: COLORS.text.muted,
                        fontSize: 11,
                        border: `1px solid ${COLORS.borders}`,
                      }}>
                        {feat}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </AppWindow>
    </div>
  );
};
