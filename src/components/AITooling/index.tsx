import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Scene1Hook } from "./scenes/Scene1Hook";
import { Scene2Skills } from "./scenes/Scene2Skills";
import { Scene3MCP } from "./scenes/Scene3MCP";
import { Scene4Context } from "./scenes/Scene4Context";
import { Scene5CTA } from "./scenes/Scene5CTA";

const SCENE = 180;
const TRANSITION = 12;

// 5 × 180 − 4 × 12 = 852 frames @ 30fps ≈ 28.4s
export const AIToolingReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ background: "#1e1b1a" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <Scene1Hook />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <Scene2Skills />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <Scene3MCP />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <Scene4Context />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE}>
          <Scene5CTA />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
