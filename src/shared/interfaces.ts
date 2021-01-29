export interface IDelayedAnimationFrameCallback {
  (time: number): void;
}

export interface IDelayedAnimationFrame {
  handle: number;
  callback: IDelayedAnimationFrameCallback;
  delay: number;
  cancelled: boolean;
}
