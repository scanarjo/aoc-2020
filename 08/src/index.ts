import { promises as fs } from 'fs';
import { Machine } from './Machine';

fs.readFile('./input.txt').then(program => {
  const machine = new Machine(program.toString());

  try {
    const result = machine.run();

    console.log('Program executed successfully. Result: ', result);
  } catch (error) {
    console.log('Program failed to execute. Last value: ', machine.currentValue);
  }
})
