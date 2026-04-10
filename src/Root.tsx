import "./index.css";
import { Composition } from "remotion";
import { NeoBrutalismWebsiteMotion } from "./NeoBrutalismWebsiteMotion";
import { AbiemaxeyLandingDemo } from "./AbiemaxeyLandingDemo";
import { PremiumWebDesignPromo } from "./PremiumWebDesignPromo";
import { AbiemaxeyPhotoGalleryReel } from "./AbiemaxeyPhotoGalleryReel";
import { BuddyCommandReel } from "./BuddyCommandReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="AbiemaxeyLandingDemo"
        component={AbiemaxeyLandingDemo}
        durationInFrames={930}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="NeoBrutalismWebsite"
        component={NeoBrutalismWebsiteMotion}
        durationInFrames={360}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="PremiumWebDesignPromo"
        component={PremiumWebDesignPromo}
        durationInFrames={600}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="AbiemaxeyPhotoGalleryReel"
        component={AbiemaxeyPhotoGalleryReel}
        durationInFrames={620}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="BuddyCommandReel"
        component={BuddyCommandReel}
        durationInFrames={450}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
