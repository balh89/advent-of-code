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
		visited: new Set()
	}
	const paths = traverseGraph(graphParameters);
	let next;
	let pathCount = 0;
	while (!(next = paths.next()).done) {
		pathCount += 1;
	}
	console.log(pathCount);
}

function* traverseGraph({ graph, startVertex, endVertex, path, visited }) {
	const { vertex, isSmallCave } = startVertex;
	const startEdges = graph[vertex];
	if (vertex === endVertex.vertex) {
		yield path.concat(endVertex.vertex);
	} else if (startEdges && !visited.has(vertex)) {
		if (isSmallCave) {
			visited.add(vertex);
		}
		path.push(vertex);
		for (const edge of startEdges) {
			yield *traverseGraph({ graph, startVertex: edge, endVertex, path, visited });
    }

		visited.delete(vertex);
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