import { AnimationCallback } from "../shared/types";

const now = require("performance-now");

export default class AnimationClock {
  private _FPS: number;
  private _DELAY: number;

  private _lastTime: number;

  constructor(fps: number) {
    this._FPS = fps;
    this._DELAY = 1000 / fps;
    this._lastTime = 0;
  }

  getFPS(): number {
    return this._FPS;
  }

  getDelay(): number {
    return this._DELAY;
  }

  nextTick(callback: AnimationCallback): void {
    const currentTime = now();
    const nextDelay = this._lastTime
      ? this._DELAY - (currentTime - this._lastTime)
      : this._DELAY;
    const nextTime = (this._lastTime = currentTime + nextDelay);
    setTimeout(() => callback(nextTime), nextDelay);
  }
}
