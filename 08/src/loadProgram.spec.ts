import tap from 'tap';

const parseInstruction = (instruction: string) => [
  instruction.substring(0, 3),
  Number(instruction.substring(4))
];

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
