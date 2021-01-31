import { expect } from "chai";
import AnimationClock from "../../src/modules/clock";

const FPS = 60;

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
