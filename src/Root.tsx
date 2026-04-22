import "./index.css";
import { Composition } from "remotion";
import { BuddyCommandReel } from "./BuddyCommandReel";
import { BuddyCommandReelDark } from "./BuddyCommandReelDark";
import { CodexComposition } from "./components/Codex";
import { ThreeDSampleComposition } from "./components/3d-sample";
import { LogoIntroComposition, defaultLogoIntroProps } from "./components/LogoIntro";
import { Codexwith3dComposition } from "./components/Codex-with-3d";
import { AbiemaxeyVideo } from "./components/OpenClawd";
import { AbiemaxeyVisaReel } from "./components/AbiemaxeyVisa";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* ── 3D Sample ── */}
      <Composition
        id="ThreeDSample"
        component={ThreeDSampleComposition}
        durationInFrames={600}
        fps={30}
        width={1080}
        height={1920}
      />

      {/* ── Logo Intro (Full HD, 6s) ── */}
      <Composition
        id="LogoIntro"
        component={LogoIntroComposition}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
        defaultProps={defaultLogoIntroProps}
      />

      {/* ── Codex With 3D (AI Agents Reel) ── */}
      <Composition
        id="CodexWith3D"
        component={Codexwith3dComposition}
        durationInFrames={660}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="Codex"
        component={CodexComposition}
        durationInFrames={660}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BuddyCommandReel"
        component={BuddyCommandReel}
        durationInFrames={660}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BuddyCommandReelDark"
        component={BuddyCommandReelDark}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Abiemaxey"
        component={AbiemaxeyVideo}
        durationInFrames={1120}
        fps={30}
        width={1080}
        height={700}
      />
      <Composition
        id="AbiemaxeyVisaReel"
        component={AbiemaxeyVisaReel}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
