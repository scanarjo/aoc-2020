const fs = require("fs").promises;
const { findPair } = require("./lib");

fs.readFile('./input.txt').then((input) => {
  const numbers = input.toString()
    .trimEnd()
    .split(/[\r\n]+/)
    .map(val => parseInt(val, 10));

  const [a, b] = findPair(2020, numbers);

  console.log(`The answer is ${a * b}`);
})
