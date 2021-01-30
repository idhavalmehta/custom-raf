import CustomRAF from "./CustomRAF";
const animationProvider = new CustomRAF(60);

const element = document.getElementById("square");
let start: number;

function step(timestamp: number) {
  if (start === undefined) start = timestamp;
  const elapsed = timestamp - start;

  element.style.transform =
    "translateX(" + Math.min(0.1 * elapsed, 200) + "px)";

  if (elapsed < 2000) {
    animationProvider.requestAnimationFrame(step);
  }
}
animationProvider.requestAnimationFrame(step);
