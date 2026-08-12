import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, random } from "remotion";
import { GradientBackground } from "../components/GradientBackground";

/**
 * Reproduces the opening beat: "The future of commerce" appears as
 * horizontal glitch-streaks that settle into clean, sharp type.
 *
 * NEW CONCEPT: random(seed)
 * Remotion's random() is a DETERMINISTIC pseudo-random function — the same
 * seed always returns the same number, on every machine, every render.
 * This matters because video rendering can happen frame-by-frame, out of
 * order, across multiple parallel processes — Math.random() would give you
 * a different (flickering, inconsistent) result each time a frame is
 * re-rendered. random("band-3") always returns the same value, so the
 * "randomness" you see is actually a fixed, repeatable pattern.
 */
export const IntroGlitch: React.FC = () => {
  const frame = useCurrentFrame();

  // Progress from "fully glitched" (0) to "fully settled" (1) over ~40 frames.
  const settle = interpolate(frame, [0, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const bandCount = 9;
  const bands = new Array(bandCount).fill(0).map((_, i) => {
    // Each horizontal band gets its own random max-offset and random
    // "settle speed" so they don't all snap into place in unison.
    const maxOffset = random(`band-offset-${i}`) * 260 - 130;
    const speedJitter = 0.6 + random(`band-speed-${i}`) * 0.8;
    const bandSettle = Math.min(1, settle * speedJitter);
    const offset = maxOffset * (1 - bandSettle);
    const opacity = interpolate(bandSettle, [0, 0.3, 1], [0.15, 0.6, 1]);
    return { offset, opacity };
  });

  const overallOpacity = interpolate(frame, [0, 12], [0, 1], {
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
          opacity: overallOpacity,
        }}
      >
        <div
          style={{
            position: "relative",
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 64,
            color: "#232230",
            height: bandCount * 14,
          }}
        >
          {/*
            The glitch illusion: we stack the SAME text `bandCount` times,
            each copy clipped to a thin horizontal strip (via clip-path
            inset), and shift each strip independently on the X axis. As
            `offset` animates to 0 for every band, the strips line back up
            into one clean line of text.
          */}
          {bands.map((band, i) => {
            const stripHeight = 100 / bandCount;
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  whiteSpace: "nowrap",
                  transform: `translateX(${band.offset}px)`,
                  opacity: band.opacity,
                  clipPath: `polygon(0% ${i * stripHeight}%, 100% ${
                    i * stripHeight
                  }%, 100% ${(i + 1) * stripHeight}%, 0% ${(i + 1) * stripHeight}%)`,
                }}
              >
                The future of commerce
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
