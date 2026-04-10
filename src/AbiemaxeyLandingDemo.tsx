import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const colors = {
  bg: "#f9f5f2",
  fg: "#3a3a3a",
  card: "#ffffff",
  primary: "#e3a99c",
  muted: "#e7ddd3",
  soft: "#6b6b6b",
};

const mono = {
  fontFamily: "Menlo, Consolas, monospace",
  textTransform: "uppercase" as const,
  letterSpacing: 1,
};

const title = {
  fontFamily: "Avenir, Avenir Next, Inter, sans-serif",
  textTransform: "uppercase" as const,
  fontWeight: 800,
  letterSpacing: -1.2,
  lineHeight: 0.92,
};

const serif = {
  fontFamily: "Georgia, Times New Roman, serif",
  fontStyle: "italic" as const,
};

const callouts = [
  {
    start: 8,
    end: 130,
    title: "Lead with identity",
    body: "Creator x engineer plus clear offer in the first fold.",
  },
  {
    start: 140,
    end: 270,
    title: "Build trust quickly",
    body: "Show real ventures, real work, and what is shipping now.",
  },
  {
    start: 280,
    end: 430,
    title: "Productize your thinking",
    body: "Playbooks explain method. Tools prove execution.",
  },
  {
    start: 440,
    end: 620,
    title: "Content to conversion",
    body: "Writing builds trust, then newsletter and scope wizard convert.",
  },
  {
    start: 630,
    end: 900,
    title: "Founder close",
    body: "One clear CTA: scope your project and get a 24h follow-up.",
  },
];

