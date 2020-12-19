const sortArray = (array = []) => array.sort((a, b) => a - b);

const findPair = (target, input = []) => {
  const sortedInput = sortArray(input);

  for (let index = 0, reverseIndex = sortedInput.length - 1; index < sortedInput.length || reverseIndex < 0;) {
    const a = sortedInput[index];
    const b = sortedInput[reverseIndex];

    if(a + b === target) return [a, b];

    if(a + b > target) {
      reverseIndex--;
    } else if(a + b < target) {
      index++;
    }

    if(index === reverseIndex) return [];
  }

  return [];
}

const findTriple = (target, input = []) => {
  const sortedInput = sortArray(input);

  for (let index = sortedInput.length - 1; index > 1; index--) {
    const c = sortedInput[index];
    const [a, b] = findPair(target - c, sortedInput.slice(0, index));

    if(a && b) {
      return [a, b, c];
    }
  }
};

module.exports = {
  findPair,
  findTriple
}
