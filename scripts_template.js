(function () {
  "use strict";

  function init() {}

  // check for DOM loading and initialise the init function
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
