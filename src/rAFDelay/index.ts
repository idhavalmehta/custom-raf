import { IAnimationFrame } from "./shared/interfaces";
import { AnimationCallback, Handle } from "./shared/types";
import AnimationClock from "./modules/clock";
import AnimationFrames from "./modules/frames";
import AnimationHandle from "./modules/handle";
import AnimationQueue from "./modules/queue";

export default class rAFDelay {
  private _clock: AnimationClock;
  private _handle: AnimationHandle;
  private _queue: AnimationQueue;
  private _frames: AnimationFrames;

  constructor() {
    this._clock = new AnimationClock(60);
    this._handle = new AnimationHandle();
    this._queue = new AnimationQueue();
    this._frames = new AnimationFrames();
  }

  request(callback: AnimationCallback, delay: number = 0): number {
    if (this._queue.length === 0) {
      this._clock.nextTick(this.render);
    }
    const handle = this._handle.generate();
    const frame: IAnimationFrame = {
      handle,
      callback,
      delay,
      cancelled: false,
    };
    this._frames.register(handle, frame);
    this._queue.add(handle, delay);
    return handle;
  }

  cancel(handle: Handle): void {
    const frame = this._frames.get(handle);
    if (!frame) {
      return;
    }
    frame.cancelled = true;
  }

  private render = (time: number): void => {
    if (!this._queue.length) {
      return;
    }
    const currentQueue = this._queue.shift();
    currentQueue.forEach((handle) => {
      const frame = this._frames.get(handle);
      if (!frame.cancelled) {
        frame.callback(time);
      }
    });
    if (this._queue.length) {
      this._clock.nextTick(this.render);
    }
  };
}
