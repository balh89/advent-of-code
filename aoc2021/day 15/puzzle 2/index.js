const { readFileSync } = require("fs");
const inputPath = "../input.txt";

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
		.map(row => {
			return row
				.split("")
				.map(Number);
		})
}

function findPathWithLowestRisk() {
	const input = getInput();
	const multipliedInput = multiplyInput(input)
	const formattedInput = formatInput(multipliedInput)
	const startNode = formattedInput[0][0];
	const yLength = formattedInput.length - 1
	const xLength = formattedInput[0].length - 1
	const endNode = formattedInput[yLength][xLength];
	const startVertex = `y${startNode.y}x${startNode.x}`;
	const endVertex = `y${endNode.y}x${endNode.x}`;
	const graph = new Graph(formattedInput, yLength, xLength);
	const result = graph.dijkstraTraversal(startVertex, endVertex);
	console.log(result);
}

	function multiplyInput(input) {
		const output = [];
		for (let i = 0; i < 5; i++) {
			input.forEach((row, rowIndex) => {
				const rowOutput = [];
				for (let j = 0; j < 5; j++) {
					row.forEach((riskLevel, cellIndex) => {
						const realRiskLevel = getRealRiskLevel(riskLevel, i, j)
						rowOutput.push(realRiskLevel);
					})
				}
				output.push(rowOutput);
			})
		}

		return output;

		function getRealRiskLevel(riskLevel, yTileCount, xTileCount) {
			let realRiskLevel = riskLevel;
			for (let i = 0; i < yTileCount; i++) {
				realRiskLevel++;
				if (realRiskLevel > 9) {
					realRiskLevel = 1;
				}
			}
			for (let i = 0; i < xTileCount; i++) {
				realRiskLevel++;
				if (realRiskLevel > 9) {
					realRiskLevel = 1;
				}
			}
			return realRiskLevel;
		}
	}

function formatInput(input) {
	return input.map((row, rowIndex) => {
		return row.map((riskLevel, cellIndex) => {
			const neighbours = getNeighbours(input, rowIndex, cellIndex);
			return { y: rowIndex, x: cellIndex, riskLevel, neighbours }
		})
	})

	function getNeighbours(matrix, y, x) {
		const neighbours = [
			{ y: y - 1, x, riskLevel: getRiskLevel(matrix, y - 1 , x) },
			{ y, x: x + 1, riskLevel: getRiskLevel(matrix, y , x + 1) },
			{ y: y + 1, x, riskLevel: getRiskLevel(matrix, y + 1 , x) },
			{ y, x: x - 1, riskLevel: getRiskLevel(matrix, y , x - 1) }
		]
		return neighbours.filter(neighbour => neighbour.riskLevel)

		function getRiskLevel(matrix, y , x) {
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
				neighbours.forEach(({ y, x, riskLevel }) => {
					const vertex2 = `y${y}x${x}`;
					this.addVertex(vertex2);
					this.addEdge(vertex1, vertex2, riskLevel,)
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
		let totalRiskLevel;

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
			const riskLevel = node.priority;
			if (smallest === finish) {
				while(previous[smallest]) {
					path.push(smallest)
					smallest = previous[smallest];
				}
				totalRiskLevel = riskLevel;
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
		return {path: path.concat(smallest).reverse(), totalRiskLevel};
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

findPathWithLowestRisk();