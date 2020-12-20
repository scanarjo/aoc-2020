const loadMap = (rawMap = '') => {
  return rawMap.trim().split(/[\r\n]+/);
}

const translate = ([ x1, y1 ], [ x2, y2 ]) => [ x1 + x2, y1 + y2 ];

const countTrees = (map = []) => ([ x, y ]) => {
  let trees = 0;

  let position = [x, y];
  while(position[1] < map.length) {
    const row = map[position[1]];

    if(row[position[0] % row.length] === '#') trees += 1;

    position = translate(position, [ x, y ]);
  }

  return trees;
}

module.exports = {
  loadMap,
  countTrees
};
