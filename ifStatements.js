// Separate ifs
//
// If I'm hungry, eat.
// If I'm tired, sleep.
//
// Both things can be true.

const hungry = true;
const tired = true;

function eat() {
  console.log("Eating...");
}

function sleep() {
  console.log("Sleeping...");
}

if (hungry) {
  eat();
}

if (tired) {
  sleep();
}

// You can be hungry AND tired.
// Both blocks can run in the same pass.

// if / else
//
// If it's raining, take an umbrella.
// Else, don't.
//
// Only one can happen.

const raining = false;

function takeUmbrella() {
  console.log("Taking an umbrella.");
}

function dontTakeUmbrella() {
  console.log("No umbrella needed.");
}

if (raining) {
  takeUmbrella();
} else {
  dontTakeUmbrella();
}

// It's either raining or it isn't.
// Exactly one branch runs — never both.
