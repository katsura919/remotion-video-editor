import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { ParticleIntroSequence } from "./sequences/ParticleIntroSequence";
import { TextDropInSequence } from "./sequences/TextDropInSequence";
import { TextMorphSequence } from "./sequences/TextMorphSequence";
import { OrbitGlowSequence } from "./sequences/OrbitGlowSequence";
import { SignOffSequence } from "./sequences/SignOffSequence";
import { THREED_COLORS, SCENE } from "./constants";

/**
 * ThreeDSampleComposition — 20-second 3D Text Reveal reel.
 *
 * Scene breakdown (30 fps):
 *  01. Particle Intro  — frames   0–120  (0s – 4s)
 *  02. Text Drop-In    — frames 120–270  (4s – 9s)
 *  03. Text Morph      — frames 270–420  (9s – 14s)
 *  04. Orbit & Glow    — frames 420–540  (14s – 18s)
 *  05. Sign-Off CTA    — frames 540–600  (18s – 20s)
 *
 * All 3D is rendered via @remotion/three's ThreeCanvas.
 * All animations are driven by useCurrentFrame() — no useFrame() from R3F.
 */
export const ThreeDSampleComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: THREED_COLORS.background }}>

      {/* ── Scene 01: Particle Intro (0s – 4s) ── */}
      <Sequence
        from={SCENE.particleIntro.from}
        durationInFrames={SCENE.particleIntro.duration}
        name="01-ParticleIntro"
      >
        <ParticleIntroSequence />
      </Sequence>

      {/* ── Scene 02: 3D Text Drop-In (4s – 9s) ── */}
      <Sequence
        from={SCENE.textDropIn.from}
        durationInFrames={SCENE.textDropIn.duration}
        name="02-TextDropIn"
      >
        <TextDropInSequence />
      </Sequence>

      {/* ── Scene 03: Text Morph + Card (9s – 14s) ── */}
      <Sequence
        from={SCENE.textMorph.from}
        durationInFrames={SCENE.textMorph.duration}
        name="03-TextMorph"
      >
        <TextMorphSequence />
      </Sequence>

      {/* ── Scene 04: Orbit & Glow (14s – 18s) ── */}
      <Sequence
        from={SCENE.orbitGlow.from}
        durationInFrames={SCENE.orbitGlow.duration}
        name="04-OrbitGlow"
      >
        <OrbitGlowSequence />
      </Sequence>

      {/* ── Scene 05: Sign-Off CTA (18s – 20s) ── */}
      <Sequence
        from={SCENE.signOff.from}
        durationInFrames={SCENE.signOff.duration}
        name="05-SignOff"
      >
        <SignOffSequence />
      </Sequence>

    </AbsoluteFill>
  );
};
