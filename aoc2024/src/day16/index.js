import run from "aocrunner";

const START_POSITION = "S";
const END_POSITION = "E";
const WALL = "#";

const directionMap = {
  EAST: {
    EAST: 1,
    SOUTH: 1001,
    WEST: 2001,
    NORTH: 1001,
  },
  SOUTH: {
    EAST: 1001,
    SOUTH: 1,
    WEST: 1001,
    NORTH: 2001,
  },
  WEST: {
    EAST: 2001,
    SOUTH: 1001,
    WEST: 1,
    NORTH: 1001,
  },
  NORTH: {
    EAST: 1001,
    SOUTH: 2001,
    WEST: 1001,
    NORTH: 1,
  },
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { startNode, endNode, formattedInput } = formatInput(input);
  const graph = new Graph(formattedInput);
  const startVertex = `y${startNode.y}x${startNode.x}`;
  const endVertex = `y${endNode.y}x${endNode.x}`;
  const { score } = graph.dijkstraTraversal(startVertex, endVertex);

  return score;
};

function formatInput(input) {
  let startNode;
  let endNode;
  const formattedInput = input.map((row, rowIndex) => {
    return row.map((cell, cellIndex) => {
      const neighbours = getNeighbours(input, rowIndex, cellIndex);
      const node = { y: rowIndex, x: cellIndex, cell, neighbours };
      if (cell === START_POSITION) {
        startNode = node;
      }
      if (cell === END_POSITION) {
        endNode = node;
      }
      return node;
    });
  });

  return { startNode, endNode, formattedInput };

  function getNeighbours(matrix, y, x) {
    const neighbours = [
      { y: y - 1, x, cell: getCell(matrix, y - 1, x) },
      { y, x: x + 1, cell: getCell(matrix, y, x + 1) },
      { y: y + 1, x, cell: getCell(matrix, y + 1, x) },
      { y, x: x - 1, cell: getCell(matrix, y, x - 1) },
    ];
    return neighbours.filter((neighbour) => {
      return neighbour.cell && neighbour.cell !== WALL;
    });

    function getCell(matrix, y, x) {
      if (matrix[y]) {
        if (matrix[y][x] !== undefined) {
          return matrix[y][x];
        }
      }
      return null;
    }
  }
}

function getNextDirection(currentPosition, nextPosition) {
  const match = currentPosition.match(/y(\d+)x(\d+)/);

  const currentY = Number.parseInt(match[1]);
  const currentX = Number.parseInt(match[2]);

  const nextY = nextPosition.y;
  const nextX = nextPosition.x;

  if (nextY < currentY) return "NORTH";
  if (nextY > currentY) return "SOUTH";
  if (nextX > currentX) return "EAST";
  if (nextX < currentX) return "WEST";
}

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

function parseInput(rawInput) {
  return rawInput.split("\n").map((row) => {
    return row.split("");
  });
}

class Node {
  constructor(val, priority, direction) {
    this.val = val;
    this.priority = priority;
    this.direction = direction;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority, direction) {
    const newNode = new Node(val, priority, direction);
    this.values.push(newNode);
    this.bubbleUp();
  }

  dequeue() {
    const min = this.values[0];
    const end = this.values.pop();
    if (this.values.length > 0) {
      this.values[0] = end;
      this.sinkDown();
    }
    return min;
  }

  sinkDown() {
    let elementIndex = 0;
    const element = this.values[elementIndex];
    const length = this.values.length;

    while (true) {
      const leftChildIndex = 2 * elementIndex + 1;
      const rightChildIndex = 2 * elementIndex + 2;
      let leftChild;
      let rightChild;
      let swap = null;

      if (leftChildIndex < length) {
        leftChild = this.values[leftChildIndex];
        if (leftChild.priority < element.priority) {
          swap = leftChildIndex;
        }
      }

      if (rightChildIndex < length) {
        rightChild = this.values[rightChildIndex];

        if (
          (!swap && rightChild.priority < element.priority) ||
          (swap && rightChild.priority < leftChild.priority)
        ) {
          swap = rightChildIndex;
        }
      }

      if (!swap) {
        break;
      }
      this.values[elementIndex] = this.values[swap];
      this.values[swap] = element;
      elementIndex = swap;
    }
  }

  bubbleUp() {
    let elementIndex = this.values.length - 1;
    const element = this.values[elementIndex];

    while (elementIndex > 0) {
      const parentIndex = Math.floor((elementIndex - 1) / 2);
      const parentElement = this.values[parentIndex];

      if (element.priority >= parentElement.priority) {
        break;
      }
      this.values[parentIndex] = element;
      this.values[elementIndex] = parentElement;
      elementIndex = parentIndex;
    }
  }
}

class Graph {
  constructor(input) {
    this.adjacencyList = {};
    if (input) {
      this.addVertices(input);
    }
  }

