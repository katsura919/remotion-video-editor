import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
  Img,
  staticFile,
} from "remotion";

const COLORS = {
  background: "#1e1b1a",
  foreground: "#f9f5f2",
  card: "#272422",
  primary: "#e3a99c",
  secondary: "#3d3836",
  muted: "#3d3836",
  accent: "#465557",
  border: "#3d3836",
  mutedForeground: "#a69e9a",
};

const FONTS = {
  heading: '"Instrument Serif", serif',
  body: '"Host Grotesk", sans-serif',
  mono: '"Geist Mono", monospace',
};

const GridBackground: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px)
        `,
        backgroundSize: "100px 100px",
        pointerEvents: "none",
        zIndex: 0
      }}
    />
  );
};

// -- Background Components --

const HeaderPill: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 10) * 0.5 + 0.5;

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        left: 60,
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "16px 32px",
        borderRadius: 999,
        border: `3px solid ${COLORS.foreground}`,
        fontFamily: FONTS.body,
        fontWeight: 700,
        fontSize: 28,
        color: COLORS.foreground,
        backgroundColor: COLORS.muted,
      }}
    >
      <span style={{ fontSize: 24 }}>🧠</span>
      AI SECRETS: PERSONA HACK
    </div>
  );
};

const Watermark: React.FC = () => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 80,
        right: 80,
        display: "flex",
        alignItems: "center",
        gap: 12,
        fontFamily: FONTS.heading,
        fontSize: 32,
        fontWeight: 500,
        color: COLORS.foreground,
        opacity: 0.5,
        letterSpacing: "1px",
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
      @Abiemaxey
    </div>
  );
};

const PageIndicator: React.FC<{ current: number; total: number; label: string; DURATION: number }> = ({ current, total, label, DURATION }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, DURATION - 10, DURATION], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        top: 80,
        right: 80,
        fontFamily: FONTS.body,
        fontSize: 32,
        fontWeight: 700,
        color: COLORS.foreground,
        opacity: opacity * 0.5,
        letterSpacing: "4px"
      }}
    >
      {String(current).padStart(2, "0")} / {String(total).padStart(2, "0")}
    </div>
  );
};

const SplitTextReveal: React.FC<{ text: string; size?: number; width?: number; delay?: number }> = ({ 
  text, 
  size = 120, 
  width = 900, 
  delay = 0 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width, gap: "20px 24px" }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 4;
        const translateY = spring({
          frame: frame - wordDelay,
          fps,
          config: { stiffness: 100, damping: 10 },
          from: 100,
          to: 0,
        });
        const opacity = interpolate(frame - wordDelay, [0, 8], [0, 1], { extrapolateRight: "clamp" });

        return (
          <div key={i} style={{ overflow: "hidden" }}>
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: size,
                color: COLORS.foreground,
                lineHeight: 1.05,
                transform: `translateY(${translateY}%)`,
                opacity,
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              {word}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const DynamicCard: React.FC<{ children: React.ReactNode; top: number; height: number; delay: number }> = ({ 
  children, 
  top, 
  height, 
  delay 
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const translateY = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 12 },
    from: 1200,
    to: 0,
  });

  return (
    <div
      style={{
        position: "absolute",
        left: 60,
        right: 60,
        top,
        height,
        backgroundColor: COLORS.card,
        borderRadius: "0.625rem",
        transform: `translateY(${translateY}px)`,
        boxShadow: "0 30px 60px rgba(0,0,0,0.1)",
        overflow: "hidden",
        border: `3px solid ${COLORS.foreground}`,
      }}
    >
      {children}
    </div>
  );
};

const TerminalMockup: React.FC<{ 
  title: string; 
  lines: { prefix?: string; text: string; color?: string; delay?: number }[] 
}> = ({ title, lines }) => {
  const frame = useCurrentFrame();

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#1e1e1e", padding: "12px 24px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
          <div style={{ width: 14, height: 14, borderRadius: "50%", backgroundColor: "#28c840" }} />
        </div>
        <span style={{ fontFamily: FONTS.mono, fontSize: 18, color: "rgba(255,255,255,0.3)", marginLeft: 8 }}>
          {title}
        </span>
      </div>

      {/* Body */}
      <div style={{ flex: 1, backgroundColor: "#0d0d0d", padding: 40, fontFamily: FONTS.mono, fontSize: 24, lineHeight: 1.5, overflow: "hidden" }}>
        {lines.map((l, i) => {
          const lineDelay = l.delay ?? i * 3; // Speeder typing for shorter scenes
          const charsToShow = Math.max(0, Math.floor((frame - lineDelay) / 0.5)); // Even faster
          const visibleText = l.text.substring(0, charsToShow);
          const isVisible = frame >= lineDelay;

          if (!isVisible) return null;

          return (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 8, color: l.color || "rgba(255,255,255,0.7)" }}>
              {l.prefix && (
                <span style={{ color: COLORS.primary, fontWeight: "bold" }}>
                  {l.prefix}
                </span>
              )}
              <span style={{ whiteSpace: "pre-wrap" }}>
                {visibleText}
                {frame % 10 < 5 && i === lines.findIndex((val, idx) => (frame >= (val.delay ?? idx * 3)) && charsToShow < val.text.length) ? "█" : ""}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// -- Main Composition --

export const BuddyCommandReelDark: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const DURATION = 60; // 2 seconds at 30fps

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      <GridBackground />
      <HeaderPill />

      {/* Scene 1: The Hook */}
      <Sequence from={0} durationInFrames={DURATION}>
        <PageIndicator current={1} total={5} label="Prompting" DURATION={DURATION} />
        <div style={{ position: "absolute", top: 400, left: 80, right: 80 }}>
          <SplitTextReveal text="Stop getting boring AI answers. 🛑" size={130} />
        </div>
      </Sequence>

      {/* Scene 2: Concept */}
      <Sequence from={DURATION} durationInFrames={DURATION}>
        <PageIndicator current={2} total={5} label="The Method" DURATION={DURATION} />
        <div style={{ position: "absolute", top: 250, left: 80, right: 80 }}>
          <SplitTextReveal text="The 'Persona' Method is the key." size={95} />
        </div>
        <DynamicCard top={450} height={420} delay={15}>
          <div style={{ padding: 60, color: COLORS.foreground, fontFamily: FONTS.body, fontSize: 48, fontWeight: 500, lineHeight: 1.4 }}>
            Assigning a specific <span style={{ color: COLORS.primary, fontWeight: 700 }}>Expert Role</span> to your AI improves reasoning quality by up to 40%.
          </div>
        </DynamicCard>
      </Sequence>

      {/* Scene 3: Demo */}
      <Sequence from={DURATION * 2} durationInFrames={DURATION}>
        <PageIndicator current={3} total={5} label="Demo" DURATION={DURATION} />
        <div style={{ position: "absolute", top: 220, left: 80, right: 80 }}>
          <SplitTextReveal text="See it in action" size={100} />
        </div>
        <DynamicCard top={400} height={650} delay={15}>
          <TerminalMockup 
            title="prompt-lab ~ persona-test"
            lines={[
              { prefix: "➜", text: " user ~", color: COLORS.primary },
              { prefix: ">", text: " ollama run expert-mode", color: "#fff" },
              { text: "" },
              { prefix: ">>>", text: " Act as a Senior UX Writer.", color: COLORS.accent },
              { text: " Optimize this checkout flow...", color: "rgba(255,255,255,0.6)" },
              { text: "" },
              { text: " ● Thinking with Persona...", color: "rgba(255,255,255,0.4)" },
              { text: " ✔ Strategy Generated.", color: "#28c840" },
              { text: " 'Reduce friction by adding...'", color: COLORS.primary }
            ]}
          />
        </DynamicCard>
      </Sequence>

      {/* Scene 4: CTA */}
      <Sequence from={DURATION * 3} durationInFrames={DURATION}>
        <PageIndicator current={4} total={5} label="Advice" DURATION={DURATION} />
        <div style={{ position: "absolute", top: 500, left: 80, right: 80 }}>
          <SplitTextReveal text="Context is King. Give AI a role." size={120} delay={10} />
        </div>
      </Sequence>

      {/* Scene 5: Profile CTA */}
      <Sequence from={DURATION * 4} durationInFrames={DURATION}>
        <PageIndicator current={5} total={5} label="Join Us" DURATION={DURATION} />
        {(() => {
          const relativeFrame = frame - DURATION * 4;
          
          const avatarSpring = spring({ frame: relativeFrame, fps, config: { stiffness: 100, damping: 10 }, from: 0, to: 1 });
          const textSpring = spring({ frame: relativeFrame - 10, fps, config: { stiffness: 80, damping: 12 }, from: 0, to: 1 });
          const buttonSpring = spring({ frame: relativeFrame - 20, fps, config: { stiffness: 120, damping: 14 }, from: 0, to: 1 });

          return (
            <div style={{ position: "absolute", top: 300, left: 80, right: 80, display: "flex", flexDirection: "column", alignItems: "center", gap: 60 }}>
              <div style={{ transform: `scale(${avatarSpring})`, opacity: avatarSpring }}>
                <Img 
                  src={staticFile("abiemaxey/assets/abie-avatar.jpg")} 
                  style={{ 
                    width: 380, 
                    height: 380, 
                    borderRadius: "50%", 
                    border: `3px solid ${COLORS.primary}`,
                    boxShadow: `0 20px 60px rgba(0,0,0,0.3)`,
                    objectFit: "cover"
                  }} 
                />
              </div>
              
              <div style={{ 
                opacity: textSpring, 
                transform: `translateY(${interpolate(textSpring, [0, 1], [50, 0])}px)`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20
              }}>
                <div style={{ fontFamily: FONTS.heading, fontSize: 130, fontStyle: "italic", fontWeight: 400, color: COLORS.foreground, textAlign: "center", lineHeight: 1.1 }}>
                  Building in Public.
                </div>
                <div style={{ fontFamily: FONTS.body, fontSize: 48, color: COLORS.foreground, opacity: 0.7, textAlign: "center", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase" }}>
                  Join 7,000+ Builders • Tips daily
                </div>
              </div>

              <div style={{ 
                marginTop: 60, 
                backgroundColor: COLORS.primary, 
                color: COLORS.background, 
                padding: "32px 80px", 
                borderRadius: 999, 
                fontFamily: FONTS.body, 
                fontSize: 56, 
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "4px",
                opacity: buttonSpring,
                transform: `scale(${buttonSpring})`
              }}>
                Follow Me
              </div>
            </div>
          );
        })()}
      </Sequence>
    </AbsoluteFill>
  );
};
