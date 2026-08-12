import React from "react";
import { AbsoluteFill } from "remotion";

type Props = {
  variant?: "neutral" | "violet" | "dark";
};

/**
 * AbsoluteFill is a Remotion helper component — literally just a <div> with
 * position:absolute; top:0; left:0; right:0; bottom:0. Since every scene is
 * layered by Remotion's <Sequence> (covered in template.tsx), each scene
 * needs to fill the whole frame itself; AbsoluteFill saves you retyping
 * that CSS everywhere.
 *
 * The reference video uses a soft, almost-white gradient wash that subtly
 * shifts hue between scenes (grey/neutral for UI-mockup scenes, pink-violet
 * for the big statement-text scenes). We model that with one component and
 * a `variant` prop rather than copy-pasting gradient CSS into every scene.
 */
export const GradientBackground: React.FC<Props> = ({ variant = "neutral" }) => {
  const gradients: Record<string, string> = {
    neutral:
      "radial-gradient(120% 100% at 50% 0%, #f4f3f6 0%, #e9e7ee 45%, #d8d5e0 100%)",
    violet:
      "radial-gradient(120% 120% at 50% 20%, #f6f1fb 0%, #ece3f6 35%, #dcd0ee 70%, #cfc2e6 100%)",
    dark: "radial-gradient(120% 100% at 50% 30%, #2b2a35 0%, #1c1b24 60%, #131219 100%)",
  };

  return (
    <AbsoluteFill
      style={{
        background: gradients[variant],
      }}
    />
  );
};
