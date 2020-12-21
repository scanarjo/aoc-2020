import tap from 'tap';

import { parseSeatCode } from './boardingPasses';

tap.test('parseSeatCode()', async t => {
  t.test('should return the correct row', async t => {
    const { row } = parseSeatCode('FBFBBFFRLR');

    t.equals(row, 44);
  })

  t.test('should return the correct column', async t => {
    const { column } = parseSeatCode('FBFBBFFRLR');

    t.equals(column, 5);
  })

  t.test('should return the correct id', async t => {
    const { id } = parseSeatCode('FBFBBFFRLR');

    t.equals(id, 357);
  })
})
