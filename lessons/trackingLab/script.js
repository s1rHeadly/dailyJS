// first iteration

(function () {
  "use strict";

  // look at your function and find helpers to break down the code
  const container = document.querySelector(".lpd-copy");
  if (!container) return;

  container.addEventListener("click", function (e) {
    e.preventDefault();

    const target = e?.target;
    if (!target) return;
    const link = target.closest("a");
    if (!link) return;

    const linkText = link.textContent.trim() || "";
    const linkUrl = link.getAttribute("href") || "";
    console.log({ linkText, linkUrl });
  });
})();

// 2nd interation - we removed a section and put into a helper function using a callback

(function () {
  "use strict";

  // ==========
  // HELPERS
  // ==========

  function findLink(e) {
    const target = e?.target;
    if (!target) return null;
    return target.closest("a");
  }

  function shouldTrack(link) {
    // check if the link has a class and has a dataset set to false
    // if the condition is met then it will be true
    return (
      link.classList.contains("lpd-copy") && link.dataset.clicked === "false"
    );
  }

  function trackingData(link) {
    if (!link) return null;
    return {
      text: link?.textContent?.trim() || "",
      url: link?.getAttribute("href") || "",
      timestamp: performance.now(),
    };
  }

  function trackItem(callback) {
    const container = document.querySelector(".lpd-copy");
    if (!container) return;

    container.addEventListener("click", function (e) {
      e.preventDefault();

      // this is where the findLink code would sit but its now a helper
      const link = callback(e);
      if (!link || !shouldTrack(link)) return; // stop if no link OR link shouldn’t be tracked

      const payLoad = trackingData(link);
      link.dataset.clicked = "true";
      console.log(payLoad);

      //not needed here => console.log({ linkText, linkUrl });
    });
  }

  // ==========
  // INIT
  // ==========
  trackItem(findLink);
})();
