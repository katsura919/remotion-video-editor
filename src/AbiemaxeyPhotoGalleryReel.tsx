import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";

type GalleryPhoto = {
  src: string;
  title: string;
  location: string;
};

const photos: GalleryPhoto[] = [
  { src: staticFile("abiemaxey/assets/gallery/RVB02111.jpg"), title: "Quiet Confidence", location: "Madrid" },
  { src: staticFile("abiemaxey/assets/gallery/RVB02306.jpg"), title: "Founder Energy", location: "Studio" },
  { src: staticFile("abiemaxey/assets/gallery/RVB04605.jpg"), title: "Editorial Moment", location: "On Location" },
  { src: staticFile("abiemaxey/assets/gallery/Watching.jpg"), title: "Soft Focus", location: "Golden Hour" },
  { src: staticFile("abiemaxey/assets/gallery/eu_recap.JPG"), title: "European Year", location: "Travel Archive" },
  { src: staticFile("abiemaxey/assets/gallery/madrid.jpg"), title: "City Rhythm", location: "Madrid" },
  { src: staticFile("abiemaxey/assets/gallery/Swimming.jpg"), title: "Reset Day", location: "Coastline" },
  { src: staticFile("abiemaxey/assets/gallery/campfire.jpg"), title: "Night Stories", location: "Outdoor Session" },
  { src: staticFile("abiemaxey/assets/gallery/river.jpg"), title: "Stillness", location: "River Walk" },
  { src: staticFile("abiemaxey/assets/gallery/torrevieja.jpg"), title: "Mediterranean Light", location: "Torrevieja" },
  { src: staticFile("abiemaxey/assets/gallery/doggywatching.jpg"), title: "Playful Mood", location: "Weekend" },
  { src: staticFile("abiemaxey/assets/gallery/Reading.jpg"), title: "Builder Diaries", location: "Reading Room" },
];

const palette = {
  bg: "#0d1018",
  panel: "rgba(255,255,255,0.08)",
  border: "rgba(255,255,255,0.24)",
  text: "#f4f6fb",
  subtext: "rgba(244,246,251,0.68)",
  accent: "#9fb9ff",
};

const monoStyle = {
  fontFamily: "Menlo, Consolas, monospace",
  textTransform: "uppercase" as const,
  letterSpacing: 1.4,
};

const titleStyle = {
  fontFamily: "Avenir Next, Avenir, Inter, sans-serif",
  textTransform: "uppercase" as const,
  letterSpacing: -1,
  lineHeight: 0.92,
  fontWeight: 800,
};

const serifStyle = {
  fontFamily: "Georgia, Times New Roman, serif",
  fontStyle: "italic" as const,
};

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

