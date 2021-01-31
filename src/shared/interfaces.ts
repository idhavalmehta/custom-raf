import { AnimationCallback, Handle } from "./types";

export interface IAnimationFrame {
  handle: Handle;
  callback: AnimationCallback;
  delay: number;
  cancelled: boolean;
}
