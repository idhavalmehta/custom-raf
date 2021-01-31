import { expect } from "chai";
import * as sinon from "sinon";
import CustomRAF from "../src";

const FPS = 60;
const FRAMERATE = 1000 / 60;

const now = require("performance-now");
const noop = (time: number): void => {};

describe("CustomRAF", function () {
  let animationProvider: CustomRAF;

  this.beforeEach(function () {
    animationProvider = new CustomRAF(FPS);
  });

  it("should request animation frame", function () {
    const handle = animationProvider.requestAnimationFrame(noop, 0);
    const frame = animationProvider.getFrames().get(handle);
    expect(frame).to.not.be.undefined;
  });

  it("should request animation frame with delay", function () {
    const handle = animationProvider.requestAnimationFrame(noop, 2);
    const frame = animationProvider.getFrames().get(handle);
    expect(frame).to.not.be.undefined;
  });

  it("should by default request animation frame with 0 delay", function () {
    const handle = animationProvider.requestAnimationFrame(noop);
    const frame = animationProvider.getFrames().get(handle);
    expect(frame).to.not.be.undefined;
    expect(frame.delay).to.equal(0);
  });

  it("should cancel animation frame", function () {
    const handle = animationProvider.requestAnimationFrame(noop);
    animationProvider.cancelAnimationFrame(handle);
    const frame = animationProvider.getFrames().get(handle);
    expect(frame.cancelled).to.equal(true);
  });

  it("should cancel animation frame with delay", function () {
    const handle = animationProvider.requestAnimationFrame(noop, 2);
    animationProvider.cancelAnimationFrame(handle);
    const frame = animationProvider.getFrames().get(handle);
    expect(frame.cancelled).to.equal(true);
  });

  it("should not throw error on cancelling undefined frame", function () {
    expect(animationProvider.cancelAnimationFrame(10)).to.not.throw;
  });

  it("should render frames at required fps", function () {
    const clock = sinon.useFakeTimers();

    const initialDelay = 2;
    const startTime = now();
    const duration = 1020; // in ms
    const stopTime = startTime + duration;
    const expectedTickCount = Math.max(
      1,
      Math.ceil(duration / FRAMERATE) - initialDelay
    );

    let lastTime = startTime + FRAMERATE * initialDelay;

    const fake = sinon.fake((currentTime: number) => {
      const actualDiff = currentTime - lastTime;
      expect(actualDiff).to.be.closeTo(FRAMERATE, 1);
      lastTime = currentTime;
      if (currentTime < stopTime) {
        return animationProvider.requestAnimationFrame(fake);
      }
    });
    animationProvider.requestAnimationFrame(fake, initialDelay);

    clock.runAll();

    expect(fake.callCount).to.equal(expectedTickCount);
    clock.restore();
  });

  it("should not render cancelled frames", function () {
    const clock = sinon.useFakeTimers();
    const fake = sinon.fake();

    const handle = animationProvider.requestAnimationFrame(fake, 2);
    animationProvider.cancelAnimationFrame(handle);

    clock.runAll();

    expect(fake.callCount).to.equal(0);
    clock.restore();
  });
});
