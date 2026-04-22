import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../../Codex/constants";

const STEPS = [
  { title: "Choose your destination", detail: "Research visa requirements by country" },
  { title: "Gather income proof", detail: "Bank statements, contracts, invoices — 3 months" },
  { title: "Get health insurance", detail: "International coverage required by most countries" },
  { title: "Criminal background check", detail: "Apostille-certified from your home country" },
  { title: "Submit your application", detail: "Online portal or in-person at the consulate" },
];

const STEP_DURATION = 55;
const STEP_LINGER = 15;

const Step: React.FC<{
  index: number;
  title: string;
  detail: string;
  startFrame: number;
  isActive: boolean;
  isPast: boolean;
}> = ({ index, title, detail, startFrame, isActive, isPast }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrySpring = spring({
    frame: frame - startFrame,
    fps,
    config: CODEX_TIMING.fastSpring,
    from: 0,
    to: 1,
  });

  const numOpacity = isPast || isActive ? 1 : 0;
  const textOpacity = isActive ? 1 : isPast ? 0.35 : 0;
  const accentColor = isActive ? CODEX_COLORS.primary : isPast ? CODEX_COLORS.secondary : "transparent";

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 48,
        opacity: isPast || isActive ? 1 : entrySpring,
        transform: isPast || isActive
          ? "none"
          : `translateX(${interpolate(entrySpring, [0, 1], [-30, 0])}px)`,
      }}
    >
      {/* Step number */}
      <div
        style={{
          fontFamily: CODEX_FONTS.heading,
          fontSize: 80,
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1,
          color: isActive ? CODEX_COLORS.primary : CODEX_COLORS.foreground,
          opacity: isActive ? 1 : 0.2,
          minWidth: 100,
          transition: "color 0.3s",
          flexShrink: 0,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Vertical bar */}
      <div
        style={{
          width: 3,
          alignSelf: "stretch",
          backgroundColor: accentColor,
          borderRadius: 2,
          marginTop: 8,
          flexShrink: 0,
        }}
      />

      {/* Text */}
      <div style={{ paddingTop: 6, opacity: textOpacity }}>
        <div
          style={{
            fontFamily: CODEX_FONTS.body,
            fontSize: 46,
            fontWeight: 600,
            color: CODEX_COLORS.foreground,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontFamily: CODEX_FONTS.body,
            fontSize: 30,
            fontWeight: 300,
            color: CODEX_COLORS.foreground,
            opacity: 0.6,
            lineHeight: 1.4,
          }}
        >
          {detail}
        </div>
      </div>
    </div>
  );
};

export const NumberedStepsSequence: React.FC<{
  durationInFrames: number;
}> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();

  const activeIndex = Math.min(
    Math.floor(frame / STEP_DURATION),
    STEPS.length - 1
  );

  const labelOpacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateRight: "clamp" }
  );

  const progressHeight = interpolate(
    frame,
    [0, durationInFrames - 30],
    [0, 100],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* Label */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          fontFamily: CODEX_FONTS.mono,
          fontSize: 24,
          fontWeight: 500,
          color: CODEX_COLORS.primary,
          letterSpacing: "4px",
          textTransform: "uppercase",
          opacity: labelOpacity,
        }}
      >
        [ 03. HOW TO APPLY ]
      </div>

      {/* Progress track — left edge */}
      <div
        style={{
          position: "absolute",
          top: 140,
          left: 40,
          width: 3,
          height: "75%",
          backgroundColor: CODEX_COLORS.cardBorder,
          borderRadius: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            height: `${progressHeight}%`,
            backgroundColor: CODEX_COLORS.primary,
            borderRadius: 2,
          }}
        />
      </div>

      {/* Steps */}
      <div
        style={{
          position: "absolute",
          top: 160,
          left: 80,
          right: 60,
          display: "flex",
          flexDirection: "column",
          gap: 52,
        }}
      >
        {STEPS.map((step, i) => {
          const startFrame = i * STEP_DURATION;
          return (
            <Step
              key={i}
              index={i}
              title={step.title}
              detail={step.detail}
              startFrame={startFrame}
              isActive={i === activeIndex}
              isPast={i < activeIndex}
            />
          );
        })}
      </div>
    </div>
  );
};
