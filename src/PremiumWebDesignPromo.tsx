import { AbsoluteFill, Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

const palette = {
  ivory: "#f7f4ef",
  paper: "#ffffff",
  ink: "#1f2937",
  slate: "#4b5563",
  sapphire: "#2643d7",
  aqua: "#89b6ff",
  border: "#e5e7eb",
};

const mono = {
  fontFamily: "Menlo, Consolas, monospace",
  textTransform: "uppercase" as const,
  letterSpacing: 1.3,
};

const heading = {
  fontFamily: "Avenir Next, Avenir, Inter, sans-serif",
  textTransform: "uppercase" as const,
  fontWeight: 800,
  letterSpacing: -1.2,
  lineHeight: 0.92,
};

const serif = {
  fontFamily: "Georgia, Times New Roman, serif",
  fontStyle: "italic" as const,
};

const fadeWindow = (frame: number, start: number, end: number) => {
  const fadeIn = interpolate(frame, [start, start + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(frame, [end - 14, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(fadeIn, fadeOut);
};

const GlassCard: React.FC<{
  children: React.ReactNode;
  top: number;
  left: number;
  width: number;
  height: number;
  opacity: number;
}> = ({ children, top, left, width, height, opacity }) => (
  <div
    style={{
      position: "absolute",
      top,
      left,
      width,
      height,
      borderRadius: 20,
      border: `1px solid ${palette.border}`,
      backgroundColor: "rgba(255,255,255,0.78)",
      boxShadow: "0 16px 44px rgba(31,41,55,0.12)",
      opacity,
    }}
  >
    {children}
  </div>
);

export const PremiumWebDesignPromo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const heroOpacity = fadeWindow(frame, 0, 150);
  const processOpacity = fadeWindow(frame, 130, 290);
  const portfolioOpacity = fadeWindow(frame, 270, 430);
  const systemsOpacity = fadeWindow(frame, 410, 560);
  const closeOpacity = fadeWindow(frame, 540, 600);

  const heroSpring = spring({
    frame,
    fps,
    config: {
      damping: 14,
      stiffness: 115,
      mass: 0.9,
    },
  });

  const bgOrbX = interpolate(frame, [0, 600], [180, 1090], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.quad),
  });
  const bgOrbY = interpolate(frame, [0, 600], [100, 530], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.inOut(Easing.cubic),
  });

  const progress = interpolate(frame, [0, 600], [0.06, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(145deg, #f7f4ef 0%, #f2f7ff 38%, #eef3ff 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: bgOrbY,
          left: bgOrbX,
          width: 320,
          height: 320,
          borderRadius: 9999,
          background:
            "radial-gradient(circle, rgba(137,182,255,0.42) 0%, rgba(137,182,255,0.04) 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 40,
          left: 40,
          right: 40,
          height: 8,
          borderRadius: 9999,
          backgroundColor: "rgba(31,41,55,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            borderRadius: 9999,
            background:
              "linear-gradient(90deg, rgba(38,67,215,0.8), rgba(137,182,255,0.95))",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 58,
          left: 58,
          right: 58,
          bottom: 54,
          borderRadius: 28,
          border: `1px solid ${palette.border}`,
          backgroundColor: "rgba(255,255,255,0.6)",
          boxShadow: "0 28px 70px rgba(31,41,55,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: 64,
            borderBottom: `1px solid ${palette.border}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            backgroundColor: "rgba(255,255,255,0.82)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Img src={staticFile("abiemaxey/logo.png")} style={{ height: 26, width: "auto" }} />
            <div style={{ width: 1, height: 22, backgroundColor: palette.border }} />
            <p style={{ ...mono, margin: 0, fontSize: 10, color: palette.slate }}>
              Web design · Product UI · Client systems
            </p>
          </div>
          <div
            style={{
              ...mono,
              fontSize: 10,
              color: "#ffffff",
              backgroundColor: palette.ink,
              borderRadius: 9999,
              padding: "10px 14px",
            }}
          >
            Book project call
          </div>
        </div>

        <AbsoluteFill style={{ top: 64 }}>
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: heroOpacity,
            }}
          >
            <div style={{ position: "absolute", left: 52, top: 68, width: 700 }}>
              <p style={{ ...mono, margin: 0, fontSize: 11, color: "#4f46e5" }}>Premium web design partner</p>
              <h1
                style={{
                  ...heading,
                  fontSize: 92,
                  color: palette.ink,
                  margin: "12px 0 0",
                  transform: `translateY(${interpolate(1 - heroSpring, [0, 1], [0, 40])}px)`,
                  opacity: interpolate(heroSpring, [0, 1], [0.1, 1]),
                }}
              >
                WE DESIGN
                <br />
                DIGITAL EXPERIENCES
                <br />
                THAT SELL.
              </h1>
              <p
                style={{
                  ...serif,
                  margin: "16px 0 0",
                  fontSize: 30,
                  color: palette.slate,
                }}
              >
                Landing pages, conversion systems, and polished product UI.
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                right: 50,
                top: 54,
                width: 420,
                height: 420,
                borderRadius: 24,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                boxShadow: "0 18px 44px rgba(31,41,55,0.14)",
              }}
            >
              <Img
                src={staticFile("abiemaxey/assets/covers/proposal-system-preview.png")}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0) 35%, rgba(31,41,55,0.28) 100%)",
                }}
              />
            </div>
          </div>

          <div style={{ position: "absolute", inset: 0, opacity: processOpacity }}>
            <div style={{ position: "absolute", left: 52, top: 50 }}>
              <p style={{ ...serif, margin: 0, fontSize: 28, color: palette.slate }}>How we work</p>
              <h2 style={{ ...heading, margin: "6px 0 0", fontSize: 72, color: palette.ink }}>
                Strategy to ship
              </h2>
            </div>

            {[
              { step: "01", title: "Positioning", text: "Audience, offer, and message clarity." },
              { step: "02", title: "Interface", text: "High-conversion layout and premium visual language." },
              { step: "03", title: "Build", text: "Fast implementation, clean components, QA." },
            ].map((item, index) => {
              const cardIn = spring({
                frame: frame - (145 + index * 14),
                fps,
                config: { damping: 12, stiffness: 135, mass: 0.8 },
              });
              return (
                <GlassCard
                  key={item.step}
                  top={180}
                  left={52 + index * 392}
                  width={368}
                  height={250}
                  opacity={interpolate(cardIn, [0, 1], [0.2, 1]) * processOpacity}
                >
                  <div style={{ padding: 24 }}>
                    <p style={{ ...mono, margin: 0, fontSize: 11, color: "#4f46e5" }}>
                      Step {item.step}
                    </p>
                    <p style={{ ...heading, margin: "12px 0 0", fontSize: 44, color: palette.ink }}>
                      {item.title}
                    </p>
                    <p style={{ ...serif, margin: "12px 0 0", fontSize: 24, color: palette.slate }}>
                      {item.text}
                    </p>
                  </div>
                </GlassCard>
              );
            })}
          </div>

          <div style={{ position: "absolute", inset: 0, opacity: portfolioOpacity }}>
            <div style={{ position: "absolute", left: 52, top: 50 }}>
              <p style={{ ...serif, margin: 0, fontSize: 28, color: palette.slate }}>Selected work snapshots</p>
              <h2 style={{ ...heading, margin: "6px 0 0", fontSize: 72, color: palette.ink }}>
                Modern, premium, fast
              </h2>
            </div>

            <div
              style={{
                position: "absolute",
                left: 52,
                top: 178,
                width: 720,
                height: 270,
                borderRadius: 20,
                overflow: "hidden",
                border: `1px solid ${palette.border}`,
                boxShadow: "0 16px 42px rgba(31,41,55,0.13)",
              }}
            >
              <Img src={staticFile("abiemaxey/assets/covers/desk-setup-alicante.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>

            <GlassCard top={178} left={792} width={360} height={128} opacity={portfolioOpacity}>
              <div style={{ padding: 20 }}>
                <p style={{ ...mono, margin: 0, fontSize: 10, color: "#4f46e5" }}>Project outcomes</p>
                <p style={{ ...heading, margin: "8px 0 0", fontSize: 36, color: palette.ink }}>+41% CTR</p>
                <p style={{ ...serif, margin: "2px 0 0", fontSize: 20, color: palette.slate }}>
                  Homepage redesign, first 30 days
                </p>
              </div>
            </GlassCard>

            <GlassCard top={320} left={792} width={360} height={128} opacity={portfolioOpacity}>
              <div style={{ padding: 20 }}>
                <p style={{ ...mono, margin: 0, fontSize: 10, color: "#4f46e5" }}>Delivery standard</p>
                <p style={{ ...heading, margin: "8px 0 0", fontSize: 36, color: palette.ink }}>100% responsive</p>
                <p style={{ ...serif, margin: "2px 0 0", fontSize: 20, color: palette.slate }}>
                  Desktop, tablet, and mobile-ready
                </p>
              </div>
            </GlassCard>
          </div>

          <div style={{ position: "absolute", inset: 0, opacity: systemsOpacity }}>
            <div style={{ position: "absolute", left: 52, top: 50, width: 820 }}>
              <p style={{ ...serif, margin: 0, fontSize: 28, color: palette.slate }}>Beyond pretty pages</p>
              <h2 style={{ ...heading, margin: "6px 0 0", fontSize: 72, color: palette.ink }}>
                We build systems
              </h2>
              <p style={{ ...serif, margin: "12px 0 0", fontSize: 28, color: palette.slate }}>
                Lead capture, content blocks, pricing architecture, and conversion workflows.
              </p>
            </div>

            <div
              style={{
                position: "absolute",
                left: 52,
                right: 52,
                top: 228,
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                gap: 16,
              }}
            >
              {[
                {
                  title: "Landing design",
                  img: staticFile("abiemaxey/assets/covers/ig-carousel-editor-ipad.png"),
                },
                {
                  title: "Content system",
                  img: staticFile("abiemaxey/assets/ig-carousel-ss.png"),
                },
                {
                  title: "Conversion path",
                  img: staticFile("abiemaxey/assets/covers/proposal-system-preview.png"),
                },
              ].map((card, idx) => (
                <div
                  key={card.title}
                  style={{
                    borderRadius: 18,
                    border: `1px solid ${palette.border}`,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    overflow: "hidden",
                    transform: `translateY(${interpolate(frame, [430 + idx * 8, 470 + idx * 8], [26, 0], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    })}px)`,
                    opacity: interpolate(frame, [430 + idx * 8, 470 + idx * 8], [0, 1], {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }),
                  }}
                >
                  <div style={{ height: 170 }}>
                    <Img src={card.img} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ padding: "12px 14px 14px" }}>
                    <p style={{ ...heading, margin: 0, fontSize: 32, color: palette.ink }}>{card.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "absolute", inset: 0, opacity: closeOpacity }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(145deg, rgba(38,67,215,0.92), rgba(74,122,255,0.82))",
              }}
            />
            <div style={{ position: "absolute", left: 70, right: 70, top: 110 }}>
              <p style={{ ...mono, margin: 0, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>Web design and development</p>
              <h2 style={{ ...heading, margin: "14px 0 0", fontSize: 102, color: "#ffffff" }}>
                LET&apos;S BUILD
                <br />
                YOUR NEXT
                <br />
                GROWTH WEBSITE.
              </h2>
              <p style={{ ...serif, margin: "14px 0 0", fontSize: 34, color: "rgba(255,255,255,0.88)" }}>
                Modern. Premium. Built to convert.
              </p>
              <div
                style={{
                  marginTop: 24,
                  display: "inline-block",
                  borderRadius: 9999,
                  backgroundColor: "#ffffff",
                  color: palette.sapphire,
                  padding: "14px 20px",
                  ...mono,
                  fontSize: 12,
                  fontWeight: 700,
                }}
              >
                Start project scope
              </div>
            </div>
          </div>
        </AbsoluteFill>
      </div>
    </AbsoluteFill>
  );
};

