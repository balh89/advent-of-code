const { readFileSync } = require("fs");
const inputPath = "../input.txt";

const FOLD_ALONG = "fold along ";
const axes = {
	Y: "y",
	X: "x"
}

function getInput() {
	return readFileSync(inputPath, { encoding: 'utf8' })
		.split("\r\n")
}

function formatInput(input) {
	const startArraySize = input.reduce((acc, line) => {
		if (line.startsWith(FOLD_ALONG)) {
		} else if (line){
			const [x, y] = line.split(",");
			if (+x > acc.x) {
				acc.x = +x;
			}
			if (+y > acc.y) {
				acc.y = +y;
			}
			return acc;
		}
		return acc;
	}, { x: 0, y: 0 })

	return input.reduce((acc, line) => {
		if (line.startsWith(FOLD_ALONG)) {
			const [axis, position] = line.split(FOLD_ALONG)[1].split("=");
			acc.instructions.push({ axis, position: +position });
		} else if (line){
			const [x, y] = line.split(",");
			acc.matrix[y] = acc.matrix[y] || [];
			acc.matrix[y][x] = 1;
		}
		return acc;
	}, { matrix: new Array(startArraySize.y + 1).fill(0).map(() => new Array(startArraySize.x +1).fill(0)), instructions: [] })
}

function foldThePaper() {
	const input = getInput();
	const { matrix, instructions } = formatInput(input);
	const result = performInstructions(matrix, instructions);
	const visibleDots = findVisibleDots(result);
	console.log(visibleDots);
	// console.log("matrix", matrix);
	// console.log("instructions", instructions);
}

function findVisibleDots(input) {
	return input.reduce((sum, row) => {
		sum += row.reduce((rowSum, dot) => {
			rowSum += dot;
			return rowSum;
		}, 0)
		return sum;
	}, 0)
}

function performInstructions(matrix, instructions) {
	return instructions.reduce((result, instruction) => {
		if (instruction.axis === axes.X) {
			result = foldByXAxis(matrix, instruction.position);
		} else if (instruction.axis === axes.Y) {
			result = foldByYAxis(matrix, instruction.position);
		}
		return result;
	}, [])
}

function foldByXAxis(matrix, position) {
	return matrix.reduce((result, row, rowIndex) => {
		result[rowIndex] = row.reduce((rowResult, dot, index) => {
			if (index >= position) {
				return rowResult;
			}
			rowResult[index] = dot || matrix[rowIndex][row.length - 1 - index];
			return rowResult;
		}, [])
		return result;
	}, [])
}

function foldByYAxis(matrix, position) {
	return matrix.reduce((result, row, rowIndex) => {
		if (rowIndex >= position) {
			return result;
		}
		result[rowIndex] = row.reduce((rowResult, dot, index) => {
			rowResult[index] = dot || matrix[(matrix.length - 1 - rowIndex)][index];
			return rowResult;
		}, [])
		return result;
	}, [])
}

foldThePaper();