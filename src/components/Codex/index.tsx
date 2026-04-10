import React from "react";
import { Sequence, AbsoluteFill } from "remotion";
import { Background } from "./core/Background";
import { HookSequence } from "./sequences/HookSequence";
import { FeatureCardSequence } from "./sequences/FeatureCardSequence";
import { TerminalDemoSequence } from "./sequences/TerminalDemoSequence";
import { ProfileCTASequence } from "./sequences/ProfileCTASequence";
import { CODEX_COLORS } from "./constants";

export const CodexComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CODEX_COLORS.background }}>
      <Background />

      {/* Sequence 1: The Hook (0s - 4s) */}
      <Sequence from={0} durationInFrames={120}>
        <HookSequence 
          label="01. INTRODUCTION"
          text="Gemma 4: Reasoning Reimagined." 
          durationInFrames={120} 
        />
      </Sequence>

      {/* Sequence 2: The Core Specs (4s - 9s) */}
      <Sequence from={120} durationInFrames={150}>
        <FeatureCardSequence
          label="02. CAPABILITIES"
          title="Unmatched Local Power."
          description="Built on the same architecture as Gemini, Gemma 4 brings state-of-the-art reasoning to your laptop."
          durationInFrames={150}
          stats={[
            { label: "PARAMETERS", value: "9.2B" },
            { label: "CONTEXT", value: "8192" }
          ]}
          tags={["Native Silicon", "PyTorch", "JAX"]}
        />
      </Sequence>

      {/* Sequence 3: Privacy & Independence (9s - 14s) */}
      <Sequence from={270} durationInFrames={150}>
        <FeatureCardSequence
          label="03. SECURITY"
          title="Privacy First."
          description="Process sensitive data with zero external requests. Your data never leaves your environment."
          durationInFrames={150}
          layout="bottom"
          tags={["Air-Gapped", "Encrypted", "Zero-Latency"]}
          stats={[
            { label: "LATENCY", value: "0ms" },
            { label: "UPTIME", value: "100%" }
          ]}
        />
      </Sequence>

      {/* Sequence 4: Live Demo (14s - 19s) */}
      <Sequence from={420} durationInFrames={150}>
        <TerminalDemoSequence
          label="04. PERFORMANCE"
          title="Lightning Fast Execution."
          terminalTitle="gemma-4-reasoning-shell"
          lines={[
            { text: "$ gemma-4 query --mode=reasoning", isCommand: true },
            { text: "Loading weights [6.4GB]...", delay: 20 },
            { text: "Optimizing for local GPU...", delay: 40 },
            { text: "Reasoning active. Input: 'Explain quantum gravity'", delay: 60 },
            { text: "Streaming response at 64.2 tokens/sec...", delay: 80, isResponse: true },
          ]}
          durationInFrames={150}
        />
      </Sequence>

      {/* Sequence 5: Profile CTA (19s - 22s) */}
      <Sequence from={570} durationInFrames={90}>
        <ProfileCTASequence
          label="05. JOIN US"
          username="Abie Maxey"
          handle="@abiemaxey"
          followerCount="7,000+"
          durationInFrames={90}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
