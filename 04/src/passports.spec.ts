import tap from 'tap';

import { parsePassport, validatePassport } from './passports';

tap.test('parsePassport()', async t => {
  t.test('should create a well structured passport object', async t => {
    const samplePassport = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm
    `;

    t.strictDeepEquals(parsePassport(samplePassport), {
      ecl: 'gry',
      pid: '860033327',
      eyr: '2020',
      hcl: '#fffffd',
      byr: '1937',
      iyr: '2017',
      cid: '147',
      hgt: '183cm'
    });
  });
});

tap.test('validatePassport()', async t => {
  const validPassport = parsePassport(`
eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm
  `);

  const createInvalidPassport = (prop: string, val: string) => ({
    ...validPassport,
    [prop]: val
  });

  t.test('should return true for a passport with all required fields', async t => {
    t.ok(validatePassport(validPassport));
  });

  t.test('should return false for a passport with missing required fields', async t => {
    t.notOk(validatePassport({ byr: '1990' }));
  });

  t.test('should return false for a passport with a birth year that is too old', async t => {
    const invalidPassport = createInvalidPassport('byr', '1919');

    t.notOk(validatePassport(invalidPassport));
  });

  t.test('should return false for a passport with a birth year that is too recent', async t => {
    const invalidPassport = createInvalidPassport('byr', '2003');

    t.notOk(validatePassport(invalidPassport));
  });

  t.test('should return false for a passport with an invalid issue year', async t => {
    t.notOk(validatePassport(createInvalidPassport('iyr', '2009')), 'Allows issue year from too long ago');
    t.notOk(validatePassport(createInvalidPassport('iyr', '2021')), 'Allows issue year from the future');
  });

  t.test('should return false for a passport with an invalid expiration year', async t => {
    t.notOk(validatePassport(createInvalidPassport('eyr', '2019')), 'Allows expiry year from the past');
    t.notOk(validatePassport(createInvalidPassport('eyr', '2031')), 'Allows expiry year from too far in the future');
  });

  t.test('should return false for a passport with an invalid height', async t => {
    t.notOk(validatePassport(createInvalidPassport('hgt', '200')), 'Allows height with no unit');
  });

  t.test('should return false for a passport with an invalid height in cm', async t => {
    t.notOk(validatePassport(createInvalidPassport('hgt', '149cm')), 'Allows too short height');
    t.notOk(validatePassport(createInvalidPassport('hgt', '194cm')), 'Allows too tall height');
  });

  t.test('should return false for a passport with an invalid height in inches', async t => {
    t.notOk(validatePassport(createInvalidPassport('hgt', '58in')), 'Allows too short height');
    t.notOk(validatePassport(createInvalidPassport('hgt', '77in')), 'Allows too tall height');
  });

  t.test('should return false for a passport with an invalid hair colour', async t => {
    t.notOk(validatePassport(createInvalidPassport('hcl', 'aaa111')), 'Allows missing # symbol');
    t.notOk(validatePassport(createInvalidPassport('hcl', '#000ggg')), 'Allows invalid characters');
    t.notOk(validatePassport(createInvalidPassport('hcl', '#000ffff')), 'Allows too long value');
  });

  t.test('should return false for a passport with an invalid eye colour', async t => {
    t.notOk(validatePassport(createInvalidPassport('ecl', 'blue')));
  });

  t.test('should return false for a passport with an invalid passport id', async t => {
    t.notOk(validatePassport(createInvalidPassport('pid', '12345678')), 'Allows too short id');
    t.notOk(validatePassport(createInvalidPassport('pid', '1234567890')), 'Allows too long id');
    t.notOk(validatePassport(createInvalidPassport('pid', 'abc456789')), 'Allows invalid characters');
  });
});
