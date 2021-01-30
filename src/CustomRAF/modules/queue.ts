import { Handle } from "../shared/types";

export default class AnimationQueue {
  private _queue: { [key: number]: Handle[] };

  private _head: number;
  private _tail: number;

  length: number;

  constructor() {
    this._queue = {};
    this._head = 0;
    this._tail = 0;
    this.length = 0;
  }

  add(value: Handle, delay: number = 0): void {
    const index = this._head + delay;
    if (this._tail <= index) {
      for (let i = this._tail; i <= index; i++) {
        if (!this._queue[i]) {
          this._queue[this._tail] = [];
          this._tail++;
        }
      }
    }
    this._queue[index].push(value);
    this.updateLength();
  }

  shift(): Handle[] | undefined {
    if (this.length === 0) {
      return undefined;
    }
    const value = this._queue[this._head];
    delete this._queue[this._head];
    this._head++;
    this.updateLength();
    return value;
  }

  private updateLength(): void {
    this.length = this._tail - this._head;
    if (this.length === 0) {
      this._head = 0;
      this._tail = 0;
    }
  }

  public state(): Handle[][] {
    const result = [];
    for (let i = this._head; i < this._tail; i++) {
      result.push(this._queue[i]);
    }
    return result;
  }
}
