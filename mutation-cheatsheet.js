/**
 * MutationObserver cheatsheet — reference patterns for the browser DOM API.
 * Intended for use in pages where `document` and `MutationObserver` exist.
 * @see https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
 */

// -----------------------------------------------------------------------------
// 1. Callback — invoked with each batch of mutations on the observed subtree
// -----------------------------------------------------------------------------
function mutationCallback(mutationsList /* , observer */) {
  mutationsList.forEach((mutation) => {
    console.log(mutation.type); // "childList", "attributes", "characterData"
    console.log(mutation.addedNodes);
    console.log(mutation.removedNodes);
    console.log(mutation.target); // the node that changed
  });
}

// -----------------------------------------------------------------------------
// 2. Config — what to watch (boolean flags; combine as needed)
// -----------------------------------------------------------------------------
const observeConfig = {
  childList: true, // added/removed direct children
  attributes: false, // attribute changes on the observed element
  subtree: false, // extend watching to all descendants
  // attributeFilter: ["class", "data-status"], // only if attributes: true
};

/*
 * Config options (summary):
 * - childList       — direct children added/removed
 * - attributes      — attribute changes on the observed element
 * - characterData   — changes to text node contents
 * - subtree         — apply the above to all descendants, not only direct children
 * - attributeFilter — array of attribute names to observe (requires attributes: true)
 */

// -----------------------------------------------------------------------------
// 3. Create, observe, disconnect
// -----------------------------------------------------------------------------
{
  const targetNode = document.body; // replace with your root, e.g. querySelector("#app")
  const observer = new MutationObserver(mutationCallback);
  observer.observe(targetNode, observeConfig);
  observer.disconnect(); // call when you no longer need notifications
}

// -----------------------------------------------------------------------------
// Practical usage examples (each block is self-contained)
// -----------------------------------------------------------------------------

// Dynamic counter / live UI: sync a label with a container’s child count
{
  const commentSection = document.createElement("div");
  const counter = document.createElement("span");
  const counterObserver = new MutationObserver(() => {
    counter.textContent = String(commentSection.children.length);
  });
  counterObserver.observe(commentSection, { childList: true });
}

// Detect newly inserted nodes (e.g. run logic when a specific class appears)
{
  const notificationContainer = document.createElement("div");
  /** @param {Element} node */
  function animateNotification(node) {
    void node; // replace with your animation / init
  }
  const notificationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (
          node instanceof Element &&
          node.classList.contains("notification")
        ) {
          animateNotification(node);
        }
      });
    });
  });
  notificationObserver.observe(notificationContainer, { childList: true });
}

// React to attribute changes (e.g. open state on a modal)
{
  const modal = document.createElement("div");
  const modalObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (
        mutation.type === "attributes" &&
        mutation.target instanceof Element &&
        mutation.target.classList.contains("open")
      ) {
        console.log("Modal opened!");
      }
    });
  });
  modalObserver.observe(modal, { attributes: true });
}

// Watch nested structure: childList + subtree
{
  const formContainer = document.createElement("div");
  const subtreeObserver = new MutationObserver(() => {});
  subtreeObserver.observe(formContainer, { childList: true, subtree: true });
}

// Clean up when nodes are removed (inside the same callback as other mutation handling)
{
  const host = document.createElement("div");
  /** @param {Element} node */
  function destroyTooltip(node) {
    void node; // replace with teardown logic
  }
  const cleanupObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.removedNodes.forEach((node) => {
        if (node instanceof Element && node.classList.contains("tooltip")) {
          destroyTooltip(node);
        }
      });
    });
  });
  cleanupObserver.observe(host, { childList: true, subtree: true });
}

/*
 * Tips / best practices
 *
 * - Always disconnect() observers when the component or page tears down to avoid leaks
 *   and stray callbacks.
 * - Use subtree: true only when necessary — large subtrees mean more work per mutation.
 * - Use attributeFilter when you only care about a few attributes to cut callback noise.
 * - For layout or animations triggered by DOM changes, consider batching work with
 *   requestAnimationFrame so you stay in sync with paints.
 */
