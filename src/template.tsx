import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { timeline } from "./scenes/timeline";
import { IntroGlitch } from "./scenes/IntroGlitch";
import { ChatDemo } from "./scenes/ChatDemo";
import { MeetNexus } from "./scenes/MeetNexus";
import { CatalogReveal } from "./scenes/CatalogReveal";
import { StatementScene } from "./scenes/StatementScene";
import { LaunchMarketplace } from "./scenes/LaunchMarketplace";
import { AiAutomatesTasks } from "./scenes/Aiautomatestasks";
import { ScaleConfidence } from "./scenes/scaleConfidence";
import { ConnectFlow } from "./scenes/ConnectFlow";
import { ConnectIntro } from "./scenes/ConnectIntro";
import { FileFormats } from "./scenes/fileFormats";
import { AiAutomation } from "./scenes/aiAutomation";
import { PlatformTitle } from "./scenes/platfromTitle";
import { LogoOrbit } from "./scenes/logoOrbit";
import { MiraklAds } from "./scenes/miraklAds";
import { LogoFormation } from "./scenes/logoFormation";

/**
 * NEW CONCEPT: <Sequence>
 * This is Remotion's core composition primitive. Every scene component
 * (IntroGlitch, ChatDemo, ...) has NO idea what second of the overall
 * video it plays at — internally it always thinks it starts at frame 0
 * (that's why useCurrentFrame() inside IntroGlitch just counts 0, 1, 2...).
 *
 * <Sequence from={X} durationInFrames={Y}> is what "moves" a scene to the
 * right place on the master timeline: it renders its children, but offsets
 * what useCurrentFrame() returns inside them by `from`, and clips them to
 * only be visible for `durationInFrames`. This is exactly why the timeline
 * config file is useful — every `from`/`duration` pair here maps 1:1 to a
 * <Sequence> below.
 *
 * Practically: this is what lets you build each scene as an independent,
 * reusable, individually-testable component (you can preview ANY scene by
 * itself in Remotion Studio's timeline) instead of one giant 1800-frame
 * component with a wall of if/else on frame number.
 */
export const Template: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#111" }}>
      <Sequence from={timeline.introGlitch.from} durationInFrames={timeline.introGlitch.duration}>
        <IntroGlitch />
      </Sequence>

      <Sequence from={timeline.chatDemo.from} durationInFrames={timeline.chatDemo.duration}>
        <ChatDemo />
      </Sequence>

      <Sequence from={timeline.meetNexus.from} durationInFrames={timeline.meetNexus.duration}>
        <MeetNexus />
      </Sequence>

      <Sequence
        from={timeline.catalogReveal.from}
        durationInFrames={timeline.catalogReveal.duration}
      >
        <CatalogReveal />
      </Sequence>

      {/* --- Scenes below are StatementScene placeholders (see file for why) --- */}

      <Sequence from={timeline.aiAutomation.from} durationInFrames={timeline.aiAutomation.duration}>
        <AiAutomation />
      </Sequence>

      <Sequence from={timeline.fileFormats.from} durationInFrames={timeline.fileFormats.duration}>
        <FileFormats />
      </Sequence>

      <Sequence
        from={timeline.platformTitle.from}
        durationInFrames={timeline.platformTitle.duration}
      >
        <PlatformTitle />
      </Sequence>

      <Sequence
        from={timeline.launchMarketplace.from}
        durationInFrames={timeline.launchMarketplace.duration}
      >
        <LaunchMarketplace />
      </Sequence>

      <Sequence
        from={timeline.aiAutomatesTasks.from}
        durationInFrames={timeline.aiAutomatesTasks.duration}
      >
        <AiAutomatesTasks />
      </Sequence>

      <Sequence
        from={timeline.scaleConfidence.from}
        durationInFrames={timeline.scaleConfidence.duration}
      >
        <ScaleConfidence />
      </Sequence>

      <Sequence from={timeline.connectIntro.from} durationInFrames={timeline.connectIntro.duration}>
        <ConnectIntro />
      </Sequence>

      <Sequence from={timeline.connectFlow.from} durationInFrames={timeline.connectFlow.duration}>
        <ConnectFlow />
      </Sequence>

      <Sequence from={timeline.logoOrbit.from} durationInFrames={timeline.logoOrbit.duration}>
        <LogoOrbit />
      </Sequence>

      <Sequence from={timeline.miraklAds.from} durationInFrames={timeline.miraklAds.duration}>
        <MiraklAds />
      </Sequence>

      <Sequence from={timeline.adsRelevant.from} durationInFrames={timeline.adsRelevant.duration}>
        <StatementScene
          variant="neutral"
          segments={[{ text: "AI keeps ads", color: "#7C5CFC" }, { text: " relevant" }]}
        />
      </Sequence>

      <Sequence
        from={timeline.shoppingExperience.from}
        durationInFrames={timeline.shoppingExperience.duration}
      >
        <StatementScene
          variant="violet"
          segments={[{ text: "Shopping experience " }, { text: "enhanced", color: "#7C5CFC" }]}
        />
      </Sequence>

      <Sequence
        from={timeline.logoFormation.from}
        durationInFrames={timeline.logoFormation.duration}
      >
        <LogoFormation />
      </Sequence>

      <Sequence from={timeline.outro.from} durationInFrames={timeline.outro.duration}>
        <StatementScene variant="neutral" segments={[{ text: "The future of commerce" }]} />
      </Sequence>
    </AbsoluteFill>
  );
};