import React from "react";
import { useCurrentFrame, useVideoConfig, spring } from "remotion";

type Segment = { text: string; color?: string; weight?: number };

type Props = {
  segments: Segment[]; // e.g. [{text: "for the "}, {text: "highest quality", color: "#7C5CFC"}]
  fontSize?: number;
  startDelay?: number; // frames, relative to this scene's own start
  align?: "left" | "center";
};

/**
 * This is the component behind almost every big caption in the reference:
 * "AI-powered automation", "for the highest quality product listings", etc.
 *
 * Two techniques combine here:
 *
 * 1. WORD-LEVEL STAGGER — instead of animating the whole sentence as one
 *    block (which reads as "static text that pops"), each word gets its
 *    own spring() with an incrementally later start frame. That's what
 *    produces the left-to-right "rolling" reveal you see in the video.
 *
 * 2. filter: blur() — the words come in visibly out-of-focus and sharpen
 *    as they settle. CSS filters work exactly the same in Remotion as in
 *    a browser (Remotion literally renders your component in a headless
 *    Chromium and screenshots it), so any CSS trick you already know is
 *    fair game.
 */
export const AnimatedText: React.FC<Props> = ({
  segments,
  fontSize = 56,
  startDelay = 0,
  align = "center",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Flatten segments into individual words while remembering which
  // segment (and thus which color) each word belongs to.
  const words: { text: string; color?: string; weight?: number }[] = [];
  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w, i, arr) => {
      words.push({
        text: w + (i < arr.length - 1 ? " " : ""),
        color: seg.color,
        weight: seg.weight,
      });
    });
  });

  const staggerFrames = 2.5; // frames between each word's animation start

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: align === "center" ? "center" : "flex-start",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        fontSize,
        lineHeight: 1.25,
        color: "#1a1a24",
        maxWidth: 900,
        textAlign: align,
      }}
    >
      {words.map((w, i) => {
        const wordDelay = startDelay + i * staggerFrames;
        const progress = spring({
          frame: frame - wordDelay,
          fps,
          config: { damping: 200, stiffness: 200, mass: 0.8 },
        });
        const opacity = progress;
        const blur = (1 - progress) * 6;
        const translateY = (1 - progress) * 14;

        return (
          <span
            key={i}
            style={{
              opacity,
              filter: `blur(${blur}px)`,
              transform: `translateY(${translateY}px)`,
              color: w.color ?? "inherit",
              fontWeight: w.weight ?? 400,
              fontStyle: w.color ? "italic" : "normal",
              whiteSpace: "pre",
            }}
          >
            {w.text}
          </span>
        );
      })}
    </div>
  );
};
