import { acc, jmp, nop } from './instructions';
import { Instruction, parseProgram } from './loadProgram';
import { MachineState } from './MachineState';

export class Machine {
  #state = new MachineState;
  #instructions: Instruction[];
  #history: number[] = [];

  constructor(program: string) {
    this.#instructions = parseProgram(program);
  }

  get currentLineNumber() {
    return this.#state.currentInstruction;
  }

  get programLength() {
    return this.#instructions.length;
  }

  get currentValue() {
    return this.#state.accumulator;
  }

  private executeInstruction([command, argument]: [string, number]) {
    if (this.#history.includes(this.currentLineNumber)) {
      throw new Error('Infinite loop detected');
    }

    this.#history.push(this.currentLineNumber);

    switch (command) {
      case 'acc':
        this.#state = acc(argument, this.#state);
        this.#state.currentInstruction += 1;
        return;
      case 'nop':
        this.#state = nop(argument, this.#state);
        this.#state.currentInstruction += 1;
        return;
      case 'jmp':
        this.#state = jmp(argument, this.#state);
        return;
    }
  }

  run() {
    while (this.currentLineNumber >= 0 && this.currentLineNumber < this.#instructions.length) {
      this.executeInstruction(this.#instructions[this.currentLineNumber]);
    }

    return this.currentValue;
  }
}