const fadeInOut = (frame: number, start: number, end: number) => {
  const a = interpolate(frame, [start, start + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const b = interpolate(frame, [end - 14, end], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return Math.min(a, b);
};

export const AbiemaxeyLandingDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const width = 1140;
  const height = 640;
  const contentHeight = 3330;
  const maxScroll = contentHeight - height;

  const intro = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 115, mass: 0.9 },
  });

  const scroll = interpolate(
    frame,
    [0, 120, 240, 360, 500, 660, 820, 930],
    [0, 320, 780, 1260, 1820, 2350, 2870, maxScroll],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );

  const cursorX = interpolate(
    frame,
    [0, 140, 260, 390, 530, 700, 860],
    [980, 860, 970, 760, 930, 860, 1000],
    { extrapolateRight: "clamp" },
  );
  const cursorY = interpolate(
    frame,
    [0, 140, 260, 390, 530, 700, 860],
    [270, 420, 300, 390, 320, 430, 460],
    { extrapolateRight: "clamp" },
  );

  const pulseFrames = [108, 245, 412, 575, 740, 875];
  const pulse = pulseFrames.reduce((max, s) => {
    const p = interpolate(frame, [s, s + 10], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    });
    return Math.max(max, p);
  }, 0);

  const scopeStep = Math.floor(
    interpolate(frame, [670, 890], [1, 5.9], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  const activeCallout = callouts.find((c) => frame >= c.start && frame <= c.end);
  const calloutOpacity = activeCallout ? fadeInOut(frame, activeCallout.start, activeCallout.end) : 0;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 14% 18%, rgba(227,169,156,0.35), transparent 36%), radial-gradient(circle at 86% 84%, rgba(187,204,205,0.32), transparent 40%), #f9f5f2",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 28,
          top: 24,
          border: `1px solid ${colors.muted}`,
          borderRadius: 9999,
          padding: "8px 12px",
          ...mono,
          fontSize: 10,
          color: colors.soft,
          backgroundColor: "rgba(255,255,255,0.7)",
        }}
      >
        Founder Demo: Abiemaxey landing walkthrough
      </div>

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: width + 70,
          height: height + 70,
          transform: `translate(-50%, -50%) scale(${interpolate(intro, [0, 1], [0.9, 1])})`,
          opacity: interpolate(intro, [0, 1], [0, 1]),
          borderRadius: 34,
          backgroundColor: "rgba(255,255,255,0.45)",
          border: `1px solid rgba(231,221,211,0.9)`,
          boxShadow: "0 38px 78px rgba(58,58,58,0.16)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width,
          height,
          transform: "translate(-50%, -50%)",
          overflow: "hidden",
          borderRadius: 24,
          border: `1px solid ${colors.muted}`,
          backgroundColor: colors.bg,
          boxShadow: "0 22px 60px rgba(58,58,58,0.14)",
        }}
      >
        <div
          style={{
            height: 34,
            borderBottom: `1px solid ${colors.muted}`,
            backgroundColor: "rgba(255,255,255,0.82)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "0 14px",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#fb7185" }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#facc15" }} />
          <div style={{ width: 10, height: 10, borderRadius: 9999, backgroundColor: "#4ade80" }} />
        </div>

        <div style={{ position: "absolute", inset: "34px 0 0", overflow: "hidden" }}>
          <div style={{ transform: `translateY(${-scroll}px)` }}>
            <section style={{ height: 760, padding: "24px 46px", borderBottom: `1px solid ${colors.muted}` }}>
              <div
                style={{
                  border: `1px solid ${colors.muted}`,
                  borderRadius: 9999,
                  padding: "10px 14px",
                  backgroundColor: "rgba(249,245,242,0.84)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Img src={staticFile("abiemaxey/logo.png")} style={{ height: 24, width: "auto" }} />
                  <div style={{ width: 1, height: 16, backgroundColor: colors.muted }} />
                  <div style={{ ...mono, fontSize: 10, color: colors.soft }}>Home · Playbooks · Tools · Services</div>
                </div>
                <div style={{ ...mono, fontSize: 10, color: colors.bg, backgroundColor: colors.fg, borderRadius: 9999, padding: "7px 12px" }}>
                  Work with me
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 0.9fr", gap: 20, marginTop: 34 }}>
                <div>
                  <div style={{ ...mono, color: "#cf745f", border: "1px solid rgba(227,169,156,0.35)", backgroundColor: "rgba(227,169,156,0.12)", borderRadius: 9999, display: "inline-block", padding: "7px 12px", fontSize: 10 }}>
                    Creator x Engineer
                  </div>
                  <h1 style={{ ...title, fontSize: 88, color: colors.fg, margin: "16px 0 0" }}>
                    FILIPINA.
                    <br />
                    <span style={{ ...serif, textTransform: "none", fontSize: 92, fontWeight: 400 }}>building from</span>
                    <br />
                    MADRID.
                  </h1>
                  <p style={{ ...serif, color: colors.soft, fontSize: 28, marginTop: 14 }}>
                    Websites, tools, and systems built from experience.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 18, alignItems: "center" }}>
                  <div style={{ height: 430, borderRadius: "0 0 180px 180px", overflow: "hidden", backgroundColor: colors.muted }}>
                    <Img src={staticFile("abiemaxey/assets/RVB02306.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div>
                    {[
                      "abiemaxey.com · Content and brand",
                      "HappyVoyager · Spain DNV consulting",
                      "TalentMucho · Global talent agency",
                    ].map((v) => (
                      <p key={v} style={{ margin: "0 0 12px", fontFamily: "Avenir, Inter, sans-serif", fontSize: 18, color: colors.fg }}>
                        {v}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section style={{ height: 520, padding: "50px 46px", borderBottom: `1px solid ${colors.muted}` }}>
              <p style={{ ...serif, color: colors.soft, fontSize: 28, margin: 0 }}>02 ~ Systems, not checklists</p>
              <h2 style={{ ...title, fontSize: 66, color: colors.fg, margin: "8px 0 20px" }}>FREE PLAYBOOKS</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
                {[
                  "⚡ Master Claude",
                  "🤖 Open Claw",
                  "⚙ The Nomad OS",
                ].map((p, idx) => (
                  <div key={p} style={{ border: "1px solid rgba(227,169,156,0.45)", borderRadius: 20, backgroundColor: "rgba(227,169,156,0.1)", padding: 18, minHeight: 200 }}>
                    <p style={{ ...title, fontSize: 30, color: colors.fg, margin: 0 }}>{p}</p>
                    <p style={{ ...serif, color: colors.soft, fontSize: 19, margin: "10px 0 0" }}>
                      {idx === 0 && "From first prompt to production agent"}
                      {idx === 1 && "Deploy your own assistant from zero"}
                      {idx === 2 && "Build systems for life abroad"}
                    </p>
                    <p style={{ ...mono, color: colors.soft, fontSize: 9, marginTop: 12 }}>
                      {idx === 0 ? "15 lessons · 5 phases" : "12 lessons · 4 phases"}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ height: 560, padding: "50px 46px", borderBottom: `1px solid rgba(249,245,242,0.2)`, backgroundColor: colors.fg }}>
              <p style={{ ...serif, color: "rgba(249,245,242,0.48)", fontSize: 28, margin: 0 }}>03 ~ Built from scratch. Free forever.</p>
              <h2 style={{ ...title, fontSize: 66, color: colors.bg, margin: "8px 0 20px" }}>TOOLS I BUILT</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1.25fr 1fr 1fr", gap: 14 }}>
                {[
                  "Command Centre · Pomodoro, hit list, streaks",
                  "IG Carousel Editor · On-brand carousels in minutes",
                  "AI Stack Picker · Curated tools by budget and task",
                ].map((t, idx) => (
                  <div key={t} style={{ border: idx === 0 ? "1px solid rgba(227,169,156,0.5)" : "1px solid rgba(249,245,242,0.2)", borderRadius: 18, backgroundColor: idx === 0 ? "rgba(227,169,156,0.2)" : "rgba(249,245,242,0.07)", padding: 16, minHeight: 210 }}>
                    <p style={{ ...title, fontSize: idx === 0 ? 36 : 30, color: colors.bg, margin: 0 }}>
                      {idx === 0 ? "COMMAND CENTRE" : idx === 1 ? "IG CAROUSEL EDITOR" : "AI STACK PICKER"}
                    </p>
                    <p style={{ ...serif, color: "rgba(249,245,242,0.64)", fontSize: 19, marginTop: 10 }}>{t}</p>
                    {idx === 1 ? (
                      <Img src={staticFile("abiemaxey/assets/ig-carousel-ss.png")} style={{ width: "100%", height: 88, objectFit: "cover", borderRadius: 10, marginTop: 10, opacity: 0.86 }} />
                    ) : null}
                  </div>
                ))}
              </div>
            </section>

            <section style={{ height: 600, padding: "50px 46px", borderBottom: `1px solid ${colors.muted}` }}>
              <p style={{ ...serif, color: colors.soft, fontSize: 28, margin: 0 }}>04 ~ From the field</p>
              <h2 style={{ ...title, fontSize: 66, color: colors.fg, margin: "8px 0 20px" }}>LATEST WRITING</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 12 }}>
                <div style={{ height: 360, borderRadius: 20, overflow: "hidden", position: "relative" }}>
                  <Img src={staticFile("abiemaxey/assets/covers/desk-setup-alicante.jpg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(0,0,0,0.1), rgba(0,0,0,0.7))" }} />
                  <p style={{ ...title, position: "absolute", left: 16, bottom: 12, color: "white", fontSize: 38, margin: 0 }}>
                    HOW I USE CLAUDE CODE TO RUN 3 BUSINESSES
                  </p>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[staticFile("abiemaxey/assets/covers/proposal-system-preview.png"), staticFile("abiemaxey/assets/covers/ig-carousel-editor-ipad.png"), staticFile("abiemaxey/assets/covers/golden-hour-balcony-view-mediterranean.jpg"), staticFile("abiemaxey/assets/Watching.jpg")].map((src) => (
                    <div key={src} style={{ height: 172, borderRadius: 14, overflow: "hidden" }}>
                      <Img src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section style={{ height: 600, padding: "50px 46px", backgroundColor: colors.fg }}>
              <h2 style={{ ...title, fontSize: 66, color: colors.bg, margin: 0 }}>NEWSLETTER + SCOPE WIZARD</h2>
              <p style={{ ...serif, color: "rgba(249,245,242,0.6)", fontSize: 23, margin: "10px 0 18px" }}>
                Nurture with builder diaries, then qualify leads with a step-by-step scope flow.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <div style={{ border: "1px solid rgba(249,245,242,0.2)", borderRadius: 16, padding: 14 }}>
                  <p style={{ ...title, color: colors.bg, fontSize: 30, margin: 0 }}>DROP YOUR EMAIL</p>
                  <div style={{ marginTop: 10, borderRadius: 9999, border: "1px solid rgba(249,245,242,0.2)", padding: "10px 12px", ...mono, color: "rgba(249,245,242,0.42)", fontSize: 9 }}>
                    your@email.com
                  </div>
                  <div style={{ marginTop: 10, borderRadius: 9999, backgroundColor: colors.primary, color: colors.fg, padding: "11px 12px", ...mono, fontSize: 9, textAlign: "center" }}>
                    Send me the dispatch
                  </div>
                </div>

                <div style={{ border: "1px solid rgba(249,245,242,0.2)", borderRadius: 16, padding: 14 }}>
                  <p style={{ ...title, color: colors.bg, fontSize: 30, margin: 0 }}>SCOPE IT</p>
                  <div style={{ display: "flex", gap: 6, marginTop: 10 }}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <div key={s} style={{ flex: 1, height: 26, borderRadius: 9999, border: "1px solid rgba(249,245,242,0.25)", backgroundColor: s <= scopeStep ? colors.primary : "transparent", color: s <= scopeStep ? colors.fg : "rgba(249,245,242,0.55)", ...mono, fontSize: 9, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {s}
                      </div>
                    ))}
                  </div>
                  <p style={{ ...mono, color: "rgba(249,245,242,0.58)", fontSize: 9, marginTop: 12 }}>
                    ABOUT YOU · VISION · STORIES · FEATURES · TIMELINE
                  </p>
                  <div style={{ marginTop: 12, borderRadius: 9999, backgroundColor: colors.bg, color: colors.fg, padding: "11px 12px", ...mono, fontSize: 9, textAlign: "center" }}>
                    Get your proposal in 24 hours
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        <div style={{ position: "absolute", left: cursorX, top: cursorY, width: 18, height: 18, borderRadius: 9999, backgroundColor: colors.primary, boxShadow: "0 0 0 2px rgba(58,58,58,0.16)" }} />
        <div style={{ position: "absolute", left: cursorX - 12, top: cursorY - 12, width: 42, height: 42, borderRadius: 9999, border: `2px solid rgba(227,169,156,${pulse})`, transform: `scale(${interpolate(pulse, [0, 1], [1.5, 1])})`, opacity: pulse }} />
      </div>

      {activeCallout ? (
        <div
          style={{
            position: "absolute",
            left: 32,
            bottom: 30,
            width: 430,
            borderRadius: 18,
            border: `1px solid ${colors.muted}`,
            backgroundColor: "rgba(255,255,255,0.9)",
            boxShadow: "0 14px 38px rgba(58,58,58,0.11)",
            padding: "16px 18px",
            opacity: calloutOpacity,
            transform: `translateY(${interpolate(calloutOpacity, [0, 1], [15, 0])}px)`,
          }}
        >
          <p style={{ ...mono, color: "#cf745f", fontSize: 9, margin: 0 }}>Founder narration</p>
          <h3 style={{ ...title, color: colors.fg, fontSize: 30, margin: "6px 0 0" }}>{activeCallout.title}</h3>
          <p style={{ ...serif, color: colors.soft, fontSize: 21, margin: "8px 0 0", lineHeight: 1.32 }}>{activeCallout.body}</p>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};

