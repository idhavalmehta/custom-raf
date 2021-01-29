import { DURATION } from "./shared/constants";
import { IDelayedAnimationFrame, IDelayedAnimationFrameCallback } from "./shared/interfaces";

const QUEUE: number[][] = [];
const FRAMES = new Map<number, IDelayedAnimationFrame>();

let lastTime = 0;

const generateHandle = (): number => {
  return FRAMES.size + 1;
};

const initializeAnimationQueue = (delay: number) => {
  if (QUEUE[delay]) {
    return;
  }
  for (let i = 0; i <= delay; i++) {
    if (!QUEUE[i]) {
      QUEUE[i] = [];
    }
  }
};

const registerDelayedAnimationFrame = (callback: IDelayedAnimationFrameCallback, delay: number): number => {
  const handle = generateHandle();
  const animationFrame: IDelayedAnimationFrame = {
    handle,
    callback,
    delay,
    cancelled: false,
  };
  initializeAnimationQueue(delay);
  QUEUE[delay].push(handle);
  FRAMES.set(handle, animationFrame);
  return handle;
};

const processDelayedAnimationFrames = (timestamp: number) => {
  const currentQueue = QUEUE.shift();
  const isLast = !QUEUE[0];
  if (currentQueue) {
    currentQueue.forEach((handle) => {
      const frame = FRAMES.get(handle);
      if (!frame.cancelled) {
        frame.callback(timestamp);
      }
    });
  }
  if (!isLast) {
    startNextTickTimer();
  } else if (QUEUE.length === 0) {
    console.log("the end");
  }
};

const startNextTickTimer = () => {
  const currentTime = performance.now();
  const nextDuration = Math.max(0, DURATION - (currentTime - lastTime));
  const nextTime = currentTime + nextDuration;
  setTimeout(() => {
    lastTime = nextTime;
    processDelayedAnimationFrames(nextTime);
  }, nextDuration);
};

export const requestDelayedAnimationFrame = (callback: IDelayedAnimationFrameCallback, delay: number): number => {
  if (QUEUE.length === 0) {
    startNextTickTimer();
  }
  return registerDelayedAnimationFrame(callback, delay);
};

export const cancelDelayedAnimationFrame = (handle: number): void => {
  const animationFrame = FRAMES.get(handle);
  if (!animationFrame) {
    return;
  }
  animationFrame.cancelled = true;
};
