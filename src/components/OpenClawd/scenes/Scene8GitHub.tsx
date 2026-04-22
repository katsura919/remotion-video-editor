import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { AppWindow } from "../components/AppWindow";
import { COLORS, FONTS, SPRING_CONFIG } from "../constants";

export const Scene8GitHub: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const containerIn = spring({ frame: frame - 10, fps, config: SPRING_CONFIG });
  
  const rotation = interpolate(containerIn, [0, 1], [-180, 0]);
  const pulse = Math.sin(frame / 10) * 0.05 + 1; // 0.95 to 1.05

  return (
    <div style={{ flex: 1, backgroundColor: COLORS.background, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <AppWindow>
        <div style={{ position: "relative", width: "100%", height: "100%", backgroundColor: COLORS.background, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: FONTS.ui, overflow: "hidden" }}>
          
          {/* Subtle Grid */}
          <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(${COLORS.borders} 1px, transparent 1px), linear-gradient(90deg, ${COLORS.borders} 1px, transparent 1px)`, backgroundSize: "40px 40px", opacity: 0.2 }} />

          {/* Floating Particles/Stars */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2 + (frame / 50);
            const radius = 100 + Math.sin(frame / 30 + i) * 20;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <div key={i} style={{
                position: "absolute",
                left: "50%", top: "40%",
                transform: `translate(${x}px, ${y}px)`,
                color: COLORS.accent,
                opacity: 0.5,
              }}>
                ★
              </div>
            );
          })}

          <div style={{
            transform: `scale(${interpolate(containerIn, [0, 1], [0.8, 1])})`,
            opacity: containerIn,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            zIndex: 1,
            marginTop: -40,
          }}>
            {/* Label */}
            <div style={{
              padding: "6px 16px",
              backgroundColor: "rgba(251, 191, 36, 0.1)",
              color: COLORS.accent,
              borderRadius: 20,
              fontSize: 14,
              fontWeight: 600,
              letterSpacing: 1,
              marginBottom: 32,
              border: `1px solid rgba(251, 191, 36, 0.2)`,
            }}>
              100% OPEN SOURCE
            </div>

            {/* GitHub Logo */}
            <div style={{
              transform: `rotate(${rotation}deg) scale(${pulse})`,
              marginBottom: 24,
            }}>
              <svg height="80" viewBox="0 0 16 16" version="1.1" width="80" aria-hidden="true" fill={COLORS.text.primary}>
                <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path>
              </svg>
            </div>

            <h2 style={{ fontSize: 36, color: COLORS.text.primary, margin: "0 0 40px 0" }}>
              Star us on GitHub
            </h2>

            {/* Repo Card */}
            <div style={{
              backgroundColor: COLORS.surfaces,
              border: `1px solid ${COLORS.borders}`,
              padding: "16px 32px",
              borderRadius: 12,
              fontFamily: FONTS.code,
              fontSize: 18,
              color: COLORS.text.primary,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}>
              <span style={{ color: COLORS.text.muted }}>$</span>
              github.com/rohitg00/abiemaxey
            </div>
          </div>

        </div>
      </AppWindow>
    </div>
  );
};
