export const parsePassport = (passportString: string) => {
  const passportLines = passportString
    .trim()
    .split(/[\r\n ]{1}/)
    .map(passportLine => passportLine.split(':'));

  return Object.fromEntries(passportLines);
};

const validateBirthYear = (birthYearString: string) => {
  const birthYear = parseInt(birthYearString, 10);

  return birthYear >= 1920;
}

const T = () => true;

export const validatePassport = (passport: any) => {
  const passportKeys = Object.keys(passport);

  const requiredKeys: [string, (val: string) => boolean][] = [
    ['byr', validateBirthYear],
    ['iyr', T],
    ['eyr', T],
    ['hgt', T],
    ['hcl', T],
    ['ecl', T],
    ['pid', T],
  ];

  return requiredKeys.every(([key, validator]) => {
    return passportKeys.includes(key) && validator(passport[key])
  });
};

