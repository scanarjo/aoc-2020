const loadMap = (rawMap = '') => {
  return rawMap.trim().split(/[\r\n]+/);
}

const translate = (origin, vector) => ({ x: origin.x + vector.x, y: origin.y + vector.y });

const countTrees = (map = []) => (vector) => {
  let trees = 0;

  let position = vector;
  while(position.y < map.length) {
    const row = map[position.y];

    if(row[position.x % row.length] === '#') trees += 1;

    position = translate(position, vector);
  }

  return trees;
}

module.exports = {
  loadMap,
  countTrees
};
