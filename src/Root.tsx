import "./index.css";
import { Composition } from "remotion";

import { AIAgentsVideo } from "./components/AIAgents";
import { AIToolingReel } from "./components/AITooling";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AIToolingReel"
        component={AIToolingReel}
        durationInFrames={852}
        fps={30}
        width={1080}
        height={1920}
      />

      <Composition
        id="AIAgentsVideo"
        component={AIAgentsVideo}
        durationInFrames={902}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
