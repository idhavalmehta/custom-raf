// (() => {
//   let handleId = 0;
//   const queue = [];

//   const requestAnimationFrame = (callback, delay = 0) => {
//     handleId++;
//     if (queue.length === 0) {
//       setTimeout(() => {
//         const cbs = queue.slice();
//         queue.length = 0;
//         const ts = performance.now();
//         cbs.forEach((cb) => {
//           cb(ts);
//         });
//       }, delay * freq);
//     }
//     queue.push(callback);
//     return handleId;
//   };

//   const cancelAnimationFrame = (handle) => {
//     // for (var i = 0; i < queue.length; i++) {
//     //   if (queue[i].handle === handle) {
//     //     queue[i].cancelled = true;
//     //   }
//     // }
//   };

//   const step = (timestamp) => {
//     console.log("step: ", timestamp);
//     // requestAnimationFrame(step);
//   };

//   // const step1 = (timestamp) => {
//   //   console.log("step: ", timestamp);
//   //   requestAnimationFrame(step);
//   // };

//   // const step2 = (timestamp) => {
//   //   console.log("step: ", timestamp);
//   //   requestAnimationFrame(step);
//   // };

//   let play = false;
//   const button = document.getElementById("toggle");

//   let h;
//   button.onclick = () => {
//     // if (!play) {
//     //   play = true;
//     h = requestAnimationFrame(step);
//     // } else {
//     //   cancelAnimationFrame(h);
//     //   play = false;
//     // }
//   };
// })();

const FPS = 60;
const TICK_IDEAL_DURATION = 2000;

let handle = 0;
let last = 0;

const TEMP_END_TIME = performance.now() + TICK_IDEAL_DURATION * 2.5; // @todo delete

const queue = [];
const frames = {};

function initialize(delay) {
  for (let i = 0; i <= delay; i++) {
    if (queue[i]) {
      continue;
    }
    queue[i] = [];
  }
}

function nextTick() {
  console.log("enqueue");
  const now = performance.now();
  const next = Math.max(0, TICK_IDEAL_DURATION - (now - last));
  last = now + next;
  console.log("next tick at:", last);
  setTimeout(() => {
    console.log("processing tick at:", last);
    const currentQueue = queue.shift();
    console.log("current queue:", currentQueue);
    const isLast = !queue[0];
    console.log("is last:", isLast);
    let nextQueue = [];
    if (!isLast) {
      nextQueue = [...queue[0]];
      queue[0].length = 0; // temporary empty next tick queue
    }
    currentQueue.forEach((handle) => {
      const frame = frames[handle];
      console.log("process frame:", handle);
      if (!frame.cancelled) {
        frame.callback(last);
      }
    });
    if (!isLast) {
      queue[0] = [...nextQueue, ...queue[0]]; // prepend old next tick queue to new next tick queue
      console.log("pending queue:", queue);
      if (currentQueue.length === 0) {
        // manually add setTimeout for next tick
        console.log("MANUAL ENQUEUE");
        nextTick();
      }
    }
    if (queue.length === 0) {
      console.log("the end");
    }
  }, next);
}

function register(callback, delay) {
  handle++;
  frames[handle] = {
    handle,
    callback,
    delay,
    cancelled: false,
  };
  queue[delay].push(handle);
}

function requestAnimationFrame(callback, delay = 0) {
  console.log("adding frame:", delay);
  if (!queue[delay]) {
    initialize(delay);
    console.log("initialized queue:", [...queue]);
  }
  if (queue[0].length === 0) {
    nextTick();
  }
  const handleId = register(callback, delay);
  console.log("updated queue:", [...queue]);
  return handleId;
}

function cancelAnimationFrame(handle) {
  const frame = frames[handle];
  if (!frame) {
    return;
  }
  frame.cancelled = true;
}

let id;

function noop(timestamp) {
  console.log("noop", timestamp);
}

function oneTick(timestamp) {
  console.log("oneTick", timestamp);
  requestAnimationFrame(noop);
}

function tick(timestamp) {
  console.log("tick", timestamp);
  if (timestamp < TEMP_END_TIME) {
    id = requestAnimationFrame(tick);
  } else {
    console.log("the end");
  }
}

// requestAnimationFrame(oneTick, 0);
// requestAnimationFrame(oneTick, 0);
requestAnimationFrame(oneTick, 4);
// requestAnimationFrame(oneTick, 0);
requestAnimationFrame(oneTick, 2);
// console.log(queue);
