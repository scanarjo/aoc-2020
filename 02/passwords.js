const parsePolicy = (policy = '') => {
  const [ range, char ] = policy.split(' ');

  const [ min, max ] = range.split('-').map(val => parseInt(val, 10));

  return { min, max, char };
};

const validatePassword = (policy, password = '') => {
  const charCount = password.split('').filter(char => char === policy.char).length;

  return charCount <= policy.max && charCount >= policy.min;
};

const newValidatePassword = ({ min = -1, max = -1, char = '' }, password = '') => {
  const chars = password.split('');

  const firstChar = chars[min - 1];
  const secondChar = chars[max - 1];

  return (firstChar === char) !== (secondChar === char);
}

const createValidatePasswordEntry = ({ parsePolicy, validatePassword }) => (passwordEntry = '') => {
  const [ policyString, password ] = passwordEntry.split(': ');

  const policy = parsePolicy(policyString);

  return validatePassword(policy, password);
};

module.exports = {
  parsePolicy,
  validatePassword,
  newValidatePassword,
  createValidatePasswordEntry,
  validatePasswordEntry: createValidatePasswordEntry({ parsePolicy, validatePassword: newValidatePassword }),
};
