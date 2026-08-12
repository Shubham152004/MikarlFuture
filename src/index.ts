import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

// This is the ONLY file Remotion's CLI/Studio actually boots from.
// registerRoot() tells Remotion "here is the top-level React component
// that lists all my compositions" -- think of it like ReactDOM.render's
// entry point, but for a video renderer instead of a browser.
registerRoot(RemotionRoot);
