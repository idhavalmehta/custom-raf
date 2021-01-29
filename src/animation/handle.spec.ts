import { expect } from "chai";
import AnimationHandle from "./handle";

describe("AnimationHandle", function () {
  it("should equal 1 after 1 generations", function () {
    const animationHandle = new AnimationHandle();
    const handle = animationHandle.generate();
    expect(handle).to.equal(1);
  });

  it("should equal 5 after 5 generations", function () {
    const animationHandle = new AnimationHandle();
    animationHandle.generate();
    animationHandle.generate();
    animationHandle.generate();
    animationHandle.generate();
    const handle = animationHandle.generate();
    expect(handle).to.equal(5);
  });
});
