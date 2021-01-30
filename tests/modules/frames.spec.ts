import { expect } from "chai";
import { IAnimationFrame } from "../../src/rAFDelay/shared/interfaces";
import { Handle } from "../../src/rAFDelay/shared/types";
import AnimationFrames from "../../src/rAFDelay/modules/frames";

describe("AnimationFrames", function () {
  let animationFrames: AnimationFrames;

  this.beforeEach(function () {
    animationFrames = new AnimationFrames();
  });

  it("should register frame without throwing error", function () {
    const frame: IAnimationFrame = {
      handle: 1,
      callback: () => {},
      delay: 0,
      cancelled: false,
    };
    expect(animationFrames.register(frame.handle, frame)).to.not.throw;
  });

  it("should return undefined if handle does not exist", function () {
    const actualFrame = animationFrames.get(1);
    expect(actualFrame).to.be.undefined;
  });

  it("should return correct frame if handle exists", function () {
    const handle: Handle = 1;
    const expectedFrame: IAnimationFrame = {
      handle,
      callback: () => {},
      delay: 0,
      cancelled: false,
    };
    animationFrames.register(handle, expectedFrame);
    const actualFrame = animationFrames.get(handle);
    expect(actualFrame).to.deep.equal(expectedFrame);
  });
});