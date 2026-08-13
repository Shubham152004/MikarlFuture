import React from "react";
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";
import { GradientBackground } from "../components/GradientBackground";
import { AnimatedText } from "../components/AnimatedText";
import { ProductCard } from "../components/ProductCard";


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
  {
    name: "Heavy Jacket",
    brand: "Zadig & Voltaire",
    price: "$349.99",
    image: "/jacket.png",
  },
  {
    name: "Floral Dress",
    brand: "Olivia",
    price: "$49.99",
    image: "/frock.png",
  },
  {
    name: "Hiking Bag",
    brand: "Mirakl",
    price: "$65",
    image: "/hikingbag.png",
  },
  {
    name: "Wool Skirt",
    brand: "Fashion Co.",
    price: "$52",
    image: "/frock.png",
  },
  {
    name: "Picnic Hat",
    brand: "Summer Edit",
    price: "$28",
    image: "/jacket.png",
  },
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
                    <ProductCard
                      name={p.name}
                      price={p.price}
                      image={p.image}
                      brand={p.brand}
                    />
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