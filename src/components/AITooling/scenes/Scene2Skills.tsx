import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { sansFontFamily, serifFontFamily, monoFontFamily } from "../fonts";
import { BRAND, H_DISPLAY, H_ACCENT, LABEL_MONO } from "../brand";

const TypeLine: React.FC<{ text: string; progress: number; style?: React.CSSProperties }> = ({ text, progress, style }) => {
  const chars = Math.floor(progress * text.length);
  return <span style={style}>{text.slice(0, chars)}</span>;
};

export const Scene2Skills: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleIn = spring({ frame, fps, config: { damping: 200 } });
  const cardIn = spring({ frame: frame - 18, fps, config: { damping: 200 } });

  // Code typing
  const typeProgress = interpolate(frame, [30, 110], [0, 1], {
    extrapolateRight: "clamp",
    extrapolateLeft: "clamp",
  });

  const subIn = interpolate(frame, [120, 142], [0, 1], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });
  const subY = interpolate(frame, [120, 142], [22, 0], { extrapolateRight: "clamp", extrapolateLeft: "clamp" });

  const lineHosts = [
    { t: "---", c: BRAND.mutedFg },
    { t: "name: ship-pr", c: BRAND.fg },
    { t: "description: open pr, run tests,", c: BRAND.fg },
    { t: "             post review", c: BRAND.fg },
    { t: "---", c: BRAND.mutedFg },
    { t: "", c: BRAND.fg },
    { t: "# Skill ~ ship the pull request", c: BRAND.primary },
    { t: "1. git checkout -b feat/<topic>", c: BRAND.fg },
    { t: "2. run pytest && bun typecheck", c: BRAND.fg },
    { t: "3. gh pr create --fill", c: BRAND.fg },
  ];

  return (
    <AbsoluteFill style={{ background: BRAND.bg }}>
      <div style={{
        position: "absolute",
        top: 150,
        bottom: 170,
        left: 64,
        right: 64,
        display: "flex",
        flexDirection: "column",
      }}>
        {/* Eyebrow */}
        <div style={{
          ...LABEL_MONO,
          fontFamily: monoFontFamily,
          fontSize: 24,
          color: BRAND.mutedFg,
          marginBottom: 28,
          opacity: titleIn,
        }}>
          01 ~ CLAUDE CODE ~ AGENT SKILLS
        </div>

        {/* Headline */}
        <div style={{
          marginBottom: 36,
          opacity: titleIn,
          transform: `translateY(${interpolate(titleIn, [0, 1], [32, 0])}px)`,
        }}>
          <div style={{ ...H_DISPLAY, fontFamily: sansFontFamily, fontSize: 92, color: BRAND.fg }}>
            FOLDERS THAT
          </div>
          <div style={{ ...H_ACCENT, fontFamily: serifFontFamily, fontSize: 100, color: BRAND.primary }}>
            think.
          </div>
        </div>

        {/* Code card */}
        <div style={{
          background: BRAND.card,
          border: `1.5px solid ${BRAND.border}`,
          borderRadius: 26,
          padding: "32px 36px",
          opacity: cardIn,
          transform: `translateY(${interpolate(cardIn, [0, 1], [32, 0])}px)`,
        }}>
          {/* Card head */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 20,
            fontFamily: monoFontFamily,
            ...LABEL_MONO,
            fontSize: 18,
            color: BRAND.mutedFg,
          }}>
            <span style={{
              display: "inline-block",
              width: 10, height: 10, borderRadius: 5,
              background: BRAND.primary,
            }} />
            <span>.claude / skills / ship-pr / SKILL.md</span>
          </div>

          {/* Code lines */}
          <div style={{
            fontFamily: monoFontFamily,
            fontSize: 24,
            lineHeight: 1.55,
            color: BRAND.fg,
          }}>
            {lineHosts.map((ln, i) => {
              const cum = lineHosts.slice(0, i).reduce((s, l) => s + Math.max(l.t.length, 1) + 1, 0);
              const total = lineHosts.reduce((s, l) => s + Math.max(l.t.length, 1) + 1, 0);
              const lineLen = Math.max(ln.t.length, 1);
              const start = cum / total;
              const end = Math.min((cum + lineLen) / total, 1);
              const local = start >= end
                ? (typeProgress >= start ? 1 : 0)
                : interpolate(typeProgress, [start, end], [0, 1], {
                    extrapolateRight: "clamp",
                    extrapolateLeft: "clamp",
                  });
              return (
                <div key={i} style={{ color: ln.c, minHeight: 32 }}>
                  <TypeLine text={ln.t} progress={local} />
                  {local > 0 && local < 1 && (
                    <span style={{
                      display: "inline-block",
                      width: 12,
                      height: 24,
                      background: BRAND.primary,
                      verticalAlign: "middle",
                      marginLeft: 2,
                      opacity: Math.floor(frame / 6) % 2 === 0 ? 1 : 0.2,
                    }} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Punchline */}
        <div style={{
          fontFamily: serifFontFamily,
          fontStyle: "italic",
          fontSize: 32,
          color: BRAND.mutedFg,
          lineHeight: 1.5,
          marginTop: 32,
          opacity: subIn,
          transform: `translateY(${subY}px)`,
        }}>
          Drop a folder. The agent learns
          <br />
          a new skill ~ no fine-tune required.
        </div>
      </div>

      {/* Counter */}
      <div style={{
        position: "absolute",
        bottom: 80,
        left: 64,
        right: 64,
        display: "flex",
        justifyContent: "space-between",
        fontFamily: monoFontFamily,
        ...LABEL_MONO,
        fontSize: 22,
        color: BRAND.mutedFg,
      }}>
        <span>abiemaxey.com</span>
        <span>02 / 05</span>
      </div>
    </AbsoluteFill>
  );
};
