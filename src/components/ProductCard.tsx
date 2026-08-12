import React from "react";
import { staticFile, useCurrentFrame, spring, useVideoConfig } from "remotion";

type ProductCardProps = {
  image: string;
  brand: string;
  name: string;
  price: string;
  delay?: number;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  image,
  brand,
  name,
  price,
  delay = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 180,
      stiffness: 200,
    },
  });

  return (
    <div
      style={{
        width: 300,
        opacity: progress,
        transform: `
          translateY(${(1 - progress) * 50}px)
          scale(${0.9 + progress * 0.1})
        `,
      }}
    >
      {/* Product image */}
      <div
        style={{
          height: 260,
          background: "rgba(255,255,255,0.8)",
          borderRadius: 22,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 20px 50px rgba(60,30,110,0.15)",
        }}
      >
        <img
          src={staticFile(image)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Product information */}
      <div
        style={{
          marginTop: 14,
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
            color: "#777",
            marginBottom: 5,
          }}
        >
          {brand}
        </div>

        <div
          style={{
            fontSize: 18,
            fontWeight: 600,
            color: "#20202a",
            marginBottom: 5,
          }}
        >
          {name}
        </div>

        <div
          style={{
            fontSize: 17,
            fontWeight: 700,
            color: "#7C5CFC",
          }}
        >
          {price}
        </div>
      </div>
    </div>
  );
};