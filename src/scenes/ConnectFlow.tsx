import React from "react";
import { AbsoluteFill, useCurrentFrame, spring, useVideoConfig } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";

/**
 * A checklist where items check off one-by-one over time — structurally
 * the exact same idea as a todo list, just driven by `frame` instead of
 * user clicks. Each item independently asks: "has enough time passed for
 * ME to be checked yet?" via its own delay, same stagger pattern we've
 * used for text words and fan-out panels.
 */
const ITEMS = [
  { label: "Select your products", checkFrame: 10 },
  { label: "Manage your prices", checkFrame: 28 },
  { label: "Activate price and stock synchronization", checkFrame: 46 },
  { label: "Transform your products with Mirakl AI", checkFrame: 64 },
];

export const ConnectFlow: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill>
      <GradientBackground variant="neutral" />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 160 }}>
        <AnimatedText
          segments={[{ text: "AI accelerates", color: "#7C5CFC" }, { text: " your listing" }]}
        />
      </AbsoluteFill>

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingTop: 60 }}>
        <div
          style={{
            width: 560,
            background: "#ffffff",
            borderRadius: 16,
            padding: 28,
            boxShadow: "0 30px 70px rgba(60,30,110,0.16)",
            display: "flex",
            flexDirection: "column",
            gap: 18,
            fontFamily: "'Inter', sans-serif",
          }}
        >
          {ITEMS.map((item) => (
            <ChecklistRow key={item.label} label={item.label} checkFrame={item.checkFrame} frame={frame} />
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const ChecklistRow: React.FC<{ label: string; checkFrame: number; frame: number }> = ({
  label,
  checkFrame,
  frame,
}) => {
  const { fps } = useVideoConfig();

  // isChecked flips to true once we've passed this row's checkFrame.
  // Below that frame, `progress` is 0 (empty box). At/after it, `spring()`
  // animates the checkmark popping in.
  const checkProgress = spring({
    frame: frame - checkFrame,
    fps,
    config: { damping: 12, stiffness: 300, mass: 0.6 }, // low damping = a little "pop" overshoot
  });
  const isChecked = frame >= checkFrame;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <div
        style={{
          width: 22,
          height: 22,
          borderRadius: 6,
          border: isChecked ? "none" : "2px solid #d8d5e0",
          background: isChecked ? "#1c1b24" : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isChecked && (
          <svg
            width={12}
            height={12}
            viewBox="0 0 12 12"
            style={{
              // The checkmark draws itself in using strokeDasharray/offset —
              // same "reveal a path over time" trick used for progress rings.
              opacity: checkProgress,
              transform: `scale(${0.6 + checkProgress * 0.4})`,
            }}
          >
            <path
              d="M2 6 L5 9 L10 3"
              stroke="white"
              strokeWidth={1.8}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
      <div
        style={{
          fontSize: 16,
          color: isChecked ? "#1c1b24" : "#a8a5b0",
          fontWeight: isChecked ? 600 : 400,
        }}
      >
        {label}
      </div>
    </div>
  );
};