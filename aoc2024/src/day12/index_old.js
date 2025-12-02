import run from "aocrunner";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { formattedInput, startNodes } = formatInput(input);
  const graph = new Graph(formattedInput);
  const globalVisited = new Set();
  return startNodes.reduce((score, { x, y, plant }) => {
    const startNode = {
      plant,
      node: `y${y}x${x}`,
    };
    const { area, perimiter, result } = graph.dfs_part1(
      startNode,
      globalVisited,
    );

    return score + area * perimiter;
  }, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

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
        neighbours.forEach(({ y, x, plant, isDiagonal }) => {
          const vertex2 = `y${y}x${x}`;
          this.addVertex(vertex2);
          this.addEdge(vertex1, vertex2, plant, isDiagonal);
        });
      });
    });
  }

  dfs_part1(startNode, globalVisited) {
    const queue = [startNode];
    const visited = new Set();
    const result = [];
    let area = 0;
    let perimiter = 0;
    const fenceAddedMap = {};

    while (queue.length) {
      const { node, plant } = queue.shift();
      if (!visited.has(node) && !globalVisited.has(node)) {
        visited.add(node);
        globalVisited.add(node);
        result.push(node);
        area++;
        for (const neighbor of this.adjacencyList[node]) {
          if (neighbor.plant === plant) {
            queue.push(neighbor);
          } else if (!neighbor.isDiagonal) {
            perimiter++;
            fenceAddedMap[neighbor.node] = true;
          }
        }
      }
    }

    return { area, perimiter, result };
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, plant, isDiagonal) {
    const self = this;
    _addEdge(vertex1, vertex2, plant);

    function _addEdge(vertex1, vertex2, plant) {
      self.adjacencyList[vertex1].push({ node: vertex2, plant, isDiagonal });
    }
  }
}

function parseInput(rawInput) {
  return rawInput.split("\n").map((row) => {
    return row.split("");
  });
}

function formatInput(input) {
  const startNodes = [];
  const formattedInput = input.map((row, rowIndex) => {
    return row.map((plant, cellIndex) => {
      const neighbours = getNeighbours(input, rowIndex, cellIndex);

      startNodes.push({ y: rowIndex, x: cellIndex, plant });
      return { y: rowIndex, x: cellIndex, plant, neighbours };
    });
  });

  return { formattedInput, startNodes };

  function getNeighbours(matrix, y, x) {
    const neighbours = [
      { y: y - 1, x, plant: getPlant(matrix, y - 1, x) }, //up
      { y, x: x + 1, plant: getPlant(matrix, y, x + 1) }, //right
      { y: y + 1, x, plant: getPlant(matrix, y + 1, x) }, //down
      { y, x: x - 1, plant: getPlant(matrix, y, x - 1) }, //left
    ];
    return neighbours;

    function getPlant(matrix, y, x) {
      if (matrix[y]) {
        if (matrix[y][x] !== undefined) {
          return matrix[y][x];
        }
      }
      return null;
    }
  }
}

run({
  part1: {
    tests: [
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
      {
        input: `AXAA
XAAA
XAAA
XAAA`,
        expected: 186,
      },
      {
        input: `AAAAA
ABBAA
ABCBA`,
        expected: 232,
      },
      {
        input: `AAAAA
ABBCA
ABCBA`,
        expected: 216,
      },
      {
        input: `AAAAA
ABBBA
ABCBA`,
        expected: 244,
      },
      {
        input: `AAAA
ABCA
ABCA
AAAD`,
        expected: 292,
      },
      {
        input: `AAAA
ABCA
ABCA
AAAA`,
        expected: 312,
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
