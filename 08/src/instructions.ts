import { MachineState } from "./MachineState";

export const nop = (value: number, state: MachineState) => state;

export const acc = (value: number, state: MachineState) => ({
  ...state,
  accumulator: state.accumulator + value
});

export const jmp = (offset: number, state: MachineState) => ({
  ...state,
  currentInstruction: state.currentInstruction + offset
});
