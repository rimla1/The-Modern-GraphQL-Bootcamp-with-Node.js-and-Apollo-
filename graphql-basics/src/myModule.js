// named export
const message = "Hello from myModule.js";

const name = "Almir";

// default export
const location = "Serbia";

// function export
const sumNumbers = (num1, num2) => {
  console.log(num1 + num2);
};

export { message, name, sumNumbers, location as default };
