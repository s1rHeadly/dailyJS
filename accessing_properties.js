/* eslint-disable */
// @ts-nocheck



//? basic object

const user = {
  name: "david",
  age: 30,
};

/* Dot Notation*/
console.log(user.name);
console.log(user.age);

const person = user["name"];
console.log(person);

// or

const key = "name";
const person1 = user[key]; // ✅ works
console.log(person1); // "david"

//? Note
/*
Here "name" must be a string, because bracket notation expects a string or variable representing the property name.
Result → "david".

You can’t just write user[name] unless there’s a variable called name.
If you wrote user[name] without defining name, JS will throw a ReferenceError.
*/

//? Dynamic object construction

// At the lowest level, dynamically adding to an object is just:
const obj = {};
obj[key] = value;
/**
The important part:
The property name comes from a VARIABLE, not a literal.
That’s the foundation.
*/

// Classic Loop Example
const categories = ["social", "sponsor", "inline"];
const results = {};
categories.forEach((item) => {
  results[item] = 0;
});
console.log(results);

// {
//   social: 0,
//   sponsor: 0,
//   inline: 0
// }

/**
category becomes the property name
We are not writing .category
We are using bracket notation
This is fundamental.
*/

// This is where many devs get sloppy.

// ❌ Wrong
// result.category = 0;

// That literally creates: { category: 0 }

// ✅ Correct
// result[category] = 0; Because category is a variable.

// Building from Another Data Source
const links = document.querySelectorAll("a");
const clickMap = {};

links.forEach((link) => {
  const href = link.getAttribute("href");

  if (!href) return;

  clickMap[href] = 0;
});

// {
//   "/about": 3,
//   "/contact": 1,
//   "/pricing": 7
// }

// Incrementing Dynamically (Very Important)
// You want to count occurrences.

const getAllInlineLinks = [
  "read more",
  "read more",
  "contact",
  "subcribe",
  "read more",
  "contact",
];

let allLinkData = {};

getAllInlineLinks.forEach((item) => {
  if (!allLinkData[item]) {
    allLinkData[item] = 0;
  }
  allLinkData[item]++;
});

// result: {read more: 3, contact: 2, subcribe: 1}

// Real Architecture Example (Tracking Payload)
// Imagine you're building a tracking object dynamically:

let globalObject = {};
function buildPayloadWrong(link, obj) {
  // never mutate a global object
  // You are mutating something that exists outside the function. NEVER DO THIS
  // Now your function behavior depends on:
  // What was previously in obj
  // Whether keys overlap
  // Whether another dev reused the same object
  // That creates:
  // Hidden side effects
  // Implicit coupling
  // Debugging complexity
  // Potential overwrites
}

function buildPayload(link) {
  if (!link) return {};

  const text = link.textContent.trim();
  const href = link.getAttribute("href");

  const payload = {};

  if (text) payload.text = text;
  if (href) payload.url = href;

  return payload;
}

const existingObj = buildPayload(testLink);
buildPayload(testLink, existingObj);

/**
 
No external mutation
Pure function
Easier to test
Easier to reuse
Safer in larger systems
*/




// Here’s The Real Maturity Shift

let obj = {};

// When you write:
obj.text = ...
// You’re thinking:  “Modify something.”


// When you write:
return { ... }
// You’re thinking: “Produce something.”

// That’s a different mental model.