import tap from 'tap';

import { parsePassport, validatePassport } from './passports';

const samplePassport = `
ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm
`;

tap.test('parsePassport()', async t => {
  t.test('should create a well structured passport object', async t => {
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
  t.test('should return true for a passport with all required fields', async t => {
    const validPassport = parsePassport(samplePassport);

    t.ok(validatePassport(validPassport));
  });

  t.test('should return false for an invalid passport', async t => {
    t.notOk(validatePassport({ byr: '1990' }));
  });
});
