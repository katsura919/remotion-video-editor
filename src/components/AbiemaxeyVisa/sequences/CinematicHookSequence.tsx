import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Img,
  staticFile,
} from "remotion";
import { CODEX_FONTS, CODEX_COLORS, CODEX_TIMING } from "../../Codex/constants";

export const CinematicHookSequence: React.FC<{
  durationInFrames: number;
}> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const overlayOpacity = interpolate(frame, [0, 40], [0, 0.62], {
    extrapolateRight: "clamp",
  });

  const photoScale = interpolate(frame, [0, durationInFrames], [1.08, 1], {
    extrapolateRight: "clamp",
  });

  const titleSpring = spring({
    frame: frame - 20,
    fps,
    config: CODEX_TIMING.delayedSpring,
    from: 60,
    to: 0,
  });
  const titleOpacity = interpolate(frame - 20, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const subtitleSpring = spring({
    frame: frame - 45,
    fps,
    config: CODEX_TIMING.smoothSpring,
    from: 40,
    to: 0,
  });
  const subtitleOpacity = interpolate(frame - 45, [0, 12], [0, 1], {
    extrapolateRight: "clamp",
  });

  const tagOpacity = interpolate(frame, [60, 80, durationInFrames - 10, durationInFrames], [0, 1, 1, 0], {
    extrapolateRight: "clamp",
  });

  const exitOpacity = interpolate(
    frame,
    [durationInFrames - 20, durationInFrames],
    [1, 0],
    { extrapolateRight: "clamp" }
  );

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: exitOpacity }}>
      {/* Full-bleed photo */}
      <Img
        src={staticFile("abiemaxey/assets/covers/golden-hour-balcony-view-mediterranean.jpg")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center",
          transform: `scale(${photoScale})`,
          transformOrigin: "center",
        }}
      />

      {/* Dark vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 50%, rgba(0,0,0,0.80) 100%)",
          opacity: overlayOpacity / 0.62,
        }}
      />

      {/* Grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.06,
          mixBlendMode: "overlay",
          pointerEvents: "none",
        }}
      />

      {/* @abiemaxey tag — top right */}
      <div
        style={{
          position: "absolute",
          top: 80,
          right: 80,
          fontFamily: CODEX_FONTS.mono,
          fontSize: 26,
          fontWeight: 600,
          color: "rgba(255,255,255,0.75)",
          letterSpacing: "3px",
          textTransform: "uppercase",
          opacity: tagOpacity,
        }}
      >
        @abiemaxey
      </div>

      {/* Main headline */}
      <div
        style={{
          position: "absolute",
          bottom: 340,
          left: 80,
          right: 80,
        }}
      >
        <div
          style={{
            fontFamily: CODEX_FONTS.heading,
            fontSize: 148,
            fontStyle: "italic",
            fontWeight: 400,
            color: "#ffffff",
            lineHeight: 0.95,
            opacity: titleOpacity,
            transform: `translateY(${titleSpring}px)`,
            textShadow: "0 4px 40px rgba(0,0,0,0.4)",
          }}
        >
          Digital
          <br />
          Nomad
          <br />
          Visa.
        </div>
      </div>

      {/* Subtitle */}
      <div
        style={{
          position: "absolute",
          bottom: 200,
          left: 80,
          right: 80,
          opacity: subtitleOpacity,
          transform: `translateY(${subtitleSpring}px)`,
        }}
      >
        <div
          style={{
            fontFamily: CODEX_FONTS.body,
            fontSize: 36,
            fontWeight: 500,
            color: "rgba(255,255,255,0.75)",
            letterSpacing: "3px",
            textTransform: "uppercase",
          }}
        >
          The complete application guide
        </div>
      </div>

      {/* Bottom accent line */}
      <div
        style={{
          position: "absolute",
          bottom: 160,
          left: 80,
          width: interpolate(frame, [50, 120], [0, 300], { extrapolateRight: "clamp" }),
          height: 2,
          backgroundColor: CODEX_COLORS.primary,
        }}
      />
    </div>
  );
};
