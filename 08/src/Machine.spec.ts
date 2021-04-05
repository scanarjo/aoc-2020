import tap from 'tap';

import { Machine } from './Machine';

const simpleTestProgram = `
acc +1
acc +2
nop +0
acc +3
`;

tap.test('Machine', async t => {
  t.test('should have an initial currentInstruction of 0', async t => {
    const machine = new Machine(simpleTestProgram);

    t.equals(machine.currentLineNumber, 0);
  })

  t.test('should load the program correctly', async t => {
    const machine = new Machine(simpleTestProgram);

    t.equals(machine.programLength, 4);
  })

  t.test('run()', async t => {
    t.test('should return the correct value for a halting program', async t => {
      const machine = new Machine(simpleTestProgram);

      t.equals(machine.run(), 6);
    });

    t.test('should throw an error if an infinite loop is detected', async t => {
      const nonHaltingProgram = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

      const machine = new Machine(nonHaltingProgram);

      t.throws(() => machine.run(), new Error('Infinite loop detected'));
    })
  })
})
