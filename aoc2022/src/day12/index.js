import run from "aocrunner";

const parseInput = (rawInput) => rawInput;

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const heightMap = createHeightMap(input);
  const { formattedHeightMap, endPosition, startPosition } = formatHeightMap(heightMap)
  const graph = new Graph(formattedHeightMap);
	const startNode = formattedHeightMap[startPosition.row][startPosition.col];
//   const startNode = formattedHeightMap[0][0];
	const endNode = formattedHeightMap[endPosition.row][endPosition.col];
	// const endNode = formattedHeightMap[2][5];
	const startVertex = `y${startNode.y}x${startNode.x}`;
	const endVertex = `y${endNode.y}x${endNode.x}`;
	const path = graph.dijkstraTraversal(startVertex, endVertex).path;
	const steps = path.length - 1;
	const pathMap = path.reduce((acc, p) => {
		acc[p] = true;
		return acc;
	}, {})
	const print = heightMap.map((row, ri) => {
		return row.map((cell, ci) => {
			if (pathMap[`y${ri}x${ci}`]) {
				return "X";
			} else {
				return "."
			}
		})
	})
	const str = print.reduce((acc, row) => acc + row.reduce((acc, col) => acc + col, "") + "\n", "");
	console.log(str);
	return steps;
};

const part2 = (rawInput) => {
	const input = parseInput(rawInput);
	const heightMap = createHeightMap(input);
	const { formattedHeightMap, aPositions, endPosition } = formatHeightMap(heightMap)
	const graph = new Graph(formattedHeightMap);
	  return aPositions.reduce((fewest, position) => {
		const startNode = formattedHeightMap[position.row][position.col];
		const endNode = formattedHeightMap[endPosition.row][endPosition.col];
		const startVertex = `y${startNode.y}x${startNode.x}`;
		const endVertex = `y${endNode.y}x${endNode.x}`;
		const { path, totalWeight } = graph.dijkstraTraversal(startVertex, endVertex);
		// const pathMap = path.reduce((acc, p) => {
		// 	acc[p] = true;
		// 	return acc;
		// }, {})
		// const print = heightMap.map((row, ri) => {
		// 	return row.map((cell, ci) => {
		// 		if (pathMap[`y${ri}x${ci}`]) {
		// 			return "X";
		// 		} else {
		// 			return "."
		// 		}
		// 	})
		// })
		// const str = print.reduce((acc, row) => acc + row.reduce((acc, col) => acc + col, "") + "\n", "");
		// console.log(str);
		const steps = path.length - 1;
		if ((steps < fewest) && totalWeight < 1000) {
			fewest = steps;
		}
		return fewest;
	  }, Infinity)
};

function createHeightMap(input) {
  return input
    .split("\n")
    .map(row => {
      return row.split("")
    })
}

function createAlphabethIndexMap() {
  return [...Array(26)]
    .map((_, i) => String.fromCharCode(i + 97))
    .reduce((acc, letter, index) => {
      acc[letter] = index + 1;
      return acc;
    }, {})
}

