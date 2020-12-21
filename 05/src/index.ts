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

  const candidateSeatIds = [];
  for (let candidateId = seatIds[0]; candidateId < largestId; candidateId++) {
    if(seatIds.find(id => id === candidateId)) continue;

    if(seatIds.find(id => id === candidateId + 1) && seatIds.find(id => id === candidateId - 1)) {
      candidateSeatIds.push(candidateId);
    }
  }

  console.log('Your seat is one of: ', candidateSeatIds);

  console.log('The largest Seat ID is: ', largestId);
})
