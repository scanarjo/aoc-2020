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
  t.beforeEach((done, t) => {
    const validPassport = parsePassport(`
eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm
    `);

    t.context = {
      validPassport
    };

    done();
  })

  t.test('should return true for a passport with all required fields', async t => {
    t.ok(validatePassport(t.context.validPassport));
  });

  t.test('should return false for a passport with missing required fields', async t => {
    t.notOk(validatePassport({ byr: '1990' }));
  });

  t.test('should return false for a passport with a birth year that is too old', async t => {
    const { validPassport } = t.context;

    const invalidPassport = {
      ...validPassport,
      byr: '1919'
    };

    t.notOk(validatePassport(invalidPassport));
  });
});
