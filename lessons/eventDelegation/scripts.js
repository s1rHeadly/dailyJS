(function () {
  "use strict";

  // Project: Clickable Color Grid

  // vars
  const grid = document.getElementById("color-grid");
  const addBtn = document.getElementById("add-box");

  if (!grid && !addBtn) return;

  function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function changeColor(e) {
    const { target } = e;
    if (!target) return;

    const box = target.closest(".box");

    if (box) {
      console.log("box clicked:", box);
      box.style.backgroundColor = generateRandomColor();
    }
  }

  function listeners() {
    grid.addEventListener("click", (e) => changeColor(e));
  }

  function init() {
    listeners();
  }

  init();
})();
