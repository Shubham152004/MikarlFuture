/**
 * Shared constants live here on purpose, in their own file with zero
 * imports of their own. Root.tsx and timeline.ts BOTH need these values,
 * and if timeline.ts had imported them from Root.tsx directly, we'd get a
 * circular import: Root -> Template -> timeline -> Root.
 *
 * Rule of thumb: constants/config that multiple files across different
 * "layers" of your app need should live in their own leaf file, not in
 * whichever file happened to define them first.
 */
export const FPS = 30;
export const DURATION_IN_FRAMES = 1800;
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;