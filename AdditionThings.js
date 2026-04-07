requestAnimationFrame(() => {
  // Code here runs right before the next screen repaint
});

/**
 * requestAnimationFrame (often abbreviated rAF) is a browser API for scheduling code to run right before the next repaint.
 * It’s extremely useful when you want to wait until the DOM has visually updated after some changes, like adding/removing classes, without using arbitrary setTimeout delays.
 *
 *
 * Why its better than setTimeOout
 *
 * The browser waits until it’s about to redraw the screen.
 * Then your callback executes after all DOM changes from the current frame have been applied, but before the user actually sees it.
 * This ensures you’re reading the latest DOM state.
 * Why it’s better than setTimeout
 * setTimeout is based on time and is not synchronized with screen updates. If the DOM hasn’t updated yet, you might get stale values.
 * equestAnimationFrame runs at the optimal time for the browser, avoiding unnecessary delays or race conditions.
 */

/*
 * Key difference (this is the one to remember)

 * setTimeout = time-based
 * requestAnimationFrame = frame-based
 * 
 * 🧠 Rule of thumb
 *
 * 👉 Ask yourself:
 *
 * “Is this tied to something the user can see updating on screen?”
 *
 * YES → use requestAnimationFrame
 * NO → use setTimeout / setInterval
 * 
 * 🔥 Real-world example (important for your level)
 * Bad animation (janky)
 * setInterval(() => {
 *   box.style.left = box.offsetLeft + 1 + "px";
 * }, 16);
 * Good animation (smooth)
 * function move() {
 *   box.style.left = box.offsetLeft + 1 + "px";
 *   requestAnimationFrame(move);
 * }
 * move();
 */

// get file extention
function getFileExtension(str) {
  if (!str) return ""; // guard against null/empty
  // Remove query parameters and hash fragments
  const cleanStr = str.split("?")[0].split("#")[0];

  // Find the last dot in the string
  const lastDotIndex = cleanStr.lastIndexOf(".");
  if (lastDotIndex === -1) return ""; // no dot → no extension

  // Return everything after the last dot, lowercase
  return cleanStr.slice(lastDotIndex + 1).toLowerCase();
}
