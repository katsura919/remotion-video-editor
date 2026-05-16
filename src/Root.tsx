import "./index.css";
import { Composition } from "remotion";

import { AbiemaxeyVisaReel } from "./components/AbiemaxeyVisa";

export const RemotionRoot: React.FC = () => {
  return (
    <>

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
