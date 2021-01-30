import { expect } from "chai";
import AnimationQueue from "../../../src/CustomRAF/modules/queue";

describe("AnimationQueue", function () {
  it("should have length 0 when initialized", function () {
    const animationQueue = new AnimationQueue();
    expect(animationQueue.length).to.equal(0);
  });

  it("should add given handle in correct subQueue", function () {
    const animationQueue = new AnimationQueue();
    animationQueue.add(0, 3);
    expect(animationQueue.length).to.equal(4) &&
      expect(animationQueue.state()).to.deep.equal([[], [], [], [0]]);
  });

  it("should be empty after all subQueues processed", function () {
    const animationQueue = new AnimationQueue();
    animationQueue.add(0, 0);
    animationQueue.shift();
    expect(animationQueue.state()).to.deep.equal([]);
  });

  it("should return length 0 after all subQueues processed", function () {
    const animationQueue = new AnimationQueue();
    animationQueue.add(0, 0);
    animationQueue.shift();
    expect(animationQueue.length).to.equal(0);
  });

  it("should return undefined when empty queue is shifted", function () {
    const animationQueue = new AnimationQueue();
    const subQueue = animationQueue.shift();
    expect(subQueue).to.be.undefined;
  });

  it("should match expected state after following operations", function () {
    const animationQueue = new AnimationQueue();
    animationQueue.add(0, 0);
    animationQueue.add(0, 2);
    animationQueue.add(0, 0);
    animationQueue.add(0, 1);
    animationQueue.add(0, 1);
    animationQueue.add(0, 1);
    const expectedState = [[0, 0], [0, 0, 0], [0]];
    const actualState = animationQueue.state();
    expect(actualState).to.deep.equal(expectedState);
  });

  it("should have length 4 after following operations", function () {
    const animationQueue = new AnimationQueue();
    animationQueue.add(0, 1);
    animationQueue.add(0);
    animationQueue.add(0, 3);
    animationQueue.add(0);
    animationQueue.add(0, 1);
    animationQueue.add(0, 1);
    const expectedLength = animationQueue.length;
    const actualLength = animationQueue.state().length;
    expect(actualLength).to.equal(expectedLength).to.equal(4);
  });
});
