import { Handle } from "../shared/types";

export default class AnimationHandle {
  private _id: Handle;

  constructor() {
    this._id = 0;
  }

  generate(): Handle {
    return ++this._id;
  }
}
