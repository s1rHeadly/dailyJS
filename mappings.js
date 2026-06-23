const workout = {
  type: "cycling",
};

const icons = {
  running: "🏃",
  cycling: "🚴",
};

console.log(icons[workout.type]);

/**
 * Step 1 : JavaScript sees: icons[workout.type]

      Before it can access icons, it must evaluate what's inside the brackets: workout.type


  Step 2 : JavaScript looks inside the workout object:

  {
    type: 'cycling'
  }

  and gets: 'cycling'

  Now the expression becomes:

  icons['cycling']


  Step 3 : JavaScript looks inside the icons object:

  {
    running: '🏃',
    cycling: '🚴'
  }

  and finds the key: cycling

  whose value is: '🚴'

  Step 4 : Output:

  🚴
  */

//?

//   The Rule

// In this expression:

// icons[workout.type]

// JavaScript does this in two steps:

// Step 1 — Evaluate inside the brackets first
// workout.type

// becomes:

// 'cycling'
// Step 2 — Use the result as the key

// Now the expression becomes:

// icons['cycling']
// Step 3 — Perform lookup

// JavaScript finds:

// {
//   running: '🏃',
//   cycling: '🚴'
// }

// and returns:

// '🚴'
// 🧠 The Important Concept

// Yes:

// The expression inside [] is always evaluated first.

// But more precisely:

// JavaScript rule:

// “Bracket notation evaluates whatever is inside the brackets, then uses the result as the property key.”

//? One more example (very important)
const key = "banana";

const fruitIcons = {
  banana: "🍌",
};

// This: fruitIcons.key

// → looks for "key" ❌

// This: fruitIcons[key]

// → becomes: fruitIcons['banana']

// → 🍌

// 🧠 Mental model to remember forever

// Think:

// Dot notation:

// “I already know the key”

// Bracket notation:

// “I will figure out the key at runtime”
