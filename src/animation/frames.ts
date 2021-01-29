import { IAnimationFrame } from "../shared/interfaces";
import { Handle } from "../shared/types";

export default class AnimationFrames {
  private _map: Map<Handle, IAnimationFrame>;

  constructor() {
    this._map = new Map<Handle, IAnimationFrame>();
  }

  register(handle: Handle, frame: IAnimationFrame) {
    this._map.set(handle, frame);
  }

  get(handle: Handle): IAnimationFrame {
    return this._map.get(handle);
  }
}
