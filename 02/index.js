const fs = require("fs").promises;

const { validatePasswordEntry } = require("./passwords");

fs.readFile('./input.txt').then((file) => {
  const validPasswordCount = file
    .toString()
    .trim()
    .split(/[\r\n]+/)
    .filter(validatePasswordEntry)
    .length;

  console.log('Number of valid passwords: ', validPasswordCount);
})
