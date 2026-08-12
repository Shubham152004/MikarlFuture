import { FPS } from "../constants";

/**
 * WHY THIS FILE EXISTS
 * --------------------
 * Remotion doesn't have a built-in "timeline" concept like After Effects.
 * You build one yourself: an array of {start, duration} entries, converted
 * from seconds -> frames (since Remotion always thinks in frames).
 *
 * I timestamped your reference video second-by-second and grouped it into
 * these beats. Keeping this in one file means if timing needs to shift
 * later, you change ONE number instead of hunting through JSX.
 */

const s = (seconds: number) => Math.round(seconds * FPS);

export const timeline = {
  introGlitch: { from: s(0), duration: s(1.6) }, // "The future of commerce" glitch-in
  chatDemo: { from: s(1.6), duration: s(3.4) }, // search bar -> AI reply -> product card
  meetNexus: { from: s(5.0), duration: s(3.0) }, // "Meet" / "Mirakl Nexus" + glow orb
  catalogReveal: { from: s(8.0), duration: s(1.4) }, // circle wipe -> "Mirakl Catalog"
  aiAutomation: { from: s(9.4), duration: s(3.6) }, // product-data panels + captions
  fileFormats: { from: s(13.0), duration: s(3.4) }, // supplier file-format logos
  platformTitle: { from: s(16.0), duration: s(1.2) }, // "Mirakl Platform"
  launchMarketplace: { from: s(17.2), duration: s(4.0) }, // 3D tilted catalog UI
  aiAutomatesTasks: { from: s(21.2), duration: s(3.8) }, // jacket -> data panels fan-out
  scaleConfidence: { from: s(25.0), duration: s(4.0) }, // sunglasses cards + chart
  connectIntro: { from: s(29.0), duration: s(4.4) }, // lightning bolt "Mirakl Connect"
  connectFlow: { from: s(33.4), duration: s(6.0) }, // Macy's connect + AI checklist
  logoOrbit: { from: s(39.4), duration: s(4.0) }, // radial brand-logo cluster
  miraklAds: { from: s(43.4), duration: s(3.6) }, // play icon + revenue chart
  adsRelevant: { from: s(47.0), duration: s(2.4) }, // "AI keeps ads relevant"
  shoppingExperience: { from: s(49.4), duration: s(4.0) }, // sponsored UI + search + card
  logoFormation: { from: s(53.4), duration: s(6.0) }, // 3D rotating shield -> MIRAKL
  outro: { from: s(59.4), duration: s(0.6) }, // closing "The future of commerce"
};

export type SceneKey = keyof typeof timeline;