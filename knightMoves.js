const Node = function (pos) {
  return pos.every((x) => x < 7 && x >= 0)
    ? {
        position: pos,
        getPositionString: function () {
          return `${this.position[0]}, ${this.position[1]}`;
        },
      }
    : null;
};

const directions = [
  [-2, 1],
  [-1, 2],
  [1, 2],
  [2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

const getNeighbors = (node) => {
  const neighbors = directions
    .map((direction) =>
      Node([direction[0] + node.position[0], direction[1] + node.position[1]])
    )
    .filter(Boolean);
  return neighbors;
};

function arraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((el, index) => el === arr2[index]);
}
const visited = new Set();

const knightMoves = (startPos, targetPos) => {
  if (arraysEqual(startPos, targetPos)) {
    console.log(`The knight is already on the target position`);
    return;
  }

  const startNode = Node(startPos);
  const queue = [startNode];
  visited.add(startNode.getPositionString());
  const previous = {};
  while (queue.length > 0) {
    let current = queue.shift();

    for (const neighbor of getNeighbors(current)) {
      const neighborPosStr = neighbor.getPositionString();

      if (visited.has(neighborPosStr)) continue;
      visited.add(neighborPosStr);
      previous[neighborPosStr] = current;

      if (arraysEqual(neighbor.position, targetPos)) {
        const path = [neighbor.position];
        let node = previous[neighbor.getPositionString()];
        while (node) {
          path.unshift(node.position);
          node = previous[node.getPositionString()];
        }
        console.log(
          `=> You made it in ${path.length - 1} moves!  Here's your path:`
        );
        path.map((pos) => console.log(pos));
        return;
      }
      queue.push(neighbor);
    }
  }
};

knightMoves([3, 3], [4, 3]);
