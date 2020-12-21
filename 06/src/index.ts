import { promises as fs } from "fs";
import { countMutualAnswers, splitAnswerGroups } from "./survey";

fs.readFile('./input.txt').then(file => {
  const answerData = file.toString();

  const total = splitAnswerGroups(answerData)
    .map(countMutualAnswers)
    .reduce((sum, n) => sum + n, 0);

  console.log('The total number of mutual answers from each group is: ', total);
})
