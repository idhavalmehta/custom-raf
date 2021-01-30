import CustomRAF from "./CustomRAF";
const animationProvider = new CustomRAF(60);

let handle: number;
let lastTime: number;

let left = 0;
const square = document.getElementById("square");
const maxLeft =
  document.body.getBoundingClientRect().width -
  square.getBoundingClientRect().width;

function step(currentTime?: number) {
  console.group("step");
  console.log("timestamp", currentTime);

  const diff = currentTime - lastTime;
  console.log("frameRate", diff);
  lastTime = currentTime;

  left = Math.min(left + diff, maxLeft);
  console.log("left", left);
  square.style.transform = "translateX(" + left + "px)";

  if (left >= maxLeft) {
    left = 0;
  }
  handle = animationProvider.requestAnimationFrame(step);

  console.groupEnd();
}

let isPlaying = false;
const button = document.getElementById("button");

button.onclick = () => {
  if (isPlaying) {
    console.log("cancelling animation");
    animationProvider.cancelAnimationFrame(handle);
  } else {
    console.log("starting animation");
    lastTime = performance.now();
    handle = animationProvider.requestAnimationFrame(step);
  }
  isPlaying = !isPlaying;
};
