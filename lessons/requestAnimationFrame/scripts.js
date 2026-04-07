(function () {
  // ============================
  // DOM references
  // ============================
  const intervalBox = document.querySelector(".interval-box");
  const rafBox = document.querySelector(".raf-box");
  const button = document.getElementById("start");

  // Logging to confirm elements exist
  console.log({ intervalBox, rafBox, button });

  // ============================
  // Animation state
  // ============================
  let intervalPosition = 0; // Position for the setInterval box
  let rafPosition = 0; // Position for the rAF box
  let isAnimating = false; // Guard to prevent multiple rAF loops
  let intervalId; // Store interval ID so we don't create multiple intervals

  // ============================
  // requestAnimationFrame animation
  // ============================
  function byAnimation(element) {
    // Prevent starting a new rAF loop if one is already running
    if (isAnimating) return;
    isAnimating = true;

    // Define the actual animation loop
    function animate() {
      rafPosition++; // Move the box 1px per frame
      element.style.transform = `translateX(${rafPosition}px)`; // Apply translation

      // Schedule the next frame
      requestAnimationFrame(animate);
    }

    // Start the loop
    animate();
  }

  // ============================
  // setInterval animation
  // ============================
  function byInterval(element) {
    // Prevent multiple intervals being created
    if (intervalId) return;

    // Create interval, runs approximately every 16ms (~60fps)
    intervalId = setInterval(() => {
      intervalPosition++; // Move the box 1px per tick
      element.style.transform = `translateX(${intervalPosition}px)`; // Apply translation
    }, 16);
  }

  // ============================
  // Event listeners
  // ============================
  function listeners() {
    button.addEventListener("click", () => byAnimation(rafBox)); // Start rAF animation
    button.addEventListener("click", () => byInterval(intervalBox)); // Start setInterval animation
  }

  // ============================
  // Initialize
  // ============================
  function init() {
    listeners();
  }

  // Run init immediately
  init();
})();
