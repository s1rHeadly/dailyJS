/**
 * JavaScript Event Bubbling Tutorial
 * What is Event Bubbling?
 * 
 * Event bubbling is a way that events propagate in the DOM. When an event occurs on a nested element (child), it bubbles up to its parent elements, all the way up to the <html> element, unless stopped.

Example DOM:
*/

<div id="parent">
  <button id="child">Click me</button>
</div>;

const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
  console.log("Parent clicked!");
});

child.addEventListener("click", () => {
  console.log("Child clicked!");
});

// Behavior:
// Click the button.

// Output in console:
// Child clicked!
// Parent clicked!

/**
 * Stopping Event Bubbling
 * If you don’t want the event to bubble, you can use event.stopPropagation().
 */

child.addEventListener("click", (event) => {
  console.log("Child clicked!");
  event.stopPropagation(); // stops bubbling
});

/**
Event Delegation Using Bubbling
One of the biggest benefits of bubbling is event delegation: attaching a single listener on a parent to handle events for many child elements.
*/

<ul id="menu">
  <li data-item="Home">Home</li>
  <li data-item="About">About</li>
  <li data-item="Contact">Contact</li>
</ul>;

const menu = document.getElementById("menu");

menu.addEventListener("click", (event) => {
  const clickedItem = event.target;
  if (clickedItem.tagName === "LI") {
    console.log("You clicked:", clickedItem.dataset.item);
  }
});

/**
Instead of adding a listener to every <li>, we just listen on the parent <ul>.
Bubbling ensures clicks on <li> reach the <ul>.
*/

/**
 * Summary
 * Event Bubbling: child → parent → document → window.
 * stopPropagation(): stops the event from bubbling further.
 * Event Delegation: efficient way to handle many child elements with one listener.
 */
