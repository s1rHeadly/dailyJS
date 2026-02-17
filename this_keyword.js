/* this keywork


Concept: What this really is

this is the object that is currently “owning” the code being executed.

The value of this depends entirely on how a function is called, not where it’s defined.

Key principle:

this is set at call time, not at write time.

2️⃣ Rules of this
Context	this value
Global scope (strict mode)	undefined
Global scope (non-strict)	window (or global in Node)
Inside a function (non-arrow)	Depends on how the function is called
Method on an object	The object itself
Arrow function	Lexical this (inherits from surrounding scope)
Event listener	The element receiving the event
Class / constructor function	The instance created by new


*/

const greetObj1 = {
  name: "david",
  greet: () => console.log(this.name), // inside arrrow func, wont work as this refers to the window pobject
};

console.log("greetObj1", greetObj1);

const greetObj2 = {
  name: "david",
  greet: function () {
    console.log(this.name);
  },
};

greetObj2.greet("greetObj2", greetObj2);

const userName = {
  name: "David",
  user: function () {
    console.log(this.name);
  },
};

const getUser = userName.user();
console.log(getUser); //! Wrong
/*
userName.user() calls the function immediately
Inside user(), console.log(this.name) runs → prints "David"
The function does not return anything, so getUser gets the value undefined
Then console.log(getUser) → prints undefined
*/

/* This as  a declarative function vs arrow functiob */

button.addEventListener("click", function () {
  console.log(this); // the button
});

//vs

button.addEventListener("click", () => {
  console.log(this); // ❌ not the button
});

/* Binding */

const getUserCorrect = userName.user.bind(userName); // .bind(userName) creates a new function where this is locked to userName
console.log(getUserCorrect());

//? To aassign getUserCorrect() to a vaiable the function MUST return something so console logging from the function will return undefined

const userName2 = {
  name: "David",
  user: function () {
    return this.name; // return instead of console.log
  },
};

const getUser2 = userName.user.bind(userName);
const user = getUser2(); // now test = "David"
console.log(user); // "David"

/* this and binding */

// The problem
const menu = {
  isOpen: false,

  open() {
    this.isOpen = true;
    console.log("Menu open:", this.isOpen);
  },
};

const button = document.querySelector("#menuBtn");
button.addEventListener("click", menu.open);

/**
 What you expect to happen

Menu open: true

What ACTUALLY happens:
this is not menu
In a browser, this becomes the button (or undefined in strict mode)
menu.isOpen never updates


Rule to burn into your brain 🔥

this is decided at CALL TIME, not where the function is written
Here, the browser calls it like this:

menu.open.call(button);
So this === button

*/

// Fix #1: .bind() (most common, safest)
button.addEventListener("click", menu.open.bind(menu));

// Fix #2: Wrapper function (very explicit)
button.addEventListener("click", function () {
  menu.open();
});

// or

button.addEventListener("click", () => {
  menu.open();
});

/**
 * What is 'this' in this case

  const fn = menu.open;
  fn();

  'this' is not menu.

Why?

Because when you call fn(), there is no object to the left of the dot.

There is no:

menu.open()


you are effectively doin this...and There is no memory of menu stored inside the function.

const fn = function open() {
  this.isOpen = true;
};


THIS is the MENU
const fn = menu.open.bind(menu);
fn(); // this === menu

*/

/**
 * Recap
 *
 * */

(function () {
  // ===== OBJECT + METHOD =====
  const menu = {
    isOpen: false,
    open() {
      this.isOpen = true;
      console.log("Menu open:", this.isOpen, "| this:", this);
    },
  };

  // ===== EVENT LISTENER WITHOUT BIND (will break) =====
  const button = document.querySelector("#menuBtn");
  // button.addEventListener('click', menu.open); // ❌ broken example

  // ===== FIXED: USING BIND =====
  button.addEventListener("click", menu.open.bind(menu));

  // ===== OR FIXED: WRAPPER FUNCTION =====
  // button.addEventListener('click', () => menu.open());
})();
