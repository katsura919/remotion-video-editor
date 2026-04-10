import React from "react";
import { useCurrentFrame, interpolate, Easing } from "remotion";

interface LogoMarkProps {
  text: string;
  subtitle: string;
  glowColor: string;
  textColor: string;
}

/** Inner text content — reused for both the main logo and its reflection. */
const LogoContent: React.FC<{
  text: string;
  subtitle: string;
  glowColor: string;
  textColor: string;
  withGlow?: boolean;
}> = ({ text, subtitle, glowColor, textColor, withGlow = true }) => (
  <>
    {/* ── Main wordmark ── */}
    <div
      style={{
        fontFamily: '"Inter", "Arial Black", Arial, sans-serif',
        fontSize: 168,
        fontWeight: 900,
        color: textColor,
        letterSpacing: -6,
        lineHeight: 1,
        textAlign: "center",
        textShadow: withGlow
          ? `
            0 0 28px ${glowColor}dd,
            0 0 60px ${glowColor}88,
            0 0 110px ${glowColor}44,
            0 0 200px ${glowColor}22
          `
          : "none",
      }}
    >
      {text}
    </div>

    {/* ── Gradient divider line ── */}
    <div
      style={{
        margin: "18px auto",
        height: 2,
        width: "88%",
        background: withGlow
          ? `linear-gradient(90deg, transparent 0%, ${glowColor} 30%, ${glowColor}cc 50%, ${glowColor} 70%, transparent 100%)`
          : `linear-gradient(90deg, transparent 0%, ${glowColor}44 50%, transparent 100%)`,
        boxShadow: withGlow ? `0 0 14px ${glowColor}99` : "none",
      }}
    />

    {/* ── Subtitle tagline ── */}
    <div
      style={{
        fontFamily: '"Geist Mono", "Courier New", monospace',
        fontSize: 26,
        fontWeight: 300,
        color: withGlow ? `${glowColor}cc` : `${glowColor}55`,
        letterSpacing: 14,
        textTransform: "uppercase",
        textAlign: "center",
      }}
    >
      {subtitle}
    </div>
  </>
);

/**
 * LogoMark — the hero element of the LogoIntro composition.
 *
 * Timeline:
 *  frames  0–45  : hidden (intro phase in parent)
 *  frames 45–90  : fade in  |  scale 0.8→1  |  blur 12px→0
 *  frames 90–150 : 3D rotation  rotateY(-30°→15°)  rotateX(10°→0°)
 *  throughout    : subtle float (sin wave)  +  scale pulse
 *  frames 150–180: fade out  |  scale 1→1.1
 *
 * Reflection (bonus): a mirrored, faded copy rendered below the logo.
 */
export const LogoMark: React.FC<LogoMarkProps> = ({
  text,
  subtitle,
  glowColor,
  textColor,
}) => {
  const frame = useCurrentFrame();

  // ── Logo Appear (45–90) ──────────────────────────────────────────────────
  const appear = interpolate(frame, [45, 90], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const blurPx = interpolate(appear, [0, 1], [14, 0]);
  const appearScale = interpolate(appear, [0, 1], [0.8, 1]);

  // ── 3D Rotation (90–150) ─────────────────────────────────────────────────
  const rotateY = interpolate(frame, [90, 150], [-30, 15], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const rotateX = interpolate(frame, [90, 150], [10, 0], {
    easing: Easing.inOut(Easing.sin),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // ── Float oscillation (throughout) ──────────────────────────────────────
  const floatY = Math.sin(frame * 0.052) * 9;

  // ── Subtle scale pulse (throughout) ─────────────────────────────────────
  const pulse = 1 + Math.sin(frame * 0.085) * 0.014;
  const liveScale = appearScale * pulse;

  // ── Exit (150–180) ───────────────────────────────────────────────────────
  const exitOpacity = interpolate(frame, [150, 178], [1, 0], {
    easing: Easing.in(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [150, 180], [1, 1.11], {
    easing: Easing.in(Easing.quad),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalOpacity = appear * exitOpacity;
  const finalScale = liveScale * exitScale;

  // ── Shared transform string factory ─────────────────────────────────────
  const buildTransform = (extraY = 0, extraScaleY = 1) =>
    `perspective(1200px) rotateY(${rotateY}deg) rotateX(${rotateX}deg) translateY(${floatY + extraY}px) scale(${finalScale}) scaleY(${extraScaleY})`;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
      }}
    >
      {/* ══ Main Logo ══ */}
      <div
        style={{
          opacity: finalOpacity,
          filter: `blur(${blurPx}px)`,
          transform: buildTransform(),
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <LogoContent
          text={text}
          subtitle={subtitle}
          glowColor={glowColor}
          textColor={textColor}
          withGlow
        />
      </div>

      {/* ══ Mirror Reflection ══ */}
      <div
        style={{
          opacity: finalOpacity * 0.13,
          filter: `blur(${blurPx + 5}px)`,
          transform: buildTransform(12, -1), // scaleY(-1) flips vertically
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 65%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, transparent 65%)",
          marginTop: -8, // pull flush below the main logo
          willChange: "transform, opacity",
        }}
      >
        <LogoContent
          text={text}
          subtitle={subtitle}
          glowColor={glowColor}
          textColor={textColor}
          withGlow={false}
        />
      </div>
    </div>
  );
};
