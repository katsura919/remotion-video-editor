import React from "react";
import { useCurrentFrame, spring, useVideoConfig, interpolate, Img, staticFile } from "remotion";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../constants";

export const ProfileCTASequence: React.FC<{
  label: string;
  username: string;
  handle: string;
  followerCount: string;
  durationInFrames: number;
}> = ({ label, username, handle, followerCount, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const labelOpacity = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  
  const avatarSpring = spring({ frame, fps, config: CODEX_TIMING.delayedSpring, from: 0, to: 1 });
  const textSpring = spring({ frame: frame - 10, fps, config: CODEX_TIMING.smoothSpring, from: 0, to: 1 });
  const buttonSpring = spring({ frame: frame - 20, fps, config: CODEX_TIMING.fastSpring, from: 0, to: 1 });

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

      <div style={{ position: "absolute", top: 250, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
        {/* Avatar Container */}
        <div style={{ transform: `scale(${avatarSpring})`, opacity: avatarSpring, position: "relative" }}>
          <div style={{
            position: "absolute",
            inset: -20,
            borderRadius: "50%",
            border: `1px dashed ${CODEX_COLORS.primary}`,
            animation: "spin 20s linear infinite",
            opacity: 0.3
          }} />
          <Img 
            src={staticFile("abiemaxey/assets/abie-avatar.jpg")} 
            style={{ 
              width: 320, 
              height: 320, 
              borderRadius: "50%", 
              border: `4px solid ${CODEX_COLORS.card}`,
              boxShadow: `0 30px 60px rgba(0,0,0,0.12)`,
              objectFit: "cover",
              position: "relative",
              zIndex: 2
            }} 
          />
        </div>
        
        {/* Details */}
        <div style={{ 
          opacity: textSpring, 
          transform: `translateY(${interpolate(textSpring, [0, 1], [50, 0])}px)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 16
        }}>
          <div style={{ 
            fontFamily: CODEX_FONTS.heading, 
            fontSize: 100, 
            fontStyle: "italic", 
            fontWeight: 400, 
            color: CODEX_COLORS.foreground, 
            textAlign: "center", 
            lineHeight: 1.1 
          }}>
            {username}
          </div>
          <div style={{ 
            fontFamily: CODEX_FONTS.body, 
            fontSize: 32, 
            color: CODEX_COLORS.primary, 
            textAlign: "center", 
            fontWeight: 700, 
            letterSpacing: "4px", 
            textTransform: "uppercase" 
          }}>
            {handle}
          </div>
          <div style={{ 
            fontFamily: CODEX_FONTS.body, 
            fontSize: 32, 
            color: CODEX_COLORS.foreground, 
            textAlign: "center", 
            fontWeight: 600, 
            padding: "8px 32px",
            backgroundColor: "rgba(0,0,0,0.03)",
            borderRadius: 99
          }}>
            {followerCount} Followers • Daily Tech Updates
          </div>
        </div>

        {/* Action Button */}
        <div style={{ 
          marginTop: 40, 
          backgroundColor: CODEX_COLORS.primary, 
          color: CODEX_COLORS.background, 
          padding: "24px 64px", 
          borderRadius: 999, 
          fontFamily: CODEX_FONTS.body, 
          fontSize: 32, 
          fontWeight: 800,
          textTransform: "uppercase",
          letterSpacing: "4px",
          opacity: buttonSpring,
          transform: `scale(${buttonSpring})`,
          boxShadow: `0 20px 40px rgba(227, 169, 156, 0.3)`,
        }}>
          Join the Journey
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
};
