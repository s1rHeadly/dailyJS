/* eslint-disable */
// @ts-nocheck

/**
 * LESSON A — &&, ||, Truthy / Falsy (Advanced Understanding)
 *
 * && and || do NOT return true or false.
 * They return values.
 */

// LOGICAL && (and)

a && b;

/**
 * Evaluates a
 * If a is falsy → return a
 * If a is truthy → return b
 * */

true && "Hello";

/**
 * true is truthy
 * So return "Hello"
 */

const element = document.querySelector(".btn");
element && element.classList.add("active"); // if element exists, then move on to the right and add the class of active

/**
 * If element is null → stop, return null
 * If element exists → run the second part
 */

// we can also do
const activeAdded = element && element.classList.add("active"); // again, if element exists, then move on to the right and add the class of active

const viewMoreSpan = activeAdded && glideContainer.querySelector("a span");
const viewMoreLink =
  glideContainer && glideContainer.querySelectorAll("a.moreLinks");

/**
 * JS evaluates activeAdded; → it does nothing because it’s just undefined or null.
 * It does not trigger the method again, and it does not “do anything meaningful” inside the if.*/

let x = 2;
if (x === 2) {
  activeAdded;
}

// correct way
let y = 2;
if (y === 2) {
  element && element.classList.add("active");
}

// LOGICAL  || 'OR'

a || b;

/**
 * Evaluate a
 * If a is truthy → return a
 * If a is falsy → return b*/

//example
null || "default";
// Result: 'default' because null is falsy

//example
const text = link.textContent.trim() || "";
// If trim() returns empty string → that's falsy
// So fallback to ''

//checking elements
if (!element1 || !element2 || !element3) return; // if false, if false, if false stop execution
// “If element1 does not exist OR element2 does not exist OR element3 does not exist, return early.”

// The Dangerous Side of ||
/**
 * Falsy values in JS:
  false
  0
  ""
  null
  undefined
  NaN
*/

const count = 0 || 10;
//result: 10

// Nested Ternary

// take this if statement
if (socialParent) return "social";
else if (sponsorsParent) return "sponsor";
else return linkText;

const category = socialParent
  ? "social"
  : sponsorsParent
    ? "sponsor"
    : linktext;
// If condition is truthy, return valueIfTrue; otherwise valueIfFalse. If the second condition is also false, default to linktext.

// example in a div:
// <div className={socialParent ? 'social' : sponsorsParent ? 'sponsor' : 'default'}></div

// Alternatives to nested ternaries
let category;

if (socialParent) {
  category = "social";
} else if (sponsorsParent) {
  category = "sponsor";
} else {
  category = linkText;
}

// object mapping (great if you have many conditions):
const mapping = {
  socialParent: "social",
  sponsorsParent: "sponsor",
};

const category = socialParent
  ? mapping.socialParent
  : sponsorsParent
    ? mapping.sponsorsParent
    : linkText;

/**
     * Check socialParent → is it truthy?
      ✅ If yes → category = mapping.socialParent → 'social'
      ❌ If no → check sponsorsParent
    
    Check sponsorsParent → is it truthy?
    ✅ If yes → category = mapping.sponsorsParent → 'sponsor'
    ❌ If no → category = linkText
    
    */

// =============================================================================
// SUMMARY — || (OR) in plain English
// =============================================================================
// The || operator picks the first truthy value, or the last value if all are falsy.
//
// Think of || like asking:
//
//   "Do you have this? If yes → use it.
//    If not, do you have that? If yes → use it.
//    If not, try the next thing…"
//
// It's like checking your pockets for your keys, wallet, then phone:
//
//   const thingToUse = pocket1 || pocket2 || pocket3;
//
//   • If pocket1 has something → stop, use it.
//   • If not → check pocket2.
//   • If that's empty → check pocket3.
//
// Example:
//
//   const name = userInput || defaultName || "Anonymous";
//
// Step by step:
//
//   1. Check userInput → is it truthy (has a real value)?
//      If yes → use it. Done.
//   2. If no → move to next. Check defaultName → is it truthy?
//      If yes → use it. Done.
//   3. If no → move to next. Use "Anonymous" as the last fallback.







// =============================================================================
// SUMMARY — && (AND) in plain English
// =============================================================================
// The && operator returns the first falsy value, or the last value if all are truthy.
//
// Think of && like asking:
//
//   "Do you have this and this and this?"
//   "If anything is missing → stop right there."
//
// It's like checking your pockets for a set of items you need all together before you can do something:
//
//   const canGoOut = wallet && keys && phone;
//
// Step by step:
//
//   • Check wallet → do you have it?
//     If yes → check keys.
//     If no → stop immediately → result is wallet (falsy).
//
//   • Check keys → do you have it?
//     If yes → check phone.
//     If no → stop immediately → result is keys (falsy).
//
//   • Check phone → do you have it?
//     If yes → all items are present → result is phone (the last value).
//
// Example in JS:
//
//   const canDrive = hasLicense && hasCar && hasFuel;
//
//   • If hasLicense is false → stops immediately → you cannot drive.
//   • If hasLicense is true but hasCar is false → stops at hasCar.
//   • Only if all three are true → returns the last one (hasFuel) → you can drive.