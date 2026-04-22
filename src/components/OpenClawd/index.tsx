import React from "react";
import { AbsoluteFill, Sequence, Audio, useCurrentFrame, interpolate, staticFile } from "remotion";
import { SCENE_DURATIONS, COLORS } from "./constants";
import { Scene1Terminal } from "./scenes/Scene1Terminal";
import { Scene2Home } from "./scenes/Scene2Home";
import { Scene3Chat } from "./scenes/Scene3Chat";
import { Scene4ProviderSwitch } from "./scenes/Scene4ProviderSwitch";
import { Scene5MCPCatalog } from "./scenes/Scene5MCPCatalog";
import { Scene6Messaging } from "./scenes/Scene6Messaging";
import { Scene7LogoCombo } from "./scenes/Scene7LogoCombo";
import { Scene8GitHub } from "./scenes/Scene8GitHub";

export const AbiemaxeyVideo: React.FC = () => {
  const frame = useCurrentFrame();

  const t1 = 0;
  const t2 = t1 + SCENE_DURATIONS.scene1;
  const t3 = t2 + SCENE_DURATIONS.scene2;
  const t4 = t3 + SCENE_DURATIONS.scene3;
  const t5 = t4 + SCENE_DURATIONS.scene4;
  const t6 = t5 + SCENE_DURATIONS.scene5;
  const t7 = t6 + SCENE_DURATIONS.scene6;
  const t8 = t7 + SCENE_DURATIONS.scene7;
  const totalFrames = t8 + SCENE_DURATIONS.scene8;

  // Background music fading
  // The user asked to ignore audio for now, so we can comment it out
  /*
  const audioVolume = interpolate(
    frame,
    [0, 30, totalFrames - 60, totalFrames],
    [0, 0.4, 0.4, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  */

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* 
      // Audio is ignored for now
      <Audio src={staticFile("audio/HEADPHONK.mp3")} volume={audioVolume} /> 
      */}

      <Sequence from={t1} durationInFrames={SCENE_DURATIONS.scene1}>
        <Scene1Terminal />
      </Sequence>

      <Sequence from={t2} durationInFrames={SCENE_DURATIONS.scene2}>
        <Scene2Home />
      </Sequence>

      <Sequence from={t3} durationInFrames={SCENE_DURATIONS.scene3}>
        <Scene3Chat />
      </Sequence>

      <Sequence from={t4} durationInFrames={SCENE_DURATIONS.scene4}>
        <Scene4ProviderSwitch />
      </Sequence>

      <Sequence from={t5} durationInFrames={SCENE_DURATIONS.scene5}>
        <Scene5MCPCatalog />
      </Sequence>

      <Sequence from={t6} durationInFrames={SCENE_DURATIONS.scene6}>
        <Scene6Messaging />
      </Sequence>

      <Sequence from={t7} durationInFrames={SCENE_DURATIONS.scene7}>
        <Scene7LogoCombo />
      </Sequence>

      <Sequence from={t8} durationInFrames={SCENE_DURATIONS.scene8}>
        <Scene8GitHub />
      </Sequence>

    </AbsoluteFill>
  );
};
