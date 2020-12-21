import { promises as fs } from 'fs';

import { parseSeatCode } from './boardingPasses';

fs.readFile('./input.txt').then(file => {
  const largestId = file
    .toString()
    .trim()
    .split(/[\r\n]+/)
    .map(parseSeatCode)
    .reduce((currentMax, { id }) => Math.max(currentMax, id), 0);

  console.log('The largest Seat ID is: ', largestId);
})
