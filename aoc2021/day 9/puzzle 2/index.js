const { readFileSync } = require("fs");
const inputPath = "../input.txt";

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
		.map(row => {
			return row
				.split("")
				.map(Number)
		})
}

function basinDetector() {
	const input = getInput();
	const lowestPoints = getLowestPoints(input);
	const basins = getBasins(lowestPoints, input);
	const result = getResult(basins);
	console.log(result);

}

function getResult(basins) {
	console.log(basins);
	return basins
		.sort((a, b) => b - a)
		.slice(0, 3)
		.reduce((sum, basinSize) => {
			sum *= basinSize;
			return sum;
		}, 1)
}

function getBasins(lowestPoints, input) {
	const visitedMap = {};
	return lowestPoints.map(lowestPoint => {
		return getBasin(0, lowestPoint)
	})

	function getBasin(basinSize, lowestPoint) {
		const neighbours = getNeighbours(input, lowestPoint.y , lowestPoint.x);
		const basinPoints = neighbours.filter(neighbour => {
			return neighbour.cell < 9 && (!visitedMap[neighbour.y] || !visitedMap[neighbour.y][neighbour.x])
		})
		basinPoints.forEach(lowestPoint => {
			visitedMap[lowestPoint.y] = visitedMap[lowestPoint.y] || {};
			visitedMap[lowestPoint.y][lowestPoint.x] = true;
		})
		basinSize += basinPoints.length;
		if (basinPoints.length) {
			return basinPoints.reduce(getBasin, basinSize)
		} else {
			return basinSize;
		}
	}
}

function getLowestPoints(input) {
	const lowestPoints = [];
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			const currentValue = input[y][x];
			const neighbours = getNeighbours(input, y , x);
			const isLowestPoint = neighbours.every(neighbour => neighbour.cell > currentValue)
			if (isLowestPoint) {
				lowestPoints.push({ y, x, height: currentValue })
			}
		}
	}
	return lowestPoints;
}

function getNeighbours(matrix, y, x) {
	return [
		{ y: y - 1, x, cell: getCell(matrix, y - 1 , x) },
		{ y, x: x + 1, cell :getCell(matrix, y , x + 1) },
		{ y: y + 1, x, cell: getCell(matrix, y + 1 , x) },
		{ y, x: x - 1, cell: getCell(matrix, y , x - 1) }
	]

	function getCell(matrix, y , x) {
		if (matrix[y]) {
			if (matrix[y][x] !== undefined) {
				return matrix[y][x];
			}
		}
		return 10;
	}
}

basinDetector();