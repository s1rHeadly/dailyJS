// Step 1 – The Problem With “Just Add a Click Listener”
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log("clicked");
  });
});

/**
 Problems:
Breaks if new buttons are added dynamically
Can double-fire if reinitialized
Hard to maintain at scale
*/

// Step 2 – Proper Delegated Tracking Pattern

// add the event
function initTracking() {
  document.addEventListener("click", handleClick);
}

// handle the click event with conditions
function handleClick(e) {
  const target = e?.target;
  if (!target) return;

  const link = target.closest(".trackable-link");
  if (!link) return;

  if (alreadyTracked(link)) return;

  track(link); //otherwise lets track
}

// check if already tracked
function alreadyTracked(link) {
  return link.dataset.tracked === "true"; // === returns true or false, 'three equals is comparison'
}

// add tracking
function markAsTracked(link) {
  link.dataset.tracked = "true"; // set the dataset to true 'one equals'
}

function track(link) {
  markAsTracked(link);
  console.log({ link });
  console.log(link.textContent);
}





// Thinking by structure - not value

/* THE HTML TO WORK WITH

  ?? TARGET THE ' <a href="/about">inline link</a> inside text only

<div class="page">

  <!-- This should track -->
  <div class="lpd-copy">
    <p>
      This is some content with an 
      <a href="/about">inline link</a> 
      inside text.
    </p>
  </div>

  <!-- This should NOT track (button style link) -->
  <div class="lpd-copy">
    <a href="/contact" class="btn primary">
      Contact Us
    </a>
  </div>

  <!-- This should NOT track (explicit skip) -->
  <div class="lpd-copy">
    <p>
      Read our 
      <a href="/privacy" data-skip="true">privacy policy</a>.
    </p>
  </div>

  <!-- This should NOT track (outside lpd-copy) -->
  <div class="footer">
    <a href="/terms">Terms & Conditions</a>
  </div>

</div>
*/


// A short answer would be to get the link with the href value but DO NOT think of a value as this would be 
/*

The Problem With Matching href === "/about"

It only works for one URL
Every new inline link requires code changes
It’s not reusable
It’s brittle
That’s not production thinking.
*/


//? What We Actually Want

// We don’t want to check a specific href.

// We want to check:
// Is it an <a>?
// Is it inside .lpd-copy?
// Is it NOT a button-style link?
// Does it NOT have data-skip="true"?
// Those are structural rules — not content rules.

// Senior dev rule:
// Never hardcode business content when you can enforce structural rules.

