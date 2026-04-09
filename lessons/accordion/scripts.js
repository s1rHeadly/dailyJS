(function () {
  "use strict";

  function toggleAccordion(questionEl, containerEl) {
    // do the main accordion stuff here
    const item = questionEl.closest(".faq-item");
    if (!item) return;
    console.log({ item });

    const answer = item.querySelector(".faq-answer");
    if (!answer) return;

    // close all open items
    const openItems = containerEl.querySelectorAll(".faq-item.open");
    openItems.forEach((openItem) => {
      if (openItem !== item) {
        // if the open item is not equal to the item at the start
        openItem.classList.remove("open");
      }
    });

    item.classList.toggle("open");
  }

  function delegatedListener() {
    const container = document.querySelector(".faq-container");
    if (!container) return;

    container.addEventListener("click", function (e) {
      const question = e.target.closest(".faq-question");
      console.log({ question });
      if (!question) return; // ignore clicks outside questions
      e.preventDefault();

      // Call the toggle function, passing parameters
      toggleAccordion(question, container); //evoke the toggleAccordion funvtion here
    });
  }

  function init() {
    delegatedListener();
  }

  // check for DOM loading and initialise the init function
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
