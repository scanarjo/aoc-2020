const { findPair } = require('./lib')

describe('findPair', () => {
  it('should find the pair of numbers that sum to the target', () => {
    const input = [1, 2, 5, 6, 8];
    const target = 11;

    expect(findPair(target, input)).toEqual([5, 6]);
  });
});
