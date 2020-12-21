export const parsePassport = (passportString: string) => {
  const passportLines = passportString
    .trim()
    .split(/[\r\n ]{1}/)
    .map(passportLine => passportLine.split(':'));

  return Object.fromEntries(passportLines);
};

export const validatePassport = (passport: any) => {
  const passportKeys = Object.keys(passport);

  const requiredKeys = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
  ];

  return requiredKeys.every(key => passportKeys.includes(key));
};

