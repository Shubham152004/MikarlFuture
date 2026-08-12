import { Composition } from "remotion";
import { Template } from "./template";
import { FPS, DURATION_IN_FRAMES, VIDEO_WIDTH, VIDEO_HEIGHT } from "./constants";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/*
        <Composition> is Remotion's version of "define a video export".
        - id: the name you'll see in Remotion Studio's sidebar and use in
          the render CLI command (`remotion render ... MiraklFutureOfCommerce`)
        - component: the React component that will be rendered frame-by-frame
        - durationInFrames / fps / width / height: these are NOT just player
          settings -- Remotion actually re-renders your component once per
          frame at these exact dimensions to produce the final video.
      */}
      <Composition
        id="MiraklFutureOfCommerce"
        component={Template}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        width={VIDEO_WIDTH}
        height={VIDEO_HEIGHT}
      />
    </>
  );
};