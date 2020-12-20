const fs = require('fs').promises;

const { loadMap, countTrees } = require('./tobbogan');

fs.readFile('./input.txt').then(file => {
  const map = loadMap(file.toString());

  const treeCount = countTrees(map)({ x: 3, y: 1 });

  console.log('Number of trees:', treeCount);
})
