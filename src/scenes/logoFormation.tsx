import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";

export const LogoFormation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 180,
      stiffness: 120,
    },
  });

  // Slowly rotate the shield
  const rotateY = frame * 2.5;

  // Shield enters from slightly smaller/deeper
  const scale = 0.65 + progress * 0.35;

  // Letters appear after the shield
  const logoProgress = spring({
    frame: frame - 45,
    fps,
    config: {
      damping: 180,
      stiffness: 160,
    },
  });

  return (
    <AbsoluteFill>
      <GradientBackground variant="violet" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 3D shield */}
        <div
          style={{
            width: 180,
            height: 210,
            opacity: progress,
            transform: `
              perspective(800px)
              scale(${scale})
              rotateY(${rotateY}deg)
            `,
            transformStyle: "preserve-3d",
          }}
        >
          {/* Shield shape */}
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(145deg, #ffffff, #cfc2f5 45%, #7c5cfc)",
              clipPath:
                "polygon(50% 0%, 90% 18%, 82% 68%, 50% 100%, 18% 68%, 10% 18%)",
              boxShadow: "0 20px 60px rgba(90,60,224,0.4)",
            }}
          />

          {/* Inner shield */}
          <div
            style={{
              position: "absolute",
              inset: 28,
              background: "#7c5cfc",
              clipPath:
                "polygon(50% 0%, 90% 18%, 82% 68%, 50% 100%, 18% 68%, 10% 18%)",
              opacity: 0.7,
            }}
          />
        </div>

        {/* MIRAKL */}
        <div
          style={{
            position: "absolute",
            marginTop: 300,
            fontFamily: "Inter, Arial, sans-serif",
            fontSize: 76,
            fontWeight: 700,
            letterSpacing: 8,
            color: "#232230",
            opacity: logoProgress,
            transform: `
              translateY(${(1 - logoProgress) * 30}px)
              scale(${0.9 + logoProgress * 0.1})
            `,
          }}
        >
          MIRAKL
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};