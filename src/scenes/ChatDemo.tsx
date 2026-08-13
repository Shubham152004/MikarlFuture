import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig,staticFile } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { useEntrance } from "../components/useEntrance";

const FULL_QUERY =
  "Find me a red stylish ski jacket for a trip to Colorado with my family. My budget is $400, and I need it by January 20.";

/**
 * NEW CONCEPT: typewriter effect via interpolate() + string slicing
 * There's no special Remotion API for "type on" text — you just compute
 * how many characters SHOULD be visible at the current frame, and slice
 * the string. interpolate(frame, [inputRange], [outputRange]) is Remotion's
 * general-purpose "map a number from one range to another" utility — the
 * same tool used for opacity/position/scale is used here for character count.
 */
export const ChatDemo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const charsVisible = Math.floor(
    interpolate(frame, [8, 70], [0, FULL_QUERY.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );
  const typedText = FULL_QUERY.slice(0, charsVisible);

  // Product card enters after the sentence has finished typing.
  const card = useEntrance(75);

  const containerOpacity = interpolate(frame, [0, 8], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <GradientBackground variant="neutral" />
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: containerOpacity,
        }}
      >
        <div style={{ width: 760, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* --- Search / chat input bubble --- */}
          <div
            style={{
              background: "#ffffff",
              borderRadius: 28,
              padding: "22px 28px",
              boxShadow: "0 20px 60px rgba(90, 60, 150, 0.18)",
              display: "flex",
              alignItems: "center",
              gap: 16,
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
              fontSize: 20,
              color: "#2a2a35",
            }}
          >
            <PlusIcon />
            <div style={{ flex: 1, minHeight: 28 }}>
              {typedText}
              {charsVisible < FULL_QUERY.length && charsVisible > 0 && (
                <span style={{ opacity: frame % 20 < 10 ? 1 : 0 }}>|</span>
              )}
            </div>
            <MicIcon />
            <SendButton />
          </div>

          {/* --- AI product recommendation card --- */}
          <div
            style={{
              opacity: card.opacity,
              transform: `translateY(${card.translateY}px)`,
              background: "#ffffff",
              borderRadius: 20,
              padding: 20,
              boxShadow: "0 20px 60px rgba(90, 60, 150, 0.14)",
              display: "flex",
              gap: 18,
              alignItems: "center",
              fontFamily: "'Inter', 'Helvetica Neue', sans-serif",
            }}
          >
            <div
              style={{
                width: 84,
                height: 84,
                borderRadius: 14,
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                flexShrink: 0,
              }}
            >
              <img
                src={staticFile("jacket.png")}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: "#8a8a95", fontWeight: 600, letterSpacing: 0.4 }}>
                ZADIG &amp; VOLTAIRE
              </div>
              <div style={{ fontSize: 17, color: "#232230", marginTop: 2 }}>
                Bright red solid color puffer ski jacket
              </div>
            </div>
            <div style={{ fontSize: 19, fontWeight: 600, color: "#232230" }}>$349.99</div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

const PlusIcon: React.FC = () => (
  <div
    style={{
      width: 22,
      height: 22,
      borderRadius: "50%",
      border: "1.5px solid #c8c8d2",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 14,
      color: "#8a8a95",
      flexShrink: 0,
    }}
  >
    +
  </div>
);

const MicIcon: React.FC = () => (
  <div style={{ width: 18, height: 18, borderRadius: 4, background: "#c8c8d2", flexShrink: 0 }} />
);

const SendButton: React.FC = () => (
  <div
    style={{
      width: 32,
      height: 32,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #7c5cfc, #5a3ce0)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: 16,
      flexShrink: 0,
    }}
  >
    ↑
  </div>
);
