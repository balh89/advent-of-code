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

function getRiskLevel() {
	const input = getInput();
	const lowestPoints = getLowestPoints(input);
	const riskLevel = getSumOfRiskLevel(lowestPoints);
	console.log(riskLevel);

}

function getSumOfRiskLevel(lowestPoints) {
	return lowestPoints.reduce((sum, point) => {
		sum += point;
		return sum;
	}, 0)
}

function getLowestPoints(input) {
	const lowestPoints = [];
	for (let y = 0; y < input.length; y++) {
		for (let x = 0; x < input[y].length; x++) {
			const currentValue = input[y][x];
			const neighbours = getNeighbours(input, y , x);
			const isLowestPoint = neighbours.every(neighbour => neighbour > currentValue)
			if (isLowestPoint) {
				lowestPoints.push(currentValue + 1)
			}
		}
	}
	return lowestPoints;
}

function getNeighbours(matrix, y, x) {
	return [
		getCell(matrix, y - 1 , x),
		getCell(matrix, y , x + 1),
		getCell(matrix, y + 1 , x),
		getCell(matrix, y , x - 1)
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

getRiskLevel();