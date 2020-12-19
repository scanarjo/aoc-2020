const { findPair, findTriple } = require('./lib');

describe('findPair', () => {
  it('should find the pair of numbers that sum to the target', () => {
    const input = [1, 2, 5, 6, 8];
    const target = 11;

    expect(findPair(target, input)).toEqual([5, 6]);
  });
});

describe('findTriple', () => {
  it('should find 3 numbers that sum to the target', () => {
    const input = [1, 2, 5, 6, 8];
    const target = 19;

    expect(findTriple(target, input)).toEqual([5, 6, 8]);
  });
});
