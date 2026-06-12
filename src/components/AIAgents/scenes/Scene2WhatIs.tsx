import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const EyeIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
    <ellipse cx="22" cy="22" rx="18" ry="11" stroke={BRAND.primary} strokeWidth="2.5" />
    <circle cx="22" cy="22" r="6" stroke={BRAND.primary} strokeWidth="2.5" />
    <circle cx="22" cy="22" r="2.5" fill={BRAND.primary} />
  </svg>
);

const BrainIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
    <path
      d="M22 8C16 8 10 13 10 20C10 24 12 27 15 29V36H29V29C32 27 34 24 34 20C34 13 28 8 22 8Z"
      stroke={BRAND.mutedFg}
      strokeWidth="2.5"
      fill="none"
    />
    <line x1="22" y1="8" x2="22" y2="36" stroke={BRAND.mutedFg} strokeWidth="1.5" opacity="0.4" />
    <path d="M15 17 Q22 14 29 17" stroke={BRAND.mutedFg} strokeWidth="1.5" fill="none" />
    <path d="M13 23 Q18 20 22 22" stroke={BRAND.mutedFg} strokeWidth="1.5" fill="none" />
  </svg>
);

const ZapIcon: React.FC = () => (
  <svg width="40" height="40" viewBox="0 0 44 44" fill="none">
    <polygon points="26,4 12,24 20,24 18,40 32,20 24,20" fill={BRAND.accent} opacity="0.9" />
  </svg>
);

interface StepBoxProps {
  label: string;
  description: string;
  icon: React.ReactNode;
  borderColor: string;
  progress: number;
}

const StepBox: React.FC<StepBoxProps> = ({ label, description, icon, borderColor, progress }) => (
  <div style={{
    background: BRAND.card,
    border: `1.5px solid ${borderColor}`,
    borderRadius: 20,
    padding: "28px 28px",
    display: "flex",
    alignItems: "center",
    gap: 24,
    opacity: progress,
    transform: `translateY(${interpolate(progress, [0, 1], [32, 0])}px)`,
  }}>
    <div style={{ flexShrink: 0 }}>{icon}</div>
    <div>
      <div style={{
        ...H_DISPLAY,
        fontFamily: sansFontFamily,
        fontSize: 36,
        color: BRAND.fg,
        lineHeight: 1,
        marginBottom: 8,
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: serifFontFamily,
        fontStyle: "italic",
        fontSize: 28,
        fontWeight: 400,
        color: BRAND.mutedFg,
        lineHeight: 1.4,
      }}>
        {description}
      </div>
    </div>
  </div>
);

const ARROW_LEN = 48;

interface AnimArrowProps {
  color: string;
  progress: number;
}

const AnimArrow: React.FC<AnimArrowProps> = ({ color, progress }) => (
  <div style={{ display: "flex", justifyContent: "center", margin: "4px 0" }}>
    <svg width="40" height="52" viewBox="0 0 40 52">
      <line
        x1="20" y1="2" x2="20" y2="34"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={ARROW_LEN}
        strokeDashoffset={interpolate(progress, [0, 1], [ARROW_LEN, 0])}
      />
      <polygon points="20,48 13,32 27,32" fill={color} opacity={progress > 0.6 ? 1 : 0} />
    </svg>
  </div>
);

export const Scene2WhatIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const box1In = spring({ frame: frame - 18, fps, config: { damping: 200 } });
  const arrow1 = interpolate(frame, [36, 52], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const box2In = spring({ frame: frame - 52, fps, config: { damping: 200 } });
  const arrow2 = interpolate(frame, [70, 86], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const box3In = spring({ frame: frame - 86, fps, config: { damping: 200 } });
  const footerOpacity = interpolate(frame, [115, 135], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 60,
        right: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}>
        {/* Eyebrow */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          marginBottom: 28,
          opacity: titleIn,
        }}>
          02 ~ WHAT IS AN AI AGENT
        </div>

        {/* Headline */}
        <div style={{
          marginBottom: 40,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [36, 0])}px)`,
        }}>
          <span style={{
            ...H_DISPLAY,
            fontFamily: sansFontFamily,
            fontSize: 72,
            color: BRAND.fg,
          }}>
            WHAT IS AN{" "}
          </span>
          <span style={{
            ...H_ACCENT,
            fontFamily: serifFontFamily,
            fontSize: 76,
            color: BRAND.primary,
          }}>
            ai agent?
          </span>
        </div>

        {/* Flow */}
        <StepBox
          label="Perceive"
          description="Reads input ~ text, data, images, tool results"
          icon={<EyeIcon />}
          borderColor={BRAND.primary}
          progress={box1In}
        />

        <AnimArrow color={BRAND.primary} progress={arrow1} />

        <StepBox
          label="Think"
          description="LLM reasons and plans the next action"
          icon={<BrainIcon />}
          borderColor={BRAND.border}
          progress={box2In}
        />

        <AnimArrow color={BRAND.accent} progress={arrow2} />

        <StepBox
          label="Act"
          description="Calls tool, writes code, sends message"
          icon={<ZapIcon />}
          borderColor={BRAND.accent}
          progress={box3In}
        />

        {/* Footer note */}
        <div style={{
          fontFamily: monoFontFamily,
          fontSize: 26,
          color: BRAND.mutedFg,
          marginTop: 28,
          paddingTop: 24,
          borderTop: `1px solid ${BRAND.border}`,
          letterSpacing: "0.04em",
          opacity: footerOpacity,
        }}>
          This loop repeats until the task is complete.
        </div>
      </div>
    </AbsoluteFill>
  );
};