function formatHeightMap(heightMap) {
  const alphabethIndexMap = createAlphabethIndexMap();
  const aPositions = [];
  let endPosition;;
  let startPosition;
  const formattedHeightMap = heightMap
    .map((row, rowIndex) => {
      return row.map((elevation, cellIndex) => {
		if (elevation  === "a" || elevation === "S") {
			aPositions.push({ row: rowIndex, col: cellIndex });
		}
		if (elevation === "S") {
			startPosition = { row: rowIndex, col: cellIndex }
		}
		if (elevation === "E") {
			endPosition = { row: rowIndex, col: cellIndex }
		}
        const neighbours = getNeighbours(heightMap, rowIndex, cellIndex, elevation);
        return { y: rowIndex, x: cellIndex, neighbours }
      })
    })
	return { aPositions, formattedHeightMap, endPosition, startPosition }

	function getNeighbours(matrix, y, x, parentElevation) {
		if (parentElevation === "S") {
			parentElevation = "a";
		}
		if (parentElevation === "E") {
			parentElevation = "z"
		}
		const neighbours = [
			{ y: y - 1, x, elevationLevel: getElevation(matrix, y - 1 , x) },
			{ y, x: x + 1, elevationLevel: getElevation(matrix, y , x + 1) },
			{ y: y + 1, x, elevationLevel: getElevation(matrix, y + 1 , x) },
			{ y, x: x - 1, elevationLevel: getElevation(matrix, y , x - 1) }
		]
		return neighbours.filter(neighbour => neighbour.elevationLevel)

		function getElevation(matrix, y , x) {
			if (matrix[y]) {
				if (matrix[y][x] !== undefined) {
					let elevation = matrix[y][x];
					if (elevation === "S") {
						elevation = "a";
					}
					if (elevation === "E") {
						elevation = "z"
					}
          			const dx = alphabethIndexMap[elevation] - (alphabethIndexMap[parentElevation]);
					if (dx > 1) {
						return 999;
					} else if (dx === 1 || dx === 0) {
						return 1;
					} else {
						return 1;
					} 
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
		const newNode = new Node(val, priority)
		this.values.push(newNode);
		this.bubbleUp();
	}

	dequeue() {
		let min = this.values[0];
		let end = this.values.pop();
		if (this.values.length > 0) {
			this.values[0] = end;
			this.sinkDown();
		}
		return min;
	}

	sinkDown() {
		let elementIndex = 0;
		let element = this.values[elementIndex];
		const length = this.values.length;

		while(true) {
			let leftChildIndex = 2 * elementIndex + 1;
			let rightChildIndex = 2 * elementIndex + 2;
			let leftChild, rightChild;
			let swap = null;

			if (leftChildIndex < length) {
				leftChild = this.values[leftChildIndex];
				if (leftChild.priority < element.priority) {
					swap = leftChildIndex;
				}
			}

			if (rightChildIndex < length) {
				rightChild = this.values[rightChildIndex]

				if ((!swap && rightChild.priority < element.priority) || (swap && rightChild.priority < leftChild.priority)) {
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

		while(elementIndex > 0) {
			let parentIndex = Math.floor((elementIndex - 1) / 2);
			let parentElement = this.values[parentIndex];

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
		vertices.forEach(row => {
			row.forEach(({ y, x, neighbours }) => {
				const vertex1 = `y${y}x${x}`;
				this.addVertex(vertex1);
				neighbours.forEach(({ y, x, elevationLevel }) => {
					const vertex2 = `y${y}x${x}`;
					this.addVertex(vertex2);
					this.addEdge(vertex1, vertex2, elevationLevel)
				})
			})
		})
	}

	dijkstraTraversal(start, finish) {
		const queue = new PriorityQueue();
		const distances = {};
		const previous = {};

		let path = [];
		let smallest;
		let totalWeight = 0;

		for (let vertex in this.adjacencyList) {
			if (vertex === start) {
				distances[vertex] = 0;
				queue.enqueue(vertex, 0);
			} else {
				distances[vertex] = Infinity;
				queue.enqueue(vertex, Infinity);
			}
			previous[vertex] = null;
		}

		while (queue.values.length) {
			const node = queue.dequeue();
			smallest = node.val;

			if (smallest === finish) {
				while(previous[smallest]) {
					path.push(smallest)
					smallest = previous[smallest];
				}
				totalWeight += node.priority;
				break;
			}

			if (smallest || distances[smallest] !== Infinity) {
				this.adjacencyList[smallest].forEach(neighbour => {
					let nextNode = this.adjacencyList[smallest].find(edge => edge.node === neighbour.node);
					let candidate = distances[smallest] + nextNode.weight;
					let neighbourValue = nextNode.node;
					if (candidate < distances[neighbourValue]) {
						distances[neighbourValue] = candidate;
						previous[neighbourValue] = smallest;
						queue.enqueue(neighbourValue, candidate);
					}
				})
			}
		}
		return {path: path.concat(smallest).reverse(), totalWeight};
	}

	addVertex(vertex) {
		if (!this.adjacencyList[vertex]) {
			this.adjacencyList[vertex] = [];
		}
	}

	addEdge(vertex1, vertex2, elevationLevel) {
		const self = this;
		_addEdge(vertex1, vertex2, elevationLevel);

		function _addEdge(vertex1, vertex2, weight) {
			self.adjacencyList[vertex1].push({ node: vertex2, weight})
		}
	}

	removeEdge(vertex1, vertex2) {
		removeEdgeFromAdjacencyList(vertex1, vertex2);
		removeEdgeFromAdjacencyList(vertex2, vertex1);

		function removeEdgeFromAdjacencyList(vertex1, vertex2) {
			this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter(vertex => vertex !== vertex2);
		}
	}

	removeVertex(vertex) {
		while(this.adjacencyList[vertex].length) {
			const adjacentVertex = this.adjacencyList[vertex].pop();
			this.removeEdge(vertex, adjacentVertex);
		}
		delete this.adjacencyList[vertex];
	}
}

run({
  part1: {
    tests: [
    //   {
    //     input: `
    //     Sabqponm
    //     abcryxxl
    //     accszExk
    //     acctuvwj
    //     abdefghi`,
    //     expected: 31,
    //   },
    ],
    solution: part1,
  },
  part2: {
    tests: [
		// {
			
		// 	input: `
		// 	Sabqponm
		// 	abcryxxl
		// 	accszExk
		// 	acctuvwj
		// 	abdefghi`,
		// 	expected: 29,
		//   },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
