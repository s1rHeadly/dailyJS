/* eslint-disable */
// @ts-nocheck
//
const TEST_MODE = true;

function maybePreventDefault(e) {
  if (TEST_MODE) e.preventDefault();
}

const getNormalisedUrl = (url) => {
  try {
    const linkUrlObj = new URL(url);
    const currentUrlObj = new URL(window.location.href);
    if (linkUrlObj.origin === currentUrlObj.origin) {
      return linkUrlObj.href.replace(linkUrlObj.origin, "");
    }
    return linkUrlObj.href;
  } catch {
    return url || null;
  }
};

function gtmPush(event = null, url = "") {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  if (url) window.location = url;
}

// 3. side nav link tracking
function sideNavTracking() {
  const sideNavLinks = document.querySelectorAll("nav.lhs-menu a");
  if (!sideNavLinks.length) return; // fixed

  sideNavLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      // pass e
      maybePreventDefault(e);

      // Get only text nodes (exclude SVG)
      const linkTextRaw = Array.from(link.childNodes)
        .filter((node) => node.nodeType === Node.TEXT_NODE)
        .map((node) => node.textContent.trim())
        .join(" ");

      const linkText = linkTextRaw.replace(/\s+/g, " ").trim() || "";
      const linkUrl = link.getAttribute("href") || "";

      let navLevel = 1;
      if (linkText && linkUrl) {
        gtmPush({
          event: "navigation_click",
          navigation_type: "side_nav",
          click_text: linkText,
          click_url: getNormalisedUrl(linkUrl),
          nav_level: navLevel,
        });
      }
    });
  });
}
