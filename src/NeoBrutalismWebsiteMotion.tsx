import {
  AbsoluteFill,
  Easing,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const palette = {
  paper: "#f8f5ed",
  ink: "#111111",
  yellow: "#ffe74f",
  cyan: "#62f2ff",
  pink: "#ff74c8",
  lime: "#97ff6d",
  orange: "#ff8a48",
};

const hardShadow = "8px 8px 0 #111111";

const Badge: React.FC<{ label: string; color: string; x: number; y: number; delay: number }> = ({
  label,
  color,
  x,
  y,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const pop = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 12,
      stiffness: 140,
      mass: 0.8,
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        border: "4px solid #111111",
        boxShadow: hardShadow,
        backgroundColor: color,
        padding: "10px 18px",
        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
        fontSize: 30,
        letterSpacing: 1,
        transform: `translateY(${interpolate(1 - pop, [0, 1], [0, 120])}px) rotate(${interpolate(pop, [0, 1], [-10, 0])}deg) scale(${pop})`,
      }}
    >
      {label}
    </div>
  );
};

export const NeoBrutalismWebsiteMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames, width } = useVideoConfig();

  const pageScroll = interpolate(frame, [0, durationInFrames - 1], [0, 1020], {
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const heroPop = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 110,
    },
  });

  const buttonSlide = spring({
    frame: frame - 18,
    fps,
    config: {
      damping: 13,
      stiffness: 120,
    },
  });

  const marqueeX = interpolate(frame, [0, 6 * fps], [0, -500], {
    extrapolateRight: "extend",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: palette.paper, overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(circle at 20% 15%, rgba(255, 231, 79, 0.6), transparent 40%), radial-gradient(circle at 82% 82%, rgba(98, 242, 255, 0.55), transparent 45%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          width: width - 100,
          left: 50,
          top: 40,
          bottom: 40,
          border: "5px solid #111111",
          boxShadow: "14px 14px 0 #111111",
          overflow: "hidden",
          backgroundColor: "#fffdf6",
        }}
      >
        <div style={{ transform: `translateY(${-pageScroll}px)` }}>
          <section
            style={{
              height: 740,
              padding: "34px 44px 44px 44px",
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 34,
                fontFamily: "Arial Black, Arial, sans-serif",
              }}
            >
              <div
                style={{
                  border: "4px solid #111111",
                  backgroundColor: palette.yellow,
                  padding: "8px 16px",
                  boxShadow: hardShadow,
                  fontSize: 24,
                }}
              >
                BRUTAL.STUDIO
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {["Home", "Work", "About", "Contact"].map((item, i) => (
                  <div
                    key={item}
                    style={{
                      border: "3px solid #111111",
                      backgroundColor: i % 2 === 0 ? "#ffffff" : palette.cyan,
                      padding: "7px 14px",
                      boxShadow: "4px 4px 0 #111111",
                      fontSize: 20,
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div
              style={{
                transform: `translateY(${interpolate(1 - heroPop, [0, 1], [0, 70])}px) scale(${interpolate(heroPop, [0, 1], [0.94, 1])})`,
                opacity: interpolate(heroPop, [0, 1], [0, 1]),
              }}
            >
              <h1
                style={{
                  fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                  fontSize: 118,
                  lineHeight: 0.95,
                  margin: 0,
                  color: palette.ink,
                  letterSpacing: 1.5,
                }}
              >
                NEO BRUTALIST
                <br />
                WEB EXPERIMENT
              </h1>

              <p
                style={{
                  marginTop: 18,
                  fontFamily: "Arial Black, Arial, sans-serif",
                  fontSize: 30,
                  maxWidth: 860,
                  lineHeight: 1.25,
                }}
              >
                Hard shadows. Loud blocks. Intentional chaos with clean layout rhythm.
              </p>
            </div>

            <div
              style={{
                marginTop: 34,
                display: "flex",
                gap: 20,
                transform: `translateX(${interpolate(1 - buttonSlide, [0, 1], [-90, 0])}px)`,
                opacity: interpolate(buttonSlide, [0, 1], [0, 1]),
              }}
            >
              <button
                type="button"
                style={{
                  border: "4px solid #111111",
                  boxShadow: hardShadow,
                  backgroundColor: palette.pink,
                  fontFamily: "Arial Black, Arial, sans-serif",
                  fontSize: 30,
                  padding: "16px 26px",
                  cursor: "default",
                }}
              >
                Launch Project
              </button>
              <button
                type="button"
                style={{
                  border: "4px solid #111111",
                  boxShadow: hardShadow,
                  backgroundColor: palette.lime,
                  fontFamily: "Arial Black, Arial, sans-serif",
                  fontSize: 30,
                  padding: "16px 26px",
                  cursor: "default",
                }}
              >
                View Components
              </button>
            </div>

            <Badge label="NO BLUR" color={palette.orange} x={780} y={184} delay={6} />
            <Badge label="BOLD TYPE" color={palette.cyan} x={930} y={390} delay={12} />
            <Badge label="THICK BORDERS" color={palette.yellow} x={730} y={512} delay={20} />
          </section>

          <section
            style={{
              height: 570,
              padding: "36px 44px",
              borderTop: "5px solid #111111",
              backgroundColor: "#f1ffec",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                fontSize: 88,
                letterSpacing: 1,
              }}
            >
              DESIGN TOKENS
            </h2>

            <div style={{ display: "flex", gap: 24, marginTop: 28 }}>
              {[
                { title: "Palette", value: "High Contrast", color: palette.yellow },
                { title: "Depth", value: "8px / 8px Hard", color: palette.cyan },
                { title: "Corners", value: "Mostly Square", color: palette.pink },
              ].map((card, index) => {
                const lift = spring({
                  frame: frame - (index * 8 + 84),
                  fps,
                  config: {
                    damping: 13,
                    stiffness: 115,
                  },
                });

                return (
                  <div
                    key={card.title}
                    style={{
                      flex: 1,
                      border: "4px solid #111111",
                      backgroundColor: card.color,
                      boxShadow: hardShadow,
                      padding: 24,
                      transform: `translateY(${interpolate(1 - lift, [0, 1], [80, 0])}px) rotate(${interpolate(index, [0, 2], [-2, 2])}deg)`,
                      opacity: interpolate(lift, [0, 1], [0.1, 1]),
                    }}
                  >
                    <div
                      style={{
                        fontFamily: "Arial Black, Arial, sans-serif",
                        fontSize: 27,
                        marginBottom: 14,
                      }}
                    >
                      {card.title}
                    </div>
                    <div
                      style={{
                        fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                        fontSize: 52,
                        lineHeight: 0.96,
                      }}
                    >
                      {card.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          <section
            style={{
              height: 500,
              padding: "42px 44px",
              borderTop: "5px solid #111111",
              backgroundColor: "#fff3df",
              position: "relative",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontFamily: "Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif",
                fontSize: 92,
                lineHeight: 0.92,
              }}
            >
              READY TO
              <br />
              GO BRUTAL?
            </h2>
            <div
              style={{
                marginTop: 24,
                display: "inline-block",
                border: "4px solid #111111",
                padding: "16px 22px",
                boxShadow: hardShadow,
                backgroundColor: palette.lime,
                fontFamily: "Arial Black, Arial, sans-serif",
                fontSize: 34,
              }}
            >
              Build with character, not templates.
            </div>
          </section>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          left: -30,
          right: -30,
          bottom: 18,
          borderTop: "4px solid #111111",
          borderBottom: "4px solid #111111",
          backgroundColor: palette.yellow,
          padding: "10px 0",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        <div
          style={{
            display: "inline-block",
            transform: `translateX(${marqueeX}px)`,
            fontFamily: "Arial Black, Arial, sans-serif",
            fontSize: 28,
            letterSpacing: 2,
          }}
        >
          {"NEO BRUTALISM  *  HEAVY BORDERS  *  PLAYFUL LAYOUTS  *  BOLD TYPOGRAPHY  *  ".repeat(
            4,
          )}
        </div>
      </div>
    </AbsoluteFill>
  );
};
