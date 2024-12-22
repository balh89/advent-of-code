import run from "aocrunner";

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
        neighbours.forEach(({ y, x, height }) => {
          const vertex2 = `y${y}x${x}`;
          this.addVertex(vertex2);
          this.addEdge(vertex1, vertex2, height);
        });
      });
    });
  }

  dfs_part1(startNode) {
    const queue = [startNode];
    const visited = new Set();
    const result = [];

    while (queue.length) {
      const { node, weight } = queue.shift();
      if (!visited.has(node)) {
        visited.add(node);
        if (weight === 9) {
          result.push(node);
        }

        for (const neighbor of this.adjacencyList[node]) {
          if (neighbor.weight === weight + 1) {
            queue.push(neighbor);
          }
        }
      }
    }

    return result;
  }

  dfs_part2(startNode) {
    const queue = [startNode];
    const visited = new Set();
    const result = [];

    while (queue.length) {
      const { node, weight } = queue.shift();
      visited.add(node);
      if (weight === 9) {
        result.push(node);
      }

      for (const neighbor of this.adjacencyList[node]) {
        if (neighbor.weight === weight + 1) {
          queue.push(neighbor);
        }
      }
    }

    return result;
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, height) {
    const self = this;
    _addEdge(vertex1, vertex2, height);

    function _addEdge(vertex1, vertex2, weight) {
      self.adjacencyList[vertex1].push({ node: vertex2, weight });
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { startNodes, formattedInput } = formatInput(input);
  const graph = new Graph(formattedInput);
  return startNodes.reduce((score, { x, y }) => {
    const startNode = {
      weight: 0,
      node: `y${y}x${x}`,
    };
    return score + graph.dfs_part1(startNode).length;
  }, 0);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const { startNodes, formattedInput } = formatInput(input);
  const graph = new Graph(formattedInput);
  return startNodes.reduce((score, { x, y }) => {
    const startNode = {
      weight: 0,
      node: `y${y}x${x}`,
    };
    return score + graph.dfs_part2(startNode).length;
  }, 0);
};

function parseInput(rawInput) {
  return rawInput.split("\n").map((row) => {
    return row.split("").map(Number);
  });
}

function formatInput(input) {
  const startNodes = [];
  const formattedInput = input.map((row, rowIndex) => {
    return row.map((height, cellIndex) => {
      if (height === 0) {
        startNodes.push({ y: rowIndex, x: cellIndex });
      }
      const neighbours = getNeighbours(input, rowIndex, cellIndex);
      return { y: rowIndex, x: cellIndex, height, neighbours };
    });
  });

  return { startNodes, formattedInput };

  function getNeighbours(matrix, y, x) {
    const neighbours = [
      { y: y - 1, x, height: getHeight(matrix, y - 1, x) },
      { y, x: x + 1, height: getHeight(matrix, y, x + 1) },
      { y: y + 1, x, height: getHeight(matrix, y + 1, x) },
      { y, x: x - 1, height: getHeight(matrix, y, x - 1) },
    ];
    return neighbours.filter((neighbour) => neighbour.height);

    function getHeight(matrix, y, x) {
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
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
