import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene5MCPCatalog: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PILLS = ["All", "Core", "Database", "Developer", "Communication"];
  const SERVERS = [
    { name: "Filesystem", auth: "No Auth", color: "#64748b", installed: false },
    { name: "Git", auth: "No Auth", color: "#f14e32", installed: false },
    { name: "GitHub", auth: "Requires Auth", color: "#181717", installed: true },
    { name: "PostgreSQL", auth: "Requires Auth", color: "#336791", installed: false },
    { name: "Slack", auth: "Requires Auth", color: "#4a154b", installed: false },
    { name: "Puppeteer", auth: "No Auth", color: "#40b5a4", installed: false },
  ];

  const modalIn = spring({ frame: frame - 10, fps, config: SPRING_CONFIG });

  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AppWindow>
        <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          
          {/* Background blurred overlay */}
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundColor: "rgba(12, 10, 9, 0.8)", backdropFilter: "blur(8px)" }} />

          {/* Modal */}
          <div style={{
            position: "relative",
            width: 800,
            backgroundColor: COLORS.surfaces,
            borderRadius: 24,
            border: `1px solid ${COLORS.borders}`,
            padding: 32,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8)",
            transform: `translateY(${interpolate(modalIn, [0, 1], [40, 0])}px) scale(${interpolate(modalIn, [0, 1], [0.95, 1])})`,
            opacity: modalIn,
            display: "flex",
            flexDirection: "column",
            gap: 24,
            fontFamily: FONTS.ui,
          }}>
            
            {/* Header */}
            <div>
              <h2 style={{ color: COLORS.text.primary, margin: 0, fontSize: 24 }}>MCP Server Catalog</h2>
              <p style={{ color: COLORS.text.muted, margin: "8px 0 0 0", fontSize: 15 }}>20+ servers available</p>
            </div>

            {/* Filters */}
            <div style={{ display: "flex", gap: 12 }}>
              {PILLS.map((pill, i) => (
                <div key={i} style={{
                  padding: "8px 16px",
                  borderRadius: 20,
                  backgroundColor: i === 0 ? COLORS.text.primary : "transparent",
                  color: i === 0 ? COLORS.background : COLORS.text.primary,
                  border: `1px solid ${i === 0 ? "transparent" : COLORS.borders}`,
                  fontSize: 14,
                  fontWeight: 500,
                }}>
                  {pill}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}>
              {SERVERS.map((srv, i) => {
                const cardIn = spring({ frame: frame - 20 - i * 4, fps, config: SPRING_CONFIG });
                return (
                  <div key={i} style={{
                    backgroundColor: COLORS.background,
                    border: `1px solid ${COLORS.borders}`,
                    borderRadius: 16,
                    padding: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    transform: `scale(${interpolate(cardIn, [0, 1], [0.9, 1])})`,
                    opacity: cardIn,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: srv.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "bold", fontSize: 16 }}>
                        {srv.name[0]}
                      </div>
                      <span style={{ color: COLORS.text.primary, fontSize: 16, fontWeight: 500 }}>{srv.name}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: srv.auth === "No Auth" ? "#22c55e" : COLORS.accent }} />
                      <span style={{ color: COLORS.text.dim, fontSize: 12 }}>{srv.auth}</span>
                    </div>

                    <div style={{
                      marginTop: "auto",
                      padding: "8px",
                      borderRadius: 8,
                      backgroundColor: srv.installed ? COLORS.surfaces : COLORS.text.primary,
                      color: srv.installed ? COLORS.text.primary : COLORS.background,
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 600,
                      border: srv.installed ? `1px solid ${COLORS.borders}` : "none",
                    }}>
                      {srv.installed ? "✓ Installed" : "Install"}
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
