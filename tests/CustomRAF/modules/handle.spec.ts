import { expect } from "chai";
import AnimationHandle from "../../../src/CustomRAF/modules/handle";

describe("AnimationHandle", function () {
  let animationHandle: AnimationHandle;

  this.beforeEach(function () {
    animationHandle = new AnimationHandle();
  });

  it("should return a number", function () {
    expect(animationHandle.generate()).to.be.a("number");
  });

  it("should always increment", function () {
    const handles = [
      animationHandle.generate(),
      animationHandle.generate(),
      animationHandle.generate(),
    ];
    expect(handles).to.have.ordered.members([1, 2, 3]);
  });
});
