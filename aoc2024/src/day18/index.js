import run from "aocrunner";

const BYTE = "#";

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { startNode, endNode, formattedInput } = formatInput(input);
  const graph = new Graph(formattedInput);
  const startVertex = `y${startNode.y}x${startNode.x}`;
  const endVertex = `y${endNode.y}x${endNode.x}`;
  const { score } = graph.dijkstraTraversal(startVertex, endVertex);

  return score;

  function formatInput(input) {
    let endNode;
    let startNode;
    const startGrid = new Array(71).fill(0).map(() => new Array(71).fill("."));
    input.slice(0, 1024).forEach(([x, y]) => {
      startGrid[y][x] = "#";
    });

    const formattedInput = startGrid.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const neighbours = getNeighbours(startGrid, rowIndex, cellIndex);
        const node = { y: rowIndex, x: cellIndex, cell, neighbours };
        if (rowIndex === 0 && cellIndex === 0) {
          startNode = node;
        } else if (
          rowIndex === startGrid.length - 1 &&
          cellIndex === row.length - 1
        ) {
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
        return neighbour.cell && neighbour.cell !== BYTE;
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
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let byte;
  for (let i = 1025; i <= 3450; i++) {
    const { startNode, endNode, formattedInput } = formatInput(input, i);
    const graph = new Graph(formattedInput);
    const startVertex = `y${startNode.y}x${startNode.x}`;
    const endVertex = `y${endNode.y}x${endNode.x}`;
    const { score } = graph.dijkstraTraversal(startVertex, endVertex);
    if (!score) {
      byte = i;
      break;
    }
  }

  return input[byte - 1].join(",");

  function formatInput(input, byteSize) {
    let endNode;
    let startNode;
    const startGrid = new Array(71).fill(0).map(() => new Array(71).fill("."));
    input.slice(0, byteSize).forEach(([x, y]) => {
      startGrid[y][x] = "#";
    });

    const formattedInput = startGrid.map((row, rowIndex) => {
      return row.map((cell, cellIndex) => {
        const neighbours = getNeighbours(startGrid, rowIndex, cellIndex);
        const node = { y: rowIndex, x: cellIndex, cell, neighbours };
        if (rowIndex === 0 && cellIndex === 0) {
          startNode = node;
        } else if (
          rowIndex === startGrid.length - 1 &&
          cellIndex === row.length - 1
        ) {
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
        return neighbour.cell && neighbour.cell !== BYTE;
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
};

class Node {
  constructor(val, priority) {
    this.val = val;
    this.priority = priority;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    const newNode = new Node(val, priority);
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

    distances[start] = { value: 0 };
    queue.enqueue(start, 0);

    while (queue.values.length) {
      const node = queue.dequeue();
      const currentPosition = node.val;
      const currentCost = node.priority;

      if (currentPosition === finish) {
        return {
          score: currentCost,
          path: this.reconstructPath(previous, currentPosition),
        };
      }

      const stateKey = currentPosition;
      if (currentCost > distances[stateKey?.value]) {
        continue;
      }

      this.adjacencyList[currentPosition].forEach((neighbour) => {
        const turnCost = 1;
        const newCost = currentCost + turnCost;
        const neighborStateKey = neighbour.node;

        if (
          !distances[neighborStateKey] ||
          newCost < distances[neighborStateKey].value
        ) {
          distances[neighborStateKey] = {
            value: newCost,
          };
          previous[neighborStateKey] = stateKey;
          queue.enqueue(neighbour.node, newCost);
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
        ?.split(":")[1]
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

function parseInput(rawInput) {
  return rawInput.split("\n").map((row) => {
    return row.split(",").map((x) => +x);
  });
}

run({
  part1: {
    tests: [
      //       {
      //         input: `5,4
      // 4,2
      // 4,5
      // 3,0
      // 2,1
      // 6,3
      // 2,4
      // 1,5
      // 0,6
      // 3,3
      // 2,6
      // 5,1
      // 1,2
      // 5,5
      // 2,5
      // 6,5
      // 1,4
      // 0,4
      // 6,4
      // 1,1
      // 6,1
      // 1,0
      // 0,5
      // 1,6
      // 2,0`,
      //         expected: 22,
      //       },
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
