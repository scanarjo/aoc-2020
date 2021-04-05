import tap from 'tap';

import { parseInstruction, parseProgram } from './loadProgram';

tap.test('parseInstruction()', async t => {
  t.test('should parse the command correctly', async t => {
    const [command] = parseInstruction('acc +99');

    t.equals(command, 'acc');
  })

  t.test('should parse the argument correctly for a positive number', async t => {
    const [, argument] = parseInstruction('acc +99');

    t.equals(argument, 99);
  })

  t.test('should parse the argument correctly for a negative number', async t => {
    const [, argument] = parseInstruction('acc -12');

    t.equals(argument, -12);
  })
})

const testProgram = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
`;

tap.test('parseProgram()', async t => {
  t.test('should parse the correct number of instructions', async t => {
    t.equals(parseProgram(testProgram).length, 9);
  });

  t.test('should parse the correct instructions', async t => {
    const instructions = parseProgram(testProgram);

    t.strictEquivalent(instructions[0], ['nop', 0]);
    t.strictEquivalent(instructions[8], ['acc', 6]);
  });
})
