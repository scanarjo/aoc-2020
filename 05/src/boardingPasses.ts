const convertLetterCodeToBinary = (zero: string, one: string) => (code: string) => {
  return code.replace(RegExp(zero, 'g'), '0').replace(RegExp(one, 'g'), '1');
}

const decodeRow = convertLetterCodeToBinary('F', 'B');

const decodeColumn = convertLetterCodeToBinary('L', 'R');

const convertBinaryToDec = (binary: string) => parseInt(binary, 2);

export const parseSeatCode = (seatCode: string) => {
  const [ wholeMatch, rowCode, columnCode ] = /^([FB]{7})([LR]{3})$/.exec(seatCode) || [];

  const row = convertBinaryToDec(decodeRow(rowCode));

  const column = convertBinaryToDec(decodeColumn(columnCode));

  return {
    id: 8 * row + column,
    column,
    row,
  }
};
