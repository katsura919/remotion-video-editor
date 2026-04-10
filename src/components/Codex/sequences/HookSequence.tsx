import { useCurrentFrame, useVideoConfig, interpolate, Img, staticFile, spring } from "remotion";
import { SplitTextReveal } from "../core/Typography";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../constants";

export const HookSequence: React.FC<{
  text: string;
  label: string;
  durationInFrames: number;
}> = ({ text, label, durationInFrames }) => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();
  const labelOpacity = interpolate(frame, [0, 10, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const icons = ["{ }", "< >", "⌘", "λ", "[]", "=>"];

  const logoSpring = spring({
    frame: frame - 10,
    fps,
    config: CODEX_TIMING.delayedSpring,
  });

  return (
    <>
      {/* Background Parallax Icons */}
      {icons.map((icon, i) => {
        const x = interpolate(i, [0, icons.length - 1], [100, width - 100]);
        const y = interpolate((frame + i * 50) % 800, [0, 800], [height + 100, -100]);
        const rotate = (frame + i * 45) % 360;
        const opacity = interpolate(Math.abs(y - height / 2), [0, 400], [0.15, 0]);

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: `rotate(${rotate}deg)`,
              fontFamily: CODEX_FONTS.mono,
              fontSize: 60 + (i % 3) * 20,
              color: CODEX_COLORS.primary,
              opacity,
              filter: "blur(4px)",
              pointerEvents: "none",
            }}
          >
            {icon}
          </div>
        );
      })}

      {/* Label Indicator */}
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

      {/* Main Hook Text */}
      <div style={{ position: "absolute", top: 400, left: 80, right: 80 }}>
        <SplitTextReveal text={text} size={140} />
      </div>

      {/* Gemma Logo */}
      <div style={{ 
        position: "absolute", 
        top: 1000, 
        left: 0, 
        right: 0, 
        display: "flex", 
        justifyContent: "center",
        opacity: logoSpring,
        transform: `scale(${interpolate(logoSpring, [0, 1], [0.8, 1])}) translateY(${interpolate(logoSpring, [0, 1], [20, 0])}px)`
      }}>
        <div>
          <Img 
            src={staticFile("gemma-logo.png")} 
            style={{ 
              width: 550, 
              height: 550, 
              // Removed background and shadow as requested for transparent PNG
              filter: "drop-shadow(0 40px 60px rgba(227, 169, 156, 0.4))"
            }} 
          />
        </div>
      </div>
    </>
  );
};
