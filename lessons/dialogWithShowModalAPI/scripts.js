(function () {
  function createModal(link, container) {
    // Remove existing modal
    const existing = container.querySelector(".video-modal");
    if (existing) existing.remove();

    // Create dialog
    const dialog = document.createElement("dialog");
    dialog.className = "video-modal";

    // Close button
    const closeBtn = document.createElement("button");
    closeBtn.className = "video-modal__close";
    closeBtn.textContent = "✕";

    closeBtn.addEventListener("click", () => {
      dialog.close();
      dialog.remove();
    });

    // Video
    const videoWrapper = document.createElement("div");
    videoWrapper.className = "video-modal__video";

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${link.dataset.videoId}?autoplay=1`;
    iframe.allowFullscreen = true;

    videoWrapper.appendChild(iframe);

    // Transcript (optional)
    let transcript = null;
    if (link.dataset.transcript?.trim()) {
      transcript = document.createElement("div");
      transcript.className = "video-modal__transcript";
      transcript.textContent = link.dataset.transcript;
    }

    // Assemble
    dialog.appendChild(closeBtn);
    dialog.appendChild(videoWrapper);
    if (transcript) dialog.appendChild(transcript);

    container.appendChild(dialog);

    // Show modal
    dialog.showModal();

    // Close on backdrop click
    dialog.addEventListener("click", (e) => {
      if (e.target === dialog) {
        dialog.close();
        dialog.remove();
      }
    });
  }

  function init() {
    const container = document.querySelector(".page-body");
    if (!container) return;

    container.addEventListener("click", (e) => {
      const link = e.target.closest(".video-link");
      if (!link) return;

      e.preventDefault();
      createModal(link, container);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
