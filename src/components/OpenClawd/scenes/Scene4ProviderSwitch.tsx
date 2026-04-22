import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene4ProviderSwitch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PROVIDERS = [
    { name: "Claude Code", color: "#8b5cf6", active: true },
    { name: "OpenCode", color: COLORS.accent },
    { name: "OpenAI", color: "#10b981" },
    { name: "Gemini", color: "#3b82f6" },
    { name: "DeepSeek", color: "#6366f1" },
    { name: "Llama 4", color: "#f97316" },
    { name: "MiniMax", color: "#ec4899" },
    { name: "Ollama", color: "#eab308" },
  ];

  const MODELS = [
    { name: "Opus 4.6", desc: "Best for complex code generation", active: true },
    { name: "Sonnet 4.5", desc: "Balanced performance and speed" },
    { name: "Haiku 4.0", desc: "Fastest response time" },
    { name: "GPT-5.3 Codex", desc: "Specialized for advanced logic" },
    { name: "Gemini 3 Pro", desc: "Multimodal and fast" },
    { name: "DeepSeek-V4", desc: "Open weights, superior coding" },
  ];

  const panelIn = spring({ frame: frame - 10, fps, config: SPRING_CONFIG });
  
  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AppWindow>
        <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", fontFamily: FONTS.ui, padding: 40, alignItems: "center", justifyContent: "center" }}>
          
          <div style={{ 
            display: "flex", 
            gap: 24, 
            width: "100%", 
            maxWidth: 800, 
            transform: `translateY(${interpolate(panelIn, [0, 1], [40, 0])}px)`,
            opacity: panelIn,
          }}>
            {/* Providers Panel */}
            <div style={{ flex: 1, backgroundColor: COLORS.background, borderRadius: 16, border: `1px solid ${COLORS.borders}`, padding: 16 }}>
              <div style={{ color: COLORS.text.dim, fontSize: 13, fontWeight: 600, marginBottom: 12, paddingLeft: 8 }}>PROVIDERS (20+)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {PROVIDERS.map((p, i) => {
                  const itemIn = spring({ frame: frame - 15 - i * 3, fps, config: { damping: 12 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: 8,
                      backgroundColor: p.active ? COLORS.surfaces : "transparent",
                      border: `1px solid ${p.active ? COLORS.borders : "transparent"}`,
                      transform: `translateX(${interpolate(itemIn, [0, 1], [-10, 0])}px)`,
                      opacity: itemIn,
                    }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: p.color }} />
                        <span style={{ color: COLORS.text.primary, fontSize: 14 }}>{p.name}</span>
                      </div>
                      {p.active && <div style={{ color: COLORS.text.primary }}>✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Models Panel */}
            <div style={{ flex: 1.5, backgroundColor: COLORS.background, borderRadius: 16, border: `1px solid ${COLORS.borders}`, padding: 16 }}>
              <div style={{ color: COLORS.text.dim, fontSize: 13, fontWeight: 600, marginBottom: 12, paddingLeft: 8 }}>MODELS (80+)</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {MODELS.map((m, i) => {
                  const itemIn = spring({ frame: frame - 25 - i * 3, fps, config: { damping: 12 } });
                  return (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "10px 12px",
                      borderRadius: 8,
                      backgroundColor: m.active ? COLORS.surfaces : "transparent",
                      border: `1px solid ${m.active ? COLORS.borders : "transparent"}`,
                      transform: `translateX(${interpolate(itemIn, [0, 1], [-10, 0])}px)`,
                      opacity: itemIn,
                    }}>
                      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                        <span style={{ color: COLORS.text.primary, fontSize: 15, fontWeight: m.active ? 600 : 400 }}>{m.name}</span>
                        <span style={{ color: COLORS.text.muted, fontSize: 13 }}>{m.desc}</span>
                      </div>
                      {m.active && <div style={{ color: COLORS.text.primary }}>✓</div>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div style={{
            marginTop: 40,
            fontSize: 18,
            color: COLORS.text.muted,
            transform: `translateY(${interpolate(panelIn, [0, 1], [20, 0])}px)`,
            opacity: panelIn,
          }}>
            Claude Code + OpenCode SDK — <span style={{ color: COLORS.accent }}>20+ providers · Open Source models</span>
          </div>

        </div>
      </AppWindow>
    </div>
  );
};
