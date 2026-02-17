// @ts-nocheck
/* eslint-disable */
// <script>  — uncomment when pasting into GTM

console.log("Additional Scripts asset: #618034");

(function () {
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

  // Helper to get the file extension from a URL
  function getFileExtension(str) {
    if (!str) return ""; // guard against null/empty

    // Remove query parameters and hash fragments
    const cleanStr = str.split("?")[0].split("#")[0];

    // Find the last dot in the string
    const lastDotIndex = cleanStr.lastIndexOf(".");
    if (lastDotIndex === -1) return ""; // no dot → no extension

    // Return everything after the last dot, lowercase
    return cleanStr.slice(lastDotIndex + 1).toLowerCase();
  }

  // -----------------------------
  // GTM Click Tracking functions
  // -----------------------------

  // 1. Pageviews
  function pagePreviewData() {
    const pageData = window.squizPageviewData || {};
    const { assetLineage = [], content_type } = pageData;
    const groups = {
      content_group: assetLineage[0] || "undefined",
      content_group2: assetLineage[1] || "undefined",
      content_group3: assetLineage[2] || "undefined",
      content_group4: assetLineage[3] || "undefined",
    };
    function incrementPageViewCount() {
      const key = "page_view_count";
      const count = Number(sessionStorage.getItem(key)) || 0;
      const newCount = count + 1;
      sessionStorage.setItem(key, newCount);
      return newCount;
    }
    gtmPush({
      event: "content",
      ...groups,
      content_type,
      incremental_page_view: incrementPageViewCount(),
    });
  }

  // 2. Main nav tracking
  function mainNavigationTracking() {
    const navLinks = document.querySelectorAll("nav.top-nav a");
    if (!navLinks.length) return;

    navLinks.forEach((link) => {
      // always attach listener, ignore existing dataset
      link.dataset.mainNavTracked = "false";

      if (link.dataset.mainNavTracked === "true") return;

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const linkText = (link.textContent || "").replace(/\s+/g, " ").trim();
        const linkUrl = link.getAttribute("href") || "";

        let navLevel = 1;
        const levelOneLi = link.closest(".top-nav__level-one-item");
        const levelTwoLi = link.closest(".top-nav__level-two-item");
        const levelThreeLi = link.closest(".top-nav__level-three-item");

        if (levelTwoLi) {
          navLevel = 2;
          if (
            !levelOneLi ||
            levelOneLi.getAttribute("aria-expanded") !== "true"
          )
            return;
        }
        if (levelThreeLi) {
          navLevel = 3;
          if (
            !levelTwoLi ||
            levelTwoLi
              .closest(".top-nav__level-one-item")
              .getAttribute("aria-expanded") !== "true"
          )
            return;
        }

        gtmPush({
          event: "navigation_click",
          navigation_type: "main_nav",
          click_text: linkText,
          click_url: getNormalisedUrl(linkUrl),
          nav_level: navLevel,
        });

        link.dataset.mainNavTracked = "true";
      });
    });
  }

  // 3. Side nav tracking
  function sideNavTracking() {
    const sideNavLinks = document.querySelectorAll("nav.lhs-menu a");
    if (!sideNavLinks.length) return;

    sideNavLinks.forEach((link) => {
      link.dataset.sideNavTracked = "false";

      if (link.dataset.sideNavTracked === "true") return;

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const linkText = Array.from(link.childNodes)
          .filter((node) => node.nodeType === Node.TEXT_NODE)
          .map((node) => node.textContent.trim())
          .join(" ")
          .replace(/\s+/g, " ")
          .trim();

        const linkUrl = link.getAttribute("href") || "";

        gtmPush({
          event: "navigation_click",
          navigation_type: "side_nav",
          click_text: linkText,
          click_url: getNormalisedUrl(linkUrl),
          nav_level: 1,
        });

        link.dataset.sideNavTracked = "true";
      });
    });
  }

  // 4. Breadcrumb tracking
  function breadcrumbTracking() {
    const breadcrumb = document.querySelector(
      "nav.breadcrumbs, ol.breadcrumbs",
    );
    if (!breadcrumb) return;

    const breadcrumbLinks = breadcrumb.querySelectorAll("a.breadcrumbs__link");
    if (!breadcrumbLinks.length) return;

    breadcrumbLinks.forEach((link, index) => {
      link.dataset.breadcrumbTracked = "false";

      if (link.dataset.breadcrumbTracked === "true") return;

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const clickText =
          Array.from(link.childNodes)
            .filter(
              (node) =>
                node.nodeType === Node.TEXT_NODE || node.nodeName === "SPAN",
            )
            .map((node) => node.textContent.trim())
            .join(" ")
            .replace(/\s+/g, " ")
            .trim() || "Breadcrumb";

        const clickUrl = link.getAttribute("href") || "";
        const navLevel = index + 1;

        gtmPush({
          event: "navigation_click",
          navigation_type: "breadcrumb",
          click_text: clickText,
          click_url: getNormalisedUrl(clickUrl),
          nav_level: navLevel,
        });

        link.dataset.breadcrumbTracked = "true";
      });
    });
  }

  // 5 footer tracking
  function footerTracking() {
    const allLinks = document.querySelectorAll(
      "a.footer-links__link, a.footer-partnerships__link",
    );
    if (!allLinks.length) return;

    allLinks.forEach((link) => {
      // Initialize dataset to 'false' so we ignore pre-existing HTML values
      link.dataset.footerlinkClicked = "false";

      if (link.dataset.footerlinkClicked === "true") return;

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const img = link.querySelector("img");
        const titleAttr = link.getAttribute("title");
        const linkClasses = link.classList;
        const linkUrl = getNormalisedUrl
          ? getNormalisedUrl(link.getAttribute("href"))
          : link.getAttribute("href");

        let clickText;

        if (linkClasses.contains("footer-links__link")) {
          clickText =
            img?.alt?.trim().toLowerCase() ||
            link.textContent.replace(/\s+/g, " ").trim();

          gtmPush({
            event: "navigation_click",
            navigation_type: "footer_nav",
            click_text: clickText,
            click_url: linkUrl,
            nav_level: "1",
          });
        } else if (linkClasses.contains("footer-partnerships__link")) {
          // Use title first, then alt, then text
          clickText =
            titleAttr?.trim() || img?.alt?.trim() || link.textContent.trim();

          gtmPush({
            event: "navigation_click",
            navigation_type: "footer_nav",
            click_text: clickText,
            click_url: linkUrl,
            nav_level: "1",
          });
        }

        // mark as clicked
        link.dataset.footerlinkClicked = "true";
      });
    });
  }

  // 6. Accordion
  function accordionTracking() {
    const accordionItems = document.querySelectorAll(".js-accordion");
    if (!accordionItems.length) return;

    accordionItems.forEach((item) => {
      const link = item.querySelector(".accordion__link");
      if (!link) return;

      // Only track each accordion once
      link.dataset.accordionTracked = link.dataset.accordionTracked || "false";

      const observer = new MutationObserver((mutationsList) => {
        mutationsList.forEach((mutation) => {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName === "aria-expanded"
          ) {
            const isExpanded = link.getAttribute("aria-expanded") === "true";
            const linkText = link.textContent.replace(/\s+/g, " ").trim();

            if (link.dataset.accordionTracked !== "true") {
              gtmPush({
                event: "accordion_click",
                component_name: "undefined", // client wants this
                component_element: linkText,
                interaction_type: isExpanded ? "expand" : "collapse",
              });

              link.dataset.accordionTracked = "true";
            }
          }
        });
      });

      observer.observe(link, {
        attributes: true,
        attributeFilter: ["aria-expanded"],
      });

      link.addEventListener("click", (e) => maybePreventDefault(e));
    });
  }

  // 7. Tiles
  function tilesTracking() {
    const allTiles = document.querySelectorAll(".home-tiles__item");
    if (!allTiles.length) return;

    allTiles.forEach((tile) => {
      tile.dataset.tracked = "false";

      tile.addEventListener("click", (e) => {
        maybePreventDefault(e);

        const linkUrl = tile.getAttribute("href") || "";
        const heading = tile.querySelector(".home-tiles__heading");
        const headingText = heading
          ? heading.textContent.replace(/\s+/g, " ").trim()
          : "";

        // Check if link is a PDF
        const isPDFlink = /\.pdf(\?|$)/i.test(linkUrl);
        if (isPDFlink) {
          //console.log('PDF link, not tracked:', linkUrl);
          return; // Skip tracking
        }

        // Only track non-PDF links
        if (headingText && linkUrl && tile.dataset.tracked !== "true") {
          gtmPush({
            event: "tile_click",
            click_text: headingText,
            click_url: getNormalisedUrl(linkUrl),
          });

          tile.dataset.tracked = "true";
          // console.log('Tracked tile:', { linkUrl, headingText });
        }
      });
    });
  }

  // 8. inline page links
  function inlineLinks() {
    // Select all inline links inside content
    const inlineLnks = document.querySelectorAll(".content a");
    if (!inlineLnks.length) return;

    inlineLnks.forEach((link) => {
      if (link.closest(".js-accordion")) return; // skip accordion links

      link.dataset.contentClicked === "false";

      // Guard: skip if already tracked
      if (link.dataset.contentClicked === "true") return;

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        // Build a clean title for GTM
        const linkTitle = (link.getAttribute("title") || link.textContent || "")
          .replace(/\s+/g, " ")
          .trim();

        const href = link.getAttribute("href") || "";
        const ext = getFileExtension(href); // file extension

        if (ext === "pdf") {
          // if we have a pdf url link
          gtmPush({
            event: "interaction_click",
            component_name: "link",
            click_text: linkTitle,
            click_url: getNormalisedUrl(href), // give me the relative path
          });
        } else {
          gtmPush({
            event: "interaction_click",
            component_name: "link",
            click_text: linkTitle,
            click_url: getNormalisedUrl(href),
          });
        }

        link.dataset.contentClicked = "true";
      });
    });
  } // close function

  // 9 homepage banner video slides
  function homeBannerVideo() {
    const bannerWrapper = document.querySelector(".home-banner");
    if (!bannerWrapper) return;

    const videoLinks = bannerWrapper.querySelectorAll(".home-banner__play");
    if (!videoLinks.length) return;

    videoLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        maybePreventDefault(e);

        const ytId = link.dataset.embed || "";
        if (!ytId) return;

        // Get the closest slide for this button
        const slide = link.closest(".home-banner__item");
        if (!slide) return;

        // Get the heading text from this slide
        const linkTitleEl = slide.querySelector(".home-banner__heading");
        const linkTitle = linkTitleEl ? linkTitleEl.textContent.trim() : "";

        const linkUrl = `https://www.youtube.com/watch?v=${ytId}`;

        console.log("Banner play clicked:", { linkTitle, linkUrl });

        gtmPush({
          event: "interaction_click",
          component_name: "play_button",
          click_text: linkTitle,
          click_url: linkUrl,
        });
      });
    });
  }

  // -------------------------------
  // Initialize all GTM tracking functions
  // -------------------------------
  function gtmInit() {
    pagePreviewData();
    mainNavigationTracking();
    sideNavTracking();
    breadcrumbTracking();
    footerTracking();
    accordionTracking();
    tilesTracking();
    inlineLinks();
    homeBannerVideo();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", gtmInit);
  } else {
    gtmInit();
  }
})();
// </script>  — uncomment when pasting into GTM
