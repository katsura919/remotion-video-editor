import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const CX = 480;
const CY = 370;
const R = 205;
const CIRC = 2 * Math.PI * R;

const NODES = [
  { angleDeg: -90, label: "PERCEIVE", color: BRAND.primary, textDy: -62 },
  { angleDeg: 30, label: "THINK", color: BRAND.mutedFg, textDy: 62 },
  { angleDeg: 150, label: "ACT", color: BRAND.accent, textDy: 62 },
];

interface NodeProps {
  cx: number;
  cy: number;
  color: string;
  label: string;
  textDy: number;
  progress: number;
}

const CircleNode: React.FC<NodeProps> = ({ cx, cy, color, label, textDy, progress }) => (
  <g opacity={progress}>
    <circle cx={cx} cy={cy} r={50} fill={color} opacity={0.1} />
    <circle cx={cx} cy={cy} r={34} fill={color} opacity={0.22} />
    <circle cx={cx} cy={cy} r={20} fill={color} />
    <text
      x={cx}
      y={cy + textDy}
      textAnchor="middle"
      fill={BRAND.fg}
      fontSize={26}
      fontWeight={800}
      fontFamily={`${sansFontFamily}, sans-serif`}
      letterSpacing="-1"
    >
      {label}
    </text>
  </g>
);

export const Scene3Loop: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });

  const circleProgress = interpolate(frame, [16, 92], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const node1In = spring({ frame: frame - 26, fps, config: { damping: 200 } });
  const node2In = spring({ frame: frame - 56, fps, config: { damping: 200 } });
  const node3In = spring({ frame: frame - 86, fps, config: { damping: 200 } });

  const counterOpacity = interpolate(frame, [98, 116], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });
  const loopCount = Math.round(
    interpolate(frame, [103, 172], [1, 247], {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    })
  );

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
        alignItems: "center",
      }}>
        {/* Eyebrow */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          marginBottom: 24,
          opacity: titleIn,
          alignSelf: "flex-start",
        }}>
          03 ~ THE CORE LOOP
        </div>

        {/* Headline */}
        <div style={{
          alignSelf: "flex-start",
          marginBottom: 32,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [36, 0])}px)`,
        }}>
          <span style={{
            ...H_DISPLAY,
            fontFamily: sansFontFamily,
            fontSize: 72,
            color: BRAND.fg,
          }}>
            THE{" "}
          </span>
          <span style={{
            ...H_ACCENT,
            fontFamily: serifFontFamily,
            fontSize: 76,
            color: BRAND.primary,
          }}>
            loop
          </span>
          <br />
          <span style={{
            ...H_DISPLAY,
            fontFamily: sansFontFamily,
            fontSize: 72,
            color: BRAND.fg,
          }}>
            NEVER STOPS
          </span>
        </div>

        {/* Circle diagram */}
        <svg
          width="960"
          height="600"
          viewBox="0 0 960 600"
          style={{ overflow: "visible", flexShrink: 0 }}
        >
          {/* Ghost circle */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke={BRAND.border}
            strokeWidth="1.5"
          />

          {/* Drawing circle */}
          <circle
            cx={CX} cy={CY} r={R}
            fill="none"
            stroke={BRAND.primary}
            strokeWidth="2.5"
            strokeDasharray={CIRC}
            strokeDashoffset={CIRC * (1 - circleProgress)}
            strokeLinecap="round"
            transform={`rotate(-90, ${CX}, ${CY})`}
          />

          {/* Nodes */}
          {NODES.map(({ angleDeg, label, color, textDy }, i) => {
            const rad = (angleDeg * Math.PI) / 180;
            const nx = CX + R * Math.cos(rad);
            const ny = CY + R * Math.sin(rad);
            const nodeIns = [node1In, node2In, node3In];
            return (
              <CircleNode
                key={i}
                cx={nx}
                cy={ny}
                color={color}
                label={label}
                textDy={textDy}
                progress={nodeIns[i]}
              />
            );
          })}

          {/* Center */}
          <text
            x={CX} y={CY - 12}
            textAnchor="middle"
            fill={BRAND.mutedFg}
            fontSize={20}
            fontWeight={600}
            fontFamily={`${monoFontFamily}, monospace`}
            letterSpacing="3"
          >
            AGENT
          </text>
          <text
            x={CX} y={CY + 14}
            textAnchor="middle"
            fill={BRAND.border}
            fontSize={14}
            fontFamily={`${monoFontFamily}, monospace`}
          >
            CORE LOOP
          </text>
        </svg>

        {/* Loop counter */}
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          opacity: counterOpacity,
          marginTop: 8,
        }}>
          <div style={{
            ...LABEL_MONO,
            fontFamily: monoFontFamily,
            fontSize: 24,
            marginBottom: 6,
          }}>
            LOOP #
          </div>
          <div style={{
            fontFamily: sansFontFamily,
            fontSize: 110,
            fontWeight: 800,
            color: BRAND.primary,
            lineHeight: 1,
            fontVariantNumeric: "tabular-nums",
            letterSpacing: "-0.04em",
          }}>
            {loopCount}
          </div>
          <div style={{
            fontFamily: serifFontFamily,
            fontStyle: "italic",
            fontSize: 30,
            color: BRAND.mutedFg,
            marginTop: 8,
          }}>
            and counting...
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
