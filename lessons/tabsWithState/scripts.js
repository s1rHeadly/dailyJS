(function () {
  let container;

  let activeTabID = null;

  function handleTabClick(e) {
    const currentTab = e.target.closest(".tab");
    if (!currentTab) return;

    const currentTabID = currentTab.dataset.id;

    if (activeTabID === currentTabID) {
      activeTabID = null;
    } else {
      activeTabID = currentTabID;
    }

    console.log({ activeTabID });
  }

  function bindEvents() {
    container.addEventListener("click", handleTabClick);
  }

  function init() {
    container = document.querySelector(".tabs");

    const activeTab = document.querySelector(".tab.active");
    if (!activeTab) return;

    activeTabID = activeTab.dataset.id;

    bindEvents();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
