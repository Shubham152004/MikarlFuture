import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  spring,
  useVideoConfig,
} from "remotion";
import { GradientBackground } from "../components/GradientBackground";

export const LogoOrbit: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: {
      damping: 180,
      stiffness: 150,
    },
  });

  const logos = [
    { name: "Macy's", angle: 0 },
    { name: "Nike", angle: 60 },
    { name: "Adidas", angle: 120 },
    { name: "Target", angle: 180 },
    { name: "Walmart", angle: 240 },
    { name: "Amazon", angle: 300 },
  ];

  return (
    <AbsoluteFill>
      <GradientBackground variant="violet" />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Central connection point */}
        <div
          style={{
            position: "absolute",
            width: 110,
            height: 110,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, #ffffff 0%, #cfc2f5 40%, #7c5cfc 100%)",
            boxShadow: "0 0 50px rgba(124,92,252,0.45)",
            opacity: progress,
            transform: `scale(${0.6 + progress * 0.4})`,
          }}
        />

        {/* Brand logos */}
        {logos.map((logo, index) => {
          const logoProgress = spring({
            frame: frame - 8 - index * 3,
            fps,
            config: {
              damping: 180,
              stiffness: 170,
            },
          });

          const radius = 260;

          const angle =
            (logo.angle * Math.PI) / 180;

          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;

          return (
            <div
              key={logo.name}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `
                  translate(
                    calc(-50% + ${x * logoProgress}px),
                    calc(-50% + ${y * logoProgress}px)
                  )
                  scale(${0.7 + logoProgress * 0.3})
                `,
                opacity: logoProgress,
                background: "#ffffff",
                borderRadius: 16,
                padding: "14px 22px",
                boxShadow: "0 18px 45px rgba(80,50,130,0.16)",
                fontFamily: "Inter, sans-serif",
                fontSize: 16,
                fontWeight: 600,
                color: "#292735",
                whiteSpace: "nowrap",
              }}
            >
              {logo.name}
            </div>
          );
        })}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};