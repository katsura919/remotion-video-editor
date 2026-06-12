import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

interface Tool {
  label: string;
  desc: string;
  borderColor: string;
  icon: React.ReactNode;
}

const TOOLS: Tool[] = [
  {
    label: "Search",
    desc: "Real-time web info",
    borderColor: BRAND.primary,
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <circle cx="17" cy="17" r="11" stroke={BRAND.primary} strokeWidth="2.5" />
        <line x1="26" y1="26" x2="36" y2="36" stroke={BRAND.primary} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Code Exec",
    desc: "Run & debug scripts",
    borderColor: BRAND.accent,
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="8" width="32" height="24" rx="4" stroke={BRAND.accent} strokeWidth="2.5" />
        <path d="M13 18L9 22L13 26" stroke={BRAND.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 18L31 22L27 26" stroke={BRAND.accent} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="15" x2="19" y2="29" stroke={BRAND.accent} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "APIs",
    desc: "External services",
    borderColor: BRAND.primary,
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <rect x="4" y="14" width="13" height="12" rx="3" stroke={BRAND.primary} strokeWidth="2.5" />
        <rect x="23" y="14" width="13" height="12" rx="3" stroke={BRAND.primary} strokeWidth="2.5" />
        <line x1="17" y1="20" x2="23" y2="20" stroke={BRAND.primary} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="10.5" cy="20" r="2.5" fill={BRAND.primary} />
        <circle cx="29.5" cy="20" r="2.5" fill={BRAND.primary} />
      </svg>
    ),
  },
  {
    label: "Short Memory",
    desc: "Current context",
    borderColor: BRAND.border,
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="6" width="24" height="28" rx="3" stroke={BRAND.mutedFg} strokeWidth="2.5" />
        <line x1="14" y1="14" x2="26" y2="14" stroke={BRAND.mutedFg} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="20" x2="26" y2="20" stroke={BRAND.mutedFg} strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="26" x2="21" y2="26" stroke={BRAND.mutedFg} strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: "Long Memory",
    desc: "Persistent learning",
    borderColor: BRAND.border,
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <ellipse cx="20" cy="12" rx="13" ry="5" stroke={BRAND.mutedFg} strokeWidth="2.5" />
        <path d="M7 12L7 28Q7 33 20 33Q33 33 33 28L33 12" stroke={BRAND.mutedFg} strokeWidth="2.5" fill="none" />
        <ellipse cx="20" cy="20" rx="13" ry="5" stroke={BRAND.mutedFg} strokeWidth="1.5" opacity="0.4" />
      </svg>
    ),
  },
  {
    label: "Planning",
    desc: "Multi-step goals",
    borderColor: BRAND.accent,
    icon: (
      <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
        <rect x="6" y="8" width="9" height="9" rx="2" fill={BRAND.accent} />
        <rect x="6" y="23" width="9" height="9" rx="2" fill={BRAND.accent} opacity="0.5" />
        <line x1="15" y1="12.5" x2="34" y2="12.5" stroke={BRAND.accent} strokeWidth="2.5" strokeLinecap="round" />
        <line x1="15" y1="27.5" x2="28" y2="27.5" stroke={BRAND.accent} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="10.5" y1="17" x2="10.5" y2="23" stroke={BRAND.accent} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
      </svg>
    ),
  },
];

const CheckIcon: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke={BRAND.bg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Scene4Tools: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });

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
      }}>
        {/* Eyebrow */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          marginBottom: 24,
          opacity: titleIn,
        }}>
          04 ~ TOOLS & MEMORY
        </div>

        {/* Headline */}
        <div style={{
          marginBottom: 36,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [36, 0])}px)`,
        }}>
          <span style={{
            ...H_DISPLAY,
            fontFamily: sansFontFamily,
            fontSize: 72,
            color: BRAND.fg,
          }}>
            TOOLS +{" "}
          </span>
          <span style={{
            ...H_ACCENT,
            fontFamily: serifFontFamily,
            fontSize: 76,
            color: BRAND.primary,
          }}>
            memory
          </span>
          <br />
          <span style={{
            ...H_DISPLAY,
            fontFamily: sansFontFamily,
            fontSize: 72,
            color: BRAND.fg,
          }}>
            = POWER
          </span>
        </div>

        {/* 2-col grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
          flex: 1,
        }}>
          {TOOLS.map(({ label, desc, borderColor, icon }, i) => {
            const delay = i * 11 + 16;
            const cardIn = spring({ frame: frame - delay, fps, config: { damping: 200 } });
            const checkIn = spring({ frame: frame - delay - 16, fps, config: { damping: 200 } });

            return (
              <div
                key={i}
                style={{
                  background: BRAND.card,
                  border: `1.5px solid ${borderColor}`,
                  borderRadius: 18,
                  padding: "22px 20px",
                  position: "relative",
                  opacity: cardIn,
                  transform: `translateY(${interpolate(cardIn, [0, 1], [26, 0])}px)`,
                }}
              >
                {/* Check badge */}
                <div style={{
                  position: "absolute",
                  top: 12,
                  right: 12,
                  width: 24,
                  height: 24,
                  borderRadius: "50%",
                  background: BRAND.accent,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: checkIn,
                  transform: `scale(${checkIn})`,
                }}>
                  <CheckIcon />
                </div>

                <div style={{ marginBottom: 10 }}>{icon}</div>
                <div style={{
                  ...H_DISPLAY,
                  fontFamily: sansFontFamily,
                  fontSize: 26,
                  color: BRAND.fg,
                  lineHeight: 1.1,
                  marginBottom: 6,
                }}>
                  {label}
                </div>
                <div style={{
                  fontFamily: monoFontFamily,
                  fontSize: 22,
                  color: BRAND.mutedFg,
                  letterSpacing: "0.02em",
                }}>
                  {desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};
