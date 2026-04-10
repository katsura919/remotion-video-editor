import React from "react";
import { AbsoluteFill } from "remotion";
import { Background } from "./Background";
import { LogoMark } from "./LogoMark";
import { LightSweep } from "./LightSweep";
import { LOGO_INTRO_COLORS, LOGO_INTRO_TIMING } from "./constants";

// ── Public props (all optional — fully customisable) ──────────────────────

export interface LogoIntroProps {
  /** Primary wordmark text */
  logoText?: string;
  /** Small subtitle text rendered below the divider */
  subtitle?: string;
  /** Brand / glow colour (any CSS colour string) */
  glowColor?: string;
  /** Wordmark text colour */
  textColor?: string;
}

export const defaultLogoIntroProps: Required<LogoIntroProps> = {
  logoText: "abiemaxey",
  subtitle: "EST. 2024",
  glowColor: LOGO_INTRO_COLORS.glowColor,   // "#6366f1" (indigo)
  textColor: LOGO_INTRO_COLORS.logoText,    // "#ffffff"
};

// ── Composition ───────────────────────────────────────────────────────────

/**
 * LogoIntroComposition — 6-second (180 frames @ 30 fps) cinematic 3D logo reveal.
 *
 * Scene timeline:
 *  01. INTRO       (0s – 1.5s)  — black → ambient glow
 *  02. LOGO APPEAR (1.5s – 3s)  — fade + scale + blur in, light sweep fires
 *  03. 3D ROTATION (3s – 5s)    — rotateY(-30°→15°), rotateX(10°→0°)
 *  04. CAMERA FEEL (throughout) — float oscillation + scale pulse
 *  05. EXIT        (5s – 6s)    — fade out + zoom in to black
 *
 * All animations use Remotion's interpolate() with Easing functions.
 * No external 3D libraries — pure CSS 3D transforms.
 *
 * Props:
 *  logoText   — wordmark text   (default: "JP STUDIO")
 *  subtitle   — subtitle line   (default: "EST. 2024")
 *  glowColor  — brand hex/rgb   (default: indigo #6366f1)
 *  textColor  — text colour     (default: white #ffffff)
 */
export const LogoIntroComposition: React.FC<LogoIntroProps> = ({
  logoText  = defaultLogoIntroProps.logoText,
  subtitle  = defaultLogoIntroProps.subtitle,
  glowColor = defaultLogoIntroProps.glowColor,
  textColor = defaultLogoIntroProps.textColor,
}) => {
  return (
    <AbsoluteFill>
      {/* Layer 1: Dark gradient + ambient glow + vignette + grain */}
      <Background glowColor={glowColor} />

      {/* Layer 2: The logo (all 3D CSS animations live here) */}
      <LogoMark
        text={logoText}
        subtitle={subtitle}
        glowColor={glowColor}
        textColor={textColor}
      />

      {/* Layer 3: Light sweep overlay (fires once during logo appear) */}
      <LightSweep
        color={glowColor}
        startFrame={LOGO_INTRO_TIMING.lightSweep.from}
        endFrame={LOGO_INTRO_TIMING.lightSweep.to}
      />
    </AbsoluteFill>
  );
};
