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
