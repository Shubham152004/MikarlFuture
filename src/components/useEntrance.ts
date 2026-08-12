import { spring, useCurrentFrame, useVideoConfig } from "remotion";

/**
 * useEntrance — the single animation primitive almost every scene uses.
 *
 * Two Remotion concepts at play here:
 *
 * 1. useCurrentFrame() — Remotion re-renders your component ONCE PER FRAME.
 *    Each render, this hook returns a different integer (0, 1, 2, ...).
 *    Everything in Remotion is driven by reading this number and computing
 *    styles from it — there is no "requestAnimationFrame loop" like in a
 *    normal web animation; the renderer just calls your component 1800
 *    times (for a 60s/30fps video) and screenshots each result.
 *
 * 2. spring() — converts a frame number into a 0->1 progress value that
 *    follows physical spring motion (with momentum/overshoot) instead of a
 *    linear ramp. It's Remotion's equivalent of a CSS `cubic-bezier` easing
 *    curve, but physically simulated, which is what gives the reference
 *    video's text/cards that slightly "bouncy settle" feel instead of a
 *    robotic linear fade.
 *
 * `delay` lets us stagger multiple elements off one scene's start frame,
 * which is how the word-by-word / line-by-line reveals are built.
 */
export const useEntrance = (
  delay = 0,
  config?: { damping?: number; stiffness?: number; mass?: number; translateY?: number; }
) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: config?.damping ?? 200, // higher = less bounce/overshoot
      stiffness: config?.stiffness ?? 210, // higher = snappier/faster settle
      mass: config?.mass ?? 0.9,

    },
  });

  return {
    progress, // raw 0->1, use for custom interpolations
    opacity: progress,
    blurPx: (1 - progress) * 8, // starts blurred, settles to sharp
    translateY: (1 - progress) * (config?.translateY ?? 40), // starts down, settles to 0
    scale: 0.96 + progress * 0.04, // starts at 96%, settles to 100%
  };
};
