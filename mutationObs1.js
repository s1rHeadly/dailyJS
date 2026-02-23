function searchResultsCardsTracking() {
  // -------------------------------
  // Helper function to attach the click listener
  // -------------------------------
  function attachListener() {
    // Try to find the container that holds all the cards
    const container = document.querySelector(
      ".search-page-resources__results-list",
    );

    // If the container doesn't exist yet (maybe React hasn't rendered it), return false
    if (!container) return false;

    console.log("Container found, attaching listener");

    // -------------------------------
    // Event delegation: attach a single click listener to the container
    // -------------------------------
    container.addEventListener("click", function (e) {
      console.log("Click detected");

      // Check if the click happened on a card (or inside a card)
      const card = e.target.closest(".resource-tile__container");
      if (!card) return; // If not, ignore

      console.log("Card:", card);

      // Get the card's URL
      const url = card.getAttribute("href") || "";

      // Get the title text inside the card
      const titleEl = card.querySelector(".resource-tile__title.front--title");
      const title = titleEl ? getVisibleText(titleEl) : ""; // remove SVGs and trim text

      // Send data to GTM
      gtmPush({
        event: "interaction_click",
        component_name: "resource_card",
        click_text: title,
        click_url: getNormalisedUrl(url), // normalizes URL for tracking
      });
    });

    // Return true to indicate listener was successfully attached
    return true;
  }

  // -------------------------------
  // Try to attach the listener immediately
  // -------------------------------
  if (attachListener()) return; // if container exists, done!

  // -------------------------------
  // If container is not yet in the DOM (React hasn't rendered it), watch for changes
  // -------------------------------
  const observer = new MutationObserver(() => {
    // Each time the DOM changes, try attaching the listener again
    if (attachListener()) {
      // Once attached, stop observing to save resources
      observer.disconnect();
    }
  });

  // Start observing the entire body for any added child nodes or subtree changes
  observer.observe(document.body, {
    childList: true, // watch for direct children being added/removed
    subtree: true, // also watch all nested children
  });
}
