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

// preventing double event firing

function footerTracking() {
  const allLinks = document.querySelectorAll(
    "a.footer-links__link, a.footer-partnerships__link",
  );
  if (!allLinks.length) return;

  allLinks.forEach((link) => {
    // Initialize dataset to 'false' so we ignore pre-existing HTML values
    link.dataset.footerlinkClicked = "false";

    if (link.dataset.footerlinkClicked === "true") return; // if a link has true then avoid click

    link.addEventListener("click", function (e) {
      maybePreventDefault(e);

      const img = link.querySelector("img");
      const titleAttr = link.getAttribute("title");
      const linkClasses = link.classList;
      const linkUrl = getNormalisedUrl
        ? getNormalisedUrl(link.getAttribute("href"))
        : link.getAttribute("href");

      let clickText;

      if (linkClasses.contains("footer-links__link")) {
        clickText =
          img?.alt?.trim().toLowerCase() ||
          link.textContent.replace(/\s+/g, " ").trim();

        gtmPush({
          event: "navigation_click",
          navigation_type: "footer_nav",
          click_text: clickText,
          click_url: linkUrl,
          nav_level: "1",
        });
      } else if (linkClasses.contains("footer-partnerships__link")) {
        // Use title first, then alt, then text
        clickText =
          titleAttr?.trim() || img?.alt?.trim() || link.textContent.trim();

        gtmPush({
          event: "navigation_click",
          navigation_type: "footer_nav",
          click_text: clickText,
          click_url: linkUrl,
          nav_level: "1",
        });
      }

      // mark as clicked by setting dataset to true on the link data attribute
      link.dataset.footerlinkClicked = "true";
    });
  });
}
