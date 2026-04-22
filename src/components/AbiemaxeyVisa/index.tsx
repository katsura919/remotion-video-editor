import React from "react";
import { Sequence, AbsoluteFill } from "remotion";
import { Background } from "../Codex/core/Background";
import { ProfileCTASequence } from "../Codex/sequences/ProfileCTASequence";
import { CinematicHookSequence } from "./sequences/CinematicHookSequence";
import { StatsRevealSequence } from "./sequences/StatsRevealSequence";
import { NumberedStepsSequence } from "./sequences/NumberedStepsSequence";
import { DestinationGridSequence } from "./sequences/DestinationGridSequence";
import { CODEX_COLORS } from "../Codex/constants";

// Total: 900 frames = 30s @ 30fps
// Scene 1  Hook          0  – 150  (5s)  cinematic photo
// Scene 2  Stats        150 – 300  (5s)  big animated numbers
// Scene 3  Steps        300 – 600  (10s) numbered editorial steps
// Scene 4  Destinations 600 – 780  (6s)  2×3 destination grid
// Scene 5  CTA          780 – 900  (4s)  profile CTA

export const AbiemaxeyVisaReel: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CODEX_COLORS.background }}>
      {/* Background only active for non-photo scenes */}
      <Sequence from={150}>
        <Background />
      </Sequence>

      {/* Scene 1 — Cinematic Hook */}
      <Sequence from={0} durationInFrames={150}>
        <CinematicHookSequence durationInFrames={150} />
      </Sequence>

      {/* Scene 2 — Stats Row */}
      <Sequence from={150} durationInFrames={150}>
        <StatsRevealSequence durationInFrames={150} />
      </Sequence>

      {/* Scene 3 — Numbered Steps */}
      <Sequence from={300} durationInFrames={300}>
        <NumberedStepsSequence durationInFrames={300} />
      </Sequence>

      {/* Scene 4 — Destination Grid */}
      <Sequence from={600} durationInFrames={180}>
        <DestinationGridSequence durationInFrames={180} />
      </Sequence>

      {/* Scene 5 — Profile CTA */}
      <Sequence from={780} durationInFrames={120}>
        <ProfileCTASequence
          label="05. FOLLOW FOR MORE"
          username="Abie Maxey"
          handle="@abiemaxey"
          followerCount="7,000+"
          durationInFrames={120}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
