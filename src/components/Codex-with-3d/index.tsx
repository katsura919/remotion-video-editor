import React from "react";
import { Sequence, AbsoluteFill } from "remotion";
import { Background } from "./core/Background";
import { HookSequence } from "./sequences/HookSequence";
import { FeatureCardSequence } from "./sequences/FeatureCardSequence";
import { TerminalDemoSequence } from "./sequences/TerminalDemoSequence";
import { ProfileCTASequence } from "./sequences/ProfileCTASequence";
import { CODEX_COLORS } from "./constants";

/**
 * Codexwith3dComposition — "AI Agents: The New Frontier"
 *
 * A 22-second Instagram Reel covering 2025 AI trends,
 * enhanced with a live 3D AI Brain Orb in Scene 01.
 *
 * Scene timeline (30 fps):
 *  01. Hook             frames   0–120   (0s  – 4s)   w/ 3D AIOrb
 *  02. Capabilities     frames 120–270   (4s  – 9s)
 *  03. Alignment        frames 270–420   (9s  – 14s)
 *  04. Agent Terminal   frames 420–570   (14s – 19s)
 *  05. Profile CTA      frames 570–660   (19s – 22s)
 */
export const Codexwith3dComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: CODEX_COLORS.background }}>
      <Background />

      {/* ── Scene 01: The Hook — 0s to 4s ── */}
      <Sequence from={0} durationInFrames={120} name="01-Hook">
        <HookSequence
          label="01. AI TRENDS 2025"
          text="AI Agents: The New Frontier."
          durationInFrames={120}
        />
      </Sequence>

      {/* ── Scene 02: Agentic Capabilities — 4s to 9s ── */}
      <Sequence from={120} durationInFrames={150} name="02-Capabilities">
        <FeatureCardSequence
          label="02. CAPABILITIES"
          title="Autonomous by Design."
          description="Modern AI agents can plan multi-step tasks, call tools, browse the web, write code, and self-correct — all without human hand-holding."
          durationInFrames={150}
          stats={[
            { label: "TASKS / MINUTE", value: "12.4K" },
            { label: "AGENTS DEPLOYED", value: "280K" },
          ]}
          tags={["Tool-Use", "RAG", "Multi-Step"]}
        />
      </Sequence>

      {/* ── Scene 03: Alignment & Safety — 9s to 14s ── */}
      <Sequence from={270} durationInFrames={150} name="03-Alignment">
        <FeatureCardSequence
          label="03. ALIGNMENT"
          title="Guardrailed. Auditable."
          description="Constitutional AI and RLHF keep agents on-task. Every decision is logged, every tool call is traceable — full auditability by default."
          durationInFrames={150}
          layout="bottom"
          stats={[
            { label: "ACCURACY", value: "99.1%" },
            { label: "FAILURE RATE", value: "0.02%" },
          ]}
          tags={["RLHF", "Constitutional AI", "Guardrails"]}
        />
      </Sequence>

      {/* ── Scene 04: Live Agent Terminal Demo — 14s to 19s ── */}
      <Sequence from={420} durationInFrames={150} name="04-Terminal">
        <TerminalDemoSequence
          label="04. LIVE DEMO"
          title="Agent in Action."
          terminalTitle="ai-agent-runtime-v2"
          lines={[
            { text: "$ agent run --mode=research --stream", isCommand: true },
            { text: "✦ Initialising memory context [8 192 tokens]...", delay: 18 },
            { text: "✦ Spawning sub-agents: [search] [reason] [write]", delay: 36 },
            { text: "✦ Tool call → web_search('2025 AI agent benchmarks')", delay: 55 },
            { text: "✦ Synthesising 14 results across 6 domains...", delay: 74 },
            { text: "✓ Report ready — 3.1s | 2,847 tokens | 0 errors", delay: 95, isResponse: true },
          ]}
          durationInFrames={150}
        />
      </Sequence>

      {/* ── Scene 05: Profile CTA — 19s to 22s ── */}
      <Sequence from={570} durationInFrames={90} name="05-CTA">
        <ProfileCTASequence
          label="05. FOLLOW"
          username="Abie Maxey"
          handle="@abiemaxey"
          followerCount="7,000+"
          durationInFrames={90}
        />
      </Sequence>
    </AbsoluteFill>
  );
};
