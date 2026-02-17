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
