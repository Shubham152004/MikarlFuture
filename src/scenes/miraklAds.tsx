import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  interpolate,
  useVideoConfig,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";

export const MiraklAds: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleProgress = spring({
    frame,
    fps,
    config: {
      damping: 180,
      stiffness: 200,
    },
  });

  const chartProgress = spring({
    frame: frame - 15,
    fps,
    config: {
      damping: 180,
      stiffness: 140,
    },
  });

  const chartHeight = interpolate(
    chartProgress,
    [0, 1],
    [0, 240],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }
  );

  return (
    <AbsoluteFill>
      <GradientBackground variant="violet" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Play icon */}
        <div
          style={{
            position: "absolute",
            top: 170,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "#7c5cfc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: titleProgress,
            transform: `scale(${0.7 + titleProgress * 0.3})`,
            color: "#ffffff",
            fontSize: 28,
          }}
        >
          ▶
        </div>

        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: 265,
            fontFamily: "Georgia, Times New Roman, serif",
            fontSize: 48,
            color: "#232230",
            opacity: titleProgress,
            transform: `translateY(${(1 - titleProgress) * 25}px)`,
          }}
        >
          Mirakl Ads
        </div>

        {/* Revenue chart */}
        <div
          style={{
            position: "absolute",
            top: 390,
            width: 650,
            height: 260,
            display: "flex",
            alignItems: "flex-end",
            gap: 18,
          }}
        >
          {[80, 120, 150, 180, 210, 240].map((height, index) => {
            const barProgress = spring({
              frame: frame - 18 - index * 3,
              fps,
              config: {
                damping: 180,
                stiffness: 180,
              },
            });

            return (
              <div
                key={index}
                style={{
                  flex: 1,
                  height: `${height * barProgress}px`,
                  borderRadius: "10px 10px 0 0",
                  background:
                    "linear-gradient(180deg, #7c5cfc, #cfc2f5)",
                }}
              />
            );
          })}
        </div>

        {/* Revenue label */}
        <div
          style={{
            position: "absolute",
            top: 680,
            fontFamily: "Inter, sans-serif",
            fontSize: 18,
            fontWeight: 600,
            color: "#5a3ce0",
            opacity: chartProgress,
          }}
        >
          Turn traffic into revenue
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};