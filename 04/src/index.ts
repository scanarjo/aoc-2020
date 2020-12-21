import { promises as fs } from "fs";

import { parsePassport, validatePassport } from "./passports";

fs.readFile('./input.txt').then(file => {
  const validPassportCount = file
    .toString()
    .trim()
    .split(/[\r\n]{2,4}/)
    .map(parsePassport)
    .filter(validatePassport)
    .length;

  console.log('Number of valid passports: ', validPassportCount);
})
