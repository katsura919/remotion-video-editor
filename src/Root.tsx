import "./index.css";
import { Composition } from "remotion";
import { BuddyCommandReel } from "./BuddyCommandReel";
import { BuddyCommandReelDark } from "./BuddyCommandReelDark";
import { CodexComposition } from "./components/Codex";

export const RemotionRoot: React.FC = () => {
  return (
    <>
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
    </>
  );
};
