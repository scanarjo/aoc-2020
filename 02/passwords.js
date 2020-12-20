const parsePolicy = (policy = '') => {
  const [ range, char ] = policy.split(' ');

  const [ min, max ] = range.split('-').map(val => parseInt(val, 10));

  return { min, max, char };
};

const validatePassword = (policy, password = '') => {
  const charCount = password.split('').filter(char => char === policy.char).length;

  return charCount <= policy.max && charCount >= policy.min;
};

const createValidatePasswordEntry = ({ parsePolicy, validatePassword }) => (passwordEntry = '') => {
  const [ policyString, password ] = passwordEntry.split(': ');

  const policy = parsePolicy(policyString);

  return validatePassword(policy, password);
};

module.exports = {
  parsePolicy,
  validatePassword,
  createValidatePasswordEntry,
  validatePasswordEntry: createValidatePasswordEntry({ parsePolicy, validatePassword }),
};
