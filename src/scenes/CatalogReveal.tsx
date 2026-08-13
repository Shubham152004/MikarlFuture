import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { useEntrance } from "../components/useEntrance";

export const CatalogReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const wipeRadius = interpolate(frame, [0, 14], [0, 1300], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // The icon+text block now uses our shared useEntrance hook (delay=10
  // frames after the scene starts, matching the old spring's frame - 10).
  const entrance = useEntrance(10);

  return (
    <AbsoluteFill>
      <GradientBackground variant="neutral" />

      {/* The expanding dark circle that "wipes" the previous scene away */}
      <AbsoluteFill
        style={{
          background: "#1c1b24",
          clipPath: `circle(${wipeRadius}px at 50% 50%)`,
        }}
      />

      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          opacity: entrance.opacity,
          filter: `blur(${entrance.blurPx}px)`,
          transform: `scale(${entrance.scale}) translateY(${entrance.translateY}px)`,
        }}
      >
        <div
          style={{
            width: 88,
            height: 88,
            borderRadius: 22,
            background: "#1c1b24",
            marginBottom: 24,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 34,
              height: 34,
              border: "3px solid white",
              borderRadius: 6,
            }}
          />
        </div>
        <div
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 44,
            color: "#232230",
          }}
        >
          Mirakl Catalog
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};