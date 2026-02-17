/***
 * Basic callback
 *
 * A callback is:
 * A function passed into another function to be executed later.
 */

function greet(name) {
  console.log(`Hello ${name}`);
}

function processUserName(callback) {
  // this is a placeholder function
  const name = "David";
  callback(name); // call the placeholder function
}

processUserName(greet); //evoke the processUserName function and pass in the actual function that was initiually that placeholder function
/**
 * We pass the function
 * We don’t call it (greet, not greet())
 */

/**
 * Callbacks are heavily used for:
 * Events
 * Timers
 * API calls
 * Async operations

Example with a timer:
*/

setTimeout(function () {
  // The function() is the callback.
  console.log("This runs later");
}, 2000);

// example using the function callback

function fetchData(callback) {
  setTimeout(() => {
    const data = { name: "David" };
    callback(data);
  }, 2000);
}

fetchData(function (data) {
  /** using the function callback syntax above*/
  console.log(data);
});

/**
 * Write a function loadScript(callback)
wait 1 second and call the string "Script loaded"
*/

function loadScript(callback) {
  const string = "Script Loaded";
  setTimeout(() => {
    callback(string); // this is the callback
  }, 1000);
}

// now we are calling the loadscript function and using an anonymous function to pull in the callback, 'message' can be any param
loadScript(function (message) {
  console.log(message);
});

// or arrow
loadScript((message) => {
  console.log(message); // <-- here we “get” the value
});

/**
 Mental Model
 Your first function (loadScript) does not return the value.
It hands the value to your callback function later, whenever it’s ready.
Your callback function is like a “receiver” that says: “ok, now I have the value — I can do something with it.”

Think of it like ordering coffee:
You ask the barista to make coffee (loadScript).
You give them your phone number (callback) so they can call you when it’s ready.
The barista makes the coffee (string) and calls you (callback(string)).
You answer the phone (function(message)) and enjoy your coffee (console.log(message)).
*/

