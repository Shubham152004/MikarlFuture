import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { GradientBackground } from "../components/GradientBackground";

// Meet fades out while Mirakl Nexus enters at frame 25.
export const MeetNexus: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const meetProgress = spring({ frame, fps, config: { damping: 200, stiffness: 200 } });
  const meetOpacity = interpolate(frame, [0, 15, 22, 32], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const meetScale = 0.9 + meetProgress * 0.1;

  const nexusProgress = spring({
    frame: frame - 25,
    fps,
    config: { damping: 200, stiffness: 180 },
  });
  const nexusOpacity = nexusProgress;
  const nexusScale = 0.94 + nexusProgress * 0.06;

  // Orb pulse: a gentle sine-like breathing loop using a plain sine wave.
  // Remotion doesn't need a special "loop" API for this — frame is just a
  // number, so any periodic math function (Math.sin) naturally loops.
  const pulse = 1 + Math.sin(frame / 10) * 0.06;
  const glowOpacity = 0.6 + Math.sin(frame / 10) * 0.25;

  return (
    <AbsoluteFill>
      <GradientBackground variant="violet" />
      <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
        {meetOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              opacity: meetOpacity,
              transform: `scale(${meetScale})`,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontStyle: "italic",
              fontSize: 72,
              color: "#5a3ce0",
            }}
          >
            Meet
          </div>
        )}

        {nexusOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              opacity: nexusOpacity,
              transform: `scale(${nexusScale})`,
              display: "flex",
              alignItems: "center",
              gap: 28,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              fontSize: 56,
              color: "#232230",
            }}
          >
            <span>Mirakl</span>
            <div
              style={{
                position: "relative",
                width: 64,
                height: 64,
                transform: `scale(${pulse})`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: -20,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle, rgba(124,92,252,0.55) 0%, rgba(124,92,252,0) 70%)",
                  opacity: glowOpacity,
                  filter: "blur(6px)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 6,
                  borderRadius: "50%",
                  background:
                    "radial-gradient(circle at 35% 30%, #ffffff, #cfc2f5 40%, #7c5cfc 100%)",
                  boxShadow: "0 0 24px rgba(124,92,252,0.6)",
                }}
              />
            </div>
            <span>Nexus</span>
          </div>
        )}
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
