const findPair = (target, input = []) => {
  const sortedInput = input.sort((a, b) => a - b);

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

module.exports = {
  findPair
}
