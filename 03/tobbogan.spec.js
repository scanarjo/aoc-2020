const tap = require('tap');

const { loadMap, countTrees } = require('./tobbogan');

const sampleData = `
..##.......
#...#...#..
.#....#..#.
..#.#...#.#
.#...##..#.
..#.##.....
.#.#.#....#
.#........#
#.##...#...
#...##....#
.#..#...#.#
`;

tap.test('loadMap()', async t => {
  tap.test('should create an array with the correct number of lines', async t => {
    t.equals(loadMap(sampleData).length, 11);
  })
});

tap.test('countTrees()', async t => {
  tap.test('should count the correct number of trees', async t => {
    const map = loadMap(sampleData);

    const vector = [ 3, 1 ];

    t.equals(countTrees(map)(vector), 7);
  });
})
