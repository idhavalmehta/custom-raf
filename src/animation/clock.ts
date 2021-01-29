import { DURATION } from "../shared/constants";
import { INextTick } from "../shared/interfaces";
import { AnimationCallback } from "../shared/types";

export default class AnimationClock {
  private _lastTime: number;

  constructor() {
    this._lastTime = 0;
  }

  nextTick(callback: AnimationCallback): void {
    const nextTick = this.getNextTick();
    setTimeout(() => {
      callback(nextTick.time);
    }, nextTick.delay);
  }

  getNextTick(): INextTick {
    const now = performance.now();
    const nextDelay = this._lastTime
      ? Math.max(0, DURATION - (now - this._lastTime))
      : DURATION;
    const nextTime = now + nextDelay;
    this._lastTime = nextTime;
    return {
      time: nextTime,
      delay: nextDelay,
    };
  }
}
