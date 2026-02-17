const user = {
  name: "David",
  age: 30,
};

// Update using dot notation
user.name = "John";
console.log(user.name); // "John"

// Update using bracket notation
user["age"] = 31;
console.log(user.age); // 31

user.country = "Australia"; // updating with dot notation

/** bracket notation */
const key = "job";
user[key] = "developer";
console.log(user.job); // developer

//? Excercise: change a property and create a new property

const car = {
  make: "Mercedes", // small typo fix
  model: "C63 AMG",
  year: 2013,

  // Method to return car info
  getCarInfo: function () {
    // Use template literal with proper backticks
    return `Make: ${this.make}, Model: ${this.model}, Year: ${this.year}, Color: ${this.color || ""}`;
  },
};

// Change year property
car.year = 2026;

// Create new property dynamically
const colorKey = "color";
car[colorKey] = "red";

// Log the full object
console.log(car);

// Log just the color
console.log(car.color); // "red"

// Call the method
console.log(car.getCarInfo());
// "Make: Mercedes, Model: C63 AMG, Year: 2026, Color: red"

// or when the method becomes a variable
const carInfo = car.getCarInfo.bind(car); // bind `this` to car
console.log(carInfo()); // ✅ "Make: Mercedes, Model: C63 AMG, Year: 2026, Color: red"
