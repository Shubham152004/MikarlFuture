import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";

export const AiAutomation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panels = [
    {
      title: "Product title",
      value: "Winter Hiking Jacket",
      delay: 8,
    },
    {
      title: "Description",
      value: "Premium waterproof jacket for outdoor adventures.",
      delay: 14,
    },
    {
      title: "Category",
      value: "Outdoor > Clothing > Jackets",
      delay: 20,
    },
    {
      title: "Product attributes",
      value: "Waterproof • Insulated • Lightweight",
      delay: 26,
    },
  ];

  return (
    <AbsoluteFill>
      <GradientBackground variant="neutral" />

      {/* Product data panels */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 150,
        }}
      >
        <div
          style={{
            width: 1050,
            display: "flex",
            gap: 18,
            justifyContent: "center",
          }}
        >
          {panels.map((panel) => {
            const progress = spring({
              frame: frame - panel.delay,
              fps,
              config: {
                damping: 180,
                stiffness: 200,
              },
            });

            return (
              <div
                key={panel.title}
                style={{
                  flex: 1,
                  minHeight: 210,
                  background: "#ffffff",
                  borderRadius: 18,
                  padding: 20,
                  boxShadow: "0 20px 55px rgba(80,50,130,0.14)",
                  opacity: progress,
                  transform: `
                    translateY(${(1 - progress) * 35}px)
                    scale(${0.94 + progress * 0.06})
                  `,
                  fontFamily: "Inter, sans-serif",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#7c5cfc",
                    marginBottom: 14,
                    textTransform: "uppercase",
                  }}
                >
                  {panel.title}
                </div>

                <div
                  style={{
                    fontSize: 16,
                    lineHeight: 1.5,
                    color: "#292735",
                  }}
                >
                  {panel.value}
                </div>

                {/* AI indicator */}
                <div
                  style={{
                    marginTop: 28,
                    height: 5,
                    borderRadius: 5,
                    background:
                      "linear-gradient(90deg, #7c5cfc, #c8bdf7)",
                  }}
                />
              </div>
            );
          })}
        </div>
      </AbsoluteFill>

      {/* Caption */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 85,
        }}
      >
        <AnimatedText
          segments={[
            { text: "for the " },
            {
              text: "highest quality product listings",
              color: "#7C5CFC",
            },
          ]}
          fontSize={38}
        />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};