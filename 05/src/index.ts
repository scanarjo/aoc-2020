import { promises as fs } from 'fs';

import { parseSeatCode } from './boardingPasses';

fs.readFile('./input.txt').then(file => {
  const seatIds = file
    .toString()
    .trim()
    .split(/[\r\n]+/)
    .map(parseSeatCode)
    .map(({ id }) => id)
    .sort((a, b) => a - b);

  const largestId = seatIds[seatIds.length - 1];

  console.log('The largest Seat ID is: ', largestId);

  const candidateSeatIds = [];

  for (let index = 0; index < seatIds.length; index++) {
    const candidateId = seatIds[index];

    if(seatIds[index + 1] === candidateId + 2) {
      candidateSeatIds.push(candidateId + 1);
    }
  }

  console.log('Your seat is one of: ', candidateSeatIds);
})
