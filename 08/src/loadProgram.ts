export const parseInstruction = (instruction: string) => [
  instruction.substring(0, 3),
  Number(instruction.substring(4))
];

export const parseProgram = (input: string) => input
  .trim()
  .split(/\r?\n/)
  .map(parseInstruction);
