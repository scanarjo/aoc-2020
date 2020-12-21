export const parsePassport = (passportString: string) => {
  const passportLines = passportString
    .trim()
    .split(/[\r\n ]{1}/)
    .map(passportLine => passportLine.split(':'));

  return Object.fromEntries(passportLines);
};

const isInRange = (min: number, max: number) => (value: string) => {
  const valueAsInt = parseInt(value, 10);

  return valueAsInt >= min && valueAsInt <= max;
}

const validateHeightInCm = isInRange(150, 193);

const validateHeightInInches = isInRange(59, 76);

const validateHeight = () => (height: string) => {
  const result = /([0-9]{2,3})(cm|in)/.exec(height);

  if(!result) return false;

  const [ wholeMatch, heightValue, heightUnit ] = result;

  const validate = heightUnit === 'cm' ? validateHeightInCm : validateHeightInInches;

  return validate(heightValue);
};

const matches = (regEx: RegExp) => (value: string) => regEx.test(value);

const isOneOf = (allowed: string[]) => (value: string) => allowed.includes(value);

export const validatePassport = (passport: any) => {
  const passportKeys = Object.keys(passport);

  const requiredKeys: [string, (val: string) => boolean][] = [
    ['byr', isInRange(1920, 2002)],
    ['iyr', isInRange(2010, 2020)],
    ['eyr', isInRange(2020, 2030)],
    ['hgt', validateHeight()],
    ['hcl', matches(/^#[0-9a-f]{6}$/)],
    ['ecl', isOneOf(['amb','blu','brn','gry','grn','hzl','oth'])],
    ['pid', matches(/^[0-9]{9}$/)],
  ];

  return requiredKeys.every(([key, validator]) => {
    return passportKeys.includes(key) && validator(passport[key])
  });
};

