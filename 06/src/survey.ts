export const countUniqueAnswers = (answers: string) => answers
  .trim()
  .replace(/[ \r\n]+/g, '')
  .split('')
  .reduce((uniqueChars: string[], char) => {
    if(uniqueChars.find(val => val === char)) return uniqueChars;

    return [ ...uniqueChars, char ];
  }, [])
  .length;

export const splitAnswerGroups = (answerGroups: string) => answerGroups
  .split(/[\r\n]{2,4}/)
  .map(answer => answer.trim());

export const countMutualAnswers = (answers: string) => {
  const individualSubmissions = answers
    .trim()
    .split(/[\r\n]+/);

  const groupSize = individualSubmissions.length;

  return individualSubmissions
    .flatMap(answers => answers.split(''))
    .reduce((totals, char) => {
      if(!totals.find(({ char: c }) => c === char)) {
        totals.push({ char, count: 1 });

        return totals;
      } else {
        return totals.map(entry => {
          if(entry.char === char) {
            return {
              char,
              count: entry.count + 1,
            };
          } else {
            return entry;
          }
        })
      }
    }, [] as { char: string, count: number }[])
    .filter(({ count }) => count === groupSize)
    .length;
}
