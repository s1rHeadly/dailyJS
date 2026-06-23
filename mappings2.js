// The Problem

// Imagine this pattern (very common in beginner code):

function handleWorkout(type) {
  if (type === "running") {
    console.log("Start running logic");
  } else if (type === "cycling") {
    console.log("Start cycling logic");
  } else if (type === "swimming") {
    console.log("Start swimming logic");
  }
}

// Problems:
// Gets longer every time you add a type
// Hard to maintain
// Violates "open/closed principle"
// Hard to reuse logic elsewhere

// Step 1 — Extract the behaviours

function running() {
  console.log("Start running logic");
}

function cycling() {
  console.log("Start cycling logic");
}

function swimming() {
  console.log("Start swimming logic");
}

//  Step 2 — Put them into an object (map)

const workoutHandlers = {
  running,
  cycling,
  swimming,
};

// Step 3 = Replace the entire if else chain

function updatedhandleWorkout(type) {
  const handler = workoutHandlers[type]();
  if (!handler) return;

  return handler();
}

//call it
workoutHandlers["cycling"]();
