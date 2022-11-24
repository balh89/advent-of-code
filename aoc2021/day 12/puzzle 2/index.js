const { readFileSync } = require("fs");
const inputPath = "../input.txt";

const START = "start";
const END = "end";

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
		.map(row => {
			return row
				.split("-")
		})
}

function findUniquePaths() {
	const input = getInput();
	const graph = graphifyInput(input);
	const graphParameters = {
		graph,
		startVertex: { vertex: START, isSmallCave: false, canTraverse: true },
		endVertex: { vertex: END, isSmallCave: false, canTraverse: true },
		path: [],
		visitedVertices: []
	}
	const paths = traverseGraph(graphParameters);
	let next;
	let pathCount = 0;
	while (!(next = paths.next()).done) {
		pathCount += 1;
	}
	console.log(pathCount);
}

function* traverseGraph({ graph, startVertex, endVertex, path, visitedVertices }) {
	const { vertex, isSmallCave } = startVertex;
	const startEdges = graph[vertex];
	const hasVisitedSmallCaveTwice = visitedVertices.some(value => value.count === 2);
	const visited = visitedVertices.find(x => x.vertex == vertex);
	const visitedCount = visited ? visited.count : 0;
	if (vertex === endVertex.vertex) {
		yield path.concat(endVertex.vertex);
	} else if (startEdges && (!hasVisitedSmallCaveTwice || visitedCount === 0) ) {
		if (isSmallCave) {
			if (!visited) {
				visitedVertices.push({ vertex, count: 1 });
			} else if (!hasVisitedSmallCaveTwice) {
				visited.count++;
			}
		}
		path.push(vertex);
		for (const edge of startEdges) {
			yield *traverseGraph({ graph, startVertex: edge, endVertex, path, visitedVertices });
    }
		if (isSmallCave) {
			if (visited && visited.count === 2) {
				visited.count = 1;
			} else {

				visitedVertices.pop();
			}
		}
    path.pop();
	}
}

function graphifyInput(input) {
	const isSmallCave = vertex =>  /^[a-z]{2}$/.test(vertex)
	const isStart = vertex => /^start$/.test(vertex)
	const addEdge = (graph, vertexA, vertexB) => {

		if (!graph[vertexA]) {
			graph[vertexA] = [];
		}
		if (isStart(vertexB)) {
			return;
		}
		const isVertexBSmallCave = isSmallCave(vertexB);
		graph[vertexA].push({ isSmallCave: isVertexBSmallCave, vertex: vertexB });

	}
  return input.reduce((graph, line) => {
		const [startVertex, endVertex] = line;
		addEdge(graph, startVertex, endVertex);
		addEdge(graph, endVertex, startVertex);
		return graph;
	}, {})
};

findUniquePaths();