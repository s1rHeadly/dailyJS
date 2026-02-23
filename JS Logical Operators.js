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
// If condition is truthy, it returns valueIfTrue, Otherwise, it returns valueIfFalse. IF the second condition is also false, then defualt to linktext

// example in a div:
// <div className={socialParent ? 'social' : sponsorsParent ? 'sponsor' : 'default'}></div

// lternatives to nested ternaries
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
