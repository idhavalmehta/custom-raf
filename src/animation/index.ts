import { IAnimationFrame } from "../shared/interfaces";
import { AnimationCallback, Handle } from "../shared/types";
import AnimationClock from "./clock";
import AnimationFrames from "./frames";
import AnimationHandle from "./handle";
import AnimationQueue from "./queue";

export default class Animation {
  private _clock: AnimationClock;
  private _handle: AnimationHandle;
  private _queue: AnimationQueue;
  private _frames: AnimationFrames;

  constructor() {
    this._clock = new AnimationClock();
    this._handle = new AnimationHandle();
    this._queue = new AnimationQueue();
    this._frames = new AnimationFrames();
  }

  rAF(callback: AnimationCallback, delay: number): number {
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

  cAF(handle: Handle): void {
    const frame = this._frames.get(handle);
    if (!frame) {
      return;
    }
    frame.cancelled = true;
  }

  private render(time: number): void {
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
  }
}
