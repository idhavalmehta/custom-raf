// const TEMP_END_TIME = performance.now() + DURATION * 2.5; // @todo delete

import { requestDelayedAnimationFrame } from "./provider";

function noop(timestamp: number) {
  console.log("noop", timestamp);
}

// function oneTick(timestamp) {
//   console.log("oneTick", timestamp);
//   requestAnimationFrame(noop);
// }

// function tick(timestamp) {
//   console.log("tick", timestamp);
//   if (timestamp < TEMP_END_TIME) {
//     requestAnimationFrame(tick);
//   } else {
//     console.log("the end");
//   }
// }

// requestAnimationFrame(oneTick, 0);
// requestAnimationFrame(oneTick, 0);
// // requestAnimationFrame(oneTick, 4);
// requestAnimationFrame(oneTick, 0);
const handle = requestDelayedAnimationFrame(noop, 1);
// // console.log(queue);
