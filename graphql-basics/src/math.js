const add = (num1, num2) => {
  return num1 + num2;
};

const substract = (num1, num2) => {
  if (num1 > num2) {
    return num1 - num2;
  }
  return num2 - num1;
};

export { add as default, substract };
