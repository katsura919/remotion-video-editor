import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  Sequence,
} from "remotion";

const BRAND = {
  cream: "#f9f5f2",
  rose: "#e3a99c",
  charcoal: "#3a3a3a",
  beige: "#e7ddd3",
  teal: "#bbcccd",
};

const FONTS = {
  heading: "'Instrument Serif', serif",
  body: "'Space Grotesk', sans-serif",
  mono: "'Menlo', 'Consolas', monospace",
};

// -- Reusable Components --

const GrainOverlay: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        opacity: 0.4,
        mixBlendMode: "multiply",
        pointerEvents: "none",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
      }}
    />
  );
};

const HeaderPill: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = Math.sin(frame / 10) * 0.5 + 0.5; // 0 to 1

  return (
    <div
      style={{
        position: "absolute",
        top: 60,
        left: 60,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: "12px 24px",
        borderRadius: 999,
        border: `2px solid ${BRAND.charcoal}`,
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: 24,
        color: BRAND.charcoal,
      }}
    >
      <div
        style={{
          width: 14,
          height: 14,
          borderRadius: "50%",
          backgroundColor: BRAND.rose,
          opacity: 0.3 + pulse * 0.7,
          boxShadow: `0 0 10px ${BRAND.rose}`,
        }}
      />
      CLAUDE COMMANDS
    </div>
  );
};

const NewsTicker: React.FC = () => {
  const frame = useCurrentFrame();
  const shift = (frame * 5) % 1000;

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: 80,
        backgroundColor: BRAND.beige,
        borderTop: `2px solid ${BRAND.charcoal}`,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        fontFamily: FONTS.body,
        fontWeight: 600,
        fontSize: 32,
        color: BRAND.charcoal,
        whiteSpace: "nowrap",
      }}
    >
      <div style={{ transform: `translateX(-${shift}px)`, display: "flex" }}>
        {[...Array(6)].map((_, i) => (
          <span key={i} style={{ paddingRight: 50 }}>
            • NEW TERMINAL TRICKS • BOOST PRODUCTIVITY • CLAUDE 3.7
          </span>
        ))}
      </div>
    </div>
  );
};

const SplitTextReveal: React.FC<{ text: string; size?: number; width?: number; delay?: number }> = ({ text, size = 110, width = 800, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const words = text.split(" ");

  return (
    <div style={{ display: "flex", flexWrap: "wrap", width, gap: "16px 20px" }}>
      {words.map((word, i) => {
        const wordDelay = delay + i * 3;
        const translateY = spring({
          frame: frame - wordDelay,
          fps,
          config: { stiffness: 100, damping: 10 },
          from: 100,
          to: 0,
        });
        const opacity = interpolate(frame - wordDelay, [0, 5], [0, 1], { extrapolateRight: "clamp" });

        return (
          <div key={i} style={{ overflow: "hidden" }}>
            <div
              style={{
                fontFamily: FONTS.heading,
                fontSize: size,
                color: BRAND.charcoal,
                lineHeight: 1.1,
                transform: `translateY(${translateY}%)`,
                opacity,
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


const DynamicCard: React.FC<{ children: React.ReactNode; top: number; height: number; delay: number }> = ({ children, top, height, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const translateY = spring({
    frame: frame - delay,
    fps,
    config: { stiffness: 100, damping: 12 },
    from: 1000,
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
        backgroundColor: BRAND.charcoal,
        borderRadius: "0.625rem",
        transform: `translateY(${translateY}px)`,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

const TerminalMockup: React.FC = () => {
  const frame = useCurrentFrame();
  
  const commands = [
    { text: "$ claude /buddy", delay: 0 },
    { text: "> Initializing workspace context...", delay: 30, color: BRAND.teal },
    { text: "> Reading active files...", delay: 60, color: BRAND.teal },
    { text: "🤖 Hi! I'm your coding buddy. What are we building today?", delay: 100, color: BRAND.rose },
  ];

  return (
    <div style={{ padding: 40, fontFamily: FONTS.mono, fontSize: 32, color: BRAND.cream, display: "flex", flexDirection: "column", gap: 20 }}>
      {/* Terminal Header */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
        <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#ff5f56" }} />
        <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
        <div style={{ width: 18, height: 18, borderRadius: "50%", backgroundColor: "#27c93f" }} />
      </div>
      
      {commands.map((cmd, i) => {
        const charsToShow = Math.max(0, Math.floor((frame - cmd.delay) / 1.5));
        const visibleText = cmd.text.substring(0, charsToShow);
        const isVisible = frame >= cmd.delay;

        if (!isVisible) return null;

        return (
          <div key={i} style={{ color: cmd.color || BRAND.cream }}>
            {visibleText}
            {frame % 30 < 15 && i === commands.length - 1 && charsToShow >= cmd.text.length ? " █" : ""}
          </div>
        );
      })}
    </div>
  );
};


// -- Main Composition --

export const BuddyCommandReel: React.FC = () => {
    
  return (
    <AbsoluteFill style={{ backgroundColor: BRAND.cream }}>
      <GrainOverlay />
      <HeaderPill />
      <NewsTicker />

      {/* Scene 1: The Hook */}
      <Sequence from={0} durationInFrames={105}>
        <div style={{ position: "absolute", top: 300, left: 60, right: 60 }}>
          <SplitTextReveal text="Meet your new best friend: /buddy" size={130} />
        </div>
      </Sequence>

      {/* Scene 2: What is it? */}
      <Sequence from={105} durationInFrames={105}>
        <div style={{ position: "absolute", top: 200, left: 60, right: 60 }}>
          <SplitTextReveal text="What is it?" size={90} />
        </div>
        <DynamicCard top={400} height={350} delay={15}>
          <div style={{ padding: 60, color: BRAND.cream, fontFamily: FONTS.body, fontSize: 48, fontWeight: 500, lineHeight: 1.4 }}>
            Your contextual AI programming assistant, running natively in your terminal.
          </div>
        </DynamicCard>
      </Sequence>

      {/* Scene 3: The Terminal Demo */}
      <Sequence from={210} durationInFrames={150}>
        <div style={{ position: "absolute", top: 180, left: 60, right: 60 }}>
           <SplitTextReveal text="See it in action" size={90} />
        </div>
        <DynamicCard top={340} height={450} delay={15}>
          <TerminalMockup />
        </DynamicCard>
      </Sequence>

      {/* Scene 4: Call to Action */}
      <Sequence from={360}>
        <div style={{ position: "absolute", top: 400, left: 60, right: 60 }}>
          <SplitTextReveal text="Try it in the Claude CLI today." size={120} delay={10} />
        </div>
      </Sequence>

    </AbsoluteFill>
  );
};
