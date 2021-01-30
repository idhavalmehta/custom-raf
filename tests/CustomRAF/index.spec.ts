// import { expect } from "chai";
// import rAFDelay from "../src/rAFDelay";

// const noop = (time: number) => {};

// describe("rAFDelay", function () {
//   it("should render frames", function (done) {
//     const provider = new rAFDelay();
//     const h1 = provider.request(() => {
//       done();
//     }, 2);
//     const h2 = provider.request(() => {
//       done();
//     }, 1);
//     provider.cancel(h1);
//   });

//   it("should not render cancelled frames", function (done) {
//     const provider = new rAFDelay();
//     const h1 = provider.request(() => {
//       done();
//     }, 2);
//     const h2 = provider.request(() => {
//       done();
//     }, 1);
//     provider.cancel(h1);
//   });

//   it("should not throw error on cancelling undefined frame", function () {
//     const provider = new rAFDelay();
//     expect(provider.cancel(10)).to.not.throw;
//   });
// });
