import tap from 'tap';

import { acc, jmp, MachineState, nop } from './instructions';

tap.test('acc()', async t => {
  t.test('should increment the accumulator by the value provided', async t => {
    const state = acc(3, new MachineState());

    t.equals(state.accumulator, 3);
  });

  t.test('should decrement the accumulator by the value provided if negative', async t => {
    const state = acc(-3, new MachineState());

    t.equals(state.accumulator, -3);
  });

  t.test('should keep a correct running total in the accumulator', async t => {
    const initialState = new MachineState();

    const state1 = acc(2, initialState);

    t.equals(state1.accumulator, 2);

    const state2 = acc(3, state1);

    t.equals(state2.accumulator, 5);
  })
});

tap.test('nop()', async t => {
  t.test('should return the MachineState provided to it', async t => {
    const state = new MachineState();

    t.deepEquals(nop(5, state), state);
  })
})

tap.test('jmp()', async t => {
  t.test('should increment the currentInstruction by the argument to jmp', async t => {
    const state = new MachineState();

    t.equals(jmp(15, state).currentInstruction, 15);
  })

  t.test('when called on a non-zero instruction it should move to the correct next instruction', async t => {
    const state = new MachineState();

    const state1 = jmp(3, state);

    const state2 = jmp(4, state1);

    t.equals(state2.currentInstruction, 7);
  })
})
