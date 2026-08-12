import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";

/**
 * NEW CONCEPT: real CSS 3D transforms (perspective + rotateX)
 * Everything up to now has been 2D (translateY, scale, opacity). The
 * reference video tilts UI screenshots back in 3D space, like they're
 * lying on a table tipped toward camera. Three CSS properties do this:
 *
 * 1. perspective — set on the PARENT. It's the "distance from the eye to
 *    the screen." Smaller number = more extreme/dramatic 3D distortion,
 *    larger number = subtler. Without this, rotateX just squishes flat.
 * 2. transform-style: preserve-3d — set on the PARENT. Tells the browser
 *    "let children actually exist in 3D space" instead of flattening them.
 * 3. transform: rotateX(deg) — set on the CHILD you want tilted.
 *
 * This is plain CSS, not a Remotion-specific API — Remotion just happens
 * to render real CSS in real Chrome, so any 3D CSS trick works here.
 */
export const LaunchMarketplace: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const enter = spring({ frame, fps, config: { damping: 200, stiffness: 120 } });

  // Tilt starts more extreme (40deg) and eases to a resting tilt (18deg),
  // mimicking the reference's slow "settle into place" motion.
  const rotateX = interpolate(enter, [0, 1], [40, 18]);
  const translateY = interpolate(enter, [0, 1], [120, 0]);
  const opacity = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Product cards inside the mockup stagger in after the panel itself lands.
  const products = [
    { name: "Heavy Jacket", price: "$89" },
    { name: "Trekking Poles", price: "$45" },
    { name: "Hiking Bag", price: "$65" },
    { name: "Wool Skirt", price: "$52" },
    { name: "Picnic Hat", price: "$28" },
  ];

  return (
    <AbsoluteFill>
      <GradientBackground variant="violet" />

      <AbsoluteFill style={{ alignItems: "center", justifyContent: "flex-start", paddingTop: 140 }}>
        <AnimatedText
          segments={[
            { text: "Launch a marketplace or dropship program with " },
            { text: "Mirakl", color: "#7C5CFC" },
          ]}
          fontSize={40}
        />
      </AbsoluteFill>

      {/* The `perspective` container — this is what makes rotateX below
          look like real depth instead of a flat squash. */}
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingTop: 160,
          perspective: 1400,
        }}
      >
        <div
          style={{
            width: 980,
            opacity,
            transform: `rotateX(${rotateX}deg) translateY(${translateY}px)`,
            transformStyle: "preserve-3d",
            transformOrigin: "center bottom",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 16,
              boxShadow: "0 60px 120px rgba(60, 30, 110, 0.35)",
              overflow: "hidden",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            {/* Toolbar */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "14px 24px",
                borderBottom: "1px solid #eee",
                fontSize: 13,
                color: "#555",
              }}
            >
              <span>Trending Styles Collection</span>
              <span style={{ background: "#1a1a24", color: "white", padding: "4px 12px", borderRadius: 6 }}>
                Sort By: New Arrivals
              </span>
            </div>

            {/* Product grid */}
            <div style={{ display: "flex", padding: 20, gap: 16 }}>
              {products.map((p, i) => {
                const cardDelay = 18 + i * 4;
                const cardProgress = spring({
                  frame: frame - cardDelay,
                  fps,
                  config: { damping: 200, stiffness: 220 },
                });
                return (
                  <div
                    key={p.name}
                    style={{
                      flex: 1,
                      opacity: cardProgress,
                      transform: `translateY(${(1 - cardProgress) * 16}px)`,
                    }}
                  >
                    <div
                      style={{
                        height: 130,
                        borderRadius: 10,
                        background: `hsl(${(i * 47) % 360}, 30%, 88%)`,
                        marginBottom: 8,
                      }}
                    />
                    <div style={{ fontSize: 12, color: "#222", fontWeight: 600 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#888" }}>{p.price}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};