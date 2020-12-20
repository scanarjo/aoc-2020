const tap = require('tap')
const sinon = require('sinon');

const { parsePolicy, validatePassword, createValidatePasswordEntry, newValidatePassword } = require('./passwords');

tap.test('parsePolicy()', async t => {
  t.test('should return a correctly parsed policy', async t => {
    t.deepIs(parsePolicy('1-3 a'), { min: 1, max: 3, char: 'a' });
  });
});

tap.test('validatePassword()', async t => {
  t.test('should return true for a valid password', async t => {
    t.equals(validatePassword({ min: 1, max: 3, char: 'a' }, 'ccaabb'), true);
  })

  t.test('should return false for an invalid password', async t => {
    t.equals(validatePassword({ min: 3, max: 3, char: 'a' }, 'ccaabb'), false);
  })
})

tap.test('newValidatePassword()', async t => {
  t.test('should return false if the character appears in neither position', async t => {
    t.equals(newValidatePassword({ min: 1, max: 3, char: 'x' }, 'axbxxx'), false);
  });

  t.test('should return false if the character appears in both positions', async t => {
    t.equals(newValidatePassword({ min: 1, max: 3, char: 'x' }, 'xaxaaaa'), false);
  });

  t.test('should return true if the character appears in either position but not both', async t => {
    t.equals(newValidatePassword({ min: 1, max: 3, char: 'x' }, 'xaaaaaa'), true);
    t.equals(newValidatePassword({ min: 1, max: 3, char: 'x' }, 'aaxaaaa'), true);
  });
})

tap.test('validatePasswordEntry()', async t => {
  t.beforeEach((done, t) => {
    const fakeParsePolicy = sinon.fake(parsePolicy);
    const fakeValidatePassword = sinon.fake(validatePassword);

    const validatePasswordEntry = createValidatePasswordEntry({
      parsePolicy: fakeParsePolicy,
      validatePassword: fakeValidatePassword,
    });

    t.context = {
      parsePolicy: fakeParsePolicy,
      validatePassword: fakeValidatePassword,
      validatePasswordEntry,
    };

    done();
  });

  t.test('it should pass the policy part of the string to the policy parser', async t => {
    const { parsePolicy, validatePasswordEntry } = t.context;

    validatePasswordEntry('2-4 z: abc123');

    t.equals(parsePolicy.calledOnceWith('2-4 z'), true);
  });

  t.test('it should pass the parsed policy and the password to the password validator', async t => {
    const { validatePassword, validatePasswordEntry } = t.context;

    validatePasswordEntry('2-5 x: abc123');

    t.equals(validatePassword.calledOnceWith({ min: 2, max: 5, char: 'x' }, 'abc123'), true);
  });

  t.test('it should report the correct result for validated passwords', async t => {
    const { validatePasswordEntry } = t.context;

    t.equals(validatePasswordEntry('2-5 x: abc123'), false);
    t.equals(validatePasswordEntry('3-6 d: abddddee23'), true);
  })
});
