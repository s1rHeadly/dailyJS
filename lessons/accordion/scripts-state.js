(function () {
  "use strict";

  console.log("working");
  /*
  When you click a question:
  Detect click
  Identify which question was clicked
  (later) open/close the answer
  */

  let activeId = null;

  function init() {
    document
      .querySelector(".faq-container")
      .addEventListener("click", handleClick);
  }

  function handleClick(e) {
    const button = e.target.closest(".faq-question");
    if (!button) return;

    console.log({ activeId });

    const clickedId = button.dataset.id;
    const item = button.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");

    if (activeId === clickedId) {
      activeId = null;
    } else {
      activeId = clickedId;
    }

    console.log({ activeId, item, answer });
  }

  // =========================
  // INIT
  // =========================
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
