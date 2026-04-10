import "./index.css";
import { Composition } from "remotion";
import { BuddyCommandReel } from "./BuddyCommandReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="BuddyCommandReel"
        component={BuddyCommandReel}
        durationInFrames={660}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
