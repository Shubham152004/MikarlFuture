import React from "react";
import { AbsoluteFill } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";

type Segment = { text: string; color?: string; weight?: number };

export const StatementScene: React.FC<{
  segments: Segment[];
  variant?: "neutral" | "violet" | "dark";
  fontSize?: number;
}> = ({ segments, variant = "violet", fontSize = 52 }) => {
  return (
    <AbsoluteFill>
      <GradientBackground variant={variant} />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        <AnimatedText segments={segments} fontSize={fontSize} />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
