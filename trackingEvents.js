(function () {
  // -------------------------------
  // HELPERS
  // -------------------------------

  /**
      Test Mode: toggle to true/false // true = preventDefault for testing, false = production
  */

  const TEST_MODE = true;

  function maybePreventDefault(e) {
    if (TEST_MODE) e.preventDefault();
  }

  /**
      URL Helper
  */

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

  /**
      GTM Helper
  */

  function gtmPush(event = null, url = "") {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(event);

    if (url) {
      window.location = url;
    }
  }

  /**
   * =============================
      GTM Click Tracking functions
   * ==============================
  */

  // 1. Pageviews
  function pagePreviewData() {
    const pageData = window.squizPageviewData || {};
    console.log({ pageData });
    const { assetLineage = [], content_type } = pageData;
    console.log({ assetLineage });

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
  } // close pageViews

  // 2. Main Navigation
  function navigationTracking() {
    const nav = document.querySelector(".primary-navigation");
    if (!nav) return;

    nav.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (!link) return;

      maybePreventDefault(e);

      const clickText = link.dataset.clickText || link.textContent.trim();
      const clickUrl = getNormalisedUrl(link.href);

      const isMegaMenuLink =
        link.closest(".mega-menu") || link.closest("li.link ul");

      const navLevel = isMegaMenuLink ? 2 : 1;

      gtmPush({
        event: "navigation_click",
        navigation_type: "main_nav",
        click_text: clickText,
        click_url: clickUrl,
        nav_level: navLevel,
      });
    });
  }

  // 3. Secondary navigation
  // find it here: https://www-tac-stage.squiz.cloud/_spokes-2016/getting-started#sign-up-and-we%E2%80%99ll-send-you-the-latest
  function stickyWrapperTracking() {
    const links = document.querySelectorAll("#sticky-wrapper a");
    if (!links.length) return;

    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        maybePreventDefault(e);

        const clickText = link.textContent.toLowerCase().trim() || "Link";
        const clickUrl = getNormalisedUrl(link.href) || "";

        // Push GTM event
        gtmPush({
          event: "navigation_click",
          navigation_type: "secondary_nav",
          click_text: clickText,
          click_url: clickUrl,
          nav_level: "1",
        });

        console.log({ clickText, clickUrl, navLevel: 1 });
      });
    });
  } // close function

  // 3. Anchor Navigation (that is full width, usually 4 links across)
  function anchorNav() {
    const nav = document.querySelector(".anchor-nav");
    if (!nav) return;

    nav.addEventListener("click", function (e) {
      maybePreventDefault(e);

      const target = e?.target;
      if (!target) return; // Exit if no event or target

      const link = target.closest("a");
      if (!link) return;

      const linkTextRaw = (link.textContent || "").toLowerCase();
      const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
      const linkUrl = getNormalisedUrl(link?.getAttribute("href")) || "";

      console.log({ linkTextRaw, linkText, linkUrl });

      gtmPush({
        event: "tile_click",
        click_text: linkText,
        click_url: linkUrl,
      });
    });
  } // close function

  // 4. Footer Tracking
  function footerTracking() {
    const footer = document.querySelector(".primary-footer, .secondary-footer");
    if (!footer) return;

    footer.addEventListener("click", function (e) {
      const link = e.target.closest("a");
      if (!link) return;

      maybePreventDefault(e);

      const linkTextRaw = link.textContent || "";
      const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
      const linkUrl = getNormalisedUrl(link.getAttribute("href")) || "";

      const socialParent = link.closest(".social-links");
      const sponsorsParent = link.closest(".sponsors");

      const category = socialParent
        ? "social"
        : sponsorsParent
          ? "logo"
          : linkText;

      gtmPush({
        event: "navigation_click",
        navigation_type: "footer_nav",
        click_text: category,
        click_url: linkUrl,
        nav_level: "1",
      });
    });
  }

  // 5. Breadcrumb click
  function breadcrumbTracking() {
    const breadcrumb = document.querySelector("nav.breadcrumbs");
    if (!breadcrumb) return;

    const breadcrumbLinks = breadcrumb.querySelectorAll("a.link");

    if (!breadcrumbLinks.length) return;

    breadcrumbLinks.forEach((link, index) => {
      if (link.dataset.breadcrumbTracked) return;
      link.dataset.breadcrumbTracked = "true";

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const clickText = link.textContent.trim() || "";
        const clickUrl = link.getAttribute("href") || "";
        const navLevel = index + 1; // Position in list (1-based)

        if (clickText && clickUrl && navLevel) {
          gtmPush({
            event: "navigation_click",
            navigation_type: "breadcrumb",
            click_text: clickText || "Breadcrumb",
            click_url: getNormalisedUrl(clickUrl),
            nav_level: navLevel,
          });
        }
      });
    });
  } // close function

  // 6. hero banner tracking
  function heroTracking() {
    const heroBanner = document.querySelector(".new-hero");
    if (!heroBanner) return;

    const link = heroBanner.querySelector(".cta");
    if (!link) return;

    link.addEventListener("click", function () {
      // Skip if already tracked
      if (link.dataset.bannerTracked) return;

      const linkTextRaw = link.textContent?.trim() || "";
      const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
      const linkUrl = link.getAttribute("href") || "";

      if (linkText && linkUrl) {
        gtmPush({
          event: "interaction_click",
          component_name: "banner",
          click_text: linkText,
          click_url: getNormalisedUrl(linkUrl),
        });
      }

      link.dataset.bannerTracked = "true";
    });
  } // close function

  // 7. Cards Home and News
  function cardsTracking() {
    const allCards = document.querySelectorAll(".cta");
    if (!allCards.length) return;

    // console.log({allCards});

    allCards.forEach((card) => {
      card.addEventListener("click", (e) => {
        maybePreventDefault(e);

        const clickedTarget = e.target;
        if (!clickedTarget) return;

        const cardParent = card.closest(".content-card"); // get the card wrapper
        if (!cardParent) return;

        const cardInnerTitle = cardParent.querySelector("h4"); // get the h4 from inside the card
        if (!cardInnerTitle) return;

        const h4Text = cardInnerTitle.textContent.replace(/\s+/g, " ").trim();
        const ctaText = clickedTarget.textContent.replace(/\s+/g, " ").trim();

        // Use h4 text only if CTA is "Read more", otherwise use CTA text
        const linkText = ctaText === "Read more" ? h4Text : ctaText;
        const linkUrl = cardParent.getAttribute("href") || "";

        // console.log(linkText, linkUrl);

        if (linkText && linkUrl) {
          gtmPush({
            event: "interaction_click",
            component_name: "card",
            click_text: linkText,
            click_url: getNormalisedUrl(linkUrl),
          });
        }
      });
    });
  } // close function

  // 8. Combination Panels Tracking (text, image, video, and links)
  function contentCombo() {
    const comboWrappers = document.querySelectorAll(".content-combo");
    if (!comboWrappers.length) return;

    comboWrappers.forEach((item) => {
      item.addEventListener("click", (e) => {
        maybePreventDefault(e);

        const target = e.target;
        if (!target) return;

        // Find the nearest relevant element: .cta, .video-wrapper, or a link
        const link = target.closest(".cta, .video-wrapper, a");
        if (!link) return;

        // IF Button has a class of CTA
        if (link.matches(".cta")) {
          const linkTextRaw = link.textContent?.trim() || "";
          const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
          const linkUrl = link.getAttribute("href") || "";

          gtmPush({
            event: "interaction_click",
            component_name: "content_combo",
            click_text: linkText,
            click_url: getNormalisedUrl(linkUrl),
          });
        }

        // IF Video placeholder is clicked
        else if (link.matches(".video-wrapper")) {
          const ytID = link.dataset.ytid;
          if (!ytID) return; // skip if no ID

          const linkUrl = `https://www.youtube.com/watch?v=${ytID}`;
          const linkText = "video_click";

          gtmPush({
            event: "interaction_click",
            component_name: "content_combo",
            click_text: linkText,
            click_url: linkUrl,
          });
        }

        // IF the text block has numerous inline links
        else if (link.tagName.toLowerCase() === "a") {
          const linkTextRaw = link.textContent?.trim() || "";
          const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
          const linkUrl = link.getAttribute("href") || "";

          gtmPush({
            event: "interaction_click",
            component_name: "content_combo",
            click_text: linkText,
            click_url: getNormalisedUrl(linkUrl),
          });
        }
      });
    });
  }

  // 9. Promo Panels
  function promoPanelTracking() {
    const promoPanels = document.querySelectorAll(".new-hero");
    if (!promoPanels.length) return;

    // console.log({promoPanels});

    promoPanels.forEach((panel) => {
      panel.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const linkEl = panel.querySelector("a.button");
        const linkTextRaw = linkEl.textContent?.trim() || "";
        const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
        const linkUrl = linkEl.getAttribute("href") || "";

        gtmPush({
          event: "interaction_click",
          component_name: "button",
          click_text: linkText,
          click_url: getNormalisedUrl(linkUrl),
        });
      });
    });
  } // close function

  // 10. copy intro
  function copyIntroLink() {
    const intro = document.querySelectorAll(".copy-intro");
    if (!intro.length) return;

    intro.forEach((item) => {
      const link = item.querySelector("a");
      if (!link) return;

      link.dataset.introClicked = "false";
      // Guard: skip if already tracked
      if (link.dataset.introClicked === "true") return;

      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const linkTextRaw = link.textContent?.trim() || "";
        const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
        const linkUrl = link.getAttribute("href") || "";

        if (linkText && linkUrl) {
          gtmPush({
            event: "interaction_click",
            component_name: "button",
            click_text: linkText,
            click_url: getNormalisedUrl(linkUrl),
          });
        }

        link.dataset.introClicked = "true";
      });
    });
  } // close function

  // 11. thumbnail list links
  function thumbLinks() {
    const contentLinks = document.querySelectorAll(".thumbnail-list a");
    if (!contentLinks.length) return;

    contentLinks.forEach((link) => {
      link.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const linkTextRaw = link.textContent?.trim() || "";
        const linkText = linkTextRaw.replace(/\s+/g, " ").trim();
        const linkUrl = link.getAttribute("href") || "";

        if (linkText && linkUrl) {
          gtmPush({
            event: "interaction_click",
            component_name: "thumbnail_list_links",
            click_text: linkText,
            click_url: getNormalisedUrl(linkUrl),
          });
        }
      });
    });
  }

  // 12. Generic Video (videos outside content-combo)
  function genericVideo() {
    const allVideos = document.querySelectorAll(".video-wrapper");
    if (!allVideos.length) return;

    allVideos.forEach((videoWrapper) => {
      if (videoWrapper.closest(".content-combo")) return; // Skip if it has a content-combo class (this also has videos)

      // Add click listener
      videoWrapper.addEventListener("click", function () {
        const ytID = videoWrapper.dataset.ytid;
        if (!ytID) return;

        const linkUrl = `https://www.youtube.com/watch?v=${ytID}`;

        gtmPush({
          event: "interaction_click",
          component_name: "video",
          click_url: linkUrl,
        });
      });
    });
  }

  // 13. Accordion Tracking (if exists)
  function AccordionTracking() {
    const accordions = document.querySelectorAll(".ga-accordion");
    if (!accordions.length) return;

    accordions.forEach((button) => {
      button.addEventListener("click", function (e) {
        maybePreventDefault(e);

        const listContainer = this.closest(".list"); // get each accordion item
        const heading = this.querySelector("h3"); // get its heading
        if (!listContainer || !heading) return;

        // The click tracking is firing before the attribute is changed
        setTimeout(() => {
          const isExpanded = this.getAttribute("aria-expanded") === "false";

          const itemTitle = heading.textContent
            .trim()
            .replace(/\s+/g, " ")
            .toLowerCase();

          gtmPush({
            event: "accordion_click",
            interaction_type: isExpanded ? "collapse" : "expand",
            component_name: "Accordion",
            component_element: itemTitle,
          });
        }, 300);
      });
    });
  } // close function

  // -------------------------------
  // Initialize all GTM tracking functions
  // -------------------------------
  //

  function gtmInit() {
    pagePreviewData();
    navigationTracking();
    footerTracking();
    breadcrumbTracking();
    anchorNav();
    heroTracking();
    stickyWrapperTracking();
    cardsTracking();
    contentCombo();
    promoPanelTracking();
    copyIntroLink();
    thumbLinks();
    genericVideo();
    AccordionTracking();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", gtmInit);
  } else {
    gtmInit();
  }
})();
