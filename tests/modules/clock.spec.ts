import { expect } from "chai";
import AnimationClock from "../../src/rAFDelay/modules/clock";
import { INextTick } from "../../src/rAFDelay/shared/interfaces";

const now = require("performance-now");

const FPS = 60;
const TICKS = 3;
const DELTA = 2;

const closeTo = (value: number, ideal: number, delta: number): boolean => {
  return value >= ideal - delta && value <= ideal + delta;
};

describe("AnimationClock", function () {
  let animationClock: AnimationClock;

  this.beforeEach(function () {
    animationClock = new AnimationClock(FPS);
  });

  it("should return correct fps", function () {
    const expectedFPS = FPS;
    const actualFPS = animationClock.getFPS();
    expect(actualFPS).to.equal(expectedFPS);
  });

  it("should return correct delay", function () {
    const expectedDelay = 1000 / FPS;
    const actualDelay = animationClock.getDelay();
    expect(actualDelay).to.equal(expectedDelay);
  });
});
