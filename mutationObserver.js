// @ts-nocheck
/* eslint-disable */
/**
 * JavaScript MutationObserver Tutorial
 * 
 *  What is MutationObserver?

MutationObserver is a built-in API in JavaScript that lets you watch for changes in the DOM.

You can detect:
Attribute changes (like class, style, id)
Child elements being added or removed
Text content changes

Why it’s useful:

React to dynamic content changes without polling
Detect when classes are toggled or elements appear
Useful for SPAs, dynamically loaded content, or animations

*/

// Basic Syntax
const observer = new MutationObserver(callback);
observer.observe(targetNode, options);

/**
 * callback → called whenever mutations happen
 * targetNode → the DOM node you want to observe
 * options → object defining what to watch
 *
 */

//===============================
// Example watch for class
//===============================

/* html
<button id="toggleBtn">Toggle Menu</button>
<div id="menu" class="menu">Menu content</div>
*/

// the current JS adds a toggleclass

document.getElementById("toggleBtn").addEventListener("click", () => {
  menu.classList.toggle("active");
});

// The Mutation Observer => we want to watch for the class change (the DOM update)

// Callback function when mutation occurs
const observer1 = new MutationObserver((mutationsList) => {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      // if has type of attributes AND has attribute name of class
      console.log("Class changed:", menu.className);
    }
  });
});

// Start observing
observer1.observe(menu, {
  attributes: true, // watch attributes
  attributeFilter: ["class"], // only care about class
});

//writing it cleaner ...

// 1. Define the callback separately
function handleClassChange(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "attributes" && mutation.attributeName === "class") {
      console.log("Class changed to:", menu.className);
    }
  });
}

// 2. Define the options object separately
const observerOptions = {
  attributes: true, // watch attributes
  attributeFilter: ["class"], // only watch class changes
};

// 3. Create the observer and pass in the callback function
const observer2 = new MutationObserver(handleClassChange);

// 4. Start observing
observer2.observe(menu, observerOptions);

//===============================
// Example Watch for chilNodes
//===============================

/* html
<ul id="list">
  <li>Item 1</li>
  <li>Item 2</li>
</ul>

<button id="addItemBtn">Add Item</button>
*/

//JS Add a new item = when a button is clicked add li element, here we are showing only the child being added for lesson purposes
// 5. Add a new item on button click
addItemBtn.addEventListener("click", () => {
  const li = document.createElement("li");
  li.textContent = `New Item ${list.children.length + 1}`;
  list.appendChild(li);
});

// 1 create the callback
function handleChildChanges(mutationsList) {
  mutationsList.forEach((mutation) => {
    if (mutation.type === "childList") {
      console.log("Child added or removed:", mutation);
    }
  });
}

// 2. Define the observer options separately
const observerOptions3 = {
  childList: true, // watch for additions/removals of direct children
  subtree: false, // set to true if you want to watch all descendants
};

// 3. Create the observer
const observer3 = new MutationObserver(handleChildChanges);

// 4. Start observing
observer3.observe(list, observerOptions3);

//=========================================
// Replacing setTimeOut for mutation observer - Accordion
//=========================================

const TEST_MODE = true;

function maybePreventDefault(e) {
  if (TEST_MODE) e.preventDefault();
}

// with setTimeOut()

function accordionTracking() {
  const accordions = document.querySelectorAll(".accordion");
  if (!accordions.length) return;

  accordions.forEach((accordion) => {
    const link = accordion.querySelector(".accordion__link");
    const target = accordion.querySelector(".accordion__target");
    if (!link || !target) return;

    link.dataset.accordionTracked = "false";
    if (link.dataset.accordionTracked === "true") return;

    link.addEventListener("click", (e) => {
      maybePreventDefault(e); // helper function

      setTimeout(() => {
        const isExpanded = link.getAttribute("aria-expanded") === "true";
        const linkText = link.textContent?.trim() || "";

        gtmPush({
          event: "accordion_click",
          component_name: "Accordion",
          component_element: linkText,
          interaction_type: isExpanded ? "expand" : "collapse",
        });

        link.dataset.accordionTracked = "true";
      }, 500);
    });
  });
}

// converted to Mutation Observer
// 6. Accordion tracking using MutationObserver (preferred style)

// 6. Accordion tracking using MutationObserver
function accordionTracking() {
  // 1. Select all accordions
  const accordions = document.querySelectorAll(".accordion");
  if (!accordions.length) return; // Exit if none found

  // 2. Loop through each accordion
  accordions.forEach((accordion) => {
    const link = accordion.querySelector(".accordion__link");
    const target = accordion.querySelector(".accordion__target");

    // Skip if structure is incomplete
    if (!link || !target) return;

    // Optional flag to track only once
    link.dataset.accordionTracked = "false";

    // -------------------------
    // 3. Callback function for MutationObserver
    // -------------------------
    const handleMutations = (mutationsList, observer) => {
      mutationsList.forEach((mutation) => {
        // Only act on aria-expanded attribute changes
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "aria-expanded"
        ) {
          const isExpanded = link.getAttribute("aria-expanded") === "true";
          const linkText = link.textContent?.trim() || "";

          // Only track once (optional)
          if (link.dataset.accordionTracked !== "true") {
            gtmPush({
              event: "accordion_click",
              component_name: "Accordion",
              component_element: linkText,
              interaction_type: isExpanded ? "expand" : "collapse",
            });

            link.dataset.accordionTracked = "true";
          }
        }
      });
    };

    // -------------------------
    // 4. Observer options
    // -------------------------
    const observerOptions = {
      attributes: true, // Watch attribute changes
      attributeFilter: ["aria-expanded"], // Only watch aria-expanded
    };

    // -------------------------
    // 5. Create observer and start observing
    // -------------------------
    const observer = new MutationObserver(handleMutations);
    observer.observe(link, observerOptions);

    // -------------------------
    // 6. Optional: click listener for UI behavior
    // -------------------------
    link.addEventListener("click", (e) => {
      maybePreventDefault(e);
      // Tracking happens via MutationObserver, no setTimeout needed
    });
  });
}
