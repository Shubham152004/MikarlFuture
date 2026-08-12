import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";

/**
 * NEW CONCEPT: positioning elements with polar coordinates (trigonometry)
 * The reference fans four data cards out around a central product image
 * like points on a clock face. Rather than hand-picking 4 sets of
 * top/left pixel values, we compute each card's position from an ANGLE
 * using the classic formulas:
 *   x = centerX + radius * cos(angle)
 *   y = centerY + radius * sin(angle)
 * This is genuinely useful beyond this one scene — it's how you'd place
 * anything in a circular/radial layout (nav dots, radar charts, etc.),
 * including the brand-logo orbit scene we'll build later.
 */
export const AiAutomatesTasks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const panels = [
    { label: "Standardized Color Code", body: "Red · #B4262E", angleDeg: -150 },
    { label: "Suggested Styling", body: "Pair with warm layers and boots.", angleDeg: -30 },
    { label: "Features & Benefits", body: "Water-resistant shell, thermal lining.", angleDeg: 150 },
    { label: "Extracted Attributes", body: "Fit: Slim · Length: Hip · Closure: Zip", angleDeg: 30 },
  ];

  const radius = 320;
  const centerX = 960;
  const centerY = 620;

  return (
    <AbsoluteFill>
      <GradientBackground variant="violet" />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 140 }}>
        <AnimatedText
          segments={[{ text: "AI automates", color: "#7C5CFC" }, { text: " manual tasks" }]}
        />
      </AbsoluteFill>

      {/* Center product image */}
      <CenterProduct />

      {/* Fan-out panels, one per data point */}
      {panels.map((panel, i) => {
        const delay = 30 + i * 6;
        const progress = spring({
          frame: frame - delay,
          fps,
          config: { damping: 200, stiffness: 160 },
        });

        const angleRad = (panel.angleDeg * Math.PI) / 180;
        // Panels travel FROM the center OUT to their final radius as
        // progress goes 0->1 -- that's the "fan out" motion.
        const currentRadius = radius * progress;
        const x = centerX + currentRadius * Math.cos(angleRad);
        const y = centerY + currentRadius * Math.sin(angleRad) * 0.55; // flatten vertically

        return (
          <div
            key={panel.label}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              opacity: progress,
              width: 220,
              background: "#ffffff",
              borderRadius: 12,
              padding: 14,
              boxShadow: "0 16px 40px rgba(60,30,110,0.16)",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1a1a24", marginBottom: 4 }}>
              {panel.label}
            </div>
            <div style={{ fontSize: 11, color: "#777" }}>{panel.body}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const CenterProduct: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - 8, fps, config: { damping: 200, stiffness: 180 } });

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 40 }}>
      <div
        style={{
          opacity: progress,
          transform: `scale(${0.85 + progress * 0.15})`,
          width: 160,
          height: 160,
          borderRadius: 20,
          background: "linear-gradient(160deg, #d3373f, #a3232c)",
          boxShadow: "0 30px 60px rgba(150,30,40,0.35)",
        }}
      />
    </AbsoluteFill>
  );
};