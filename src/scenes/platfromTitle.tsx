import React from "react";
import { AbsoluteFill } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";

export const PlatformTitle: React.FC = () => {
  return (
    <AbsoluteFill>
      <GradientBackground variant="neutral" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <AnimatedText
          segments={[
            { text: "Mirakl Platform" },
          ]}
          fontSize={58}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};