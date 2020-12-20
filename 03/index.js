const fs = require('fs').promises;

const { loadMap, countTrees } = require('./tobbogan');

const vectors = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

fs.readFile('./input.txt').then(file => {
  const map = loadMap(file.toString());

  const countTreesForMap = countTrees(map);

  const productOfTreeCounts = vectors
    .map(countTreesForMap)
    .reduce((product, treeCount) => product * treeCount, 1);

  console.log('Number of trees multiplied together is:', productOfTreeCounts);
})
