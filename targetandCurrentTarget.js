/**
event.target vs event.currentTarget vs closest()
These three are used when handling events in the DOM.

Think of them as answering different questions.

Property	              Question it answers
event.target	          What element was actually clicked?
event.currentTarget	    What element is the listener attached to?
closest()	              What parent element matches a selector?


target → element clicked
currentTarget → element listening

*/

//example

<div id="card">
  <button>
    <span>Buy</span>
  </button>
</div>;

document.querySelector("#card").addEventListener("click", (e) => {
  console.log("target:", e.target);
  console.log("currentTarget:", e.currentTarget);
});

/**
target: <span>
currentTarget: <div id="card">
*/

//example

<ul id="menu">
  <li data-action="edit">Edit</li>
  <li data-action="delete">Delete</li>
</ul>;

menu.addEventListener("click", (e) => {
  const item = e.target.closest("li"); // closest() walks up the DOM tree until it finds a match.

  if (!item || !menu.contains(item)) return;

  console.log(item.dataset.action);
});

/**
 * The One Rule Senior JS Devs Follow
 * Almost every event handler looks like this:
 */

container.addEventListener("click", (e) => {
  const element = e.target.closest(".thing");

  if (!element) return;

  // logic here
});

// Element.matches()
// matches() checks if an element matches a CSS selector.

<button class="buy">Buy</button>;

const btn = document.querySelector("button");
console.log(btn.matches(".buy"));

// You can use any CSS selector.

btn.matches("button.buy");
btn.matches(".buy.primary");
btn.matches("[data-action]");

//dont do this
if (el.className === "buy");

// do this
if (el.matches(".buy"));

//example

menu.addEventListener("click", (e) => {
  const el = e.target;

  if (el.matches("li")) {
    console.log(el.dataset.action);
  }
});

// Closest and Matches Pattern

menu.addEventListener("click", (e) => {
  const item = e.target.closest("li");

  if (!item) return;

  if (item.matches("[data-action]")) {
    console.log(item.dataset.action);
  }
});

//example
<a href="/pricing" data-track="nav-pricing">
  Pricing
</a>;

document.addEventListener("click", (e) => {
  const link = e.target.closest("a");

  if (!link) return;

  if (link.matches("[data-track]")) {
    console.log("Track:", link.dataset.track);
  }
});
