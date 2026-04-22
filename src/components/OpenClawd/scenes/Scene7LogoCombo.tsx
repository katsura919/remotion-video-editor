import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig, Sequence } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene7LogoCombo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AppWindow>
        <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: COLORS.background, overflow: "hidden", fontFamily: FONTS.ui }}>
          
          {/* Subscene A: Intro (0-60) */}
          <Sequence from={0} durationInFrames={60}>
            <IntroBurst />
          </Sequence>

          {/* Subscene B: Introducing (60-120) */}
          <Sequence from={60} durationInFrames={60}>
            <IntroducingText />
          </Sequence>

          {/* Subscene C: Summary (120-180) */}
          <Sequence from={120} durationInFrames={60}>
            <ProviderSummary />
          </Sequence>

        </div>
      </AppWindow>
    </div>
  );
};

const IntroBurst: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Burst animation
  const scale = spring({ frame, fps, config: { damping: 12 } });
  const opacity = interpolate(frame, [45, 60], [1, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", opacity }}>
      {/* Grid Background */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.borders} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.borders} 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.2 }} />
      
      {/* Center bursting ring */}
      <div style={{
        position: "absolute",
        width: 200, height: 200,
        borderRadius: "50%",
        border: `4px solid ${COLORS.accent}`,
        transform: `scale(${interpolate(scale, [0, 1], [0.1, 4])})`,
        opacity: interpolate(scale, [0, 1], [1, 0]),
      }} />

      {/* Center dot */}
      <div style={{
        width: 24, height: 24, borderRadius: "50%", backgroundColor: COLORS.accent,
        transform: `scale(${scale})`,
        boxShadow: `0 0 40px 10px ${COLORS.accent}`
      }} />
    </div>
  );
};

const IntroducingText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = "Open Source AI Desktop".split(" ");
  const opacityOut = interpolate(frame, [45, 60], [1, 0], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: opacityOut }}>
      <div style={{ color: COLORS.accent, fontSize: 18, fontWeight: 600, letterSpacing: 2, marginBottom: 24 }}>✦ INTRODUCING ✦</div>
      
      <div style={{ display: "flex", gap: 12 }}>
        {words.map((word, i) => {
          const wordIn = spring({ frame: frame - 10 - i * 5, fps, config: SPRING_CONFIG });
          return (
            <div key={i} style={{
              fontSize: 56,
              color: COLORS.text.primary,
              fontWeight: "bold",
              transform: `translateY(${interpolate(wordIn, [0, 1], [20, 0])}px)`,
              opacity: wordIn,
            }}>
              {word}
            </div>
          );
        })}
      </div>

      <div style={{
        marginTop: 32,
        fontFamily: FONTS.code,
        color: COLORS.text.muted,
        fontSize: 18,
        opacity: spring({ frame: frame - 30, fps, config: SPRING_CONFIG }),
      }}>
        Opus 4.6 · Sonnet 3.5 · GPT-4o · Llama 3
      </div>
    </div>
  );
};

const ProviderSummary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const PROVIDERS = [
    { name: "Claude Code", color: "#8b5cf6" },
    { name: "OpenCode", color: COLORS.accent },
    { name: "OpenAI", color: "#10b981" },
    { name: "Gemini", color: "#3b82f6" },
    { name: "DeepSeek", color: "#6366f1" },
    { name: "Llama 4", color: "#f97316" },
    { name: "MiniMax", color: "#ec4899" },
    { name: "Ollama", color: "#eab308" },
  ];

  const containerIn = spring({ frame: frame - 5, fps, config: SPRING_CONFIG });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", opacity: containerIn, transform: `scale(${interpolate(containerIn, [0, 1], [0.95, 1])})` }}>
      
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, marginBottom: 48 }}>
        {PROVIDERS.map((p, i) => {
          const pIn = spring({ frame: frame - 10 - i * 2, fps, config: { damping: 12 } });
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, transform: `translateY(${interpolate(pIn, [0, 1], [10, 0])}px)`, opacity: pIn }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: p.color }} />
              <div style={{ color: COLORS.text.primary, fontSize: 18, fontWeight: 500 }}>{p.name}</div>
            </div>
          );
        })}
      </div>

      <div style={{ color: COLORS.text.dim, fontSize: 18, textAlign: "center", lineHeight: 1.6 }}>
        <span style={{ color: COLORS.accent }}>Claude Code + OpenCode SDK</span> · 80+ models<br/>
        Desktop · Messaging · API
      </div>
    </div>
  );
};
