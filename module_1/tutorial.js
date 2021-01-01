const sum = (num1, num2) => {
  return num1 + num2;
};
const PI = 3.14;
class someMathObject {
  constructor() {
    console.log("yo i am constructor ");
  }
}
module.exports.sum = sum;

module.exports.PI = PI;

module.exports.someMathObject = someMathObject;