  addVertices(vertices) {
    vertices.forEach((row) => {
      row.forEach(({ y, x, neighbours }) => {
        const vertex1 = `y${y}x${x}`;
        this.addVertex(vertex1);
        neighbours.forEach(({ y, x }) => {
          const vertex2 = `y${y}x${x}`;
          this.addVertex(vertex2);
          this.addEdge(vertex1, vertex2, y, x);
        });
      });
    });
  }

  dijkstraTraversal(start, finish) {
    const queue = new PriorityQueue();
    const distances = {};
    const previous = {};

    const path = [];
    let currentPosition;
    let score;

    distances[`${start}:EAST`] = { value: 0, direction: "EAST" };
    queue.enqueue(start, 0, "EAST");

    while (queue.values.length) {
      const node = queue.dequeue();
      const currentPosition = node.val;
      const currentCost = node.priority;
      const currentDirection = node.direction;

      if (currentPosition === finish) {
        return {
          score: currentCost,
          path: this.reconstructPath(previous, currentPosition),
        };
      }

      const stateKey = `${currentPosition}:${currentDirection}`;
      if (currentCost > distances[stateKey?.value]) {
        continue;
      }

      this.adjacencyList[currentPosition].forEach((neighbour) => {
        const nextDirection = getNextDirection(currentPosition, neighbour);
        const turnCost = directionMap[currentDirection][nextDirection];
        if (!turnCost) {
          return;
        }
        const newCost = currentCost + turnCost;
        const neighborStateKey = `${neighbour.node}:${nextDirection}`;

        if (
          !distances[neighborStateKey] ||
          newCost < distances[neighborStateKey].value
        ) {
          distances[neighborStateKey] = {
            value: newCost,
            direction: nextDirection,
          };
          previous[neighborStateKey] = stateKey;
          queue.enqueue(neighbour.node, newCost, nextDirection);
        }
      });
    }
    return { path: path.concat(currentPosition).reverse(), score };
  }

  reconstructPath(previous, current) {
    const path = [];
    let currentState = `${current}:${
      Object.keys(previous)
        .filter((key) => key.startsWith(current))
        .sort((a, b) => previous[a].value - previous[b].value)[0]
        ?.split(":")[1] || "EAST"
    }`;

    while (currentState) {
      path.unshift(currentState.split(":")[0]);
      currentState = previous[currentState];
    }

    return path;
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, y, x, cell) {
    const self = this;
    _addEdge(vertex1, vertex2, y, x, cell);

    function _addEdge(vertex1, vertex2, y, x) {
      self.adjacencyList[vertex1].push({ node: vertex2, y, x });
    }
  }

  removeEdge(vertex1, vertex2) {
    removeEdgeFromAdjacencyList(vertex1, vertex2);
    removeEdgeFromAdjacencyList(vertex2, vertex1);

    function removeEdgeFromAdjacencyList(vertex1, vertex2) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2,
      );
    }
  }

  removeVertex(vertex) {
    while (this.adjacencyList[vertex].length) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      this.removeEdge(vertex, adjacentVertex);
    }
    delete this.adjacencyList[vertex];
  }
}

run({
  part1: {
    tests: [
      {
        input: `##########
#.......E#
#.##.#####
#..#.....#
##.#####.#
#S.......#
##########`,
        expected: 4013,
      },
      {
        input: `###############
      #.......#....E#
      #.#.###.#.###.#
      #.....#.#...#.#
      #.###.#####.#.#
      #.#.#.......#.#
      #.#.#####.###.#
      #...........#.#
      ###.#.#####.#.#
      #...#.....#.#.#
      #.#.#.###.#.#.#
      #.....#...#.#.#
      #.###.#.#.#.#.#
      #S..#.....#...#
      ###############`,
        expected: 7036,
      },
      {
        input: `#################
      #...#...#...#..E#
      #.#.#.#.#.#.#.#.#
      #.#.#.#...#...#.#
      #.#.#.#.###.#.#.#
      #...#.#.#.....#.#
      #.#.#.#.#.#####.#
      #.#...#.#.#.....#
      #.#.#####.#.###.#
      #.#.#.......#...#
      #.#.###.#####.###
      #.#.#...#.....#.#
      #.#.#.#####.###.#
      #.#.#.........#.#
      #.#.#.#########.#
      #S#.............#
      #################`,
        expected: 11048,
      },
      {
        input: `###########################
      #######################..E#
      ######################..#.#
      #####################..##.#
      ####################..###.#
      ###################..##...#
      ##################..###.###
      #################..####...#
      ################..#######.#
      ###############..##.......#
      ##############..###.#######
      #############..####.......#
      ############..###########.#
      ###########..##...........#
      ##########..###.###########
      #########..####...........#
      ########..###############.#
      #######..##...............#
      ######..###.###############
      #####..####...............#
      ####..###################.#
      ###..##...................#
      ##..###.###################
      #..####...................#
      #.#######################.#
      #S........................#
      ###########################`,
        expected: 21148,
      },
      {
        input: `####################################################
      #......................................#..........E#
      #......................................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.................#...........#
      #....................#.............................#
      #S...................#.............................#
      ####################################################`,
        expected: 5078,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
