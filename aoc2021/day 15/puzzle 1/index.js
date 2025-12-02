const { readFileSync } = require("fs");
const inputPath = "../input.txt";

function getInput() {
  return readFileSync(inputPath, { encoding: "utf8" })
    .split("\r\n")
    .map((row) => {
      return row.split("").map(Number);
    });
}

function findPathWithLowestRisk() {
  const input = getInput();
  const formattedInput = formatInput(input);
  const graph = new Graph(formattedInput);
  const startNode = formattedInput[0][0];
  const endNode =
    formattedInput[formattedInput.length - 1][formattedInput[0].length - 1];
  const startVertex = `y${startNode.y}x${startNode.x}`;
  const endVertex = `y${endNode.y}x${endNode.x}`;
  const result = graph.dijkstraTraversal(startVertex, endVertex);
  console.log(result);
}

function formatInput(input) {
  return input.map((row, rowIndex) => {
    return row.map((riskLevel, cellIndex) => {
      const neighbours = getNeighbours(input, rowIndex, cellIndex);
      return { y: rowIndex, x: cellIndex, riskLevel, neighbours };
    });
  });
  function getNeighbours(matrix, y, x) {
    const neighbours = [
      { y: y - 1, x, riskLevel: getRiskLevel(matrix, y - 1, x) },
      { y, x: x + 1, riskLevel: getRiskLevel(matrix, y, x + 1) },
      { y: y + 1, x, riskLevel: getRiskLevel(matrix, y + 1, x) },
      { y, x: x - 1, riskLevel: getRiskLevel(matrix, y, x - 1) },
    ];
    return neighbours.filter((neighbour) => neighbour.riskLevel);

    function getRiskLevel(matrix, y, x) {
      if (matrix[y]) {
        if (matrix[y][x] !== undefined) {
          return matrix[y][x];
        }
      }
      return null;
    }
  }
}

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
      let leftChild, rightChild;
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
        neighbours.forEach(({ y, x, riskLevel }) => {
          const vertex2 = `y${y}x${x}`;
          this.addVertex(vertex2);
          this.addEdge(vertex1, vertex2, riskLevel);
        });
      });
    });
  }

  dijkstraTraversal(start, finish) {
    const queue = new PriorityQueue();
    const distances = {};
    const previous = {};

    const path = [];
    let smallest;
    let totalRiskLevel;

    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        queue.enqueue(vertex, 0);
      } else {
        distances[vertex] = Number.POSITIVE_INFINITY;
        queue.enqueue(vertex, Number.POSITIVE_INFINITY);
      }
      previous[vertex] = null;
    }

    while (queue.values.length) {
      const node = queue.dequeue();
      smallest = node.val;
      const riskLevel = node.priority;

      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        totalRiskLevel = riskLevel;
        break;
      }

      if (smallest || distances[smallest] !== Number.POSITIVE_INFINITY) {
        this.adjacencyList[smallest].forEach((neighbour) => {
          const nextNode = this.adjacencyList[smallest].find(
            (edge) => edge.node === neighbour.node
          );
          const candidate = distances[smallest] + nextNode.weight;
          const neighbourValue = nextNode.node;
          if (candidate < distances[neighbourValue]) {
            distances[neighbourValue] = candidate;
            previous[neighbourValue] = smallest;
            queue.enqueue(neighbourValue, candidate);
          }
        });
      }
    }
    return { path: path.concat(smallest).reverse(), totalRiskLevel };
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(vertex1, vertex2, riskLevel) {
    const self = this;
    _addEdge(vertex1, vertex2, riskLevel);

    function _addEdge(vertex1, vertex2, weight) {
      self.adjacencyList[vertex1].push({ node: vertex2, weight });
    }
  }

  removeEdge(vertex1, vertex2) {
    removeEdgeFromAdjacencyList(vertex1, vertex2);
    removeEdgeFromAdjacencyList(vertex2, vertex1);

    function removeEdgeFromAdjacencyList(vertex1, vertex2) {
      this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(
        (vertex) => vertex !== vertex2
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

findPathWithLowestRisk();
