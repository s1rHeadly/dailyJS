(function () {
  "use strict";

  const colors = ["#f8b195", "#f67280", "#c06c84", "#6c5b7b"];
  const sections = document.querySelectorAll(".fade-section");

  // =====================
  // Assign colors and initial styles
  // =====================
  function setupSections() {
    sections.forEach((section, i) => {
      section.style.backgroundColor = colors[i % colors.length];
      section.style.opacity = 0;
      section.style.transform = "translateY(20px)";
      section.style.transition = `opacity 0.6s ease ${i * 0.2}s, transform 0.6s ease ${i * 0.2}s`;
      // stagger delay: each section delayed by 0.2s * index
    });
  }

  // =====================
  // IntersectionObserver
  // =====================
  function observeSections() {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // when 20% of the element is showing in the viewport
    };

    // threshold: 0.2 → The callback triggers when 20% of the element is visible.
    // threshold: 0.6 → The callback triggers when 60% of the element is visible.

    // In other words, the higher the threshold,
    // the more of the element must appear in the viewport before it’s considered “intersecting.”

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !entry.target.classList.contains("visible")
        ) {
          entry.target.classList.add("visible");
          entry.target.style.opacity = 1;
          entry.target.style.transform = "translateY(0)";
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));
  }

  // =====================
  // Initialize
  // =====================
  function init() {
    setupSections();
    observeSections();
  }

  init();
})();
