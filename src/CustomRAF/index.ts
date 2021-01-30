import { IAnimationFrame } from "./shared/interfaces";
import { AnimationCallback, Handle } from "./shared/types";
import AnimationClock from "./modules/clock";
import AnimationFrames from "./modules/frames";
import AnimationHandle from "./modules/handle";
import AnimationQueue from "./modules/queue";

export default class CustomRAF {
  private _clock: AnimationClock;
  private _handle: AnimationHandle;
  private _queue: AnimationQueue;
  private _frames: AnimationFrames;

  constructor(fps: number) {
    this._clock = new AnimationClock(fps);
    this._handle = new AnimationHandle();
    this._queue = new AnimationQueue();
    this._frames = new AnimationFrames();
  }

  private render = (time: number): void => {
    const currentQueue = this._queue.shift();
    const wasLastQueueBefore = this._queue.length === 0;
    if (currentQueue) {
      currentQueue.forEach((handle) => {
        const frame = this._frames.get(handle);
        if (frame.cancelled) {
          return;
        }
        frame.callback(time);
      });
    }
    const hasMoreQueuesAfter = this._queue.length !== 0;
    /**
     * If currentQueue was last queue before processing and callbacks do not requestAnimationFrame internally i.e. animation queue is now empty, end.
     * if currentQueue was last queue before processing and callbacks requestAnimationFrame internally i.e. animation queue is no longer empty, do nothing.
     * If currentQueue was not last queue before processing and callbacks do not requestAnimationFrame internally i.e. animation queue needs to be processed, call render on next tick.
     * if currentQueue was not last queue before processing and callbacks requestAnimationFrame internally i.e. animation queue needs to be processed, call render on next tick.
     */
    if (!wasLastQueueBefore && hasMoreQueuesAfter) {
      this._clock.nextTick(this.render);
    }
  };

  getFrames(): AnimationFrames {
    return this._frames;
  }

  requestAnimationFrame(
    callback: AnimationCallback,
    delay: number = 0
  ): number {
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

  cancelAnimationFrame(handle: Handle): void {
    const frame = this._frames.get(handle);
    if (!frame) {
      return;
    }
    frame.cancelled = true;
  }
}
