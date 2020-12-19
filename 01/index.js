const fs = require("fs").promises;
const { findTriple } = require("./lib");

fs.readFile('./input.txt').then((input) => {
  const numbers = input.toString()
    .trimEnd()
    .split(/[\r\n]+/)
    .map(val => parseInt(val, 10));

  const [a, b, c] = findTriple(2020, numbers);

  console.log(`The answer is ${a * b * c}`);
})
