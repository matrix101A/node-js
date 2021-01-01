const { resolve } = require("path");

console.log(summarizeUser("Abhinav", 19, "coding "));

function summarizeUser(userName, userAge, userHobbies) {
  return `Name is ${userName} age is ${userAge}  hobbies are ${userHobbies} `;
}

let a = 10; // can change value later
const b = "abhinav"; //cannot change
a = 20;
console.log(a);

//arrow functions

const summarizeUser1 = (userName, userAge, userHobbies) => {
  return `Name is ${userName} age is ${userAge}  hobbies are ${userHobbies} `;
};

//shorthad for same function
const summarizeUser2 = (userName, userAge, userHobbies) =>
  `Name is ${userName} age is ${userAge}  hobbies are ${userHobbies} `;

console.log(summarizeUser1("Abhinav", 19, "coding "));

//objects and promises

const person = {
  name: "ABhinav Tiwari",
  age: 29,
  profession: "student",
  greet() {
    // greet is a method of this object . NOTE - its not a function
    return `Hi I am ${this.name}`;
  },
};

console.log(person.greet());

//arrays

const hobbies = ["badminton", "coding"];
//looping array
for (let hobby of hobbies) {
  console.log(hobby);
}
// map function
console.log(
  hobbies.map((hobby) => hobby + "is my hobby "),
  hobbies
);

//push method
hobbies.push("cycling ");

//rest and spread operator
let hobbies1 = hobbies.slice(); //copies hobbies
console.log(hobbies1);

hobbies1 = [...hobbies, "wow"]; //using spread operator in array
console.log(hobbies1);
let person1 = { ...person, greeting: "hello" }; //using spread operator with object
console.log(person1);

const toArray = (...args) => {
  // makes an array of arguements
  return args;
};

console.log(toArray(1, 2, 3, 4));

//destructuring
const printName = ({ name, age }) => {
  //destructuring name and age from the arguement object
  console.log(name, age);
};

const { name, age } = person; //destructuring name and age from person object
console.log(name, age);
printName(person);

//promises

//example od asynchronous code

setTimeout(() => {
  //this is a callback function
  console.log("TimerUp");
  fetchData() //resolves the promise
    .then((text) => {
      console.log(text);
      return fetchData(); //returns another promise
    })
    .then((text2) => {
      //resolves the 2nd promise
      console.log(text2);
    });
}, 2000);

// Another way of doing
const fetchData = () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Done");
    }, 1500);
  });
  return promise; //return a promise
};

//promices