export const AbiemaxeyPhotoGalleryReel: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const introFrames = 54;
  const perPhotoFrames = 42;
  const outroFrames = 60;
  const galleryStart = introFrames;
  const galleryFrames = photos.length * perPhotoFrames;
  const galleryEnd = galleryStart + galleryFrames;

  const globalOpen = spring({
    frame,
    fps,
    config: {
      damping: 15,
      stiffness: 115,
      mass: 0.92,
    },
  });

  const introOpacity = clamp01(interpolate(frame, [0, 16, introFrames - 10, introFrames], [0, 1, 1, 0]));
  const outroOpacity = clamp01(
    interpolate(frame, [galleryEnd - 6, galleryEnd + 12, galleryEnd + outroFrames], [0, 1, 1]),
  );

  const progress = clamp01(interpolate(frame, [0, galleryEnd + outroFrames], [0, 1]));

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 15% 12%, rgba(159,185,255,0.20), transparent 34%), radial-gradient(circle at 84% 88%, rgba(145,164,255,0.18), transparent 36%), #0d1018",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 26,
          left: 24,
          right: 24,
          height: 6,
          borderRadius: 9999,
          backgroundColor: "rgba(255,255,255,0.12)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress * 100}%`,
            borderRadius: 9999,
            background: "linear-gradient(90deg, #7d9cff, #c8d6ff)",
          }}
        />
      </div>

      <div
        style={{
          position: "absolute",
          top: 44,
          left: 26,
          right: 26,
          height: 1840,
          borderRadius: 34,
          border: "1px solid rgba(255,255,255,0.14)",
          backgroundColor: "rgba(255,255,255,0.04)",
          boxShadow: "0 28px 80px rgba(6,8,16,0.45)",
          overflow: "hidden",
          transform: `scale(${interpolate(globalOpen, [0, 1], [0.94, 1])})`,
          opacity: interpolate(globalOpen, [0, 1], [0.2, 1]),
        }}
      >
        {photos.map((photo, index) => {
          const start = galleryStart + index * perPhotoFrames;
          const end = start + perPhotoFrames;
          const local = frame - start;
          const opacity = clamp01(
            interpolate(frame, [start - 8, start + 8, end - 8, end + 6], [0, 1, 1, 0]),
          );

          if (opacity <= 0) {
            return null;
          }

          const scale = interpolate(local, [0, perPhotoFrames], [1.1, 1.03], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const panX = interpolate(local, [0, perPhotoFrames], [index % 2 === 0 ? -40 : 40, index % 2 === 0 ? 20 : -20], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          const frameLift = interpolate(local, [0, 12, perPhotoFrames - 10, perPhotoFrames], [56, 0, 0, -20], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });

          return (
            <div
              key={photo.src}
              style={{
                position: "absolute",
                inset: 0,
                opacity,
              }}
            >
              <Img
                src={photo.src}
                style={{
                  position: "absolute",
                  inset: -120,
                  width: 1200,
                  height: 2100,
                  objectFit: "cover",
                  filter: "blur(22px) saturate(0.95) brightness(0.44)",
                  transform: `scale(${scale}) translateX(${panX * 0.4}px)`,
                }}
              />

              <div
                style={{
                  position: "absolute",
                  left: 72,
                  right: 72,
                  top: 126,
                  bottom: 198,
                  borderRadius: 28,
                  overflow: "hidden",
                  border: `1px solid ${palette.border}`,
                  boxShadow: "0 24px 68px rgba(0,0,0,0.42)",
                  transform: `translateY(${frameLift}px)`,
                  backgroundColor: "#0f1320",
                }}
              >
                <Img
                  src={photo.src}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transform: `scale(${scale}) translateX(${panX}px)`,
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(13,16,24,0.05) 15%, rgba(13,16,24,0.66) 100%)",
                  }}
                />

                <div style={{ position: "absolute", left: 26, right: 26, bottom: 26 }}>
                  <p style={{ ...monoStyle, margin: 0, color: palette.accent, fontSize: 10 }}>
                    Abiemaxey Gallery · {String(index + 1).padStart(2, "0")}/{String(photos.length).padStart(2, "0")}
                  </p>
                  <h2 style={{ ...titleStyle, margin: "8px 0 0", color: palette.text, fontSize: 62 }}>
                    {photo.title}
                  </h2>
                  <p style={{ ...serifStyle, margin: "6px 0 0", color: palette.subtext, fontSize: 34 }}>
                    {photo.location}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: introOpacity,
            background:
              "linear-gradient(155deg, rgba(11,14,24,0.92), rgba(20,28,52,0.86))",
          }}
        >
          <div style={{ position: "absolute", left: 70, right: 70, top: 370 }}>
            <p style={{ ...monoStyle, margin: 0, color: "#b8cbff", fontSize: 13 }}>Abiemaxey</p>
            <h1 style={{ ...titleStyle, margin: "10px 0 0", color: palette.text, fontSize: 122 }}>
              PHOTO
              <br />
              GALLERY
              <br />
              REEL
            </h1>
            <p style={{ ...serifStyle, margin: "14px 0 0", color: palette.subtext, fontSize: 44 }}>
              moments from the founder journey
            </p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: outroOpacity,
            background:
              "linear-gradient(155deg, rgba(19,23,37,0.9), rgba(37,52,95,0.85))",
          }}
        >
          <div style={{ position: "absolute", left: 66, right: 66, top: 520 }}>
            <p style={{ ...monoStyle, margin: 0, color: "#bfd1ff", fontSize: 12 }}>
              Abiemaxey.com
            </p>
            <h2 style={{ ...titleStyle, margin: "12px 0 0", color: palette.text, fontSize: 102 }}>
              BUILDING
              <br />
              WITH
              <br />
              INTENTION
            </h2>
            <p style={{ ...serifStyle, margin: "14px 0 0", color: palette.subtext, fontSize: 40 }}>
              creator · engineer · founder
            </p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            bottom: 0,
            height: 104,
            background:
              "linear-gradient(180deg, rgba(13,16,24,0), rgba(13,16,24,0.68) 60%, rgba(13,16,24,0.9))",
          }}
        />
      </div>

      <p
        style={{
          position: "absolute",
          left: 34,
          bottom: 26,
          margin: 0,
          ...monoStyle,
          fontSize: 10,
          color: "rgba(244,246,251,0.6)",
        }}
      >
        Vertical Reel · 1080 x 1920
      </p>
    </AbsoluteFill>
  );
};

